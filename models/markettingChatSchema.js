var mongoose = require('mongoose')
let markettingSchema = mongoose.Schema({

     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
     },
     chatUserType: {
          type: String
     },
     messages: [
          {
               senderId:{
                    type: String
               },

               message: {
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
               createdAt: {
                    type: Date,
                    default: Date.now()
               }
          }
     ],
     status: {
          type: String,
          enum: ["ACTIVE", "BLOCK"],
          default: "ACTIVE"
     },
     clearStatus:{type:String,
                 enum:[false,true],
                 default:false
     }

}, { timestamps: true })


module.exports = mongoose.model("markettingSchema", markettingSchema)
