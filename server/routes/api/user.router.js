const router = require('express').Router();
const userCtrl = require('../../controllers/api/user.controller');

router.get('/', userCtrl.geUserInfo);
router.put('/', userCtrl.updateUserInfo);

module.exports = router;
