const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = process.env;
const V1_EXCEPTION_REGEX = /^\/v1\/auth\//;

const ERRORS = {
	BAD_REQUEST: {
		code: 400,
		type: "VALIDATION"
	},
	UNAUTHORIZED: {
		code: 401,
		type: "AUTHORIZATION"
	}
};

const ERROR_MESSAGES = {
	MISSING_TOKEN: "Missing auth token!",
	INVALID_TOKEN: "Invalid token!"
};

/**
 * Creates a standard format error, see routes for usage.
 * @param {String} message The error message.
 * @param {Integer} status The error status code.
 * @param {Object} [data={}] Error object.
 * @return {Object} Error object.
 */
function createError(errorTpl, message, data = {}) {
	return Object.assign({}, errorTpl, { message, data });
}

/**
 * Retrieves bearer token from the request.
 * @param {Object} req Incoming request to check for token.
 * @return {String} The token in the request, otherwise false.
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
 * @return {Function} Next middlware if authenticated, otherwise invalid response.
 */
module.exports = () => (req, res, next) => {

	// don't authenticate routes /auth
	if (req.url.match(V1_EXCEPTION_REGEX)) return next();

	const token = getBearer(req);

	if (!token) return res.status(ERRORS.BAD_REQUEST.code).json(createError(ERRORS.BAD_REQUEST, ERROR_MESSAGES.MISSING_TOKEN));

	jwt.verify(token, AUTH_SECRET, (err, decoded) => {
		if (err) return res.status(ERRORS.UNAUTHORIZED.code).json(createError(ERRORS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN, err));
		req.user = decoded;
		next();
	});
};
