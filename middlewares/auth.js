/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";


const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const USER = require("../app/auth/model/auth.model");
const constant = require("../helper/constant");

dotenv.config();
const _tokenManager = {};

_tokenManager.authenticate = async (req, res, next) => {
  let token = getToken(req);
  //verify if authenticated user.
  const secret = process.env.JWT_SECRET || "Development";
  jwt.verify(token, secret, async (err, decoded) => {
    if (decoded) {
      req.userId = decoded._id;
      req.role = decoded.role;
      req.email = decoded.email;

      let checkValid = await USER.findOne({ email: decoded.email });
      if (!checkValid) {
        res.status(204).send({
          success: false,
          message: "No User Found",
        });
        return false;
      }
      return next();
    } else {
      res.status(403).json({
        success: false,
        dateCheck: constant.dateCheck,
        message: "Invalid token",
      });
    }
  });
};

const getToken = function (req) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

module.exports = _tokenManager;
