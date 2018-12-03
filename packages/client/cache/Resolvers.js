/* eslint-disable */

export default {
  Mutation: {
    authInfoUpdate: (parent, args, context, info) => {
      const { isAuthenticated } = args.input;

      context.cache.writeData({
        data: { authInfo: { isAuthenticated, __typename: "AuthInfo" } }
      });

      return null;
    }
  }
};
