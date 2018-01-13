const _ = require('lodash');
const { Settings, User } = require('../models');
const { USER } = require('../strings');

const DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS = { new: true };
const ERRORS = {
    BAD_REQUEST: {
        code: 400,
        type: 'BAD_REQUEST'
    },
    NOT_FOUND: {
        code: 404,
        type: 'MISSING'
    },
    DB_ERROR: {
        code: 503,
        type: 'DB_ERROR'
    }
};
const ERROR_MESSAGES = {
    DB_ADMINS: 'Could not retrieve admins from the database!',
    DB_APPLICATION_TO_REVIEW: 'Could not retrieve an application to review from the database!',
    DB_REVIEWERS: 'Could not retrieve reviewers from the database!',
    DB_REVIEWS_ADD: 'Could not add a review to the specified application',
    DB_REVIEWS_GET: 'Could not get a review from the specified application',
    DB_SETTINGS: 'Could not retrieve settings from the database!',
    DB_USER: 'Could not retrieve that user from the database!',
    DB_GOLDEN_TICKETS_REDUCE: 'Could not reduce the amount of golden tickets for the reviewer!',


    NO_APPLICATION_TO_REVIEW_EXISTS: 'No application to review exists in the database!',
    NO_ADMINS_EXIST: 'No admins exist in the database!',
    NO_REVIEWERS_EXIST: 'No reviewers exist in the database!',
    NO_SETTINGS_EXIST: 'No settings exist in the database!',
    NO_GOLDEN_TICKETS: 'No golden tickets are left for this reviewer!',
    ALREADY_HAS_GOLDEN_TICKET: 'This application already has a golden ticket!'
};
const REVIEW_FIELDS = [
    'score',
    'group',
    'performedBy',
    'performedAt',
    'goldenTicket'
];

function createError(errorTemplate, message, data = {}) {
    return Object.assign({}, errorTemplate, { message, data });
}

module.exports = {
    async getApplicationToReview(reviewGroup) {
        let user;
        try {
            user = await User.findOne({
                $and: [
                    { role: 'HACKER' },
                    {
                        $or: [
                            { reviews: { $exists: false } },
                            { reviews: { $size: 0 } },
                            { 'reviews.group': { $ne: reviewGroup } }
                        ]
                    },
                    {
                        $or: [
                            { 'reviews.goldenTicket': false },
                            { 'reviews.goldenTicket': { $exists: false }}
                        ]
                    }
                ]
            });
        } catch (err) {
            throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_APPLICATION_TO_REVIEW, err);
        }

        if (_.isEmpty(user)) {
            throw createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.NO_APPLICATION_TO_REVIEW_EXISTS);
        }

        return user;
    },

    async getReviewers() {
        let reviewers;

        try {
            reviewers = await User.find({ role: USER.ROLES.ADMIN, reviewGroup: { $exists: true } });
        } catch (err) {
            throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_REVIEWERS, err);
        }

        if (_.isEmpty(reviewers)) {
            throw createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.NO_REVIEWERS_EXIST);
        }

        return reviewers;
    },

    async getSettings() {
        let settings;

        try {
            settings = await Settings.findOne({});
        } catch (err) {
            throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err);
        }

        if (_.isEmpty(settings)) {
            throw createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.NO_SETTINGS_EXIST);
        }

        return settings;
    },

    async reassignReviewers() {
        let admins = [];

        try {
            admins = await User.find({ role: USER.ROLES.ADMIN });
        } catch (err) {
            throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_REVIEWERS, err);
        }

        if (_.isEmpty(admins)) {
            throw createError(ERRORS.NOT_FOUND, ERROR_MESSAGES.NO_ADMINS_EXIST);
        }

        const { numberOfReviewsRequired } = await this.getSettings();

        const promises = admins.map((admin, index) => (
            User.findOneAndUpdate(
                { _id: admin._id },
                { $set: { reviewGroup: index % numberOfReviewsRequired } },
                DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
            )
        ));

        return await Promise.all(promises);
    },

    async submitApplicationReview(userId, review) {
        let updatedUser;
        let hasGoldenTicket;
        let reviewer;

        const reviewToSubmit = _.pick(review, REVIEW_FIELDS);
        const reviewerId = reviewToSubmit.performedBy;

        if (reviewToSubmit.goldenTicket) {
            try {
                reviewer = await User.findOne({ _id: reviewerId });
            } catch (err) {
                throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_USER, err);
            }

            const { goldenTickets = 0 } = reviewer;

            if (goldenTickets <= 0) {
                throw createError(ERRORS.BAD_REQUEST, ERROR_MESSAGES.NO_GOLDEN_TICKETS);
            }

            try {
                hasGoldenTicket = !!(await User.findOne({ _id: userId, 'reviews.goldenTicket': true }));
            } catch (err) {
                throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_REVIEWS_ADD, err);
            }

            if (hasGoldenTicket) {
                throw createError(ERRORS.BAD_REQUEST, ERROR_MESSAGES.ALREADY_HAS_GOLDEN_TICKET);
            }

            try {
                const numberOfGoldenTicketsRemaining = goldenTickets - 1 > 0
                    ? goldenTickets - 1
                    : 0;
                await User.findOneAndUpdate(
                    { _id: reviewerId },
                    { $set: { goldenTickets: numberOfGoldenTicketsRemaining } }
                );
            } catch (err) {
                throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_GOLDEN_TICKETS_REDUCE, err);
            }
        }

        try {
            updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { reviews: reviewToSubmit } },
                DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
            );
        } catch (err) {
            throw createError(ERRORS.DB_ERROR, ERROR_MESSAGES.DB_REVIEWS_ADD, err);
        }

        return updatedUser;
    }
};
