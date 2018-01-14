const mailerConfig = require('./mailer.config');
const sendgrid = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

function _createMailerMiddleware(config) {
    return (req, res, next) => {
        function handleFinish() {
            res.removeListener('finish', handleFinish);
            if (res.statusCode === 200) {
                const email = config[req.originalUrl](req.body);

                sendgrid.send(email.message)
                    .then(() => email.success())
                    .catch((err) => email.createError(err))
                    .catch(next);
            }
        }

        if (config.hasOwnProperty(req.url)) res.on('finish', handleFinish);

        next();
    };
}

module.exports = () => _createMailerMiddleware(mailerConfig);
