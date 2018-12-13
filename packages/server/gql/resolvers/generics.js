const { skip, combineResolvers } = require("graphql-resolvers");

const scopeUtils = require("../../oauth/scopes");
const logger = require("../../utils/logger");

const {
  GraphQLAuthenticationError,
  GraphQLForbiddenError
} = require("../../errors");

const isAuthenticated = (parent, args, ctx, info) => {
  const { user } = ctx;

  if (!user) {
    throw new GraphQLAuthenticationError(
      "Invalid authentication information! You must be authenticated to perform this action."
    );
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
      no authorization checks. Consider removing the function call with no parameters to
      'isAuthorized' if this is intended.`
    );

    skip;
  }

  const { access } = ctx;

  if (!access) {
    throw new GraphQLForbiddenError(
      "Invalid authorization information! You must be authorized to perform this action."
    );
  }

  if (requiredRole && requiredRole !== access.role) {
    throw new GraphQLForbiddenError(
      "Not authorized! You are not the required user role to perform this action."
    );
  }

  if (scopes) {
    scopes.forEach((scope) => {
      if (
        !scopeUtils.isAuthorized(scope.entity, scope.permission, access.scopes)
      ) {
        throw new GraphQLForbiddenError(
          "Not authorized! You do not have the required scopes to perform this action."
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
