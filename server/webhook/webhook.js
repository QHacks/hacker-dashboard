const axios = require('axios');
const winston = require('winston');
const { WEBHOOK: WEBHOOK_STRINGS } = require('../strings');
const webhookConfig = require('./webhook.config');

const { SLACK_WEBHOOK_URL } = process.env;

function _createWebhookMiddleware(config) {
    return (req, res, next) => {
        function handleFinish() {
            res.removeListener('finish', handleFinish);
            if (res.statusCode === 200) {
                const notification = typeof config[req.originalUrl] === 'function'
                    ? config[req.originalUrl](req.body)
                    : config[req.originalUrl];
                _sendSlackNotification(notification);
            }
        }

        if (config.hasOwnProperty(req.url)) res.on('finish', handleFinish);

        next();
    };
}

function _sendSlackNotification(notification) {
    axios.post(SLACK_WEBHOOK_URL, notification)
        .catch((err) => winston.notice(WEBHOOK_STRINGS.FAILED_SLACK_MESSAGE));
}

module.exports = () => _createWebhookMiddleware(webhookConfig);
