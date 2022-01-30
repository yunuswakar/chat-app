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

const MEASUREMENT = new SCHEMA({
    seller: {
        type: SCHEMA.Types.ObjectId,
        ref: "User"
    },
    measurement: {
        type: String
    }
},{timestamps:true});

module.exports = mongoose.model("Measurement", MEASUREMENT);