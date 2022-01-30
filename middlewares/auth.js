/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

// for authentication check uses json web token
const jwt = require("jsonwebtoken");
const responseMessage = require("../helpers/responseMessages")// constant message  used on some files
const setResponseObject = require("../helpers/commonFunctions")// for common functions used on some files
const USER  = require("../app/userServices/model/userModel");
// as middleware set 
const dotenv = require("dotenv");
// for user schema set
// for constant values get
const constant = require("../helpers/constant");
dotenv.config();
const _tokenManager = {};
// for data encrypt decryption crypto is used
const CryptoJS = require("crypto-js");
// check token
_tokenManager.authenticate = async (req, res, next) => {


  if (req.headers['x-token']) {
    let token = getToken(req);
    //verify if authenticated user.

    
    const secret = process.env.JWT_SECRET || "Development";
    jwt.verify(token, secret, async (err, decoded) => {// token verify
      if (decoded) {
        // if token verified then set req keys to middlewares
        req.userId = decoded._id;
        req.role = decoded.role;
        req.userName = decoded.userName;
        let checkToken = await USER.findOne({_id:decoded._id,token:token});
        if(!checkToken){
          res.status(403).json({ // return for invalid token
            success: false,
            dateCheck: constant.dateCheck,
            message: "Invalid token",
          });
          return;
        }
        next();
      } else {
        res.status(403).json({ // return for invalid token
          success: false,
          dateCheck: constant.dateCheck,
          message: "Invalid token",
        });
      }
    });
  } else {

    res.status(403).json({ // return for invalid token
      success: false,
      dateCheck: constant.dateCheck,
      message: "Token is not Provided ",
    });
    // next()
  }
 
};

// get token from headers
const getToken = function (req) {
  if (
    req.headers &&
    req.headers['x-token'] &&
    req.headers['x-token'].split(" ")[0] === "Bearer"
  ) {
    return req.headers['x-token'].split(" ")[1];
  }

  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};

module.exports = _tokenManager;
