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

const subscriptionTransaction = new schema(
  {
    subscriptionPlan: {
      type: mongoose.Types.ObjectId,
      ref: "subscription",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    transactionId: {
      type: String,
      default: "0",
    },
    transactionType: {
      type: String,
      enum: ["Payment", "Credit"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "subscriptionTransaction",
  subscriptionTransaction
);
