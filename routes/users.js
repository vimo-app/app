const express = require("express");
const passport = require('passport');
const router = express.Router();
const Picture = require("../models/picture");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const User = require("../models/user");
const Album = require("../models/album");

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  console.log(`Debug ID: ${id}`);
  User
    .findById(id)
    .then(user => {
      Album
        .find({ userId: user._id })
        .then(album => res.render("profile/profile", { user, album }));
    })
    .catch(error => {
      console.log('Error while getting the posts from the DB: ', error);
    });
});

// router.get("/:username", ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
//   const username = req.params.username;
//   User
//     .findOne({ username })
//     .then(user => {
//       res.render("profile/profile", {user});
//     })
//     .catch(error => {
//       console.log('Error while getting the posts from the DB: ', error);
//     });
// });

router.get("/:id/albums", (req, res, next) => {
  const id = req.params.id
  User
    .findById(id)
    .populate("userId")
    .then(user => {
      Album
        .find({ userId: user._id })
        .then(album => {
          console.log(album)
          res.json(album)
          // res.render("partials/cards/album", { user, album });
        });
    })

    // .then(album => {
    //   console.log(album)
    //   // res.json(album)
    //   res.render("profile/profile", album)
    // })

    .catch(error => {
      console.log('Error while getting the album information: ', error);
    });
});

router.get("/:username/:albumId", ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const username = req.params.username
  const albumId = req.params.albumId
  User
    .findOne({ username, albumId })
    .populate("albumId")
    .then(album => {
      res.render("partials/cards/album", album)
    })
    .catch(error => {
      console.log('Error while getting the album information: ', error);
    });
});

router.post("/:username/:albumId", uploadCloud.array('photos'), (req, res, next) => {

  const imageArray = req.files.map(img => ({
    albumId: req.params.albumId,
    imgPath: img.url,
    imgName: img.originalname
  }));

  Picture
    .insertMany(imageArray)
    .then(picture => {
      res.json(picture)
      // res.redirect('/mock/profile');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;