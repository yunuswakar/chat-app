const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const eventSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "userMedia"
        },
        clickBy: [
            String
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
        cardDetails: [{
            firstName: String,
            lastName: String,
            email: String,
            phoneNumber: String,
            countryCode: String,
            mobile: String,
            bankName: String,
            cardNumber: String,
            expiryDate: String,
            cvvNumber: String,
            country: String,
            address: String,
            city: String,
            state: String,
            zipCode: String,
            expMonth: String,
            expYear: String,
            stripAccountId: String,
            cvvNumber: String
        }],
        title: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        expiryDate:{
            type: String
        },
        video: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        },
        userName: {
            type: String
        },
        eventType: {
            type: String,
            enum: ["EVENT", "NONPROFIT", "GAME"],
            default: "EVENT"
        },
        status: {
            type: String,
            enum: ["ACTIVE", "BLOCK", "DELETE","HIDE","ARCHIVE"],
            default: "ACTIVE"
        },
        location: {
            type: String
        },
        latLong: [
            Number
        ],
        viewers: [String],
        memberId: [{
            member: {
                type: Schema.Types.ObjectId
            },
            memberName: {
                type: String
            },
            memberPic: {
                type: String
            },
           
            Status: {
                type: String,
                enum: ["PENDING", "ACCEPTED", "REJECTED"],
                default: "PENDING"
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
        }]
    },
    { timestamps: true }
);
eventSchema.plugin(mongoosePaginate);
var event = mongoose.model("event", eventSchema);
module.exports = event;