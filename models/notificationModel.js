const mongoose = require('mongoose');
const schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')
var mongoosePaginate = require('mongoose-paginate');

var notificationModel = new schema({
    senderId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    requestedId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    eventId: {
        type: schema.Types.ObjectId,
        ref: "event"
    },
    postId: {
        type: schema.Types.ObjectId,
        ref: "post"
    },
    eventTitle: {
        type: String
    },
    eventImage: {
        type: String
    },
    date: {
        type: String
    },
    messege: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    notificationType: {
        type: String
    },
    joinId: {
        type: schema.Types.ObjectId,
        ref: "event"
    },
    joinRequest: {
        type: String,
        enum: ["PENDING", "ACCEPT", "REJECT"],
        //default:"ACTIVE"
    },
    requestFor: {
        type: String,
        enum: ["EVENT", "LIKE", "COMMENT", "POST"]
    },
    requestType: {
        type: String,
        enum: ["REQUESTED", "ACCEPT"],
        //default:"ACTIVE"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DELETE"],
        default: "ACTIVE"
    }

}, { timestamps: true });
notificationModel.plugin(mongoosePaginate);
module.exports = mongoose.model("notification", notificationModel); 