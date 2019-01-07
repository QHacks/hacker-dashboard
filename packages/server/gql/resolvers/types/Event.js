const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticatedAndAuthorized } = require("../generics");
const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError,
  GraphQLUserInputError,
  GraphQLInternalServerError
} = require("../../../errors/graphql-errors");
const { ROLES } = require("../../../oauth/authorization");

// Query Root Resolvers

const event = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findByPk(args.id);

    if (!event) {
      throw new GraphQLNotFoundError(
        `Unable to find hacker with id ${args.id}`,
        GRAPHQL_ERROR_CODES.HACKER_NOT_FOUND
      );
    }

    return event;
  }
);

const events = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const events = await db.Event.findAll();

    return events;
  }
);

const eventBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findOne({ where: { slug: args.slug } });

    if (!event) {
      throw new GraphQLNotFoundError(
        `Unable to the event with identifier ${args.id}.`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
      );
    }

    return event;
  }
);

// Mutation Root Resolvers

const eventCreate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { input } = args;

    const requiredFields = [
      "name",
      "slug",
      "endDate",
      "startDate",
      "hasProjects",
      "requiresApplication"
    ];

    requiredFields.forEach((field) => {
      if (!(field in input)) {
        throw new GraphQLUserInputError(`${field} must be provided!`, {
          requiredField: field
        });
      }
    });

    const event = await db.Event.create(input);

    return { event };
  }
);

const eventUpdate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { input, id } = args;

    const eventUpdatePayload = await db.Event.update(input, {
      where: { id },
      returning: true,
      plain: true
    });

    if (!eventUpdatePayload || !eventUpdatePayload[1]) {
      throw new GraphQLInternalServerError(
        `Unable to update the event with identifier ${id}.`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return { event: eventUpdatePayload[1] };
  }
);

const eventUpdateBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { input, slug } = args;

    const eventUpdatePayload = await db.Event.update(input, {
      where: { slug },
      returning: true,
      plain: true
    });

    if (!eventUpdatePayload || !eventUpdatePayload[1]) {
      throw new GraphQLInternalServerError(
        `Unable to update the event with slug ${slug}.`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return { event: eventUpdatePayload[1] };
  }
);

const eventDelete = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findByPk(args.id);

    if (!event) {
      throw new GraphQLNotFoundError(
        `Unable to find the event with identifier ${args.id}.`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
      );
    }

    // TODO: add a migration for onDelete: "CASCADE" to avoid this transaction
    try {
      const deleteEventAndSubscriptions = db.sequelize.transaction(
        async (t) => {
          await db.MailingListSubscription.destroy({
            where: {},
            include: { model: db.MailingList, where: { eventId: event.id } }
          });
          await event.destroy();

          return { deletedEventId: event.id };
        }
      );

      return deleteEventAndSubscriptions;
    } catch (err) {
      throw new GraphQLInternalServerError(
        `Unable to delete the event with identifier ${args.id} at this time`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
);

const eventDeleteBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findOne({ where: { slug: args.slug } });

    if (!event) {
      throw new GraphQLNotFoundError(
        `Unable to find event with slug ${args.slug}`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
      );
    }

    // TODO: add a migration for onDelete: "CASCADE" to avoid this transaction
    try {
      const deleteEventAndSubscriptions = db.sequelize.transaction(
        async (t) => {
          await db.MailingListSubscription.destroy({
            where: {},
            include: { model: db.MailingList, where: { eventId: event.id } }
          });
          await event.destroy();

          return { deletedEventSlug: event.slug };
        }
      );

      return deleteEventAndSubscriptions;
    } catch (err) {
      throw new GraphQLInternalServerError(
        `Unable to delete the event with slug ${args.slug} at this time.`,
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
);

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
