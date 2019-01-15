const { combineResolvers } = require("graphql-resolvers");
const { isEmpty } = require("lodash");

const { formatScopes, ROLES } = require("../../../oauth/authorization");
const { isAuthenticatedAndAuthorized } = require("../generics");

const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError
} = require("../../../errors/graphql-errors");

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
      where: { role: ROLES.HACKER },
      include: {
        model: db.User,
        where: { id: args.id }
      }
    });

    if (!oauthUser || !oauthUser.User) {
      throw new GraphQLNotFoundError(
        `No hacker found with the identifier ${args.id}!`,
        GRAPHQL_ERROR_CODES.HACKER_NOT_FOUND
      );
    }

    return oauthUser.User;
  }
);

// Mutation Root Resolvers

const hackerUpdate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { input: hackerInput } = args;

    const updatedHacker = await ctx.user.update(hackerInput);

    return {
      hacker: updatedHacker
    };
  }
);

const hackerDelete = combineResolvers(
  isAuthenticatedAndAuthorized(scopes),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { id } = args;

    const hacker = await db.User.findOne({ where: { id } });

    if (!hacker) {
      throw new GraphQLNotFoundError(
        `Unable to find the hacker with identifier ${id}`,
        GRAPHQL_ERROR_CODES.HACKER_NOT_FOUND
      );
    }

    await hacker.destroy();

    return {
      deletedHackerId: id
    };
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
              "Could not find OAuth information for user!"
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
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
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
