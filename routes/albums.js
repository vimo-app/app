const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Album = require('../models/album');
const Picture = require('../models/picture');

router.get('/:id', (req, res) => {
  const id = req.params.id
  Album
    .findById(id)
    .then(album => {
      res.json(album)
      // res.render("profile/profile", album)
    })
    .catch(error => {
      console.log('Error while getting the posts from the DB: ', error);
    });
  res.render('profile/new-album');
});

router.get('/:id/photos', (req, res) => {
  const id = req.params.id
  Album
    .findById(id)
    .populate("albumId")
    .then(album => {
      Picture
        .find({ albumId: album._id })
        .then(photo => {
          console.log(photo);
          // res.json(photo);
          res.render("partials/cards/picture", {photo})

        });
      // res.json(photo)
      // res.render("profile/profile", photo)
    })
    .catch(error => {
      console.log('Error while getting the album information: ', error);
    });
});

router.post('/newAlbum/:id', uploadCloud.single('photos'), (req, res, next) => {
  const album = {
    userId: req.params.id,
    name: req.body.name,
  };

  const newAlbum = new Album(album);

  newAlbum.save()
    .then(album => {
      res.json(album)
      // res.redirect('/mock/profile');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;