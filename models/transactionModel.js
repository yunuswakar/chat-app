const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { time } = require('speakeasy');
var schema = mongoose.Schema;

const transactionKey = new schema({
    retailerId: { type: String },
    transactionId: {
        type: String,
    },
    orderAmount: {
        type: String
    },
    orderNote: {
        type: String
    },
    customerEmail: {
        type: String
    },
    time:{type:String},
    customerName: {
        type: String
    },
    customerPhone: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FLAGGED", "FAILED", "CANCELLED"],
        default: "PENDING"
    },
    isMailSent: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
}, { timestamps: true })

transactionKey.plugin(mongoosePaginate);
module.exports = mongoose.model('transaction', transactionKey)