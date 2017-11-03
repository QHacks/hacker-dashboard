const jwt = require('express-jwt');

const authorization = {
    getMiddleware
};

module.exports = authorization;

const AUTH_API_REGEXP = /^\/api\/auth\//;
const { AUTH_SECRET } = process.env;

function getMiddleware() {
    const options = { secret: AUTH_SECRET };
    const paths = { path: [AUTH_API_REGEXP] };
    return jwt(options).unless(paths);
}
