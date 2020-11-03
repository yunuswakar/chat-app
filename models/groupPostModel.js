const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var groupPost = new Schema({
     userId: {
          type: Schema.Types.ObjectId,
          ref: "userMedia"
     },
     groupId: {
          type: Schema.Types.ObjectId,
          ref: "group"
     },
     tagFriends: [
          Schema.Types.ObjectId
     ],
     sharedBy: [{
          memberId: {
               type: String
          },
          sharedTo: [{
               friendId: {
                    type: String
               }
          }]
     }],
     text: {
          type: String
     },
     // image: {
     //     type: String
     // },
     image: [String],
     video: [String],

     viewers: [String],
     poll: [{
          type: String
     }],
     sticker: [
          String
     ],
     // feeling: {
     //      type: String
     // },

     location: {
          type: String
     },
     latitude: {
          type: String
     },
     longitude: {
          type: String
     },
     GIF: [{
          type: String
     }],
     privacy: {
          type: String,
          enum: ["PUBLIC", "FRIENDS", "FRIENDSEXCEPT", "SPECIFICFRIENDS", "ONLYME"],
          default: "PUBLIC"
     },
     timeLine: [String],
     postStatus: {
          type: String,
          enum: ["ACTIVE", "DELETE", "ARCHIVE", "HIDE"],
          default: "ACTIVE"
     },
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
     replyComments: [{
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
               type: String
          }
     }],
     comments: [{
          commentedUser: {
               type: Schema.Types.ObjectId,
               ref: "userMedia"
          },
          commentId: {
               type: String
          },
          userName: {
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
     }]

},

     { timestamps: true }
)

groupPost.plugin(mongoosePaginate)
module.exports = mongoose.model("groupPost", groupPost);