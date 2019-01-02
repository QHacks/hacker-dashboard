require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const history = require("connect-history-api-fallback");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const db = require("./db");

const IS_PROD = process.env.NODE_ENV === "production";
const FORCE_SSL = process.env.FORCE_SSL === "true";
const TRUSTED_REQUEST_ORIGINS = {
  staging: "https://staging.qhacks.io",
  production: "https://app.qhacks.io",
  development: "http://localhost:8080"
};

IS_PROD
  ? logger.info("Running production server!")
  : logger.info("Running development server!");

const resolvers = require("./gql/resolvers");
const typeDefs = require("./gql/definitions");

db()
  .then(async (db) => {
    const { restApi } = require("./rest")(db);
    const { oauthApi, verifyAccessToken } = require("./oauth")(db);

    // Path to static files
    // TODO: Remove this coupling to client package
    const BUNDLE_DIR = path.join(__dirname, "../client/bundle");

    const app = express();
    const port = process.env.PORT || 3000;

    // HTTPS Redirect
    if (IS_PROD) {
      if (FORCE_SSL) {
        app.enable("trust proxy");
        app.use((req, res, next) => {
          if (req.secure) {
            next();
          } else {
            res.redirect(`https://${req.headers.host}${req.url}`);
          }
        });
      }
    }

    // Third Party Middleware
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true }));

    // Public REST Endpoints
    // TODO: Remove completely!
    app.use("/api/", cors({ origin: "https://qhacks.io" }), restApi());

    // Public OAuth Endpoints
    app.use(
      "/oauth/",
      cors({ origin: TRUSTED_REQUEST_ORIGINS[process.env.NODE_ENV] }),
      oauthApi()
    );

    // GraphQL Endpoint
    const graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        try {
          const { user, access } = await verifyAccessToken(req);

          return {
            db,
            user,
            access
          };
        } catch (err) {
          return { db };
        }
      },
      playground: {
        endpoint: "/graphql"
      },
      introspection: true,
      tracing: true
    });

    // Apply Express Middleware
    graphqlServer.applyMiddleware({ app });

    // Fallback if required
    app.use(history());

    // Static Files
    app.use(express.static(BUNDLE_DIR));

    // Database Synchronization
    await db.sequelize.sync();

    logger.info("Database has synchronized successfully!");

    // Start listening!
    app.listen(port, () => {
      logger.info(`QHacks Dashboard is running on port ${port}!`);
    });
  })
  .catch((err) => {
    logger.error(
      "Could not connect to the database. Cannot start server!",
      err
    );
  });
