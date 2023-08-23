//Imports necessary modules
const validator = require('validator');

//These services validate and sanitize user input
const check = {
    //Validates and sanitizes a username
    username: function(username){
        if (validator.isLength(username, {min: 7, max: 30} && validator.isEmail(username))){
            username = validator.escape(username);
            username = validator.normalizeUsername(username);
            return username;
        }else{
            //***********add new error here */
        }
        
        
    },

    //***************add logic like above */
    //Validates and sanitizes a password
    checkPassword: function(password){
        return validate.escape(password);
    }
};

module.exports = {
    check
};

