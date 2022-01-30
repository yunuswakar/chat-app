
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
const CRITERIA = require("../model/contentCriteria.model");
const CONTENTCREATION = require("../../home/model/contentCreation.model");

const _text = {};

//add  content criteria
_text.addCriteria = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await new CRITERIA(data).save();
    if (data) {
      await setResponseObject(req, true, responseMessage.ADD, data);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get criteria by id

_text.getById = async (req, res, next) => {
  try {
    let getText = await CRITERIA.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//get criteria text
_text.getAll = async (req, res, next) => {
  try {
    let getText = await CRITERIA.find({});
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete criteria by admin
_text.delete = async (req, res, next) => {
  try {
    let user = await CRITERIA.findOneAndRemove({ _id: req.params.id });
    if (user) {
      await setResponseObject(req, true, responseMessage.CONTENT_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//update text by admin
_text.updateCriteria = async (req, res, next) => {
  try {
    let criteria = { _id: req.params.id };
    let data = req.body;
    let options = { new: true };
    let textData = await CRITERIA.findOneAndUpdate(criteria, data, options);
    if (textData) {
      await setResponseObject(
        req,
        true,
        responseMessage.CONTENT_EDITED,
        textData
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

_text.updateCriteriaData = async (req, res, next) => {
  try {
    let result = await CRITERIA.findOne({ _id: req.params.id });
    if (result) {
      let criteria = { _id: req.params.id };
      let data = req.body;
      let options = { new: true, multi: true };
      let textData = await CRITERIA.findOneAndUpdate(criteria, data, options);
      if (textData) {
        let updateData = await CONTENTCREATION.updateMany(
          { notificationCriteria: req.body.name },
          data,
          options
        );
        await setResponseObject(
          req,
          true,
          responseMessage.CONTENT_EDITED,
          textData
        );
        next();
      } else {
        await setResponseObject(req, false, responseMessage.ERROR_ON_UPDATE);
        next();
      }
    } else {
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
module.exports = _text;
