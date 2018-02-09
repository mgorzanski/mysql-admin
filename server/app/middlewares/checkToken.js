const jwt = require('jsonwebtoken');

module.exports = function (router, app) {
    router.use(function (req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.status(403).json({ message: "Failed to authenticate token." });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({ message: "No token provided." });
        }
    });
};