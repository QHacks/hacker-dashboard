module.exports = (sequelize, DataTypes) => {
  const ApplicationFieldResponse = sequelize.define(
    "ApplicationFieldResponse",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      answer: {
        type: DataTypes.STRING
      }
    }
  );

  return ApplicationFieldResponse;
};
