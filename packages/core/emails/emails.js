const _ = require("lodash");
const sendgrid = require("@sendgrid/mail");
const logger = require("../utils/logger");
const emailsConfig = require("./emails.config");
const { EMAILS, ERROR } = require("../strings");
const { ERROR_TEMPLATES, createError } = require("../errors");

const {
  SENDGRID_API_KEY = logger.warn(
    "Missing SendGrid API key. Emails will not send."
  )
} = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

async function sendSendgridEmail(email) {
  if (!SENDGRID_API_KEY) return;
  try {
    await sendgrid.send(email.message);
    return await email.onSuccess();
  } catch (err) {
    return await email.onError(err);
  }
}

async function sendEmail(templateName, recipient) {
  if (!emailsConfig[templateName]) {
    throw createError(
      ERROR_TEMPLATES.NOT_FOUND,
      ERROR.EMAIL_TEMPLATE_DOES_NOT_EXIST
    );
  }
  if (_.isEmpty(recipient)) {
    throw createError(
      ERROR_TEMPLATES.BAD_REQUEST,
      ERROR.NO_EMAIL_RECIPIENT_SPECIFIED
    );
  }
  const recipients = (_.isArray(recipient) && recipient) || [recipient];
  const email = emailsConfig[templateName](recipients);
  return await sendSendgridEmail(email);
}

const TEMPLATE_NAMES_BY_URL = {
  "/api/v1/auth/signup": EMAILS.TEMPLATES.APPLICATION_SUCCESSFUL.NAME
};

function createEmailsMiddleware() {
  return (req, res, next) => {
    function handleFinish() {
      res.removeListener("finish", handleFinish);
      if (res.statusCode === 200) {
        const templateName = TEMPLATE_NAMES_BY_URL[req.originalUrl];
        const recipients = req.body;
        return sendEmail(templateName, recipients).catch(next);
      }
    }

    if (TEMPLATE_NAMES_BY_URL.hasOwnProperty(req.url)) {
      res.on("finish", handleFinish);
    }

    return next();
  };
}

module.exports = {
  sendEmail,
  createEmailsMiddleware
};
