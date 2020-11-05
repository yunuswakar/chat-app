
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;
var post = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    postType: {
        type: String,
        enum: ["POST", "BLOG"]
    },
    userName: {
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    userPic: {
        type: String
    },
    title: {
        type: String
    },
    tag: [String],
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categoryModel"

    },
    categoryName: {
        type: String
    },
    text: {
        type: String
    },
    image: [],
    video: [],
    feedType: {
        type: String,
        enum: ["PUBLIC", "PRIVATE"],
        default: "PUBLIC"
    },
    timeLine: [String],
    postStatus: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    },
    notifyUsers: [{
        type: Schema.Types.ObjectId,
        ref: "user"

    }],
    comments: [{
        commentedUser: {
            type: Schema.Types.ObjectId,
            ref: "user"
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
            type: String
        },
        isLike: {
            type: Boolean,
            default: false
        },
        replyComments: [{
            commentedUser: {
                type: Schema.Types.ObjectId,
                ref: "user"
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
        likeOnComment: [{
            likedId: {
                type: Schema.Types.ObjectId
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
            likeSymbol: {
                type: String
            }
        }],
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    hiddenByUsers:[{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]


},

    { timestamps: true }
)

post.plugin(mongoosePaginate)
post.plugin(mongooseAggregatePaginate)
module.exports = mongoose.model("post", post);
