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

const POST = new SCHEMA({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    // description:{
    //     type:String
    // },
    description:{
        type:Array
    },
    // description:[{
    //     type:String
    // }],
    postImg:{
        type:String
    },
    type: {
        type: Number,
        enum:[0,1],
        default:0 // 0=>image, 1=>video
    },
    thumbnail:{
        type:String,
        default:""
    },
    likedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    viewedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    postTime:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
        default:false
    },
    blockedUser:{
        type:Boolean,
        default:false
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

module.exports = mongoose.model("Post", POST);
