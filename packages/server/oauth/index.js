const Router = require("express").Router;
const jwt = require("jsonwebtoken");

const oauthRoutes = require("./routes/oauth.routes");

const { AUTH_SECRET } = process.env;

function getBearer(req) {
  if (!req.headers || !req.headers.authorization) return null;

  const split = req.headers.authorization.split(" ");

  if (split.length !== 2 || split[0] !== "Bearer") return null;

  return split[1];
}

module.exports = (db) => {
  async function verifyAccessToken(req) {
    const token = getBearer(req);

    if (!token) throw new Error("No access token provided in request headers!");

    return jwt.verify(token, AUTH_SECRET, async (err, decoded) => {
      if (err) throw new Error("Could not verify the provided access token!");

      const { userId } = decoded;

      const user = await db.User.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error(
          "Could not find a user with the identifier given in the access token!"
        );
      }

      const oauthUser = await user.getOAuthUser();

      if (!oauthUser) {
        throw new Error(
          "Could not find authorization information for the user related to the access token!"
        );
      }

      const access = {
        scopes: JSON.parse(oauthUser.scopes),
        role: oauthUser.role
      };

      return {
        user,
        access
      };
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
