const { User } = require('../models');
const { ERROR_TEMPLATES, createError } = require('../errors');
const { EMAILS, ERROR, USER } = require('../strings');
const { sendEmail } = require('../emails');

const DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS = { new: true };
const EMAILS_BY_APPLICATION_STATUS = {
    [USER.APPLICATION.STATUSES.ACCEPTED]: EMAILS.TEMPLATES.APPLICATION_ACCEPTED.NAME,
    [USER.APPLICATION.STATUSES.REJECTED]: EMAILS.TEMPLATES.APPLICATION_DECLINED.NAME,
    [USER.APPLICATION.STATUSES.WAITING_LIST]: EMAILS.TEMPLATES.APPLICATION_WAITLISTED.NAME
};

module.exports = {
    getUser(userId) {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: userId }).then((user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID));
                }
            }).catch((err) => {
                reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_GET, err));
            });
        });
    },

    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find().then((users) => {
                resolve({ users });
            }).catch((err) => {
                reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USERS_GET, err));
            });
        });
    },

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            User.findOneAndRemove({ _id: userId }).then((user) => {
                if (!user) return reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID));
                resolve();
            });
        });
    },

    updateUser(userId, userInfo) {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: userId }).then((user) => {
                if (!user) reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID));

                Object.keys(userInfo).forEach((key) => {
                    if (user[key]) user[key] = userInfo[key];
                });

                user.save().then(resolve).catch((err) => {
                    reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_UPDATE, err));
                });

            }).catch((err) => {
                reject(createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_USER_GET, err));
            });
        });
    },

    async updateApplicationStatus(userId, eventId, status) {
        if (!userId) {
            throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.INVALID_USER_ID);
        }

        if (!eventId) {
            throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.INVALID_EVENT_ID);
        }

        if (!status || !USER.APPLICATION.STATUSES[status]) {
            throw createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.INVALID_APPLICATION_STATUS);
        }

        let updatedUser;
        try {
            updatedUser = await User.findOneAndUpdate(
                { _id: userId, 'applications.event': eventId },
                { $set: { 'applications.$.status': USER.APPLICATION.STATUSES[status] } },
                DEFAULT_FIND_ONE_AND_UPDATE_OPTIONS
            );
            console.log(userId, eventId);
            console.log('updated user', updatedUser);
        } catch (e) {
            throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_UPDATE_APPLICATION_STATUS, e);
        }

        if (!updatedUser) throw createError(ERROR_TEMPLATES.DB_ERROR, ERROR.DB_UPDATE_APPLICATION_STATUS);

        const templateName = EMAILS_BY_APPLICATION_STATUS[status];

        if (templateName) {
            await sendEmail(templateName, updatedUser);
        }

        return updatedUser;
    }
};
