const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var productBuying = new schema(
     {
          productId: {
               type: schema.Types.ObjectId,
               ref: "product"
          },
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          quantity:{
           type:Number
          },
          size: [
               Number
          ],
          productCost:{
               type:Number
          },
          totalCost:{
               type: Number
          },
          productName:{
               type: String
          },
          userName:{
               type: String
          },
       
     },
     {
          timestamps: true
     }
);

productBuying.plugin(mongoosePaginate);
module.exports = mongoose.model("productBuying", productBuying);
