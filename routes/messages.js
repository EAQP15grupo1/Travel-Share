/**
 * Created by Alejandro on 21/4/15.
 */
module.exports=function(app) {

    var Message = require('../models/message/schema.js');

    //GET messages
    findAllMessagesByEvent = function (req, res) {
       /* Message.find({"event": req.params._idevent},function (err, messages) {
            if (!err) {
                res.send(messages);
            }
            else {
                console.log('ERROR: ' + err);
            }
        }); */

        res.send('lista mensajes del evento');
    };


//endpoints
    app.get('/messages/:_idevent', findAllMessagesByEvent);

}