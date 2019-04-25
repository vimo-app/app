const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Album = require('../models/Album');
const Picture = require('../models/Picture');
const User = require('../models/User');



// router.get('/:id', (req, res) => {
//   const id = req.params.id
//   User
//     .findById(id)
//     .populate("albumID")
//     .then(album => {
//       console.log(album);
//       res.json(album)
//       // res.render("profile/profile", album)
//     })
//     .catch(error => {
//       console.log('Error while getting the posts from the DB: ', error);
//     });
//   // res.render('profile/new-album');
// });

// router.get('/:id/photos', (req, res) => {
//   const id = req.params.id
//   Album
//     .findById(id)
//     // .populate("albumId")
//     .then(album => {
//       Picture
//         .find({ albumId: album._id })
//         .populate("albumId")
//         .then(photo => {
//           console.log(photo);
//           res.json(photo);
//           // res.render("partials/cards/picture", {photo})

//         });
//       res.json(photo)
//       // res.render("profile/profile", photo)
//     })
//     .catch(error => {
//       console.log('Error while getting the album information: ', error);
//     });
// });

// router.post('/:userID', uploadCloud.array('photos'), (req, res, next) => {
//   // console.log(req.files);
//   // console.log("XXXXXXXX");
//   const imageArray = req.files.map(img => ({
//     name: req.body.name,
//     userID: req.params.userID
//   }));
//   console.log(imageArray);
//   Album
//     .insertMany(imageArray)
//     .then(album => {
//       console.log(album);
//       res.json(album)
//       // res.redirect('/mock/profile');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });


// router.post("/:username/:albumId", uploadCloud.array('photos'), (req, res, next) => {
//   const imageArray = req.files.map(img => ({
//     albumId: req.params.albumId,
//     imgPath: img.url,
//     imgName: img.originalname
//   }));
//   Picture
//     .insertMany(imageArray)
//     .then(picture => {
//       res.json(picture)
//       // res.redirect('/mock/profile');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = router;