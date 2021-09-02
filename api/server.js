//Imports
const express = require('express');
const cors = require('cors')
const { logger } = require('./middleware/middleware')
const usersRouter = require('./users/users-router')


//Instance Of Express App; Instantiate
const server = express();


//Middleware Called
server.use(express.json())
server.use(cors())
server.use(logger)


//Consuming
server.use('/api/users', usersRouter)


//Endpoints
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//Exports; Exposing
module.exports = server;
