var mongoose = require('mongoose')
let groupChat = mongoose.Schema({

    senderId: {
        type: String,
        ref: 'user'
    },
    chatType: {
        type: String,
        default: "GROUP"
    },
    messages: [
        {
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
    groupId: {
        type: String,
        ref: 'group'
    },

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


module.exports = mongoose.model("groupChat", groupChat)