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

const subscription = new schema(
  {
    planName: {
      type: String,
    },
    durationType: {
      type: String,
      enum: ["Monthly", "Yearly"],
    },
    collectionQuantity: {
      type: Number,
    },
    scanQuantity: {
      type: Number,
    },
    backup: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
    },
    planCost: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subscription", subscription);
