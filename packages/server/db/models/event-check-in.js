module.exports = (sequelize, DataTypes) => {
  const EventCheckIn = sequelize.define("EventCheckIn", {
    checkInTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  });

  return EventCheckIn;
};
