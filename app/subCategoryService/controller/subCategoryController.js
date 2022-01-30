/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const  SUBCATEGORY = require('../model/subCategoryModel') // import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _subcategory = {};



//Add SubCategory
_subcategory.addSubCategory= async(req, res)=>{
    try {
        let data = req.body;
        let result= await SUBCATEGORY.create(data)
        res.status(200).send({
            success:true,
            message:responseMessage.ADD_SUCCESS('Sub-Category'),
            data:result
        })
       
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete One Sub Category By Id
_subcategory.deleteSubCategoryById= async(req, res)=>{
    try {
        let result= await SUBCATEGORY.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Sub-Category')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Sub-Category'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//Get All Sub Category
_subcategory.getSubCategory= async(req, res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        let count= await SUBCATEGORY.find().countDocuments()
        let result= await SUBCATEGORY.find().populate('category')
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Sub-Category')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result,count
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get One Sub Category By Id
_subcategory.getSubCategoryById= async(req, res)=>{
    try {
        let result= await SUBCATEGORY.find({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Sub-Category')
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

//Update Subcategory
_subcategory.updateSubCategory= async(req, res)=>{
    try {
        let data = req.body;
        let result= await SUBCATEGORY.findOneAndUpdate({ _id: req.params.id },data,{new:true})
        res.status(200).send({
            success:true,
            message:responseMessage.UPDATE_SUCCESS('Sub-Category'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

    

module.exports = _subcategory;