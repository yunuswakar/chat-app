const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var returnProduct= new schema(
     {
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          productId: {
               type: schema.Types.ObjectId,
               ref: "product"
          },
          returnType: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
               type: String,
               enum: ["CHANGED MY IDEA", "NOT GOOD QUALITY", "OTHER"]
          },
          returnDescription: {
               type: String
          },
          status: {
               type: String,
               enum: ["ACTIVE", "DELETE", "BLOCK"],
               default: "ACTIVE"
          }
     },
     {
          timestamps: true
     }
);

returnProduct.plugin(mongoosePaginate);
module.exports = mongoose.model("returnProduct", returnProduct);
// module.exports = category;
