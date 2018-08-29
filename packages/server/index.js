require("dotenv").config();

const history = require("connect-history-api-fallback");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const express = require("express");
const path = require("path");
const helmet = require("helmet");

const IS_PROD = process.env.NODE_ENV === "production";
const FORCE_SSL = process.env.FORCE_SSL === "true";

IS_PROD
  ? logger.info("Running production build!")
  : logger.info("Running development build!");

const auth = require("./auth");
const api = require("./api");
const controllers = require("./controllers");
const connectToDB = require("./db");
const webhook = require("./webhook");
const { createEmailsMiddleware } = require("./emails");
const { initSettings } = require("./settings");

// Path to static files
const BUNDLE_DIR = path.join(__dirname, "../client/bundle");

const app = express();
const port = process.env.PORT || 3000;

// Third Party Middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB(async (err) => {
  if (err) {
    logger.info("Could not connect to thes database!");
    return;
  }

  logger.info("Successfully connected to the database!");

  // HTTPS Redirect for production
  if (IS_PROD) {
    if (FORCE_SSL) {
      app.enable("trust proxy");
      app.use((req, res, next) => {
        if (req.secure) {
          next();
        } else {
          res.redirect("https://" + req.headers.host + req.url);
        }
      });
    }
  }

  try {
    await initSettings();
  } catch (err) {
    logger.error("Could not initialize the application with settings");
    logger.error(err);
    return;
  }

  // Res.on('finish') hooks
  app.use(webhook());
  app.use(createEmailsMiddleware());

  // Core API
  app.use("/api/", auth(), api(controllers));

  // Fallback if page reload
  app.use(history());

  // Static Files
  app.use(express.static(BUNDLE_DIR));

  // Start listening!
  app.listen(port, () =>
    logger.info(`QHacks Dashboard running on port ${port}!`)
  );
});
