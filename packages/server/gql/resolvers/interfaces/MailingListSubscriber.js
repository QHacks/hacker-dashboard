const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError,
  GraphQLForbiddenError,
  GraphQLInternalServerError
} = require("../../../errors/graphql-errors");

// Utility method

const upperCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Mutation Root Resolvers

const mailingListSubscriberCreate = async (parent, args, ctx, info) => {
  const { db } = ctx;
  const { mailingListSlug, eventSlug, input } = args;

  const event = await db.Event.findOne({
    where: { slug: eventSlug },
    include: { model: db.MailingList, where: { slug: mailingListSlug } }
  });

  if (!event) {
    throw new GraphQLNotFoundError(
      `Cannot find a mailing list with the slug ${mailingListSlug} associated to an event with the slug ${eventSlug}!`,
      GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
    );
  }

  const user = await db.User.findOne({
    where: { email: input.email.toLowerCase() }
  });

  try {
    const subscriber = await db.MailingListSubscription.create({
      mailingListId: event.MailingLists[0].id,
      email: input.email.toLowerCase()
    });

    return {
      subscriber: user || subscriber
    };
  } catch (err) {
    if (
      err.errors &&
      err.errors[0] &&
      err.errors[0].type &&
      err.errors[0].type === "unique violation"
    ) {
      throw new GraphQLForbiddenError(
        `${input.email} has already been signed up!`,
        GRAPHQL_ERROR_CODES.EMAIL_ALREADY_SUBSCRIBED
      );
    }

    throw new GraphQLInternalServerError(
      "Cannot create subscription at this time",
      GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

const mailingListSubscriberDelete = async (parent, args, ctx, info) => {
  const { db } = ctx;

  const subscription = await db.MailingListSubscription.findOne({
    where: { email: args.email },
    include: {
      model: db.MailingList,
      where: { slug: args.mailingListSlug },
      include: {
        model: db.Event,
        where: { slug: args.eventSlug }
      }
    }
  });

  if (!subscription) {
    throw new GraphQLNotFoundError(
      "Unable to find the requested mailing list subscriber!",
      GRAPHQL_ERROR_CODES.MAILNG_LIST_SUBSCRIBER_NOT_FOUND
    );
  }

  await subscription.destroy();

  return { deletedSubscriberEmail: subscription.email };
};

// Resolver Map

module.exports = {
  MailingListSubscriber: {
    async __resolveType(mailingListSubscriber, ctx, info) {
      if (!mailingListSubscriber.OAuthUser) return "MailingListSubscription";

      if (!mailingListSubscriber.OAuthUser.role) return "Hacker";

      return upperCase(mailingListSubscriber.OAuthUser.role);
    }
  },
  MutationRoot: {
    mailingListSubscriberCreate,
    mailingListSubscriberDelete
  }
};
