module.exports = (sequelize, DataTypes) => {
  const Sponsor = sequelize.define("Sponsor", {
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
    sponsorshipLevel: {
      type: DataTypes.ENUM("TERA", "GIGA", "MEGA", "STARTUP", "SCHOOL"),
      allowNull: false
    },
    contactEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    contactAddress: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  });

  Sponsor.associate = ({ Event, EventSponsor, Activity, Prize }) => {
    Sponsor.hasMany(Activity, {
      foreignKey: "sponsorId"
    });
    Sponsor.hasMany(Prize, {
      foreignKey: "sponsorId"
    });
    Sponsor.belongsToMany(Event, {
      through: EventSponsor,
      foreignKey: "sponsorId",
      otherKey: "eventId"
    });
  };
  return Sponsor;
};
