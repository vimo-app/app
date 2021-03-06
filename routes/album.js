const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Album = require('../models/Album');
const Picture = require('../models/Picture');
const User = require('../models/User');

router.get('/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const id = req.params.id;

  Album.findById(id)
    .populate("pictures")
    .then(album => {
      res.render('album/view', { album, user: req.user });
    });
});

router.get('/:id/editPhoto', (req, res, next) => {
  res.render("album/add-images", { albumId: req.params.id, user: req.user });
});

router.get('/:id/editCover', (req, res, next) => {
  res.render("profile/album-photo", { albumId: req.params.id, user: req.user});
});

router.post('/:id/photo', uploadCloud.array('photos'), (req, res, next) => {

  let payload = req.files;

  let pictures = payload.map(pic => new Picture({
    imgName: pic.originalname,
    imgPath: pic.url,
  }));
  let savedImg = pictures.map(picture => picture.save());
  Promise.all(savedImg)
    .then((img) => {
      
      Album.findByIdAndUpdate(req.params.id, {$push: {
        pictures: {
          $each: img
        }
      }})
        .then(album => res.redirect(`/album/${req.params.id}`))
        .catch(err => console.error(err));
    });
  });

  router.post('/:id', uploadCloud.single('albumPhoto'), (req, res, next) => {
    let albumPhoto = req.file.url;
    Album.findByIdAndUpdate(req.params.id, {
      albumPhoto
    }, { new: true })
      .then(album => {
        res.redirect(`/user/${req.user._id}`);
      })
      .catch(error => {
        console.log(error);
      })
  })

module.exports = router;