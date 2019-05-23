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

var { WorkSpace } = require("../Models/WorkSpace");

/**
 *  Load Validation
 */
const validateWorkSpaceInput = require("../validation/workSpace");
/******************************************************************************************************* */
// @route   POST workspace/:job
// @desc    create work space
// @access  private
router.post(
  "/:job",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var dataSpace = req.body;
    dataSpace.job = req.params.job;
    dataSpace.creator = req.params.job.user;

    const { errors, isValid } = validateWorkSpaceInput(dataSpace);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    WorkSpace.findOne({ job: req.params.job }).then(space => {
      if (space) {
        errors.workspace = "This job has already an work space";
        res.status(400).json(errors);
      }
      // Save Profile
      new WorkSpace(dataSpace).save().then(workspace => res.json(workspace));
    });
  }
);
/******************************************************************************************************* */
// @route   GET workspace/getall/:id
// @desc    get all work space by id job
// @access  private

/******************************************************************************************************* */
// @route   GET workspace/getbyid/:id
// @desc    get work space by id
// @access  private

/******************************************************************************************************* */
// @route   GET workspace/getbyjob/:id
// @desc    get work space by job id
// @access  private
router.get(
  "/getbyjob/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    WorkSpace.findOne({ job: req.params.id })
      //  .populate("job", ["title1", "title2"])
      .then(space => {
        if (!space) {
          errors.workspace = "There is no work space for this job ";
          res.status(404).json(errors);
        }

        res.json(space);
      })
      .catch(err => res.status(404).json(err));
  }
);
/******************************************************************************************************* */
// @route   POST workspace/getbyjob/:id
// @desc    postulation
// @access  private
/***************************************** exporting ***************************************************** */
module.exports = router;
