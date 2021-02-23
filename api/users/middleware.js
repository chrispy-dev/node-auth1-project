const model = require('./model');
const bcrypt = require('bcryptjs');

const validateUser = (req, res, next) => {
    const { username, password } = req.body;

    if (username && password) {
        req.user = {
            username: username,
            password: password 
        };
        next();
    } else {
        res.status(400).json({ error: "Username and Password are required." });
    };
};

const validateCredentials = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "You shall not pass!" });
    };
};

module.exports = {
    validateUser,
    validateCredentials
};