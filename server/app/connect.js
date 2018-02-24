const connection = require('./connection');
const mysql = require('mysql')
const jwt = require('jsonwebtoken');

module.exports = function (router) {
    router.post('/connect', function (req, res) {
        let newConenction = mysql.createConnection({
            host : req.body.host,
            user : req.body.user,
            password : req.body.password,
            port: req.body.port === null ? 3306 : req.body.port
        });

        newConenction.connect(function (err) {
            if(err) {
                console.error('Error connecting to MySQL: ' + err.stack);
                res.json({ connected: false });
                return;
            }

            console.log('Connected to MySQL as id ' + newConenction.threadId + '...');

            const payload = {
                host: req.body.host
            };

            var token = jwt.sign(payload, router.get('superSecret'), {
                expiresIn: '1440m'
            });

            connection.setConnection(newConenction);

            res.status(200).json({ connected: true, token: token });
        });
    });

    router.post('/change-db', function (req, res) {
        let conn = connection.getConnection();

        if(req.body.databaseName === undefined) {
            res.status(400).json({ message: "Database name not specified!" });
            return;
        }

        conn.changeUser({
            database: req.body.databaseName
        }, function(err) {
            if (err) {
                res.status(400).json({ message: "Error when changing database." });
            } else {
                res.status(200).json({ message: "Successfully changed database." });
            }
        });
    });
};