module.exports = function (app) {

    var User = require('../models/user/schema.js');
    var crypto = require('crypto');
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

//GET users

    findAllUsers = function (req, res) {
        User.find(function (err, users) {
            if (!err) {
                res.send(users);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//GET user by id
    findUser = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }

//POST User
    addUser = function (req, res) {
        console.log('POST user');
        console.log(req.body);
        var name = req.body.username;
        var pass = req.body.password
        var passEncriptada = encriptar(name, pass)


        User.findOne({username: name}, function (err, user) {

            if (!user) {

                var user = new User({
                    name: req.body.name,
                    username: name,
                    password: passEncriptada,
                    email: req.body.email,
                    age: req.body.age,
                    nation: req.body.nation,
                    needs: req.body.needs,
                    offers: req.body.offers,
                    description: req.body.description
                });
                user.save(function (err) {

                    if (!err) {
                        console.log('User added');
                    }
                    else {

                        console.log('ERROR', +err);
                    }
                })

                res.send(user._id);

            }
            else {
                res.send('Usuario existe!')
            }

        })
    }

//DELETE User

    deleteUser = function (req, res) {
        console.log('DELETE user');
        console.log(req.params._id);

        User.findOne({"_id": req.params._id}, function (err, user) {
            user.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('User removed');
    }

//UPDATE User

    updateUser = function (req, res) {
        console.log('UPDATE user');
        User.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, user) {
            console.log(user._id);

            user.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('User Modified');
    }

    function encriptar(user, pass) {

        // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
        var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
        return hmac
    }

    //Login

    loginUser = function (req, res) {
        console.log('LOGIN user');

        var name = req.body.username;
        var pass = req.body.password;
        var passEncriptada = encriptar(name, pass)

        User.findOne({"username": name}, function (err, user) {
            if (user) {
                if (user.password === passEncriptada)
                    res.send(user)
                else

                    res.send('contrase�a incorrecta')

            } else {
                res.send('No existe este usuario!')
            }


        });
    }

    //Get de user por id
    findByUsername = function (req, res) {
        User.findOne({"username": req.params.username}, function (err, user) {
            if (!err) {
                res.send(user);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }

    // Autenticación Facebook
    var social = require('../config/social.js')
    passport.use(new FacebookStrategy({
            clientID: social.facebook.clientID,
            clientSecret: social.facebook.clientSecret,
            callbackURL: social.facebook.callbackURL,
            enableProof: social.facebook.enableProof
        },
        function (accessToken, refreshToken, profile, done) {
            var nameF = profile.id + "@facebook";
            User.findOne({username: nameF}, function (err, user) {
                if (!user) {
                    var user = new User({
                        name: profile.name,
                        username: nameF
                    });
                    user.save(function (err) {
                        if (!err) {
                            console.log('User added');
                        }
                        else {
                            console.log('ERROR', +err);
                        }
                    })
                }
                return done(err, user);
            })
        }
    ));

//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id', findUser);
    app.post('/users', addUser);
    app.put('/user/:_id', updateUser);
    app.delete('/user/:_id', deleteUser);
    app.post('/login', loginUser);
    app.get('/user/username/:username', findByUsername);

    // Endpoints Facebook
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
}