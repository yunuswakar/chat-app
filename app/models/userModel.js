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

const USERS = new SCHEMA({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => {
      return VALIDATOR.isEmail(value);
    },
  },
  role:{
    type:Number,
    enum:[0,1,2,3], // 0=>user/Buyer, 1=>admin, 2=>Super Admin, 3=>Seller
    default:0
  },
  firstName: { type: String },
  lastName: {  type: String },
  userName: {  type: String,unique: true,required: true, },
  profileImg: {
    type: String,
    default:"",
  },
  coverImage: {
    type: String,
  },
  badgeStatus:{
    type:String,
    enum:['Business','Celebrity','Creator'],
    
  },
  sPage:{
    type:Boolean,
    default:false
  },
  gender: {  type: String },
  birthday: { type: String },
  password: { required: true, type: String },
  workPlace: { type: String },
  homePlace: { type: String },
  school: { type: String },
  countryCode:{ type: String },
  description:{type: String},
  country:{ type: String },
  phoneNo:{type:Number,unique: true,required: true},
  otp:{type:Number,default:123456},
  active:{type:Boolean,default:false},
  otpVerified:{type:Boolean,default:false},
  emailVerified:{type:Boolean,default:false},
  friends: [{ type: SCHEMA.Types.ObjectId, ref: "User", default: [] }],
  followers: [{ type: SCHEMA.Types.ObjectId, ref: "User", default: [] }],
  following: [{ type: SCHEMA.Types.ObjectId, ref: "User", default: [] }],
  socketId: String,
  isOnline:{
    type:Boolean,
    default:false
  },
  deviceToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("User", USERS);
