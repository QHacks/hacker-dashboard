const _ = require('lodash');

const userCtrl = {
    geUserInfo,
    updateUserInfo
};

module.exports = userCtrl;

const UPDATABLE_FIELDS = [
    'dateOfBirth',
    'firstName',
    'graduationYear',
    'lastName',
    'phoneNumber',
    'password'
];

function geUserInfo(req, res, next) {
    const { accountId } = req.user;
    return req.db.models.Account.findOne({ _id: accountId })
        .then((data) => res.status(200).send(data))
        .catch(next);
}

function updateUserInfo(req, res, next) {
    const { accountId } = req.user;
    const query = { _id: accountId };
    const update = _.pick(req.body, UPDATABLE_FIELDS);
    // TODO: verify updatable fields
    return req.db.models.Account.findOneAndUpdate(query, update)
        .then((data) => res.status(202).send(data))
        .catch(next);
}
