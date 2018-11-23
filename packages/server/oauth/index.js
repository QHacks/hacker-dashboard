const oauthRoutes = require("./routes/oauth.routes");
const Router = require("express").Router;

const { ERROR_TEMPLATES, createError } = require("./errors");
const { ERROR } = require("../strings");
const jwt = require("jsonwebtoken");

const { AUTH_SECRET } = process.env;

module.exports = (db) => {
  function getBearer(req) {
    if (!req.headers || !req.headers.authorization) return false;
    const split = req.headers.authorization.split(" ");
    if (split.length !== 2 || split[0] !== "Bearer") return false;
    return split[1];
  }

  function getUser() {
    // get the token from the request
    const token = getBearer(req);

    // Verify the token against the auth secret
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
      if (err || decoded.type === "refresh") {
        const error = createError(
          ERROR_TEMPLATES.UNAUTHORIZED,
          ERROR.INVALID_TOKEN,
          err
        );
        return res.status(error.code).json(error);
      }
      req.user = decoded;
      next();
    });
  }

  function getUserAccess() {}

  function oauthApi() {
    const oauthApi = Router();

    // oauth routes
    oauthApi.use("/", oauthRoutes(db));

    return oauthApi;
  }

  return {
    oauthApi,
    getUser,
    getBearer,
    getUserAccess
  };
};
