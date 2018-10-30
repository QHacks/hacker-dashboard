const Router = require("express").Router;

const SUBSCRIBE = "subscribe";

module.exports = (ctr) => {
  const subscribeAPI = Router();

  // Get subscribe controller
  const { subscribe } = ctr;

  subscribeAPI.post(`/${SUBSCRIBE}/`, (req, res) => {
    const { event, name, email } = req.body;
    subscribe
      .addMailingListSubscription(event, name, email)
      .then((subscription) => res.status(201).json(subscription))
      .catch((err) => {
        res.status(err.code).json(err);
      });
  });

  return subscribeAPI;
};
