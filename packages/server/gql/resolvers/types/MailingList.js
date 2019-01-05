const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticatedAndAuthorized } = require("../generics");
const {
  GraphQLNotFoundError,
  GraphQLUserInputError
} = require("../../../errors/graphql-errors");
const { ROLES } = require("../../../oauth/authorization");
// Query Root Resolvers

const mailingLists = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const mailingLists = await db.MailingList.findAll();

    return mailingLists;
  }
);

const mailingListsByEvent = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const mailingLists = await db.MailingList.findAll({
      include: {
        model: db.Event,
        where: {
          slug: args.eventSlug
        }
      }
    });

    return mailingLists;
  }
);

const mailingList = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const mailingList = await db.MailingList.findByPk(args.id);

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find mailing list with identifier ${args.id}`
      );
    }

    return mailingList;
  }
);

const mailingListBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const mailingList = await db.MailingList.find({
      where: { slug: args.slug }
    });

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find mailing list with slug ${args.slug}`
      );
    }

    return mailingList;
  }
);

// Mutation Root Resolvers

const mailingListCreate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { input, eventSlug } = args;

    const event = await db.Event.findOne({ where: { slug: eventSlug } });

    if (!event) {
      throw new GraphQLNotFoundError(
        `unable to find event with slug ${eventSlug}`
      );
    }

    const mailingList = await event.createMailingList(input);

    return { mailingList };
  }
);

const mailingListUpdate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { id, input } = args;

    const mailingListUpdatePayload = await db.MailingList.update(input, {
      where: { id },
      returning: true,
      plain: true
    });

    return { mailingList: mailingListUpdatePayload[1] };
  }
);

const mailingListUpdateBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { slug, input } = args;

    const mailingListUpdatePayload = await db.MailingList.update(input, {
      where: { slug },
      returning: true,
      plain: true
    });

    return { mailingList: mailingListUpdatePayload[1] };
  }
);

const mailingListDelete = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { id } = args;

    const mailingList = await db.MailingList.findByPk(id);

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find mailing list with identifier ${id}!`
      );
    }

    await mailingList.destroy();

    return { deletedMailingListId: mailingList.id };
  }
);

const mailingListDeleteBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { slug } = args;

    const mailingList = await db.MailingList.findOne({ where: { slug } });

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find mailing list with slug ${slug}!`
      );
    }

    await mailingList.destroy();

    return { deletedMailingListSlug: mailingList.slug };
  }
);

// Type Resolvers

const event = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findByPk(parent.eventId);

    return event;
  }
);

const subscribers = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const subscriptions = await db.MailingListSubscription.findAll({
      where: { mailingListId: parent.id }
    });

    const res = subscriptions.map((sub) => ({
      email: sub.email
    }));

    return res;
  }
);

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
