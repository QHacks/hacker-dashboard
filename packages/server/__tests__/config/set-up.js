const { sequelize } = require("./mock-db");

module.exports = async () => {
  await sequelize.sync({ force: true });
};
