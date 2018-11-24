const Router = require("express").Router;

const SUBSCRIBE = "subscribe";

module.exports = (db) => {
  const mailingListApi = Router();

  const { mailingList } = require("../controllers/mailing-list.controller")(db);

  mailingListApi.post(`/${SUBSCRIBE}/`, (req, res) => {});

  return mailingListApi;
};
