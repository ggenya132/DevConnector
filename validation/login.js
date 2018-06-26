const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be a valid format";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password2 = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
