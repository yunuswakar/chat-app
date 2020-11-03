const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
const pageSchema = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: "userMedia"
     },
     pageName: {
          type: String
     },
     pageImage: {
          type: String
     },
     websiteUrl: {
          type: String
     },
     comments: [{
          commentedUser: {
               type: Schema.Types.ObjectId,
               ref: "userMedia"
          },
          userName: {
               type: String
          },
          commentId: {
               type: String
          },
          userPic: {
               type: String
          },
          comment: {
               type: String
          },
          commentedTime: {
               type: String,
          }
     }],
     likes: [{
          likedId: {
               type: Schema.Types.ObjectId
          },
          userName: {
               type: String
          },
          userPic: {
               type: String
          }
     }],
     followers: [{
          followerId: {
               type: Schema.Types.ObjectId,
               ref: "userMedia"
          },
          userName: {
               type: String
          },
          followTime: {
               type: String
          }
     }],
     description: {
          type: String
     },
     coverPic: {
          type: String
     },
     category: {
          type: String
     },
     userName: {
          type: String
     },
     pageAdminId: {
          type: Schema.Types.ObjectId,
          ref: 'userMedia'
     },
     adminName: {
          type: String
     },
     privacy: {
          type: String,
          enum: ["PUBLIC", "CLOSED", "SECRET"],
          default: "PUBLIC"
     },
     status: {
          type: String,
          enum: ["ACTIVE", "BLOCK", "DELETE"],
          default: "ACTIVE"
     }
}, { timestamps: true })
pageSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("pages", pageSchema)