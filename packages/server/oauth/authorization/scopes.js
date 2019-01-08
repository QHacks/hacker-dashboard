const { isArray } = require("lodash");

const { ROLES } = require("./roles");

const WRITE_SUFFIX = ":write";
const READ_SUFFIX = ":read";

const SCOPES = ["hacker:read", "hacker:write"];

const DEFAULT_VOLUNTEER_SCOPES = ["hacker:read"];

const DEFAULT_HACKER_SCOPES = ["hacker:read"];

const DEFAULT_ADMIN_SCOPES = ["hacker:read"];

function isAuthorizedFromScopes(entity, permission, scopes) {
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

function getDefaultScopesForRole(role) {
  switch (role) {
    case ROLES.HACKER:
      return DEFAULT_HACKER_SCOPES;
    case ROLES.VOLUNTEER:
      return DEFAULT_VOLUNTEER_SCOPES;
    case ROLES.ADMIN:
      return DEFAULT_ADMIN_SCOPES;
    case ROLES.SUPER_ADMIN:
      return SCOPES;
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
  SCOPES,
  DEFAULT_ADMIN_SCOPES,
  DEFAULT_HACKER_SCOPES,
  DEFAULT_VOLUNTEER_SCOPES,

  formatScopes,
  isAuthorizedFromScopes,
  getDefaultScopesForRole
};
