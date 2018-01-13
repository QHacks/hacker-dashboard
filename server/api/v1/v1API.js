const Router = require('express').Router;
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

module.exports = (controllers) => {
    const api = Router();

    // authentication routes
    api.use('/', authRoutes(controllers));

    // admin routes
    api.use('/', adminRoutes(controllers));

    // user routes
    api.use('/', userRoutes(controllers));

    return api;
};
