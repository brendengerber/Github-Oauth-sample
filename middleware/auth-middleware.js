
const ensureAuthenticated = function(req, res, next){
    //req.isAuthenticated() will return true if user is logged in
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect('/login');
    }

};

module.exports = {
    ensureAuthenticated
};