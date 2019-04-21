const express = require('express');
const router = express.Router();
// const ensureLoggedIn = require("../middleware/ensureLogin");
const ensureLogin = require("connect-ensure-login");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/private', ensureLogin.ensureLoggedIn('/auth/login'), (req,res) => {
  res.render('private-page');
});

module.exports = router;
