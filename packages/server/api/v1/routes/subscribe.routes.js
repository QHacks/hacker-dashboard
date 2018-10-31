const Router = require("express").Router;
const cors = require("cors");

const SUBSCRIBE = "subscribe";

module.exports = (ctr) => {
  const subscribeAPI = Router();

  // Get subscribe controller
  const { subscribe } = ctr;

  subscribeAPI.post(`/${SUBSCRIBE}/`, cors(), (req, res) => {
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
