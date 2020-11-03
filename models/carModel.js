const mongoose = require('mongoose')
const schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')
const carModel = new schema({
    countryId: {
        type: schema.Types.ObjectId,
        ref: "country"
    },
    destinationId: {
        type: schema.Types.ObjectId,
        ref: "contentDestination"
    },
    carType: {
        type: String
    },
    price: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
}, {
        timestamps: true
    })
carModel.plugin(mongoosePaginate)
module.exports = mongoose.model("carType", carModel)