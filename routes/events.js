/**
 * Created by Alejandro on 21/4/15.
 */
module.exports=function(app) {

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

        var event = new Event({
            eventname: req.body.eventname,
            tag:req.body.tag,
            owner:req.body.owner,
            place:req.body.place,
            date:req.body.date
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



//endpoints

    app.get('/events', findAllEvents);
    app.get('/event/:_id',findEvent);
    app.post('/event', addEvent);
    app.delete('/event/:_id', deleteEvent);
}