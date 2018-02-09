//const mysql = require('mysql');
const connection = require('./../connection');

module.exports = function (app) {
    app.get('/databases', function (req, res) {
        let conn = connection.getConnection();

        conn.query('SHOW DATABASES', function (err, results) {
            if (err) throw err;
            res.status(200).json({ results });
        });
    });

    app.post('/databases', function (req, res) {
        let conn = connection.getConnection();
        if(req.body.database === undefined) {
            res.status(500).json({ message: "Database name not specified!" });
            return;
        }

        conn.query('CREATE DATABASE ??', [req.body.database], function (err, results, fields) {
            if (err) {
                res.status(500).json({ message: "Error when creating new database." });
                throw err;
            }
            res.status(200).json({ results });
        });
    });
};