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
const PAGE = require("../model/pages.model");

const _text = {};

//add crystal eyes text

_text.addPage = async (req, res, next) => {
  try {
    let page = await PAGE.findOne({ page: req.body.page });
    let data = req.body;
    if (page) {
      await setResponseObject(
        req,
        false,
        responseMessage.ALREADYEXIST(data.page)
      );
      next();
    } else {
      let result = await new PAGE(data).save();
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
// get pages
_text.getAllPage = async (req, res, next) => {
  try {
    let getText = await PAGE.find();
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete content by admin
_text.delete = async (req, res, next) => {
  try {
    let user = await PAGE.findOneAndRemove({ _id: req.params.id });
    if (user) {
      await setResponseObject(req, true, responseMessage.PAGE_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All Contents by admin
_text.getPages = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize) || 57;
    if (page <= 0) {
      throw responseMessage.PAGE_INVALID;
    }
    let filter = {};
    let count = await PAGE.find(filter).countDocuments();
    let result = await PAGE.find(filter)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

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
