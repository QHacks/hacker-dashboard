const history = require('connect-history-api-fallback');
const dotenv = require('dotenv').config();
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const winston = require('winston');
const path = require('path');
const errorReporting = require('@google-cloud/error-reporting')();
const helmet = require('helmet');

const IS_PROD = process.env.NODE_ENV === 'production';
const FORCE_SSL = process.env.FORCE_SSL === 'true';

(IS_PROD)
	? winston.info("Running production build!")
	: winston.info("Running development build!");

const auth = require('./auth/auth');
const api = require('./api/api');
let ctr = require('./ctrs');
const db = require('./db/db')();
const webhook = require('./webhook');
const { mailer } = require('./mailer');

// Path to static files
const BUNDLE_DIR = path.join(__dirname, '../client/bundle');

const app = express();
const port = process.env.PORT || 3000;

// Third Party Middleware
app.use(helmet());
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

	// Res.on('finish') hooks
	app.use(webhook());
	app.use(mailer());

	// Authentication
	app.use(auth());

	// HTTPS Redirect for production
	if (IS_PROD) {
		if (FORCE_SSL) {
			app.enable('trust proxy');
			app.use((req, res, next) => {
				if (req.secure) next();
				else res.redirect('https://' + req.headers.host + req.url);
			});
		}
	}

	// Core API
	app.use('/api/', api(ctr));

	// Fallback if page reload
	app.use(history());

	// Static Files
	app.use(express.static(BUNDLE_DIR));

	// Error handling
	app.use(errorReporting.express);

	// Start listening!
	app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
});
