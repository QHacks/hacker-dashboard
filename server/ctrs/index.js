const authCtr = require('./auth.controller.js');
const userCtr = require('./user.controller.js');

module.exports = db => {
	let controller = {};
	
	controller.auth = authCtr(db);
	controller.user = userCtr(db);

	return controller;
};
