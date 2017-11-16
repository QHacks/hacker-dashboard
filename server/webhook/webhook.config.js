const moment = require('moment');

const { NODE_ENV } = process.env;

const config = {
    '/api/v1/auth/signup': (body) => _toSlackMessage(body)
};

function _toSlackMessage(body) {
    console.log(Object.keys(body));
    const user = {};
    const fields = [
        {
            title: 'First Name',
            value: user.firstName,
            short: true
        },
        {
            title: 'Last Name',
            value: user.lastName,
            short: true
        },
        {
            title: 'Email',
            value: user.email,
            short: false
        },
        {
            title: 'Date Of Birth',
            value: user.dateOfBirth,
            short: false
        },
        {
            title: 'Graduation Year',
            value: user.graduationYear,
            short: false

        }
    ];
    return {
        attachments: [
            {
                fallback: 'Required plain-text summary of the attachment.',
                color: '#D8354A',
                pretext: `[${NODE_ENV}] New Application Received!`,
                author_name: 'QHacks 2018',
                author_link: 'https://qhacks.io',
                ts: moment().unix(),
                fields
            }
        ]
    };
}

module.exports = config;
