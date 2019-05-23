const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateWorkSpaceInput(data) {
  let errors = {};
  /****************************************** Client ************************************************ */

  data.name = !isEmpty(data.name) ? data.name : "";
  if (!Validator.isLength(data.name, 8)) {
    errors.name = "Work space name must be 8 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Work space name field is required";
  }
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";

  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "Deadline field is required";
  }
  data.difficultyLevel = !isEmpty(data.difficultyLevel)
    ? data.difficultyLevel
    : "";

  if (Validator.isEmpty(data.difficultyLevel)) {
    errors.difficultyLevel = "Difficulty Level field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
