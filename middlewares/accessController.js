/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

const _accessManager = {};
const responseMessages = require("../helpers/responseMessages"); // import common static response

_accessManager.adminAccess = async (req, res, next) => { // set admin access
    if (req.role && req.role === "ADMIN") {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};

_accessManager.TAEAccess = async (req, res, next) => {// set tae access
    if (req.role && req.role === "TAE") {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};

_accessManager.userAccess = async (req, res, next) => { // set user access
    if (req.role && req.role === "USER") {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};

_accessManager.userAccess = async (req, res, next) => {
    if (req.role && req.role === "USER") {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};

_accessManager.adminUserAccess = async (req, res, next) => {
    if (req.role && (req.role === "USER" || req.role === "ADMIN")) {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};

_accessManager.adminTAEAccess = async (req, res, next) => {
    if (req.role && (req.role === "TAE" || req.role === "ADMIN")) {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: responseMessages.INVALID_ACCESS
        });
    }
};
module.exports = _accessManager;
