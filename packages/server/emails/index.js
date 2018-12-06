const _ = require("lodash");
const sendgrid = require("@sendgrid/mail");
const emails = require("./emails");
const logger = require("../utils/logger");
const { validateEmail } = require("../utils/custom-validator");

const {
  SENDGRID_API_KEY = logger.warn(
    "Missing SendGrid API key! Emails will not be sent."
  )
} = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

async function sendSendgridEmail(email) {
  if (!SENDGRID_API_KEY) {
    return Promise.reject("No SendGrid API key! Cannot send email!");
  }

  try {
    await sendgrid.send(email.messages);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject("Somthing went wrong sending the email!");
  }
}

module.exports = () => {
  async function sendEmails(emailName, recipientObjects) {
    if (!emails[emailName]) {
      return Promise.reject("No email with that name exists!");
    }

    if (!_.isArray(recipientObjects)) {
      return Promise.reject("Please supply an array of recipients!");
    }

    await recipientObjects.forEach(async (recipientObject) => {
      try {
        await validateEmail(recipientObject.to);
      } catch (err) {
        return Promise.reject(
          "Not all provided recipients have valid email addresses!"
        );
      }
    });

    const email = emails[emailName](recipientObjects);

    try {
      await sendSendgridEmail(email);
    } catch (err) {
      return Promise.reject("Could not send email!");
    }

    return Promise.resolve();
  }

  return {
    sendEmails
  };
};
