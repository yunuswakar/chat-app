/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const COMMENT= require('../model/commentModel') // import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const STORYCOMMENT = require("../model/commentStory");
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const REPLY = require('../model/subReplyModel') 
const STORY = require("../../storyService/model/storyModel")
const NOTIFICATION = require("../../notificationService/model/pushNotificationModel");
const POST = require("../../postService/model/postModel");
const USER = require("../../userServices/model/userModel")
const commonFunction = require('../../../helpers/commonFunctions');

const _comment = {};

_comment.AddComment= async(req, res)=>{
    try {
        let data = req.body;
        data.commentBy = req.userId
        if (data.replyto == '') {
            delete data.replyto
        }
        let getPost=await POST.findOne({_id:data.post})
        let sentTo=await USER.findOne({_id:getPost.postedBy});
        let sentBy=await USER.findOne({_id:req.userId})
        let commentData=await COMMENT.find({post:data.post,commentBy:{$ne:sentTo._id}})
        console.log(`commentData`, commentData)

        let result= await COMMENT.create(data)
        res.status(200).send({
            success:true,
            message:responseMessage.ADD_SUCCESS('Comment'),
            data:result
        })
         if(req.userId == getPost.postedBy && commentData.length){
            console.log(`getPost.postedBy,req.userId`, getPost.postedBy ,req.userId , req.userId == getPost.postedBy
             ,req.userId != getPost.postedBy )
            let array1=[];
            commentData.map(a=>{
                array1.push(a.commentBy)
            })
            let commentBy=await USER.find({_id:{$in:array1}})
            console.log(`commentBy`, commentBy)
             commentBy.forEach(async element => {
                // let pushNot=await commonFunction.pushNotification(element.fcmToken, "Post Commented", `${sentTo.firstName} ${sentTo.lastName} commented on his post`)
                let obj={
                    sendBy:getPost.postedBy,
                    sendTo:element._id,
                    title: "Post Commented",
                    body:`${sentTo.userName} commented on his post`,
                    message: `${sentTo.userName} commented on his post`,
                    notificationType: "Comment"
                }
                let results = await new NOTIFICATION(obj).save();
             });
         }
         if(req.userId != getPost.postedBy)
         {
            let obj={
                sendBy:req.userId,
                sendTo:getPost.postedBy,
                title: "Post Commented",
                body:`${sentBy.userName} commented on your post`,
                message: `${sentBy.userName} commented on your post`,
                notificationType: "Comment"
            }
            let results = await new NOTIFICATION(obj).save();
         }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

_comment.AddSubReply = async (req, res) => {
    try {
        let data = req.body;
        data.commentBy = req.userId
        let result = await REPLY.create(data)

        let comment=await COMMENT.findOne({_id:data.replyId})
        let sentTo=await USER.findOne({_id:comment.commentBy})
        let sentBy=await USER.findOne({_id:req.userId})
        let obj={
            sendBy:req.userId,
            sendTo:sentTo._id,
            title: "Post Commented Reply",
            body:`${sentBy.userName} replied on your comment`,
            message: `${sentBy.userName} replied on your comment`,
            notificationType: "SubComment"
        }
        if (req.userId!=sentTo._id) {
            let results = await new NOTIFICATION(obj).save();
        }
        res.status(200).send({
            success: true,
            message: responseMessage.ADD_SUCCESS('REPLY'),
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Get Comment of One post
_comment.GetCommentByPostId= async(req, res)=>{
    try {
        let count= await COMMENT.find({$or:[{post:req.params.id}, {commentBy:req.params.id}]}).countDocuments()
        let result = await COMMENT.find({
            $or: [
                { post: req.params.id },
                { commentBy: req.params.id }
            ]
        })
        .populate("commentBy","-password")
        .populate({path:'post', populate:{path:'postedBy',select:'-password'}})
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Post')
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

//Get Comment of One post
_comment.GetCommentByPostIds = async (req, res) => {
    let userToFind = req.userId
    try {
        let count = await COMMENT.find({
            $or: [
                {
                    post: req.params.id
                },
                {
                    commentBy: req.params.id
                }
            ]
        }).countDocuments()
        let result = await COMMENT.aggregate([
            {
                $match: {
                    $or: [
                        {
                            post: mongoose.Types.ObjectId(req.params.id),
                        },
                        {
                            commentBy: mongoose.Types.ObjectId(req.params.id),
                        },
                    ]
                }
            },

            {
                $lookup: {
                    from: "users",
                    let: { senderId: "$commentBy" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$_id", "$$senderId"] } },
                        },
                        {
                            $project: { password: 0 },
                        }
                    ],
                    as: "commentBy"
                }
            },
            {
                $unwind: "$commentBy"
            },

            {
                $lookup: {
                    from: "posts",
                    let: { receiverId: "$post" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$_id", "$$receiverId"] } },
                        },
                        {
                            $lookup: {
                                from: "users",
                                let: { profile_id: "$postedBy" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$profile_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: { password: 0 },
                                    },
                                ],
                                as: "postedBy",
                            },
                        },
                        { $unwind: "$postedBy" },
                    ],
                    as: "post",
                },
            },
            {
                $unwind: "$post"
            },

            {
                $lookup: {
                    from: "subreplies",
                    let: { idToFind: "$_id" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$replyId", "$$idToFind"] } },
                        },
                        {
                            $lookup: {
                                from: "users",
                                let: { profile_id: "$commentBy" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$profile_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: { profileImg: 1, userName: 1, email:1 },
                                    },
                                ],
                                as: "commentBy",
                            },
                        }, 
                        {
                            $unwind: "$commentBy"
                        },
                        {
                            $addFields: {
                                profileImg: "$commentBy.profileImg",
                                userName: "$commentBy.userName",
                                email: "$commentBy.email",
                                subLikeCount: {
                                    $cond: {
                                        if: { $isArray: "$likedBy" },
                                        then: { $size: "$likedBy" },
                                        else: "0"
                                    }
                                },
                                isSubReplyLikedByUser: {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(userToFind), "$likedBy"]
                                        },
                                        then: true,
                                        else: false
                                    }
                                },
                            },
                        },
                        {
                            $project: { commentBy: 0, likedBy: 0 },
                        }
                    ],
                    as: "subReplies"
                },                
            },
            {
                $addFields: {
                    likeCount: {
                        $cond: {
                            if: { $isArray: "$likedBy" },
                            then: { $size: "$likedBy" },
                            else: "0"
                        }
                    },
                    isCommentLikedByUser: {
                        $cond: {
                            if: {
                                $in: [mongoose.Types.ObjectId(userToFind), "$likedBy"]
                            },
                            then: true,
                            else: false
                        }
                    },
                },
            },
            // {
            //     $sort: { createdAt: -1 }
            // },
            
        ])
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Post')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result,
            count
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Get All Comment
_comment.GetAllComments= async(req, res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        let count= await COMMENT.find().countDocuments()
        let result= await COMMENT.find()
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        if(!result){
            res.status(400).send({
                success:false,
                message:responseMessage.RECORD_NOTFOUND('Post')
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

//Delete One Post By Id
_comment.deleteCommentById = async (req, res) => {
    try {
        let result = await COMMENT.findByIdAndRemove({ _id: req.params.id })
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Comment')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DELETE('Comment'),
            data: result
        })
        // let criteria= req.params.id
        // let findallReportedPost= await REPORT.deleteMany({postReport:mongoose.Types.ObjectId(criteria)},{multi:true})
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}
//Update One Post By Id
_comment.updateComment = async (req, res, next) => {
    try {
        let criteria= { _id: req.params.id }
        let data = req.body;
        let getalldetail= await COMMENT.findOne({ _id: req.params.id })
        if(getalldetail.commentBy!=req.userId){
            res.status(400).send({success:false, message:responseMessage.UNAUTHORIZED})
            return
        }
        let updateComment = await COMMENT.findOneAndUpdate(criteria, data, { new: true });
        if (updateComment) {
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Comment'), { updateComment: updateComment });
            next();
        } else {
            throw { message: responseMessage.ERROR_ON_UPDATE }
        }
    } catch (err) {
        // throw exception message
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}
   
_comment.addComment = async(req, res, next)=>{
    try{
        req.body.commentBy= req.userId;
        let result = await STORY.findOne({ _id: req.body.story });
        req.body.expireAt = result.expireAt
        let addComment = await new STORYCOMMENT(req.body).save();
        await setResponseObject(req, true, responseMessage.ADD_SUCCESS('Comment'), addComment);
            next();
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_comment.addStoryLike = async(req, res, next)=>{
    try{
        req.body.commentBy= req.userId;
        let addComment;
        if(req.body.parentId){
            addComment = await STORYCOMMENT.findOneAndUpdate({parentId:req.body.parentId,story:req.body.story, commentBy:req.userId},
                {isLike:req.body.isLike},{new:true});

        }else{
            addComment = await STORYCOMMENT.findOneAndUpdate({story:req.body.story, commentBy:req.userId},
                {isLike:req.body.isLike},{new:true});
        }
        await setResponseObject(req, true, responseMessage.ADD_SUCCESS('Comment'), addComment);
        next();
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_comment.getStoryDetails = async(req, res, next)=>{
    let userToFind = req.userId
    try{
        let getStoryDetails = await STORYCOMMENT.aggregate([
            {
                $match:{
                    story:mongoose.Types.ObjectId(req.params.storyId)
                }
            },
            {
                $lookup:{
                    from:"stories",
                    localField:"story",
                    foreignField:"_id",
                    as:"story"
                }
            },
            {
                $lookup: {
                    from: "subreplies",
                    let: { idToFind: "$_id" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$replyId", "$$idToFind"] } },
                        },
                        {
                            $lookup: {
                                from: "users",
                                let: { profile_id: "$commentBy" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$profile_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: { profileImg: 1, userName: 1,email:1 },
                                    },
                                ],
                                as: "commentBy",
                            },
                        }, 
                        {
                            $unwind: "$commentBy"
                        },
                        {
                            $addFields: {
                                profileImg: "$commentBy.profileImg",
                                userName: "$commentBy.userName",
                                email: "$commentBy.email",
                                subLikeCount: {
                                    $cond: {
                                        if: { $isArray: "$likedBy" },
                                        then: { $size: "$likedBy" },
                                        else: "0"
                                    }
                                },
                                isSubReplyLikedByUser: {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(userToFind), "$likedBy"]
                                        },
                                        then: true,
                                        else: false
                                    }
                                },
                            },
                        },
                        {
                            $project: { commentBy: 0, likedBy: 0 },
                        }
                    ],
                    as: "subReplies"
                },                
            },
            { "$lookup": {
                "from": "commentstories",
                "let": { "commentId": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$parentId", "$$commentId"] }}},
                  { "$lookup": {
                    "from": "users",
                    "let": { "commentBy": "$commentBy" },
                    "pipeline": [
                      { "$match": { "$expr": { "$eq": ["$_id", "$$commentBy"] }}},
                      {"$project":{
                        _id:1,
                        profileImg:1,
                        userName:1,
                        email:1,
                      }}
                    ],
                    "as": "commentBy"
                  }},
                  {
                      $unwind:"$commentBy"
                  },                  
            ],
                "as": "commentstories"
              }},
             { "$lookup": {
                "from": "users",
                "let": { "commentBy": "$commentBy" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": ["$_id", "$$commentBy"] }}},
                  {"$project":{
                    _id:1,
                    profileImg:1,
                    userName:1,
                    email:1,
                  }}
                ],
                "as": "commentBy"
              }},
              {
                  $unwind:"$commentBy"
              } ,
              {
                $addFields: {
                    likeCountOfComment: {
                        $cond: {
                            if: { $isArray: "$likedBy" },
                            then: { $size: "$likedBy" },
                            else: "0"
                        }
                    },
                    isStoryCommentLikedByUser: {
                        $cond: {
                            if: {
                                $in: [mongoose.Types.ObjectId(userToFind), "$likedBy"]
                            },
                            then: true,
                            else: false
                        }
                    },
                },
              },
              {
                  $addFields:{commentCount:{$size:"$commentstories"}},
                //   $addFields:{likeCount:{$size:"$isLike"}},
              }
        ]);
        await setResponseObject(req, true, responseMessage.RECORDFOUND, getStoryDetails);
        next();
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_comment.addSubReplyOnStory = async (req, res) => {
    try {
        let data = req.body;
        data.commentBy = req.userId
        if (!data.story) {
            res.send({
                success: false,
                message: "Pass Proper Data"
            })
            return false
        }
        let storyresult = await STORY.findOne({ _id: req.body.story });
        data.expireAt = storyresult.expireAt
        let result = await REPLY.create(data)
        res.status(200).send({
            success: true,
            message: responseMessage.ADD_SUCCESS('SubREPLY'),
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

module.exports = _comment;