const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var schema = mongoose.Schema;
var martKey = new schema({
    martName: {
        type: String
    },
    parkingAvailability: {
        type: String,
        enum: ["Yes", "No"]
    },
    images: [{
        type: String
    }],
    pinCode: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    radius: {
        type: Number
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ["ACTIVE","INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    users:[],
},
    {
        timestamps: true
    })
martKey.index({ location: "2dsphere" });
martKey.plugin(mongoosePaginate);
martKey. plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("mart", martKey)