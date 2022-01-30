/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
// const VALIDATOR = require("validator"); // for check email validators

const LIKE = new SCHEMA({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    },
    subReplyId: {
        type: mongoose.Types.ObjectId,
        ref: "SubReply",
    },
    commentStoryId: {
        type: mongoose.Types.ObjectId,
        ref: "commentStory",
    },
    likedBy: {
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Like", LIKE);
