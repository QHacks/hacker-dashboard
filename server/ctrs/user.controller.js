const ERRORS = {
	NOT_FOUND: {
		code: 404,
		type: 'MISSING'
	},
	DB_ERROR: {
		code: 503,
		type: "DB_ERROR"
	}
};

const ERROR_MESSAGES = {
	INVALID_USER_ID: "A user with this identifier not exist!",

	DB_USER: "Could not retreive the user from the database!",
	DB_USERS: "Could not retreive any users from the database!"
};

function createError(errorTpl, message, data = {}) {
	return Object.assign({}, errorTpl, { message, data });
}

module.exports = (db) => {
	const userCtr = {};

	const { User } = require('../models');

	userCtr.getUser = (userId) => new Promise((resolve, reject) => {
		User.findOne({ _id: userId }).then((user) => {
			if (user) resolve(user);
			else reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID));
		}).catch((err) => {
			reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
		});
	});

	userCtr.getAllUsers = () => new Promise((resolve, reject) => {
		User.find().then((users) => {
			resolve({ users });
		}).catch((err) => {
			reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USERS, err));
		});
	});

	userCtr.deleteUser = (userId) => new Promise((resolve, reject) => {
		User.findOneAndRemove({ _id: userId }).then((user) => {
			if (!user) return reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID));
			resolve();
		});
	});

	userCtr.updateUser = (userId, userInfo) => new Promise((resolve, reject) => {
		User.findOne({ _id: userId }).then((user) => {
			if (!user) reject(createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.INVALID_USER_ID));

			Object.keys(userInfo).forEach((key) => {
				if (user[key]) user[key] = userInfo[key];
			});

			user.save().then(resolve).catch((err) => {
				reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
			});

		}).catch((err) => {
			reject(createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err));
		});
	});

	return userCtr;
};
