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
    }
};