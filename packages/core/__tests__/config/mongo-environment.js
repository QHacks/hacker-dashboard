const NodeEnvironment = require("jest-environment-node");
const MongodbMemoryServer = require("mongodb-memory-server");

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongodbMemoryServer.default({
      instance: {
        dbName: this.global.dbName
      },
      binary: {
        version: "3.4.4"
      }
    });
  }

  async setup() {
    await super.setup();

    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
  }

  async teardown() {
    await super.teardown();

    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
