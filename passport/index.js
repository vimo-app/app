const passport = require('passport');

require('./serializers');
require('./localStrategy');
require('./instagramStrategy');
require('./facebookStrategy');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
};
