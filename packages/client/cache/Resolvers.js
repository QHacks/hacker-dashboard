import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../Client";

export default {
  Mutation: {
    login: (parent, args, context /*, info*/) => {
      const { accessToken, refreshToken } = args.input;

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      context.cache.writeData({
        data: { authInfo: { isAuthenticated: true, __typename: "AuthInfo" } }
      });

      return null;
    },
    logout: (parent, args, context /*, info*/) => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      context.cache.writeData({
        data: { authInfo: { isAuthenticated: false, __typename: "AuthInfo" } }
      });

      return null;
    }
  }
};
