const Router = require("express").Router;
const authRoutes = require("./routes/auth.routes");

module.exports = (controllers) => {
  const api = Router();

  // authentication routes
  api.use("/", authRoutes(controllers));

  return api;
};
