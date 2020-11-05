const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var transactionModel = new schema(
    {
        userName: {
            type: String,
        },
      
        amount: {
            type:String
           
        },
        paymentMethod:{
            type: String

        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        
    },
    {
        timestamps: true
    }
);

transactionModel.plugin(mongoosePaginate);
module.exports = mongoose.model("transactionModel", transactionModel);