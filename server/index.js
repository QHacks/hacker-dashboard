const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const routes = require('./routes/index.route');
const path = require('path');

const app = express();
const port = config.get('server.port');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(routes);

app.listen(port, () => console.log(`Hacker dashboard running on port ${port}`));
