const Router = require('express').Router();

module.exports = ctr => {
	let authAPI = Router();

	const { auth } = ctr;

	/**
	 * Creates a session, returns user object.
	 */
	authAPI.use('/session', (req, res) => {
		let { email, password } = req.body;
	});

	/**
	 * Creates a user and sends back refresh token, token and user object.
	 */
	authAPI.use('/signup', (req, res) => {
		auth.signup(_.pick(req.body)).then((user, tokens) => {
			res.code(200).json({ user, tokens });
		}).catch(err => {
			// send fail error here
		});
	});

	/**
	 * Takes a refresh token and returns a new pair of access tokens and user object.
	 */
	// sends back new tokens and user id
	authAPI.use('/refresh', (req, res) => {
		auth.refresh(req.refreshToken).then();
	});
};
