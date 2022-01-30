/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";
const mongoose = require("mongoose");
const moment = require("moment");

const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;
const NOTIFICATIONS = require("../model/notifications.model");
const _notifications = {};
const USER = require("../../auth/model/auth.model");

_notifications.getNotification = async (req, res, next) => {
  try {
    let filter = { receiverId: req.userId };
    let data = await NOTIFICATIONS.find(filter);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, data);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message, "");
    next();
  }
};

// add Notification by admin
_notifications.createNotification = async (data) => {
  try {
    let user = await USER.findOne({ _id: mongoose.Types.ObjectId(data.from) });
    data.title = user.first_name + " " + user.first_name + data.title;
    let result = await new NOTIFICATIONS(data).save();
  } catch (err) {
    await setResponseObject(req, false, err.message, "");
    next();
  }
};

//send push notification in bithdate
_notifications.sendNotificationUser = async (data) => {
  try {
    let user = await USER.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: "$createdAt" }, { $dayOfMonth: new Date() }] },
          { $eq: [{ $month: "$createdAt" }, { $month: new Date() }] },
        ],
      },
    });
    let result = await new NOTIFICATIONS(data).save();
  } catch (err) {
    await setResponseObject(req, false, err.message, "");
    next();
  }
};

//get all notification  by user
_notifications.getNotificationData = async (req, res, next) => {
  try {
    let criteria = { receiverId: req.body.receiverId };
    let getNews = await NOTIFICATIONS.find(criteria);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getNews);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete notification by user
_notifications.delete = async (req, res, next) => {
  try {
    let homeData = await NOTIFICATIONS.findOneAndRemove({ _id: req.params.id });
    if (homeData) {
      await setResponseObject(req, true, responseMessage.DATA_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
module.exports = _notifications;
