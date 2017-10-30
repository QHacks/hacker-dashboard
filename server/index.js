const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/index.router');
const path = require('path');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/bundle')));
app.use(routes);

app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
