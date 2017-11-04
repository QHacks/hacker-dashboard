const dotenv = require('dotenv').config();
const controller = require('./controller');
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const winston = require('winston');
const path = require('path');

const auth = require('./auth/auth');
const db = require('./db/db');

const clientAPI = require('./api/client/clientAPI');

const BUNDLE_DIR = path.join(__dirname, '../client/bundle');

const app = express();
const port = process.env.PORT || 3000;

// Third Party Middleware
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

db((err, database) => {
	if (err) {
		console.log("Could not connect to the database!");
		return;
	}

	// API
	app.use('/api', clientAPI(controller(database)));

	// Static Files
	app.use(express.static(BUNDLE_DIR));

	// Start listening!
	app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
});
