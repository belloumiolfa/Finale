/**
 * require dependencies
 */
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const passport = require("passport");

const router = express.Router();
router.use(bodyParser.json());
/**
 * Load database connexion
 */
var { mongoose } = require("../config");

/**
 * Load user model
 */
var { User } = require("../Models/User");

var Profile = require("../Models/Profile");

/**
 *  Load Validation
 */

const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
// @route   GET profil/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "profils Works" }));
/******************************************************************************************************* */
// @route   POST profile/
// @desc    get current user profile
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user._id })
      .populate("user", [
        "userName",
        "avatar",
        "firstName",
        "lastName",
        "birthday",
        "sex",
        "phone",
        "fax",
        "adress",
        "webSite",
        "nameAssociation",
        "domaine",
        "nameCompany",
        "tax",
        "activity",
        "cin",
        "category",
        "email"
      ])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for you";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
/******************************************************************************************************* */
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user._id;

    profileFields.handle = req.user.userName;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.email) profileFields.email = req.body.email;

    if (req.body.bio) profileFields.bio = req.body.bio;

    if (req.body.status) profileFields.status = req.body.status;
    else profileFields.status = req.user.category;

    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    /* if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }*/

    // Social
    profileFields.social = {};
    if (req.body.google) profileFields.social.google = req.body.google;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    const { errors, isValid } = validateProfileInput(profileFields);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user._id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

/******************************************************************************************************* */

// @route   GET api/profile/:id
// @desc    Get profile by id
// @access  Public

router.get("/:id", (req, res) => {
  const errors = {};

  Profile.findOne({ _id: req.params.id })
    .populate("user", [
      "userName",
      "avatar",
      "firstName",
      "lastName",
      "birthday",
      "sex",
      "phone",
      "fax",
      "adress",
      "webSite",
      "nameAssociation",
      "domaine",
      "nameCompany",
      "tax",
      "activity",
      "cin",
      "category",
      "email"
    ])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
/******************************************************************************************************* */

// @route   GET api/profile/user/:id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.id })
    .populate("user", [
      "userName",
      "avatar",
      "firstName",
      "lastName",
      "birthday",
      "sex",
      "phone",
      "fax",
      "adress",
      "webSite",
      "nameAssociation",
      "domaine",
      "nameCompany",
      "tax",
      "activity",
      "cin",
      "category",
      "email"
    ])
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      errors.profile = "There is no profile for this user";
      res.status(404).json(errors);
    });
});
/******************************************************************************************************* */

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all/:category", (req, res) => {
  const errors = {};

  Profile.find({ status: req.params.category })
    .populate("user", [
      "userName",
      "avatar",
      "firstName",
      "lastName",
      "birthday",
      "sex",
      "phone",
      "fax",
      "adress",
      "webSite",
      "nameAssociation",
      "domaine",
      "nameCompany",
      "tax",
      "activity",
      "cin",
      "category",
      "email"
    ])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});
/********************************************************************************************************* */
/****************************************** experience *************************************************** */
/********************************************************************************************************* */
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newExp = req.body;

    Profile.findOne({ user: req.user._id }).then(profile => {
      /* const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };*/

      // Add to exp array
      profile.experience.unshift(newExp);

      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => res.status(404).json({ date: "Invalide date" }));
    });
  }
);
/********************************************************************************************************* */
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
/********************************************************************************************************* */
/****************************************** experience *************************************************** */
/********************************************************************************************************* */
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newEdu = req.body;
    Profile.findOne({ user: req.user._id }).then(profile => {
      /* const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };*/

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);
/********************************************************************************************************* */
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);
/********************************************************************************************************* */
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

/** ******************************************************************************************************** */
// @route   POST profile/savejob/:id
// @desc    save favorite job
// @access  private
router.post(
  "/savejob/:job",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      // Add savedJob array
      profile.savedJob.unshift({ job: req.params.job, save: true });
      profile.save().then(profile => res.json(profile));
    });
  }
);
/** ******************************************************************************************************** */
// @route   DELTE profile/savejob/:id
// @desc    save favorite job
// @access  private
router.delete(
  "/savejob/:job",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      // Get remove index
      const removeIndex = profile.savedJob
        .map(item => item.id)
        .indexOf(req.params.job);

      // Splice out of array
      profile.savedJob.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    });
  }
);
/** ******************************************************************************************************** */
// @route   POST profile/savejob/:id
// @desc    save favorite job
// @access  private
router.get(
  "/savejob/:job",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user._id }).then(profile => {
      // Add savedJob array
      var job = profile.savedJob.filter(job => job._id == req.params.job);
      if (job.length > 0) res.send(true);
      else res.send(false);
    });
  }
);
/***************************************** exporting ***************************************************** */
module.exports = router;
