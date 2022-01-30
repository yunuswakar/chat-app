/*@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.*/

"use strict";

const mongoose =require("mongoose");

/**
 * message schema for schema added for user messages
 */
const schema = mongoose.Schema({
    senderId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    receiverId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    chatId:{
        ref: "MessageConstants",
        type: mongoose.Types.ObjectId,
    },
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    messageType: {
        type: String
    },
    isRead: {
      type: Boolean, default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

schema.methods.toJSON = function () {
    const obj = this.toObject();
    return obj;
};

/**
 * chat constant for chat started between two users
 */
const MESSAGECONSTANT = mongoose.Schema({
    senderId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    receiverId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    lastmsgId: {
        ref: "Messages",
        type: mongoose.Types.ObjectId,
    },
    status: {
      type: Number,
      enum: [0, 1], //0=>active,1=>inactive
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports.MESSAGECONSTANTS = mongoose.model("MessageConstants", MESSAGECONSTANT);
module.exports.MESSAGE = mongoose.model("Messages", schema);
