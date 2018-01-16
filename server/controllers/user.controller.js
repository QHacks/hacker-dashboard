const { User } = require('../models');
const { ERROR_TEMPLATES, createError } = require('../errors');
const { ERROR } = require('../strings');

module.exports = {
    getUser(userId) {
        return new Promise((resolve, reject) => {
            User.findOne({ _id: userId }).then((user) => {
                if (user) resolve(user);
                else reject(createError(ERROR_TEMPLATES.NOT_FOUND, ERROR.INVALID_USER_ID));
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
    }
};
