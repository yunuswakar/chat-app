/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const COMMENT = require("../../productCommentService/model/productCommentModel")
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const { schema } = require("../../reportService/model/reportModel");
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _report = {};

//product comment by user
_report.commentProduct= async(req,res)=>{
    try {
        let data= req.body
        data.commentBy= req.userId
        let result= await COMMENT.create(data)
        res.status(200).send({
            success:true,
            message:responseMessage.SUCCESS('Comment added'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
   //Get all comment by product
_report.getComment= async(req, res)=>{
    try {
        let result= await COMMENT.find({productId:req.params.id}).sort({createdAt:-1}).populate("productId commentBy")
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Comment')
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

    //Delete One comment by id
_report.deleteComment= async(req, res)=>{
    try {
        let result= await COMMENT.findByIdAndRemove({_id:req.params.id,commentBy:req.userId})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Comment')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Comment'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

   //Editcomment by id
_report.editComment= async(req, res)=>{
    try {
        let data=req.body;
        let result= await COMMENT.findByIdAndUpdate({_id:req.params.id},data,{new:true})
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