const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var productFeedback = new schema(
     {
          orderId: 
               {
               type: schema.Types.ObjectId,
                    ref: "productPayment"
               }
          ,
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          rating: {
               type: String
          },
          comment: {
               type: String
          },
         
          status: {
                    type: String,
                    enum: ["ACTIVE", "BLOCK", "DELETE"],
                    default: "ACTIVE"
               },
          },
          
     {
          timestamps: true
     }
);

productFeedback.plugin(mongoosePaginate);
module.exports = mongoose.model("productFeedback", productFeedback);