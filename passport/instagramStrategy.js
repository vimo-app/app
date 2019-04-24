const InstagramStrategy = require('passport-instagram').Strategy;
const passport = require('passport');
const User = require('../models/User');

// const {INSTAGRAM_ID, INSTAGRAM_SECRET} = process.env;

passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_ID,
  clientSecret: process.env.INSTAGRAM_SECRET,
  callbackURL: process.env.INSTAGRAM_CALLBACK

}, (accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    User.findOne({ instagramID: profile.id })
      .then(user => {

        if (user) {
          return done(null, user);
        }

        //Register a new user in Mongo with id profile (Instagram)
        const newUser = new User({
          username: profile.username,
          instagramID: profile.id
        });

        newUser.save()
          .then(user => {
            done(null, newUser);
          })
      })

      .catch(error => {
        console.log(error);
      });
  });
}));

