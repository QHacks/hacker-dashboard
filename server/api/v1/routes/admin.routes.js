const Router = require('express').Router;

const ADMIN = 'admin';

module.exports = (ctr) => {
	const adminAPI = Router();

	const { admin } = ctr;

	adminAPI.get(`/${ADMIN}/applications`, async (req, res, next) => {
		try {
			const applications = admin.getAllApplications();
		} catch (e) {
			next(e);
		}
	});

	return adminAPI;
};
