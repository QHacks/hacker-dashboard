const Router = require("express").Router;
const mailingListRoutes = require("./routes/mailing-list.routes");

const restApi = (db) => {
  const restApi = Router();

  // subscribe routes
  restApi.use("/", mailingListRoutes(db));

  return restApi;
};

module.exports = (db) => {
  function restApi() {
    const restApi = Router();

    // subscribe routes
    restApi.use("/", mailingListRoutes(db));

    return restApi;
  }

  return {
    restApi
  };
};
