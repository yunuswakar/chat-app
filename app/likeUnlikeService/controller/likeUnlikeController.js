/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const LIKE = require("../model/likeUnlikeModel") // import user model to perform crud operation
const StoryLIKE = require("../model/likeUnlikeStory");
const POST = require("../../postService/model/postModel");
const COMMENT = require("../../commentService/model/commentModel");
 const NOTIFICATION = require("../../notificationService/model/pushNotificationModel");

const SUBREPLY = require("../../commentService/model/subReplyModel");
const STORY = require("../../storyService/model/storyModel")
const mongoose = require("mongoose");// set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
    .setResponseObject;
const STORYCOMMENT = require("../../commentService/model/storyCommentModel")
const COMMENTSTORY = require("../../commentService/model/commentStory")
 const commonFunction = require('../../../helpers/commonFunctions');
 const USER = require("../../userServices/model/userModel")

const _like = {};

//Like A Post
_like.LikePost = async (req, res) => {
    try {  
        if (req.body.isLiked) {
            let data = req.body;
            data.likedBy = req.userId;
            let criteria = {
                _id: data.postId
            };
            let dataTOSet = { likedBy: req.userId }
            let option = { new: true };
            let updateLike = await LIKE.findOneAndUpdate({likedBy:req.userId, postId:req.body.postId}, 
                {likedBy:req.userId, postId:req.body.postId,isLiked:req.body.isLiked}, {upsert:true, new:true});
            let updatePost = await POST.findOneAndUpdate(criteria, {$addToSet:dataTOSet}, option);
          
            let getPost=await POST.findOne(criteria)
            let sentTo=await USER.findOne({_id:getPost.postedBy}).select("fcmToken");
            let sentBy=await USER.findOne({_id:req.userId})
            console.log(`sentBy`, sentBy)
            res.status(200).send({
                success: true,
                message: responseMessage.VERIFICATION('Like'),
                data: updatePost
            })
            if (req.userId != getPost.postedBy) {
                let obj={ 
                    sendBy:req.userId,
                    sendTo:getPost.postedBy,
                    postId:data.postId,
                    title: "Post Liked",
                    body:`${sentBy.userName} liked your post`,
                    message: `${sentBy.userName} liked your post`,
                    notificationType: "Like"
                }
                let result = await new NOTIFICATION(obj).save();
                console.log(`result`, result)
            }
          
        }
        else {
            await POST.findOneAndUpdate({
                _id: req.body.postId,
                likedBy: { $in: req.userId }
            }, {
                $pull: { likedBy: req.userId }
            }, { new: true });
            let result = await LIKE.findOneAndRemove({ postId: req.body.postId, likedBy:req.userId });
            if (!result) {
                res.status(400).send({
                    success: false,
                    message: responseMessage.RECORD_NOTFOUND('Record')
                })
                return
            }
            res.status(200).send({
                success: true,
                message: responseMessage.DELETE('Like'),
                data: result
            })
        }
    }
    catch (error) {
        res.status(400).send({ success: false, message: responseMessage.SOMETHING_WRONG })
    }
}

//Like A Story
_like.LikeStory = async (req, res) => {
    try {
        let result = await STORY.findOne({ _id: req.body.storyId });
        let criteria = { storyId: req.body.storyId, likedBy: req.userId }
        let updateData = {
            isLiked: req.body.isLiked,
            storyId: req.body.storyId,
            likedBy: req.userId
        }
        let option = { upsert: true, new: true }
        
        let checkLikes = await StoryLIKE.findOneAndUpdate(criteria, updateData, option).populate('likedBy');
        let checkDisLikes = await StoryLIKE.findOne({storyId: req.body.storyId,isLiked:false}).populate('likedBy');
        let getAllLikes = await StoryLIKE.find({storyId: req.body.storyId,isLiked:true}).countDocuments();
        let getAllDisLikes = await StoryLIKE.find({storyId: req.body.storyId,isLiked:false}).countDocuments();
        
        if (!checkLikes) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('LikeStory')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: checkLikes,
            dislikes:checkDisLikes,
            disLikeCount:getAllDisLikes,
            likesCount:getAllLikes
        })
    }catch (err) {
        res.status(400).send({ success: false, message: responseMessage.SOMETHING_WRONG });
    }
}
//add view on story
_like.addStoryView = async(req, res) => {
    try{
          let findStory = await STORY.findOne({_id:req.body.storyId,postedBy:req.userId}).populate({path:"viewedBy"});
        if(!findStory){
            let fetchStoryView = await STORY.findOneAndUpdate({_id:req.body.storyId},{$addToSet:{viewedBy:req.userId}},{new:true}).populate({path:"viewedBy"});
            
             if(fetchStoryView){
                res.send({
                    success: true,
                    message: responseMessage.DATA_FOUND,
                    data:fetchStoryView,
                    count: fetchStoryView.viewedBy.length
                })
            }else{
                    res.send({
                        success: true,
                        message: responseMessage.DATA_FOUND,
                        count: 0
                    })
            }  
        }else{
            res.send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data:findStory,
                count: 0
            })
        }   
    }
    catch(err){
        res.status(400).send({success:false, message:responseMessage.SOMETHING_WRONG}); 
    }
}

//Get all likes of One Story
_like.getLikes = async (req, res) => {
    try {
        let getAllDisLikes = await StoryLIKE.find({ storyId: req.params.id,isLiked:true }).countDocuments();
        let getAllLikes = await StoryLIKE.aggregate([
            {
                $match: { storyId: mongoose.Types.ObjectId(req.params.id), isLiked: true }
            },
             {
                $lookup: {
                    from: "users",
                    let: { postedBy: "$likedBy" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$postedBy"] } } },
                        { $project: { password: 0 } },
                        {
                            $lookup: {
                                from: "follows",
                                let: { postedBy: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$user", "$$postedBy"] } } },
                                ],
                                as: "followsData",
                            }
                        },
                            
                            {
                                $addFields:{"followsData":{$arrayElemAt: [ "$followsData", 0 ]}} 
                            },
                            {
                                $addFields: {
                                    isUserFollowing: {
                                        $cond: {
                                            if: {
                                                $in: [mongoose.Types.ObjectId(req.userId),  {$cond:{if:"$followsData.followBy",then: "$followsData.followBy",
                                                else: []}}]
                                            },
                                            then: true,
                                            else: false
                                        },
                                    }
                                }
                            },
                            {
                                $project: {
                                    followsData: 0,
                                }
                            }, 
                    ],
                    as: "likedBy",
                },
            },
             {
                $unwind: "$likedBy"
            },  
        ]);
        if (!getAllLikes) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('LikeStory')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: getAllLikes,
            count:getAllLikes.length,
            disLikeCount:getAllDisLikes
        })
    }
    catch (err) {
        res.status(400).send({ success: false, message: responseMessage.SOMETHING_WRONG });
    }
}

//Get all Dislikes of One Story
_like.getDislikeLikes = async (req, res) => {
    try {
       // let getAllLikes = await StoryLIKE.find({ storyId: req.params.id,isLiked:false }).populate({path:'likedBy'});
        let result = await StoryLIKE.aggregate([
            {
                $match: { storyId: mongoose.Types.ObjectId(req.params.id), isLiked: false }
            },
            {
                $lookup: {
                    from: "users",
                    let: { postedBy: "$likedBy" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$postedBy"] } } },
                        { $project: { password: 0 } },
                        {
                            $lookup: {
                                from: "follows",
                                let: { postedBy: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$user", "$$postedBy"] } } },
                                ],
                                as: "followsData",
                            }
                        },
                        {
                            $addFields:{"followsData":{$arrayElemAt: [ "$followsData", 0 ]}} 
                        },
                        {
                            $addFields: {
                                isUserFollowing: {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(req.userId),  {$cond:{if:"$followsData.followBy",then: "$followsData.followBy",
                                            else: []}}]
                                        },
                                        then: true,
                                        else: false
                                    },
                                }
                            }
                        },
                        {
                            $project: {
                                followsData: 0,
                            }
                        },
                    ],
                    as: "likedBy",
                },
            },
            {
                $unwind: "$likedBy"
            },
        ]);
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('LikeStory')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result,
            count: result.length
        })
    }
    catch (err) {
        res.status(400).send({ success: false, message: responseMessage.SOMETHING_WRONG });
    }
}

//Get all Likes of One post
_like.GetLikesByPostId = async (req, res) => {
    try {
        let result = await LIKE.aggregate([
            {
                $match: { postId: mongoose.Types.ObjectId(req.params.id), isLiked: true }
            },
            {
                $lookup: {
                    from: "users",
                    let: { postedBy: "$likedBy" },
                    pipeline: [
                      //  { $match: { $expr: { $eq: ["$_id", "$$postedBy"] } } },
                        { $match: { $expr: { $eq: ['$_id', { $ifNull: ['$$postedBy', []] }] }, } },

                        { $project: { password: 0 } },
                        {
                            $lookup: {
                                from: "follows",
                                let: { postedBy: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ['$user', { $ifNull: ['$$postedBy', []] }] }, } },
                                    {
                                        $addFields: {
                                            isUserFollowing: {
                                                $cond: {
                                                   
						if: {
						    $in: [mongoose.Types.ObjectId(req.userId),  {$cond:{if:"$followBy",then: "$followBy",
						    else: []}}]
						},
                                                    then: true,
                                                    else: false
                                                },
                                            }
                                        }
                                    },
                                ],
                                as: "followsData",
                            }
                        }, 
                        {
                            $addFields:{"followsData":{$arrayElemAt: [ "$followsData", 0 ]}} 
                        },
                         {
                            $addFields: {
                                isUserFollowing: {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(req.userId),  {$cond:{if:"$followsData.followBy",then: "$followsData.followBy",
                                            else: []}}]
                                        },
                                        then: true,
                                        else: false
                                    },
                                }
                            }
                        }, 
                        // {
                        //     $project: {
                        //         followsData: 0,
                        //     }
                        // },
                    ],
                    as: "likedBy",
                },
            },
            {
                $unwind: "$likedBy"
            },
        ]);
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
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete Like
_like.LikeDelete = async (req, res) => {
    try {
        let result = await LIKE.findByIdAndRemove({ _id: req.params.id })
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Record')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DELETE('Like'),
            data: result
        })
        let criteria = {
            _id: mongoose.Types.ObjectId(result.postId)
        };
        let dataTOSet = { $pull: { likedBy: result.likedBy } };
        let option = {};
        let updatePost = await POST.findOneAndUpdate(criteria, dataTOSet, option)
    } catch (error) {
        res.status(400).send({ success: false, message: responseMessage.SOMETHING_WRONG })
    }
}

_like.addCommentStory = async(req, res, next)=>{
    try{
        if(req.body.parentId){
            let addCommentStory = await STORYCOMMENT.findOneAndUpdate({parentId:req.body.parentId, story:req.body.storyId},
                                    {story:req.body.storyId, commentBy:[{userId:req.userId,title:req.body.title}],parentId:req.body.parentId},
                                    {new:true,upsert:true});
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Comment'), addCommentStory);
            next();
        }else{
            let addCommentStory = await STORYCOMMENT.findOneAndUpdate({story:req.body.storyId},
                {story:req.body.storyId, commentBy:[{userId:req.userId,title:req.body.title}],title:req.body.title},
                {new:true,upsert:true});
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Comment'), addCommentStory);
            next();
        }
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_like.addLikeStory = async(req, res, next)=>{
    try{
        if(req.body.parentId){
            let addLikeStory = await STORYCOMMENT.findOneAndUpdate({parentId:req.body.parentId, story:req.body.storyId},
                                    {story:req.body.storyId, likes:[{likedBy:req.userId,isLiked:req.body.isLiked}],parentId:req.body.parentId},
                                    {new:true,upsert:true});
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Like'), addLikeStory);
            next();
        }else{
            let addLikeStory = await STORYCOMMENT.findOneAndUpdate({story:req.body.storyId},
                {story:req.body.storyId, likes:[{likedBy:req.userId,isLiked:req.body.isLiked}],title:req.body.title},
                {new:true,upsert:true});
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Like'), addLikeStory);
            next();
        }
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_like.getStory = async(req, res, next)=>{
    try{
         let getStory = await STORYCOMMENT.find(
            {
                story:mongoose.Types.ObjectId(req.params.storyId)
            }
        ).populate({path:"commentBy.userId",select:"-pasword -story"}).populate("parentId"); 
         
       /*   let getStory = await STORYCOMMENT.aggregate([
            {
                $match:{story:mongoose.Types.ObjectId(req.params.storyId)}
            },
            {
                $lookup:{
                    from:"storycomments",
                    let:{"commentBy":"$parentId"},
                    "pipeline": [
                        { "$match": { "$expr": { "$in": ["$commentBy._id",{ $ifNull: ["$$commentBy", []]  }]}}}
                      ],
                      "as": "parentId"
                }
            },
        ]); */
        await setResponseObject(req, true, responseMessage.RECORDFOUND, getStory);
            next();
    }catch(err){
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

// Like A Comment
_like.likeComment = async (req, res) => {
    try {
        if (req.body.isLiked) {
            let data = req.body;
            data.likedBy = req.userId;
            let criteria = {
                _id: data.commentId
            };
            let dataToSet = { likedBy: req.userId }
            let option = { new: true };
            let updateLike = await LIKE.findOneAndUpdate({
                likedBy: req.userId,
                commentId: req.body.commentId
            }, {
                likedBy: req.userId,
                commentId: req.body.commentId,
                isLiked: req.body.isLiked
            }, {
                upsert: true,
                new: true
            });
            let updateComment = await COMMENT.findOneAndUpdate(criteria,
                { $addToSet: dataToSet },
                option);
            res.status(200).send({
                success: true,
                message: responseMessage.VERIFICATION('Like'),
                data: updateComment
            })
        }
        else {
            let resultPost = await COMMENT.findOneAndUpdate({
                _id: req.body.commentId,
                likedBy: { $in: req.userId }
            }, {
                $pull: { likedBy: req.userId }
            }, { new: true });
            let result = await LIKE.findOneAndRemove({
                commentId: req.body.commentId,
                likedBy: req.userId
            });
            if (!result) {
                res.status(400).send({
                    success: false,
                    message: responseMessage.RECORD_NOTFOUND('Record')
                })
                return
            }
            res.status(200).send({
                success: true,
                message: responseMessage.DELETE('Like'),
                data: result
            })
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

// Like A Sub Reply
_like.likeSuBReply = async (req, res) => {
    try {
        if (req.body.isLiked) {
            let data = req.body;
            data.likedBy = req.userId;
            let criteria = {
                _id: data.subReplyId
            };
            let dataToSet = { likedBy: req.userId }
            let option = { new: true };
            let updateLike = await LIKE.findOneAndUpdate({
                likedBy: req.userId,
                subReplyId: req.body.subReplyId
            }, {
                likedBy: req.userId,
                subReplyId: req.body.subReplyId,
                isLiked: req.body.isLiked
            }, {
                upsert: true,
                new: true
            });
            let updateComment = await SUBREPLY.findOneAndUpdate(criteria,
                { $addToSet: dataToSet },
                option);
            res.status(200).send({
                success: true,
                message: responseMessage.VERIFICATION('Like'),
                data: updateComment
            })
        }
        else {
            let resultPost = await SUBREPLY.findOneAndUpdate({
                _id: req.body.subReplyId,
                likedBy: { $in: req.userId }
            }, {
                $pull: { likedBy: req.userId }
            }, { new: true });
            let result = await LIKE.findOneAndRemove({
                subReplyId: req.body.subReplyId,
                likedBy: req.userId
            });
            if (!result) {
                res.status(400).send({
                    success: false,
                    message: responseMessage.RECORD_NOTFOUND('Record')
                })
                return
            }
            res.status(200).send({
                success: true,
                message: responseMessage.DELETE('Like'),
                data: result
            })
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

// Like A Story Comment
_like.likeDislikeStoryComment = async (req, res) => {
    try {
        if (req.body.isLiked) {
            let data = req.body;
            data.likedBy = req.userId;
            let criteria = {
                _id: data.commentStoryId
            };
            let dataToSet = { likedBy: req.userId }
            let option = { new: true };
            let updateLike = await LIKE.findOneAndUpdate({
                likedBy: req.userId,
                commentStoryId: req.body.commentStoryId
            }, {
                likedBy: req.userId,
                commentStoryId: req.body.commentStoryId,
                isLiked: req.body.isLiked
            }, {
                upsert: true,
                new: true
            });
            let updateComment = await COMMENTSTORY.findOneAndUpdate(criteria,
                { $addToSet: dataToSet },
                option);
            res.status(200).send({
                success: true,
                message: responseMessage.VERIFICATION('Like'),
                data: updateComment
            })
        }
        else {
            let resultPost = await COMMENTSTORY.findOneAndUpdate({
                _id: req.body.commentStoryId,
                likedBy: { $in: req.userId }
            }, {
                $pull: { likedBy: req.userId }
            }, { new: true });
            let result = await LIKE.findOneAndRemove({
                commentStoryId: req.body.commentStoryId,
                likedBy: req.userId
            });
            if (!result) {
                res.status(400).send({
                    success: false,
                    message: responseMessage.RECORD_NOTFOUND('Record')
                })
                return
            }
            res.status(200).send({
                success: true,
                message: responseMessage.DELETE('Like'),
                data: result
            })
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

module.exports = _like;
