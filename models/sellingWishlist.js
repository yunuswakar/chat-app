const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var sellingWishList = new schema(
     {
          wishList: [{
               type: String,
               ref: "product"
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

sellingWishList.plugin(mongoosePaginate);
module.exports = mongoose.model("sellingWishList", sellingWishList);