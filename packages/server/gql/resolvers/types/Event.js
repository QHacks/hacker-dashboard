// Query Root Resolvers

const event = (parent, args, ctx, info) => {};

const events = (parent, args, ctx, info) => {};

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
