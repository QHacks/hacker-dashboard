const history = require('connect-history-api-fallback');
const dotenv = require('dotenv').config();
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const winston = require('winston');
const path = require('path');

const auth = require('./auth/auth');
const api = require('./api/api');
const db = require('./db/db')();
let ctr = require('./ctrs');
const webhook = require('./webhook');

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

	winston.info("Successfully connected to the database!");

	// Initialize controller(s)
	ctr = ctr(db);

	// Webhooks
	app.use(webhook());

	// Core API
	app.use('/api/', auth(), api(ctr));

	app.use(history());

	// Static Files
	app.use(express.static(BUNDLE_DIR));

	// Start listening!
	app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
});
