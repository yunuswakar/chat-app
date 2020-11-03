const mongoose = require("mongoose");
const schema = mongoose.Schema;

var chatKey = new schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        messages: [
            {
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                },
                message: {
                    type: String
                },
                status: {
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
            enum: ["ACTIVE", "BLOCK", "DELETE"],
            default: "ACTIVE"
        },
    }, { timestamps: true })



module.exports = mongoose.model("chat", chatKey)
