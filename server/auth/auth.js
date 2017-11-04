const Router = require('express').Router();
const jwt = require('express-jwt');


const AUTH_API_REGEXP = /^\/api\/auth\//;
const { AUTH_SECRET } = process.env;

module.exports = () => {
		const options = { secret: AUTH_SECRET };
		const paths = { path: [AUTH_API_REGEXP] };
		return jwt(options).unless(paths);
};

module.exports = authorization;

const Router = require('express').Router();

module.exports = ctr => {
	const authApi = Router();

	authApi.use('/signup', (req, res) => {

	});

	authApi.use('/refresh', (req, res) => {

	});

	return authApi;
};

const _ = require('lodash');
const bcrypt = require('bcrypt');
const customValidator = require('../../services/custom-validator');
const tokenUtilities = require('../../services/token-utilities');

const jwt = require('jsonwebtoken');

const tokenUtilities = {
		createAccessToken,
		createRefreshToken,
		verify
};

module.exports = tokenUtilities;

const { AUTH_SECRET } = process.env;

function createAccessToken(accountId) {
		const payload = {
				accountId
		};
		const options = {
				expiresIn: '5 minutes',
				issuer: 'QHacks authentication'
		};
		return jwt.sign(payload, AUTH_SECRET, options);
}

function createRefreshToken(accountId) {
		const payload = {
				type: 'refresh',
				accountId
		};
		const options = {
				expiresIn: '60 minutes',
				issuer: 'QHacks authentication'
		};
		return jwt.sign(payload, AUTH_SECRET, options);
}

function verify(token) {
		return jwt.verify(token, AUTH_SECRET);
}
