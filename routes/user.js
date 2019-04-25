const express = require("express");
const passport = require('passport');
const router = express.Router();
const Picture = require("../models/Picture");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const User = require("../models/User");
const Album = require("../models/Album");

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .populate({ path: 'albums', populate: { path: 'pictures', model: 'Picture' } })
    .then(user => {
      res.render("profile/profile", { user });
      // res.json(user)
    });
});

router.get('/:id/edit', (req, res, next) => {
  res.render("profile/profile-photo", {user: req.user});
});

router.post('/:id/album', uploadCloud.array('photos'), (req, res, next) => {
  let payload = {
    name: req.body.name,
    pictures: req.files,
  };

  let pictures = payload.pictures.map(pic => new Picture({
    imgName: pic.originalname,
    imgPath: pic.url,
  }));

  let album = new Album({
    name: payload.name,
    pictures
  });

  pictures.forEach(picture => picture.save());
  album.pictures.push(pictures);
  album.save();

  User.findById(req.params.id)
    .then(user => {
      user.albums.push(album);
      user.save();
      res.json(user);
    })
    .catch(err => console.error(err));
});

router.post('/:id', uploadCloud.single('profilePhoto'), (req, res, next) => {
  let userPhoto = req.file.url;
  console.log('hola mundo')
  User.findByIdAndUpdate(req.params.id, {
    userPhoto
  }, {new: true})
    .then(user => {
      console.log(user);
      res.render("profile/profile", {user:user});
    })
    .catch(error => {
      console.log(error);
    })
})

// router.get("/:id", (req, res, next) => {
//   const id = req.params.id;
//   console.log(id)
//   console.log(`Debug ID: ${id}`);
//   User
//     .findById(id)
//     .populate({
//       path: "albumID",
//       populate: {path: "pictureID"}
//     })
//     .then(user => {
//       console.log(user);
//       res.json(user)
//       // Album
//       //   .find({ albumID: album._id })
//       //   .then(album => {
//       //     console.log(album)
//       //     res.json({ user, album })
//       // res.render("profile/profile", { user, album })
//       //   });
//     })
//     .catch(error => {
//       console.log('Error while getting the posts from the DB: ', error);
//     });
// });

// router.get("/:id/albums", (req, res, next) => {
//   const id = req.params.id
//   User
//     .findById(id)
//     .populate("userId")
//     .then(user => {
//       Album
//         .find({ userId: user._id })
//         .then(album => {
//           console.log(album)
//           res.json(album)
//           // res.render("partials/cards/album", { user, album });
//         });
//     })
//     .catch(error => {
//       console.log('Error while getting the album information: ', error);
//     });
// });

module.exports = router;