const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var order = new schema(
    {
        userId:{
        type:schema.Types.ObjectId,
        ref:"userMedia"
        },
        sellerId:{
            type:schema.Types.ObjectId,
            ref:"userMedia"
        },
        productId: {
            type:String
        },
        size:{
            type:String
        },
        quantity:{
            type:String
        },
        image:{
            type:String
        },
        productPrice:{
            type:String
        },
        status: {
            type: String,
            enum: ["ACTIVE","BLOCK","DELETE"],
            default: "ACTIVE"
        },
        
    },
    {
        timestamps: true
    }
);

order.plugin(mongoosePaginate);
module.exports = mongoose.model("order", order);
