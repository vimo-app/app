const passport = require('passport');
const User = require('../models/User');


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(userData => {
      done(null, userData);
    })
    .catch(err => {
      cb(err);
    });
});



