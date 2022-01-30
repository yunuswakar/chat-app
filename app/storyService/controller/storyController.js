/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";
const BLOCKMODEL = require("../../blockService/model/blockModel"); // import user model to perform crud operation

const STORY = require("../../storyService/model/storyModel"); // import user model to perform crud operation
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const COMMENTSTORY = require("../../commentService/model/commentStory")
const STORYCOMMENT = require("../../commentService/model/storyCommentModel")
const SUBREPLY = require("../../commentService/model/subReplyModel")
const mongoose = require("mongoose");// set rules for mongoose id
const dir = "./uploads/story/";// declare path of upload dir on server
const cron = require('node-cron');
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const USER = require("../../userServices/model/userModel");
const { createLogger } = require("winston");
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
    .setResponseObject;
const _story = {};

//multer
var storage = multer.diskStorage({
    /*destination*/
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + "-" + file.originalname);
    },
});
// const upload = multer({ storage: storage }).single("storyImg");
const upload = multer({ storage: storage }).fields([{ name: 'storyImg' }, { name: 'storyVideo'}])

//Add Story
_story.addStory = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            
            if (err) {
                await setResponseObject(req, false, err.message, "");
            } else {
                    let data = req.body;
                    data.postedBy = req.userId;
                    if (req.files.storyImg) {
                        let storyImg = req.files.storyImg[0].path;
                        data.storyImg = storyImg;
                        data.type = 0;
                    }
                    if (req.files.storyVideo) {
                        let storyVideo = req.files.storyVideo[0].path;
                        data.storyImg = storyVideo;
                        data.type=1;
                    }
                    if(req.body.storyVideo){
                        data.storyImg = req.body.storyVideo
                    }
                    data.totalTime = Number(data.totalTime);
                    switch (data.storyDay) {
                        case "oneDay":
                            data.expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
                            break;
                        case "twoDay":
                            data.expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
                            break;
                        default:
                            data.expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
                            break;
                    }
                    let result = await STORY.create(data);
                    let updateUser =await USER.findOneAndUpdate({_id:req.userId},{updatedAt:Date.now(), $push:{story:mongoose.Types.ObjectId(result._id)}},{new:true});
                    res.status(200).send({
                        success: true,
                        message: responseMessage.ADD_SUCCESS('Story'),
                        data: result
                    }); 
             return;                                   
            }
        });     
    }catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        });
    }
}

//Get All Story By Admin
_story.getStoryList = async (req, res) => {
    try {
        let count = await STORY.find().countDocuments()
        let result = await STORY.find().populate('postedBy', '-password');
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result, count
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//story by Login user
_story.getStoryListBYUserId = async (req, res) => {
    try {
        let criteria = req.userId
        
        let Data = await STORY.aggregate([
            {
                $match:{postedBy: mongoose.Types.ObjectId(criteria)}
            },
            { "$lookup": {
                "from": "storylikes",
                "let": { "id": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": [ "$storyId", "$$id" ] },isLiked:true } },
                   { "$lookup": {
                    "from": "users",
                    "let": { "likedBy": "$likedBy" },
                    "pipeline": [
                      { "$match": { "$expr": { "$eq": [ "$_id", "$$likedBy" ] } } },
                      {
                          "$project":{
                            profileImg:1,
                            userName:1,
                            email:1,
                            firstName:1,
                            lastName:1,
                          }
                      }
                    ],
                    "as": "likedBy"
                  }
                }, 
                {
                    $unwind:"$likedBy"
                },               
                ],
                "as" : "likes"
            }},
            { "$lookup": {
                "from": "storylikes",
                "let": { "id": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": [ "$storyId", "$$id" ] },isLiked:false } },
                   { "$lookup": {
                    "from": "users",
                    "let": { "likedBy": "$likedBy" },
                    "pipeline": [
                      { "$match": { "$expr": { "$eq": [ "$_id", "$$likedBy" ] } } },
                      {
                          "$project":{
                            profileImg:1,
                            userName:1,
                            email:1,
                            firstName:1,
                            lastName:1,
                          }
                      }
                    ],
                    "as": "likedBy"
                  }
                }, 
                {
                    $unwind:"$likedBy"
                },               
                ],
                "as" : "isDislikes"
            }},
            {
                $addFields:{
                    dislikeCount:{$size:"$isDislikes"},
                    likeCount:{$size:"$likes"},
                    viewCount:{$size:"$viewedBy"}
                }
            },
            { "$lookup": {
                "from": "commentstories",
                "let": { "id": "$_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$eq": [ "$story", "$$id" ] } } },
                ],
                "as": "comments"
              }
            },
            {
                $lookup: {
                    from: 'subreplies',
                    localField: '_id',
                    foreignField: 'story',
                    as: 'subreplies'
                }
            },
            {
                $addFields: {
                    commentCount: {
                        $add: [
                            { $size: "$comments" },
                            { $size: "$subreplies" }
                        ]
                    }
                }
            },
            { "$lookup": {
                "from": "users",
                "let": { "viewedBy": "$viewedBy" },
                "pipeline": [
                  { "$match": { "$expr": { "$in": [ "$_id", "$$viewedBy" ] },role:0 } },
                  {
                      "$project":{
                        profileImg:1,
                        userName:1,
                        email:1,
                        firstName:1,
                        lastName:1,
                        role:1
                      }
                  }
                ],
                "as": "viewedBy"
              },
            },
            {
                $project:{
                    _id:1,
                    viewedBy:1,
                    createdAt:1,
                    updatedAt:1,
                    title:1,
                    description:1,
                    postedBy:1,
                    xcoordinate:1,
                    ycoordinate:1,
                    storyImg:1,
                    type:1,
                    likes:1,
                    likeCount:1,
                    isDislikes:1,
                    commentCount:1,
                    dislikeCount:1,
                    viewCount:1,
                    totalTime: 1,
                    comments:1,
                    colorcode:1,
                    scale:1
                }
            },
            {
                $facet:{
                    data: [
                        { $sort: { createdAt: +1 } },
                        ],
                        count: [
                        {
                            $count: "count",
                        },
                        ],
                }
            },
            {
                $project:{
                    data:"$data",
                    count:{$arrayElemAt: [ "$count", 0 ]}
                }
            }, 
            {
                $project:{
                    data:"$data",
                    count:"$count.count"
                }
            } 
        ]);       
        res.send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: Data[0]
        })
    } catch (err) {
        res.send({
            success: false,
            message: err
        })
    }
}

//story by Login user
_story.getStoryData = async (req, res) => {
    try {
        let criteria = req.userId
        // let datatoSet= {$addToSet: {viewedBy:req.userId}}
        // let options = { new: true };
        // let updateView= await STORY.findOneAndUpdate(criteria, datatoSet, options)
        let count = await STORY.find({ postedBy: mongoose.Types.ObjectId(criteria) }).countDocuments()
        let Data = await STORY.find({ postedBy: mongoose.Types.ObjectId(criteria) }).populate("postedBy")
        // let viewCount= Data.viewedBy.length
        res.send({
            success: true,
            message: responseMessage.DATA_FOUND,
            // totalView:viewCount,
            data: data,count
        })
    } 
    catch (err) {
        res.send({
            success: false,
            message: err
        })
    }
}

//story by Login user
_story.getStoryData = async (req, res) => {
    try {
        let criteria = req.userId
        // let datatoSet= {$addToSet: {viewedBy:req.userId}}
        // let options = { new: true };
        // let updateView= await STORY.findOneAndUpdate(criteria, datatoSet, options)
        let count = await STORY.find({ postedBy: mongoose.Types.ObjectId(criteria) }).countDocuments()
        let Data = await STORY.find({ postedBy: mongoose.Types.ObjectId(criteria) }).populate("postedBy")
        // let viewCount= Data.viewedBy.length
        res.send({
            success: true,
            message: responseMessage.DATA_FOUND,
            // totalView:viewCount,
            data: data,count
        })
    } 
    catch (err) {
        res.send({
            success: false,
            message: err
        })
    }
}

_story.getStoryListBYAllUserId = async (req, res) => {
    try {


        let blockArray=await BLOCKMODEL.find({blockedTo:req.userId})
       
        let arrays=[]
        blockArray.map(a=>{
         arrays.push(a.blockedBy)
        })


        let criteria = req.userId
        let data = await USER.aggregate([
            {
              $match:{ _id:{$ne:mongoose.Types.ObjectId(req.userId)},
                story:{$exists: true, $ne: []}}
            }, 
            {$match:{"postedBy":{"$nin":arrays}}},

            {
                $lookup:{
                    from:"stories",
                    localField:"story",
                    foreignField:"_id",
                    as:"story"
                }
            }, 
              {
                $addFields:{
                    storys:{$gt: [ {$size: "$story" }, 0 ]}
                }
            } ,
            {
                $match:{storys:true}
            }  ,
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
                    storys:0
                }
            }, 
            {
                $sort:{"updatedAt":-1}
            },
        ]);
        let count = await USER.find({_id:{$ne:criteria},story:{$exists: true, $ne: []}}).countDocuments();
        
        res.send({
            success: true,
            message: responseMessage.DATA_FOUND,
            // totalView:viewCount,
            data: data,count
        })
    } 
    catch (err) {
        console.log(err,"err")
        res.send({
            success: false,
            message: err
        })
    }
}

_story.getStoryId = async (req, res) => {
    try {
        let datatoSet = { $addToSet: { viewedBy: req.userId } }
        let options = { new: true };
        let updateView = await STORY.findOneAndUpdate({ _id: req.params.id }, datatoSet, options).populate('viewedBy', 'profileImg userName');
        /* let result = await STORY.findOne({ _id: req.params.id })
            .populate('viewedBy', '-password') */
        let viewCount = updateView.viewedBy.length
        res.send({
            success: true,
            message: responseMessage.DATA_FOUND,
            totalView: viewCount,
            data: updateView
        })
    } catch (err) {

        res.send({
            success: false,
            message: err
        })
    }
}

/**
 * stody view count and list of user`s view story
 * @param {storyId} req 
 */
_story.fetchStoryView = async(req, res)=>{ 
    try{
        // let findStory = await STORY.findOne({_id:req.params.storyId,postedBy:req.userId}).populate({path:"viewedBy"});
        let findStory = await STORY.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.storyId), postedBy: mongoose.Types.ObjectId(req.userId) }
            },
            {
                $lookup: {
                    from: "users",
                    let: { postedBy: "$viewedBy" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$_id", "$$postedBy"] },role:0 } },
                        { $project: { password: 0 } },
                          {
                            $lookup: {
                                from: "follows",
                                let: { postedBy: "$_id" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ['$user', { $ifNull: ['$$postedBy', []] }] }, } },
                                ],
                                as: "followsData",
                            }
                        },
                        {
                            $addFields:{
                                followsData:{
                                    $arrayElemAt: [ "$followsData", 0 ]

                                }
                            }
                        },
                           {
                            $addFields: {
                                isUserFollowing: {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(req.userId),  {$cond:{if:"$followsData.followBy",then: "$followsData.followBy",
                                            else: []}}]
                                        },then: true,
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
                    as: "viewedBy",
                },
            }, 
            // {
            //     $unwind: "$viewedBy"
            // },
        ]);
        if(!findStory){

            let fetchStoryView = await STORY.findOneAndUpdate({_id:req.params.storyId},{$addToSet:{viewedBy:req.userId}},{new:true}).populate({path:"viewedBy"});
            if(fetchStoryView){
                res.send({
                    success: true,
                    message: responseMessage.DATA_FOUND,
                    data: fetchStoryView?fetchStoryView:[],
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
                data: findStory[0],
                count: 0
            })
        }
    }catch(err){
        res.send({
            success: false,
            message: err
        })
    }
}

//delete story of expire story
_story.deleteStory = async (req, res, next) => { 
    try {
        let criteria = { end_date: { $eq: new Date() }}
        let storyData = await STORY.deleteMany(criteria);

        if (storyData) {
           
        } else {
          

        }
    } catch (err) {
       
    }
};

//delete One Story By Id 
_story.deleteStoryById = async (req, res, next) => { 
    try {
        let result = await STORY.findOneAndDelete({ _id: req.params.id });
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Story')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DELETE('Story'),
            data: result
        })
        let criteria = req.params.id;
        await USER.findOneAndUpdate({_id:req.userId},{$pull:{story:criteria}});
        await COMMENTSTORY.deleteMany({ story: mongoose.Types.ObjectId(criteria) }, { multi: true })
        await STORYCOMMENT.deleteMany({ story: mongoose.Types.ObjectId(criteria) }, { multi: true })
        await SUBREPLY.deleteMany({ story: mongoose.Types.ObjectId(criteria) }, { multi: true })
    } catch (error) {
        console.log(error,"error")
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
};

module.exports = _story;