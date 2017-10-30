const apiRouter = require('./api/index.router');
const dbCtrl = require('../controllers/db.controller');
const express = require('express');
const indexCtrl = require('../controllers/index.controller');
const authorization = require('../services/authorization');

const router = express.Router();

const authMiddleware = authorization.getMiddleware();
const dbMiddleware = dbCtrl.connectToDb();

router.use('/api', dbMiddleware, authMiddleware, apiRouter);

router.use(indexCtrl.handlePageNotFound);
router.use(indexCtrl.handleError);

module.exports = router;
