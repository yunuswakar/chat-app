"use strict";
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.stripe_Key;

const SIZE = require("../model/sizeModel");
// const ORDER = require("../../orderServices/model/orderModel");
// const USER = require("../../userServices/model/userModel")
// const ORDERNOTIFICATION = require("../../notificationService/model/orderNotificationModel");
const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject = require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
// const stripe = require("stripe")(secretKey);
// const commonFunction = require("../../../helpers/commonFunctions");
// const orderModel = require("../../orderServices/model/orderModel");
const constant = require("../../../helpers/constant");
const _size = {};

_size.addSize = async(req, res, next) => {
    try{    
        let data = req.body
        data.seller = req.userId
        console.log("Size:- ",data);
        let existed = await SIZE.findOne({size: data.size, seller: data.seller})
        if(existed){
            res.status(constant.badRequest).send({
                success: false,
                message: responseMessage.ALREADYEXIST('Size'),
            })
            return
        }
        let result = await SIZE.create(data);
        res.status(constant.success).send({
            success: true,
            message: responseMessage.ADD_SUCCESS('Size'),
            data: result
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_size.getSizeBySeller = async (req, res, next) => {
    try{
        let size = await SIZE.find({seller: req.userId});
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: size
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_size.deleteSizeBySeller = async (req, res, next) => {
    try{
        let result = await SIZE.findByIdAndDelete({_id: req.params.id})
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DELETE("Size"),
            data: result
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

module.exports = _size;