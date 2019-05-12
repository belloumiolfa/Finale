/**
 * require dependencies
 */
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();
router.use(bodyParser.json());
/**
 * Load database connexion
 */
var { mongoose } = require("../config");
let { ObjectID } = require("mongodb");
// Validation
const validateJobInput = require("../validation/job");
/**
 * Load job model
 */
var { Job } = require("../Models/Job");
/**
 * Load user model
 */
var { User } = require("../Models/User");
/**
 *Load Profile model
 */
var Profile = require("../Models/Profile");
/********************************************************************************************************** */
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
/********************************************************************************************************** */
// @route   POST /job
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newJob = req.body;
    newJob.creator = req.user._id;

    const { errors, isValid } = validateJobInput(newJob);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    new Job(newJob).save().then(job => res.json(job));
  }
);
/********************************************************************************************************** */
// @route   GET /job
// @desc    Get all jobs
// @access  Public
router.get("/", (req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(404).json({ nojobsfound: "No jobs found" }));
});
/********************************************************************************************************** */
// @route   GET /job/:id
// @desc    Get job by id
// @access  Public
router.get("/:id", (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      if (job) res.json(job);
    })
    .catch(err =>
      res.status(400).json({ nojobfound: "No job found with that ID" })
    );
});
/** ******************************************************************************************************** */
// @route   GET /job/:user_id
// @desc    Get job by current user id
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.find({ creator: req.user._id })
      .then(jobs => res.json(jobs))
      .catch(err =>
        res.status(404).json({ nojobfound: "No job found for this user ID" })
      );
  }
);
/** ******************************************************************************************************** */
// @route   GET /job/:user_id
// @desc    Get job by user id creator
// @access  public
router.get("/user/:user_id", (req, res) => {
  console.log(req.params.user_id);

  Job.find({ creator: req.params.user_id })
    .then(jobs => res.json(jobs))
    .catch(err =>
      res
        .status(404)
        .json({ nojobfound: "No job found created by this user ID" })
    );
});
/** ******************************************************************************************************** */
// @route   DELETE /job/:id
// @desc    Delete job
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Job.findById(req.params.id)
        .then(job => {
          // Check for job owner

          if (job.creator.toString() !== req.user._id.toString()) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          job.remove().then(() => res.json({ deleted: true }));
        })
        .catch(err => res.status(404).json({ jobnotfound: "No job found" }));
    });
  }
);

/** ******************************************************************************************************** */
// @route   POST job/publiate
// @desc    validatejob job
// @access  public
router.get(
  "/publiate/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var id = req.params.id;
    var publication = Date.now();

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({ msg: "Id not valid" });
    }
    Profile.findOne({ user: req.user._id }).then(profile => {
      Job.findById(req.params.id)
        .then(job => {
          // Check for job owner

          if (job.creator.toString() !== req.user._id.toString()) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          job.publiate = true;
          job.publication = publication;
          job.save().then(job => res.json({ job }));
        })
        .catch(err => res.status(404).json({ jobnotfound: "No job found" }));
    });
  }
);

/** ******************************************************************************************************** */
// @route   POST job/finish
// @desc    validatejob job
// @access  public
router.get(
  "/finish/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send({ msg: "Id not valid" });
    }
    Profile.findOne({ user: req.user._id }).then(profile => {
      Job.findById(req.params.id)
        .then(job => {
          // Check for job owner

          if (job.creator.toString() !== req.user._id.toString()) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          job.finish = true;

          job.save().then(job => res.json({ job }));
        })
        .catch(err => res.status(404).json({ jobnotfound: "No job found" }));
    });
  }
);
/** ******************************************************************************************************** */
// @route   POST job/updatejob
// @desc    updatejob job
// @access  public
router.post(
  "/updatejob",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var updates = req.body.job;
    /*
  var job = {};
  if (body.title1) {
    job = body.title1;
  }
  if (body.title2) {
    job = body.title2;
  }
  if (body.description) {
    job = body.description;
  }
  if (body.recruiter) {
    job = body.recruiter;
  }
  if (body.region) {
    job = body.region;
  }
  if (body.salary) {
    job = body.salary;
  }
  if (body.deadline) {
    job = body.deadline;
  }
  if (body.sector) {
    job = body.sector;
  }
  if (body.field) {
    job = body.field;
  }
  if (body.contract) {
    job = body.contract;
  }
  if (body.schedule) {
    job = body.schedule;
  }
  if (body.competencies) {
    job = body.competencies;
  }
  if (body.competencies) {
    job = body.competencies;
  }
  if (body.email) {
    job = body.email;
  }
  if (body.phone) {
    job = body.phone;
  }
  if (body._creator) {
    job = body._creator;
  }*/

    if (!ObjectID.isValid(job._id)) {
      return res.status(404).send({ msg: "Id not valid" });
    }
    Profile.findOne({ user: req.user._id }).then(profile => {
      Job.findById(req.params.id)
        .then(job => {
          // Check for job owner

          if (job.creator.toString() !== req.user._id.toString()) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          job = updates;
          job.save().then(job => res.json({ job }));
        })
        .catch(err => res.status(404).json({ jobnotfound: "No job found" }));
    });
  }
);
/** ******************************************************************************************************** */
// @route   POST job/search
// @desc    jobs filtres post attribut and value search for that job and send it
// @access  public

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    attribut = req.body.attribut;
    value = req.body.value;

    if (attribut == "region") {
      Job.find({ region: value })
        .then(jobs => {
          if (jobs) {
            res.status(200).send({ jobs });
          } else {
            res.status(404).send({ msg: "Not Found" });
          }
        })
        .catch(e => {
          res.status(400).send({ msg: "Bad request" });
        });
    } else if (attribut == "salary") {
      Job.find({ salary: value })
        .then(jobs => {
          if (jobs) {
            res.status(200).send({ jobs });
          } else {
            res.status(404).send({ msg: "Not Found" });
          }
        })
        .catch(e => {
          res.status(400).send({ msg: "Bad request" });
        });
    } else if (attribut == "contract") {
      Job.find({ contract: value })
        .then(jobs => {
          if (jobs) {
            res.status(200).send({ jobs });
          } else {
            res.status(404).send({ msg: "Not Found" });
          }
        })
        .catch(e => {
          res.status(400).send({ msg: "Bad request" });
        });
    } else if (attribut == "sector") {
      Job.find({ sector: value })
        .then(jobs => {
          if (jobs) {
            res.status(200).send({ jobs });
          } else {
            res.status(404).send({ msg: "Not Found" });
          }
        })
        .catch(e => {
          res.status(400).send({ msg: "Bad request" });
        });
    } else if (attribut == "schedule") {
      Job.find({ schedule: value })
        .then(jobs => {
          if (jobs) {
            res.status(200).send({ jobs });
          } else {
            res.status(404).send({ msg: "Not Found" });
          }
        })
        .catch(e => {
          res.status(400).send({ msg: "Bad request" });
        });
    }
  }
);
/***************************************** exporting ***************************************************** */
module.exports = router;
