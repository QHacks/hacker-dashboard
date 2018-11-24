module.exports = (sequelize, DataTypes) => {
  const ActivityCheckIn = sequelize.define(
    "ActivityCheckIn",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      checkInTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    },
    {
      indexes: [
        {
          fields: ["userId", "activityId"],
          unique: true
        }
      ]
    }
  );

  ActivityCheckIn.associate = ({ Activity, User }) => {
    ActivityCheckIn.belongsTo(User, {
      foreignKey: { name: "userId", allowNull: false }
    });

    ActivityCheckIn.belongsTo(Activity, {
      foreignKey: {
        name: "activityId",
        allowNull: false
      }
    });
  };

  return ActivityCheckIn;
};
