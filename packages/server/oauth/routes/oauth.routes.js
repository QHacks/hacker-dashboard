const Router = require("express").Router;

module.exports = (db) => {
  const oauthApi = Router();

  const oauthCtr = require("../controllers/oauth.controller")(db);

  oauthApi.use("/session", (req, res) => {
    const { grant_type } = req.body;
    if (grant_type === "password") {
      const { email, password } = req.body;

      oauthCtr
        .authenticateWithResourceOwnerCredentials(req, email, password)
        .then((user) => {})
        .catch((err) => {});
    }
  });

  oauthApi.use(`/refresh`, (req, res) => {});

  return oauthApi;
};
