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

const userSubscription = new schema(
  {
    subscriptionPlan: {
      type: mongoose.Types.ObjectId,
      ref: "subscription",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    transactionId: {
      type: String,
      default: "0",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCEL", "EXPIRE"],
      default: "ACTIVE",
    },
    amount: {
      type: Number,
      default: 0,
    },

    collectionQuantity: {
      type: Number,
    },
    scanQuantity: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("userSubscription", userSubscription);
