const NodeEnvironment = require("jest-environment-node");
const MongodbMemoryServer = require("mongodb-memory-server");
const dotenv = require("dotenv");

dotenv.config("./testingEnvironment");

class ServerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.mongod = new MongodbMemoryServer.default({
      instance: {
        dbName: this.global.dbName
      }
    });
  }

  async setup() {
    this.global.MONGO_URI = await this.mongod.getConnectionString();
    await super.setup();
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = ServerEnvironment;
