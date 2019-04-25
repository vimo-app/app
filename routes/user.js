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
    });
});

router.get('/:id/edit', (req, res, next) => {
  res.render("profile/profile-photo", { user: req.user });
});

router.get('/:id/editAlbum', (req, res, next) => {
  res.render("profile/new-album", { user: req.user });
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
    .populate({ path: 'albums', populate: { path: 'pictures', model: 'Picture' } })
    .then(user => {
      user.albums.push(album);
      user.save();
      res.redirect(`/user/${user._id}`);
    })
    .catch(err => console.error(err));
});

router.post('/:id', uploadCloud.single('profilePhoto'), (req, res, next) => {
  let userPhoto = req.file.url;
  User.findByIdAndUpdate(req.params.id, {
    userPhoto
  }, { new: true })
    .then(user => {
      res.redirect(`/user/${user._id}`);
    })
    .catch(error => {
      console.log(error);
    })
})

module.exports = router;