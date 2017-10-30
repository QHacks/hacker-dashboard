const authCtrl = require('../../controllers/api/auth.controller');
const router = require('express').Router();

router.post('/signup', authCtrl.signUp);
router.post('/refresh', authCtrl.refresh);

module.exports = router;
