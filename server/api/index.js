const Router = require('express').Router;
const v1 = require('./v1/v1API');

const V1 = 'v1';

module.exports = (controllers) => {
    const api = Router();

    api.use(`/${V1}/`, v1(controllers));

    return api;
};
