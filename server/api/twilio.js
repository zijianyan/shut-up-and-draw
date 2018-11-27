const router = require('express').Router()
const User = require('./user')
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const isLoggedIn = (req, res, next) => {
  next(req.user ? null : {status: 401})
}

const nudgeText = phoneNumber => {
  twilioClient.messages
    .create({
      from: process.env.TWILIO_NUM,
      body: `Your turn on EZC!`,
      to: phoneNumber
    })
    .catch(e => {
      console.log(`failed: ${e}`);
    });
};

router.post('/messages', isLoggedIn, (req, res, next) => {
    User.findById(req.body.userid)
    .then(user => {
        if (user) {
          nudgeText(user.phoneNumber)
          console.log('nudged the user', user.name)
          res.sendStatuspostm(200)
        }
      }
    )
})




module.exports = {
  nudgeText,
};
