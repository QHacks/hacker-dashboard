const validator = require("validator");
const _ = require("lodash");

const NAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/;

function validateEmail(email) {
  if (!_.isEmpty(email) && validator.isEmail(email)) {
    return Promise.resolve();
  }

  return Promise.reject("The email provided is invalid!");
}

function validatePassword(password) {
  if (!_.isEmpty(password) && validator.isLength(password, { min: 8 })) {
    return Promise.resolve();
  }

  return Promise.reject(
    "The password provided is invalid! Must be at least 8 characters long."
  );
}

function validateName(firstName, lastName) {
  const fullName = `${firstName} ${lastName}`;

  if (
    !_.isEmpty(firstName) &&
    !_.isEmpty(lastName) &&
    fullName.match(NAME_REGEX)
  ) {
    return Promise.resolve();
  }

  return Promise.reject("The name provided is invalid!");
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword
};
