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
// @desc    Create job
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var newJob = req.body;
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
    .then(jobs => res.send(jobs))
    .catch(err => res.status(404).json({ nojobsfound: "No jobs found" }));
});
/********************************************************************************************************** */
// @route   GET /job
// @desc    Get all jobs publiated
// @access  Public
router.get("/publiated", (req, res) => {
  Job.find({ publiate: true, finish: false })
    .then(jobs => res.send(jobs))
    .catch(err => res.status(404).json({ nojobsfound: "No jobs found" }));
});
/********************************************************************************************************** */
// @route   GET /job/:id
// @desc    Get job by id
// @access  Public
router.get("/:id", (req, res) => {
  const errors = {};

  Job.findById(req.params.id)
    .then(job => {
      if (job) res.json(job);
      else {
        errors.nojobfound = "No job found with that ID";
        res.json(errors);
      }
    })
    .catch(err => res.status(400).json(errors));
});
/** ******************************************************************************************************** */
// @route   GET /job/:user_id
// @desc    Get job by current user id
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user._id);

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
    const filter = req.body;
    const errors = {};

    function Search(job) {
      var query = true;
      if (filter.sector) {
        query = query && filter.sector === job.sector;
        console.log(query);
      }
      if (filter.region) {
        query = query && filter.region === job.region;
        console.log(query);
      }
      if (filter.schedule) {
        query = query && filter.schedule === job.schedule;
        console.log(query);
      }
      if (filter.contract) {
        query = query && filter.contract === job.contract;
        console.log(query);
      }

      return query;
    }
    Job.find({ publiate: true }).then(jobs => {
      var results = jobs.filter(Search);
      if (results.length === 0) {
        errors.jobnotfound = "No jobs found for this filter";
        res.json(errors);
      } else {
        res.json(results);
      }
    });
  }
);
/** ******************************************************************************************************** */
// @route   POST job/postulate
// @desc    postulate
// @access  private
router.post(
  "/postulate/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // console.log(req.params.id);

    Job.findOne({ _id: req.params.id }).then(job => {
      const user = req.user._id;
      // console.log(job.applications);
      const tab = job.applications.filter(job => (job = req.user._id));
      console.log(tab);

      if (tab.length === 0) {
        job.applications.push(user);
        job.save().then(job => {
          console.log(job.applications);
          res.json(job);
        });
      } else {
        errors.postulated = "Already Postulated";
        res.json(errors);
      }
    });
  }
);
/***************************************** exporting ***************************************************** */
module.exports = router;
