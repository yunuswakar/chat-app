/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const BLOCK = require ("../model/blockModel")
const POST = require("../../postService/model/postModel")
 const FOLLOW = require("../../followService/model/followModel")

const STORY = require("../../storyService/model/storyModel")
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _block = {};


//Block User
_block.blockUser= async(req,res)=>{
    try {
        let data= req.body
       
        data.blockedBy= req.userId
        if(req.userId==data.blockedTo){
            res.status(400).send({success:false,message:responseMessage.UNAUTHORIZED})
            return
        }
      
        let result= await BLOCK.create(data)

         let followData=await FOLLOW.findOne({user:req.userId})
         if (followData.followTo.length) {
            await FOLLOW.findOneAndUpdate({user:req.userId, followTo: { $in:data.blockedTo}},{
                $pull: { followTo: data.blockedTo }
            },{ new: true }) 
         }

         if (followData.followBy.length) {

            await FOLLOW.findOneAndUpdate({user:req.userId, followBy: { $in:data.blockedTo}},{
                $pull: { followBy: data.blockedTo } 
            },{ new: true })
         }       

         let blockedToFollow=await FOLLOW.findOne({user:data.blockedTo})

         if (blockedToFollow.followTo.length) {
            await FOLLOW.findOneAndUpdate({user:data.blockedTo, followTo: { $in:data.blockedBy}},{
                $pull: { followTo: data.blockedBy}
            },{ new: true }) 
         }
         if (blockedToFollow.followBy.length) {
            await FOLLOW.findOneAndUpdate({user:data.blockedTo, followBy: { $in:data.blockedBy}},{
                $pull: { followBy: data.blockedBy } 
            },{ new: true })
         }    

        let updatePost = await POST.updateMany({postedBy: data.blockedTo},{$set : {blockedUser: true}},{ multi: true, upsert: true });
        let updateStory = await STORY.updateMany({postedBy: data.blockedTo},{$set : {blockedUser: true}},{ multi: true, upsert: true });
        res.status(200).send({
            success:true,
            message:responseMessage.SUCCESS('User Blocked'),
            data:result
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message
        })
    }
}

//Unblock User
_block.unBlock=async(req, res)=>{
    try {
        let result= await BLOCK.findByIdAndRemove({_id:req.params.id})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Record')
            })
            return
        }
        // let updatePost = await POST.updateMany({postedBy: req.params.id},{$set : {blockedUser: false}},{ multi: true, upsert: true });
        // let updateStory = await STORY.updateMany({postedBy: data.blockedTo},{$set : {blockedUser: false}},{ multi: true, upsert: true }); 
        res.status(200).send({
            success:true,
            message:responseMessage.DELETE('Record'),
            data:result
        })
    } catch (error) {
        res.status(400).send({success:false, message:error.message})
    }
}
//Get List of Blocked User by Login User
_block.listing=async(req, res)=>{
    try {
        let criteria= req.userId 
        let result= await BLOCK.find({blockedBy:criteria}).populate('blockedTo')
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Record')
            })
            return
        }
        res.status(200).send({
            success:true,
            message:responseMessage.RECORDFOUND,
            data:result
        })
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:error.message
        })
    }
} 

module.exports = _block;