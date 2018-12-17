// GraphQL
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
  ApolloError
} = require("apollo-server-express");

// Error codes
const ERROR_CODES = {
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  CLIENT_NOT_REGISTERED: "CLIENT_NOT_REGISTERED",
  CLIENT_NOT_PRIVELEGED: "CLIENT_NOT_PRIVELEGED",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INVALID_GRANT_TYPE: "INVALID_GRANT_TYPE",
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL"
};

// Database Errors
class DatabaseError extends Error {
  constructor(message, status, code) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.code = code || ERROR_CODES.UNKNOWN_ERROR;
    this.message =
      message || "Oops! Something went wrong on our end! Please try again.";
  }
}

class NotFoundError extends DatabaseError {
  constructor(
    message = "Could not find record in database!",
    code = ERROR_CODES.NOT_FOUND_ERROR
  ) {
    super(message, 404, code);
  }
}

// GraphQL API Errors

const GraphQLAuthenticationError = AuthenticationError;

const GraphQLForbiddenError = ForbiddenError;

const GraphQLUserInputError = UserInputError;

class GraphQLNotFoundError extends ApolloError {
  constructor(message) {
    super(message || "Unable to retrieve the requested resource!");
  }
}

// REST API Errors

class RestApiError extends Error {
  constructor(message, status, code) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message =
      message || "Oops! Something went wrong on our end! Please try again.";
    this.code = code || ERROR_CODES.UNKNOWN_ERROR;
    this.status = status || 500;
  }
}

class ValidationError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Validation on inputs failed!",
      400,
      code || ERROR_CODES.VALIDATION_ERROR
    );
  }
}

// OAuth Specific Errors

class OAuthInvalidCredentialsError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The provided credentials are invalid!",
      403,
      code || ERROR_CODES.INVALID_CREDENTIALS
    );
  }
}

class OAuthClientNotRegisteredError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Client is not a registered OAuth client!",
      404,
      code || ERROR_CODES.CLIENT_NOT_REGISTERED
    );
  }
}

class OAuthClientNotPrivilegedError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Client is not privileged to perform action!",
      401,
      code || ERROR_CODES.CLIENT_NOT_PRIVELEGED
    );
  }
}

class OAuthInvalidGrantTypeError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The supplied grant_type is invalid!",
      400,
      code || ERROR_CODES.INVALID_GRANT_TYPE
    );
  }
}

class OAuthInvalidRefreshTokenError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The refresh token provided is invalid!",
      401,
      code || ERROR_CODES.INVALID_GRANT_TYPE
    );
  }
}

module.exports = {
  ERROR_CODES,

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
