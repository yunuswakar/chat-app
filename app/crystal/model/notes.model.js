
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require('mongoose');

const schema = mongoose.Schema({

    crystal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'crystal'
    },
    notes: {
        type: String
    },
    myCrystal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addedCrystal'
    },
    type:{
        type:String,
        enum:["myCrystal","crystalLibrary"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })
module.exports = mongoose.model("note", schema);