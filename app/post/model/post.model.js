
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

const post = new schema(
  {
    postImg: {
      type: String,
    },
    text: {
      type: String,
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    hiddenByUsers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    postCount: {
      type: Number,
      default: 0,
    },
    isProfileImg: {
      type: Boolean,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
      },
    ],
    postStatus: {
      type: String,
      required: true,
      enum: ["ACTIVE", "BLOCK"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("communityWall", post);
