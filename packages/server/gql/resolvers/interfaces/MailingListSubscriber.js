const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError
} = require("../../../errors/graphql-errors");

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

  const subscriber = await db.MailingListSubscription.create({
    mailingListId: event.MailingLists[0].id,
    userId: user && user.id ? user.id : null,
    email: input.email.toLowerCase()
  });

  return {
    subscriber
  };
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
      "Unable to find requested mailing list subscriber!",
      GRAPHQL_ERROR_CODES.NOT_FOUND
    );
  }

  await subscription.destroy();

  return { deletedSubscriberEmail: subscription.email };
};

// Resolver Map

module.exports = {
  MailingListSubscriber: {
    __resolveType(mailingListSubscriber, ctx, info) {
      return "MailingListSubscription";
    }
  },
  MutationRoot: {
    mailingListSubscriberCreate,
    mailingListSubscriberDelete
  }
};
