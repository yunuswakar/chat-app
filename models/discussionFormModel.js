const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var discussion = new schema(
    {
        userId: {
            type: schema.Types.ObjectId,
            ref: "userMedia"
        },
        userName: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        tagFriends: [
            schema.Types.ObjectId
        ],
        members: [
            {
                memberId: {
                    type: schema.Types.ObjectId,
                    ref: 'userMedia'
                },
                status: {
                    type: String,
                    enum: ["ACTIVE", "DELETED", "BLOCKED"],
                    default: "ACTIVE"
                }
            }
        ],
        friendList: [
            {
                friendId: {
                    type: schema.Types.ObjectId,
                    ref: "userMedia"
                },
                taggedTime: {
                    type: Date,
                    default: Date.now()
                },
                status: {
                    type: String,
                    enum: ["ACTIVE", "BLOCK", "DELETE"],
                    default: "ACTIVE"
                }
            }
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
        viewers: [String],
        feeling: {
            type: String
        },
        location: {
            type: String
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        },
        privacy: {
            type: String,
            enum: ["PUBLIC", "FRIENDS", "FRIENDSEXCEPT", "SPECIFICFRIENDS", "ONLYME"],
            default: "PUBLIC"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DELETE", "BLOCK"],
            default: "ACTIVE"
        },
        members: [
            {
                memberId: {
                    type: schema.Types.ObjectId,
                    ref: 'userMedia'
                },
                status: {
                    type: String,
                    enum: ["ACTIVE", "DELETE", "BLOCK"],
                    default: "ACTIVE"
                }
            }
        ],
        likes: [{
            likedId: {
                type: schema.Types.ObjectId,
                ref: "userMedia"
            },
            userName: {
                type: String
            },
            userPic: {
                type: String
            },
            likedTime: {
                type: String,
            }
        }],
        replyComments: [{
            commentedUser: {
                type: schema.Types.ObjectId,
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
                type: schema.Types.ObjectId,
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
        }],
    },
    {
        timestamps: true
    }
);

discussion.plugin(mongoosePaginate);
module.exports = mongoose.model("discussionForm", discussion);