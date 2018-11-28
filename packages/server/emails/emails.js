const Mustache = require("mustache");
const path = require("path");
const fs = require("fs");

const QHACKS_NO_REPLY_EMAIL = "no-reply@qhacks.io";
const QHACKS_HELLO_EMAIL = "hello@qhacks.io";
const DASHBOARD_HOSTNAME = "app.qhacks.io";

function toPath(templateName) {
  return path.resolve(__dirname, "./dist/", `${templateName}.html`);
}

function createEmailFromTemplate(
  to,
  cc,
  bcc,
  from,
  subject,
  text,
  templateName,
  dataForTemplate
) {
  return {
    to,
    cc,
    bcc,
    from,
    subject,
    text,
    html: Mustache.render(
      fs.readFileSync(toPath(templateName)).toString(),
      dataForTemplate
    )
  };
}

function getEmailMessages(recipientObjects, templateObject) {
  return recipientObjects.map((recipientObject) => {
    const { to, cc = [], bcc = [], dataForTemplate = {} } = recipientObject;

    return createEmailFromTemplate(
      to,
      cc,
      bcc,
      templateObject.from,
      templateObject.subject,
      templateObject.text,
      templateObject.templateName,
      {
        ...dataForTemplate,
        dashboardHostname: DASHBOARD_HOSTNAME
      }
    );
  });
}

module.exports = {
  "application-success": (recipientObjects) => ({
    messages: getEmailMessages(recipientObjects, {
      from: QHACKS_HELLO_EMAIL,
      subject: "QHacks Application Received!",
      text: `We've received your application!`,
      templateName: "application-success"
    })
  }),

  "reset-password-request": (recipientObjects) => ({
    // Not using helper because text relies on the recipientObject
    messages: recipientObjects.map((recipientObject) => {
      const { to, cc = [], bcc = [], dataForTemplate = {} } = recipientObject;

      return createEmailFromTemplate(
        to,
        cc,
        bcc,
        QHACKS_NO_REPLY_EMAIL,
        "QHacks Password Reset Request",
        `Someone has requested to reset your QHacks account password, click this link to do so: https://${DASHBOARD_HOSTNAME}/update-password/${
          recipientObject.dataForTemplate.resetPasswordHash
        }`,
        "reset-password-request",
        {
          ...dataForTemplate,
          dashboardHostname: DASHBOARD_HOSTNAME
        }
      );
    })
  }),

  "reset-password-success": (recipientObjects) => ({
    messages: getEmailMessages(recipientObjects, {
      from: QHACKS_NO_REPLY_EMAIL,
      subject: "QHacks Password Reset Successful!",
      text: "Your QHacks password has been successfully reset!",
      templateName: "reset-password-success"
    })
  })
};
