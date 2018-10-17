const mongoose = require("mongoose");
const uuid = require("uuid");

const ReviewSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  score: {
    type: Number,
    required: true
  },
  group: {
    type: Number,
    required: true
  },
  performedBy: {
    type: String,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  goldenTicket: {
    type: Boolean,
    default: false
  }
});

ReviewSchema.pre("findOneAndUpdate", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

ReviewSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

module.exports = ReviewSchema;
