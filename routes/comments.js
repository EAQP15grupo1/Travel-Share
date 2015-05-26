module.exports=function(app) {
    var Comment = require('../models/comments/SchemaComments.js');

//GET
    findAllComments = function (req, res) {
        Comment.find(function (err, data) {
            if (!err) {
                res.send(data);
                console.log(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//GET film by id
    findComent = function (req, res) {
        Comment.findOne({"_id": req.params._id}, function (err, data) {
            if (!err) {
                res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    };

//DELETE
    deleteComment = function (req, res) {
        Comment.findOne({"_id": req.params._id}, function (err, data) {
            data.remove(function (err) {
                if (!err)
                    console.log('Object delete');
                else {
                    console.log('ERROR' + err);
                }
            })
        });
        res.status(200).send('Comment Delete');
    };

//UPDATE
    updateComment = function (req, res) {
        //console.log('UPDATE film');
        Comment.findOneAndUpdate({"_id": req.params._id}, req.body, function (err, data) {
            //console.log(user._id);
            data.set(function (err) {
                if (!err) {
                    console.log('Updated');
                }
                else {
                    console.log('ERROR' + err);
                }

            })
        });
        res.send('Comment Modified');
    };

//POST User
    newComment = function (req, res) {

                var data = new Comment({
                    name: req.body.name,
                    comments: req.body.comments,
                    event: req.body.event,
                    fecha:req.body.fecha
                });
                data.save(function (err) {

                    if (!err) {
                        console.log('New comment');
                    }
                    else {
                        console.log('ERROR', +err);
                    }
                })

                res.send(data);
    };

    findByComment = function (req, res) {
        User.findOne({"name": req.params.name}, function (err, data) {
            if (!err) {
             res.send(data);
            }
            else {
                console.log('ERROR: ' + err);
            }
        });
    }


//endpoints
    app.get('/comments', findAllComments);
    app.get('/comment/:_id', findComent);
    app.post('/comments', newComment);
    app.put('/comment/:_id', updateComment);
    app.delete('/comment/:_id', deleteComment);
    app.get('/comment/name/:name', findByComment)

}