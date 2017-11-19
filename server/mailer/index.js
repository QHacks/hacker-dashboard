const { SENDGRID_API_KEY } = process.env;
const sendgrid = require('sendgrid')(SENDGRID_API_KEY);
const helper = require('sendgrid').mail;

const QHACKS_NO_REPLY_EMAIL = `no-reply@qhacks.io`;

const ERRORS = {
	SENDGRID_ERROR: {
		code: 500,
		type: "SENDGRID_ERROR"
	}
};

const ERROR_MESSAGES = {
	RESET_PASSWORD_NO_SEND: "The reset password email did not send correctly!",
	SUCCESSFUL_RESET_NO_SEND: "The successful reset password email did not send correctly!"
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
 * [sendPasswordResetSuccessfulEmail description]
 */
function sendPasswordResetSuccessfulEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const fromEmail = new helper.Email(QHACKS_NO_REPLY_EMAIL);
		const toEmail = new helper.Email(`${user.email}`);
		const subject = 'QHacks Password Reset Successful';
		const content = new helper.Content('text/plain', `You password has been updated! Go here to login: `);
		const mail = new helper.Mail(fromEmail, subject, toEmail, content);

		const request = sendgrid.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON()
		});

		sendgrid.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.SUCCESSFUL_RESET_NO_SEND, err));
			resolve();
		});
	});
}

/**
 * Sends a password reset email to the user.
 * @param {Object} user The user who wishes to reset their password.
 */
function sendResetPasswordEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const fromEmail = new helper.Email(QHACKS_NO_REPLY_EMAIL);
		const toEmail = new helper.Email(`${user.email}`);
		const subject = 'QHacks Password Reset Email';
		const content = new helper.Content('text/plain', `Someone has request to reset your QHacks account password, click this link to do so: http://localhost:8080/update-password/${user.passwordResetHash}`);
		const mail = new helper.Mail(fromEmail, subject, toEmail, content);

		const request = sendgrid.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON()
		});

		sendgrid.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.RESET_PASSWORD_NO_SEND, err));
			resolve();
		});
	});
}

module.exports = {
	sendResetPasswordEmail,
	sendPasswordResetSuccessfulEmail
};
