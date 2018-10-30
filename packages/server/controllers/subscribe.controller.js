const { Subscription, SubscriptionList, Event } = require("../models");
const { createError, ERROR_TEMPLATES } = require("../errors");
const { ERROR } = require("../strings");

module.exports = {
  async addSubscription(event, type, email) {
    const subEvent = await Event.findOne({ slug: event });

    if (!subEvent) {
      return Promise.reject(
        createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.EVENT_NOT_FOUND, {})
      );
    }

    const subList = await SubscriptionList.findOne({
      type,
      event: subEvent._id
    });

    if (!subList) {
      return Promise.reject(
        createError(
          ERROR_TEMPLATES.NOT_FOUND,
          ERROR.SUBSCRIPTION_LIST_NOT_FOUND,
          {}
        )
      );
    }

    return new Promise((resolve, reject) => {
      const newSubscription = new Subscription({
        email,
        list: subList._id
      });

      newSubscription
        .save()
        .then((res) => resolve(res))
        .catch((err) => {
          if (err.code === 11000) {
            reject(
              createError(
                ERROR_TEMPLATES.UNAUTHORIZED,
                ERROR.SUBSCRIPTION_EMAIL_TAKEN,
                err
              )
            );
          } else if (err.message === "Invalid email provided!") {
            reject(
              createError(
                ERROR_TEMPLATES.BAD_REQUEST,
                ERROR.SUBSCRIPTION_INVALID_EMAIL,
                err
              )
            );
          }

          reject(
            createError(
              ERROR_TEMPLATES.DB_ERROR,
              ERROR.SUBSCRIPTION_DID_NOT_SAVE,
              err
            )
          );
        });
    });
  }
};
