/**
 * Created by Alejandro on 21/4/15.
 */
module.exports = function (app) {

    var Event = require('../models/event/schema.js');

//GET events
    findAllEvents = function (req, res) {
        Event.find(function (err, events) {
            if (!err) {
                res.send(events);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//GET event
    findEvent = function (req, res) {
        Event.findOne({"_id": req.params._id}, function (err, event) {
            if (!err) {
                res.send(event);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }

//POST event
    addEvent = function (req, res) {
        console.log('POST Event');
        console.log(req.body);

        var color = "";
        if (req.body.tag == "Deporte") {
            color = "#FFCC66";
        } else if (req.body.tag == "Fiesta") {
            color = "#FFCCFF";
        } else if (req.body.tag == "Cultura") {
            color = "#99CCFF";
        } else if (req.body.tag == "Compania") {
            color = "#99FF99";
        } else if (req.body.tag == "Trabajo") {
            color = "#E4E4E4";
        } else if (req.body.tag == "Musica") {
            color = "#FFFF99";
        }

        var event = new Event({
            eventname: req.body.eventname,
            tag: req.body.tag,
            idtag: req.body.idtag,
            description: req.body.description,
            color: color,
            owner: req.body.owner,
            attendees: req.body.attendees,
            place: req.body.place,
            date: req.body.date
        });

        event.save(function (err) {

            if (!err) {
                console.log('event added');
            }
            else {

                console.log('ERROR', +err);
            }
        })
        res.send(event);

    }

//DELETE event

    deleteEvent = function (req, res) {
        console.log('DELETE event');
        console.log(req.params._id);

        Event.findOne({"_id": req.params._id}, function (err, event) {
            event.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR' + err);
                }
            })
        });

        res.send('Event removed');
    }


    //Get por tag
    findByTag = function (req, res) {
        Event.find({"tag": req.params.tag}, function (err, events) {
            if (!err) {
                res.send(events);
            } else {

                console.log('ERROR:' + err);
            }
        });
    };


    //Get por evetes donde estoy registrado

    findByAtenders = function (req, res) {
        Event.find({"attendees": req.params._id}, function (err, events) {
            if (!err) {
                res.send(events);
            } else {

                console.log('ERROR:' + err);
            }
        });
    };

    //UPDATE
    updateEvent = function (req, res) {
        console.log('UPDATE event');
        Event.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, event) {
            console.log(event._id);

            event.save(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('Event Modified');
    }

    //UPDATE
    joinEvent = function (req, res) {
        console.log('JOIN event');

        Event.findOneAndUpdate({"_id": req.params._id}, {$addToSet: {attendees: req.body.attendees}}, req.body, function (err, event) {
            console.log(event._id);

            event.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.status(200).send('You have been added to the event');
    }

    //UPDATE Salir del evento
    leaveEvent = function (req, res) {
        Event.findOneAndUpdate({"_id": req.params._id}, {$pull: {attendees: req.body.attendees}}, req.body, function (err, event) {
            console.log(event._id);

            event.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('You have been leave to the event');
    }


    //POST advance
    addAdvance = function (req, res) {
        console.log('POST Advance');

        var tag1 = req.body.tags[0].tag;
        if (req.body.tags[1] == null) {
            console.log("es null");
        } else {
            var tag2 = req.body.tags[1].tag;
        }
        if (req.body.tags[2] == null) {
            console.log("es null");
        } else {
            var tag3 = req.body.tags[2].tag;
        }
        Event.find({$or: [{"tag": tag1}, {"tag": tag2}, {"tag": tag3}]}, function (err, events) {
            if (!err) {
                res.send(events);
            } else {

                console.log('ERROR:' + err);
            }
        });
    }

    //GET events
    findAllEvents = function (req, res) {
        Event.find(function (err, events) {
            if (!err) {
                res.send(events);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };


//endpoints
    app.post("/events/advanced", addAdvance);
    app.get('/events', findAllEvents);
    app.get('/event/:_id', findEvent);
    app.post('/event', addEvent);
    app.delete('/event/:_id', deleteEvent);
    app.get('/events/:tag', findByTag);
    app.put('/event/:_id', updateEvent);
    app.put('/event/join/:_id', joinEvent);
    app.get('/events/calendario/:_id', findByAtenders);
    app.put('/event/leave/:_id', leaveEvent);


}