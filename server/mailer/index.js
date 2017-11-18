const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const authMailer = require('./auth.mailer.js');

module.exports = () => {
	const mailer = {};

	mailer.auth = authMailer(sendgrid);

	return mailer;
};
