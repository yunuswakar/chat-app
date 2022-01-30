/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const BANNER = require("../model/bannerModel");
const mongoose = require("mongoose"); // set rules for mongoose id
const multer = require("multer"); // for file save on server
const dir = "./uploads/product/"; // declare path of upload dir on server
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const _banner = {};

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  {
    name: "bannerImgs",
  },
]);

//Add Products to the Cart
_banner.addBanner = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        await setResponseObject(req, false, err.message, "");
      } else {
        let data = req.body;
        data.addedBy = req.userId;
        // if (req.files.bannerImgs) {
        //   let image = req.files.bannerImg[0].path;
        //   data.bannerImg = image;
        // }
        if (req.files.bannerImgs) {
          let image = [];
          req.files.bannerImgs.map((data) => {
            image.push(data.path);
          });
          data.bannerImgs = image;
        }
        let result = await BANNER.create(data);
        res.status(200).send({
          success: true,
          message: responseMessage.ADD_SUCCESS("Banner Image"),
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

//Edit Banners of the Cart
_banner.editBanner = async (req, res) => {
  try {
    let updation = await CART.findOneAndUpdate(
      { product: data.product, addedBy: req.userId },
      { $set: { quantity: quantity } },
      { new: true }
    );
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_NOTFOUND("Record"),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.DELETE("Record"),
      data: result,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: responseMessage.SOMETHING_WRONG });
  }
};

//Get List of Banners
_banner.getBanners = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      throw { message: message.PAGE_INVALID };
    }
    let result = await BANNER.find()
      .populate("subcategory", "title")
      .populate("category", "title")
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ createdAt: -1 });
    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Banner "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.RECORDFOUND,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

_banner.deleteBanners = async (req, res) => {
  try {
    let result = await BANNER.findOneAndRemove({ _id: req.params.id });

    if (!result) {
      res.status(400).send({
        success: false,
        message: responseMessage.RECORD_FOUND("No Banner "),
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: responseMessage.REMOVEDSUCCESSS("Banner"),
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: responseMessage.SOMETHING_WRONG,
    });
  }
};

module.exports = _banner;
