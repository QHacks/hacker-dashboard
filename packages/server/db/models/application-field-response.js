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

  ApplicationFieldResponse.associate = ({ Application, ApplicationField }) => {
    ApplicationFieldResponse.belongsTo(ApplicationField, {
      foreignKey: { name: "fieldId", allowNull: false }
    });

    ApplicationFieldResponse.belongsTo(Application, {
      foreignKey: { name: "applicationId", allowNull: false }
    });
  };
  return ApplicationFieldResponse;
};
