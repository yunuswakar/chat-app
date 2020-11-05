const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var schema = mongoose.Schema;
var recharges = new schema({
    retailerId: {
        type: String,
        ref: 'user'
    },
    transactionId: { type: String },
    rechargeCost: {
        type: Number
    },
    time:{type:String},
    rechargeAmount: { type: Number },
    paymentMode:{type:String},
    dateOfRecharge: { type: Date, default: Date.now() },
    credit:{type:Number},
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    rechargeStatus: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FLAGGED", "FAILED", "CANCELLED"],
        default: "PENDING"
    }
},
    {
        timestamps: true
    })
recharges.plugin(mongoosePaginate);
recharges.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("recharges", recharges)