/**
 * Config for rendering email templates should be stored here.
 */

const logger = require("../utils/logger");
const EMAIL_TEMPLATES = require("./templates");
const { EMAILS: EMAIL_STRINGS, ERROR } = require("../strings");
const { ERROR_TEMPLATES, createError } = require("../errors");
const { get } = require("lodash");

const { EMAIL_URL_HOST } = process.env;
const HACKER_DASHBOARD_URL = "https://app.qhacks.io";

module.exports = {
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.NAME]: (
    recipients,
    rsvpUrl = HACKER_DASHBOARD_URL,
    withdrawUrl = HACKER_DASHBOARD_URL
  ) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient,
          rsvpUrl,
          withdrawUrl
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_ACCEPTED_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info("The application accepted email sent correctly!")
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.NAME]: (
    recipients,
    rsvpUrl = HACKER_DASHBOARD_URL,
    withdrawUrl = HACKER_DASHBOARD_URL
  ) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient,
          rsvpUrl,
          withdrawUrl
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_ACCEPTED_FROM_WAITLIST_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info(
        "The application accepted from waitlist email sent correctly!"
      )
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.NAME]: (
    recipients,
    rsvpUrl = HACKER_DASHBOARD_URL,
    withdrawUrl = HACKER_DASHBOARD_URL
  ) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient,
          rsvpUrl,
          withdrawUrl,
          isRSVPComplete: get(recipient, "applications[0].rsvp") === "COMPLETED"
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_ACCEPTED_REMINDER_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info("The application accepted reminder email sent correctly!")
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED
    .NAME]: (
    recipients,
    rsvpUrl = HACKER_DASHBOARD_URL,
    withdrawUrl = HACKER_DASHBOARD_URL
  ) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES
          .APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient,
          rsvpUrl,
          withdrawUrl
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info(
        "The application accepted reminder after waitlist accepted email sent correctly!"
      )
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.NAME]: (recipients) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient,
          isQueensStudent: recipient.school === "Queen's University"
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_DECLINED_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info("The application declined email sent correctly!")
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.NAME]: (recipients) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_SUCCESSFUL_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info("The application successful email sent correctly!")
  }),
  [EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.NAME]: (recipients) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.NAME
      ].createMessage({
        to: recipient.email,
        data: {
          recipient
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.APPLICATION_WAITLISTED_EMAIL_FAILED_TO_SEND,
        err
      ),
    onSuccess: () =>
      logger.info("The application waitlisted email sent correctly!")
  }),
  [EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD.NAME]: (recipients) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD.NAME
      ].createMessage({
        to: recipient.email,
        text: `Someone has requested to reset your QHacks account password, click this link to do so: https://${EMAIL_URL_HOST}/update-password/${
          recipient.passwordResetHash
        }`,
        data: {
          emailHost: EMAIL_URL_HOST,
          passwordResetHash: recipient.passwordResetHash
        }
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.RESET_PASSWORD_EMAIL_FAILED_TO_SEND,
        err
      )
  }),
  [EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.NAME]: (recipients) => ({
    message: recipients.map((recipient) =>
      EMAIL_TEMPLATES[
        EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.NAME
      ].createMessage({
        to: recipient.email
      })
    ),
    onError: (err) =>
      createError(
        ERROR_TEMPLATES.SENDGRID_ERROR,
        ERROR.SUCCESSFUL_PASSWORD_RESET_EMAIL_FAILED_TO_SEND,
        err
      )
  })
};
