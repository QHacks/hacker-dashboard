const mongoose = require("mongoose");
const uuid = require("uuid");

const ReviewSchema = require("./review.schema");
const { USER } = require("../../strings");
const { NUMBER_OF_HACKATHONS, TSHIRT_SIZES } = USER;

const ApplicationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  event: {
    type: String,
    ref: "Event",
    index: true,
    required: true
  },
  rsvp: {
    type: String,
    enum: Object.values(USER.APPLICATION.RSVPS),
    default: USER.APPLICATION.RSVPS.NOT_NEEDED
  },
  status: {
    type: String,
    enum: Object.values(USER.APPLICATION.STATUSES),
    default: USER.APPLICATION.STATUSES.APPLIED
  },
  checkIn: {
    type: String,
    enum: Object.values(USER.APPLICATION.CHECK_INS),
    default: USER.APPLICATION.CHECK_INS.NOT_NEEDED
  },
  dietaryRestrictions: String,
  emergencyContact: {
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    relationToContact: String
  },
  favSnack: String,
  resume: String,
  tshirtSize: {
    type: String,
    enum: TSHIRT_SIZES
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  travelOrigin: String,
  numberOfHackathons: {
    type: String,
    enum: NUMBER_OF_HACKATHONS
  },
  reviews: [ReviewSchema],
  whyQhacks: String,
  links: String
});

ApplicationSchema.pre("findOneAndUpdate", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

ApplicationSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

module.exports = ApplicationSchema;
