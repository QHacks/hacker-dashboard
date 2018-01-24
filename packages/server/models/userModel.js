const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const _ = require('lodash');
const { SCHOOLS, USER } = require('../strings');

const SALT_WORK_FACTOR = 10;

const { DEGREE_TYPES, GENDERS, MONTHS_IN_A_YEAR, NUMBER_OF_HACKATHONS, TSHIRT_SIZES } = USER;

// TODO: Application specific fields should be moved here. i.e. Why QHacks? etc.
const ApplicationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    event: {
        type: String,
        ref: 'Event',
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
    }
});

ApplicationSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    next();
});
ApplicationSchema.pre('update', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    next();
});

// TODO: Should be a subdocument of the ApplicationSchema
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
        ref: 'User',
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

ReviewSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    next();
});
ReviewSchema.pre('update', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    next();
});

/*
 * TODO: Leave basic information (name, email, etc.) on the root level of the object, but move event specific info
 * (whyQhacks, applciations, etc.) to an array for each event
 */

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phoneNumber: String,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: GENDERS
    },
    password: {
        type: String,
        required: true
    },
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
    travelOrigin: String, // TODO: Move to ApplicationSchema
    numberOfHackathons: {
        type: String,
        enum: NUMBER_OF_HACKATHONS
    }, // TODO: Move to ApplicationSchema
    whyQhacks: String, // TODO: Move to ApplicationSchema
    links: String, // TODO: Move to ApplicationSchema
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }], // TODO: Do we need this anymore since we require an event on an application? We could scope admin permissions
        // by event
    applications: [ApplicationSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    passwordResetHash: {
        type: String
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(USER.ROLES),
        default: USER.ROLES.HACKER
    }, // TODO: Should be an array so a person can have different permissions each year
    reviewGroup: {
        type: Number,
        min: [0, 'Group number must be a valid array index, i.e. non-negative.']
    }, // TODO: Move this to an AdminSchema?
    reviews: [ReviewSchema], // TODO: Should this be a part of the ApplicationSchema?
    goldenTickets: Number // TODO: Move this to an AdminSchema?
});

UserSchema.static({
    authenticate(email, password) {
        return new Promise((resolve, reject) => {
            this.findOne({ email: email.toLowerCase() })
                .then((user) => {
                    if (!user) return reject('No user with that email!');

                    user.validPassword(password)
                        .then(() => {
                            resolve(user);
                        })
                        .catch(() => {
                            reject('Invalid password!');
                        });
                });
        });
    }
});

UserSchema.method({
    validPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password, (err, valid) => {
                if (err || !valid) return reject();
                return resolve();
            });
        });
    }
});

/**
 * Helper method to hash password before saving.
 * @param {Function} next Move to next middleware.
 * @return {Function} Next middleware.
 */
// TODO: This doesn't get called on update or findOneAndUpdate
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            this.modifiedAt = Date.now();
            return next();
        });
    });
});

UserSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    return next();
});
UserSchema.pre('update', function(next) {
    this.update({}, { $set: { modifiedAt: new Date() } });
    return next();
});

/**
 * Helper method to automatically add an RSVP to the UserSchema
 * when an application has had its status changed to 'ACCEPTED'
 */
UserSchema.pre('findOneAndUpdate', function(next) {
    const { ACCEPTED, REJECTED, WAITING_LIST, WITHDRAWN } = USER.APPLICATION.STATUSES;
    const event = this.getQuery()['applications.event'];
    const updatedStatus = this.getUpdate().$set['applications.$.status'];
    if (!event || !updatedStatus) return next();
    if (_.isEqual(updatedStatus, ACCEPTED)) {
        this.update({
            'applications.event': event
        }, {
            $set: { 'applications.$.rsvp': USER.APPLICATION.RSVPS.PENDING }
        });
    } else if (
        _.isEqual(updatedStatus, REJECTED) || _.isEqual(updatedStatus, WAITING_LIST) || _.isEqual(updatedStatus, WITHDRAWN)
    ) {
        this.update({
            'applications.event': event
        }, {
            $set: { 'applications.$.rsvp': USER.APPLICATION.RSVPS.NOT_NEEDED }
        });
    }
    return next();
});

module.exports = mongoose.model('User', UserSchema);
