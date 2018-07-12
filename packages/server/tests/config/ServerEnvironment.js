const NodeEnvironment = require("jest-environment-node");
const MongodbMemoryServer = require("mongodb-memory-server");
const request = require("supertest");

const app = require("./mockAPI.js");
const MONGO_DB_NAME = "hackerDB";

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: MONGO_DB_NAME
  },
  binary: {
    version: "3.2.19"
  }
});

class ServerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.mongod = new MongodbMemoryServer.default({
      instance: {
        dbName: this.global.dbName
      },
      binary: {
        version: "3.2.19"
      }
    });
  }

  async setup() {
    this.global.request = request(app);
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
