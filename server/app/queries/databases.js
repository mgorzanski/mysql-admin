const connection = require('./../connection');

module.exports = function (router) {
    router.get('/databases', function (req, res) {
        let conn = connection.getConnection();

        conn.query('SHOW DATABASES', function (err, results) {
            if (err) throw err;
            res.status(200).json({ results });
        });
    });

    router.post('/databases/:databaseName', function (req, res) {
        let conn = connection.getConnection();
        if(req.params.databaseName === undefined) {
            res.status(400).json({ message: "Database name not specified!" });
            return;
        }

        conn.query('CREATE DATABASE ??', [req.params.databaseName], function (err, results, fields) {
            if (err) {
                res.status(400).json({ message: "Error when creating new database." });
            }
            res.status(201).json({ results });
        });
    });

    router.delete('/databases/:databaseName', function (req, res) {
        if (req.params.databaseName === undefined) {
            res.status(400).json({ message: "Database name not specified!" });
            return;
        }

        let conn = connection.getConnection();

        conn.query("DROP DATABASE ??", [req.params.databaseName], function (err, results, fields) {
            if (err) {
                res.status(400).json({ message: "An error has occurred when deleting a database"});
                return;
            }

            res.status(200).json({ results });
        });
    });
};