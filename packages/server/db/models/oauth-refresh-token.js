module.exports = (sequelize, DataTypes) => {
  const OAuthRefreshToken = sequelize.define("OAuthRefreshToken", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  OAuthRefreshToken.associate = ({ OAuthUser, OAuthClient }) => {
    OAuthRefreshToken.belongsTo(OAuthUser, {
      foreignKey: {
        name: "oauthUserId",
        allowNull: false
      }
    });

    OAuthRefreshToken.belongsTo(OAuthClient, {
      foreignKey: "clientId",
      allowNull: false
    });
  };

  return OAuthRefreshToken;
};
