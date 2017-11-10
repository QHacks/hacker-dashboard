const Router = require('express').Router;

const USER = 'user';

module.exports = ctr => {
	let userAPI = Router();

	const { user } = ctr;

	userAPI.get('/users', (req, res) => {
		user.getAllUsers().then(users => {
			res.status(200).json(users);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	userAPI.get(`/${USER}/:userId`, (req, res) => {
		user.getUser(req.params.userId).then(user => {
			res.status(200).json(user);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	userAPI.post(`/${USER}/:userId`, (req, res) => {
		user.updateUser(req.params.userId, req.body).then(updatedUser => {
			res.status(200).json(updatedUser);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	userAPI.delete(`/${USER}/:userId`, (req, res) => {
		user.deleteUser(req.params.userId).then(() => {
			res.sendStatus(200);
		}).catch(err => {
			res.status(err.code).json(err);
		});
	});

	return userAPI;
};
