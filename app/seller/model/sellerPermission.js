/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const mongoose = require("mongoose");

const SELLERS = new mongoose.Schema({
    fullNameOfSeller: { type: String, required: true },
    business: { type: String },
    description: { type: String },
    requestedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    storeImage: {
        type: String,
      },
      storeName:{
        type: String,
      },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected'],
        required: true,
    },
    address: { type: String },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            //required: true,
        },
        coordinates: {
            type: [Number],
            //required: true,
        },
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = mongoose.model("Seller", SELLERS);
