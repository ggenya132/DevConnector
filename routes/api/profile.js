const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");

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
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.prolfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(err => res.json(404).json(err));
  }
);

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ _id: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => {
      errors.profile = "There is no profile associated with this id";
      errors.mongoeError = err;
      res.status(404).json(errors);
    });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    console.log("ID", req.user.id);
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;

    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.handle) profileFields.handle = req.body.handle;

    if (req.body.bio) profileFields.bio = req.body.bio;

    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills != undefined) {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};

    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: profileFields.user })
      .then(profile => {
        console.log("SHOWING PROFILE", profile);
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
            res.json(profile);
          });
        } else {
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              return res.status(400).json(errors);
            }
            // make new profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";

        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      errors.noprofile = "There are no profiles";

      res.status(404).json(errors);
    });
});
module.exports = router;
