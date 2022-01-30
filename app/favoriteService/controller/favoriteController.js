/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const FAVORITE = require("../model/favoriteModel"); // import user model to perform crud operation
const mongoose = require("mongoose"); // set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const _favorite = {};

//Add Favorite
_favorite.addFavorite = async (req, res) => {
  try {
    let data = req.body;
    data.favBy = req.userId;
    let result = await FAVORITE.create(data);
    res.status(constant.success).send({
      success: true,
      message: responseMessage.ADD_SUCCESS("Favorite"),
      data: result,
    });
  } catch (error) {
    res.status(constant.failureStatus).send({
      success: false,
      message: error.message,
    });
  }
};

//Delete One Favorite By Id
_favorite.deleteFavoriteById = async (req, res) => {
  try {

    let result = await FAVORITE.findOneAndRemove({
      product: req.params.id,
      favBy: req.userId,
    });

    if (!result) {
      res.status(constant.failureStatus).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Favorite"),
      });
      return;
    }
    res.status(constant.success).send({
      success: true,
      message: responseMessage.DELETE("Favorite"),
      data: result,
    });
  } catch (error) {
    res.status(constant.failureStatus).send({
      success: false,
      message: error.message,
    });
  }
};

//Get All Favorite
_favorite.getFavorite = async (req, res) => {  
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize)
   
    let filter={favBy:req.userId}

    let count = await FAVORITE.countDocuments(filter);
    let result = await FAVORITE.find(filter).populate("product")

    // let count = await FAVORITE.countDocuments(filter);
    // let result = await FAVORITE.find(filter).populate("product")

      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ created_at: -1 });
      
    if (!result) {
      res.status(constant.failureStatus).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Favorite"),
      });
      return;
    }

    res.status(constant.success).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
      count,
    });
  } catch (error) {
    res.status(constant.failureStatus).send({
      success: false,
      message: error.message,
    });
  }
};

//Get One Favorite By Id
_favorite.getFavoriteById = async (req, res) => {
  try {
    let result = await FAVORITE.findOne({ _id: req.params.id });
    if (!result) {
      res.status(constant.failureStatus).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Favorite"),
      });
      return;
    }
    res.status(constant.success).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(constant.failureStatus).send({
      success: false,
      message: err.message,
    }); 
  }
};

//Get All Favorite by user
_favorite.getFavoriteByUSer = async (req, res) => {  
  try {
    let filter={favBy:req.userId}
    let result = await FAVORITE.find(filter)
      .populate("product")
    if (!result) {
      res.status(constant.failureStatus).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Favorite"),
      });
      return;
    }
    res.status(constant.success).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result
    });
  } catch (error) {
    res.status(constant.failureStatus).send({
      success: false,
      message:err.message,
    });
  }
};
module.exports = _favorite;
