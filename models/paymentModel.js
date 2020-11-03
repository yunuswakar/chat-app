const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var payment= new schema(
     {
          transactionId: {
               type: String
          },
          bidderId:{
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
           auctionId:{
               type: schema.Types.ObjectId,
                ref: "sellOnAuction"
          },
          auctionProductName:{
               type: String
          },
          bidderName: {
               type: String
          },
          amount: {
               type: Number
          },
          customerId: {
               type: String
          },
          sellerAccountId:{
               type: String
          },
          sellerAccountId:{
               type: String
          },
          transferId:{
               type: String
          },
          chargeId:{
               type: String
          },
          refundStatus: {
               type: Boolean,
               enum: [true, false],
               default: false
          },
          url: {
               type: String
          },
          deliveryDate: {
               type: Date
          },
          currency: {
               type: String,
               default: "usd"
          },
          transactionStatus:{
               type: String,
          },
          returnTime:{
          type:Number,
          },
          biddingId:{
               type: schema.Types.ObjectId,
               ref: "bidding"
          },
          userId:{
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          amount_refunded:{
               type: String,
          },
          refundId: {
               type: String
          },
          status: {
               type: String,
               enum: ["ACTIVE", "BLOCK", "DELETE"],
               default: "ACTIVE"
          },
          orderStatus: {
               type: String,
               enum: ["Delivered", "Cancel", "Return", "Pending"],
               default: "Pending"
          },
          orderId:{
               type: String,
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

payment.plugin(mongoosePaginate);
module.exports = mongoose.model("payment", payment);
