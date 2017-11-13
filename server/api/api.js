const Router = require('express').Router;
const auth = require('../auth/auth');
const v1 = require('./v1/v1API');

const V1 = 'v1';

module.exports = (ctr) => {
	const api = Router();

	api.use(`/${V1}/`, v1(ctr));

	return api;
};
