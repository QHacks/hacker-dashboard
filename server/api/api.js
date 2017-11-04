const Router = require('express').Router();
const v1 = require('./v1/v1API');

const V1 = 'v1';

module.exports = controller => {
	let clientAPI = Router();

	api.use(`api/${V1}/`, v1(controller));

	return clientAPI;
};
