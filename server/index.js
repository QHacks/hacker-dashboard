const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/index.route');
const path = require('path');
const winston = require('winston');

const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(routes);

app.listen(port, () => winston.info(`Hacker dashboard running on port ${port}!`));
