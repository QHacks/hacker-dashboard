const { combineResolvers } = require("graphql-resolvers");

const { DatabaseError } = require("../../../errors");

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
      throw new DatabaseError(
        "Unable to create an application review at this time!"
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
      throw new DatabaseError(
        "Unable to retrieve application reviews at this time!"
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
    throw new DatabaseError("Unable to retrieve reviewers at this time!");
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
