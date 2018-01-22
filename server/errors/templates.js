const ERROR_TEMPLATES = {
    BAD_REQUEST: {
        code: 400,
        type: 'BAD_REQUEST'
    },
    UNAUTHORIZED: {
        code: 401,
        type: 'AUTHORIZATION'
    },
    NOT_FOUND: {
        code: 404,
        type: 'MISSING'
    },
    UNPROCESSABLE: {
        code: 422,
        type: 'VALIDATION'
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        type: 'INTERNAL_SERVER_ERROR'
    },
    SENDGRID_ERROR: {
        code: 500,
        type: 'SENDGRID_ERROR'
    },
    DB_ERROR: {
        code: 503,
        type: 'DB_ERROR'
    }
};

module.exports = ERROR_TEMPLATES;
