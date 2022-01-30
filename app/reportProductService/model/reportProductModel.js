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

const PRODUCTREPORT = new SCHEMA({
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reportedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    reason:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model("Productreport", PRODUCTREPORT);
