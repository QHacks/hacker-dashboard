const Router = require('express').Router;

const AUTH = 'auth';

module.exports = ctr => {
	const authAPI = Router();

	// get auth controller
	const { auth } = ctr;

	authAPI.use(`/${AUTH}/session`, (req, res) => {
		let { email, password } = req.body;

		auth.authenticateUser(email, password).then(userInfo => {
			res.status(200).json(userInfo);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	authAPI.use(`/${AUTH}/signup`, (req, res) => {
		auth.signup(req.body).then(userInfo => {
			res.status(200).json(userInfo);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	authAPI.use(`/${AUTH}/refresh`, (req, res) => {
		auth.refresh(req.body.refreshToken).then(userInfo => {
			res.status(200).json(userInfo);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	return authAPI;
};
