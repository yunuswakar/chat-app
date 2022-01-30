/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

// check token
const responseMessage = require("../helpers/responseMessages");// for static response message
const setResponseObject = require("../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
  const _authManager = {};
  _authManager.checkAuthentication = async (req, res, next) => {
    if(req.role !== 2 && req.role !== 1){
        await setResponseObject(req, false, responseMessage.UNAUTHORIZED?responseMessage.UNAUTHORIZED:responseMessage.SOMETHING_WRONG, "");
        next();
    }else{
        next();
    }

}

module.exports = _authManager;