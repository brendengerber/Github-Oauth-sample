//Imports
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

//Configures passport to use the Github Strategy
//Callback URL must match what is set in github Oauth app settings
passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/github/callback"
        },
    //***Needs to finish with how to look up user or something, see session notes re LocalStorrage strategy */
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

//Serializes the whole Github user profile
//*********Once storing the user, change this to user.id */ 
passport.serializeUser(function(user, done) {
    done(null, user);
});

//************Needs logic on how to find the stored user
passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = passport;      













