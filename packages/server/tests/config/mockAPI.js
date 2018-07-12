const express = require("express");
const bodyParser = require("body-parser");

const auth = require("../../auth");
const api = require("../../api");
const controllers = require("../../controllers");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", auth(), api(controllers));

module.exports = app;
