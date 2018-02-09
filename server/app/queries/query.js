const connection = require('./../connection');

module.exports = function (app) {
    app.post('/query', function (req, res) {
        if (req.body.query === undefined) {
            res.status(500).json({ message: "No query specified" });
        }

        let conn = connection.getConnection();

        conn.query(req.body.query, function (err, results) {
            if (err) {
                res.status(500).json({ message: "There is an error in a query"});
                throw err;
            }

            res.status(200).json( results );
        });
    });
};