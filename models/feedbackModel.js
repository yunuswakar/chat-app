const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var feedback = new schema(
     {
          orderId: [
               {
                    type: String,
                    ref: "payment"
               }
          ],
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

feedback.plugin(mongoosePaginate);
module.exports = mongoose.model("feedback", feedback);