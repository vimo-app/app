const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/mock/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
 
  if (username === "" || password === "" || email === "" || passwordConfirm === "") {
    res.render ("auth/signup", { "message": "Indicate username and password" });
    return;
  }
  
  if (passwordConfirm !== password) {
    res.render ("auth/signup", { "message": "Your password is not correct" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {

    if (user !== null) {
      res.render("auth/signup", {"message": "Username already exists"});

      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.render("auth/login");
        // res.status(200).json({ status: 200, newUser });
      })
      .catch(err => {
        console.log(err)
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get('/instagram', passport.authenticate('instagram'), (req, res, next) => {
  next();
});

router.get('/instagram/callback', passport.authenticate('instagram', {
  successRedirect: "/mock/profile",
  failureRedirect: "/auth/login"
}));

router.get('/facebook', passport.authenticate('facebook'), (req, res, next) => {
  next();
});

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: "/mock/profile",
  failureRedirect: "/auth/login"
}));

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
