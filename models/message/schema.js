var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
        id: {type: Number},
        content: {type: String},
        username: {type: String},
        eventid: {type: String},
        fecha:{type: String}
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Message', schema);