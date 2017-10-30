const jwt = require('jsonwebtoken');

const tokenUtilities = {
    createAccessToken,
    createRefreshToken,
    verify
};

module.exports = tokenUtilities;

const { AUTH_SECRET } = process.env;

function createAccessToken(accountId) {
    const payload = {
        accountId
    };
    const options = {
        expiresIn: '5 minutes',
        issuer: 'QHacks authentication'
    };
    return jwt.sign(payload, AUTH_SECRET, options);
}

function createRefreshToken(accountId) {
    const payload = {
        type: 'refresh',
        accountId
    };
    const options = {
        expiresIn: '60 minutes',
        issuer: 'QHacks authentication'
    };
    return jwt.sign(payload, AUTH_SECRET, options);
}

function verify(token) {
    return jwt.verify(token, AUTH_SECRET);
}
