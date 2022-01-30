"use strict";

const CONTACTUSER = require('../Model/contactUserModel')// import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
    .setResponseObject;
const _contactUser = {};

_contactUser.contactUserAdmin = async (req, res) => {
    try {
        let data = req.body;
        data.contactBy = req.userId
        let result = await CONTACTUSER.create(data)
        res.status(200).send({
            success: true,
            message: responseMessage.VERIFICATION('Contact Admin'),
            data: result
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = _contactUser;