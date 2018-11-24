module.exports = (sequelize, DataTypes) => {
  const ProjectPrize = sequelize.define(
    "ProjectPrize",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      }
    },
    {
      indexes: [
        {
          fields: ["projectId", "prizeId"],
          unique: true
        }
      ]
    }
  );

  ProjectPrize.associate = ({ Project, Prize }) => {
    ProjectPrize.belongsTo(Project, {
      foreignKey: { name: "projectId", allowNull: false }
    });

    ProjectPrize.belongsTo(Prize, {
      foreignKey: { name: "prizeId", allowNull: false }
    });
  };

  return ProjectPrize;
};
