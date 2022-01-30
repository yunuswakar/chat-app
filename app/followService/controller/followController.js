/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const FOLLOW = require("../../followService/model/followModel"); // import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _follow = {};
const USER = require("../../userServices/model/userModel")
const commonFunction = require('../../../helpers/commonFunctions');
const NOTIFICATION = require("../../notificationService/model/pushNotificationModel");


//Follow User

_follow.follow= async(req, res)=>{  
    try{            
        const user = req.userId;
        const follow = req.params.id;
        if (req.params.id == req.userId) {
            res.send ({
                success: false,
                message: responseMessage.FOLLOW_UNFOLLOW('Follow'),
            });
            return false
        }
        let bulk = FOLLOW.collection.initializeUnorderedBulkOp();
        bulk
          .find({user: mongoose.Types.ObjectId(user)})
          .upsert()
          .updateOne({
            $addToSet: {
              followTo: mongoose.Types.ObjectId(follow),
            },
          });
        bulk
          .find({ user: mongoose.Types.ObjectId(follow) })
          .upsert()
          .updateOne({
            $addToSet: {
                followBy: mongoose.Types.ObjectId(user),
            },
          });
        bulk.execute(async function (err, doc) {
            if (err) {
                res.send ({
                    success: false,
                    message: responseMessage.SOMETHING_WRONG,
                });
            }else {
                let sentTo=await USER.findOne({_id:req.params.id}).select("fcmToken");
                let sentBy=await USER.findOne({_id:req.userId})
                let pushNot=await commonFunction.followNotification(sentTo.fcmToken, "Famebase", `${sentBy.userName} started following you `, req.userId)
                
                let obj={
                    sendBy:req.userId,
                    sendTo:req.params.id,
                    title: "famebase",
                    body:`${sentBy.userName} started following you `,
                    message: `${sentBy.userName} started following you `,
                    notificationType: "Follow"
                }
                let results = await new NOTIFICATION(obj).save();

                res.send({
                    success: true,
                    message: "Followed",
                });
            }
        });
    }catch(error){
        res.send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Unfollow User
_follow.UnFollow= async(req, res)=>{
    try{            
        const user = req.userId;
        const follow = req.params.id;
        if (req.params.id == req.userId) {
            res.send ({
                success: false,
                message: responseMessage.FOLLOW_UNFOLLOW('Unfollow'),
            });
            return false
        }
        let bulk = FOLLOW.collection.initializeUnorderedBulkOp();
    
        bulk
          .find({user: mongoose.Types.ObjectId(user)})
          .upsert()
          .updateOne({
            $pull: {
                followTo: mongoose.Types.ObjectId(follow),
            },
          });
        bulk
          .find({ user: mongoose.Types.ObjectId(follow) })
          .upsert()
          .updateOne({
            $pull: {
                followBy: mongoose.Types.ObjectId(user),
            },
          });
        bulk.execute(async function (err, doc) {
            if (err) {
                res.send ({
                    success: false,
                    message: responseMessage.SOMETHING_WRONG,
                });
            }else {
                res.send({
                    success: true,
                    message: "Unfollowed",
                });
            }
        });
    }catch(error){
        res.send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Get All Followers
_follow.GetAllFollowers = async (req, res) => {
    try {
        let userToFind = req.userId
        const projection = {
            "followBy": 1,
        }
        console.log(userToFind,"followers")
        let result = await FOLLOW.findOne({ user: userToFind })
            .populate("followBy","userName profileImg")
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result?result.followBy?result.followBy:[]:[]
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}    

// Get All Following
_follow.GetAllFollowing = async (req, res) => {
    try {
        let userToFind = req.userId;
        const projection = {
            "followTo": 1,
        }
        console.log(userToFind,"following")
        let result = await FOLLOW.findOne({ user: userToFind })
            .populate("followTo","userName profileImg")
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result?result.followTo?result.followTo:[]:[]
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}  

// Get All Following Post Data
_follow.GetAllFollowingPostData = async (req, res) => {
    try {




        
        let userToFind = req.userId;
        let result = await FOLLOW.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userToFind)
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { idToFind: "$followTo" },
                    pipeline: [
                        {
                            $match: { $expr: { $in: ["$_id", "$$idToFind"] } },
                        },
                        {
                            $project: { profileImg: 1, userName: 1 },
                        },
                        
                        {
                            $lookup: {
                                from: "posts",
                                let: { profile_id: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$postedBy", "$$profile_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: { postedBy: 0 },
                                    },
                                    {
                                        $lookup: {
                                            from: "users",
                                            let: { postedBy: "$viewedBy" },
                                            pipeline: [
                                                { $match: { $expr: { $in: ["$_id", "$$postedBy"] } } },
                                                { $project: { password:0 } },
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
                                                    $unwind: "$followsData"
                                                },
                                                {
                                                    $addFields: {
                                                        isUserFollowing: {
                                                            $cond: {
                                                                if: {
                                                                    $in: [mongoose.Types.ObjectId(userToFind),  {$cond:{if:"$followsData.followBy",then: "$followsData.followBy",
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
                                            as: "viewedBy",
                                        },
                                    },
                                    {
                                        $addFields: {
                                          isLikedByUser: {
                                            $cond: {
                                              if: {
                                                $eq: [mongoose.Types.ObjectId(req.userId), "$likedBy"]
                                              },
                                              then: true,
                                              else: false
                                            }
                                          },
                                            viewCount: {
                                                $cond: {
                                                    if: {
                                                        $eq: [1, "$type"]
                                                    },
                                                    then: {
                                                        $cond: [
                                                            { $isArray: "$viewedBy" },
                                                            { $size: "$viewedBy" },
                                                            0
                                                        ]
                                                    },
                                                    else: false
                                                }
                                            },
                                          "userId": req.userId
                                        }
                                    }, 
                                    {
                                        $lookup: {
                                            from: "comments",
                                            let: { profile_id: "$_id" },
                                            pipeline: [
                                                {
                                                    $match: {
                                                        $expr: {
                                                            $eq: ["$post", "$$profile_id"],
                                                        },
                                                    },

                                                },
                                            ],
                                            as: "comments",
                                        },
                                    },
                                    {
                                        $lookup: {
                                            from: "subreplies",
                                            let: { profile_id: "$_id" },
                                            pipeline: [
                                                {
                                                    $match: {
                                                        $expr: {
                                                            $eq: ["$post", "$$profile_id"],
                                                        },
                                                    },

                                                },
                                            ],
                                            as: "subreplies",
                                        },
                                    },
                                    {
                                        $addFields: {
                                            countComment: {
                                                $add: [
                                                    { $size: "$comments" },
                                                    { $size: "$subreplies" }
                                                ]
                                            },
                                            isLikedByUser: {
                                                $cond: {
                                                    if: {
                                                        $in: [mongoose.Types.ObjectId(req.userId), "$likedBy"]
                                                    },
                                                    then: true,
                                                    else: false
                                                }
                                            },
                                            countLike: { $size: "$likedBy" }
                                        }
                                    },
                                    {
                                        $project: { subreplies: 0, comments: 0 },
                                    },
                                    {
                                        $sort:{createdAt:-1}
                                    }
                                ],
                                as: "postData",
                            },
                        },
                        {
                            $unwind: "$postData"
                        },
                       
                    ],
                    as: "userData"
                },
            }, 
             
        ])
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('User')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result[0] ? result[0].userData : ""
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
} 

// Remove Followers From List
_follow.removeFollowing = async (req, res, next) => {
    try {
        let criteria = { user: req.userId }
        let otherUserId = req.params.id;
        let datatoSet = {
            $pull: {
                followBy: mongoose.Types.ObjectId(otherUserId),
                // followTo: mongoose.Types.ObjectId(otherUserId),
            },
        };
        let updateComment = await FOLLOW.findOneAndUpdate(criteria, datatoSet, { new: true });
        let criteria1 = { user: req.params.id }
        let otherUserId1 = req.userId;
        let datatoSet1 = {
            $pull: {
                followTo: mongoose.Types.ObjectId(otherUserId1),
            },
        };
        let updateComment1 = await FOLLOW.findOneAndUpdate(criteria1, datatoSet1, { new: true });
        if (updateComment) {
            await setResponseObject(req, true,
                "Unfollowed",
                { updatedData: updateComment });
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

// Remove Following From List
_follow.removeFollower = async (req, res, next) => {
    try {
        let criteria = { user: req.userId }
        let otherUserId = req.params.id;
        let datatoSet = {
            $pull: {
                // followBy: mongoose.Types.ObjectId(otherUserId),
                followTo: mongoose.Types.ObjectId(otherUserId),
            },
        };
        let updateComment = await FOLLOW.findOneAndUpdate(criteria, datatoSet, { new: true });
        let criteria1 = { user: req.params.id }
        let otherUserId1 = req.userId;
        let datatoSet1 = {
            $pull: {
                followBy: mongoose.Types.ObjectId(otherUserId1),
            },
        };
        let updateComment1 = await FOLLOW.findOneAndUpdate(criteria1, datatoSet1, { new: true });
        if (updateComment) {
            await setResponseObject(req, true,
                "Unfollowed",
                { updatedData: updateComment });
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

module.exports = _follow;
