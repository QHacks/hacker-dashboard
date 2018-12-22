// Query Root Resolvers

const mailingLists = (parent, args, ctx, info) => {};

const mailingListsByEvent = (parent, args, ctx, info) => {};

const mailingList = (parent, args, ctx, info) => {};

const mailingListBySlug = (parent, args, ctx, info) => {};

// Mutation Root Resolvers

const mailingListCreate = (parent, args, ctx, info) => {};

const mailingListUpdate = (parent, args, ctx, info) => {};

const mailingListUpdateBySlug = (parent, args, ctx, info) => {};

const mailingListDelete = (parent, args, ctx, info) => {};

const mailingListDeleteBySlug = (parent, args, ctx, info) => {};

// Type Resolvers

const event = (parent, args, ctx, info) => {};

const subscribers = (parent, args, ctx, info) => {};

// Resolver Map

module.exports = {
  QueryRoot: {
    mailingLists,
    mailingListsByEvent,
    mailingList,
    mailingListBySlug
  },
  MutationRoot: {
    mailingListCreate,
    mailingListUpdate,
    mailingListUpdateBySlug,
    mailingListDelete,
    mailingListDeleteBySlug
  },
  MailingList: {
    event,
    subscribers
  }
};
