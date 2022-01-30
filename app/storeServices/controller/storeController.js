/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const STORE = require('../model/storeModel'); // import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _store = {};

_store.addStore=async(req, res)=>{
    try {
        let data=req.body
        data.createdBy=req.userId
        let result= await STORE.create(data)
        res.status(200).send({
            success:true,
            message:responseMessage.SUCCESSS_EDIT('Store Add'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete Store By Id
_store.deleteById= async(req, res)=>{
    try {
        let result= await STORE.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Store')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Store'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get Store By Id
_store.getById= async(req, res)=>{
    try {
        let result= await STORE.find({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Store')
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
//Get all store added by Login user
_store.getOneUserStore= async(req, res)=>{
    try {
        let result= await STORE.find({createdBy:req.userId})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Store')
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
// Update Store Information
_store.updateStore= async(req, res)=>{
    try {
        let data = req.body;
        let result= await STORE.findOneAndUpdate({ _id: req.params.id },data,{new:true})
        res.status(200).send({
            success:true,
            message:responseMessage.UPDATE_SUCCESS('Store'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

module.exports = _store;