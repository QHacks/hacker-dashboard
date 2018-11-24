module.exports = (sequelize, DataTypes) => {
  const MailingListSubscription = sequelize.define(
    "MailingListSubscription",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
    },
    {
      indexes: [{ fields: ["mailingListId", "email"], unique: true }]
    }
  );

  MailingListSubscription.associate = ({ MailingList, User }) => {
    MailingListSubscription.belongsTo(MailingList, {
      foreignKey: { name: "mailingListId", allowNull: false }
    });

    MailingListSubscription.belongsTo(User, { foreignKey: "userId" });
  };

  return MailingListSubscription;
};
