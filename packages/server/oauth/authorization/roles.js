const ROLES = {
  HACKER: "HACKER",
  VOLUNTEER: "VOLUNTEER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN"
};

function isAuthorizedFromRole(requiredRole, userRole) {
  if (userRole === ROLES.SUPER_ADMIN) {
    return true;
  }

  if (
    userRole === (ROLES.ADMIN || ROLES.SUPER_ADMIN) &&
    requiredRole === ROLES.VOLUNTEER
  ) {
    return true;
  }

  if (userRole === ROLES.VOLUNTEER && requiredRole === ROLES.HACKER) {
    return true;
  }

  if (userRole === requiredRole) {
    return true;
  }

  return false;
}

module.exports = {
  ROLES,

  isAuthorizedFromRole
};
