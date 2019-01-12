const { combineResolvers } = require("graphql-resolvers");

const {
  GraphQLInternalServerError,
  GRAPHQL_ERROR_CODES
} = require("../../../errors/graphql-errors");
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
      throw new GraphQLInternalServerError(
        "Unable to create an application review at this time!",
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
);

// Application reviews resolvers

const reviews = combineResolvers(
  isAuthorized(null, "ADMIN"),
  async (parent, args, ctx, info) => {
    try {
      const { db } = ctx;
      const applicationReviews = await db.ApplicationReview.findAll({
        where: {
          applicationId: parent.id
        }
      });

      return applicationReviews;
    } catch (err) {
      throw new GraphQLInternalServerError(
        "Unable to retrieve application reviews at this time!",
        GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
);

// ApplicationField reviewedBy resolver

const reviewedBy = async (parent, args, ctx, info) => {
  try {
    const { db } = ctx;
    const reviewer = await db.User.findOne({
      where: { id: parent.reviewerId }
    });

    return reviewer;
  } catch (err) {
    throw new GraphQLInternalServerError(
      "Unable to retrieve reviewers at this time!",
      GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
    );
  }
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
