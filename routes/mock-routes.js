const express = require('express');
const router = express.Router();
const Album = require("../models/Album");


router.get('/profile', (req, res, next) => {
  res.render('profile/profile');
});
router.get('/album', (req, res, next) => {
  res.render('profile/profile');
});
router.get('/new-album', (req, res, next) => {
  res.render('profile/new-album');
});
module.exports = router;
