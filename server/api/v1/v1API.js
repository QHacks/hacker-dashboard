const Router = require('express').Router();
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');

module.exports = ctr => {
	let api = Router();

	// authentication routes
	api.use('/auth', authRoutes(ctr));

	// user routes
	api.use('/user', userRoutes(ctr));

	return api;
};
