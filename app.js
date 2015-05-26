var express = require("express"),
    app = express(),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    session = require('express-session'),
    http = require("http"),
    server = http.createServer(app),
    cors = require('cors'),
    mongoose = require('mongoose');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cors());
    app.use(app.router);
    app.use(session({secret: 'eagrupo1'}));
    app.use(passport.initialize());
    app.use(passport.session());
});

app.get('/', function (req, res) {
    res.send("Hello world!");
});

routes = require('./routes/users')(app, passport, FacebookStrategy);
routes = require('./routes/events')(app);
routes = require('./routes/messages')(app);
routes = require('./routes/comments')(app);


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