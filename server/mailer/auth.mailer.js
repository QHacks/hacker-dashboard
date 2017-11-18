var helper = require('sendgrid').mail;

const ERRORS = {
	SENDGRID_ERROR: {
		code: 500,
		type: "SENDGRID_ERROR"
	}
};

const ERROR_MESSAGES = {
	RESET_PASSWORD_NO_SEND: "The reset password email did not send correctly!"
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

module.exports = (mailer) => {
	const authMailer = {};

	authMailer.sendResetPasswordEmail = (user) => new Promise((resolve, reject) => {

		var fromEmail = new helper.Email('test@example.com');
		var toEmail = new helper.Email('test@example.com');
		var subject = 'Sending with SendGrid is Fun';
		var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
		var mail = new helper.Mail(fromEmail, subject, toEmail, content);

		var request = mailer.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON()
		});

		mailer.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.RESET_PASSWORD_NO_SEND, err));
			resolve();
		});
	});

	return authMailer;
};
