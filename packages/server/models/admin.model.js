const User = require("./user.model");
const { USER } = require("../strings");
const { AdminSchema } = require("./schema");

module.exports = User.discriminator(USER.ROLES.ADMIN, AdminSchema);
