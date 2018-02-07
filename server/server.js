const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const jwt = require('jsonwebtoken');
const config = require('./config');
//const User = require('./app/models/User');

const port = process.env.PORT || 8080;
//mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

const dbName = 'simple-notebook';
let db;
MongoClient.connect(config.database, function (err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
	db = client.db(dbName);
});

app.get('/', function (req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

app.get('/setup', function (req, res) {
	var user = new User({
		name: 'Mateusz Górzański',
		email: 'gorzanski.mateusz@gmail.com',
		password: 'zaq1',
	});

	user.save(function (err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

const apiRoutes = express.Router();

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

apiRoutes.post('/notes/new', function (req, res) {
	let Note = db.collection('Note');
	console.log(req.body.name);
	Note.insert({
		"NoteName" : req.body.name,
		"NoteBody" : req.body.body
	});
	res.send(JSON.stringify({message: "Success"}));
});

apiRoutes.get('/', function (req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});;

apiRoutes.get('/users', function (req, res) {
	User.find({}, function (err, users) {
		res.json(users);
	});
});

apiRoutes.post('/authenticate', function (req, res) {
	User.findOne({
		name: req.body.name
	}, function (err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				const payload = {
					name: user.name
				};

				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn: '1440m'
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

app.use('/api', apiRoutes);