/*@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.*/

"use strict";
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
const VALIDATOR = require("validator"); // for check email validators
const pointSchema = new SCHEMA({
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  });

const CHAT = new SCHEMA({
    senderId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    receiverId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    chatId:{
        ref: "chatConstant",
        type: mongoose.Types.ObjectId,
    },
    type: {
        type: Number,
        enum: [0, 1, 2,3,4,5], //0=>text,1=>file,2=>location,3=>video,4=>audio,5=>other
        default: 0,
    },
    isSeen:{
      type:Boolean,
      default:false
    },
    message: {
        type: String,
    },
    fileName: {
        type: String,
    },
    files: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    location: pointSchema,
},{timestamps:true});

/**
 * chat constant for chat started between two users
 */
const CHATCONSTANT = new SCHEMA({
    senderId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    receiverId: {
        ref: "User",
        type: mongoose.Types.ObjectId,
    },
    isTyping:{
      type:Boolean,
      default:false
    },
    type: {
      type: Number,
      enum: [0, 1, 2, 3], //0=>text,1=>image,2=>location,3=>video
      default: 0,
    },
    lastmsgId: {
        ref: "chat",
        type: mongoose.Types.ObjectId,
    },
    lastfile: {
      type: String,
    },
    lastlocation: pointSchema,
    status: {
      type: Number,
      enum: [0, 1], //0=>active,1=>inactive
      default: 0,
    },
    newDate:{
      type:Date,
      default:Date.now()
    }
   
},{timestamps:true});
module.exports.CHATS = mongoose.model("Chat", CHAT);
module.exports.CHATCONSTANTS = mongoose.model("Chatconstant", CHATCONSTANT);

