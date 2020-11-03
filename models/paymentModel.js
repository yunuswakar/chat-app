const mongoose = require('mongoose');
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var paymentModel= new schema({
  status:{
      type:String,
      enum: ["ACTIVE", "DELETE"],
      default:"ACTIVE"
  },
    productinfo:{
        type:String
    },
    customerId:{
        type:String,
        ref:'users'
    },
    txnid:{
        type:String,
        ref:"country"
    },
    amount:{
        type:String
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    lastname: {
        type: String,
    },
    firstname: {
        type: String,
    },
    customerName:{
        type:String
    },
    paymentStatus:{
        type:String,
        default:"PENDING"
    }
}, { timestamps: true });
paymentModel.plugin(mongoosePaginate)
module.exports = mongoose.model("paymentDetails", paymentModel); 