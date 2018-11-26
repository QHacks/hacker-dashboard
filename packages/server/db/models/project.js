module.exports = (sequelie, DataTypes) => {
  const Project = sequelie.define("Project", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    videoUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    repositoryUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    submissionDate: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });

  Project.associate = ({ Event, User, UserProject, Prize, ProjectPrize }) => {
    Project.belongsTo(Event, { foreignKey: "eventId", allowNull: false });
    Project.belongsToMany(User, {
      through: UserProject,
      foreignKey: { name: "projectId", allowNull: false },
      otherKey: { name: "userId", allowNull: false }
    });
    Project.belongsToMany(Prize, {
      through: ProjectPrize,
      foreignKey: "projectId",
      otherKey: "prizeId"
    });
  };

  return Project;
};
