const { isArray } = require("lodash");

const scopes = require("./scopes");
const READ_SUFFIX = ":read";
const WRITE_SUFFIX = ":write";

function hasPermission(type, level, scopes) {
  switch (level) {
    case "read":
      return (
        scopes.includes(type.concat(READ_SUFFIX)) ||
        scopes.includes(type.concat(WRITE_SUFFIX))
      );
    case "write":
      return scopes.includes(type.concat(WRITE_SUFFIX));
  }
}

// Converts scopes to { entity, permission } format
function formatScopes(scopes) {
  if (!isArray(scopes)) {
    scopes = JSON.parse(scopes);
  }

  return scopes.map((scope) => {
    const [entity, permission] = scope.split(":");
    return {
      entity,
      permission: permission.toUpperCase()
    };
  });
}

module.exports = {
  ...scopes,
  formatScopes,
  hasPermission
};
