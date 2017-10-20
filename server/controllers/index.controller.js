const _ = require('lodash');

const indexCtrl = {
    example,
    handleError,
    handlePageNotFound
};

module.exports = indexCtrl;

const DEFAULT_ERROR_STATUS_CODE = 500;

function example(req, res, next) {
    return res.send('This is a server.');
}

function handleError(err, req, res, next) {
    const status = _.get(err, 'status', DEFAULT_ERROR_STATUS_CODE);
    return res.status(status).send({ message: err.message })
}

function handlePageNotFound(req, res, next) {
    return res.status(404).end()
}
