const _ = require("lodash");
const camelcase = require("camelcase");
const { Settings, User, Admin, Hacker } = require("../models");
const { ERROR_TEMPLATES, createError } = require("../errors");
const { EMAILS, ERROR, USER } = require("../strings");
const { sendEmail } = require("../emails");

const DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS = { new: true };
const REVIEW_FIELDS = [
  "score",
  "group",
  "performedBy",
  "performedAt",
  "goldenTicket"
];

module.exports = {
  async checkIn(userId, eventId, checkInStatus) {
    if (!userId) {
      throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.MISSING_USER_ID);
    }
    if (!eventId) {
      throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.MISSING_EVENT_ID);
    }
    if (!checkInStatus) {
      throw createError(
        ERROR_TEMPLATES.BAD_REQUEST,
        ERROR.MISSING_CHECK_IN_STATUS
      );
    }

    let updateUser;

    try {
      updateUser = await User.findOneAndUpdate(
        {
          role: USER.ROLES.HACKER,
          "applications.status": USER.APPLICATION.STATUSES.ACCEPTED,
          "applications.rsvp": USER.APPLICATION.RSVPS.COMPLETED,
          "applications.event": eventId,
          _id: userId
        },
        {
          "applications.$.checkIn": checkInStatus
        },
        DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
      );
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_CHECK_IN, err);
    }

    return updateUser;
  },

  async getAdmins() {
    let admins;

    try {
      admins = await Admin.find({});
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_ADMINS_GET, err);
    }

    if (_.isEmpty(admins)) {
      throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_ADMINS_EXIST);
    }

    return admins;
  },

  async getApplicationToReview(reviewGroup) {
    let user;
    try {
      user = await Hacker.findOne({
        $and: [
          {
            $or: [
              { "applications.reviews": { $exists: false } },
              { "applications.reviews": { $size: 0 } },
              { "applications.reviews.group": { $ne: reviewGroup } }
            ]
          },
          {
            $or: [
              { "applications.reviews.goldenTicket": false },
              { "applications.reviews.goldenTicket": { $exists: false } }
            ]
          }
        ]
      });
    } catch (err) {
      throw createError(
        ERROR_TEMPLATES.DB_ERROR,
        ERROR.DB_APPLICATION_TO_REVIEW_GET,
        err
      );
    }

    if (_.isEmpty(user)) {
      throw createError(
        ERROR_TEMPLATES.NOT_FOUND,
        ERROR.NO_APPLICATION_TO_REVIEW_EXISTS
      );
    }

    return user;
  },

  async getApplicationsWithReviews({
    limit = 20,
    skip = 0,
    sort = { score: -1, _id: -1 }
  }) {
    let applications;
    const { numberOfReviewsRequired } = await this.getSettings();

    const pipeline = [
      {
        $match: {
          "applications.reviews": { $exists: true, $not: { $size: 0 } }
        }
      },
      {
        $addFields: {
          score: {
            $multiply: [
              {
                $divide: [
                  { $sum: "$applications.reviews.score" },
                  {
                    $cond: {
                      if: {
                        $gt: [
                          { $size: "$applications.reviews" },
                          numberOfReviewsRequired
                        ]
                      },
                      then: { $size: "$applications.reviews" },
                      else: 1
                    }
                  }
                ]
              },
              {
                $cond: {
                  if: {
                    $gt: [
                      { $size: "$applications.reviews" },
                      numberOfReviewsRequired
                    ]
                  },
                  then: numberOfReviewsRequired,
                  else: 1
                }
              }
            ]
          }
        }
      },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit }
    ];
    try {
      applications = await Hacker.aggregate(pipeline);
    } catch (err) {
      throw createError(
        ERROR_TEMPLATES.DB_ERROR,
        ERROR.DB_APPLICATIONS_WITH_REVIEWS_GET,
        err
      );
    }

    if (_.isEmpty(applications)) {
      throw createError(
        ERROR_TEMPLATES.NOT_FOUND,
        ERROR.NO_APPLICATIONS_WITH_REVIEWS_EXIST
      );
    }

    return applications;
  },

  async getApplicationsWithReviewsCount() {
    let count;
    try {
      count = await Hacker.count({
        role: USER.ROLES.HACKER,
        "applications.reviews": { $exists: true, $not: { $size: 0 } }
      });
    } catch (err) {
      throw createError(
        ERROR_TEMPLATES.DB_ERROR,
        ERROR.DB_APPLICATIONS_WITH_REVIEWS_GET,
        err
      );
    }
    return count;
  },

  getEmails() {
    return Object.values(EMAILS.TEMPLATES).map((template) =>
      _.map(template, (value, key) => ({
        [camelcase(key)]: value
      })).reduce(
        (accum, keyValuePair) => Object.assign(accum, keyValuePair),
        {}
      )
    );
  },

  //TODO: make this so it takes an eventId
  // async getHackersRequiringCheckIn(eventId, email = null) {
  async getHackersRequiringCheckIn() {
    let hackers;

    try {
      hackers = await Hacker.find({
        "applications.status": USER.APPLICATION.STATUSES.ACCEPTED,
        "applications.rsvp": USER.APPLICATION.RSVPS.COMPLETED,
        "applications.checkIn": USER.APPLICATION.CHECK_INS.PENDING
      });
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USERS_GET, err);
    }

    return hackers;
  },

  async getReviewers() {
    let reviewers;

    try {
      reviewers = await Admin.find({
        reviewGroup: { $exists: true }
      });
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEWERS_GET, err);
    }

    if (_.isEmpty(reviewers)) {
      throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_REVIEWERS_EXIST);
    }

    return reviewers;
  },

  async getSettings() {
    let settings;

    try {
      settings = await Settings.findOne({});
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_GET, err);
    }

    if (_.isEmpty(settings)) {
      throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_SETTINGS_EXIST);
    }

    return settings;
  },

  async reassignReviewers() {
    let admins = [];

    try {
      admins = await Admin.find({});
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEWERS_GET, err);
    }

    if (_.isEmpty(admins)) {
      throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_ADMINS_EXIST);
    }

    const { numberOfReviewsRequired } = await this.getSettings();

    const promises = admins.map((admin, index) =>
      Admin.findOneAndUpdate(
        { _id: admin._id },
        { $set: { reviewGroup: index % numberOfReviewsRequired } },
        DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
      )
    );

    return await Promise.all(promises);
  },

  async sendEmail(templateName, recipients) {
    return await sendEmail(templateName, recipients);
  },

  async submitApplicationReview(userId, review) {
    let updatedUser;
    let hasGoldenTicket;
    let reviewer;
    const reviewToSubmit = _.pick(review, REVIEW_FIELDS);
    const reviewerId = reviewToSubmit.performedBy;

    if (reviewToSubmit.goldenTicket) {
      try {
        reviewer = await Admin.findOne({ _id: reviewerId });
      } catch (err) {
        throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER, err);
      }

      const { goldenTickets = 0 } = reviewer;

      if (goldenTickets <= 0) {
        throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.NO_GOLDEN_TICKETS);
      }

      try {
        hasGoldenTicket = !!(await Hacker.findOne({
          _id: userId,
          "applications.reviews.goldenTicket": true
        }));
      } catch (err) {
        throw createError(
          ERROR_TEMPLATES.DB_ERROR,
          ERROR.DB_REVIEW_CREATE,
          err
        );
      }

      if (hasGoldenTicket) {
        throw createError(
          ERROR_TEMPLATES.BAD_REQUEST,
          ERROR.ALREADY_HAS_GOLDEN_TICKET
        );
      }

      try {
        const numberOfGoldenTicketsRemaining =
          goldenTickets - 1 > 0 ?
            goldenTickets - 1 :
            0;
        await Admin.findOneAndUpdate(
          { _id: reviewerId },
          { $set: { goldenTickets: numberOfGoldenTicketsRemaining } }
        );
      } catch (err) {
        throw createError(
          ERROR_TEMPLATES.DB_ERROR,
          ERROR.DB_GOLDEN_TICKETS_REDUCE,
          err
        );
      }
    }

    try {
      updatedUser = await Hacker.findOneAndUpdate(
        { _id: userId },
        { $push: { "applications.0.reviews": reviewToSubmit } },
        DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
      );
    } catch (err) {
      throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEW_CREATE, err);
    }

    return updatedUser;
  }
};
