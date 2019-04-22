const express = require('express');
const router  = express.Router();

router.get('/profile', (req, res, next) => {
  res.render('profile/profile');
});
router.get('/album', (req, res, next) => {
  res.render('profile/album');
});

module.exports = router;
