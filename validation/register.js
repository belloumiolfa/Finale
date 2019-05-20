const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  /****************************************** Client ************************************************ */
  if (data.category === "client") {
    data.cin = !isEmpty(data.cin) ? data.cin : "";
    if (!Validator.isLength(data.cin, 8)) {
      errors.cin = "Cin must be 8 characters";
    }

    if (Validator.isEmpty(data.cin)) {
      errors.cin = "Cin field is required";
    }
  }
  /****************************************** association ************************************************ */
  if (data.category === "association") {
    data.nameAssociation = !isEmpty(data.nameAssociation)
      ? data.nameAssociation
      : "";

    if (Validator.isEmpty(data.nameAssociation)) {
      errors.nameAssociation = "Association name field is required";
    }
    data.domaine = !isEmpty(data.domaine) ? data.domaine : "";

    if (!Validator.isLength(data.domaine, { min: 2, max: 30 })) {
      errors.domaine = "Domaine must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.domaine)) {
      errors.domaine = "Domaine field is required";
    }
  }
  /****************************************** company ************************************************ */
  if (data.category === "company") {
    data.nameCompany = !isEmpty(data.nameCompany) ? data.nameCompany : "";
    if (!Validator.isLength(data.nameCompany, { min: 2, max: 30 })) {
      errors.nameCompany = "Company name be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.nameCompany)) {
      errors.nameCompany = "Company name field is required";
    }
    data.tax = !isEmpty(data.tax) ? data.tax : "";

    if (!Validator.isLength(data.tax, { min: 2, max: 30 })) {
      errors.tax = "Tax be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.tax)) {
      errors.tax = "tax field is required";
    }
    data.activity = !isEmpty(data.activity) ? data.activity : "";

    if (!Validator.isLength(data.activity, { min: 2, max: 30 })) {
      errors.activity = "Activity be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.activity)) {
      errors.activity = "Activity field is required";
    }
  }
  /************************************************************************************************** */
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userName = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
