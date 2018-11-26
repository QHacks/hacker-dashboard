module.exports = (sequelize, DataTypes) => {
  const MailingList = sequelize.define(
    "MailingList",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      indexes: [
        {
          fields: ["slug", "eventId"],
          unique: true
        }
      ]
    }
  );

  MailingList.associate = ({ Event, MailingListSubscription, User }) => {
    MailingList.belongsTo(Event, {
      foreignKey: { name: "eventId", allowNull: false }
    });
    MailingList.hasMany(MailingListSubscription, {
      foreignKey: { name: "mailingListId", allowNull: false }
    });
  };

  return MailingList;
};
