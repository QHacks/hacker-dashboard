const roles = require("./roles");
const scopes = require("./scopes");

module.exports = {
  ...roles,
  ...scopes
};
