const authCtr = require('./auth.controller.js');
const userCtr = require('./user.controller.js');

const ERRORS = {
	VALIDATION: {
		code: 400,
		type: 'VALIDATION'
	},

	MISSING: {
		code: 404,
		type: 'MISSING'
	},

	DB_ERROR: {
		code: 503,
		type: 'DATABASE_ERROR'
	}
};

const ERROR_MESSAGES = {

};

module.exports = db => {
	let controller = {};

	controller.ERROR_TYPES = Object.keys(ERRORS);
	controller.ERROR_MESSAGES = ERROR_MESSAGES;

	constroller.auth = authCtr(db);
	constroller.user = userCtr(db);

	return controller;
};
