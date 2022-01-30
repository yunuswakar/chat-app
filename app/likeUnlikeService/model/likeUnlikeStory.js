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

const StoryLIKE = new SCHEMA({
    storyId: {
        type: mongoose.Types.ObjectId,
        ref: "STORY",
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
    expireAt:{
        type: Date,
        default: null 
    }
});

StoryLIKE.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("StoryLIKE", StoryLIKE);
