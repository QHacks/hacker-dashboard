const { merge } = require("lodash");

// Type Resolvers
const hackerResolvers = require("./types/Hacker");
const applicationResolvers = require("./types/Application");

// Interface Resolvers
const userResolvers = require("./interfaces/User");

const resolvers = {};

module.exports = merge(
  resolvers,
  userResolvers,
  hackerResolvers,
  applicationResolvers
);
