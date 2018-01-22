const _ = require('lodash');
const camelcase = require('camelcase');
const { Settings, User } = require('../models');
const { ERROR_TEMPLATES, createError } = require('../errors');
const { EMAILS, ERROR, USER } = require('../strings');
const { sendEmail } = require('../emails');

const DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS = { new: true };
const REVIEW_FIELDS = [
    'score',
    'group',
    'performedBy',
    'performedAt',
    'goldenTicket'
];

module.exports = {
    async getAdmins() {
        let admins;

        try {
            admins = await User.find({ role: USER.ROLES.ADMIN });
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
                            { 'reviews.goldenTicket': { $exists: false } }
                        ]
                    }
                ]
            });
        } catch (err) {
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_APPLICATION_TO_REVIEW_GET, err);
        }

        if (_.isEmpty(user)) {
            throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_APPLICATION_TO_REVIEW_EXISTS);
        }

        return user;
    },

    async getApplicationsWithReviews({ limit = 20, skip = 0, sort = { score: -1 } }) {
        let applications;
        const { numberOfReviewsRequired } = await this.getSettings();

        const pipeline = [
            { $match: { role: USER.ROLES.HACKER, reviews: { $exists: true, $not: { $size: 0 } } } },
            {
                $addFields: {
                    score: {
                        $multiply: [
                            {
                                $divide: [
                                    { $sum: '$reviews.score' },
                                    {
                                        $cond: {
                                            if: {
                                                $gt: [{ $size: '$reviews' }, numberOfReviewsRequired]
                                            },
                                            then: { $size: '$reviews' },
                                            else: 1
                                        }
                                    }
                                ]
                            },
                            {
                                $cond: {
                                    if: {
                                        $gt: [{ $size: '$reviews' }, numberOfReviewsRequired]
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
            applications = await User.aggregate(pipeline);
        } catch (err) {
            console.error(err);
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_APPLICATIONS_WITH_REVIEWS_GET, err);
        }

        if (_.isEmpty(applications)) {
            throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_APPLICATIONS_WITH_REVIEWS_EXIST);
        }

        return applications;
    },

    async getApplicationsWithReviewsCount() {
        let count;
        try {
            count = await User.count({
                role: USER.ROLES.HACKER,
                reviews: { $exists: true, $not: { $size: 0 } }
            });
        } catch (err) {
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_APPLICATIONS_WITH_REVIEWS_GET, err);
        }
        return count;
    },

    getEmails() {
        return Object.values(EMAILS.TEMPLATES).map((template) => (
            _.map(template, (value, key) => ({
                [camelcase(key)]: value
            })).reduce((accum, keyValuePair) => (
                Object.assign(accum, keyValuePair)
            ), {})
        ));
    },

    async getReviewers() {
        let reviewers;

        try {
            reviewers = await User.find({ role: USER.ROLES.ADMIN, reviewGroup: { $exists: true } });
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
            admins = await User.find({ role: USER.ROLES.ADMIN });
        } catch (err) {
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEWERS_GET, err);
        }

        if (_.isEmpty(admins)) {
            throw createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.NO_ADMINS_EXIST);
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
                reviewer = await User.findOne({ _id: reviewerId });
            } catch (err) {
                throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER, err);
            }

            const { goldenTickets = 0 } = reviewer;

            if (goldenTickets <= 0) {
                throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.NO_GOLDEN_TICKETS);
            }

            try {
                hasGoldenTicket = !!(await User.findOne({ _id: userId, 'reviews.goldenTicket': true }));
            } catch (err) {
                throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEW_CREATE, err);
            }

            if (hasGoldenTicket) {
                throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.ALREADY_HAS_GOLDEN_TICKET);
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
                throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_GOLDEN_TICKETS_REDUCE, err);
            }
        }

        try {
            updatedUser = await User.findOneAndUpdate(
                { _id: userId },  // TODO: add { 'reviews.group': { $ne: reviewToSubmit.group } } to avoid duplicate
                // applications for a user
                { $push: { reviews: reviewToSubmit } },
                DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
            );
        } catch (err) {
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_REVIEW_CREATE, err);
        }

        return updatedUser;
    }
};
