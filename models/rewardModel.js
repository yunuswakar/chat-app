const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var rewardModel = new schema(
     {
          userId: {
               type:schema.Types.ObjectId,
               ref:"user"
          },
          reward: {
            type:String
            
       },
       rewardAmount:{type:Number},
       comment:{
            type:String,           
       },
       photo:{type:String},
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

rewardModel.plugin(mongoosePaginate);
module.exports = mongoose.model("rewardModel", rewardModel);