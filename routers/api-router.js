//Imports necessary modules
const express = require('express');

//Creates the router
const apiRouter = express.Router();

//Mounts the authentication router
const authRouter = require('./auth-router.js');
apiRouter.use('/auth', authRouter);

//Exports the router
module.exports = apiRouter;