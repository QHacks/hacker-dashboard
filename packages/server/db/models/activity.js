module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
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
    description: {
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
    }
  });

  Activity.associate = ({
    Sponsor,
    Event,
    Location,
    User,
    ActivityCheckIn
  }) => {
    Activity.belongsTo(Sponsor, { foreignKey: "sponsorId" });
    Activity.belongsToMany(User, {
      through: ActivityCheckIn,
      foreignKey: { name: "activityId", allowNull: false },
      otherKey: { name: "userId", allowNull: false }
    });
    Event.hasMany(Activity, { foreignKey: "eventId", allowNull: false });
    Location.hasMany(Activity, { foreignKey: "locationId", allowNull: false });
  };

  return Activity;
};
