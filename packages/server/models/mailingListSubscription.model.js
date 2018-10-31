const mongoose = require("mongoose");
const mailingListSubscriptionSchema = require("./schema/mailingListSubscription.schema");

module.exports = mongoose.model(
  "MailingListSubscription",
  mailingListSubscriptionSchema
);
