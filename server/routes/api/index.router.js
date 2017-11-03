const authRouter = require('./auth.router');
const router = require('express').Router();
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
