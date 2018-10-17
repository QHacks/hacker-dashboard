const mongoose = require("mongoose");
const _ = require("lodash");

const ApplicationSchema = require("./application.schema");
const { SCHOOLS, USER } = require("../../strings");
const { DEGREE_TYPES, MONTHS_IN_A_YEAR } = USER;

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

module.exports = HackerSchema;
