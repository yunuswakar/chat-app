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

const NOTIFICATION = new SCHEMA({
    sendBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sendTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    subject:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
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


module.exports = mongoose.model("Notification", NOTIFICATION);