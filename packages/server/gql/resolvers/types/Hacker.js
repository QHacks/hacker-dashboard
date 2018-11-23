const { ForbiddenError } = require("apollo-server-express");
const { hasPermission } = require("../../../oauth/scopes");

module.exports = {
  QueryRoot: {
    hacker(parent, args, context, info) {
      if (!hasPermission("user", "read", context.access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }

      return {
        id: args.id,
        firstName: "Robert",
        lastName: "Saunders",
        email: "bob@bob.com",
        dob: "1"
      };
    }
  },
  MutationRoot: {
    hackerDelete(parent, args, context, info) {
      if (!hasPermission("user", "write", context.access.scopes)) {
        throw new ForbiddenError("Invalid permissions!");
      }

      return "Done!";
    }
  }
};
