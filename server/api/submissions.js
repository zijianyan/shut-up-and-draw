const router = require('express').Router()
const {Game} = require('../db/models')
const {User} = require('../db/models')
const {Submission} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const submission = await Submission.create(req.body);
    const { gameId } = submission;
    const game = await Game.findById(gameId);
    await Game.incrementRound();
  }
  catch(ex) {
    next(ex);
  }
   
});

// router.get('/', async (req, res, next) => { // find all submissions from game, sorted chronologically...sort in front end?

// })




