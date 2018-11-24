module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define(
    "ProjectUser",
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
          fields: ["userId", "projectId"],
          unique: true
        }
      ]
    }
  );

  ProjectUser.associate = ({ User, Project }) => {
    ProjectUser.belongsTo(User, {
      foreignKey: { name: "userId", allowNull: false }
    });

    ProjectUser.belongsTo(Project, {
      foreignKey: { name: "projectId", allowNull: false }
    });
  };

  return ProjectUser;
};
