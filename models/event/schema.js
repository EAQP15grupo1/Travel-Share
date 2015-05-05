/**
 * Created by Alejandro on 21/4/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//cuidado porque las referencias parece que solo funcionan con ObjectId
var schema = new Schema({
        eventname: {type: String},
        tag: {type: String, enum: ['Deporte', 'Fiesta', 'Cultura', 'Compania', 'Trabajo', 'Musica']},
        idtag:{type: String},
        description: {type: String},
        color: {type: String},
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
        place: [{type: Number}],
        date: {type: String}
    },
    {versionKey: false});

module.exports = mongoose.model('Event', schema);