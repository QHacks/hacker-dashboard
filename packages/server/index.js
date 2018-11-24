require("dotenv").config();

const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const history = require("connect-history-api-fallback");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const db = require("./db")(logger);
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

const IS_PROD = process.env.NODE_ENV === "production";
const FORCE_SSL = process.env.FORCE_SSL === "true";

IS_PROD
  ? logger.info("Running production server!")
  : logger.info("Running development server!");

const resolvers = require("./gql/resolvers");
const typeDefs = require("./gql/definitions");

const { restApi } = require("./rest")(db);
const { oauthApi, getUser, getUserAccess } = require("./oauth")(db);

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
        res.redirect("https://" + req.headers.host + req.url);
      }
    });
  }
}

// Third Party Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(auth(db));

// Public REST Endpoints
// TODO: Remove completely!
app.use("/api/", restApi());

// Public OAuth Endpoints
app.use("/oauth/", oauthApi());

// Protected GraphQL Endpoint
const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // // get the user from auth token
    // const user = getUser(req);

    // // throw error if not authenticated
    // if (!user) throw new AuthenticationError("Invalid access token!");

    // // get user access scopes
    // const access = getUserAccess(user);

    const access = {
      scopes: ["hacker:write"]
    };

    return {
      db,
      //user,
      access
    };
  },
  playground: {
    endpoint: "/graphql"
  },
  tracing: true,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  formatResponse: (response) => {
    console.log(response);
    return response;
  }
});

// Apply Express Middleware
graphqlServer.applyMiddleware({ app });

// Fallback if required
app.use(history());

// Static Files
app.use(express.static(BUNDLE_DIR));

// Database Synchronization
// NOTE: We only do force true for dev.
db.sequelize
  .sync({ force: true })
  .then(() => {
    logger.info("Database has synchronized successfully!");

    // Start listening!
    app.listen(port, () =>
      logger.info(`QHacks Dashboard is running on port ${port}!`)
    );
  })
  .catch((err) => {
    logger.error("Database could not synchronize! Cannot start server!");
  });
