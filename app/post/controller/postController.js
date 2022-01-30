/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const POST = require("../../postService/model/postModel"); // import user model to perform crud operation
const REPORT = require("../../reportService/model/reportModel")
const COMMENT = require("../../commentService/model/commentModel")
const LIKE = require('../../likeUnlikeService/model/likeUnlikeModel')
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/post/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const { post } = require("../../../routes");
const { json } = require("body-parser");
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
    .setResponseObject;
const _post = {};

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
const upload = multer({ storage: storage }).single("postImg");

//Post create by User
_post.UserPost = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                await setResponseObject(req, false, err.message, "");
            } else {
                let data = req.body;
                data.postedBy = req.userId
                if (req.file) {
                    let image = req.file.path;
                    data.postImg = image;
                }
                let result = await POST.create(data)
                res.status(200).send({
                    success: true,
                    message: responseMessage.ADD_SUCCESS('Post'),
                    data: result
                })
            }
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Get all Posts of login user
_post.getPostsLoginUser = async (req, res) => {
    try {
        let id = req.userId
        let count = await POST.find({ postedBy: id }).countDocuments()
        let result = await POST.find({ postedBy: id }).populate('postedBy', '-password')
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

//Get All post By Admin
_post.getPostsLists = async (req, res) => {
    try {
        let result = await POST.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { postedBy: "$postedBy" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$postedBy"] } } },
                        { $project: { password: 0 } }
                    ],
                    as: "postedBy",
                }
            },
            {
                $unwind: "$postedBy"
            },
             {
                $lookup:{
                    from:'users',
                    localField:'likedBy',
                    foreignField:'_id',
                    as:'likedBy'
                }
            }, 
            {$addFields:{countComment:{$size:"$comments"}}},
            {$addFields:{countLike:{$size:"$likes"}}}
        ]);
        res.send({ status: 200, success: true, data: result })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}
_post.getPostsList = async (req, res) => {
    try {
        if (req.role !== 2 && req.role !== 1) {
            throw { message: responseMessage.UNAUTHORIZED }
        }
        let count = await POST.find().countDocuments()
        let result = await POST.find()
            .populate('postedBy', '-password')
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
//Get All post of User
_post.getAllPostsById = async (req, res) => {
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        if (pageNo <= 0) {
            throw { message: message.PAGE_INVALID };
        }
        let count = await POST.find({ postedBy: req.params.id }).countDocuments()
        let result = await POST.find({ postedBy: req.params.id })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .sort({ createdAt: -1 })
        // let viewCount= result.likedBy.length
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            // totalLike:viewCount,
            data: result, count
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Get One Post By Id
_post.getPostsById = async (req, res) => {
    try {
        let result = await POST.findOne({ _id: req.params.id })
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Post')
            })
            return
        }
        let likeCount = result.likedBy.length
        let criteria = req.params.id
        let totalCommnets = await COMMENT.find({ post: mongoose.Types.ObjectId(criteria) }).countDocuments()
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result, totalCommnets, likeCount
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}

//Delete One Post By Id
_post.deletePostsById = async (req, res) => {
    try {
        let result = await POST.findByIdAndRemove({ _id: req.params.id })
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Post')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DELETE('Post'),
            data: result
        })
        let criteria = req.params.id
        let findallReportedPost = await REPORT.deleteMany({ postReport: mongoose.Types.ObjectId(criteria) }, { multi: true })
        let findallCommentPost = await COMMENT.deleteMany({ post: mongoose.Types.ObjectId(criteria) }, { multi: true })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: responseMessage.SOMETHING_WRONG
        })
    }
}
//Update One Post By Id
_post.updatePost = async (req, res, next) => {
    try {
        if (req.role !== 2 && req.role !== 1) {
            throw { message: responseMessage.UNAUTHORIZED }
            next()
        }
        let data = req.body;
        let updatePost = await POST.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, data, { new: true });
        if (updatePost) {
            await setResponseObject(req, true, responseMessage.UPDATE_SUCCESS('Post'), { updatePost: updatePost });
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



module.exports = _post;