//These functions validate and sanitize user input attatched to the req body
//Once user input is validated, sanatized, it will be attached outside of req.body to a custom property (unless authentication is required, in that case the authentication middleware will be in charge of attatching the data properly)
//This ensures that if accesing req.someProperty it is confirmed safe and valid and can be used/accessed without worry

//Imports necessary modules
const { check } = require('../services/checking-services.js');

//Validates and sanatizes the username on the Req body
//Does not move username info outside of req body as it has not yet been authenticated
//Passport module will authenticate with local strategy and attatch info in req.User after authentication
const checkReqUsername = function(req, res, next){
    try{
        req.body.username = check.username(req.body.username);
        next();
    }catch(err){
        next(err);
    }
};

//Validates and sanatizes the password on the Req body
//Does not move password info outside of req body as it has not yet been authenticated
//Passport module will authenticate with local strategy and attatch info in req.User after authentication

const checkReqPassword = function(req, res, next){
    try{
        req.body.password = check.password(req.body.username);
        next();
    }catch(err){
        next(err);
    }
};

module.exports = {
    checkReqUsername,
    checkReqPassword
};