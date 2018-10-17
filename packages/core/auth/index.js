const jwt = require("jsonwebtoken");
const { ERROR_TEMPLATES, createError } = require("../errors");
const { ERROR } = require("../strings");

const { AUTH_SECRET } = process.env;
const V1_EXCEPTION_REGEX = /^\/v1\/auth\//;

function getBearer(req) {
  if (!req.headers || !req.headers.authorization) return false;
  const split = req.headers.authorization.split(" ");
  if (split.length !== 2 || split[0] !== "Bearer") return false;
  return split[1];
}

module.exports = () => (req, res, next) => {
  if (req.url.match(V1_EXCEPTION_REGEX)) return next();

  const token = getBearer(req);

  if (!token) {
    const error = createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.MISSING_TOKEN);
    return res.status(error.code).json(error);
  }

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
};
