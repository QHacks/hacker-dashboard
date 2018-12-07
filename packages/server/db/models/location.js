module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressLine2: {
      type: DataTypes.STRING
    },
    addressCity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressCountry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressCountryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2],
        isUppercase: true,
        notEmpty: true
      }
    },
    addressProvince: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressProvinceCode: {
      type: DataTypes.ENUM(
        "NL",
        "PE",
        "NS",
        "NB",
        "QC",
        "ON",
        "MB",
        "SK",
        "AB",
        "BC",
        "YT",
        "NT",
        "NU"
      )
    },
    addressZIP: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    addressLatitude: {
      type: DataTypes.FLOAT
    },
    addressLongitude: {
      type: DataTypes.FLOAT
    }
  });

  Location.associate = ({ Activity }) => {
    Location.hasMany(Activity, {
      foreignKey: "locationId",
      allowNull: false
    });
  };

  return Location;
};
