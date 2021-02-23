const express = require('express');
const db = require('./model');
const bcrypt = require('bcryptjs');
const { validateUser, validateCredentials } = require('./middleware');

const router = express.Router();

router.get('/', validateCredentials, (req, res) => {
    db.getUsers()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res) => {
    db.getUser(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/register', validateUser, (req, res) => {
    const hash = bcrypt.hashSync(req.user.password, 12)

    req.user.password = hash;

    db.createUser(req.user)
        .then(saved => res.status(201).json(saved))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.getUserByName(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: "Successfully logged in!" });
            } else {
                res.status(401).json({ error: "Username or Password incorrect." });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;