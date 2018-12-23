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

  await MailingListSubscription.create({
    mailingListId: event.MailingLists[0].id,
    userId: user && user.id ? user.id : null,
    email: email.toLowerCase()
  });

  return {
    subscriber: {
      email: "bob"
    }
  };
};

const mailingListSubscriberDelete = async (parent, args, ctx, info) => {
  return {
    email: "Bob"
  };
};

// Resolver Map

module.exports = {
  MailingListSubscriber: {
    __resolveType(mailingListSubscriber, ctx, info) {
      return "MailingListSubscriber";
    }
  },
  MutationRoot: {
    mailingListSubscriberCreate,
    mailingListSubscriberDelete
  }
};
