const _ = require('lodash');
const dbModels = require('../models');
const mongoose = require('mongoose');
const winston = require('winston');

const dbCtrl = {
    connectToDb
};

module.exports = dbCtrl;

function connectToDb() {
    const mongoUri = _getMongoUri();
    const pass = process.env.MONGO_PASS;
    const user = process.env.MONGO_USER;
    const connectionOptions = { useMongoClient: true };

    if (pass) {
        connectionOptions.pass = pass;
    }
    if (user) {
        connectionOptions.user = user;
    }

    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUri, connectionOptions)
        .then(() => winston.info(`Connected to db at ${mongoUri}`));

    const db = mongoose.connection;
    dbModels.forEach((model) => db.model(...model));

    return function connectionMiddleware(req, res, next) {
        req.db = db;
        return next();
    };
}

function _getMongoUri() {
    const dbName = process.env.MONGO_DBNAME;
    const host = process.env.MONGO_HOST;

    if (!dbName) {
        throw new Error('No DB name supplied');
    }
    if (!host) {
        throw new Error('No DB host supplied');
    }

    const port = _.get(process.env, 'MONGO_PORT', 27017);

    return `mongodb://${host}:${port}/${dbName}`;
}
