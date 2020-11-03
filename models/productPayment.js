const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const aggregatePaginate = require("mongoose-aggregate-paginate")

var productPayment = new schema(
     {
          transactionId: {
               type: String
          },
          status: {
               type: String,
               enum: ["ACTIVE", "BLOCK", "DELETE"],
               default: "ACTIVE"
          },
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },

          userName: {
               type: String
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
          deliveryDate: {
               type: Date
          },
        
          orderStatus: {
               type: String,
               enum: ["Delivered", "Cancel", "Return", "Pending","Completed"],
               default: "Pending"
          },
          orderId: {
               type: String,
          },
        
          transferId: {
               type: String,
          },
          productDescription: [{
               productImages: [
                    {
                         image: {
                              type: String,
                         }
                    }
               ],
               status: {
                    type: String,
                    enum: ["Delivered", "Cancel", "Return", "Pending"],
                    default: "Pending"
               },
               productId: {
                    type: schema.Types.ObjectId,
                    ref: "product"
               },
               productName: {
                    type: String
               },
               productQuantity: {
                    type:Number
               },
               totalCost: {
                    type: Number
               },
               sellerName: {
                    type: String
               },
               sellerAccountId: {
                    type: String
               },
               sellerId: {
                    type: String
               },
               refundStatus: {
                    type: Boolean,
                    enum: [true, false],
                    default: false
               },
          }]

     },
     {
          timestamps: true
     }
);
productPayment.plugin(mongoosePaginate);
productPayment.plugin(aggregatePaginate)
module.exports = mongoose.model("productPayment", productPayment);
