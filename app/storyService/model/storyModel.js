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
const VALIDATOR = require("validator"); // for check email validators

const STORY = new SCHEMA({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    viewedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    colorcode:{
        type:String,
        default:"white"
    },
    scale:{
        type:Number,
        default:1
    },
    totalTime:{
        type:Number,
        default:0
    },
    storyImg: {
        type: String
    },
    type: {
        type: Number,
        enum:[0,1],
        default:0 // 0=>image, 1=>video
    },
    xcoordinate:{
        type:String,
        default:0
    },
    ycoordinate:{
        type:String,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: '20m',    
        // expires: 1000 * 60 * 60 * 24
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expireAt:{
        type: Date, default: null 
    }
    // expiryDate: { type: Date },
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: "10m" },
    // },
});

STORY.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story", STORY);