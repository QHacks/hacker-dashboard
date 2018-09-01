const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { USER } = require("../../strings");

const SALT_WORK_FACTOR = 10;

const { GENDERS } = USER;

const userOptions = { discriminatorKey: "role" };
const UserSchema = new mongoose.Schema(
  {
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
    }
  },
  userOptions
);

UserSchema.static({
  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      this.findOne({ email: email.toLowerCase() }).then((user) => {
        if (!user) return reject("No user with that email!");

        user
          .validPassword(password)
          .then(() => {
            resolve(user);
          })
          .catch(() => {
            reject("Invalid password!");
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
function hashPassword(next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      this.modifiedAt = Date.now();
      return next();
    });
  });
}

["save", "update"].forEach((action) => {
  UserSchema.pre(action, hashPassword);
});

UserSchema.pre("findOneAndUpdate", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});
UserSchema.pre("update", function(next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  return next();
});

module.exports = UserSchema;
