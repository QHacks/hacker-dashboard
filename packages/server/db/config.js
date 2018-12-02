const options = {
  operatorsAliases: false,
  port: process.env.DB_PORT || 5432,
  define: {
    underscored: false,
    timestamps: true,
    freezeTableName: true
  }
};

const config = {
  development: {
    database: "qhacks-dev-database",
    host: "localhost",
    dialect: "postgres",
    ...options
  },
  staging: {
    username: process.env.STAGING_DB_USER,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_NAME,
    dialect: "postgres",
    logging: false,
    ...options
  },
  production: {
    username: process.env.PRODUCTION_DB_USER,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_NAME,
    dialect: "postgres",
    logging: false,
    ...options
  },
  test: {
    username: "postgres",
    database: "qhacks-test-database",
    host: "localhost",
    dialect: "postgres",
    reconnect: true,
    pool: {
      max: 10000,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
    ...options
  }
};

module.exports = config;
