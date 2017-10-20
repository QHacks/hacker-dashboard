const express = require('express');
const indexCtrl = require('../controllers/index.controller');

const router = express.Router();

router.use(indexCtrl.handlePageNotFound);
router.use(indexCtrl.handleError);

module.exports = router;
