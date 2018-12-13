// Utilities

const upperCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Query Root Resolvers

const user = (parent, args, ctx, info) => {
  return ctx.user;
};

// Resolver Map

module.exports = {
  User: {
    __resolveType(user, ctx, info) {
      return upperCase(ctx.access.role);
    }
  },
  QueryRoot: {
    user
  }
};
