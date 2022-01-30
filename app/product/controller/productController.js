/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const PRODUCT= require ('../model/productModel')
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/product/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _product = {};


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
const upload = multer({ storage: storage }).single("productImg");

//Add product
_product.addProducts= async(req, res)=>{
    try {
        if(req.role!=3){
            res.status(400).send({
                success:false,
                message:responseMessage.UNAUTHORIZED
            })
            return
        }
        upload(req, res, async(err)=>{
            if(err){
                await setResponseObject(req, false, err.message, "");
            }
            else{
                let data = req.body;
                data.addedBy= req.userId
                if(req.file){
                    let image= req.file.path;
                    data.productImg= image
                }
                let result= await PRODUCT.create(data)
                res.status(200).send({
                    success:true,
                    message:responseMessage.ADD_SUCCESS('Prodcut'),
                    data:result
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}
//Listing of Products 
_product.getProducts= async(req, res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        let filter = {};
        if (req.query.search) {
           filter = {
            title: { $regex: req.query.search ? req.query.search : "", $options: 'i' }
          };
        }
        let count= await PRODUCT.find(filter).countDocuments()
        let result= await PRODUCT.find(filter)
        .populate({path:'addedBy', select:'-password'})
        .populate('subcategory', 'title')
        .populate('category', 'title')
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Product')
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

//Get One Product By Id
_product.getProductById= async(req, res)=>{
    try {
        let result= await PRODUCT.findOne({_id:req.params.id}).populate('addedBy','-password')
        .populate('subcategory', 'title')
        .populate('category', 'title')
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Product')
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

//Delete One Product By Id
_product.deleteProductById= async(req, res)=>{
    try {
        let result= await PRODUCT.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Product')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Product'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Update/Edit Product
_product.updateProduct= async(req, res)=>{
    try {
        let findUser= await PRODUCT.find({addedBy:req.userId})
        if(!findUser){
            res.status(400).send({
                success:false,
                message:responseMessage.UNAUTHORIZED
            })
            return 
        }
        if(req.role==0){
            res.status(400).send({
                success:false,
                message:responseMessage.UNAUTHORIZED
            })
            return
        }
        upload(req, res, async (err) => {
            if (err) {
                await setResponseObject(req, false, err.message, "");
            } else {
                let data = req.body;
                if (req.file) {
                    let image = req.file.path;
                    data.productImg = image;
                }
                let result= await PRODUCT.findOneAndUpdate({ _id: req.params.id },data,{new:true})
                res.status(200).send({
                    success:true,
                    message:responseMessage.UPDATE_SUCCESS('Product'),
                    data:result
                })
            }
        });
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get One Product By Id
_product.getProductByUserId= async(req, res)=>{
    try {
        let result= await PRODUCT.find({addedBy:req.userId}).populate('addedBy','-password')
        .populate('subcategory', 'title')
        .populate('category', 'title')
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Product')
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


module.exports = _product;