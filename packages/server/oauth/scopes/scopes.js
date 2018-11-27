const SCOPES = ["hacker:read", "hacker:write"];

const DEFAULT_VOLUNTEER_SCOPES = ["hacker:read"];

const DEFAULT_HACKER_SCOPES = ["hacker:read"];

const DEFAULT_ADMIN_SCOPES = ["hacker:read"];

function getDefaultScopes(role) {
  switch (role) {
    case "HACKER":
      return DEFAULT_HACKER_SCOPES;
    case "VOLUNTEER":
      return DEFAULT_VOLUNTEER_SCOPES;
    case "ADMIN":
      return DEFAULT_ADMIN_SCOPES;
    case "SUPER-ADMIN":
      return SCOPES;
  }
}

module.exports = {
  SCOPES,
  DEFAULT_ADMIN_SCOPES,
  DEFAULT_HACKER_SCOPES,
  DEFAULT_VOLUNTEER_SCOPES,
  getDefaultScopes
};
