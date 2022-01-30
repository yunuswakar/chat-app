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
const VALIDATOR = require("validator"); // for check email validators

const orderReview = new SCHEMA({
    reviewBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviewTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    orderId: {
        type: Number
      },
    rating:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    }
  
},{timestamps:true});


module.exports = mongoose.model("orderReview", orderReview);
