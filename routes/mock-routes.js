const express = require('express');
const router = express.Router();
const Album = require("../models/album");


router.get('/profile', (req, res, next) => {
  Album
    .find()
    .populate("userId")
    
  // POPULATE COLLECTIONS
  // FIND USER ID / 

  res.render('profile/profile');
});
router.get('/album', (req, res, next) => {
  res.render('profile/profile');
});
router.get('/new-album', (req, res, next) => {
  res.render('profile/new-album');
});
module.exports = router;
