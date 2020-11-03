const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var queryModel = new schema(
     {
          userId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'userMedia'
          },
          query: {
               type: String
          },
          status: {
               type: String,
               enum: ["ACTIVE", "DELETE"],
               default: "ACTIVE"
          }
     },
     {
          timestamps: true
     }
);

queryModel.plugin(mongoosePaginate);
module.exports = mongoose.model("queryModel", queryModel);
