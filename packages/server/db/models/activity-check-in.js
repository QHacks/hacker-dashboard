module.exports = (sequelize, DataTypes) => {
  const ActivityCheckIn = sequelize.define("ActivityCheckIn", {
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  });

  return ActivityCheckIn;
};
