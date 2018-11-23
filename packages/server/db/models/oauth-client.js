module.exports = (sequelize, DataTypes) => {
  const OAuthClient = sequelize.define("OAuthClient", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    firstParty: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    redirectUri: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  });

  OAuthClient.associate = function({ OAuthRefreshToken }) {
    OAuthClient.hasMany(OAuthRefreshToken, {
      foreignKey: {
        name: "clientId",
        allowNull: true
      }
    });
  };

  return OAuthClient;
};
