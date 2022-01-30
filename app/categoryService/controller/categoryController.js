/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const CATEGORY = require("../../categoryService/model/categoryModel"); // import user model to perform crud operation
const SUBCATEGORY = require ("../../subCategoryService/model/subCategoryModel")
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/category/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant");// some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _category = {};

//multer
var storage = multer.diskStorage({
    /* destination*/
    destination: function (req, file, cb) {
    cb(null, dir);
    },
    filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage }).single("catImg");


//Add Category
_category.addCategory= async(req, res)=>{
    try {
        upload(req, res, async (err) => {
            if (err) {
                await setResponseObject(req, false, err.message, "");
            } else {
                let data = req.body;
                data.postedBy= req.userId
                if (req.file) {
                    let image = req.file.path;
                    data.catImg = image;
                }
                let result= await CATEGORY.create(data)
                res.status(200).send({
                    success:true,
                    message:responseMessage.ADD_SUCCESS('Category'),
                    data:result
                })
            }
        });
    } 
    catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete One Category By Id
_category.deleteCategoryById= async(req, res)=>{
    try {
        let result= await CATEGORY.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Category'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

   //Get All Category
_category.getCategory= async(req, res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        let count= await CATEGORY.find().countDocuments()
        let result= await CATEGORY.find()
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
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

   //Get All Category without Pagination
_category.getCategories= async(req, res)=>{
    try {
        let result= await CATEGORY.find()
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
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

   //Get One Category By Id
_category.getCategoryById= async(req, res)=>{
    try {
        let result= await CATEGORY.findOne({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
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

   //Get all subcategory of One Category By Id
   _category.getAllSubCategoryById= async(req, res)=>{
    try {
        let result= await CATEGORY.findOne({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
            })
            return
        }
        let criteria = req.params.id
        let getSubcategory = await SUBCATEGORY.find({ category: mongoose.Types.ObjectId(criteria) })
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:getSubcategory
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Update/Edit Category
_category.updateCategory= async(req, res)=>{
    try {
        upload(req, res, async (err) => {
            if (err) {
                await setResponseObject(req, false, err.message, "");
            } else {
                let data = req.body;
                if (req.file) {
                    let image = req.file.path;
                    data.catImg = image;
                }
                let result= await CATEGORY.findOneAndUpdate({ _id: req.params.id },data,{new:true})
                res.status(200).send({
                    success:true,
                    message:responseMessage.UPDATE_SUCCESS('Category'),
                    data:result
                })
                let criteria = req.params.id
                if(result.status == true)
               {
                    let updateSubcategoryTrue = await SUBCATEGORY.updateMany({ category: mongoose.Types.ObjectId(criteria)},
                    {$set:{status:true}},
                    { multi: true })
                    res.status(200).send({
                        success:true,
                        data:updateSubcategoryTrue
                    })
                }else{
                    let updateSubcategoryFalse = await SUBCATEGORY.updateMany({ category: mongoose.Types.ObjectId(criteria)},
                    {$set:{status:false}}, 
                    { multi: true })
                    res.status(200).send({
                        success:true,
                        data:updateSubcategoryFalse
                    })
                }
            }
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get All Category without pagination
_category.getAllCategory= async(req, res)=>{
    try {
        let result= await CATEGORY.find({status:true})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Category')
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

module.exports = _category;