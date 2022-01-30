/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
var schema = mongoose.Schema;
var staticKey = new schema(
  {
    status: {
      type: Boolean,
      default: true,
    },
    webAdmin: {
      type: Boolean,
    },
    viewOrder: {
      type: Number,
    },
    system: {
      type: Boolean,
    },
    default: {
      type: Boolean,
    },
    UX: {
      type: Boolean,
    },
    local: {
      type: Boolean,
    },
    label: {
      type: String,
      default: "",
    },
    englishValue: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["Text", "Image"],
    },
    location: {
      type: Number,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("constantConfig", staticKey);
