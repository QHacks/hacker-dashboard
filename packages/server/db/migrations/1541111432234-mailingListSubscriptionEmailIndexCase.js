const DOTENV_PATH = require("path").join(__dirname, "../../.env");
require("dotenv").config({ path: DOTENV_PATH });
const { noop } = require("lodash");
const { MailingListSubscription } = require("../../models");
const mongoose = require("mongoose");
const connectToDB = require("..");

module.exports.up = async function(next = noop) {
  // Differentiate between tests and production
  if (!process.env.MIGRATION_TEST) {
    connectToDB();
  }

  // Use most recent email of emails with case-insensitive matches
  const oldSubscriptions = await MailingListSubscription.find({});
  const hash = {};

  oldSubscriptions.forEach((sub) => {
    hash[sub.email.toLowerCase()] = sub.toObject({});
  });

  await MailingListSubscription.remove({});
  const newSubscriptions = Object.keys(hash).map(
    (key) => new MailingListSubscription(hash[key])
  );
  await MailingListSubscription.insertMany(newSubscriptions);

  // Update index
  MailingListSubscription.collection.dropIndex({ email: 1, list: 1 });
  MailingListSubscription.collection.createIndex(
    { email: 1, list: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
  );

  if (!process.env.MIGRATION_TEST) {
    mongoose.disconnect(next);
  } else {
    next();
  }
};

module.exports.down = function(next = noop) {
  if (!process.env.MIGRATION_TEST) {
    connectToDB();
  }

  MailingListSubscription.collection.dropIndex({ email: 1, list: 1 });
  MailingListSubscription.collection.createIndex(
    { email: 1, list: 1 },
    { unique: true }
  );

  if (!process.env.MIGRATION_TEST) {
    mongoose.disconnect(next);
  } else {
    next();
  }
};
