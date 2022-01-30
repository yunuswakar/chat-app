

/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");
const addedCrystal = new schema({
    crystalName: {
        type: String,
        default:""
    }, 
    confidence: {
        type:Number
    },
    scan_img:{
        type: String
    },
    selected: {
        type: Boolean,
        default:false
    },
    added_by: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    autoId:{
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model("autoIdHistory", addedCrystal);