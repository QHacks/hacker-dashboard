const customValidator = require('../services/custom-validator');
const jwt = require('jsonwebtoken');
const emails = require('../emails');
const crypto = require('crypto');
const _ = require('lodash');
const { Event, User } = require('../models');
const { ERROR_TEMPLATES, createError } = require('../errors');
const { EMAILS, ERROR } = require('../strings');

const JWT_ISSUER = 'QHacks Authentication';
const ACCESS_TOKEN_EXPIRE_TIME = '5 minutes';
const REFRESH_TOKEN_EXPIRE_TIME = '60 minutes';
const QHACKS_2018_SLUG = 'qhacks-2018';

const { AUTH_SECRET } = process.env;

const HACKER_SIGN_UP_FIELDS = [
	'firstName',
	'lastName',
	'email',
	'phoneNumber',
	'dateOfBirth',
	'gender',
	'password',
	'school',
	'degreeType',
	'program',
	'graduationYear',
	'graduationMonth',
	'travelOrigin',
	'numberOfHackathons',
	'whyQhacks',
	'links'
];


function createAccessToken(userId) {
	return jwt.sign({ userId }, AUTH_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
		issuer: JWT_ISSUER
	});
}

function createRefreshToken(userId) {
	return jwt.sign({
		type: 'refresh',
		userId
	}, AUTH_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
		issuer: JWT_ISSUER
	});
}


function createResetPasswordHash(user) {
	const { AUTH_SECRET } = process.env;
	const timeInMs = Date.now();
	return crypto.createHmac('sha256', AUTH_SECRET)
		.update(`${user.email}${timeInMs}`)
		.digest('hex');
}

module.exports = {
	authenticateUser(email, password) {
		return new Promise((resolve, reject) => {
			User.authenticate(email, password)
				.then((user) => {
					const refreshToken = createRefreshToken(user._id);

					User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true }).then((updatedUser) => {
						const accessToken = createAccessToken(updatedUser._id);

						resolve({ accessToken, refreshToken, user: updatedUser });
					}).catch((err) => {
						reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID, err));
					});
				}).catch((err) => {
					reject(createError(ERROR_TEMPLATES.UNAUTHORIZED, ERROR.INVALID_CREDENTIALS));
			});
		});
	},

	refresh(refreshToken) {
		return new Promise((resolve, reject) => {
			jwt.verify(refreshToken, AUTH_SECRET, (err, decoded) => {
				if (err) reject(createError(ERROR_TEMPLATES.UNAUTHORIZED, ERROR.INVALID_REFRESH_TOKEN, err));
				const { userId } = decoded;
				const refreshToken = createRefreshToken(userId);

				User.findOneAndUpdate({ _id: userId }, { refreshToken }, { new: true }).then((updatedUser) => {
					const accessToken = createAccessToken(updatedUser._id);

					resolve({ accessToken, refreshToken, user: updatedUser });
				}).catch((err) => {
					reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID, err));
				});
			});
		});
	},

	signup(signUpInfo) {
		return new Promise((resolve, reject) => {
			signUpInfo = _.pick(signUpInfo, HACKER_SIGN_UP_FIELDS);

			customValidator.validateSignUpInfo(signUpInfo)
				.then(() => Event.findOne({ slug: QHACKS_2018_SLUG }))
				.then((event) => {
					User.create(_.assign({}, signUpInfo, { events: [event._id] }))
							.then((user) => {
								const refreshToken = createRefreshToken(user._id);

								User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true })
									.then((updatedUser) => {
										const accessToken = createAccessToken(updatedUser._id);
										resolve({ accessToken, refreshToken, user: updatedUser });
									})
									.catch((err) => {
										reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID, err));
									});
							})
							.catch((err) => {
								reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_CREATE, err));
							});
				})
				.catch((err) => {
					reject(createError(ERROR_TEMPLATES.UNPROCESSABLE, err.message));
				});
		});
	},

	createResetHash(email) {
		return new Promise((resolve, reject) => {
			User.findOne({ email }).then((user) => {

				const hash = createResetPasswordHash(user);

				User.findOneAndUpdate({ _id: user._id }, { passwordResetHash: hash }, { new: true }).then((updatedUser) => {
					emails.sendEmail(EMAILS.TEMPLATES.RESET_PASSWORD.NAME, updatedUser.toObject()).then(() => {
						resolve();
					}).catch((err) => {
						reject(createError(err));
					});
				}).catch((err) => {
					reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID, err));
				});
			}).catch((err) => {
				reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_EMAIL, err));
			});
		});
	},

	updatePasswordForReset(resetHash, password) {
		return new Promise((resolve, reject) => {
			User.findOne({ passwordResetHash: resetHash }).then((user) => {
				if (!user) reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_RESET_HASH));

				user.password = password;
				user.passwordResetHash = null;
				user.save().then(() => {
					emails.sendEmail(EMAILS.TEMPLATES.RESET_PASSWORD_SUCCESS.NAME, user).then(() => {
						resolve();
					}).catch((err) => {
						reject(err);
					});
				}).catch((err) => {
					reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_CREATE, err));
				});
			}).catch((err) => {
				reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_EMAIL, err));
			});
		});
	}
};
