const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const config = require('./config');
const apiRoutes = express.Router();

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/connect')(app);
require('./app/middlewares/checkToken')(apiRoutes, app);
require('./app/queries/query')(apiRoutes);
require('./app/queries/databases')(apiRoutes);

const connection = require('./app/connection');
connection.checkConnectionState(apiRoutes);

app.use('/', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);