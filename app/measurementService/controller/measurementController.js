"use strict";
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.stripe_Key;

const MEASUREMENT = require("../model/measurementModel");
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
const _measurement = {};

_measurement.addMeasurement = async(req, res, next) => {
    try{    
        let data = req.body
        data.seller = req.userId
        console.log("Measurement:- ",data);
        let existed = await MEASUREMENT.findOne({measurement: data.measurement, seller: data.seller})
        if(existed){
            res.status(constant.badRequest).send({
                success: false,
                message: responseMessage.ALREADYEXIST('Measurement'),
            })
            return
        }
        let result = await MEASUREMENT.create(data);
        res.status(constant.success).send({
            success: true,
            message: responseMessage.ADD_SUCCESS('Measurement'),
            data: result
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_measurement.getMeasurementBySeller = async (req, res, next) => {
    try{
        let measurement = await MEASUREMENT.find({seller: req.userId});
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: measurement
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_measurement.deleteMeasurementBySeller = async (req, res, next) => {
    try{
        let result = await MEASUREMENT.findByIdAndDelete({_id: req.params.id})
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DELETE("Measurement"),
            data: result
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

module.exports = _measurement;