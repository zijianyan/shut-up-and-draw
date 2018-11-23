const router = require('express').Router()
const {Game} = require('../db/models')
const {User} = require('../db/models')
const {Submission} = require('../db/models')
const db = require('../db')
const Op = db.Sequelize.Op
const phrases = require('./phrases')

module.exports = router

//randomizes a number between 0 and length of all phrases
const randomize = () => {
  return Math.floor(Math.random() * phrases.length);
}

// router is hosted under /api/games

// creating a game with an initial submission of a phrase
router.post('/', async (req, res, next) => {
  // user initiates a game with selected friends
  // assumption: players are coming in as an array of users
  try {

    const { players } = req.body
    console.log('players:', players)
    const game = await Game.create({
      players,
      status: 'active'
    });

    const submission = await Submission.create({
      type: 'phrase',
      phrase: phrases[randomize()].text,
      gameId: game.id
      // this can be pulled in from a phraseBank
      // maybe randomized if it's being imported as an array of Json objects
    });

    submission.gameId = game.id;
    await submission.save();

    res.send(game);

  } catch(err) {
    console.log('errroring on posting game')
    next(err);
  }
});

// get all games by a user by req.user.id
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      // where: {
      //   players: {
      //     [Op.contains]: [req.user.id]
      //   }
      // }
    })
    res.send(games)
  } catch (err) {
    next(err)
  }
})


// getting a game by its id
router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).send(game)
  } catch(err) {
    next(err);
  }
})



// editing a game's status
router.put('/:id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
    game.status = 'complete'
    await game.save()
    res.send(game)
  } catch(err) {
    next(err);
  }
});

router.get('/submissions', async (req, res, next) => {
  try{
    const submissions = await Submission.findAll()
    res.send(submissions)
  } catch(err) {
    next(err)
  }
})

// /api/games/id/submissions to get all submissions for a game
router.get('/:id/submissions', async (req, res, next) => {
  // GET all submissions that belong to a game
  try {
    const submissions = await Submission.findAll({
      where: {
        gameId: req.params.id
      },
      include: [ User ] // each submission will also eager load the user that created that submission
    });
    // add a sorting function here before sending the submissions back to the client
    res.send(submissions)

  } catch (err) {
    next(err);
  }
})


// /api/games/id/submissions routes to create a submission
router.post('/:id/submissions', async (req, res, next) => {
  // POST a submission in association to the game it's being created within
  // needs to come to this route with these attributes in the body
  try {
    const { type } = req.body;
    let submission;

    if(type === 'phrase') {
      submission = await Submission.create({
        type: req.body.type,
        phrase: req.body.phrase,
        gameId: req.params.id
      });
    } else {
      // this is TBD because we haven't set up AWS and
      // I'm unsure where the drawing URL is coming from
      submission = await Submission.create({
        type: req.body.type,
        drawingUrl: req.body.drawing,
        gameId: req.params.id
      });
    }

    // after submission is created, we find the game and update the roundNumber pointer
    const game = await Game.findById(req.params.id)
    game.roundNumber++
    await game.save()

    res.send(submission);
  } catch(err) {
    next(err)
  }
})
