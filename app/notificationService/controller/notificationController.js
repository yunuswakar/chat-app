/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const NOTIFICATION= require('../model/notificationModel')
const PUSHNOTIFICATION= require('../model/pushNotificationModel')
const ORDERNOTIFICATION= require('../model/orderNotificationModel')
 

const USER = require('../../userServices/model/userModel')
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const mailer= require('../../../helpers/nodeMailer');
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _notification = {};


//Send Notification via Email
_notification.notification = async (req, res) => {
    try {
        let data= req.body
        let findUser= await USER.findOne({email:data.email})
        if(!findUser){
            res.status(400).send({success:false,message:responseMessage.NOTFOUND('User')})
        }else{
            
            data.email = req.body.email;
            data.sendBy= req.userId
            data.subject = "Notification from Admin";
            data.message = mailer.NOTIHTML(data.message);
            // let sendNotification= await mailer.sendMail(data.email, data.subject, data.message)  //uncomment when have email access for send email
            // if(!sendNotification){
            //     res.status(400).send({success:false, message:responseMessage.ERRORONSENDMAIL}) 
            // }
            let result= await NOTIFICATION.create(data)
            res.send({
                status:200,
                success:true,
                message:responseMessage.VERIFICATION("Send"),
                data:result
            })
        }
    } catch (error) {
        res.status(400).send({success:false,message:responseMessage.SOMETHING_WRONG})
    }
};

_notification.getAllNotification= async(req, res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo) || 1;//set page no. if not exist then set to 1
        let pageSize = parseInt(req.query.pageSize) || 10;// set page Limit or default set to 10
        if (pageNo <= 0) {// throw error for invalid page no
            throw { message: responseMessage.PAGE_INVALID };
        }
        let count= await NOTIFICATION.find().countDocuments()
        let result= await NOTIFICATION.find().populate('sendBy sendTo','userName email')
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Notification')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result,count
        })
    } catch (error) {
        res.status(400).send({success:false,message:responseMessage.SOMETHING_WRONG})
    }
}
//Delete One Notification By Id
_notification.deletenotificationById= async(req, res)=>{
    try {
        let result= await NOTIFICATION.findByIdAndRemove({_id:req.params.id})
        console.log(result)
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Notification')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Notification'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get One Notification By Id
_notification.getById= async(req, res)=>{
    try {
        let result= await NOTIFICATION.findOne({_id:req.params.id}).populate('sendTo sendBy','userName email')
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Notification')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
_notification.getarray=async(req, res)=>{
    try {
        var array= [12,15,55,19,14,25]
        var secondMax= function(array){
            var max= Math.max.apply(null, array)
            array.splice(array.indexOf(max),1)
            return Math.max.apply(null,array)
        }
        var max2= secondMax(array)
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
_notification.getMax= async(req, res)=>{
    try {
        var persons = [
            {firstname : "Malcom", lastname: "Reynolds"},
            {firstname : "Kaylee", lastname: "Frye"},
            {firstname : "Jayne", lastname: "Cobb"}
          ];
        let fullname =function(item){
            var fulName= [item.firstname, item.lastname].join(' ')
            return fulName
        }
        let NewArr= persons.map(fullname)
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//Get all push notification
_notification.allNotification= async(req, res)=>{
    try {
        let result= await PUSHNOTIFICATION.find({sendTo:req.userId}).sort({createdAt:-1}).populate({path:"sendBy postId",select:"profileImg userName postImg thumbnail type"})
        let count = await PUSHNOTIFICATION.find({sendTo:req.userId,status:"unseen"}).countDocuments();
        if(!result.length){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Notification')
            })
            return
        }
        else{
            res.status(200).send({
                success:true,
                message:responseMessage.DATA_FOUND,
                data:result,
                count:count
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get all push notification
_notification.orderNotification= async(req, res)=>{
    try {
        let result= await ORDERNOTIFICATION.find({sendTo:req.userId}).sort({createdAt: -1})
        let count = await ORDERNOTIFICATION.find({sendTo:req.userId,status:"unseen"}).countDocuments();
        if(!result.length){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Notification')
            })
            return
        }
        else{
            res.status(200).send({
                success:true, 
                message:responseMessage.DATA_FOUND,
                data:result,
                count:count
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete order notification
_notification.deleteOrderNotification= async(req, res)=>{
    try {
        let result= await ORDERNOTIFICATION.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Notification')
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//Delete One 
_notification.deleteNotification= async(req, res)=>{
    try {
        let result= await PUSHNOTIFICATION.findByIdAndRemove({_id:req.params.id})
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Notification')
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//seen/unseen notification
_notification.seenUnseen= async(req, res)=>{
    try {
        let result= await PUSHNOTIFICATION.findOneAndUpdate({_id:req.params.id},{$set:{status:"seen"}})
        res.status(200).send({
            success:true,
            message:responseMessage.UPDATE_SUCCESS('Notification')
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//seen/unseen notification
_notification.seenUnseenOrder= async(req, res)=>{
    try {
        let result= await ORDERNOTIFICATION.findOneAndUpdate({_id:req.params.id},{$set:{status:"seen"}})
        res.status(200).send({
            success:true,
            message:responseMessage.UPDATE_SUCCESS('Notification')
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
module.exports = _notification;