var mongoose = require('mongoose')
let chattingModel = mongoose.Schema({

     senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     receiverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
    
     messages: [
          {
               receiverId: {
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


module.exports = mongoose.model("chattingModel", chattingModel)