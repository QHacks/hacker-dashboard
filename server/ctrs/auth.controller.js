const customValidator = require('../services/custom-validator');
const auth = require('../auth/auth');
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const JWT_ISSUER = 'QHacks Authentication';
const ACCESS_TOKEN_EXPIRE_TIME = '5 minutes';
const REFRESH_TOKEN_EXPIRE_TIME = '60 minutes';
const SALT_WORK_FACTOR = 10;

const { AUTH_SECRET } = process.env;

const ERRORS = {
	UNPROCESSABLE: {
		code: 422,
		type: "VALIDATION"
	},
	NOT_FOUND: {
		code: 404,
		type: 'MISSING'
	},
	DB_ERROR: {
		code: 503,
		type: "DB_ERROR"
	},
	INTERNAL_SERVER_ERROR: {
		code: 500,
		type: "INTERNAL_SERVER_ERROR"
	},
	UNAUTHORIZED: {
		code: 401,
		type: "AUTHORIZATION"
	}
};

const ERROR_MESSAGES = {
	INVALID_USER_ID: "A user with this identifier does not exist!",
	INVALID_USER_EMAIL: "A user with this email does not exist!",
	INVALID_REFRESH_TOKEN: "The refresh token provided is invalid!",
	INVALID_CREDENTIALS: "You have provided invalid credentials!",
	INVALID_RESET_HASH: "A user with this reset hash does not exist!",

	DB_USER: "Error creating User in the database!",
	DB_USERS: "Error retreiving Users from the database!",

	RESET_HASH_CREATE_FAIL: "Error when creating the reset hash!"
};

const HACKER_SIGN_UP_FIELDS = [
		'firstName',
		'lastName',
		'email',
		'password',
		'phoneNumber',
		'dateOfBirth',
		'graduationYear'
];

/**
 * Creates a standard format error, see routes for usage.
 * @param {String} message The error message.
 * @param {Integer} status The error status code.
 * @param {Object} [data={}] Error object.
 * @return {Object} Error object.
 */
function createError(errorTpl, message, data = {}) {
	return Object.assign({}, errorTpl, { message, data });
}

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

function createResetPasswordToken(user) {

}

module.exports = (db) => {
	const authCtr = {};

	const models = {
		User
	} = require('../models');

	authCtr.authenticateUser = (email, password) => new Promise((resolve, reject) => {
		User.authenticate(email, password)
			.then((user) => {
				const refreshToken = createRefreshToken(user._id);

				User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true }).then((updatedUser) => {
					const accessToken = createAccessToken(updatedUser._id);

					resolve({ accessToken, refreshToken, user: updatedUser });
				}).catch((err) => {
					reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
				});
			}).catch((err) => {
				reject(createError(ERRORS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS));
			});
	});

	authCtr.refresh = (refreshToken) => new Promise((resolve, reject) => {
		jwt.verify(refreshToken, AUTH_SECRET, (err, decoded) => {
			if (err) reject(createError(ERRORS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_REFRESH_TOKEN, err));
			const { userId } = decoded;
			const refreshToken = createRefreshToken(userId);

			User.findOneAndUpdate({ _id: userId }, { refreshToken }, { new: true }).then((updatedUser) => {
				const accessToken = createAccessToken(updatedUser._id);

				resolve({ accessToken, refreshToken, user: updatedUser });
			}).catch((err) => {
				reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
			});

		});
	});

	authCtr.signup = (signUpInfo) => new Promise((resolve, reject) => {
		signUpInfo = _.pick(signUpInfo, HACKER_SIGN_UP_FIELDS);

		customValidator.validateSignUpInfo(signUpInfo).then(() => {
			User.create(signUpInfo).then((user) => {
				const refreshToken = createRefreshToken(user._id);

				User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true }).then((updatedUser) => {
					const accessToken = createAccessToken(updatedUser._id);

					resolve({ accessToken, refreshToken, user: updatedUser });
				}).catch((err) => {
					reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
				});
			}).catch((err) => {
				reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
			});
		}).catch((err) => {
			reject(createError(ERRORS.UNPROCESSABLE, err.message));
		});
	});

	authCtr.createResetHash = (email) => new Promise((resolve, reject) => {
		User.findOne({ email }).then((user) => {
			bcrypt.hash(email, SALT_WORK_FACTOR, function(err, hash) {
				if (err) reject(createError(ERRORS.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.RESET_HASH_CREATE_FAIL, err));
				User.findOneAndUpdate({ _id: user._id }, { passwordResetHash: hash }, { new: true }).then((updatedUser) => {
					mailer.sendResetPasswordEmail(updatedUser).then(() => {
						resolve();
					}).catch((error) => {
						reject(error);
					});
				}).catch((err) => {
					reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
				});
			});
		}).catch((err) => {
			reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_EMAIL, err));
		});
	});

	authCtr.updatePasswordForReset = (resetHash, password) => new Promise((resolve, reject) => {
		User.findOne({ passwordResetHash: resetHash }).then((user) => {
			if (!user) reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_RESET_HASH));

			user.password = password;

			user.save().then(() => {
				mailer.sendPasswordResetSuccessfulEmail(user).then(() => {
					resolve();
				}).catch((error) => {
					reject(error);
				});
			}).catch((err) => {
				reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
			});
		}).catch((err) => {
			reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_EMAIL, err));
		});
	});


	return authCtr;
};
