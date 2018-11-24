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
    ApplicationFieldResponse: sequelize.import(
      "./models/application-field-response"
    ),
    Project: sequelize.import("./models/project"),
    OAuthUser: sequelize.import("./models/oauth-user"),
    Application: sequelize.import("./models/application"),
    OAuthClient: sequelize.import("./models/oauth-client"),
    ApplicationField: sequelize.import("./models/application-field"),
    ApplicationReview: sequelize.import("./models/application-review"),
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
