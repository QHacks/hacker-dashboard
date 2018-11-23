const { merge } = require("lodash");

const hackerResolvers = require("./types/Hacker");

const userResolvers = require("./interfaces/User");

const resolvers = {};

module.exports = merge(resolvers, userResolvers, hackerResolvers);
