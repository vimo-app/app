const express = require("express");
const passport = require('passport');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const Album = require('../models/Album');
const Picture = require('../models/Picture');

// router.get('/:idPhotos', (req, res) => {
//   const idPhotos = req.params.idPhotos
//   console.log(idPhotos)
//   // console.log(idPhotos)
//   Picture
//     .findById({ idPhotos })
//     // .populate("albumId")
//     .then(picture => {
//       console.log(picture)
//       console.log("estoy dentro!!!")
//       // Picture
//       //   .find({ albumId: album._id })
//       //   .then(photo => {
//       //     console.log(photo);
//       //     res.json(photo);
//       //     // res.render("partials/cards/picture", {photo})
//       //   });
//     })
//     .catch(error => {
//       console.log('Error while getting the album information: ', error);
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