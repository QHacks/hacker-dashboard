const { merge } = require("lodash");

// Type Resolvers
const eventResolvers = require("./types/Event");
const adminResolvers = require("./types/Admin");
const hackerResolvers = require("./types/Hacker");
const applicationResolvers = require("./types/Application");

// Interface Resolvers
const userResolvers = require("./interfaces/User");
const mailingListSubscriberResolvers = require("./interfaces/MailingListSubscriber");

module.exports = merge(
  {},
  userResolvers,
  eventResolvers,
  adminResolvers,
  hackerResolvers,
  applicationResolvers,
  mailingListSubscriberResolvers
);
