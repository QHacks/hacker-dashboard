const { hasPermission, formatScopes } = require("../../../oauth/scopes");
const {
  GraphQLNotFoundError,
  GraphQLForbiddenError
} = require("../../../errors");

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
      if (!hasPermission("hacker", "write", context.access.scopes)) {
        throw new GraphQLForbiddenError("Invalid permissions!");
      }

      const { db } = context;
      const { id, input } = args;

      // db.User.findOne({ where: { id }}).then((hacker) => {
      //   hacker.update)
      // });
    },
    hackerDelete(parent, args, context, info) {
      if (!hasPermission("hacker", "write", context.access.scopes)) {
        throw new GraphQLForbiddenError("Invalid permissions!");
      }

      const { db } = context;
      const { id } = args;

      db.User.findOne({ where: { id } })
        .then((hacker) => {
          return hacker.destroy();
        })
        .then(() => {
          return {
            deletedHackerId: id
          };
        });
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
    }
  }
};
