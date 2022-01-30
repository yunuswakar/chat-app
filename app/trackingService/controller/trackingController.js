/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const TRACKING = require("../model/trackingModel");
const CART = require("../../cartServices/model/cartModel");
const PRODUCT = require("../../productService/model/productModel");
const ORDER = require("../../orderServices/model/orderModel");

const ADDRESS = require("../../userServices/model/addressModel");
const ORDERNOTIFICATION = require("../../notificationService/model/orderNotificationModel");
const USERS = require("../../userServices/model/userModel")
const Constant =require("../../../helpers/constant")
const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files

const commonFunction = require("../../../helpers/commonFunctions");
const constant = require("../../../helpers/constant");
const _tracking = {};

//update tracking
_tracking.updateTracking= async (req, res) => {
  try {
    let data = req.body;
    let saveData= await new TRACKING(data).save();
    let updateOrder=await ORDER.findOneAndUpdate({orderId:req.body.orderId,_id:req.body.order_id},{$set:{status:req.body.status}},{new:true})
    let seller = await USERS.findOne({_id: updateOrder.booked_by})
    var obj = {}
    if(req.body.status == constant.Delivered){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order has been successfully delivered`,updateOrder.orderId)
      obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order has been successfully delivered`,
        message:`Dear ${seller.userName}! Your Order has been successfully delivered`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }else if(req.body.status == constant.Confirmed){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order has been confirmed`)
      obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order has been confirmed`,
        message:`Dear ${seller.userName}! Your Order has been confirmed`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }else if(req.body.status == constant.Cancelled){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order has been cancelled`)
      obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order has been cancelled`,
        message:`Dear ${seller.userName}! Your Order has been cancelled`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }else if(req.body.status == constant.Packed){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order has been packed`)
       obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order has been packed`,
        message:`Dear ${seller.userName}! Your Order has been packed`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }else if(req.body.status == constant.InProgress){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order is in progress`)
      obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order is in progress`,
        message:`Dear ${seller.userName}! Your Order is in progress`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }else if(req.body.status == constant.Returned){
      let pushNot=await commonFunction.pushNotification(seller.fcmToken, "Fambase", `Dear ${seller.userName}! Your Order is successfully returned`)
      obj={
        sendBy:updateOrder.sellerId,
        sendTo:seller._id,
        title: "famebase",
        body:`Dear ${seller.userName}! Your Order is successfully returned`,
        message:`Dear ${seller.userName}! Your Order is successfully returned`,
        notificationType: "Order",
        your_custom_key: "Order",
        orderId: updateOrder.orderId
      }
    }
    
  let results = await new ORDERNOTIFICATION(obj).save();
    res.status(constant.success).send({
      success: true,
      message: responseMessage.VERIFICATION("Order updated"),
      data: saveData,
      your_custom_key: "Order",
      orderId: updateOrder.orderId
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
_tracking.getTracking = async (req, res) => {
  try {
    let mydata = await TRACKING.aggregate([
      {$match:{orderId:req.query.id}},
      {$match:{product:mongoose.Types.ObjectId(req.query.productid)}},

      {
        $lookup: { 
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {$sort:{"createdAt":-1}},

    ]);
      res.status(constant.success).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:mydata
    })
    
  } catch (error) {
        res.status(constant.badRequest).send({
          success:false,
          message:error.message
      })
  }
};

_tracking.getAllTracking = async (req, res) => {
  try {
    let pageSize = parseInt(req.query.pageSize) || Constant.pageSize
    let pageNo = parseInt(req.query.pageNo);
    
    let mydata = await TRACKING.aggregate([
      {$match:{status:constant.Confirmed}},

      {
        $lookup: { 
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {$sort:{"createdAt":-1}},

      { $skip: pageSize * (pageNo - 1) },
      { $limit: pageSize },
    ]);
      res.status(constant.success).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:mydata
    })
    
  } catch (error) {
        res.status(constant.badRequest).send({
          success:false,
          message:error.message
      })
  }
};
_tracking.getUserTracking = async (req,res) => {
  try {
    let mydata = await TRACKING.aggregate([
      {$match:{orderId:req.query.id}},
      {$match:{booked_by:mongoose.Types.ObjectId(req.query.booked_by)}},
      {$match:{product:mongoose.Types.ObjectId(req.query.product)}},

      {
        $lookup: { 
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {$sort:{"createdAt":1}},

    ]);
      res.status(constant.success).send({
        success:true,
        message:responseMessage.DATA_FOUND,
        data:mydata
    })
    
  } catch (error) {
        res.status(constant.badRequest).send({
          success:false,
          message:error.message
      })
  }
};
//Delete One 
_tracking.delete= async(req, res)=>{
  try {
      let result= await TRACKING.findByIdAndRemove({_id:req.params.id})
      res.status(constant.success).send({
          success:true,
          message:responseMessage.DELETE('Data')
      })
  } catch (error) {
      res.status(constant.badRequest).send({
          success:false,
          message:error.message
      })
  }
}

module.exports = _tracking;
 