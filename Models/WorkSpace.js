/**
 * require dependencies
 */
const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

// Create Schema
const WorkSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "job"
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  finished: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false
  },
  difficultyLevel: {
    type: String,
    default: "Easy"
  },
  invitations: [
    {
      freelance: { type: Schema.Types.ObjectId, ref: "user" },
      accepted: { type: Boolean, default: false }
    }
  ],
  postulations: [
    {
      freelance: { type: Schema.Types.ObjectId, ref: "user" },
      accepted: { type: Boolean, default: false }
    }
  ],
  workers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  deadline: { type: Date },
  start: { type: Date }
});
/************************************ exporting ******************************************************* */
var WorkSpace = mongoose.model("workSpace", WorkSpaceSchema);

module.exports = { WorkSpace };
