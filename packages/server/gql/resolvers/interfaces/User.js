module.exports = {
  User: {
    __resolveType(user, context, info) {
      return upperCase(context.access.role);
    }
  },
  QueryRoot: {
    user(parent, args, context) {
      return Promise.resolve(context.user);
    }
  }
};

const upperCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
