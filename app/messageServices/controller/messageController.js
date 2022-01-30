/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const { MESSAGECONSTANTS, MESSAGE } = require("../model/messageModel");
const USER = require('../../userServices/model/userModel')
const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const multer = require("multer");
const commonFunction = require("../../../helpers/commonFunctions");
const _message = {};
const dir = './uploads/post';
const constant = require("../../../helpers/constant")

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
const upload = multer({ storage: storage }).fields([{ name: 'image' }, { name: 'postVideo'},{name:'thumbnail'}])

//Send Message
_message.sendMessage = async (req, res) => {

upload(req, res, async(err) => {
    if(err){
      await setResponseObject(req, false, err.message, "");
    }else{
      let data = req.body;
      data.senderId = req.userId;
      if (req.files.image) {
        let image = req.files.image[0].path;
        data.image = image;
        data.messageType = constant.messageFile
      }else{
        data.messageType = constant.messageText
      }

      let receiverUser = await USER.findOne({_id: data.receiverId})
      let senderUser = await USER.findOne({_id: data.senderId})
      
      MESSAGECONSTANTS.findOneAndUpdate(
        {
          // match with sender and receiver id with and, or case
          $or: [
            {
              $and: [
                {
                  senderId: data.senderId,
                },
                {
                  receiverId: data.receiverId,
                },
              ],
            },
            {
              $and: [
                {
                  senderId: data.receiverId,
                },
                {
                  receiverId: data.senderId,
                },
              ],
            },
          ],
        },
        {
          // upsert sender and receiver if record not exist
          senderId: data.senderId,
          receiverId: data.receiverId,
          updatedAt: Date.now(),
        },
        {
          // take upsert and new true for record new detail and
          upsert: true,
          new: true,
        },
        (err, result) => {
          if (err){
            res.status(400).send({
              success:false,
              message:err.message
            })
          }else{
            data.chatId = result._id;
          var userChat = new MESSAGE(data);
          userChat.save((err, results) => {
            if (err){
              res.status(400).send({
                  success:false,
                  message:err.message
              })
            }else{
              MESSAGECONSTANTS.findByIdAndUpdate(
                result._id,
                {
                  lastmsgId: results._id,
                  updatedAt: Date.now(),
                },
                async (err, result) => {
                  if (err){
                    res.status(400).send({
                      success:false,
                      message:err.message
                    })
                  }else{
                    let pushNot=await commonFunction.messagePushNotification(receiverUser.fcmToken, "Fambase", `You have a new message from ${senderUser.userName}!`,receiverUser.userName,senderUser._id,data.chatId)
                    result.newMessage = true
                    result.receiver_username = receiverUser.userName
                    result.senderId = senderUser._id
                    console.log("Result send message:- ",result);
                    res.send({
                      success: true,
                      message: result,
                    });
                  } 
                }
              );
            }
          });
          } 
        }
      );
    }
})
};

// GET Chat list
_message.chatlist = async (req, res) => {
  try {
    let testData = await MESSAGECONSTANTS.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }],
    })
      .populate({ path: "senderId", select: "fullNameOfSeller userName profileImg" })
      .populate({ path: "receiverId", select: "fullNameOfSeller userName profileImg" })
      .populate({ path: "lastmsgId", select: "message createdAt" });

    const chatList = await MESSAGECONSTANTS.aggregate([
      {
        $match: {
          $or: [
            {
              senderId: mongoose.Types.ObjectId(req.userId),
            },
            {
              receiverId: mongoose.Types.ObjectId(req.userId),
            },
          ],
        },
      },
      {
        $lookup: {
          from: "messages",
          let: { messageConstantId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$chatId", "$$messageConstantId"] },
                isRead: false,
                receiverId: mongoose.Types.ObjectId(req.userId),
              },
            },
          ],
          as: "msgsCount",
        },
      },
      {
        $addFields: {
          unseenCount: { $size: "$msgsCount" },
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastmsgId",
          foreignField: "_id",
          as: "lastmsgId",
        },
      },
      {
        $unwind: "$lastmsgId",
      },
      {
        $addFields: {
          receiverId: {
            $cond: {
              if: {
                $eq: [
                  mongoose.Types.ObjectId(req.userId),
                  "$lastmsgId.receiverId",
                ],
              },
              then: "$lastmsgId.senderId",
              else: "$lastmsgId.receiverId",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "receiverId",
        },
      },
      {
        $unwind: "$receiverId",
      },

      {
        $project: {
          _id: "$_id",
          receiverId: "$receiverId",
          senderId: "$senderId",
          type: "$type",
          isTyping: 1,
          unseenCount: 1,
          newDate: 1,
          updatedAt: "$updatedAt",
          "lastmsgId.receiverId._id": "$receiverId._id",
          "lastmsgId.receiverId.message": "$lastmsgId.message",
          "lastmsgId.receiverId.messageType": "$lastmsgId.messageType",
          "lastmsgId.receiverId.isOnline": "$receiverId.isOnline",
          "lastmsgId.receiverId.files": "$lastmsgId.files",
          "lastmsgId.receiverId.thumbnail": "$lastmsgId.thumbnail",
          "lastmsgId.receiverId.userName": "$receiverId.userName",
          "lastmsgId.receiverId.fullNameOfSeller": "$receiverId.fullNameOfSeller",
          "lastmsgId.receiverId.profileImg": "$receiverId.profileImg",
          "lastmsgId.receiverId.email": "$receiverId.email",
          "lastmsgId.receiverId.socketId": "$receiverId.socketId",
        },
      },
      {
        $project: {
          receiverId: 0,
        },
      },
      {
        $sort: { "updatedAt": -1 },
      },
    ]);

    res.send({
      success: true,
      message: chatList,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

//GET Chat Details
_message.chatDetails = async (req, res) => {
  try {
    if(mongoose.Types.ObjectId.isValid(req.params.chatId)){
        let chatDetails = await MESSAGE.find({ chatId: req.params.chatId })
        .populate({ path: "senderId", select: "profileImg" })
        .populate({ path: "receiverId", select: "profileImg" });

      let updateChat = await MESSAGE.update(
        {
          chatId: req.params.chatId,
          receiverId: mongoose.Types.ObjectId(req.userId),
        },
        {
          $set: {
            isRead: true,
          },
        },
        {
          multi: true,
          new: true,
        }
      );

      res.send({
        success: true,
        text: chatDetails,
      });
    }else{
      res.send({
        success: true,
        text: [],
      });
    }
    
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = _message;
