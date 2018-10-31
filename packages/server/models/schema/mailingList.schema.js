const uuid = require("uuid");
const mongoose = require("mongoose");

const mailingListSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  name: {
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

mailingListSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});

mailingListSchema.index({ name: 1, event: 1 }, { unique: true });

module.exports = mailingListSchema;
