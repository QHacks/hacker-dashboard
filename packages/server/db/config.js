const options = {
  operatorsAliases: false,
  logging: false,
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
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "postgres",
    ...options
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "postgres",
    ...options
  },
  test: {
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
    ...options
  }
};

module.exports = config;
