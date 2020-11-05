const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var configurationKey = new schema({
    radiusEndUser: {
        type: Number
    },
    isNotification: {
        type: Boolean,
        default: true
    },
    email:{
        type: String
    },
    brandName:{
        type: String
    },
    retailerSignupAmount: {
        type: Number
    },
    gstOnSignup: {
        type: Number
    },
    signupCredits: {
        type: Number
    },
    radiusRetailer: {
        type: Number
    },
    earnedCredits: {
        type: Number
    },
    unitCreditCost: {
        type: Number
    },
    minRechargeAmount: {
        type: Number
    },
    gstOnRecharge: {
        type: Number
    },
    lowCreditAlert: {
        type: Number
    },
    configType: {
        type: String,
        enum: ["USER", "RETAILER", "GENERAL"]
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
configurationKey.plugin(mongoosePaginate);
module.exports = mongoose.model("configuration", configurationKey)