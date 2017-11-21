const customValidator = require('../services/custom-validator');
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');
const crypto = require('crypto');
const _ = require('lodash');

const JWT_ISSUER = 'QHacks Authentication';
const ACCESS_TOKEN_EXPIRE_TIME = '5 minutes';
const REFRESH_TOKEN_EXPIRE_TIME = '60 minutes';
const QHACKS_2018_SLUG = 'qhacks-2018';

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
    'phoneNumber',
    'dateOfBirth',
    'gender',
    'password',
    'confirmPassword',
    'school',
    'degreeType',
    'program',
    'graduationYear',
    'graduationMonth',
    'travelOrigin',
    'numberOfHackathons',
    'whyQhacks',
    'links',
    'isCodeOfConductAccepted'
];

function createError(errorTemplate, message, data = {}) {
    return Object.assign({}, errorTemplate, { message, data });
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

/**
 * Creates a reset password hash.
 * @param {Object} user The user to create the hash for.
 */
function createResetPasswordHash(user) {
    const { AUTH_SECRET } = process.env;
    const timeInMs = Date.now();
    return crypto.createHmac('sha256', AUTH_SECRET)
        .update(`${user.email}${timeInMs}`)
        .digest('hex');
}

module.exports = () => {
    const authCtr = {};

    const { Event, User } = require('../models');

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

        customValidator.validateSignUpInfo(signUpInfo)
            .then(() => Event.findOne({ slug: QHACKS_2018_SLUG }))
            .then((event) => {
                User.create(_.assign({}, signUpInfo, { events: [event._id] }))
                    .then((user) => {
                        const refreshToken = createRefreshToken(user._id);

                        User.findOneAndUpdate({ _id: user._id }, { refreshToken }, { new: true })
                            .then((updatedUser) => {
                                const accessToken = createAccessToken(updatedUser._id);

                                mailer.sendSuccessfulApplicationEmail(updatedUser)
                                    .then(() => {
                                        resolve({ accessToken, refreshToken, user: updatedUser });
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                            })
                            .catch((err) => {
                                reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
                            });
                    })
                    .catch((err) => {
                        reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
                    });
            })
            .catch((err) => {
                reject(createError(ERRORS.UNPROCESSABLE, err.message));
            });
    });

    authCtr.createResetHash = (email) => new Promise((resolve, reject) => {
        User.findOne({ email }).then((user) => {

            const hash = createResetPasswordHash(user);

            User.findOneAndUpdate({ _id: user._id }, { passwordResetHash: hash }, { new: true }).then((updatedUser) => {
                mailer.sendResetPasswordEmail(updatedUser).then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID, err));
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
                }).catch((err) => {
                    reject(err);
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
