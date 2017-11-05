// TODO
const ERRORS = {

};

// TODO
const ERROR_MESSAGES = {

};

module.exports = db => {
	let userCtr = {};

	userCtr.ERRORS = ERRORS;
	userCtr.ERROR_MESSAGES = ERROR_MESSAGES;

	const models = {
		User
	} = require('../models');

	userCtr.createUser = userInfo => new Promise((resolve, reject) => {
		User.create(userInfo).then(resolve).catch(err => {
			if (!err.errors) reject(); // add logging
			else reject(); // add logging
		});
	});

	userCtr.getUser = userId => new Promise((resolve, reject) => {
		User.findOne({ _id: userId }).then(user => {
			if (user) resolve(user);
			else reject(); // add logging
		}).catch(err => {
			// add logging
		});
	});

	userCtr.deleteUser = userId => new Promise((resolve, reject) => {
		User.findOneAndRemove({ _id: userId }).then(user => {
			if (!user) reject(); // add logging
			resolve();
		}).catch(err => {
			// add logging
		});
	});

	userCtr.updateUser = (userId, userInfo) => new Promise((resolve, reject) => {
		User.findOne({ userId }).then(user => {
			if (!user) reject(); // add logging

			Object.keys(userInfo).forEach(key => {
				if (user[key]) user[key] = userInfo[key];
			});

			user.save().then(resolve).catch(err => {
				if (!err.errors) reject(); // add logging
				else reject(); // add logging
			});

		}).catch(err => {
			reject(); // add logging
		});
	});

	userCtr.getAllUsers = () => new Promise((resolve, reject) => {
		User.find().then(users => {
			resolve(users);
		}).catch(err => {
			reject(); // add logging
		});
	});

	return userCtr;
};
