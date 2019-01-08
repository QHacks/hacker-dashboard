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

async function getAccessForUser(user) {
  const oauthUser = await user.getOAuthUser();

  return {
    scopes: JSON.parse(oauthUser.scopes),
    role: oauthUser.role
  };
}

module.exports = (db) => {
  async function graphqlClient(user = null) {
    try {
      if (!user) {
        user = await db.User.findOne({
          where: {
            email: "hacker@test.com"
          }
        });
      }

      const access = await getAccessForUser(user);

      const context = () => ({
        db,
        user,
        access
      });

      const graphqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        context
      });

      return createTestClient(graphqlServer);
    } catch (err) {
      console.warn("Cannot create test GraphQL client!", err);
    }
  }

  const { oauthApi } = require("../../oauth")(db);

  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/oauth/", oauthApi());

  return {
    request: request(app),
    graphqlClient
  };
};
