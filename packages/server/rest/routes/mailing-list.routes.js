const Router = require("express").Router;

const SUBSCRIBE = "subscribe";

module.exports = (db) => {
  const mailingListApi = Router();

  const {
    createMailingListSubscription
  } = require("../controllers/mailing-list.controller")(db);

  mailingListApi.post(
    `/${SUBSCRIBE}/`,
    ({ body: { event, name, email } }, res) =>
      createMailingListSubscription(event, name, email)
        .then(() => res.status(201).json("OK"))
        .catch((err) => res.status(err.status).json(err))
  );

  return mailingListApi;
};
