const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticatedAndAuthorized } = require("../generics");
const { ROLES } = require("../../../oauth/authorization");

const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError,
  GraphQLInternalServerError
} = require("../../../errors/graphql-errors");

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
        `Unable to find mailing list with identifier ${args.id}`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
      );
    }

    return mailingList;
  }
);

const mailingListBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const mailingList = await db.MailingList.findOne({
      where: { slug: args.slug }
    });

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find mailing list with slug ${args.slug}`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
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
        `Unable to find the event with the slug ${eventSlug}.`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
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

    const mailingList = await db.MailingList.findByPk(id);

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find the mailing list with identifier ${id}`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
      );
    }

    const mailingListUpdatePayload = await mailingList.update(input);

    if (!mailingListUpdatePayload) {
      throw new GraphQLInternalServerError(
        `Unable to update the mailing list with identifier ${id} at this time`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return { mailingList: mailingListUpdatePayload };
  }
);

const mailingListUpdateBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { slug, input } = args;

    const mailingList = await db.MailingList.findOne({ where: { slug } });

    if (!mailingList) {
      throw new GraphQLNotFoundError(
        `Unable to find the mailing list with slug ${slug}`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
      );
    }

    const mailingListUpdatePayload = await mailingList.update(input);

    if (!mailingListUpdatePayload) {
      throw new GraphQLInternalServerError(
        `Unable to update the mailing list with slug ${slug} at this time`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return { mailingList: mailingListUpdatePayload };
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
        `Unable to find mailing list with identifier ${id}!`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
      );
    }

    // TODO: Add a migration for onDelete: "CASCADE" to avoid this
    try {
      const destroyMailingListAndSubscriptions = db.sequelize.transaction(
        async (t) => {
          await db.MailingListSubscription.destroy(
            {
              where: { mailingListId: mailingList.id }
            },
            { transaction: t }
          );
          await mailingList.destroy({ transaction: t });

          return { deletedMailingListId: mailingList.id };
        }
      );

      return destroyMailingListAndSubscriptions;
    } catch (e) {
      throw new GraphQLInternalServerError(
        "Unable to delete mailing list at this time.",
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
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
        `Unable to find mailing list with slug ${slug}!`,
        GRAPHQL_ERROR_CODES.MAILING_LIST_NOT_FOUND
      );
    }

    // TODO: Add a migration for onDelete: "CASCADE" to avoid this
    try {
      const destroyMailingListAndSubscriptions = db.sequelize.transaction(
        async (t) => {
          await db.MailingListSubscription.destroy(
            {
              where: { mailingListId: mailingList.id }
            },
            { transaction: t }
          );
          await mailingList.destroy({ transaction: t });

          return { deletedMailingListSlug: mailingList.slug };
        }
      );

      return destroyMailingListAndSubscriptions;
    } catch (err) {
      throw new GraphQLInternalServerError(
        "Unable to delete mailing list at this time.",
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
);

// Type Resolvers

const event = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findByPk(parent.eventId);

    if (!event) {
      throw new GraphQLNotFoundError(
        `Cannot find the event with identifier ${parent.eventId}`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
      );
    }

    return event;
  }
);

const subscribers = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const subscriptions = await db.MailingListSubscription.findAll({
      where: { mailingListId: parent.id },
      include: {
        model: db.User,
        required: false,
        plain: true,
        include: db.OAuthUser
      }
    });

    return subscriptions.map((sub) => sub.User || sub);
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
