const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ApolloError
} = require("apollo-server-express");

// Database Errors

class DatabaseError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.message =
      message || "Oops! Something went wrong on our end! Please try again.";
  }
}

class NotFoundError extends DatabaseError {
  constructor(message) {
    super(message || "Could not find record in database!", 404);
  }
}

// GraphQL API Errors

const GraphQLAuthenticationError = AuthenticationError;

const GraphQLForbiddenError = ForbiddenError;

const GraphQLUserInputError = UserInputError;

// REST API Errors

class RestApiError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message =
      message || "Oops! Something went wrong on our end! Please try again.";
    this.status = status || 500;
  }
}

class ValidationError extends RestApiError {
  constructor(message) {
    super(message || "Validation on inputs failed!", 400);
  }
}

// OAuth Specific Errors

class OAuthInvalidCredentialsError extends RestApiError {
  constructor(message) {
    super(message || "The provided credentials are invalid!", 403);
  }
}

class OAuthClientNotRegisteredError extends RestApiError {
  constructor(message) {
    super(message || "Client is not a registered OAuth client!", 404);
  }
}

class OAuthClientNotPrivilegedError extends RestApiError {
  constructor(message) {
    super(message || "Client is not privileged to perform action!", 401);
  }
}

class OAuthInvalidGrantTypeError extends RestApiError {
  constructor(message) {
    super(message || "The supplied grant_type is invalid!", 400);
  }
}

class OAuthInvalidRefreshTokenError extends RestApiError {
  constructor(message) {
    super(message || "The refresh token provided is invalid!");
  }
}

class GraphQLNotFoundError extends ApolloError {
  constructor(message) {
    super(message || "Unable to retrieve the requested resource");
  }
}

module.exports = {
  RestApiError,
  ValidationError,

  OAuthInvalidGrantTypeError,
  OAuthClientNotRegisteredError,
  OAuthClientNotPrivilegedError,
  OAuthInvalidCredentialsError,
  OAuthInvalidRefreshTokenError,

  GraphQLAuthenticationError,
  GraphQLForbiddenError,
  GraphQLUserInputError,
  GraphQLNotFoundError,

  DatabaseError,
  NotFoundError
};
