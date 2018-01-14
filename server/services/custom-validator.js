const validator = require('validator');
const moment = require('moment');
const _ = require('lodash');

const NAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/;
const YEAR_REGEXP = /^20[0-9]{2}$/;

const ERROR_MESSAGES = {
    INVALID_DATE: "The date provided is invalid! Be sure to follow ISO or RFC2822 date format.",
    INVALID_EMAIL: "The email address provided is invalid!",
    INVALID_GRAD_YEAR: "The graduation year provided is invalid!",
    INVALID_PASSWORD: "The password provided is invalid, it must be more than eight characters.",
    INVALID_NAME: "The first and last name combination provided is invalid.",
    INVALID_PHONE_NUMBER: "The phone number provided is invalid."
};

class ValidationError extends Error {
        constructor(message) {
                super();
                this.message = message;
        }
}

function validateDate(date) {
    if (!_.isEmpty(date) && moment(date).isValid()) return Promise.resolve();
    return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_DATE));
}

function validateEmail(email) {
        if (!_.isEmpty(email) && validator.isEmail(email)) return Promise.resolve();
        return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_EMAIL));
}

function validateGradYear(year) {
        if (!_.isEmpty(year) && year.match(YEAR_REGEXP)) return Promise.resolve();
        return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_GRAD_YEAR));
}

function validateName(firstName, lastName) {
        const fullName = `${firstName} ${lastName}`;

        if (!_.isEmpty(firstName) && !_.isEmpty(lastName) && fullName.match(NAME_REGEX)) return Promise.resolve();
        return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_NAME));
}

function validatePassword(password) {
        if (!_.isEmpty(password) && validator.isLength(password, { min: 8 })) return Promise.resolve();
        return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_PASSWORD));
}

function validatePhoneNumber(phoneNumber) {
        const phoneNumberLocale = 'any';

        if (!_.isEmpty(phoneNumber) && validator.isMobilePhone(phoneNumber, phoneNumberLocale)) return Promise.resolve();
        return Promise.reject(new ValidationError(ERROR_MESSAGES.INVALID_PHONE_NUMBER));
}

function validateSignUpInfo(signUpInfo) {
        const { dateOfBirth, email, firstName, graduationYear, lastName, phoneNumber, password } = signUpInfo;

        return Promise.all([
            validateDate(dateOfBirth),
            validateEmail(email),
            validateName(firstName, lastName),
            validateGradYear(graduationYear),
            validatePhoneNumber(phoneNumber),
            validatePassword(password)
        ]);
}

module.exports = {
    validateSignUpInfo
};
