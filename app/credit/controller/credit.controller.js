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

const constant = require("../../../helper/constant");
const CREDIT = require("../model/credit.model");
const PAYMENT = require("../../subscription/model/payment.model");
const SUBSCRIPTION = require("../../subscription/model/subscription.model");
const USERSUBSCRIPTION = require("../../subscription/model/userSubscription.model");

const shortid = require("shortid");
const _text = {};

//add credit
_text.addCredit = async (req, res, next) => {
  try {
    let subscriptionData = await SUBSCRIPTION.findOne({
      _id: req.body.subscriptionId,
    });

    let userSubscription = await USERSUBSCRIPTION.findOne({
      userId: req.body.creditTo,
      status: "ACTIVE",
    });
    if (userSubscription) {
      let data = req.body;
      let endDate = userSubscription.end_date;
      endDate.setDate(endDate.getDate() + req.body.quantity * constant.weekly);
      data.end_date = endDate;

      let updateUserSubacription = await USERSUBSCRIPTION.findOneAndUpdate(
        { userId: req.body.creditTo },
        {
          $set: {
            end_date: endDate,
            collectionQuantity:
              userSubscription.collectionQuantity +
              subscriptionData.collectionQuantity,
            scanQuantity:
              userSubscription.scanQuantity + subscriptionData.scanQuantity,
            subscriptionPlan: req.body.subscriptionId,
          },
        },
        { new: true }
      );

      let transactionData = {
        subscriptionPlan: req.body.subscriptionId,
        userId: req.body.creditTo,
        transactionType: "Credit",
      };
      let transactionResult = await new PAYMENT(transactionData).save();

      let result = await new CREDIT(data).save();
      if (data) {
        await setResponseObject(req, true, responseMessage.ADD, data);
        next();
      }
    } else {
      let data = req.body;
      let dates = new Date();
      let date = new Date();
      date.setDate(date.getDate() + req.body.quantity * constant.weekly);
      data.end_date = date;
      let usersubscriptionData = {
        start_date: dates,
        end_date: date,
        userId: req.body.creditTo,
        collectionQuantity: subscriptionData.collectionQuantity,
        scanQuantity: subscriptionData.scanQuantity,
        subscriptionPlan: req.body.subscriptionId,
      };

      let transactionData = {
        subscriptionPlan: req.body.subscriptionId,
        userId: req.body.creditTo,
        transactionType: "Credit",
      };

      let transactionResult = await new PAYMENT(transactionData).save();
      let result = await new USERSUBSCRIPTION(usersubscriptionData).save();

      let credit = await new CREDIT(data).save();
      if (data) {
        await setResponseObject(req, true, responseMessage.ADD, data);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get credit code
_text.creditCode = async (req, res, next) => {
  try {
    let uniqueId = await shortid.generate();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, uniqueId);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get credit
_text.getAllCredit = async (req, res, next) => {
  try {
    let getText = await CREDIT.find();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get credit
_text.getOne = async (req, res, next) => {
  try {
    let getText = await CREDIT.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// get user credit
_text.getUserCredit = async (req, res, next) => {
  try {
    let getCredit = await CREDIT.findOne({ creditTo: req.userId });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getCredit);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete
_text.delete = async (req, res, next) => {
  try {
    let user = await CREDIT.findOneAndRemove({ _id: req.params.id });
    if (user) {
      await setResponseObject(req, true, responseMessage.PAGE_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All credits
_text.getCredits = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    if (page <= 0) {
      throw responseMessage.PAGE_INVALID;
    }
    let filter = {};
    let count = await CREDIT.find(filter).countDocuments();
    let result = await CREDIT.find(filter)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate("creditTo subscriptionId", "-password");
    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count: count,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _text;
