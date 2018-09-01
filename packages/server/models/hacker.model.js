const User = require("./user.model.js");
const { HackerSchema } = require("./schema");
const { USER } = require("../strings");

module.exports = User.discriminator(USER.ROLES.HACKER, HackerSchema);
