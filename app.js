var express = require("express"),
    cors = require('cors'),
    app = express(),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require('express-session'),
    http = require("http"),
    server = http.createServer(app),
    path = require('path'),
    mongoose = require('mongoose');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    //app.use(cors());
    app.use(app.router);
    app.use(passport.initialize());
});

app.get('/', function (req, res) {
    res.send("Hello world!");
});


routes = require('./routes/users')(app);
routes = require('./routes/events')(app);
routes = require('./routes/messages')(app);
routes = require('./routes/comments')(app);
routes = require('./routes/facebook')(app, passport);


mongoose.connect('mongodb://localhost/TravelShare', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

server.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});