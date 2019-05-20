/**
 * require dependencies
 */
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const ENV = require("../Constants");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new mongoose.Schema({
  //user informations
  userName: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },

  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: Date },
  sex: { type: String },

  //information commun
  email: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  phone: { type: String },
  fax: { type: String },
  adress: {
    city: { type: String },
    country: { type: String },
    zip: { type: String }
  },
  webSite: { type: String },

  //another
  nameAssociation: { type: String },
  domaine: { type: String },
  nameCompany: { type: String },
  tax: { type: String },
  activity: { type: String },
  cin: { type: String },
  avatar: { type: String },
  category: { type: String },

  //token
  date: { type: Date, default: Date.now },

  token: {
    type: String
  },

  confirmationToken: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  }
});

/************************************* findByCredentials ******************************************* */

UserSchema.statics.findByCredentials = (email, password) => {
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject({ email: "User not found" });
    }

    return new Promise((resolve, reject) => {
      // Check Password
      bcrypt.compare(password, user.password).then(res => {
        if (res) {
          // User Matched
          resolve({ user: user });
        } else {
          reject({ password: "Password Incorrect" });
        }
      });
    });
  });
};

/************************************* generateAuthToken ******************************************* */

UserSchema.methods.generateAuthToken = user => {
  var access = "auth";
  // Create JWT Payload
  const payload = { user };
  const privateKEY = ENV.tokenSecret;
  const signOptions = {
    expiresIn: "12h"
  };

  //create object token
  var token = "Bearer " + jwt.sign(payload, privateKEY, signOptions);

  user.token = token;

  return user.save().then(() => {
    return token;
  });
};
/******************************************** findByToken ******************************************* */
UserSchema.statics.findByToken = token => {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "formalab");
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    token: token,
    access: "auth"
  });
};

/******************************** generateConfirmationToken ******************************************* */

UserSchema.statics.generateConfirmationToken = user => {
  var access = "auth";
  // Create JWT Payload
  const payload = { data1: user };
  const privateKEY = ENV.tokenSecret;
  const signOptions = {
    expiresIn: "12h"
  };
  //create object token
  var token = "Bearer " + jwt.sign(payload, privateKEY, signOptions);
  return token;
};

/************************************* generateConfirmationUrl **************************************** */
UserSchema.statics.generateConfirmationUrl = token => {
  return `${ENV.HOST}/home/confirmation/${token}`;
};

/************************************ exporting ******************************************************* */
var User = mongoose.model("user", UserSchema);

module.exports = { User };
