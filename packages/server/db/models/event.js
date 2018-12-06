const DEFAULT_HAS_MANY_OPTIONS = {
  foreignKey: { name: "eventId", allowNull: false }
};

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

  Event.associate = ({
    Sponsor,
    EventSponsor,
    Activity,
    User,
    Application,
    ApplicationField,
    EventCheckIn,
    MailingList,
    Speaker,
    Prize
  }) => {
    Event.belongsToMany(User, {
      through: EventCheckIn,
      foreignKey: "eventId",
      otherKey: "userId"
    });

    Event.belongsToMany(Sponsor, {
      through: EventSponsor,
      foreignKey: "eventId",
      otherKey: "sponsorId"
    });

    Event.hasMany(Application, DEFAULT_HAS_MANY_OPTIONS);

    Event.hasMany(ApplicationField, DEFAULT_HAS_MANY_OPTIONS);

    Event.hasMany(Activity, DEFAULT_HAS_MANY_OPTIONS);

    Event.hasMany(MailingList, DEFAULT_HAS_MANY_OPTIONS);

    Event.hasMany(Speaker, DEFAULT_HAS_MANY_OPTIONS);

    Event.hasMany(Prize, DEFAULT_HAS_MANY_OPTIONS);
  };

  return Event;
};
