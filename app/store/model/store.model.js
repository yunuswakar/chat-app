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

const store = new schema(
  {
    shopName: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    briefDescription: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    speciality: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    shop: {
      type: Boolean,
      default: false,
    },
    partner: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Boolean,
      default: false,
    },
    ethicalRanking: {
      type: String,
      default: "",
    },
    qualityRanking: {
      type: String,
      default: "",
    },
    experienceRanking: {
      type: String,
      default: "",
    },
    onlineStore: {
      type: Boolean,
      default: false,
    },
    EW_Partner: {
      type: Boolean,
      default: false,
    },
    investigated: {
      type: Boolean,
      default: false,
    },
    ecommerceLink: {
      type: String,
      default: "",
    },
    storeImage: {
      type: String,
      default: "",
    },
    thumbnail_image: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("store", store);
