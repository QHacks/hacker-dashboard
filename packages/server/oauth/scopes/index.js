const { isArray } = require("lodash");

const scopes = require("./scopes");

const WRITE_SUFFIX = ":write";
const READ_SUFFIX = ":read";

function isAuthorized(entity, permission, scopes) {
  switch (permission) {
    case "read":
      return (
        scopes.includes(entity.concat(READ_SUFFIX)) ||
        scopes.includes(entity.concat(WRITE_SUFFIX))
      );
    case "write":
      return scopes.includes(entity.concat(WRITE_SUFFIX));
  }
}

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
  isAuthorized,
  formatScopes
};
