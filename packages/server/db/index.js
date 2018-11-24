const Sequelize = require("sequelize");
const config = require("./config");

const db_env = process.env.DB_ENVIRONMENT || "development";
const db_config = config[db_env];

const database = (logger) => {
  const sequelize = new Sequelize(db_config);

  sequelize
    .authenticate()
    .then(() => {
      logger.info(
        "Connection to the database has been established successfully!"
      );
    })
    .catch((err) => {
      logger.error("Unable to connect to the database:", err);
      throw new Error();
    });

  const db = {
    User: sequelize.import("./models/user"),
    Event: sequelize.import("./models/event"),
    OAuthUser: sequelize.import("./models/oauth-user"),
    Application: sequelize.import("./models/application"),
    OAuthClient: sequelize.import("./models/oauth-client"),
    OAuthRefreshToken: sequelize.import("./models/oauth-refresh-token")
  };

  Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

module.exports = database;
