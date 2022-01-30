/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const constant = require("../helpers/constant");// set constant from file
// for encryption and decryption crypto js is used
const CryptoJS = require("crypto-js");
const responseMessage = require("../helpers/responseMessages");// for static response message
let respObject = {
    success: false,
    dateCheck: constant.dateCheck,
};
module.exports.RESPONSE = async(req, res) => {
    try {

        // return error or success response
        if (req.newRespData) {
            if(req.newRespData.typeStatus){
                return res.json(req.newRespData)
            }
            if (req.newRespData.success) {
                res.status(200).json(req.newRespData);
            } else {
                res.status(400).json(req.newRespData);
            }
        
        }
    } catch (error) {
        // throw exception message
        respObject["message"] = responseMessage["SOMETHING_WRONG"];
        res.status(400).json(respObject);
    }
};
