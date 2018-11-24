module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      requiresApplication: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      applicationOpenDate: {
        type: DataTypes.DATE
      },
      applicationCloseDate: {
        type: DataTypes.DATE
      },
      hasProjectSubmissions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      projectSubmissionDate: {
        type: DataTypes.DATE
      },
      eventLogoUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    },
    {
      indexes: [
        {
          fields: ["slug"],
          unique: true
        }
      ]
    }
  );

  return Event;
};
