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
	SUCCESSFUL_RESET_NO_SEND: "The successful reset password email did not send correctly!",
	SUCCESSFUL_APPLICATION_NO_SEND: "The successful application email did not send correctly!"
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
 * Creates a sendgrid email request object.
 * TODO: Add HTML email templates.
 * @param {String} toEmail The email to send to.
 * @param {String} subject The subject of the email.
 * @param {String} content The plain text in the email.
 * @return {Object} Sendgrid email request.
 */
function createEmailRequest({ toEmail, subject, content}) {
	const fromEmail = new helper.Email(QHACKS_NO_REPLY_EMAIL);
	toEmail = new helper.Email(toEmail);
	content = new helper.Content('text/plain', content);
	const mail = new helper.Mail(fromEmail, subject, toEmail, content);

	const request = sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON()
	});

	return request;
}

/**
 * Sends an email to the user when they apply!
 * @param {Object} user The user who has applied.
 * @return {Promise} SendGrid request promise.
 */
function sendSuccessfulApplicationEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const request = createEmailRequest({ toEmail: user.email, subject: 'QHacks Application Success!', content: 'Thank you for applying!' });

		sendgrid.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.SUCCESSFUL_APPLICATION_NO_SEND, err));
			resolve();
		});
	});
}

/**
 * Sends a password reset successful email.
 * @param {Object} user The user who has reset their password.
 * @return {Promise} SendGrid request promise.
 */
function sendPasswordResetSuccessfulEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const request = createEmailRequest({ toEmail: user.email, subject: 'QHacks Password Reset Successful', content: 'Your password has been updated!' });

		sendgrid.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.SUCCESSFUL_RESET_NO_SEND, err));
			resolve();
		});
	});
}

/**
 * Sends a password reset email to the user.
 * @param {Object} user The user who wishes to reset their password.
 * @return {Promise} SendGrid request promise.
 */
function sendResetPasswordEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const request = createEmailRequest({ toEmail: user.email, subject: 'QHacks Password Reset Email', content: `Someone has requested to reset your QHacks account password, click this link to do so: http://localhost:8080/update-password/${user.passwordResetHash}` });

		sendgrid.API(request, (err, result) => {
			if (err) reject(createError(ERRORS.SENDGRID_ERROR, ERROR_MESSAGES.RESET_PASSWORD_NO_SEND, err));
			resolve();
		});
	});
}

module.exports = {
	sendResetPasswordEmail,
	sendSuccessfulApplicationEmail,
	sendPasswordResetSuccessfulEmail
};
