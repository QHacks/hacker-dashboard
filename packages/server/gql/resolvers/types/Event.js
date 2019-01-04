const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticatedAndAuthorized } = require("../generics");
const {
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
        `Unable to find hacker with id ${args.id}`
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
        `Unable to find hacker with id ${args.id}`
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
        throw new GraphQLUserInputError(`${field} must be provided!`);
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

    return { event: eventUpdatePayload[1] };
  }
);

const eventDelete = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findByPk(args.id);

    if (!event) {
      throw new GraphQLUserInputError(
        `Unable to find event with identifier ${args.id}`
      );
    }

    try {
      await db.Event.destroy({
        where: { id: args.id }
      });
    } catch (err) {
      throw new GraphQLInternalServerError(
        "Unable to delete event at this time."
      );
    }

    return { deletedEventId: event.id };
  }
);

const eventDeleteBySlug = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findOne({ where: { slug: args.slug } });

    if (!event) {
      throw new GraphQLUserInputError(
        `Unable to find event with slug ${args.slug}`
      );
    }

    try {
      await db.Event.destroy({
        where: { slug: args.slug }
      });
    } catch (err) {
      throw new GraphQLInternalServerError(
        "Unable to delete event at this time."
      );
    }

    return { deletedEventSlug: event.slug };
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
