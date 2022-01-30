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
const _operation = {};
const multer = require("multer");
const dir = "./uploads/images/";
const fs = require("fs");
const yourhandle = require("countrycitystatejson");
const CRYSTAL = require("../../crystal/model/crystal.model");
const AUTOID = require("../../crystal/model/autoIdHistory.model");
const LOGTABLE = require("../../crystal/model/logTable.model");

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("storeImage", 2);
const uploadDocs = multer({ storage: storage }).array("files");

// get Store detail by id
//Get All Users
_operation.getApiLog = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);

    let filter = {};
    if (req.query.search) {
      filter.crystalName = {
        $regex: req.query.search ? req.query.search : "",
        $options: "i",
      };
    }
    let count = await AUTOID.find(filter).countDocuments();
    let result = await AUTOID.find(filter)
      .sort({ confidence: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate("added_by");

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_operation.logTable = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);

    let filter = {};

    let count = await LOGTABLE.find(filter).countDocuments();
    let result = await LOGTABLE.find(filter)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    await setResponseObject(req, true, responseMessage.RECORDFOUND, {
      result,
      count,
    });
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//delete crystal by admin
_operation.delete = async (req, res, next) => {
  try {
    let user = await AUTOID.findOneAndRemove({ _id: req.params.id });
    if (user) {
      await setResponseObject(req, true, responseMessage.DATA_DELETE);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get operation log
_operation.getOne = async (req, res, next) => {
  try {
    let getLog = await AUTOID.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getLog);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// delete all api log
_operation.apiData = async (req, res, next) => {
  try {
    let query = {};
    if (req.body.fromDate && req.body.toDate) {
      query.$and = [
        {
          createdAt: { $gte: req.body.fromDate },
        },
        {
          createdAt: { $lte: req.body.toDate },
        },
      ];
    }

    if (req.body.fromDate && !req.body.toDate) {
      query.createdAt = { $gte: req.body.fromDate };
    }
    if (!req.body.fromDate && req.body.toDate) {
      query.createdAt = { $lte: req.body.toDate };
    }

    let getLog = await AUTOID.find(query);
    let array = [];
    getLog.map((a) => {
      array.push(a._id);
    });

    let deleteData = await AUTOID.deleteMany({ _id: { $in: array } });

    await setResponseObject(req, true, responseMessage.RECORDFOUND, getLog);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

// delete all api log
_operation.logData = async (req, res, next) => {
  try {
    let query = {};
    if (req.body.fromDate && req.body.toDate) {
      query.$and = [
        {
          createdAt: { $gte: req.body.fromDate },
        },
        {
          createdAt: { $lte: req.body.toDate },
        },
      ];
    }

    if (req.body.fromDate && !req.body.toDate) {
      query.createdAt = { $gte: req.body.fromDate };
    }
    if (!req.body.fromDate && req.body.toDate) {
      query.createdAt = { $lte: req.body.toDate };
    }

    let getLog = await LOGTABLE.find(query);
    let array = [];
    getLog.map((a) => {
      array.push(a._id);
    });

    let deleteData = await LOGTABLE.deleteMany({ _id: { $in: array } });

    await setResponseObject(req, true, responseMessage.RECORDFOUND, getLog);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _operation;
