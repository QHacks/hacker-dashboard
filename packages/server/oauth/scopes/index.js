const scopes = require("./scopes");

const READ_SUFFIX = ":read";
const WRITE_SUFFIX = ":write";

function hasPermission(type, level, scopes) {
  switch (level) {
    case "read":
      // read is satisfied with either read or write scope for type
      return (
        scopes.includes(type.concat(READ_SUFFIX)) ||
        scopes.includes(type.concat(WRITE_SUFFIX))
      );
    case "write":
      // write must have the write scope for type
      return scopes.includes(type.concat(WRITE_SUFFIX));
  }
}

module.exports = {
  scopes,
  hasPermission
};
