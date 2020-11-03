const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var plan = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "users"
        },
        subscriptionId:{
            type: schema.Types.ObjectId,
            ref:"subscription"
        },
        plan:{
            type: String
        },
        expiryDate: {
            type: String
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

plan.plugin(mongoosePaginate);
module.exports = mongoose.model("plan", plan);