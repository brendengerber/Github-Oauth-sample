//Imports necessary modules
const express = require('express');
const passport = require('../config/passport.js');
const { checkReqUsername, checkReqPassword } = require('../middleware/checking-middleware.js')

//Creates the router
const authRouter = express.Router();

//Github Authentication routes
authRouter.get('/github', passport.authenticate('github', {scope: ['user']}));

//Callback route which Github will call following the authentication attempt
//User will be redirected based on the success of the authentication attempt
authRouter.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
}));

//Exports the router
module.exports = authRouter;