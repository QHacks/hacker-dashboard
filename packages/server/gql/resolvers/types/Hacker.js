const { ForbiddenError } = require("apollo-server-express");
const { hasPermission } = require("../../../oauth/scopes");
const { DatabaseError } = require("../../../errors");

module.exports = {
  QueryRoot: {
    async hacker(parent, args, context, info) {
      const {
        access,
        db: { User, OAuthUser }
      } = context;

      if (!hasPermission("hacker", "read", access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }

      const oauthUser = await OAuthUser.findOne({
        where: { role: "HACKER" },
        include: {
          model: User,
          where: { id: args.id }
        }
      });

      if (!oauthUser || !oauthUser.User) {
        throw new DatabaseError("Hacker not found");
      }

      return oauthUser.User;
    }
  },
  MutationRoot: {
    hackerUpdate(parent, args, context, info) {
      if (!hasPermission("hacker", "write", context.access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }

      const { db } = context;
      const { id, input } = args;

      // db.User.findOne({ where: { id }}).then((hacker) => {
      //   hacker.update)
      // });
    },
    hackerDelete(parent, args, context, info) {
      if (!hasPermission("hacker", "write", context.access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
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
  }
};
