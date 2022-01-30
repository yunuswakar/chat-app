/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const { string } = require("joi");
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
const Pending=1
const Confirmed=2
const Delivered=3
const InProgress=4
const Returned=5
const refundRequest=6
const Cancelled=7
const Packed=8


const Tracking = new SCHEMA({
  orderId: {
    type:String
  },
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
location: {
  type: String,
},
reason: {
  type: String,
},
status: {
  type: Number,
  enum: [Pending, Confirmed, Delivered, InProgress, Returned, refundRequest,Cancelled,Packed] 
},
},{timestamps:true});

module.exports = mongoose.model("Tracking", Tracking);
