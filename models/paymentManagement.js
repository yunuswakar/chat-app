const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var paymentManagement = new schema(
    {
     
        paymentForVideo: {
            type:Number,
            default:0
        },
        paymentForAdvertisement: {
            type:Number,
            default:0
        },
        paymentForJob: {      
            type:Number,
            default:0
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

paymentManagement.plugin(mongoosePaginate);
module.exports = mongoose.model("paymentManagement", paymentManagement);
