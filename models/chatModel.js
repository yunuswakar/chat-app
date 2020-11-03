var mongoose = require('mongoose')
let message = mongoose.Schema({

     adminId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     chatUserType: {
          type: String
     },
     message: [
          {
               senderId: {
                    type: String
               },
               mediaType: {
                    type: String,
                    enum: ["text", "image", "pdf"],
                    default: "text"
               },
               messageStatus: {
                    type: String,
                    enum: ["Read", "Unread"],
                    default: "Unread"
               },
               message: {
                    type: String
               },
               createdAt: {
                    type: Date,
                    default: Date.now()
               }
          }
     ],
     status: {
          type: String,
          enum: ["ACTIVE", "BLOCK", "CLEAR"],
          default: "ACTIVE"
     },
     clearStatus: {
          type: String,
          enum: [false, true],
          default: false
     }

}, { timestamps: true })


module.exports = mongoose.model("message", message)