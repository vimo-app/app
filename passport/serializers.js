const passport = require('passport');
const User = require('../models/User');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Instagram profile is
//   serialized and deserialized.

// passport.serializeUser((loggedInUser, cb) => {
//   cb(null, loggedInUser._id);
// });

// passport.deserializeUser((userIdFromSession, cb) => {
//   User.findById(userIdFromSession)
//   .then(userDocument => {
//     cb(null, userDocument);
//   })
//   .catch(err => {
//     cb(err);
//   })
// });

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



