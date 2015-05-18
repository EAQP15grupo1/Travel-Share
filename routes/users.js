module.exports=function(app) {

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

//GET user by id
    findUser = function (req, res) {
        User.findOne({"_id": req.params._id}, function (err, user) {
            if (!err) {
                var tokenUser = req.params.authToken;
                var decoded=checkToken(tokenUser);
                //var decoded = jwt.decode(tokenUser, app.get('jwtTokenSecret'));
                if (!decoded) {
                    res.send("authToken expired");
                } else if(decoded) {
                    res.send(user);
                }
                console.log("token:", tokenUser);
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
        var name=req.body.username;
        var pass = req.body.password
        var passEncriptada = encriptar(name, pass)


        User.findOne({username: name},function(err, user){

            if (!user){

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
            else{
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
        User.findOneAndUpdate({"_id": req.params._id},req.body, function (err, user) {
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

        loginUser = function (req, res){
            console.log('LOGIN user');

            var name=req.body.username;
            var pass=req.body.password;
            var passEncriptada = encriptar(name, pass)

            User.findOne({"username": name}, function (err, user) {
                if(user){
                    if(user.password === passEncriptada) {

                        var token = generateToken();
                        res.json({
                            token : token,
                            userId: user._id,
                            //username:user.username
                        });
                    }
                    else

                        res.send('contrase�a incorrecta')

                        }else{
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


//funcion que comprueba el token

    checkToken=function(token){
        var succes;
        var decode=jwt.decode(token,app.get('jwtTokenSecret'));
        if (decode.exp <= Date.now()){
            succes=false;
            console.log("AuthToken Expired");
        }else{
            succes=true;
            console.log("AuthToken Expired");
        }
        return succes;
    }

    generateToken=function(user){

        var token = jwt.encode({
            iss: user._id,
            exp: expires
        }, app.get('jwtTokenSecret'));

        return token;

    }


//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id/:authToken', findUser);
    app.post('/users', addUser);
    app.put('/user/:_id', updateUser);
    app.delete('/user/:_id', deleteUser);
    app.post('/login', loginUser);
    app.get('/user/username/:username', findByUsername)
}