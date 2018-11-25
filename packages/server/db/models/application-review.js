module.exports = (sequelize, DataTypes) => {
  const ApplicationReview = sequelize.define("ApplicationReview", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 0
      }
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  });

  return ApplicationReview;
};
