module.exports = (sequelize, DataTypes) => {
  const OAuthClient = sequelize.define(
    "OAuthClient",
    {
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
      host: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      clientSecret: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        validate: {
          isUrl: true
        }
      }
    },
    { indexes: [{ fields: ["host"], unique: true }] }
  );

  OAuthClient.associate = function({ OAuthRefreshToken }) {
    OAuthClient.hasMany(OAuthRefreshToken, {
      foreignKey: {
        name: "clientId",
        allowNull: false
      }
    });
  };

  return OAuthClient;
};
