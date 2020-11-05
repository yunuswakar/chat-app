const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var preview = new schema({

    userId: {
        type: String,
        ref: "user"
    },
    couponId: {
        type: String,
        ref: "retailerCoupon"
    },
    viewTime: {
        type: Date
    },
    lastViewTime: {
        type: Date
    },
    couponCode: {
        type: String
    },
    retailerId: {
        type: String

    },
    gender: {
        type: String
    },
    dateOfAnniversary: { type: String },
    educationalLevel: { type: String },
    homeOwnership: { type: String },
    ageRange: { type: String },
    incomeRange: { type: String },
    occupation: { type: String },
    address: { type: String },
},
    {
        timestamps: true
    })

preview.plugin(mongoosePaginate);
module.exports = mongoose.model("preview", preview)