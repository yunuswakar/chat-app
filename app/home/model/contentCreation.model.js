
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
var schema = mongoose.Schema;
var contentCreation = new schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    hiddenByUsers: [String],
    interestFlag: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    action:{
      type: String,
      enum: ["New","Edit","Delete"]
    },
    test:{
      type: Boolean,
      enum: [true, false]
    },
    status:{
      type: String,
      enum: ["Draft", "Sent"]
    },
    pushNotification: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    notificationTemplate: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    notificationCriteria: {
      type: String,
    },
    notificationListFlag: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    grouped: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    groupType: {
      type: mongoose.Types.ObjectId,
      ref: "group",
    },
    canClose: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    contentOrder: {
      type: Number,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
      default: "",
    },
    distribution: {
      type: String,
      enum: ["Subscribe", "Unsubscribe", "Admin", "All","NotSubscribed"],
    },
    postDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    location: {
      type: Number,
    },
    notificationTitle: {
      type: String,
    },
    notificationSubTitle: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    notificationLink: {
      type: String,
    },
    notificationDateTime: {
      type: Date,
    },
    crystal: {
      type: mongoose.Types.ObjectId,
      ref: "crystal",
    },
    store: {
      type: mongoose.Types.ObjectId,
      ref: "store",
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contentCreation", contentCreation);
