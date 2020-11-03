const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var addToCart = new schema(
     {
          addToCart: [{
              productId:{
                  type: schema.Types.ObjectId,
                  ref:"product"
              },
              size:{
                   type:String
              }
          }],
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
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

addToCart.plugin(mongoosePaginate);
module.exports = mongoose.model("addToCart", addToCart);