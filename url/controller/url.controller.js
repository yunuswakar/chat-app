/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const URL = require("../../app/url/model/urlModel");
const mongoose = require("mongoose");
const responseMessage = require("../../helpers/responseMessages");
const setResponseObject = require("../../helpers/commonFunctions")
  .setResponseObject;
const _url = {};

_url.postRedirect = async (req, res, next) => {
  try {
    let redirectLink = req.body.redirectLink;
    let checkRedirectLink = await new URL(redirectLink).save();

    if (checkRedirectLink) {
      await setResponseObject(req, true, responseMessage.ADD_SUCCESS("Url"));
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err, "");
    next();
  }
};
_url.getRedirect = async (req, res, next) => {
  try {
    let redirectLink = req.body.redirectLink;

    // let getRedirectLink = await URL.findOne({
    //   redirectLink: 1,
    // });
    let getRedirectLink = await URL.find();

    if (getRedirectLink) {
      await setResponseObject(
        req,
        true,
        responseMessage.ADD_SUCCESS("Url"),
        "",
        getRedirectLink
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err, "");
    next();
  }
};

module.exports = _url;
