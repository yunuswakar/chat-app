/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const REVIEW = require("../model/reviewModel"); // import user model to perform crud operation
const ORDERREVIEW = require("../model/orderReviewModel"); // import user model to perform crud operation
const ORDER = require("../../orderServices/model/orderModel")
const mongoose = require("mongoose"); // set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const _review = {};

//Add Review
_review.addReview = async (req, res) => {

  try {
    let data = req.body;
    data.reviewBy = req.userId;
    let criteria = {
      reviewBy: mongoose.Types.ObjectId(req.userId),
      reviewTo: mongoose.Types.ObjectId(req.body.reviewTo),
    };
    let alreadyReview = await REVIEW.findOne(criteria);
    if (alreadyReview) { 
      res.status(400).send({
        success: false,
        message: responseMessage.REVIEW,
      });
      return;
    }

    let result = await REVIEW.create(data);

    res.status(200).send({
      success: true,
      message: responseMessage.SUCCESSS_EDIT("Review"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Delete One Review By Id
_review.deleteById = async (req, res) => {
  try {
    let result = await REVIEW.findByIdAndRemove({ _id: req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Review"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Review"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Get All Review
_review.getReview = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }
    let count = await REVIEW.find().countDocuments();
    let result = await REVIEW.find()
      .populate("reviewBy", "userName")
      .populate("reviewTo")
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Review"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
      count,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Update/Edit Review
_review.updateReview = async (req, res) => {
  try {
    let data = req.body;
    let result = await REVIEW.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: responseMessage.UPDATE_SUCCESS("Review"),
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  } 
};

//Get All Review on one Product 
_review.getOneProductReview = async (req, res) => {
  try {
    let count = await REVIEW.find({ reviewTo: req.params.id }).countDocuments();

    let result = await REVIEW.find({ reviewTo: req.params.id }).sort({createdAt:-1}).populate("reviewBy reviewTo", "userName profileImg");
    let avgRating = await REVIEW.aggregate([
      {
        $match: {
          reviewTo: mongoose.Types.ObjectId(req.params.id),
        }, 
      },
      {
        $lookup: {
          from: "users",
          let: { reviewBy: "$reviewBy" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$reviewBy"],
                },
              },
            },
          ],
          as: "reviewBy",
        },
      },
    
      {
        $addFields: {
          avgRating: { $avg: "$rating" },
        },
      }
    ]);
    // let array = [];
    // result.forEach((a) => {
    //   array.push(a.rating);
    // });
    // let sum = array.reduce((a, b) => a + b);
    // let avgRating = sum / count;
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Review"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
      count:count,
      avgRating,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Get All Review on one User
_review.getOneUserReview = async (req, res) => {
  try {
    let result = await REVIEW.find({ reviewBy: req.params.id });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Review"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Get All Review on login User
_review.getOneLoginUserReview = async (req, res) => {
  try {
    let result = await REVIEW.find({ reviewBy: req.userId });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Review"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DATA_FOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Add order Review
_review.addOrderReview = async (req, res) => {
  try {
    let data = req.body;
    data.reviewBy = req.userId;

    let criteria = {
      reviewBy: mongoose.Types.ObjectId(req.userId),
      reviewTo: mongoose.Types.ObjectId(req.body.reviewTo),
      orderId:req.body.orderId
    };
    let alreadyReview = await ORDERREVIEW.findOne(criteria);
    if (alreadyReview) { 
    let updateReview=await ORDERREVIEW.findOneAndUpdate(criteria,{$set:{rating:req.body.rating}},{new:true})

    let orderReviewed = await ORDER.findOneAndUpdate({booked_by: data.reviewBy, product: data.reviewTo, orderId: data.orderId},{$set: {productReview: true}},{new: true})

    res.status(200).send({
    success: true,
    message: responseMessage.SUCCESSS_EDIT("Review")
  });
    }
    else{
      let result = await ORDERREVIEW.create(data);
      let orderReviewed = await ORDER.findOneAndUpdate({booked_by: data.reviewBy,product: data.reviewTo, orderId: data.orderId},{$set: {productReview: true}},{new: true})

      res.status(200).send({
        success: true,
        message: responseMessage.SUCCESSS_EDIT("Review")
      });
    }
 
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};





module.exports = _review;
