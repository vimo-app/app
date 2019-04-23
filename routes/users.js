const express = require("express");
const passport = require('passport');
const router = express.Router();
const Picture = require("../models/picture");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');
const User = require("../models/user");

router.get("/:username", ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const username = req.params.username
  User
    .find({ username })
    .then(user => {
      res.render("profile/profile", user)
    })
    .catch(error => {
      console.log('Error while getting the posts from the DB: ', error);
    });
});

router.get("/:username/:albumId", ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const username = req.params.username
  const albumId = req.params.albumId
  User
    .find({ username, albumId })
    .populate("albumId")
    .then(album => {
      res.render("partials/cards/album", album)
    })
    .catch(error => {
      console.log('Error while getting the album information: ', error);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  User
    .findById(id)
    .then(user => {
      res.render("profile/profile", user)
    })
    .catch(error => {
      console.log('Error while getting the posts from the DB: ', error);
    });
});

router.get("/:id/albums", (req, res, next) => {
  const id = req.params.id
  User
    .findById(id)
    .populate("userId")
    .then(album => {
      res.render("profile/profile", album)
    })
    .catch(error => {
      console.log('Error while getting the album information: ', error);
    });
});

module.exports = router;