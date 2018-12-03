const { hasPermission, formatScopes } = require("../../../oauth/scopes");
const {
  GraphQLNotFoundError,
  GraphQLForbiddenError,
  GraphQLUserInputError
} = require("../../../errors");
const { isEmpty } = require("lodash");

module.exports = {
  QueryRoot: {
    async hacker(parent, args, context, info) {
      const {
        access,
        db: { User, OAuthUser }
      } = context;

      if (!hasPermission("hacker", "read", access.scopes)) {
        throw new GraphQLForbiddenError("Invalid permissions!");
      }

      const oauthUser = await OAuthUser.findOne({
        where: { role: "HACKER" },
        include: {
          model: User,
          where: { id: args.id }
        }
      });

      if (!oauthUser || !oauthUser.User) {
        throw new GraphQLNotFoundError("Hacker not found");
      }

      return oauthUser.User;
    }
  },
  MutationRoot: {
    hackerUpdate(parent, args, context, info) {
      // TODO: Let admins update hackers
      if (!args.id && context.access.role !== "HACKER") {
        throw new GraphQLUserInputError(
          "Must provide an id to update another hacker!"
        );
      }

      const { input: hackerInput } = args;

      return context.user
        .update(hackerInput)
        .catch(() => {
          new GraphQLUserInputError("Could not update hacker!");
        })
        .then((hacker) => ({ hacker }));
    },
    hackerDelete(parent, args, context, info) {
      if (!hasPermission("hacker", "write", context.access.scopes)) {
        throw new GraphQLForbiddenError("Invalid permissions!");
      }

      const { db } = context;
      const { id } = args;

      db.User.findOne({ where: { id } })
        .then((hacker) => hacker.destroy())
        .then(() => ({
          deletedHackerId: id
        }));
    }
  },
  Hacker: {
    oauthInfo(parent, args, context) {
      // Current user (resolve from context)
      if (parent.email && parent.email === context.user.email) {
        return Promise.resolve({
          role: context.access.role,
          scopes: formatScopes(context.access.scopes)
        });
      }

      // A different user (resolve from DB)
      const {
        db: { OAuthUser }
      } = context;
      return OAuthUser.findOne({ id: parent.oauthUserId }).then((oauthUser) => {
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
      });
    },
    // Check if a hacker has applied to a given event
    async hasApplied(parent, args, context) {
      const { Event } = context.db;
      const { eventSlug: slug } = args;

      const applications = await parent.getApplications({
        include: [
          {
            model: Event,
            where: { slug }
          }
        ]
      });

      return !isEmpty(applications);
    }
  }
};
