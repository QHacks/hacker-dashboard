const { skip, combineResolvers } = require("graphql-resolvers");

const {
  isAuthorizedFromRole,
  isAuthorizedFromScopes
} = require("../../oauth/authorization");
const logger = require("../../utils/logger");

const {
  GraphQLAuthorizationError,
  GraphQLAuthenticationError
} = require("../../errors/graphql-errors");

const isAuthenticated = (parent, args, ctx, info) => {
  const { user } = ctx;

  if (!user) {
    throw new GraphQLAuthenticationError();
  }

  skip;
};

const isAuthorized = (scopes = null, requiredRole = null) => (
  parent,
  args,
  ctx,
  info
) => {
  if (!scopes && !requiredRole) {
    logger.warn(
      `Using 'isAuthorized' without scopes or a requiredRole is the same thing as performing
      no authorization check at all. Consider removing the function call with no parameters to
      'isAuthorized' if this is intended.`
    );

    skip;
  }

  const { access } = ctx;

  if (!access) {
    throw new GraphQLAuthorizationError();
  }

  if (requiredRole && isAuthorizedFromRole(requiredRole, access.role)) {
    throw new GraphQLAuthorizationError(
      "Not authorized! You are not the required user role to perform this operation."
    );
  }

  if (scopes) {
    scopes.forEach((scope) => {
      if (
        !isAuthorizedFromScopes(scope.entity, scope.permission, access.scopes)
      ) {
        throw new GraphQLAuthorizationError(
          "Not authorized! You do not have the required access scopes to perform this operation."
        );
      }
    });
  }

  skip;
};

const isAuthenticatedAndAuthorized = (scopes = null, requiredRole = null) => {
  if (!scopes && !requiredRole) {
    logger.warn(
      `When using 'isAuthenticatedAndAuthorized' with no scopes or a requiredRole using just
      'isAuthenticated' is best. With no scopes or a requiredRole there are no authorization
      checks being performed.`
    );
  }

  return combineResolvers(isAuthenticated, isAuthorized(scopes, requiredRole));
};

module.exports = {
  isAuthorized,
  isAuthenticated,
  isAuthenticatedAndAuthorized
};
