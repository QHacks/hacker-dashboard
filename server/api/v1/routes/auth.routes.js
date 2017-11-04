const Router = require('express').Router();

module.exports = ctr => {
	let authAPI = Router();

	const { auth } = ctr;

	authAPI.use('/signup', (req, res) => {

	});

	authAPI.use('/refresh', (req, res) => {
		auth.refresh(req.refreshToken).then();
	});
};
