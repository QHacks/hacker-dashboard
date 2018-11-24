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
    submissionDate: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });

  Project.associate = ({ Event }) => {
    Project.belongsTo(Event, { foreignKey: "eventId", allowNull: false });
  };

  return Project;
};
