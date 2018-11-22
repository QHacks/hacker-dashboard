const Router = require("express").Router;

const AUTH = "auth";

module.exports = (ctrs) => {
  const authAPI = Router();

  const { auth } = ctrs;

  return authAPI;
};
