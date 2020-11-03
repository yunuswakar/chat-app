const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var wishList = new schema(
     {
          wishList: [
               {
               type: String,
               ref: "sellOnAuction"
          }
     ],
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

wishList.plugin(mongoosePaginate);
module.exports = mongoose.model("wishList", wishList);