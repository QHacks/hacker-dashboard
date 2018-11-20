const customValidator = require("../services/custom-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_ISSUER = "QHacks Authentication";
const ACCESS_TOKEN_EXPIRE_TIME =
  process.env.ACCESS_TOKEN_EXPIRE_TIME || "5 minutes";
const REFRESH_TOKEN_EXPIRE_TIME =
  process.env.REFRESH_TOKEN_EXPIRE_TIME || "60 minutes";
const QHACKS_2018_SLUG = "qhacks-2018";

const { AUTH_SECRET } = process.env;

function createAccessToken(userId) {
  return jwt.sign({ userId }, AUTH_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    issuer: JWT_ISSUER
  });
}

function createRefreshToken(userId) {
  return jwt.sign(
    {
      type: "refresh",
      userId
    },
    AUTH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
      issuer: JWT_ISSUER
    }
  );
}

function createResetPasswordHash(user) {
  const { AUTH_SECRET } = process.env;
  const timeInMs = Date.now();
  return crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${user.email}${timeInMs}`)
    .digest("hex");
}

module.exports = {};
