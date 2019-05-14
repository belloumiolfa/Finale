const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.social.google)) {
    if (!Validator.isURL(data.social.google)) {
      errors.google = "Not a valid URL";
    }
  }

  if (!isEmpty(data.social.twitter)) {
    if (!Validator.isURL(data.social.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.social.facebook)) {
    if (!Validator.isURL(data.social.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.social.linkedin)) {
    if (!Validator.isURL(data.social.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
