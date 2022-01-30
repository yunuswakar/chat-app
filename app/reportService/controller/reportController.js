/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const REPORT = require("../../reportService/model/reportModel")
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const { schema } = require("../../reportService/model/reportModel");
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _report = {};


//Report User and Post
_report.reportUserandPost= async(req,res)=>{
    try {
        let data= req.body
        data.reportedBy= req.userId
        let result= await REPORT.create(data)
        res.status(200).send({
            success:true,
            message:responseMessage.SUCCESS('Reported'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//Get List of all User reports
_report.getListing= async(req, res, next)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        // if(req.role !== 2 && req.role !== 1){
        //     throw {message:responseMessage.UNAUTHORIZED}
        //     next()
        // }
        let count= await REPORT.find( { reportedTo: { $exists: true } }).countDocuments()
        let result= await REPORT.find( { reportedTo: { $exists: true } } )
        .populate({path:'reportedTo , reportedBy', select :'-password'})
        // .populate({path:'reportedBy', select :'-password'})
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        res.status(200).send({
            success:true,
            message:responseMessage.RECORD_FOUND("Reported List"),
            data:result,count
        })
    } catch (error) {
        await setResponseObject(req, false, error.message?error.message:responseMessage.SOMETHING_WRONG, "");
        next()
    }
}

//Get List of all Post reports
_report.getPostListing= async(req, res, next)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        if(req.role !== 2 && req.role !== 1){
            throw {message:responseMessage.UNAUTHORIZED}
            next()
        }
        let count= await REPORT.find( { postReport: { $exists: true } } ).countDocuments()
        let result= await REPORT.find( { postReport: { $exists: true } } )
        .populate({path:'reportedBy', select :'-password'})
        .populate({path:'postReport'})
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        res.status(200).send({
            success:true,
            message:responseMessage.RECORD_FOUND("Reported List"),
            data:result,count
        })
    } catch (error) {
        await setResponseObject(req, false, error.message?error.message:responseMessage.SOMETHING_WRONG, "");
        next()
    }
}

   //Get One Post By Id
_report.getReportById= async(req, res)=>{
    try {
        let result= await REPORT.find({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Report')
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

    //Delete One Report By Id
_report.deleteReportById= async(req, res)=>{
    try {
        let result= await REPORT.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Report')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Post'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

   //Edit One Post By Id
_report.editReportById= async(req, res)=>{
    try {
        let data=req.body;
        let result= await REPORT.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Report')
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

module.exports = _report;