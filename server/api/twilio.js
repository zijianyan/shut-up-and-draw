const router = require('express').Router();
const twilio = require('twilio');
const User = require('../db/models/user');
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

//route that would capture the phone number for req,body

router.post('/', async(req, res, next) => {
  try {
    const {game, user} = req.body
    console.log('req.body.game', game)
    console.log('req.body.user', user)
    User.findById(user.id)
    .then(foundUser => {
      console.log('founduser', foundUser)
      twilioClient.messages
      .create({
        from: process.env.TWILIO_NUM,
        body: `Your turn to shut up and draw! https://ezc.herokuapp.com/games/${game.id}/submission`,
        to: foundUser.phoneNumber
      })
    })

  } catch(err) {
    console.log('erroring on posting game')
    next(err);
  }
})




module.exports = router
