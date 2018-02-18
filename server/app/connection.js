let connection = undefined;

module.exports = {
    setConnection: function (newConnection) {
        connection = newConnection;
    },
    getConnection: function () {
        if(connection) {
            return connection;
        } else {
            return { query: function() { console.error ('No connection established yet') }};
        }
    },
    checkConnectionState: function (app) {
        app.post('/connection', function (req, res) {
            if (connection !== undefined) {
                return res.status(200).json({ connectionEstablished: true });
            }
            return res.status(403).json({ connectionEstablished: false });
        });
    }
};