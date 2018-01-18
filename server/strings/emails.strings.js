module.exports = {
    EMAIL_ADDRESSES: {
        QHACKS_HELLO: 'hello@qhacks.io',
        QHACKS_NO_REPLY: 'no-reply@qhacks.io'
    },
    TEMPLATES: {
        // TODO: finish tweaking emails
        APPLICATION_ACCEPTED: {
            NAME: 'application-accepted',
            SUBJECT: 'Congrats, you\'re coming to QHacks 2018!',
            TEXT: 'You\'ve been accepted to QHacks 2018! '
        },
        APPLICATION_DECLINED: {
            NAME: 'application-declined',
            SUBJECT: 'QHacks 2018 - Hacker Application Received!',
            TEXT: 'Thank you for applying to QHacks 2018! See https://qhacks.io for more details.'
        },
        APPLICATION_WAITLISTED: {
            NAME: 'application-waitlisted',
            SUBJECT: 'QHacks 2018 - Hacker Application Received!',
            TEXT: 'Thank you for applying to QHacks 2018! See https://qhacks.io for more details.'
        },

        APPLICATION_SUCCESSFUL: {
            NAME: 'application-successful',
            SUBJECT: 'QHacks 2018 - Hacker Application Received!',
            TEXT: 'Thank you for applying to QHacks 2018! See https://qhacks.io for more details.'
        },
        RESET_PASSWORD: {
            NAME: 'reset-password',
            SUBJECT: 'QHacks Password Reset Email'
        },
        RESET_PASSWORD_SUCCESS: {
            NAME: 'reset-password-success',
            SUBJECT: 'QHacks Password Reset Successful',
            TEXT: 'Your password has been updated!'
        }
    }
};
