
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require('mongoose');
var schema = mongoose.Schema;
var group = new schema({
   
    groupName: {
        type: String,
    },
    type: {
        type:Number,
    },
    description:{
        type: String,
    },
    groupOrder: {
        type: Number
    },
    groupType: {
        type: String,
        enum:["Vertical","Horizontal"]
    },
    groupMaximumCount:{
        type: Number
    },
    verticalViewCount:{
        type: Number,
        default:0
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("group", group)