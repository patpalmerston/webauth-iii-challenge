const express = require('express');



const server = express();


server.get('/', (req, res, next) => {
  res.send(`<h2>We are Live!<h2>`)
})

module.exports = server;