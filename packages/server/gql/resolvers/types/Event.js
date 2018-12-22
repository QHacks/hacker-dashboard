// Query Root Resolvers

const events = (parent, args, ctx, info) => {};

const eventById = (parent, args, ctx, info) => {};

const eventBySlug = (parent, args, ctx, info) => {};

// Mutation Root Resolvers

const eventCreate = (parent, args, ctx, info) => {};

const eventUpdateById = (parent, args, ctx, info) => {};

const eventUpdateBySlug = (parent, args, ctx, info) => {};

const eventDeleteById = (parent, args, ctx, info) => {};

const eventDeleteBySlug = (parent, args, ctx, info) => {};

// Resolver Map

module.exports = {
  QueryRoot: {
    events,
    eventById,
    eventBySlug
  },
  MutationRoot: {
    eventCreate,
    eventUpdateById,
    eventUpdateBySlug,
    eventDeleteById,
    eventDeleteBySlug
  }
};
