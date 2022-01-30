
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
    myCrystal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addedCrystal'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type:{
        type:String,
        enum:["myCrystal","crystalLibrary"]
    }
}, { timestamps: true })
module.exports = mongoose.model("Favourite", schema);