
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require('mongoose');
var schema = mongoose.Schema;
var credit = new schema({
    creditId: {
        type: String,
    },
    creditTo: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    subscriptionId: {
        type: mongoose.Types.ObjectId,
        ref: "subscription", 
    },
    durationType:{
        type: String,
        enum:["weekly"]
    },
    quantity: {
        type: Number,
      },

    },
    {
        timestamps: true
    })

module.exports = mongoose.model("credit", credit)



