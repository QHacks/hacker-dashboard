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

  Prize.associate = ({ Event, Sponsor }) => {
    Prize.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });

    Prize.belongsTo(Sponsor, { foreignKey: "sponsorId" });
  };

  return Prize;
};
