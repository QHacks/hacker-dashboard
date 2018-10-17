require("dotenv").config();

const logger = require("./utils/logger");
const express = require("express");
const path = require("path");

// Path to static files
const BUNDLE_DIR = path.join(__dirname, "./bundle");

const app = express();
const port = process.env.PORT || 3001;

// Serve Static Files
app.use(express.static(BUNDLE_DIR));

// Start listening!
app.listen(port, () =>
  logger.info(`QHacks Client is running on port ${port}!`)
);
