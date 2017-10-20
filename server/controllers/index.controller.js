const _ = require('lodash');

const indexCtrl = {
    handleError,
    handlePageNotFound
};

module.exports = indexCtrl;

const DEFAULT_ERROR_STATUS_CODE = 500;

function handleError(err, req, res, next) {
    const status = _.get(err, 'status', DEFAULT_ERROR_STATUS_CODE);
    return res.status(status).send({ message: err.message })
}

function handlePageNotFound(req, res, next) {
    return res.redirect('/');
}
