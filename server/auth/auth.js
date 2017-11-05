const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = process.env;

/**
 * Retrieves bearer token from the request.
 * @param {Object} req Incoming request to check for token.
 * @return {String} The token in the request, otherwise false.
 */
const getBearer = req => {
	if (!req.headers || !req.headers.authorization) return false;
	let split = req.headers.authorization.split(' ');
	if (split.length !== 2 || split[0] !== 'Bearer') return false;
	return split[1];
};

/**
 * Custom authentication middleware.
 * @param {Object} req Incoming request to run through middleware.
 * @param {Object} res Response sent back if needed.
 * @param {Function} next Next middleware function.
 * @return {Function} Next middlware if authenticated, otherwise invalid response.
 */
module.exports = (req, res, next) => {
	let token = getBearer(req);

	if (!token) return res.status(400).json({ type: 'VALIDATION', message: 'Missing auth token!'});

	jwt.verify(token, AUTH_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ type: 'AUTHORIZATION', message: 'Invalid token!'});
		req.user = decoded;
		next();
	});
};
