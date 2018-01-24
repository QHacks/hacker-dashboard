const jwt = require('jsonwebtoken');
const { ERROR_TEMPLATES, createError } = require('../errors');
const { ERROR } = require('../strings');

const { AUTH_SECRET } = process.env;
const V1_EXCEPTION_REGEX = /^\/v1\/auth\//;

/**
 * Retrieves bearer token from the request.
 * @param {Object} req Incoming request to check for token.
 * @return {String|Boolean} The token in the request, otherwise false.
 */
function getBearer(req) {
    if (!req.headers || !req.headers.authorization) return false;
    const split = req.headers.authorization.split(' ');
    if (split.length !== 2 || split[0] !== 'Bearer') return false;
    return split[1];
}

/**
 * Custom authentication middleware.
 * @param {Object} req Incoming request to run through middleware.
 * @param {Object} res Response sent back if needed.
 * @param {Function} next Next middleware function.
 * @return {Function} Next middleware if authenticated, otherwise invalid response.
 */
module.exports = () => (req, res, next) => {

    if (req.url.match(V1_EXCEPTION_REGEX)) return next();

    const token = getBearer(req);

    if (!token) {
        const error = createError(ERROR_TEMPLATES.BAD_REQUEST, ERROR.MISSING_TOKEN);
        return res.status(error.code).json(error);
    }

    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
        if (err) {
            const error = createError(ERROR_TEMPLATES.UNAUTHORIZED, ERROR.INVALID_TOKEN, err);
            return res.status(error.code).json(error);
        }
        // TODO: Handle admin auth
        req.user = decoded;
        next();
    });
};
