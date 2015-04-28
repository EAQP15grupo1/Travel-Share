/**
 * Created by Alejandro on 21/4/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var schema = new Schema({
        nick: {type: String},
        username: {type: String},
        password: {type: String},
        email: {type: String},
        age: {type: Number},
<<<<<<< HEAD
        nation:{type:String}
=======
        nation:{type:String},
        elements:{
                    offers:[{type:String}],
                    needs:[{type:String}]
        }
>>>>>>> 042ec5f75bcc977e82d603217cdcb7002c307938
    },
    {versionKey: false});


module.exports = mongoose.model('User', schema);