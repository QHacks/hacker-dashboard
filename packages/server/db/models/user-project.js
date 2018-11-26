module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define("UserProject", {
    owner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return UserProject;
};
