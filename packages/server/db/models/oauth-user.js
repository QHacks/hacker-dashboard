module.exports = (sequelize, DataTypes) => {
  const OAuthUser = sequelize.define("OAuthUser", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    scopes: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.ENUM("HACKER", "VOLUNTEER", "ADMIN", "SUPER_ADMIN"),
      allowNull: false,
      validate: {
        isUppercase: true
      }
    }
  });

  OAuthUser.associate = function({ User, OAuthRefreshToken }) {
    OAuthUser.hasOne(User, {
      foreignKey: {
        name: "oauthUserId",
        allowNull: false
      }
    });

    OAuthUser.hasMany(OAuthRefreshToken, {
      foreignKey: {
        name: "oauthUserId",
        allowNull: false
      }
    });
  };

  return OAuthUser;
};
