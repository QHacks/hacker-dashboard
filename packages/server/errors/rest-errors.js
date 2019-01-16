const REST_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  VALIDATION_ERROR: "VALIDATION_ERROR",

  NOT_FOUND: "NOT_FOUND",
  USER_NOT_FOUND: "USER_NOT_FOUND",

  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_GRANT_TYPE: "INVALID_GRANT_TYPE",

  CLIENT_NOT_REGISTERED: "CLIENT_NOT_REGISTERED",
  CLIENT_NOT_PRIVELEGED: "CLIENT_NOT_PRIVELEGED"
};

class RestApiError extends Error {
  constructor(message, status, code) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message =
      message || "Something went wrong on our end. Please try again.";
    this.code = code || REST_ERROR_CODES.INTERNAL_SERVER_ERROR;
    this.status = status || 500;
  }
}

class ValidationError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Validation on inputs failed!",
      400,
      code || REST_ERROR_CODES.VALIDATION_ERROR
    );
  }
}

class NotFoundError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Unable to retrieve the requested resource.",
      404,
      code || REST_ERROR_CODES.NOT_FOUND
    );
  }
}

class OAuthInvalidCredentialsError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The provided credentials are invalid!",
      403,
      code || REST_ERROR_CODES.INVALID_CREDENTIALS
    );
  }
}

class OAuthClientNotRegisteredError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Client is not a registered OAuth client!",
      404,
      code || REST_ERROR_CODES.CLIENT_NOT_REGISTERED
    );
  }
}

class OAuthClientNotPrivilegedError extends RestApiError {
  constructor(message, code) {
    super(
      message || "Client is not privileged to perform action!",
      401,
      code || REST_ERROR_CODES.CLIENT_NOT_PRIVELEGED
    );
  }
}

class OAuthInvalidGrantTypeError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The supplied grant_type is invalid!",
      400,
      code || REST_ERROR_CODES.INVALID_GRANT_TYPE
    );
  }
}

class OAuthInvalidRefreshTokenError extends RestApiError {
  constructor(message, code) {
    super(
      message || "The refresh token provided is invalid!",
      401,
      code || REST_ERROR_CODES.INVALID_REFRESH_TOKEN
    );
  }
}

module.exports = {
  REST_ERROR_CODES,

  RestApiError,
  NotFoundError,
  ValidationError,

  OAuthInvalidGrantTypeError,
  OAuthClientNotRegisteredError,
  OAuthClientNotPrivilegedError,
  OAuthInvalidCredentialsError,
  OAuthInvalidRefreshTokenError
};
