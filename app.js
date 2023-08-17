//Imports
const path = require("path");
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const partials = require('express-partials');
const app = express();
const session = require('express-session');
const passport = require('./config/passport.js');

//Variables
const PORT = 3000;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

//Remove after development to minimize unnecessary realtime logs on server
app.use(morgan('tiny'));



//Express setup
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(helmet());
app.disable('x-powered-by');

//Allows images from github to load
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "img-src self https://avatars.githubusercontent.com");
  return next();
});

//Express session set up to be used on all routes
//***********Need to set up storrage */
//***********Add secure when https is set up and samesite? */
app.use(
  session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 *60 * 24 }
  })
);

//Initializes passport to be used on all routes
app.use(passport.initialize());
app.use(passport.session());


//Mounts the page router
const pageRouter = require('./routers/page-router.js');
app.use('/', pageRouter);

//Mounts the api router
const apiRouter = require('./routers/api-router.js');
app.use('/api', apiRouter);

//Handles all errors
app.use((err, req, res, next) => {
  if(!err.status){
    err.status = 500;
  }
  res.status(err.status).send(err.message);
});

//Starts server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

