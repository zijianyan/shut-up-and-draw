const router = require('express').Router()
const {Game} = require('../db/models')
const {User} = require('../db/models')
const {Submission} = require('../db/models')

module.exports = router

// router is hosted under /api/games

router.post('/', async (req, res, next) => {
  // user initiates a game with selected friends
  // assumption: players are coming in as an array of users
  try {

    const { players } = req.body
    const game = await Game.create({ // zi: do we want this game to belong only to the person who created it? Or to all players involved?
      players,
      status: 'active'
    });
    


    const initialPhrase = await Submission.create({
      type: 'phrase',
      phrase: 'pigeon eats your bagel'
      // this can be pulled in from a phraseBank
      // maybe randomized if it's being imported as an array of Json objects
    });

    initialPhrase.gameId = game.id;
    await initialPhrase.save();
    res.send(game);

  } catch(err) {
    next(err);
  }
});

router.get('/id', async (req, res, next) => {
  try{
    const game = await Game.findById(req.params.id);
    res.send(game);
  } catch(err) {
    next(err);
  }
})

router.put('/id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
    game.status = 'complete'
    await game.save()
    res.send(game)
  } catch(err) {
    next(err);
  }
});



