require("dotenv").config();

const logger = require("./utils/logger");
const express = require("express");

const IS_PROD = process.env.NODE_ENV === "production";

IS_PROD
  ? logger.info("Running production build!")
  : logger.info("Running development build!");

const app = express();
const port = process.env.PORT || 3002;

app.listen(port, () => logger.info(`QHacks Bot is running on port ${port}!`));
