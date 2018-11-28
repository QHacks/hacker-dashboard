module.exports = (sequelize, DataTypes) => {
  const ApplicationFieldResponse = sequelize.define(
    "ApplicationFieldResponse",
    {
      answer: {
        type: DataTypes.STRING
      }
    }
  );

  return ApplicationFieldResponse;
};
