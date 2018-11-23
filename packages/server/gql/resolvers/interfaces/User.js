module.exports = {
  User: {
    __resolveType(user, context, info) {
      return "Hacker";
    }
  }
};
