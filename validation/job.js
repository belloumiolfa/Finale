const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateJobInput(data) {
  let errors = {};

  data.title1 = !isEmpty(data.title1) ? data.title1 : "";
  data.region = !isEmpty(data.region) ? data.region : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
  data.sector = !isEmpty(data.sector) ? data.sector : "";
  data.schedule = !isEmpty(data.title1) ? data.schedule : "";

  if (!Validator.isLength(data.title1, { min: 10, max: 300 })) {
    errors.title1 = "Title1 must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.title1)) {
    errors.title1 = "Title1 field is required";
  }
  if (Validator.isEmpty(data.region)) {
    errors.region = "Region field is required";
  }

  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is required";
  }
  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "Deadline field is required";
  }

  if (Validator.isEmpty(data.sector)) {
    errors.sector = "Sector field is required";
  }
  if (Validator.isEmpty(data.schedule)) {
    errors.schedule = "Schedule field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
