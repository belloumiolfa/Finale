/**
 * require dependencies
 */
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const keys = require("../Constants");

const passport = require("passport");

const router = express.Router();
router.use(bodyParser.json());
/**
 * Load database connexion
 */
var { mongoose } = require("../config");
let { ObjectID } = require("mongodb");

/**
 * Load user model
 */
var { User } = require("../Models/User");
/**
 * Load mailer function
 */
const { sendConfirmationEmail } = require("./Mailer");
//const { authentificate } = require("../authentificate");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route   GET user/test
// @desc    Test user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
/** ******************************************************************************************************** */
// @route   POST user/signup
// @desc    Signup user
// @access  Public
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      //create new user
      const body = req.body;

      const newUser = new User({
        userName: body.userName,
        password: body.password,
        password2: body.password2,
        firstName: body.firstName,
        lastName: body.lastName,
        birthday: body.birthday,
        sex: body.sex,
        email: body.email,
        phone: body.phone,
        fax: body.fax,
        adress: {
          city: body.city,
          state: body.state,
          zip: body.zip
        },
        cin: body.cin,
        webSite: body.webSite,
        nameAssociation: body.nameAssociation,
        domaine: body.domaine,
        nameCompany: body.nameCompany,
        tax: body.tax,
        activity: body.activity,
        category: body.category,
        avatar: avatar
      });

      //crypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //get a crypted password
          newUser.password = hash;
          newUser.password2 = hash;
          newUser
            .save()
            //return the user just sign up
            .then(user => {
              res.json({ user: user });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
/** ******************************************************************************************************** */
// @route   GET getusers
// @desc    retrun users
// @access   rivate
router.get(
  "/getusers",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find()
      .then(users => res.json({ users }))
      .catch(err => {
        console.log(err);
      });
  }
);
/** ******************************************************************************************************** */
// @route   post user
// @desc    apdate accepted to true
// @access  private
router.post("/acceptuser", (req, res) => {
  var id = req.body.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ msg: "Id not valid" });
  }
  User.findOneAndUpdate(
    { _id: id },
    { $set: { accepted: true } },
    { new: true }
  )
    .then(user => {
      const token = User.generateConfirmationToken(user);
      user.confirmationToken = token;
      user.save().then(user => res.json({ user: user }));
    })
    .catch(e => {
      res.status(400).send({ msg: "Not found" });
    });
});
/** ****************************************************************************************************** */
// @route   DELETE user
// @desc    delete user
// @access  private
router.delete("/deleteuser", (req, res) => {
  var id = req.body.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send("Id not valid");
  }

  User.findOneAndRemove({
    _id: id
  })
    .then(user => {
      res.send({ msg: "deleted" });
    })
    .catch(e => {
      res.status(400).send({ msg: "Not found" });
    });
});
/** ******************************************************************************************************** */
// @route   POST  user/nodemailer
// @desc    retrun user
// @access  private
router.post("/nodemailer", (req, res) => {
  id = req.body.id;
  User.findById(id).then(
    user => {
      //send confirmation email to New User
      const confirmationToken = User.generateConfirmationToken(user);

      // wait for admin's check if check =true send email
      sendConfirmationEmail(user.email, confirmationToken);
      res.json({ user });
    },
    err => {
      res.status(404).send("User not found");
    }
  );
});
/** ******************************************************************************************************** */
// @route   post user
// @desc    apdate accepted to true
// @access  private
router.post("/confirm", (req, res) => {
  var token = req.body.token;

  User.findOneAndUpdate(
    { confirmationToken: token },
    { $set: { confirmed: true, confirmationToken: "" } },
    { new: true }
  )
    .then(user => {
      res.json({ user: user });
    })
    .catch(e => {
      res.status(400).send({ msg: "Not found" });
    });
});
/** ******************************************************************************************************** */

// @route   POST user/signin
// @desc    signin User / Returning JWT Token
// @access  Public
router.post("/signin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findByCredentials(req.body.email, req.body.password).then(
    result => {
      let user = result.user;

      // Sign Token
      return user.generateAuthToken(user).then(token => {
        res.header("Auth", token).send({ user });
      });
    },
    err => {
      res.status(404).send(err);
    }
  );
});

/** ******************************************************************************************************** */
// @route   GET user
// @desc    retrun user
// @access  private
router.get(
  "/getuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

/** ******************************************************************************************************** */
// @route   get /user/signout
// @desc    signout
// @access  private
router.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      user.token = "";
      console.log(user);

      user.save().then(user => res.json({ msg: "SignOut" }));
    });
  }
);
/***************************************** exporting ***************************************************** */
module.exports = router;
