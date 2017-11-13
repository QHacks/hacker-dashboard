const Router = require('express').Router;
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');

module.exports = ctr => {
	const api = Router();

	// authentication routes
	api.use('/', authRoutes(ctr));

	// user routes
	api.use('/', userRoutes(ctr));

	return api;
};
