const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var webNotification = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: "userMedia"
     },
     messege: {
          type: String
     },
     senderId: {
          type: Schema.Types.ObjectId,
          ref: "userMedia"
     },
     messageId: {
          type: Schema.Types.ObjectId,
     },
     messageType: {
          type: String
     },
     tittle: {
          type: String
     },
     body: {
          type: String
     },
     senderIdMessage: {
          type: String
     },
     activity: {
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

webNotification.plugin(mongoosePaginate)
module.exports = mongoose.model("webNotification", webNotification);