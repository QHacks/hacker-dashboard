/**
 * Email templates should be declared here.
 */

const fs = require('fs');
const Mustache = require('mustache');
const path = require('path');
const { EMAILS: EMAIL_STRINGS } = require('../strings');

const EMAIL_TEMPLATES_DIRECTORY = '../../email/dist/';

/**
 * This function loads an email template with default data to be used at a later time.
 * e.g. load template on server start and populate with dynamic data every time the email
 * is triggered.
 * @param {String} templateName
 * @param {String} text
 * @param {String} defaultSubject
 * @param {String} defaultFrom
 * @returns {Function}
 */
function prepareTemplate({ templateName, text: defaultText, subject: defaultSubject, from: defaultFrom, cc, bcc }) {
    const templatePath = toPath(templateName);
    const template = fs.readFileSync(templatePath).toString();

    /**
     * @param {String|Array<String>} to - Email address(es) to send email to
     * @param {Object} data
     * @param {String} from
     * @param {String} subject
     * @param {Function} onError - See
     *     https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md#handling-successfailureerrors
     * @param {Function} onSuccess - See
     *     https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md#handling-successfailureerrors
     * @returns {Object}
     */
    return ({ to, data = {}, text = defaultText, from = defaultFrom, subject = defaultSubject }) => ({
        to,
        cc,
        bcc,
        from,
        subject,
        text,
        html: Mustache.render(template, data)
    });
}

function toPath(templateName) {
    return path.resolve(__dirname, EMAIL_TEMPLATES_DIRECTORY, `${templateName}.html`);
}

const EMAIL_TEMPLATES = {
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO,
            bcc: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_FROM_WAITLIST.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_ACCEPTED_REMINDER_AFTER_WAITLIST_ACCEPTED.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_DECLINED.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO,
            bcc: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_SUCCESSFUL.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.NAME,
            text: EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.TEXT,
            subject: EMAIL_STRINGS.TEMPLATES.APPLICATION_WAITLISTED.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO,
            bcc: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_HELLO
        })
    },
    [EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD.NAME,
            subject: EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD.SUBJECT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_NO_REPLY
        })
    },
    [EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.NAME]: {
        createMessage: prepareTemplate({
            templateName: EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.NAME,
            subject: EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.SUBJECT,
            text: EMAIL_STRINGS.TEMPLATES.RESET_PASSWORD_SUCCESS.TEXT,
            from: EMAIL_STRINGS.EMAIL_ADDRESSES.QHACKS_NO_REPLY
        })
    }
};

module.exports = EMAIL_TEMPLATES;
