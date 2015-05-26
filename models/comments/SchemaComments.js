var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
        name: {type: String},
        comments: {type: String},
        event:{type:String, enum:['Evento1','Evento2','Evento3','Evento4','Evento5']},
        fecha:{type:String}
    },
    {versionKey: false});
module.exports = mongoose.model('comments', schema);