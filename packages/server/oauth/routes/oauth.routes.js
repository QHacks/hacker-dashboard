const Router = require("express").Router;
const { omit } = require("lodash");

const {
  validateEmail,
  validatePassword,
  validateName
} = require("../../utils/custom-validator");

const {
  RestApiError,
  ValidationError,
  OAuthInvalidGrantTypeError
} = require("../../errors/rest-errors");

function sendError(res, err) {
  if (!err.status || !err.code) {
    const apiErr = new RestApiError(err);
    return res.status(apiErr.status).json(apiErr);
  }

  return res.status(err.status).json(omit(err, "status"));
}

// Request Validation Methods

function validateSessionRequest(email, password, grantType) {
  if (!email || !password || !grantType) {
    return Promise.reject(
      new ValidationError(
        "The request does not have all the required fields! Please make sure to supply a email, password, and a valid grantType in the request body."
      )
    );
  }

  return Promise.all([validateEmail(email), validatePassword(password)])
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(new ValidationError(err));
    });
}

function validateSignupRequest(firstName, lastName, email, password) {
  if (!firstName || !lastName || !email || !password) {
    return Promise.reject(
      new ValidationError(
        "The request does not have all the required fields! Please make sure to supply a firstName, lastName, email, and a password in the request body."
      )
    );
  }

  return Promise.all([
    validateEmail(email),
    validatePassword(password),
    validateName(firstName, lastName)
  ])
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(new ValidationError(err));
    });
}

function validateRefreshRequest(refreshToken, grantType) {
  if (!refreshToken || !grantType) {
    return Promise.reject(
      new ValidationError(
        "The request does not have all the required fields! Please make sure to supply a refreshToken and a valid grantType in the request body."
      )
    );
  }

  return Promise.resolve();
}

function validateResetHashRequest(email) {
  if (!email) {
    return Promise.reject(
      new ValidationError(
        "The request does not have all the required fields! Please make sure to supply a email in the request body!"
      )
    );
  }

  return validateEmail(email)
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(new ValidationError(err));
    });
}

function validateUpdatePasswordRequest(password, resetHash) {
  if (!password || !resetHash) {
    return Promise.reject(
      new ValidationError(
        "The request does not have all the required fields! Please make sure to pass email and resetHash!"
      )
    );
  }

  return validatePassword(password)
    .then(() => {
      return Promise.resolve();
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

// Route Implementation

module.exports = (db) => {
  const oauthApi = Router();

  const oauthCtr = require("../controllers/oauth.controller")(db);

  oauthApi.use("/session", async (req, res) => {
    try {
      const { email, password, grantType } = req.body;

      await validateSessionRequest(email, password, grantType);

      switch (grantType) {
        case "password":
          const {
            refreshToken,
            accessToken,
            expiresIn,
            scopes
          } = await oauthCtr.authenticateWithResourceOwnerCredentials(
            req.hostname,
            email,
            password
          );

          return res.status(200).json({
            accessToken,
            expiresIn,
            tokenType: "bearer",
            scopes,
            refreshToken
          });
        default:
          throw new OAuthInvalidGrantTypeError();
      }
    } catch (err) {
      return sendError(res, err);
    }
  });

  oauthApi.use("/signup", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      await validateSignupRequest(firstName, lastName, email, password);

      const {
        refreshToken,
        accessToken,
        expiresIn,
        scopes
      } = await oauthCtr.createUserAccount(
        req.hostname,
        firstName,
        lastName,
        email,
        password
      );

      return res.status(200).json({
        accessToken,
        expiresIn,
        tokenType: "bearer",
        scopes,
        refreshToken
      });
    } catch (err) {
      return sendError(res, err);
    }
  });

  oauthApi.use(`/refresh`, async (req, res) => {
    try {
      const { refreshToken, grantType } = req.body;

      await validateRefreshRequest(refreshToken, grantType);

      switch (grantType) {
        case "refresh_token":
          const newTokens = await oauthCtr.refresh(req.hostname, refreshToken);

          return res.status(200).json({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken
          });
        default:
          throw new OAuthInvalidGrantTypeError();
      }
    } catch (err) {
      return sendError(res, err);
    }
  });

  oauthApi.use(`/createResetHash`, async (req, res) => {
    try {
      const { email } = req.body;

      await validateResetHashRequest(email);

      await oauthCtr.resetPasswordRequest(email);

      return res.sendStatus(200);
    } catch (err) {
      return sendError(res, err);
    }
  });

  oauthApi.use(`/updatePasswordForReset`, async (req, res) => {
    try {
      const { password, resetHash } = req.body;

      await validateUpdatePasswordRequest(password, resetHash);

      await oauthCtr.updatePasswordRequest(password, resetHash);

      return res.sendStatus(200);
    } catch (err) {
      return sendError(res, err);
    }
  });

  return oauthApi;
};
