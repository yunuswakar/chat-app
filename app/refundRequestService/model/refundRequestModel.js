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

const picked= 9
const receivedBySeller= 10
const refundRequestCompleted= 11
const refundRejected = 12 
const refundAccepted = 13
const refundPending = 14
const REFUNDREQUEST = new SCHEMA({
    orderID: {
        type: Number
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    itemName: {
        type: String
    },
    amount: {
        type: Number
    },
    addressToReturn: {
        type: String
    },
    reason: {
        type: String
    },
    requestStatus: {
        type:Number,
        enum: [refundPending,refundRejected,refundAccepted,picked,receivedBySeller,refundRequestCompleted],
        default:refundPending
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rejectReasonBySeller: {
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("RefundRequest", REFUNDREQUEST);