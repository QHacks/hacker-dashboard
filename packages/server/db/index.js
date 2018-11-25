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
    Prize: sequelize.import("./models/prize"),
    Event: sequelize.import("./models/event"),
    MailingListSubscription: sequelize.import(
      "./models/mailing-list-subscription"
    ),
    ApplicationFieldResponse: sequelize.import(
      "./models/application-field-response"
    ),
    Sponsor: sequelize.import("./models/sponsor"),
    Project: sequelize.import("./models/project"),
    Speaker: sequelize.import("./models/speaker"),
    Activity: sequelize.import("./models/activity"),
    Location: sequelize.import("./models/location"),
    OAuthUser: sequelize.import("./models/oauth-user"),
    MailingList: sequelize.import("./models/mailing-list"),
    Application: sequelize.import("./models/application"),
    OAuthClient: sequelize.import("./models/oauth-client"),
    ProjectUser: sequelize.import("./models/project-user"),
    ProjectPrize: sequelize.import("./models/project-prize"),
    EventSponsor: sequelize.import("./models/event-sponsor"),
    EventCheckIn: sequelize.import("./models/event-check-in"),
    ActivityCheckIn: sequelize.import("./models/activity-check-in"),
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
