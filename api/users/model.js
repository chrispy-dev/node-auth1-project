const db = require('../../data/db-config');

const getUsers = () => {
    return db('users');
};

const getUser = (id) => {
    return db('users')
        .where({ id })
};

const getUserByName = (username) => {
    return db('users')
        .where({ username })
        .first();
};

const createUser = (user) => {
    return db('users')
        .insert(user);
};

module.exports = {
    getUsers,
    getUser,
    getUserByName,
    createUser
};