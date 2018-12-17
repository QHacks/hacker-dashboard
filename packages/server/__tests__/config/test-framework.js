const seedTestDatabase = require("./seed-test-database");

beforeEach(async () => {
  const { db } = global;

  await db.sequelize.sync({ force: true });

  await seedTestDatabase();
});
