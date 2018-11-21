const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'name', 'email']
  }

  const strategy = new FacebookStrategy(
    facebookConfig,
    (token, refreshToken, profile, done) => {
      const facebookId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.findOrCreate({
        where: {facebookId},
        defaults: {name, email}
      })
        .then(([user]) => {
          return done(null, user)
        })
        .catch(done)
    }
  )
  passport.use(strategy)

  router.get('/', passport.authenticate('facebook', {scope: ['email','user_friends']}))

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
