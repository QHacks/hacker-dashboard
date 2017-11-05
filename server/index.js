const dotenv = require('dotenv').config();
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const winston = require('winston');
const ctr = require('./ctrs');
const path = require('path');

const auth = require('./auth/auth');
const api = require('./api/api');
const db = require('./db/db')();

// Path to static files
const BUNDLE_DIR = path.join(__dirname, '../client/bundle');

const app = express();
const port = process.env.PORT || 3000;

// Third Party Middleware
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

db((err, db) => {
	if (err) {
		winston.info("Could not connect to the database!");
		return;
	}

	// Core API
	app.use('/api', api(ctr(db)));

	// Static Files
	app.use(express.static(BUNDLE_DIR));

	// Start listening!
	app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
});
