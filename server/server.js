const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const mysql = require('mysql');
//const assert = require('assert');

//const jwt = require('jsonwebtoken');
const config = require('./config');

const port = process.env.PORT || 8080;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/connect')(app);
require('./app/queries/query')(app);
require('./app/queries/databases')(app);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

// apiRoutes.use(function (req, res, next) {
// 	var token = req.body.token || req.query.token || req.headers['x-access-token'];

// 	if (token) {
// 		jwt.verify(token, app.get('superSecret'), function (err, decoded) {
// 			if (err) {
// 				return res.json({ success: false, message: 'Failed to authenticate token.' });
// 			} else {
// 				req.decoded = decoded;
// 				next();
// 			}
// 		});
// 	} else {
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided.'
// 		});
// 	}
// });

// app.post('/authenticate', function (req, res) {
// 	User.findOne({
// 		name: req.body.name
// 	}, function (err, user) {
// 		if (err) throw err;

// 		if (!user) {
// 			res.json({ success: false, message: 'Authentication failed. User not found.' });
// 		} else if (user) {
// 			if (user.password != req.body.password) {
// 				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
// 			} else {
// 				const payload = {
// 					name: user.name
// 				};

// 				var token = jwt.sign(payload, app.get('superSecret'), {
// 					expiresIn: '1440m'
// 				});

// 				res.json({
// 					success: true,
// 					message: 'Enjoy your token!',
// 					token: token
// 				});
// 			}
// 		}
// 	});
// });