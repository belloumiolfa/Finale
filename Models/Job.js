/**
 * require dependencies
 */
const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new mongoose.Schema({
  //job informations
  title1: { type: String, required: true },
  title2: { type: String },
  description: { type: String },

  region: { type: String, required: true },
  salary: { type: String, required: true },

  publication: { type: Date },
  deadline: { type: Date },

  sector: { type: String, required: true },
  contract: { type: String },
  schedule: { type: String, required: true },

  competencies: { type: String },

  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  phone: { type: String },

  publiate: { type: String, default: false },
  finish: { type: String, default: false },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },

  applications: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  }
});

/************************************ exporting ******************************************************* */
var Job = mongoose.model("Job", JobSchema);

module.exports = { Job };
