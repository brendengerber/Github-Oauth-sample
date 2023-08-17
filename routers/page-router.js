//Imports necessary modules
const express = require('express');
const {ensureAuthenticated} = require('../middleware/auth-middleware.js');

//Creates the router
const pageRouter = express.Router();

pageRouter.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

//This page is protected and requires github authentication
pageRouter.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
});
  
pageRouter.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});
  
pageRouter.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/');
});

//Exports the router
module.exports = pageRouter;