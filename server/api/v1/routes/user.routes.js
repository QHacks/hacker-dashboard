const Router = require('express').Router;
const _ = require('lodash');

const RSVP_FIELDS = [
    'emergencyContact',
    'favSnack',
    'resume',
    'tshirtSize'
];

const APPLICATIONS = 'applications';
const USER = 'users';

module.exports = (ctr) => {
    const userAPI = Router();

    const { user } = ctr;

    userAPI.get(`/${USER}`, (req, res) => {
        user.getAllUsers().then((users) => {
            res.status(200).json(users);
        }).catch((err) => {
            res.status(err.code).json(err);
        });
    });

    userAPI.get(`/${USER}/:userId`, (req, res) => {
        user.getUser(req.params.userId).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(err.code).json(err);
        });
    });

    userAPI.post(`/${USER}/:userId`, (req, res) => {
        user.updateUser(req.params.userId, req.body).then((updatedUser) => {
            res.status(200).json(updatedUser);
        }).catch((err) => {
            res.status(err.code).json(err);
        });
    });

    userAPI.delete(`/${USER}/:userId`, (req, res) => {
        user.deleteUser(req.params.userId).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            res.status(err.code).json(err);
        });
    });

    userAPI.put(`/${USER}/:userId/${APPLICATIONS}/:eventId`, async (req, res) => {
        const { eventId, userId } = req.params;
        const { status } = req.body;
        try {
            const updatedUser = await user.updateApplicationStatus(userId, eventId, status);
            return res.status(200).json({ user: updatedUser });
        } catch (e) {
            return res.status(e.code).json(e);
        }
    });

    userAPI.put(`/${USER}/:userId/${APPLICATIONS}/:eventId/rsvp`, async (req, res) => {
        const { eventId, userId } = req.params;
        const rsvp = _.pick(req.body.rsvp, RSVP_FIELDS);
        try {
            const updatedUser = await user.submitRSVP(userId, eventId, rsvp);
            return res.status(200).json({ user: updatedUser });
        } catch (e) {
            return res.status(e.code).json(e);
        }
    });

    return userAPI;
};
