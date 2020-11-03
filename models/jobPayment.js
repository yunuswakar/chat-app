const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const aggregatePaginate = require("mongoose-aggregate-paginate")

var jobPayment = new schema(
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
          posterName:{
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
          userId: {
               type: String
          },
          cardDetail: [
               {
                    Number: {
                         type: String
                    },
                    exp_month: {
                         type: Number
                    },
                    exp_year: {
                         type: Number
                    },
                    cvc: {
                         type: Number
                    },
               }
          ],
     },
     {
          timestamps: true
     }
);
jobPayment.plugin(aggregatePaginate)
jobPayment.plugin(mongoosePaginate);
module.exports = mongoose.model("jobPayment", jobPayment);
