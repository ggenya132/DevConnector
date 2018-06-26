const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//get Profile
const Profile = require("../../models/Profile");
//get User
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "profiles GOOD" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.prolfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(200).json(profile);
      })
      .catch(err => res.json(404).json(err));
  }
);
module.exports = router;
