const express = require('express');
const session = require('express-session');

const userRouter = require('./users/router');

const server = express();

const sessionConfig = {
    name: 'monkey', // defaults to sid
    secret: 'I was hiding!', // store this as an env var
    cookie: {
        maxAge: 1000 * 30, // how long the cookie is valid
        secure: false, // needs to be true in production
        httpOnly: true
    },
    resave: false, // do we want to recreate a session even though it hasn't changed
    saveUninitialized: false // can only be set to true once the user agrees to cookies
};

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', userRouter);

module.exports = server;