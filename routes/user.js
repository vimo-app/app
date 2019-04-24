const express = require("express");
const passport = require('passport');
const router = express.Router();
const Picture = require("../models/picture");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const User = require("../models/user");
const Album = require("../models/album");

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  console.log(`Debug ID: ${id}`);
  User
    .findById(id)
    .populate({
      path: "albumID",
      populate: {path: "pictureID"}
    })
    .then(user => {
      console.log(user);
      res.json(user)
      // Album
      //   .find({ albumID: album._id })
      //   .then(album => {
      //     console.log(album)
      //     res.json({ user, album })
      // res.render("profile/profile", { user, album })
      //   });
    })
    .catch(error => {
      console.log('Error while getting the posts from the DB: ', error);
    });
});









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