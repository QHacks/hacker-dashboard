const _ = require('lodash');
const moment = require('moment');
const validator = require('validator');

const customValidator = {
    date,
    emailAddress,
    graduationYear,
    name,
    password,
    phoneNumber
};

module.exports = customValidator;

const NAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/;
const YEAR_REGEXP = /^20[0-9]{2}$/;

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 422;
    }
}

function date(date) {
    const momentDate = moment(date);
    if (!_.isEmpty(date) && momentDate.isValid()) {
        return Promise.resolve();
    }
    const error = new ValidationError('The date provided is invalid.');
    return Promise.reject(error);
}

function emailAddress(email) {
    if (!_.isEmpty(email) && validator.isEmail(email)) {
        return Promise.resolve();
    }
    const error = new ValidationError('This email address is invalid.');
    return Promise.reject(error);
}

function graduationYear(year) {
    if (!_.isEmpty(year) && year.match(YEAR_REGEXP)) {
        return Promise.resolve();
    }
    const error = new ValidationError('The graduation year provided is invalid.');
    return Promise.reject(error);
}

function name(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    if (!_.isEmpty(firstName) && !_.isEmpty(lastName) && fullName.match(NAME_REGEX)) {
        return Promise.resolve();
    }
    const error = new ValidationError('The first or last name provided is invalid.');
    return Promise.reject(error);
}

function password(password) {
    if (!_.isEmpty(password) && validator.isLength(password, { min: 8 })) {
        return Promise.resolve();
    }
    const error = new ValidationError('The password provided is invalid.');
    return Promise.reject(error);
}

function phoneNumber(phoneNumber) {
    const phoneNumberLocale = 'any';
    if (!_.isEmpty(phoneNumber) && validator.isMobilePhone(phoneNumber, phoneNumberLocale)) {
        return Promise.resolve();
    }
    const error = new ValidationError('The phone number provided is invalid.');
    return Promise.reject(error);
}