module.exports = (sequelize, DataTypes) => {
  const EventSponsor = sequelize.define(
    "EventSponsor",
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
    { indexes: [{ fields: ["eventId", "sponsorId"], unique: true }] }
  );

  EventSponsor.associate = ({ Event, Sponsor }) => {
    EventSponsor.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });

    EventSponsor.belongsTo(Sponsor, {
      foreignKey: { name: "sponsorId", allowNull: false }
    });
  };

  return EventSponsor;
};
