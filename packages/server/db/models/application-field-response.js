module.exports = (sequelize, DataTypes) => {
  const ApplicationFieldResponse = sequelize.define(
    "ApplicationFieldResponse",
    {
      answer: {
        type: DataTypes.TEXT
      }
    }
  );

  return ApplicationFieldResponse;
};
