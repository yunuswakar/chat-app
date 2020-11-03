const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var classPost = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userMedia"
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: "class"
    },
    tagFriends: [
        Schema.Types.ObjectId
    ],
    text: {
        type: String
    },
    // image: {
    //     type: String
    // },
    document:[String],
    image:[String],
    video:[String],
   
    viewers: [String],
    poll: [{
        type: String
    }],
    sticker: [
        String
    ],
    // feeling: {
    //     type: String
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
        enum: ["PUBLIC", "FRIENDS","SPECIFICFRIENDS", "ONLYME"],
        default: "PUBLIC"
    },
    timeLine: [String],
    postStatus: {
        type: String,
        enum: ["ACTIVE", "DELETE","ARCHIVE","HIDE"],
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
    sharedBy:[{
       memberId:{
            type:String
        },
        sharedTo:[{
            friendId:{
                type:String
            }
        }]
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
        commentId:{
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

classPost.plugin(mongoosePaginate)
module.exports = mongoose.model("classPost", classPost);