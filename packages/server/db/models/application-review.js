module.exports = (sequelize, DataTypes) => {
  const ApplicationReview = sequelize.define(
    "ApplicationReview",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 5,
          min: 0
        }
      }
    },
    { indexes: [{ fields: ["applicationId", "reviewerId"], unique: true }] }
  );

  ApplicationReview.associate = ({ User, Application }) => {
    ApplicationReview.belongsTo(User, {
      foreignKey: { name: "reviewerId", allowNull: false }
    });

    ApplicationReview.belongsTo(Application, {
      foreignKey: {
        name: "applicationId",
        allowNull: false
      }
    });
  };
  return ApplicationReview;
};
