const router = require('express').Router()
const {Game} = require('../db/models')
const {User} = require('../db/models')
const {Submission} = require('../db/models')

module.exports = router

// router is hosted under /api/submissions

router.get('/gameId', async (req, res, next) => {
  // route is /submissions/gameId
  // GET all submissions that belong to a game
  try {
    const submissions = await Submission.findAll({
      where: {
        gameId: req.params.gameId
      },
      include: [ { User } ] // each submission will also eager load the user that created that submission
    });
    // add a sorting function here before sending the submissions back to the client
    res.send(submissions)

  } catch (err) {
    next(err);
  }
})

router.post('/gameId', (req, res, next) => {
  // POST a submission in association to the game it's being created within
  // needs to come to this route with these attributes in the body
  try {
    const { type } = req.body;
    let submission;

    if(type === 'phrase') {
      submission = await Submission.create({
        type: req.body.type,
        phrase: req.body.phrase,
        gameId: req.params.gameId
      });
    } else {
      // this is TBD because we haven't set up AWS and
      // I'm unsure where the drawing URL is coming from
      submission = await Submission.create({
        type: req.body.type,
        drawingUrl: req.body.drawing,
        gameId: req.params.gameId
      });
    }

    // after submission is created, we find the game and update the roundNumber pointer
    const game = await Game.findById(req.params.gameId)
    game.roundNumber++
    await game.save()

    res.send(submission);
  } catch(err) {
    next(err)
  }
})
