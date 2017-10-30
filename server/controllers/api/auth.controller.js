const _ = require('lodash');
const bcrypt = require('bcrypt');
const customValidator = require('../../services/custom-validator');
const tokenUtilities = require('../../services/token-utilities');

const authCtrl = {
    refresh,
    signUp
};

module.exports = authCtrl;

const SIGN_UP_FIELDS = [
    'dateOfBirth',
    'email',
    'firstName',
    'graduationYear',
    'lastName',
    'phoneNumber',
    'password'
];

function refresh(req, res, next) {
    const currentRefreshToken = tokenUtilities.verify(req.body.refreshToken);
    const { accountId } = currentRefreshToken;
    const tokens = _createAccountTokens(accountId);
    return _addRefreshTokenToAccount(req.db, accountId, tokens.refreshToken)
        .then(() => res.status(202).send(tokens))
        .catch(next);
}

function signUp(req, res, next) {
    const signUpInfo = _.pick(req.body, SIGN_UP_FIELDS);
    return _validateSignUpInfo(signUpInfo)
        .then(() => _hashPassword(signUpInfo.password))
        .then((hash) => _insertAccount(req.db, _.assign({}, signUpInfo, { password: hash })))
        .then((account) => _createAndUpdateTokens(req.db, account._id))
        .then((tokens) => res.status(201).send(tokens))
        .catch(next);
}

function _addRefreshTokenToAccount(db, accountId, refreshToken) {
    const query = { _id: accountId };
    const update = { refreshToken };
    return db.models.Account.findOneAndUpdate(query, update);
}

function _createAccountTokens(accountId) {
    const accessToken = tokenUtilities.createAccessToken(accountId);
    const refreshToken = tokenUtilities.createRefreshToken(accountId);
    return {
        accessToken,
        refreshToken
    };
}

function _createAndUpdateTokens(db, accountId) {
    const tokens = _createAccountTokens(accountId);
    return _addRefreshTokenToAccount(db, accountId, tokens.refreshToken)
        .then(() => tokens);
}

function _hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

function _insertAccount(db, signUpInfo) {
    return db.models.Account.create(signUpInfo);
}

function _validateSignUpInfo(signUpInfo) {
    const { dateOfBirth, email, firstName, graduationYear, lastName, phoneNumber, password } = signUpInfo;
    return customValidator.date(dateOfBirth)
        .then(() => customValidator.emailAddress(email))
        .then(() => customValidator.name(firstName, lastName))
        .then(() => customValidator.graduationYear(graduationYear))
        .then(() => customValidator.phoneNumber(phoneNumber))
        .then(() => customValidator.password(password));
}
