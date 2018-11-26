module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define("Prize", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    title: {
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
    }
  });

  Prize.associate = ({ Event, Sponsor, Project, ProjectPrize }) => {
    Prize.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });
    Prize.belongsTo(Sponsor, { foreignKey: "sponsorId" });
    Prize.belongsToMany(Project, {
      through: ProjectPrize,
      foreignKey: "prizeId",
      otherKey: "projectId"
    });
  };

  return Prize;
};
