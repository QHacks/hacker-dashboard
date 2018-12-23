const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticatedAndAuthorized } = require("../generics");
const { ROLES } = require("../../../oauth/authorization");

// Query Root Resolvers

const event = (parent, args, ctx, info) => {};

const events = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const events = await db.Event.findAll();

    return events;
  }
);

const eventBySlug = (parent, args, ctx, info) => {};

// Mutation Root Resolvers

const eventCreate = (parent, args, ctx, info) => {};

const eventUpdate = (parent, args, ctx, info) => {};

const eventUpdateBySlug = (parent, args, ctx, info) => {};

const eventDelete = (parent, args, ctx, info) => {};

const eventDeleteBySlug = (parent, args, ctx, info) => {};

// Resolver Map

module.exports = {
  QueryRoot: {
    event,
    events,
    eventBySlug
  },
  MutationRoot: {
    eventCreate,
    eventUpdate,
    eventUpdateBySlug,
    eventDelete,
    eventDeleteBySlug
  }
};
