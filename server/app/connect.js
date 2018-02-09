const connection = require('./connection');
const mysql = require('mysql')
//const jwt = require('jsonwebtoken');

module.exports = function (app) {
    app.post('/connect', function (req, res) {
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

            //var token = jwt.sign(, app.get('superSecret'))
            connection.setConnection(newConenction);

            res.status(200);
            res.json({ connected: true });
        });
    });
};