const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var communityReport = new schema(
    {
        reportedBy: {
            type:schema.Types.ObjectId,
            ref:"user"
        },
      
        communityId: {
            type:schema.Types.ObjectId,
            ref:"communitySchema"
       },
      
        reportReason: {
            type:String
           
        },
       
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        
    },
    {
        timestamps: true
    }
);

communityReport.plugin(mongoosePaginate);
module.exports = mongoose.model("communityReport", communityReport);