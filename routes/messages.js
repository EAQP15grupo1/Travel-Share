module.exports = function (app) {

    var Message = require('../models/message/schema.js');

    //GET messages
    getMessages = function (req, res) {
        Message.find(function (err, data) {
            if (!err) {
                res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //POST Message
    postMessage = function (req, res) {
        console.log('POST message');
        console.log(req.body);
        var evetoid;
        Message.find({"eventid": req.body.eventid}, function (err, mesage) {
            if (!err) {
                var contador = mesage.length;
                console.log(contador);
                if (contador >= 0) {
                    var message = new Message({
                        id: contador + 1,
                        content: req.body.content,
                        username: req.body.username,
                        userid: req.body.userid,
                        eventid: req.body.eventid,
                        fecha: req.body.fecha
                    });
                }
            } else {
                console.log('ERROR: ' + err);
            }

            message.save(function (err) {
                if (!err) {
                    console.log('Message added');
                }
                else {
                    console.log('ERROR: ', +err);
                }
            });

            res.send(message)
        });
    };


    //DELETE Message
    deleteMessage = function (req, res) {
        console.log('DELETE message');
        console.log(req.params._id);

        Message.findOne({"_id": req.params._id}, function (err, data) {
            data.remove(function (err) {
                if (!err)
                    console.log('Removed');
                else {
                    console.log('ERROR: ' + err);
                }
            })
        });

        res.send('Message removed');
    };

    //GET Message by ID
    getMessage = function (req, res) {
        Message.findOne({"_id": req.params._id}, function (err, data) {
            if (!err) {
                res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //UPDATE Message
    updateMessage = function (req, res) {
        console.log('UPDATE message');

        Message.findOneAndUpdate({"_id": req.params.idMessage}, req.body, function (err, message) {
            console.log(message._id);

            message.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });

        res.send('Message updated');
    };

    //GET Message by ID
    getMessagesByEventid = function (req, res) {
        Message.find({"eventid": req.params.eventid}, function (err, data) {
            if (!err) {
                res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //Endpoints connections
    app.get('/messages', getMessages);
    app.get('/message/:_id', getMessage);
    app.get('/messages/event/:eventid', getMessagesByEventid);
    app.post('/messages', postMessage);
    app.put('/message/:_id', updateMessage);

    //Endpoints backoffice
    app.get('/backoffice/messages', getMessages);
    app.get('/backoffice/message/:_id', getMessage);
    app.post('/backoffice/messages', postMessage);
    app.put('/backoffice/message/:idMessage', updateMessage);
    app.delete('/backoffice/message/:_id', deleteMessage);
}