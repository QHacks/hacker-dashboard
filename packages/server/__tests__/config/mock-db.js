process.env.DB_ENVIRONMENT = "test";

const logger = require("../../utils/logger");
const db = require("../../db")(logger);

module.exports = db;
