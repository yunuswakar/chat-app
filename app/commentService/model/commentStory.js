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

const COMMENTS = new SCHEMA({  
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'commentStory'
    },  
    story:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Story'
    },
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    title:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expireAt:{
        type: Date,
        default: null 
    }
});

COMMENTS.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("commentStory", COMMENTS);