/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const fs = require("fs");
const multer = require("multer");
const dir = "./uploads/images/";
const mongoose = require("mongoose");
const responseMessage = require("../../../helper/responseMessages");
const setResponseObject =
  require("../../../helper/commonFunctions").setResponseObject;

const constant = require("../../../helper/constant");
const STATIC = require("../model/static.model");
const USER = require("../../auth/model/auth.model");
const UPDATETABLE = require("../../updateTable/model/updateTable.model");

//multer
var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");
const _static = {};

//update Terms and Condition

_static.addContent = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let data = req.body;
      let result = await new STATIC(data).save();
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
// get text by id
_static.getText = async (req, res, next) => {
  try {
    let getText = await STATIC.findOne({ location: 3 });
    if (getText) {
      await setResponseObject(req, true, responseMessage.RECORDFOUND, getText);
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

//update heading by admin
_static.updateText = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let criteria = { _id: req.params.id };
      let data = req.body;
      let options = { new: true };
      let userData = await STATIC.findOneAndUpdate(criteria, data, options);
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
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//update tutorial by admin
_static.updateTutorial = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let criteria = { _id: req.params.id };
      let data = req.body;
      let options = { new: true };
      let userData = await STATIC.findOneAndUpdate(criteria, data, options);
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
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

_static.getAllData = async (req, res, next) => {
  try {
    let getContent = await STATIC.find();
    if (getContent) {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getContent
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
// get Content detail by id
_static.getById = async (req, res, next) => {
  try {
    let getContent = await STATIC.findOne({ _id: req.params.id });
    await setResponseObject(req, true, responseMessage.RECORDFOUND, getContent);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_static.getByHeading = async (req, res, next) => {
  try {
    let getContent = await STATIC.find({ label: req.params.label });
    if (getContent) {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getContent
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_static.getOne = async (req, res, next) => {
  try {
    let getContent = await STATIC.findOne({ label: req.params.label });
    if (getContent) {
      await setResponseObject(
        req,
        true,
        responseMessage.RECORDFOUND,
        getContent
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//Get All Contents by admin
_static.getContents = async (req, res, next) => {
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

      if (req.query.search) {
        filter.label = {
          $regex: req.query.search ? req.query.search : "",
          $options: "i",
        };
      }

      let count = await STATIC.find(filter).countDocuments();
      let result = await STATIC.find(filter)
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

      await setResponseObject(req, true, responseMessage.RECORDFOUND, {
        result,
        count: count,
      });
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//delete content by admin
_static.delete = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      let user = await STATIC.findOneAndRemove({ _id: req.params.id });
      if (user) {
        await setResponseObject(req, true, responseMessage.CONTENT_DELETE);
        next();
      }
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
//config data
_static.configData = async (req, res, next) => {
  try {
    let configData = await STATIC.aggregate([
      {
        $lookup: {
          from: "statics",
          localField: "_id",
          foreignField: "mainHeading",
          as: "data",
        },
      },
    ]);
    await setResponseObject(req, true, responseMessage.RECORDFOUND, configData);
    next();
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};
_static.updateContent = async (req, res, next) => {
  try {
    let admin = await USER.findOne({ _id: req.userId, role: "ADMIN" });
    if (!admin) {
      await setResponseObject(req, false, responseMessage.NO_USER);
      next();
    } else {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          let criteria = { _id: req.params.id };
          delete req.body.heading;
          let data = req.body;
          if (req.file) {
            let image = req.file.path;
            data.image = image;
          }
          let options = { new: true, upsert: true };

          let userData = await STATIC.findOneAndUpdate(criteria, data, options);
          if (userData) {
            await setResponseObject(
              req,
              true,
              responseMessage.CONTENT_EDITED,
              userData
            );
            next();
          } else {
            if (req.file) {
              fs.unlinkSync(req.file.path);
            }
            await setResponseObject(
              req,
              false,
              responseMessage.ERROR_ON_UPDATE
            );
            next();
          }
        }
      });
    }
  } catch (err) {
    await setResponseObject(req, false, err.message);
    next();
  }
};

module.exports = _static;
