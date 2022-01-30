/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;
const USER = require("../../auth/model/auth.model");

const constant = require("../../../helper/constant");
const RATING = require("../model/rating.model");
const _rating = {};

//rating by user

_rating.rating = async (req, res, next) => {
  try {
    let getRating = await RATING.findOne({ rate_by: req.userId });
    if (getRating) {
      var data = req.body;
      let criteria = { rate_by: req.userId };
      let options = { new: true };
      let ratingData = await RATING.findOneAndUpdate(
        criteria,
        { $set: { rating: req.body.rating } },
        options
      );
      await setResponseObject(req, true, responseMessage.RATING, ratingData);
      next();
    } else {
      let data = req.body;
      data.rate_by = req.userId;
      let result = await new RATING(data).save();
      if (data) {
        await setResponseObject(req, true, responseMessage.RATING, result);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_rating.userRating = async (req, res, next) => {
  try {
    let getRating = await RATING.findOne({ rate_by: req.userId });
    if (!getRating) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        rating: 5,
      });
      next();
    } else {
      let rating = getRating.rating;
      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        rating: rating,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_rating.getRating = async (req, res, next) => {
  try {
    let getRating = await RATING.find({});
    let ratingCount = await RATING.find({}).countDocuments();
    let array = [];
    getRating.forEach((element) => {
      array.push(element.rating);
    });
    let avgRating = array.reduce((a, b) => a + b, 0) / ratingCount;
    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      getRating,
      avgRating,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_rating.getAllRating = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let page = parseInt(req.query.page);
      let pageSize = parseInt(req.query.pageSize) || 10;
      if (page <= 0) {
        throw responseMessage.PAGE_INVALID;
      }
      let filter = {};
      let count = await RATING.find(filter).countDocuments();
      let result = await RATING.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .populate("rate_by", "guId");

      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _rating;
