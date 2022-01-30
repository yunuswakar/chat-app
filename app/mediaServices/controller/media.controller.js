/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const MEDIA = require("../model/mediaModel"); // import user model to perform crud operation
const USER = require("../../userServices/model/userModel"); // import user model to perform crud operation

const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/images/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const jwt = require("jsonwebtoken");
const duration = "1d";// set expiery time of token
const bcrypt = require("bcrypt");// bcrypt for encryption of password
const constant = require("../../../helpers/constant"); // some constant value 
const crypto = require("crypto");// bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _Media = {};
/**
 * customer signup 
 * @param {firstName, lastName, email,password,employer,address,country}
 */
_Media.uploadStories = async(req, res, next) => {
  
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
        next();
      } else {
          try {
            // let data = req.body;
            let imageArray = []
            if (req.files) {
              req.files.map((data) => {
                imageArray.push(data.path)
              })
            }
            let doc = await MEDIA.findOneAndUpdate({ added_by: req.userId }, { story_url: imageArray }, {
              new: true
            });
            let result = await new MEDIA({ story_url: imageArray, added_by: req.userId }).save();
            if (result) {
              res.send({
                sucess: true,
                data: result.story_url
              })
            }
          } catch (err) {
          }
      }
    });
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
};
_Media.getStories = async (req, res, next) => {
  
    try {
      let result = await MEDIA.find({ added_by:{$ne:req.userId} }).populate("added_by", "profileImg userName")
      let arr = [];
      result.map((data) => (
        data.story_url.map((result) => (
          
          arr.push(result)
          ))
          ))
      res.send({
        sucess: true,
        data: {
          userName: result[0]?result[0].added_by.userName:"",
          profileImg: result[0]?result[0].added_by.profileImg:"",
          stories: arr
        }
      })

    
  } catch (err) {
    // throw exception message
    await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
    next();
  }
}


//multer
var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).array("storyImg");

module.exports = _Media;
