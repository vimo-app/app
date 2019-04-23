const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Album = require ("../models/album")

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
    .then(photo => {
      res.render("profile/profile", photo)
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

// router.post('/newPicture', ensureLogin.ensureLoggedIn('/auth/login'), uploadCloud.single('photos'), (req, res, next) => {
//   const image = {
//     albumId: req.album._id,
//     name: req.body,
//     imgPath: req.file.url,
//     imgName: req.file.originalname
//   };
  
//   const newPicture = new Picture({image});

//   newPicture.save()
//     .then(picture => {
//       // FIND USER ID / 
//       res.redirect('/mock/profile');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = router;