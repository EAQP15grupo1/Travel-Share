module.exports=function(app) {

    var User = require('../models/user/schema.js');

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

        var user = new User({
            nick: req.body.nick,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            nation: req.body.nation

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
        User.findOne({"_id": req.params._id}, function (err, user) {
            console.log(user._id);

            //permitimos al usuario modificar los siguientes campos

            user.nick = req.body.nick;
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.age = req.body.age;
            user.nation = req.body.nation;

            user.save(function (err) {
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

//endpoints
    app.get('/users', findAllUsers);
    app.get('/user/:_id', findUser);
    app.post('/users', addUser);
    app.put('/user/:_id', updateUser);
    app.delete('/user/:_id', deleteUser)
}