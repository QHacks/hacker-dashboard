const mongoose = require('mongoose');
const winston = require('winston');

const noop = () => {};

module.exports = () => {
	const host = process.env.MONGO_HOST;
	const name = process.env.MONGO_DBNAME;
	const port = process.env.MONGO_PORT || 27017;

	if (!host || !name) {
		winston.info("Missing Mongo enviroment variable MONGO_HOST or MONGO_DBNAME!");
		throw new Error();
	}

	const user = process.env.MONGO_USER;
	const pass = process.env.MONGO_PASS;
	const baseConnectionOptions = { useMongoClient: true };

	if (!user || !pass) winston.info("Running Mongo unauthenticated!");

	const url = `mongodb://${host}:${port}/${name}`;
	mongoose.Promise = global.Promise;

	winston.info("Connecting to database:", url);

	let opt = user && pass && Object.assign({}, baseConnectionOptions, { user, pass }) || baseConnectionOptions;

	return (cb = noop) => mongoose.connect(url, opt, cb);
};
