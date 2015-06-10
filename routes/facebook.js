/**
 * Created by Administrador on 03/06/2015.
 */
module.exports = function (app, passport) {
    var express = require("express"),
        passport = require('passport'),
        FacebookStrategy = require('passport-facebook').Strategy,
        social = require('../config/social'),
        User = require('../models/user/schema.js');

    passport.use(new FacebookStrategy({
            clientID: social.facebook.clientID,
            clientSecret: social.facebook.clientSecret,
            callbackURL: social.facebook.callbackURL,
            enableProof: social.facebook.enableProof
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                //console.log(profile);
                //console.log("nombre es este!!!!!!!!" + profile.displayName);

                // To keep the example simple, the user's Facebook profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Facebook account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ));

//var router = express.Router();


    app.get('/facebook', passport.authenticate('facebook'), function (req, res) {

        console.log("paquito" + res.user);
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
    app.get('/facebook/callback',
        passport.authenticate('facebook', {session: false, failureRedirect: '/login'}),
        function (req, res) {
            //console.log("hola"+ req.user.displayName);
            var UnameF = (req.user.id + "@facebook");
            var nameF = (req.user.displayName);
            User.findOne({username: UnameF}, function (err, user) {
                if (!user) {
                    var user = new User({
                        name: nameF,
                        username: UnameF

                    });
                    user.save(function (err) {

                        if (!err) {
                            console.log('User added');
                        }
                        else {

                            console.log('ERROR', +err);
                        }
                    })
                    var token = generateToken(user);
                    res.json({
                        token: token,
                        userId: user._id
                        //username:user.username
                    });

                }
                else {
                    User.findOne({username: UnameF}, function (err, user) {
                        res.json({
                            token: token,
                            userId: user._id
                            //username:user.username

                        });
                    })
                }

            })
            // res.redirect('/');
        }
    );
}