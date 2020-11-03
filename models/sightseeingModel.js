const mongoose = require('mongoose')
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const sightseeing = new schema({
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    image: {
        type: String
    },
    countryId: {
        type: String,
        ref: "country"
    },
    country: {
        type: String
    },
    destinationId: {
        type: String,
        ref: "contentDestination"
    },
    destination: {
        type: String
    },
    videoLink: {
        type: String
    },
    sightName: {
        type: String
    },
    adultCost: {
        type: String
    },
    childCost: {
        type: String
    },
    inclusion: [{
        meal: {
            type: String
        },
        transfer: {
            type: String
        }
    }],
    description: {
        type: String
    },
    isSelected:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })
sightseeing.plugin(mongoosePaginate)
module.exports = mongoose.model("sightseeing", sightseeing)