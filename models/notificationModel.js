const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userMedia"
    },
    messege:{
        type:String
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref: "userMedia"
    },
    messageId:{
        type:Schema.Types.ObjectId,
    },
    messageType:{
        type:String
    },
    title:{
        type: String
    },
    body:{
        type: String
    },
    senderIdMessage:{
        type: String
    },
    notifications: {
        type: String
    },
    notificationType: {
        type: String
    },

    notificationStatus: {
        type: String,
        enum: ["ACCEPT", "PENDING", "REJECT"],
        default: "PENDING"
    },
    activityStatus: {
        type: String,
        enum: ["ACCEPT", "PENDING", "REJECT"],
        default: "PENDING"
    },


},
    
    { timestamps: true }
)

notificationSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("notification", notificationSchema);