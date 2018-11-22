const uuidv4 = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        validate: {
          isUUID: 4
        }
      },
      firstName: {
        type: DataTypes.STRING,
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
      dob: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
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
      }
    }
  );

  User.addHook("beforeCreate", (model, options) => {
    if (model.id) return;
    model.id = uuidv4();
  });

  return User;
};
