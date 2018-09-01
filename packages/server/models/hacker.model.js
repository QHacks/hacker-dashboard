const mongoose = require("mongoose");
const User = require("./user.model");
const uuid = require("uuid");
const _ = require("lodash");

const { SCHOOLS, USER } = require("../strings");
const {
  DEGREE_TYPES,
  MONTHS_IN_A_YEAR,
  NUMBER_OF_HACKATHONS,
  TSHIRT_SIZES
} = USER;

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

ReviewSchema.pre("findOneAndUpdate", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});
ReviewSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

const HackerSchema = new mongoose.Schema({
  school: {
    type: String,
    enum: SCHOOLS
  },
  degreeType: {
    type: String,
    enum: DEGREE_TYPES
  },
  program: String,
  graduationYear: String,
  graduationMonth: {
    type: String,
    enum: MONTHS_IN_A_YEAR
  },
  applications: [ApplicationSchema]
});

HackerSchema.pre("findOneAndUpdate", function(next) {
  const {
    ACCEPTED,
    REJECTED,
    WAITING_LIST,
    WITHDRAWN
  } = USER.APPLICATION.STATUSES;
  const event = this.getQuery()["applications.event"];
  const updatedStatus = this.getUpdate().$set["applications.$.status"];
  if (!event || !updatedStatus) return next();
  if (_.isEqual(updatedStatus, ACCEPTED)) {
    this.update(
      {
        "applications.event": event
      },
      {
        $set: {
          "applications.$.rsvp": USER.APPLICATION.RSVPS.PENDING,
          "applications.$.checkIn": USER.APPLICATION.CHECK_INS.PENDING
        }
      }
    );
  } else if (
    _.isEqual(updatedStatus, REJECTED) ||
    _.isEqual(updatedStatus, WAITING_LIST) ||
    _.isEqual(updatedStatus, WITHDRAWN)
  ) {
    this.update(
      {
        "applications.event": event
      },
      {
        $set: {
          "applications.$.rsvp": USER.APPLICATION.RSVPS.NOT_NEEDED,
          "applications.$.checkIn": USER.APPLICATION.CHECK_INS.NOT_NEEDED
        }
      }
    );
  }
  return next();
});

module.exports = User.discriminator(USER.ROLES.HACKER, HackerSchema);
