const { combineResolvers } = require("graphql-resolvers");

const { GraphQLUserInputError } = require("../../../errors");

const { isAuthorized } = require("../generics");

// Mutation Root Resolver

const applicationReviewCreate = combineResolvers(
  isAuthorized(null, "ADMIN"),
  async (parent, args, ctx, info) => {
    const { db, user } = ctx;
    try {
      const res = db.ApplicationReview.create({
        applicationId: args.applicationId,
        reviewerId: user.id,
        ...args.input
      });
      return { applicationReview: res };
    } catch (err) {
      throw new GraphQLUserInputError(err.message);
    }
  }
);

// Application reviews resolvers

const reviews = combineResolvers(
  isAuthorized(null, "ADMIN"),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const reviews = await db.ApplicationReview.findAll({
      where: {
        applicationId: parent.id
      }
    });

    return reviews;
  }
);

// ApplicationField reviewedBy resolver

const reviewedBy = async (parent, args, ctx, info) => {
  const { db } = ctx;
  const reviewedBy = await db.User.findOne({
    where: { id: parent.reviewerId }
  });

  return reviewedBy;
};

module.exports = {
  Application: {
    reviews
  },
  ApplicationReview: {
    reviewedBy
  },
  MutationRoot: {
    applicationReviewCreate
  }
};
