export default {
  Mutation: {
    updateAuthenticationStatus: (parent, args, context, info) => {
      const { isAuthenticated } = args;
      context.cache.writeData({ data: { isAuthenticated } });
      return null;
    }
  }
};
