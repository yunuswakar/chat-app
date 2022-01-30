/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const constant = require("../helper/constant");

module.exports.RESPONSE = (req, res) => {
  try {
    let respObject = {
      success: false,
      dateCheck: constant.dateCheck,
    };
    if (req.newRespData) {
      if (req.newRespData.success) {
        res.status(200).json(req.newRespData);
      } else {
        res.status(400).json(req.newRespData);
      }
    }
  } catch (error) {
    respObject["message"] = responseMessages["SOMETHING_WRONG"];
    res.status(400).json(respObject);
  }
};
