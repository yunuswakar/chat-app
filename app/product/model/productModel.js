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

const PRODUCT = new SCHEMA({
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Store'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subcategory'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    properties: {},
    productImg:{
        type:String
    },
    price:{
        type:Number
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    landingPageProduct:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Product", PRODUCT);
