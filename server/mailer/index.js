const sendgrid = require('@sendgrid/mail');

const { SENDGRID_API_KEY, EMAIL_URL_HOST } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const QHACKS_NO_REPLY_EMAIL = 'no-reply@qhacks.io';

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
 * Creates a standard format error.
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
 * @param {String} toEmail The email to send to.
 * @param {String} subject The subject of the email.
 * @param {String} textContent The plain text in the email.
 * @param {String} htmlContent The HTML formatted email.
 * @return {Object} Sendgrid email request.
 */
function createEmailMsg({ toEmail, subject, textContent, htmlContent}) {
	return {
		to: toEmail,
		from: QHACKS_NO_REPLY_EMAIL,
		subject: subject,
		text: textContent,
		html: htmlContent
	};
}

/**
 * Sends an email to the user when they apply!
 * @param {Object} user The user who has applied.
 * @return {Promise} SendGrid request promise.
 */
function sendSuccessfulApplicationEmail(user) {
	return new Promise((resolve, reject) => {
		if (!SENDGRID_API_KEY) resolve();

		const request = createEmailMsg({
			toEmail: user.email,
			subject: 'QHacks Application Success!',
			textContent: 'Thank you for applying!',
			htmlContent: '<p>Thank you for applying!</p>'
		});

		sendgrid.send(request, (err, result) => {
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

		const request = createEmailMsg({
			toEmail: user.email,
			subject: 'QHacks Password Reset Successful',
			textContent: 'Your password has been updated!',
			htmlContent: '<p>Your password has been updated!</p>'
		});

		sendgrid.send(request, (err, result) => {
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

		const request = createEmailMsg({
			toEmail: user.email,
			subject: 'QHacks Password Reset Email',
			textContent: `Someone has requested to reset your QHacks account password, click this link to do so: https://${EMAIL_URL_HOST}/update-password/${user.passwordResetHash}`,
			htmlContent: `<p>Someone has requested to reset your QHacks account password, click this link to do so: http://localhost:8080/update-password/${user.passwordResetHash}</p>`
		});

		sendgrid.send(request, (err, result) => {
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
