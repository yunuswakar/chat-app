const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var advPayment = new schema(
     {
          transactionId: {
               type: String
          },
          
          amount: {
               type: Number
          },
          customerId: {
               type: String
          },
          chargeId: {
               type: String
          },
          url: {
               type: String
          },
          currency: {
               type: String,
               default: "usd"
          },
          transactionStatus: {
               type: String,
          },
          returnTime: {
               type: Number,
          },
     
          amount_refunded: {
               type: String,
          },
          refundId: {
               type: String
          },
          userId:{
               type: String
          },
          advId:{
               type: String
          },
          cardDetails: [{
               firstName: String,
               lastName: String,
               email: String,
               phoneNumber: String,
               countryCode: String,
               mobile: String,
               bankName: String,
               cardNumber: String,
               expiryDate: String,
               cvvNumber: String,
               country: String,
               address: String,
               city: String,
               state: String,
               zipCode: String,
               expMonth: String,
               expYear: String,
               stripAccountId: String,
               cvvNumber: String
          }],
     },
     {
          timestamps: true
     }
);
advPayment.plugin(mongoosePaginate);
module.exports = mongoose.model("advPayment", advPayment);
