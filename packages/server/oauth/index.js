const oauthRoutes = require("./routes/oauth.routes");
const Router = require("express").Router;
const jwt = require("jsonwebtoken");

const { AUTH_SECRET } = process.env;

function getBearer(req) {
  if (!req.headers || !req.headers.authorization) return false;
  const split = req.headers.authorization.split(" ");
  if (split.length !== 2 || split[0] !== "Bearer") return false;
  return split[1];
}

module.exports = (db) => {
  function verifyAccessToken(req) {
    const token = getBearer(req);

    if (!token) return Promise.reject("No valid token provided!");

    return jwt.verify(token, AUTH_SECRET, async (err, decoded) => {
      if (err) return Promise.reject("Could not verify access token!");

      const user = await db.User.findOne({ where: { id: decoded.userId } });
      const oauthUser = await user.getOAuthUser();

      const access = {
        scopes: JSON.parse(oauthUser.scopes),
        role: oauthUser.role
      };

      return Promise.resolve({
        user,
        access
      });
    });
  }

  function oauthApi() {
    const oauthApi = Router();

    oauthApi.use("/", oauthRoutes(db));

    return oauthApi;
  }

  return {
    oauthApi,
    verifyAccessToken
  };
};
