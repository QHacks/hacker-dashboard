const _ = require("lodash");
const winston = require("winston");
const { Settings } = require("../models");

module.exports = {
  initSettings
};

const DEFAULT_SETTINGS = {
  numberOfReviewsRequired: process.env.REVIEWS_PER_APPLICATION || 1 // TODO: determine if an ENV VAR is the way to go
};

async function initSettings() {
  const settings = await Settings.findOne({});
  if (_.isEmpty(settings)) {
    winston.info(
      "No settings found. Initializing application with default settings."
    );
    await Settings.create(DEFAULT_SETTINGS);
  }
}
