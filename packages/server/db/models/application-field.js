module.exports = (sequelize, DataTypes) => {
  const ApplicationField = sequelize.define("ApplicationField", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      // Subject to change
      type: DataTypes.ENUM(
        "CHECKBOX",
        "TEXT_INPUT",
        "NUMBER_INPUT",
        "FILE_INPUT",
        "SELECT"
      ),
      allowNull: false
    }
  });

  ApplicationField.associate = ({ Event }) => {
    ApplicationField.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });
  };

  return ApplicationField;
};
