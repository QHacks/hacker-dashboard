const bcrypt = require("bcrypt");

const PHONE_NUMBER_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        set(val) {
          this.setDataValue(
            "firstName",
            val.charAt(0).toUpperCase() + val.slice(1)
          );
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        set(val) {
          this.setDataValue(
            "lastName",
            val.charAt(0).toUpperCase() + val.slice(1)
          );
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
          isLowercase: true,
          set(val) {
            this.setDataValue("email", val.toLowerCase());
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          is: PHONE_NUMBER_REGEX
        }
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      schoolName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          isUrl: true
        }
      },
      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          isUrl: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      resetPasswordHash: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      getterMethods: {
        fullName() {
          return this.firstName + " " + this.lastName;
        }
      },
      setterMethods: {
        fullName(value) {
          const names = value.split(" ");
          this.setDataValue("firstName", names.slice(0, -1).join(" "));
          this.setDataValue("lastName", names.slice(-1).join(" "));
        }
      },
      indexes: [
        {
          unique: true,
          fields: ["email"]
        }
      ]
    }
  );

  User.addHook("beforeCreate", (user) => {
    return user.hashPassword();
  });

  User.addHook("beforeBulkCreate", (users) => {
    return Promise.all(
      users.map(({ dataValues: user }) => {
        user.hashPassword();
      })
    );
  });

  User.addHook("beforeUpdate", async (user, _) => {
    if (user.changed("password")) {
      return user.hashPassword();
    }
  });

  User.authenticate = function(email, password) {
    return new Promise((resolve, reject) => {
      this.findOne({ where: { email } }).then((user) => {
        if (!user) return reject("Could not find user with that email!");

        user
          .validPassword(password)
          .then(() => {
            return resolve(user);
          })
          .catch(() => {
            return reject("Invalid Password!");
          });
      });
    });
  };

  User.prototype.validPassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, valid) => {
        if (err || !valid) return reject();
        return resolve();
      });
    });
  };

  User.prototype.hashPassword = function() {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return reject(err);

          this.password = hash;

          return resolve();
        });
      });
    });
  };

  return User;
};
