const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

// router.get('/mock/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req,res) => {
//   res.render('profile/profile');
// });

router.get('/privacy', ensureLogin.ensureLoggedIn('/auth/login'), (req,res) => {
  res.render('privacy');
});

module.exports = router;
