const logger = require("../utils/logger");
const mongoose = require("mongoose");
const { noop } = require("lodash");

module.exports = function connectToDB(cb = noop) {
  const host = process.env.MONGO_HOST;
  const name = process.env.MONGO_DBNAME;
  const port = process.env.MONGO_PORT || 27017;

  if (!host || !name) {
    logger.info(
      "Missing Mongo enviroment variable MONGO_HOST or MONGO_DBNAME!"
    );
    throw new Error();
  }

  const uri = `mongodb://${host}:${port}/${name}`;

  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);

  const opt = { useNewUrlParser: true };

  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const authSource = process.env.MONGO_AUTH_SOURCE;

  if (user || pass) {
    Object.assign(opt, { user, pass });

    if (authSource) {
      Object.assign(opt, { authSource });
    }
  } else {
    logger.info("Running Mongo unauthenticated!");
  }

  logger.info(`Connecting to database: ${uri}`);

  return mongoose.connect(
    uri,
    opt,
    cb
  );
};
