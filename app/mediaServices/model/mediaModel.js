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
const { string, array } = require("joi");
const SCHEMA = mongoose.Schema;

const MEDIA = new SCHEMA({


  story_url: { type: Array },
  added_by: { type: SCHEMA.Types.ObjectId, ref: "User" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  // expireAt: {
  //   type: Date,
  //   default: Date.now,
  //   index: { expires: "1m" },
  // },
});


module.exports = mongoose.model("Media", MEDIA);
