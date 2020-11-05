var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Paginate = require('mongoose-paginate');
var aggregatePaginate = require('mongoose-aggregate-paginate');

var communitySchema = new Schema({
    communityName: {
        type: String
    },
    userName: {
        type: String
    },
    userPic: {
        type: String
    },
    link: {
        type: String
    },
    communityType: {
        type: String,
        enum: ['OPEN', 'CLOSE']
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    categoryName: {
        type: String
    },
    communityDescription: {
        type: String
    },
    logo: {
        type: String
    },
    coverPage: {
        type: String
    },
    type: {
        type: String
    },
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
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BLOCK', 'DELETE', 'HIDE'],
        default: 'ACTIVE'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }

}, { timestamps: true });
communitySchema.index({ location: "2dsphere" });
communitySchema.plugin(Paginate);
communitySchema.plugin(aggregatePaginate);


module.exports = mongoose.model('communitySchema', communitySchema);