process.env.AUTH_SECRET = "ABC123";

const request = require("supertest");

const { GraphQLAuthenticationError } = require("../../errors");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const bodyParser = require("body-parser");

const db = require("./mock-db");
const { verifyAccessToken } = require("../../oauth")(db);
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const resolvers = require("../../gql/resolvers");
const typeDefs = require("../../gql/definitions");

const app = express();

// Third Party Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Protected GraphQL Endpoint
const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    try {
      const { user, access } = await verifyAccessToken(req);

      return {
        db,
        user,
        access
      };
    } catch (err) {
      throw new GraphQLAuthenticationError("Invalid access token!");
    }
  }
});

// Apply Express Middleware
graphqlServer.applyMiddleware({ app });

// Creates an access token for testing
function createMockAccessToken(userId) {
  return jwt.sign(
    {
      userId
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: 300,
      issuer: "QHacks Testing"
    }
  );
}

module.exports = {
  /**
   * Make a GraphQL Request to the mock API
   * userId is provided to create an access token
   */
  gql(userId, query) {
    const accessToken = createMockAccessToken(userId);
    return request(app)
      .post("/graphql")
      .set("authorization", `Bearer ${accessToken}`)
      .send({ operationName: null, query, variables: {} })
      .then(({ body }) => body);
  }
};
