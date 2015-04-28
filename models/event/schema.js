/**
 * Created by Alejandro on 21/4/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var schema = new Schema({
        eventname: {type: String},
        tag:{type:String, enum:['Deporte','Fiesta','Cultura','Compañia','Trabajo']},
        tag2:{type:String},
        owner:{type:mongoose.Schema.Types.Mixed, ref: 'User', denormalize: ['nick', 'email']},
        participantes:[{type:mongoose.Schema.Types.Mixed, ref: 'User', denormalize: ['nick', 'email']}],
        place:[{type:Number}],
        date:{type:String}
    },
    {versionKey: false});


module.exports = mongoose.model('Event', schema);