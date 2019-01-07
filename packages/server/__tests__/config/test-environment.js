process.env.DB_ENVIRONMENT = "test";

const NodeEnvironment = require("jest-environment-node");

const db = require("../../db");

class TestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    const database = await db();

    this.global.db = database;

    const { graphqlClient, request } = require("./test-api")(database);

    this.global.request = request;
    this.global.graphqlClient = graphqlClient;
  }

  async teardown() {
    await super.teardown();

    await this.global.db.sequelize.close();
  }
}

module.exports = TestEnvironment;
