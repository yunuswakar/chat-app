"use strict";
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
const VALIDATOR = require("validator"); // for check email validators

const CONTACTUSER = new SCHEMA({
    contactBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
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


module.exports = mongoose.model("ContactUser", CONTACTUSER);