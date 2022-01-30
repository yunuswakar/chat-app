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
const UPDATETABLE = require("../model/updateTable.model");

const _text = {};

//update table by admin
_text.addTable = async (req, res, next) => {
  try {
    let criteria = { tableName: req.body.tableName };
    let data = req.body;
    let options = { new: true, upsert: true };
    let userData = await UPDATETABLE.findOneAndUpdate(criteria, data, options);
    if (userData) {
      await setResponseObject(
        req,
        true,
        responseMessage.CONTENT_EDITED,
        userData
      );
      next();
    } else {
      await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get text by id

_text.getById = async (req, res, next) => {
  try {
    let getText = await UPDATETABLE.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get all crystal eyes text
_text.getTable = async (req, res, next) => {
  try {
    let getText = await UPDATETABLE.find({});
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete text by admin
_text.delete = async (req, res, next) => {
  try {
    let user = await UPDATETABLE.findOneAndRemove({ _id: req.params.id });
    if (user) {
      await setResponseObject(req, true, responseMessage.CONTENT_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _text;
