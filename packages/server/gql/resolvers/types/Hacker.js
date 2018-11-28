const { ForbiddenError } = require("apollo-server-express");
const { hasPermission } = require("../../../oauth/scopes");
const { DatabaseError } = require("../../../errors");
module.exports = {
  QueryRoot: {
    async hacker(
      parent,
      args,
      {
        access,
        db: { User, OAuthUser }
      },
      info
    ) {
      if (!hasPermission("hacker", "read", access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }
      const dbResponse = await OAuthUser.findOne({
        where: { role: "HACKER" },
        include: {
          model: User,
          where: { id: args.id }
        }
      });
      if (!dbResponse || !dbResponse.User) {
        throw new DatabaseError("Hacker not found");
      }
      return dbResponse.User;
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
