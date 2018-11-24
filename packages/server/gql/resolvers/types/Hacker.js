const { ForbiddenError } = require("apollo-server-express");
const { hasPermission } = require("../../../oauth/scopes");

module.exports = {
  QueryRoot: {
    hacker(parent, args, context, info) {
      if (!hasPermission("hacker", "read", context.access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }
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
