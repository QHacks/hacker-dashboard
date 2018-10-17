process.env.AUTH_SECRET = "ABC123";

const bodyParser = require("body-parser");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const express = require("express");

const controllers = require("../../controllers");
const auth = require("../../auth");
const api = require("../../api");

const app = express();
const { AUTH_SECRET } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/", auth(), api(controllers));

module.exports = {
  request: request(app),
  createAccessToken: (userId) => {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
      expiresIn: "5 minutes",
      issuer: "QHacks Authentication"
    });
  },
  createRefreshToken: (userId) =>
    jwt.sign(
      {
        type: "refresh",
        userId
      },
      AUTH_SECRET,
      {
        expiresIn: "60 minutes",
        issuer: "QHacks Authentication"
      }
    )
};
