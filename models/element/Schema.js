/**
 * Created by Alejandro on 27/4/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new Schema({
        needs: [{type: String}],
        offers: [{type: String}]
    },
    {versionKey: false});

module.exports = mongoose.model('Element', schema);
