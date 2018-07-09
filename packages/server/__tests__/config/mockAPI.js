const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const auth = require("../../auth");
const api = require("../../api");
const controllers = require("../../controllers");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", auth(), api(controllers));

module.exports = {
  request: request(app),
  createAccessToken: (userId) => {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
      expiresIn: "5 minutes",
      issuer: "QHacks Authentication"
    });
  }
};
