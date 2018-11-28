module.exports = {
  Admin: {
    oauthInfo(parent, args, context) {
      return {
        role: context.access.role,
        scopes: context.access.scopes.map((scope) => {
          const splitScopes = scope.split(":");
          return {
            entity: splitScopes[0],
            permission: splitScopes[1].toUpperCase()
          };
        })
      };
    }
  }
};
