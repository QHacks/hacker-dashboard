process.env.AUTH_SECRET = "ABC123";

const { createTestClient } = require("apollo-server-testing");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const resolvers = require("../../gql/resolvers");
const typeDefs = require("../../gql/definitions");

module.exports = (db) => {
  const { restApi } = require("../../rest")(db);
  const { oauthApi, verifyAccessToken } = require("../../oauth")(db);

  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/", cors({ origin: "https://qhacks.io" }), restApi());

  app.use("/oauth/", oauthApi());

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
    }
  });

  graphqlServer.applyMiddleware({ app });

  const graphqlClient = createTestClient(graphqlServer);

  return {
    request: request(app),
    graphqlClient
  };
};
