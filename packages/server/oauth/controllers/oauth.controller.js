const { getDefaultScopes } = require("../scopes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  RestApiError,
  OAuthInvalidRefreshTokenError,
  OAuthClientNotRegisteredError,
  OAuthClientNotPrivilegedError
} = require("../../errors");

const JWT_ISSUER = "QHacks";
const { AUTH_SECRET } = process.env;

const ACCESS_TOKEN_EXPIRE_SECONDS =
  process.env.ACCESS_TOKEN_EXPIRE_SECONDS || 300;
const REFRESH_TOKEN_EXPIRE_SECONDS =
  process.env.REFRESH_TOKEN_EXPIRE_SECONDS || 3600;
const RESET_PASSWORD_HASH_EXPIRE_SECONDS =
  process.env.RESET_PASSWORD_HASH_EXPIRE_SECONDS || 1200;

// Utility Functions

function createTokensForUser(userId) {
  return {
    accessToken: createAccessToken(userId),
    refreshToken: createRefreshToken(userId)
  };
}

function createAccessToken(userId) {
  return jwt.sign(
    {
      userId
    },
    AUTH_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRE_SECONDS,
      issuer: JWT_ISSUER
    }
  );
}

function createRefreshToken(userId) {
  return jwt.sign(
    {
      userId,
      type: "refresh"
    },
    AUTH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE_SECONDS,
      issuer: JWT_ISSUER
    }
  );
}

function createResetPasswordHash(user) {
  return crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${user.email}${Date.now()}`)
    .digest("hex");
}

async function checkOAuthClientFirstPartyByHost(db, host) {
  const oauthClient = await db.OAuthClient.findOne({ where: { host } });

  if (!oauthClient) {
    return Promise.reject(new OAuthClientNotRegisteredError());
  }

  if (!oauthClient.firstParty) {
    return Promise.reject(
      new OAuthClientNotPrivilegedError(
        "Client is not privileged to perform the 'password' grant_type!"
      )
    );
  }

  return Promise.resolve(oauthClient);
}

// Controller Methods

module.exports = (db) => {
  async function createUserAccount(
    hostname,
    firstName,
    lastName,
    email,
    password
  ) {
    try {
      const oauthClient = await checkOAuthClientFirstPartyByHost(db, hostname);

      const newUser = await db.sequelize.transaction(async (t) => {
        const scopes = getDefaultScopes("HACKER");

        const oauthUser = await db.OAuthUser.create({
          role: "HACKER",
          scopes: JSON.stringify(scopes)
        });

        const user = await oauthUser.createUser({
          firstName,
          lastName,
          password,
          email
        });

        const { accessToken, refreshToken } = createTokensForUser(user.id);
        const expiryDate = new Date(
          Date.now() + 1000 * REFRESH_TOKEN_EXPIRE_SECONDS
        );

        await oauthUser.createOAuthRefreshToken({
          clientId: oauthClient.id,
          refreshToken,
          expiryDate
        });

        return {
          user,
          scopes,
          refreshToken,
          accessToken
        };
      });

      return Promise.resolve({
        scopes: newUser.scopes,
        accessToken: newUser.accessToken,
        refreshToken: newUser.refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRE_SECONDS
      });
    } catch (err) {
      return Promise.reject(new ValidationError("Database validation failed!"));
    }
  }

  async function authenticateWithResourceOwnerCredentials(
    hostname,
    email,
    password
  ) {
    try {
      const oauthClient = await checkOAuthClientFirstPartyByHost(db, hostname);

      const user = await db.User.authenticate(email, password);

      const oauthUser = await user.getOAuthUser();

      const { accessToken, refreshToken } = createTokensForUser(user.id);
      const expiryDate = new Date(
        Date.now() + 1000 * REFRESH_TOKEN_EXPIRE_SECONDS
      );

      await db.sequelize.transaction(async (t) => {
        const oldRefreshTokens = await oauthUser.getOAuthRefreshTokens({
          where: { clientId: oauthClient.id }
        });

        oldRefreshTokens.forEach(async (token) => {
          await token.destroy();
        });

        await oauthUser.createOAuthRefreshToken({
          clientId: oauthClient.id,
          refreshToken,
          expiryDate
        });

        return;
      });

      return Promise.resolve({
        scopes: JSON.parse(oauthUser.scopes),
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRE_SECONDS
      });
    } catch (err) {
      if (!err.status) {
        return Promise.reject(
          new ValidationError("Database validation failed!")
        );
      }
      return Promise.reject(err);
    }
  }

  async function refresh(hostname, refreshToken) {
    return jwt.verify(refreshToken, AUTH_SECRET, async (err, decoded) => {
      if (err || decoded.type !== "refresh") {
        return Promise.reject(new OAuthInvalidRefreshTokenError());
      }

      try {
        const { userId } = decoded;

        const oauthClient = await checkOAuthClientFirstPartyByHost(
          db,
          hostname
        );

        const user = await db.User.findOne({ where: { id: userId } });

        const oauthUser = await user.getOAuthUser();

        const newTokens = createTokensForUser(user.id);
        const expiryDate = new Date(
          Date.now() + 1000 * REFRESH_TOKEN_EXPIRE_SECONDS
        );

        await db.sequelize.transaction(async (t) => {
          const oldRefreshTokens = await oauthUser.getOAuthRefreshTokens({
            where: {
              [db.Sequelize.Op.and]: [
                { clientId: oauthClient.id },
                { refreshToken }
              ]
            }
          });

          oldRefreshTokens.forEach(async (token) => {
            await token.destroy();
          });

          await oauthUser.createOAuthRefreshToken({
            clientId: oauthClient.id,
            refreshToken: newTokens.refreshToken,
            expiryDate
          });

          return;
        });

        return Promise.resolve({
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken
        });
      } catch (err) {
        return Promise.reject(
          new ValidationError("Database validation failed!")
        );
      }
    });
  }

  async function resetPasswordRequest(email) {
    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return Promise.reject(new RestApiError("User not found!"));
      }

      const newResetPasswordHash = createResetPasswordHash(email);
      const newResetPasswordHashExpiryDate = new Date(
        Date.now() + 1000 * RESET_PASSWORD_HASH_EXPIRE_SECONDS
      );

      await user.update({
        resetPasswordHash: newResetPasswordHash,
        resetPasswordHashExpiryDate: newResetPasswordHashExpiryDate
      });

      // TODO: Send the password reset email

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new ValidationError("Database validation failed!"));
    }
  }

  async function updatePasswordRequest(password, hash) {
    try {
      const user = await db.User.findOne({
        where: {
          resetPasswordHash: hash
        }
      });

      if (!user) {
        return Promise.reject(
          new RestApiError("User not found or hash not the same!")
        );
      }

      if (user.resetPasswordHashExpiryDate < Date.now()) {
        return Promise.reject(
          new RestApiError("The reset password hash is expired!")
        );
      }

      await user.update({
        password
      });

      // TODO: Send the confirmation email

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new ValidationError("Database validation failed!"));
    }
  }

  return {
    refresh,
    createUserAccount,
    resetPasswordRequest,
    updatePasswordRequest,
    authenticateWithResourceOwnerCredentials
  };
};
