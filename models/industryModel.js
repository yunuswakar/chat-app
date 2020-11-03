const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
var industry = new Schema(
     {
          industryType: {
               type: String
          },

          status: {
               type: String,
               enum: ["ACTIVE", "DELETE", "BLOCK"],
               default: "ACTIVE"
          }

     },
     { timestamps: true }
)

industry.plugin(mongoosePaginate);
module.exports = mongoose.model("industry", industry);
