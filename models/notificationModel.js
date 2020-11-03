const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var notificationSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    receiverId: {
        type: String
    },
   message:{
    type: String
   },
    title:{
        type: String
    },
    body:{
        type: String
    },
   
    notificationType: {
        type: String
    },
    notificationStatus: {
        type: String,
        enum: ["Approve", "Pending", "Reject","Complete"]
    }
},
    
    { timestamps: true }
)

notificationSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("notification", notificationSchema);