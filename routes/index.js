const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/mock/profile', ensureLogin.ensureLoggedIn('/auth/login'), (req,res) => {
  res.render('profile/profile');
});

module.exports = router;
