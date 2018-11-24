const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_ISSUER = "QHacks Authentication";
const ACCESS_TOKEN_EXPIRE_TIME =
  process.env.ACCESS_TOKEN_EXPIRE_TIME || "5 minutes";
const REFRESH_TOKEN_EXPIRE_TIME =
  process.env.REFRESH_TOKEN_EXPIRE_TIME || "60 minutes";

const { AUTH_SECRET } = process.env;

const PRIVILEDGED_ORIGINS = ["localhost", "app.qhacks.io"];

function createAccessToken(userId) {
  // needs to have the type "bearer"
  // expires_in
  // refresh_token

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

module.exports = (db) => {
  function authenticateWithResourceOwnerCredentials(req, username, password) {
    return new Promise((resolve, reject) => {
      if (!PRIVILEDGED_ORIGINS.includes(req.hostname)) {
        reject("Host is not priviledge to perform 'password' grant type!");
      }

      db.User.authenticate(usename, password)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    authenticateWithResourceOwnerCredentials
  };
};
