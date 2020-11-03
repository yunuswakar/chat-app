const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var item = new schema(
     {
          userId: {
               type: schema.Types.ObjectId,
               ref: "userMedia"
          },
          productId: {
               type: schema.Types.ObjectId,
               ref: "product"
          },
          reportType: {
               type: String,
               enum: ["FROUD", "NOT GOOD QUALITY", "OTHER"]
          },
          reportDescription: {
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

item.plugin(mongoosePaginate);
module.exports = mongoose.model("itemReport", item);
// module.exports = category;
