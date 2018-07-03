const axios = require("axios");
const logger = require("../utils/logger");
const webhookConfig = require("./webhook.config");
const validator = require("validator");

const { SLACK_WEBHOOK_URL } = process.env;

if (!_isValidUrl(SLACK_WEBHOOK_URL)) {
  logger.log("warn", "No valid (or invalid) Slack webhook URL supplied");
}

function _createWebhookMiddleware(config) {
  return (req, res, next) => {
    function handleFinish() {
      res.removeListener("finish", handleFinish);
      if (res.statusCode === 200) {
        const notification =
          typeof config[req.originalUrl] === "function"
            ? config[req.originalUrl](req.body)
            : config[req.originalUrl];
        _sendSlackNotification(notification);
      }
    }

    if (config.hasOwnProperty(req.url) && _isValidUrl(SLACK_WEBHOOK_URL)) {
      res.on("finish", handleFinish);
    }

    next();
  };
}

function _sendSlackNotification(notification) {
  axios.post(SLACK_WEBHOOK_URL, notification).catch((err) => logger.error(err));
}

function _isValidUrl(url) {
  return url && typeof url === "string" && validator.isURL(url);
}

module.exports = () => _createWebhookMiddleware(webhookConfig);
