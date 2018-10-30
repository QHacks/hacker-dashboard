const uuid = require("uuid");
const mongoose = require("mongoose");

const subscriptionListSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  slug: {
    type: String,
    unique: true
  },
  event: {
    type: String,
    required: true,
    ref: "Event"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

subscriptionListSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});

subscriptionListSchema.index({ slug: 1, event: 1 }, { unique: true });

module.exports = subscriptionListSchema;
