const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var subscription = new schema(
    {
        subscriptionName: {
            type: String
        },
        type: {
            type: String,
            enum: ["INDIVIDUAL", "COMPANY"]
        },
        validityPeriod: {
            type: String,
            enum: ["For 1 Month", "For 3 Months", "For 6 Months", "For 1 Year"]
        },
        currency: {
            type: String
        },
        cost: {
            type: Number
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);
subscription.plugin(mongoosePaginate);
module.exports = mongoose.model("subscription", subscription);