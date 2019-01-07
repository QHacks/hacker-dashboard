const { merge } = require("lodash");

// Type Resolvers
const applicationResolvers = require("./types/Application");
const hackerResolvers = require("./types/Hacker");
const adminResolvers = require("./types/Admin");

// Interface Resolvers
const userResolvers = require("./interfaces/User");

module.exports = merge(
  {},
  userResolvers,
  adminResolvers,
  hackerResolvers,
  applicationResolvers
);
