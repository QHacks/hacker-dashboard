const uuid = require("uuid");
const mongoose = require("mongoose");
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const subscriptionSchema = mongoose.Schema({
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

function validateEmail(email, next) {
  const isValidEmail = EMAIL_REGEX.test(email);
  if (!isValidEmail) {
    return next({ error: "Invalid email provided!" });
  }
}

subscriptionSchema.pre("update", function(next) {
  if (this.isModified("email")) {
    validateEmail(this.email, next);
  }
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});

subscriptionSchema.pre("save", function(next) {
  validateEmail(this.email, next);
  return next();
});

subscriptionSchema.index({ email: 1, list: 1 }, { unique: true });

module.exports = subscriptionSchema;
