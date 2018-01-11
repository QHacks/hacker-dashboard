const fs = require('fs');
const path = require('path');
const { MAILER: MAILER_STRINGS } = require('../strings');

module.exports = {
	'/api/v1/auth/signup': (body) => generateSuccessfulApplicationEmail(body.email)
};

/* Email template names */
const APPLICATION_SUCCESSFUL = 'application-successful';

const EMAIL_TEMPLATES_DIRECTORY = '../../email/dist/';
const EMAIL_TEMPLATES = {
	[APPLICATION_SUCCESSFUL]: fs.readFileSync(path.resolve(__dirname, EMAIL_TEMPLATES_DIRECTORY, `${APPLICATION_SUCCESSFUL}.html`)).toString()
};
const ERRORS = {
	SENDGRID_ERROR: {
		code: 500,
		type: "SENDGRID_ERROR"
	}
};
const QHACKS_NO_REPLY_EMAIL = 'no-reply@qhacks.io';

function createError(errorTemplate, message, data = {}) {
	return Object.assign({}, errorTemplate, { message, data });
}

/**
 * Generates an email to send to the user after they've apply!
 * @param {String} email The email of the user who has applied.
 * @return {Promise} SendGrid request promise.
 */
function generateSuccessfulApplicationEmail(email) {
	return {
		message: createEmailMsg({
			toEmail: email,
			subject: 'QHacks 2018 - HackerApplication Received!',
			textContent: 'Thank you for applying to QHacks 2018! See https://qhacks.io for more details.',
			htmlContent: EMAIL_TEMPLATES[APPLICATION_SUCCESSFUL]
		}),
		createError: (err) => createError(ERRORS.SENDGRID_ERROR, MAILER_STRINGS.ERROR.SUCCESSFUL_APPLICATION, err),
		success: () => winston.info(MAILER_STRINGS.SUCCESS.SUCCESSFUL_APPLICATION)
	};
}

/**
 * Creates a sendgrid email request object.
 * @param {String} toEmail The email to send to.
 * @param {String} subject The subject of the email.
 * @param {String} textContent The plain text in the email.
 * @param {String} htmlContent The HTML formatted email.
 * @return {Object} Sendgrid email request.
 */
function createEmailMsg({ toEmail, subject, textContent, htmlContent }) {
	return {
		to: toEmail,
		from: QHACKS_NO_REPLY_EMAIL,
		subject: subject,
		text: textContent,
		html: htmlContent
	};
}
