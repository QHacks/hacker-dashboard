const uuid = require("uuid");
const mongoose = require("mongoose");

const mailingListSubscriptionSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  email: { type: String, required: true },
  list: { type: String, required: true, ref: "SubscriptionList" },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

mailingListSubscriptionSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});

mailingListSubscriptionSchema.index({ email: 1, list: 1 }, { unique: true });

module.exports = mailingListSubscriptionSchema;
