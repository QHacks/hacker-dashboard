const { MailingListSubscription, MailingList, Event } = require("../models");
const { validateEmail } = require("../services/custom-validator");
const { createError, ERROR_TEMPLATES } = require("../errors");
const { ERROR } = require("../strings");

module.exports = {
  async addMailingListSubscription(event, name, email) {
    try {
      await validateEmail(email);
    } catch (err) {
      return Promise.reject(
        createError(ERROR_TEMPLATES.UNPROCESSABLE, ERROR.INVALID_EMAIL, err)
      );
    }

    const subEvent = await Event.findOne({ slug: event });

    if (!subEvent) {
      return Promise.reject(
        createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.EVENT_NOT_FOUND)
      );
    }

    const subList = await MailingList.findOne({
      name,
      event: subEvent._id
    });

    if (!subList) {
      return Promise.reject(
        createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.MAILING_LIST_NOT_FOUND)
      );
    }

    return new Promise((resolve, reject) => {
      const newSubscription = new MailingListSubscription({
        email,
        list: subList._id
      });

      newSubscription
        .save()
        .then((subscription) => resolve(subscription))
        .catch((err) => {
          // mongoDB Duplicate Key error (email is already in the list)
          if (err.code === 11000) {
            reject(
              createError(
                ERROR_TEMPLATES.BAD_REQUEST,
                ERROR.MAILING_LIST_EMAIL_TAKEN,
                err
              )
            );
          }

          reject(
            createError(
              ERROR_TEMPLATES.DB_ERROR,
              ERROR.MAILING_LIST_SUBSCRIPTION_DID_NOT_SAVE,
              err
            )
          );
        });
    });
  }
};
