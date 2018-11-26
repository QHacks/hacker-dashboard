module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("Application", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    status: {
      type: DataTypes.ENUM("APPLIED", "WAITING_LIST", "ACCEPTED", "REJECTED"),
      allowNull: true
    },
    submissionDate: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
    }
  });

  Application.associate = ({
    Event,
    User,
    ApplicationField,
    ApplicationReview,
    ApplicationFieldResponse
  }) => {
    Application.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });
    Application.belongsTo(User, {
      foreignKey: { name: "userId", allowNull: false }
    });
    Application.belongsToMany(ApplicationField, {
      through: ApplicationFieldResponse,
      foreignKey: "applicationId",
      otherKey: "applicationFieldId"
    });
    Application.belongsToMany(User, {
      through: ApplicationReview,
      foreignKey: { name: "applicationId", allowNull: false },
      otherKey: { name: "reviewerId", allowNull: false }
    });
  };

  return Application;
};
