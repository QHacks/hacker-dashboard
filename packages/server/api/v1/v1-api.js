const Router = require("express").Router;
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const mailingListRoutes = require("./routes/subscribe.routes");

module.exports = (controllers) => {
  const api = Router();

  // authentication routes
  api.use("/", authRoutes(controllers));

  // admin routes
  api.use("/", adminRoutes(controllers));

  // user routes
  api.use("/", userRoutes(controllers));

  // subscribe routes
  api.use("/", mailingListRoutes(controllers));

  return api;
};
