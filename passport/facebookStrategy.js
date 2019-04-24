const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK
}, function (accessToken, refreshToken, profile, done) {
    User
      .findOne({ facebookID: profile.id })
      .then(user => {
        console.log(profile)
        if (user) {
          return done(null, user);
        }
        //Register a new user in Mongo with id profile (Facebook)
        const newUser = new User({
          username: profile.displayName,
          facebookID: profile.id
        });
        
        newUser.save()
        .then(user => {
          done(null, newUser);
        })
      })

      .catch(error => {
        console.log(error);
      });
  }));