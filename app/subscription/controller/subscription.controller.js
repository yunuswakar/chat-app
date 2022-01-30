/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
const responseMessage = require("../../../helper/responseMessages");
const setResponseObject = require("../../../helper/commonFunctions")
  .setResponseObject;

const constant = require("../../../helper/constant");

const SUBSCRIPTION = require("../model/subscription.model");
const PAYMENT = require("../model/payment.model");
const USER = require("../../auth/model/auth.model");
// const USER = require("../app/auth/model/auth.model");

const _subscription = {};

//add subscription by admin
_subscription.addSubscription = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let data = await SUBSCRIPTION.findOne({ planName: req.body.planName });
      if (data) {
        await setResponseObject(
          req,
          false,
          responseMessage.ALREADYEXIST(data.planName)
        );
        next();
      } else {
        let data = req.body;
        let result = await new SUBSCRIPTION(data).save();
        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};

// get Subscription detail by id

_subscription.getById = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let getSubscription = await SUBSCRIPTION.findOne({ _id: req.params.id });
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getSubscription
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};

// get Subscription detail

_subscription.getAll = async (req, res, next) => {
  try {
    let getSubscription = await SUBSCRIPTION.find();
    await setResponseObject(
      req,
      true,
      responseMessage.RECORDFOUND,
      getSubscription
    );
    next();
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};

//Get All Subscription by admin
_subscription.getSubscription = async (req, res, next) => {
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
      let filter = { status: true };
      let count = await SUBSCRIPTION.find(filter).countDocuments();
      let result = await SUBSCRIPTION.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
//delete subscription by admin
_subscription.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let subscription = await SUBSCRIPTION.findOneAndRemove({
        _id: req.params.id,
      });
      if (subscription) {
        await setResponseObject(req, true, responseMessage.SUBSCRIPTION_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
//update subscription by admin
_subscription.updateSubscription = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let criteria = { _id: req.params.id };
      let data = req.body;
      let options = { new: true };
      delete req.body.planName;
      let subscription = await SUBSCRIPTION.findOneAndUpdate(
        criteria,
        data,
        options
      );
      if (subscription) {
        await setResponseObject(
          req,
          true,
          responseMessage.SUBSCRIPTION_EDITED,
          subscription
        );
        next();
      } else {
        await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
//payment by user
_subscription.payment = async (req, res, next) => { 
  try {
    let user = await PAYMENT.findOne({
      userId: req.body.userId,
      status: "ACTIVE",
    });
    if (user) {
      if (req.body.durationType == "Monthly") {
        let data = req.body;
        let date = new Date();
        data.start_date = date;
        let endDate=user.end_date
        endDate.setDate(endDate.getDate() + 30);
        data.end_date = endDate;
        data.amount = Number(req.body.amount);
        data.quantity=req.body.quantity+user.quantity;
        // data.userId=req.userId
        // let result = await new PAYMENT(data).save();
        let result=await PAYMENT.findOneAndUpdate({ userId: user.userId},req.body,{new:true})
        let userResult=await USER.findOneAndUpdate({_id: user.userId},{distribution:"Subscribe"},{new:true})

        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
      if (req.body.durationType == "Yearly") {
        let data = req.body;
        let dates = new Date();
        data.start_date = dates;
        let endDate=user.end_date

        endDate.setDate(endDate.getDate() + 365);
        data.end_date = endDate;
        data.amount = Number(req.body.amount);
        data.quantity=req.body.quantity+user.quantity;

        let result=await PAYMENT.findOneAndUpdate({ userId: user.userId},req.body,{new:true})
        let userResult=await USER.findOneAndUpdate({_id: user.userId},{distribution:"Subscribe"},{new:true})

        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
    } else {
      if (req.body.durationType == "Monthly") {
        let data = req.body;
        let dates = new Date();
          data.start_date = dates;
          let date = new Date();
        date.setDate(date.getDate() + 30);
        data.end_date = date;
        data.amount = Number(req.body.amount);
        let result = await new PAYMENT(data).save();
        let userResult=await USER.findOneAndUpdate({_id: req.body.userId},{distribution:"Subscribe"},{new:true})

        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
      if (req.body.durationType == "Yearly") {

        let data = req.body;
        let dates = new Date();
        data.start_date = dates;
        let date = new Date();
        date.setDate(date.getDate() + 365);
        data.end_date = date;
        data.amount = Number(req.body.amount);
        // data.userId=req.userId
        let result = await new PAYMENT(data).save();
        let userResult=await USER.findOneAndUpdate({__id: req.body.userId},{distribution:"Subscribe"},{new:true})

        if (data) {
          await setResponseObject(req, true, responseMessage.ADD, data);
          next();
        }
      }
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
// get user subscription detail by id

_subscription.getPayment = async (req, res, next) => {
  try {
    let getSubscription = await PAYMENT.findOne({
      userId: req.userId,status:"ACTIVE"
    }).populate("userId", "-password -token");
    if (getSubscription) {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getSubscription
      );
      next();
    }
    else{
      await setResponseObject(req, false, responseMessage.NORECORDFOUND);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};

//payment history of user
_subscription.paymentHistory = async (req, res, next) => {
  try {
    let getSubscription = await PAYMENT.find({ added_by: req.userId }).populate(
      "added_by",
      "-password"
    ); 
    await setResponseObject(
      req,
      true,
      responseMessage.RECORDFOUND,
      getSubscription
    );
    next();
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};

//payment history of user
_subscription.getAllPayment = async (req, res, next) => {
  try {
    let getSubscription = await PAYMENT.find({}).populate(
      "added_by",
      "-password"
    ); 
    await setResponseObject(
      req,
      true,
      responseMessage.RECORDFOUND,
      getSubscription
    );
    next();
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
//update
_subscription.paymentCron = async (req, res, next) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
      let data = { status: "EXPIRE" }
      let options = { new: true, multi: true };
      let findData=await PAYMENT.find({end_date: { $gte: start, $lt: end },status:"ACTIVE"})
      let array=[];
      findData.map((element)=>{
        array.push(element.userId)
      })
      if (findData) {
        let postData = await PAYMENT.update({end_date: { $gte: start, $lt: end },status:"ACTIVE"},data,options);
        let userData = await USER.update( {_id: { $in: array }},{$set:{distribution:"Unsubscribe"}},options);
          console.log("data updated successfully",postData)
      }
      else{
        console.log("Not updated")
      }
  } catch (err) {
      console.log("catch error")
  }
};


//delete subscription by admin
_subscription.deletePayment = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let subscription = await PAYMENT.findOneAndRemove({
        _id: req.params.id,
      });
      if (subscription) {
        await setResponseObject(req, true, responseMessage.SUBSCRIPTION_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, responseMessage.err.message);
    next();
  }
};
module.exports = _subscription;