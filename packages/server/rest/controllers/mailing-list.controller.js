const { NotFoundError, RestApiError } = require("../../errors");

module.exports = (db) => ({
  async createMailingListSubscription(eventSlug, mailingListSlug, email) {
    const { Event, MailingList, MailingListSubscription, User } = db;

    if (!eventSlug) {
      return Promise.reject(new RestApiError("Please provide an event!", 400));
    }

    if (!mailingListSlug) {
      return Promise.reject(new RestApiError("Please provide a list!", 400));
    }

    if (!email) {
      return Promise.reject(new RestApiError("Please provide an email!", 400));
    }

    try {
      const event = await Event.findOne({
        where: { slug: eventSlug },
        include: { model: MailingList, where: { slug: mailingListSlug } }
      });

      if (!event) {
        return Promise.reject(
          new NotFoundError(
            `Event ${eventSlug} with list ${mailingListSlug} was not found!`
          )
        );
      }

      const user = await User.findOne({
        where: { email: email.toLowerCase() }
      });

      await MailingListSubscription.create({
        mailingListId: event.MailingLists[0].id,
        userId: user && user.id ? user.id : null,
        email: email.toLowerCase()
      });

      return Promise.resolve("OK");
    } catch (err) {
      if (err.name && err.name === "SequelizeValidationError") {
        return Promise.reject(
          new RestApiError("Please provide a valid email address!", 422)
        );
      } else if (err.name && err.name === "SequelizeUniqueConstraintError") {
        return Promise.reject(
          new RestApiError(
            "Provided email address has already been signed up!",
            400
          )
        );
      }

      return Promise.reject(
        new RestApiError("An unexpected error occured.", 500)
      );
    }
  }
});
