const { UserInputError, ApolloError } = require("apollo-server-express");

const GRAPHQL_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  NOT_FOUND: "NOT_FOUND",
  EVENT_NOT_FOUND: "EVENT_NOT_FOUND",
  APPLICATION_NOT_FOUND: "APPLICATION_NOT_FOUND",
  HACKER_NOT_FOUND: "HACKER_NOT_FOUND",

  FORBIDDEN: "FORBIDDEN",

  EVENT_NOT_ACCEPTING_APPLICATIONS: "EVENT_NOT_ACCEPTING_APPLICATIONS",
  EVENT_APPLICATIONS_NOT_REQUIRED: "EVENT_APPLICATIONS_NOT_REQUIRED",

  UNAUTHORIZED: "UNAUTHORIZED",
  UNAUTHENTICATED: "UNAUTHENTICATED",

  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD"
};

const GraphQLUserInputError = UserInputError;

class GraphQLInternalServerError extends ApolloError {
  constructor(message, code) {
    super(
      message || "Something went wrong on our end. Please try again.",
      code || GRAPHQL_ERROR_CODES.INTERNAL_SERVER_ERROR
    );

    Object.defineProperty(this, "name", { value: "InternalServerError" });
  }
}

class GraphQLNotFoundError extends ApolloError {
  constructor(message, code) {
    super(
      message || "Unable to retrieve the requested resource.",
      code || GRAPHQL_ERROR_CODES.NOT_FOUND
    );

    Object.defineProperty(this, "name", { value: "NotFoundError" });
  }
}

class GraphQLForbiddenError extends ApolloError {
  constructor(message, code) {
    super(
      message || "Unable to process request. The operation is forbidden.",
      code || GRAPHQL_ERROR_CODES.FORBIDDEN
    );

    Object.defineProperty(this, "name", { value: "ForbiddenError" });
  }
}

class GraphQLAuthenticationError extends ApolloError {
  constructor(message) {
    super(
      message ||
        "Invalid authentication information! You must be authenticated to perform this operation.",
      GRAPHQL_ERROR_CODES.UNAUTHENTICATED
    );

    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}

class GraphQLAuthorizationError extends ApolloError {
  constructor(message) {
    super(
      message ||
        "Invalid authorization information! You must be authorized to perform this operation.",
      GRAPHQL_ERROR_CODES.UNAUTHORIZED
    );

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}

module.exports = {
  GRAPHQL_ERROR_CODES,

  GraphQLNotFoundError,
  GraphQLUserInputError,
  GraphQLForbiddenError,
  GraphQLAuthorizationError,
  GraphQLAuthenticationError,
  GraphQLInternalServerError
};
