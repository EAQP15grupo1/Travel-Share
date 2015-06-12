module.exports = function (app) {

    var User = require('../models/user/schema.js');
    var crypto = require('crypto');
    var jwt = require('jwt-simple');
    var moment = require('moment');
    app.set('jwtTokenSecret', 'TravelShareAutenticationServer');
    var expires = moment().add(7, 'days').valueOf();

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

//GET user by id con TOKEN
    findUserToken = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            if (!err) {
                var tokenUser = req.params.authToken;
                var decoded = checkToken(tokenUser);
                //var decoded = jwt.decode(tokenUser, app.get('jwtTokenSecret'));
                if (!decoded) {
                    res.send("authToken expired");
                } else if (decoded) {
                    res.send(user);
                }
                console.log("token:", tokenUser);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }

    // Igual que la anterior pero sin token
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
                    description: req.body.description,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    avatar: req.body.avatar
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

    updateUserChat = function (req, res) {
        console.log('Change user chat');
        User.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, user) {
            user.set(function (err) {
                if (!err) {
                    console.log('Chat Updated');
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
                if (user.password === passEncriptada) {

                    var token = generateToken(user);
                    res.json({
                        token: token,
                        userId: user._id
                        //username:user.username
                    });
                }
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

    //// Autenticación Facebook

    //
    //    function (accessToken, refreshToken, profile, done) {
    //        var nameF = profile.id + "@facebook";
    //        User.findOne({username: nameF}, function (err, user) {
    //            if (!user) {
    //                var user = new User({
    //                    name: profile.name,
    //                    username: nameF
    //                });
    //                user.save(function (err) {
    //                    if (!err) {
    //                        console.log('User added');
    //                    }
    //                    else {
    //                        console.log('ERROR', +err);
    //                    }
    //                })
    //            }
    //            return done(err, user);
    //        })
    //    }
    //));

//funcion que comprueba el token

    checkToken = function (token) {
        var succes;
        var decode = jwt.decode(token, app.get('jwtTokenSecret'));
        if (decode.exp <= Date.now()) {
            succes = false;
            console.log("AuthToken Expired");
        } else {
            succes = true;
            console.log("AuthToken Expired");
        }
        return succes;
    }


    generateToken = function (user) {

        var token = jwt.encode({
            iss: user._id,
            exp: expires
        }, app.get('jwtTokenSecret'));

        return token;

    }


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        d = d * 1000 //distancias en metros
        return d; //en metros
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


    findUsersOffersPlace = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            var necesidades = user.needs;
            var latitud = user.latitude;
            var longitud = user.longitude;
            if (!err) {
                User.find({"offers": necesidades}, function (err, users) {
                    if (!err) {
                        var usuarios = [];
                        for (var i = 0; i < users.length; i++) {
                            var distancia = getDistanceFromLatLonInKm(latitud, longitud, users[i].latitude, users[i].longitude);
                            if (distancia <= 300) {
                                var usuario = ({
                                    username: users[i].username,
                                    id: users[i]._id,
                                    distance: distancia
                                });
                                if (usuario.id != req.params._id) {
                                    usuarios.push(usuario);
                                    console.log(JSON.stringify(usuarios));
                                }
                            }
                        }
                        res.json(usuarios);
                    }
                });
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }


    // Importamos el modulo para subir ficheros
    var fs = require('fs');

    addImages = function (req, res) {
        //console.log(req.files)

        console.log(req.files.file);
        req.files.file.name = req.params._id + '.jpg';
        // var foto = req.files.avatar.name;

        var tmp_path = req.files.file.path;
        console.log(tmp_path);
        // Ruta donde colocaremos las imagenes
        var target_path = './www/avatar/' + req.files.file.name;
        console.log(target_path);
        // Comprobamos que el fichero es de tipo imagen
        if (req.files.file.type.indexOf('image') == -1) {
            res.send('El fichero que deseas subir no es una imagen');
        } else {
            // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
            fs.rename(tmp_path, target_path, function (err) {
                console.log(err);

                if (err) throw err;
                // Eliminamos el fichero temporal
                fs.unlink(tmp_path, function () {
                    if (err) throw err;

                    User.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, user) {

                        //console.log(user._id);
                        //console.log(foto);
                        if (!err) {
                            var nom = user._id;
                            user.avatar = nom;
                            //console.log(user.avatar + 'pjflsa');
                            user.save(function (err) {
                                if (!err) {
                                    console.log('Updated');
                                    res.send('Update')
                                }
                                else {
                                    console.log('ERROR' + err);
                                }

                            })
                        }
                    });

                });

            });

        }
    };


//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id/:authToken', findUserToken);
    app.get('/user/:_id', findUser);
    app.post('/users', addUser);
    app.put('/user/:_id', updateUser);
    app.put('/user/chat/:_id', updateUserChat);
    app.delete('/user/:_id', deleteUser);
    app.post('/login', loginUser);
    app.get('/user/username/:username', findByUsername);
    app.get('/users/find/:_id', findUsersOffersPlace);
    app.post('/user/avatar/:_id', addImages);
    // Endpoints Facebook
    //app.get('/auth/facebook', passport.authenticate('facebook'));
    //app.get('/auth/facebook/callback',
    //passport.authenticate('facebook', {failureRedirect: '/login'}),
    //function (req, res) {
    //    // Successful authentication, redirect home.
    //    res.redirect('/');
    //});
}