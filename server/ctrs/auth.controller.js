const customValidator = require('../services/custom-validator');
const auth = require('../auth/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { AUTH_SECRET } = process.env;

const JWT_ISSUER = 'QHacks Authentication';
const ACCESS_TOKEN_EXPIRE_TIME = '5 minutes';
const REFRESH_TOKEN_EXPIRE_TIME = '60 minutes';
const SALT_WORK_FACTOR = 10;

// TODO
const ERRORS = {

};

// TODO
const ERROR_MESSAGES = {

};

/**
 * Creates a user access token.
 * @param {String} userId User identifier to encode in token.
 * @return {String} Access token.
 */
function createAccessToken(userId) {
	return jwt.sign({ userId }, AUTH_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
		issuer: JWT_ISSUER
	});
}

/**
 * Creates a user refresh token.
 * @param {String} userId User identifier to encode in token.
 * @return {String} Refresh token.
 */
function createRefreshToken(userId) {
	return jwt.sign({
		type: 'refresh',
		userId
	}, AUTH_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
		issuer: JWT_ISSUER
	});
}

module.exports = db => {
	let authCtr = {};

	authCtr.ERRORS = ERRORS;
	authCtr.ERROR_MESSAGES = ERROR_MESSAGES;

	const models = {
		User
	} = require('../models');

	authCtr.authenticateUser = (email, password) => new Promise((resolve, reject) => {
		jwt.verify(token, AUTH_SECRET);

	});

	authCtr.refresh = refreshToken => new Promise((resolve, reject) => {
		// verify token
		// pluck user id from verified refresh token
		// create new tokens for user
		// update user
		// resolve with user
	});

	authCtr.signup = signUpInfo => new Promise((resolve, reject) => {
		if (!customValidator.signUpInfo(signUpInfo)) reject();

		const hash = bcrypt.hash(signUpInfo.password, SALT_WORK_FACTOR);

		signUpInfo.password = hash;
		signUpInfo.refreshToken = createRefreshToken();
		signUpInfo.accessToken = createAccessToken();

		User.create(signUpInfo)
			.then(resolve(user))
			.catch(err => {
				reject();
			});
	});

	return authCtr;
};
