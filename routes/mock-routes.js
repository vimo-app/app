const express = require('express');
const router  = express.Router();

router.get('/profile', (req, res, next) => {
  res.render('profile/profile');
});
router.get('/new-album', (req, res, next) => {
  res.render('profile/new-album');
});
router.get('/album', (req, res, next) => {
  res.render('album/view');
});
router.get('/upload-images', (req, res, next) => {
  res.render('album/add-images');
});
module.exports = router;
