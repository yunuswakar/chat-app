const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var providerModel = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    providerName: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    countryCode: {
        type: String
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
},
    {
        timestamps: true
    })

    providerModel.plugin(mongoosePaginate);
module.exports = mongoose.model("providerModel", providerModel)