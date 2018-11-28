const { DatabaseError } = require("../../../errors");

module.exports = {
  User: {
    __resolveType(user, context, info) {
      return "Hacker";
    }
  },
  QueryRoot: {
    user(parent, args, context) {
      return Promise.resolve(context.user);
    }
  }
};
