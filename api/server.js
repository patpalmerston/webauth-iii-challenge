const express = require('express');
const configureMiddleware = require('../data/config/middleware');


const authRouter = require('.././data/auth/auth-router');
const usersRouter = require('.././data/users/users-router');


const server = express();

configureMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


server.get('/', (req, res, next) => {
  res.send(`<h2>We are Live!<h2>`)
})

module.exports = server;