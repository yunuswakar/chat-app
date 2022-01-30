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
const pending=1
const confirmedAccepted=2
const delivered=3
const inProgress=4
const returned=5
const refundRequest=6
const cancelled=7
const packed=8
const picked= 9
const receivedBySeller= 10
const refundRequestCompleted= 11
const refundRejected = 12 
const refundAccepted = 13

const ORDER = new SCHEMA({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  name:{
    type: String
  },
  email:{
    type: String
  },
  mobileNumber:{
    type: String
  },
  address1:{
    type: String
  },
  address2:{
    type: String
  },
  pincode:{
    type: String
  },
  country:{
    type: String
  },
  quantity: {
    type: Number
  },
  orderId: {
    type: Number
  },
  delivery_date: {
    type: Date
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  retReason: {
    type: String,
  },
  sleeve: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  measurement: {
    type: String,
  },
  paymentMethod: {
    type: String
  },
  address1:{
    type: String,
  },
  status: {
    type: Number,
    enum: [pending, confirmedAccepted, delivered, inProgress, returned, refundRequest,cancelled,packed,picked,receivedBySeller,refundRequestCompleted,refundRejected,refundAccepted],
    default: pending,
  },
  productReview: {
    type:Boolean,
    default:false
  },
  

//=========payment gateway========================

transactionId: {
  type: String
},
customerId: {
  type: String
},
chargeId: {
  type: String
},
receipt_url: {
  type: String
},
currency: {
  type: String
},
transactionStatus: {
  type: String,
},
refundStatus: {
  type:String,
  enum: ["Pending","Completed"],
  default:"Pending"
},
refundRequest: {
  type:Boolean,
  default:false
},

cardType:{
  type:Number,
  enum:[0,1], // 0=Credit, 1=Debit
},
amount_refunded: {
  type: String,
},
refundId: {
  type: String
},

amount: {
  type: Number
},
transferId: {
  type: String,
},
///=========payment gateway end======================
  
},{timestamps:true});

module.exports = mongoose.model("Order", ORDER);
