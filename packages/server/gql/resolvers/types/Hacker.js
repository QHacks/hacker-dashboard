const { combineResolvers } = require("graphql-resolvers");
const { isEmpty } = require("lodash");

const { hasPermission, formatScopes } = require("../../../oauth/scopes");
const { isAuthenticatedAndAuthorized } = require("../generics");

const {
  GraphQLNotFoundError,
  GraphQLUserInputError
} = require("../../../errors");

const scopes = [
  {
    entity: "hacker",
    permission: "read"
  }
];

// Query Root Resolvers

const hacker = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const oauthUser = await db.OAuthUser.findOne({
      where: { role: "HACKER" },
      include: {
        model: db.User,
        where: { id: args.id }
      }
    });

    if (!oauthUser || !oauthUser.User) {
      throw new GraphQLNotFoundError("Hacker not found");
    }

    return oauthUser.User;
  }
);

// Mutation Root Resolvers

const hackerUpdate = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    if (!args.id && ctx.access.role !== "HACKER") {
      throw new GraphQLUserInputError(
        "Must provide an id to update another hacker!"
      );
    }

    const { input: hackerInput } = args;

    return await ctx.user
      .update(hackerInput)
      .catch(() => {
        new GraphQLUserInputError("Could not update hacker!");
      })
      .then((hacker) => ({ hacker }));
  }
);

const hackerDelete = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    if (!hasPermission("hacker", "write", ctx.access.scopes)) {
      throw new GraphQLForbiddenError("Invalid permissions!");
    }

    const { db } = ctx;
    const { id } = args;

    await db.User.findOne({ where: { id } })
      .then((hacker) => hacker.destroy())
      .then(() => ({
        deletedHackerId: id
      }));
  }
);

// Hacker Resolvers

const oauthInfo = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    if (parent.email && parent.email === ctx.user.email) {
      return Promise.resolve({
        role: ctx.access.role,
        scopes: formatScopes(ctx.access.scopes)
      });
    }

    const { db } = ctx;

    return await db.OAuthUser.findOne({ id: parent.oauthUserId }).then(
      (oauthUser) => {
        if (!oauthUser) {
          return Promise.reject(
            new GraphQLNotFoundError(
              "Could not find OAuth information for user"
            )
          );
        }

        return Promise.resolve({
          role: oauthUser.role,
          scopes: formatScopes(oauthUser.scopes)
        });
      }
    );
  }
);

const hasApplied = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    const { eventSlug } = args;
    const { db } = ctx;

    const applications = await parent.getApplications({
      include: [
        {
          model: db.Event,
          where: { slug: eventSlug }
        }
      ]
    });

    return !isEmpty(applications);
  }
);

// Resolver Map

module.exports = {
  QueryRoot: {
    hacker
  },
  MutationRoot: {
    hackerUpdate,
    hackerDelete
  },
  Hacker: {
    oauthInfo,
    hasApplied
  }
};
