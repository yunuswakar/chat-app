
const userModel = require('../models/userModel');
const communityStoryModel = require('../models/communityStoryModel')
const communityReportModel = require('../models/communityReportModel')
const postModel = require('../models/postModel')
const categoryModel = require('../models/categoryModel');
const communityModel = require('../models/communityModel')
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

const jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
const _ = require("lodash")
const mongoose = require("mongoose")
module.exports = {


    addCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, async (error, foodData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!foodData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {

                            if (req.body.coverPageImage) {
                                var pic = await coverPageImage(req.body.coverPageImage)
                            }
                            if (req.body.image) {
                                var pic1 = await upload(req.body.image)
                            }

                            var obj = {
                                communityName: req.body.communityName,
                                categoryId: req.body.categoryId,
                                categoryName: foodData.categoryName,
                                link: req.body.link,
                                communityType: req.body.communityType,
                                communityDescription: req.body.communityDescription,
                                userId: userData._id,
                                userName: userData.name,
                                userPic: userData.profilePic,
                                logo: pic1 ? pic1 : "",
                                coverPage: pic ? pic : "",
                                type: "USER",
                                location: {
                                    type: "Point",
                                    coordinates: [req.body.lat, req.body.long]
                                }
                            }
                            new communityModel(obj).save((error, save) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
        function coverPageImage(coverPageImage) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(coverPageImage, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }

    },


    editCommunity: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var set = {}
                    if (req.body.communityName) {
                        set["communityName"] = req.body.communityName
                    }

                    if (req.body.link) {
                        set["link"] = req.body.link
                    }
                    if (req.body.communityType) {
                        set["communityType"] = req.body.communityType
                    }

                    if (req.body.categoryId) {
                        set["categoryId"] = req.body.categoryId
                    }
                    if (req.body.communityDescription) {
                        set["communityDescription"] = req.body.communityDescription
                    }
                    if (req.body.image) {
                        set["logo"] = await upload(req.body.image)
                    }
                    if (req.body.coverPageImage) {
                        set["coverPage"] = await coverPageImage(req.body.coverPageImage)
                    }
                    var communityData = await communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $set: set }, { new: true })
                    if (communityData) {
                        response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.UPDATE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
        function coverPageImage(coverPageImage) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(coverPageImage, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },

    viewCommunity: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.params.communityId, status: "ACTIVE" }, (error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!findRes) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, findRes, SuccessMessage.DETAIL_GET)
                        }
                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    communityList: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userErr, userResult) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            } else if (!userResult) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                var aggregate = communityModel.aggregate([
                    { $match: { status: "ACTIVE" } },

                    {
                        $addFields: {
                            "isLike": {
                                $cond: {
                                    if: {
                                        $in: [mongoose.Types.ObjectId(req.userId), "$likes"]
                                    },
                                    then: true,
                                    else: false
                                }
                            },
                            "isBookmark": {
                                $cond: {
                                    if: {
                                        $in: [mongoose.Types.ObjectId(req.userId), "$bookmarks"]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },

                ])
                var options = {
                    page: req.body.page || 1,
                    limit: req.body.limit || 10,
                    sort: { createdAt: -1 }


                };
                communityModel.aggregatePaginate(aggregate, options, function (err, results, totalpage, total) {
                    console.log("256", err, results, totalpage, total)
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    // else if (results.length == 0) {
                    //     res.send({ response_code: 404, response_message: "Data not found" })
                    // }
                    else {
                        res.send({ response_code: 200, response_message: "Data found successfully", results, totalpage, total })
                    }
                })
            }
        })

    },


    deleteCommunity: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }, (error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!findRes) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            communityModel.findByIdAndUpdate({ _id: findRes._id }, { $set: { status: "DELETE" } }, { new: true }, (error, deleteSuccess) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, deleteSuccess, SuccessMessage.COMM_DELETE);
                                }
                            })
                        }
                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    commentOnCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                } else {
                    communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }).populate('userId').exec((communityErr, communityResult) => {
                        if (communityErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var comment = {
                                commentedUser: userData._id,
                                comment: req.body.comment,
                                userName: userData.name,
                                userPic: userData.profilePic,
                                commentedTime: new Date()
                            };
                            communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $push: { comments: comment } }, { new: true },
                                (error, success) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $set: { commentCount: success.commentCount + 1 } }, { new: true }, (error, countData) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                var activity = {
                                                    userId: userData._id,
                                                    activity: `You commented on ${communityResult.userId.name}'s community.`,
                                                    communityId: req.body.communityId
                                                };
                                                commonFunction.saveActivity(activity);
                                                response(res, SuccessCode.SUCCESS, success, SuccessMessage.POST_COMMENT);
                                            }
                                        })
                                    }
                                }
                            )
                        }
                    })
                }
            })
        } catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    /**
 * Function Name :like post
 * Description   : post like
 *
 * @return response
*/
    likeAndDislikeCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }).populate('userId').exec((communityErr, communityResult) => {
                        if (communityErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var isBookmark = false;
                            var updatedKey = {};
                            var resp = "";
                            let obj = req.userId;

                            if (req.body.like == true) {
                                resp = "liked";
                                updatedKey = {
                                    $addToSet: { likes: obj }
                                };
                            }
                            else {
                                resp = "disliked";
                                updatedKey = {
                                    $pull: { likes: obj }
                                };
                            }
                            communityModel.findOneAndUpdate({ _id: communityResult._id }, updatedKey, { new: true }, (favErr, favResult) => {
                                if (favErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var activity = {
                                        userId: result._id,
                                        activity: `You liked ${communityResult.userId.name}'s community.`,
                                        communityId: req.body.communityId
                                    };
                                    commonFunction.saveActivity(activity);
                                    if (favResult.bookmarks.includes(req.userId)) {
                                        isBookmark = true
                                    }
                                    var data = {
                                        isLike: req.body.like,
                                        isBookmark: isBookmark,
                                        location: favResult.location,
                                        likeCount: favResult.likes.length,
                                        commentCount: favResult.comments.length,
                                        likes: favResult.likes,
                                        bookmarks: favResult.bookmarks,
                                        status: favResult.status,
                                        _id: favResult._id,
                                        communityName: favResult.communityName,
                                        categoryId: favResult.categoryId,
                                        categoryName: favResult.categoryName,
                                        link: favResult.link,
                                        communityType: favResult.communityType,
                                        communityDescription: favResult.communityDescription,
                                        userName: favResult.userName,
                                        userPic: favResult.userPic,
                                        logo: favResult.logo,
                                        coverPage: favResult.coverPage,
                                        type: favResult.type,
                                        comments: favResult.comments,
                                        createdAt: favResult.createdAt,
                                        updatedAt: favResult.updatedAt
                                    };
                                    response(res, SuccessCode.SUCCESS, data, `Post has been ${resp} successfully`);
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    deleteComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, comments: { $elemMatch: { _id: req.body.commentId } }, status: "ACTIVE" }, (err1, postData) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                        }
                        else {
                            const deleteComment = _.filter(postData.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commentId) }));
                            communityModel.findOneAndUpdate({ _id: req.body.communityId }, { $pull: { comments: deleteComment[0] } }, { new: true }, (updateErr, updatedData) => {
                                console.log("dddddd", updateErr, updatedData)

                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!updatedData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                                }
                                else {
                                    communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $set: { commentCount: postData.commentCount - 1 } }, { new: true }, (error, countData) => {
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [updatedData], SuccessMessage.DELETE_SUCCESS)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })

        }
    },
    editCommunityComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, status: { $ne: "DELETE" } }, (err1, result1) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!result1) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                        }
                        else {
                            const editComments = _.filter(result1.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commentId) }));
                            const newComment = {
                                _id: editComments[0]._id,
                                commentedUser: editComments[0].commentedUser,
                                comment: req.body.comment,
                                userName: editComments[0].userName,
                                userPic: editComments[0].userPic,
                                commentedTime: new Date()
                            }
                            communityModel.findOneAndUpdate({ 'comments._id': req.body.commentId, status: "ACTIVE" }, { $set: { "comments.$": newComment } },
                                { new: true }, (err2, updatedData) => {
                                    if (err2) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    }
                                    else if (!updatedData) {

                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.COMMENT_UPDATE);
                                    }
                                })
                        }
                    })
                }
            })
        }
        catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })

        }
    },
    hideAndDeleteCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                } else {
                    if (req.body.type == "HIDE") {
                        communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" },
                            {
                                $set: { status: "HIDE" }
                            },
                            { new: true },
                            (err1, result1) => {
                                if (err1) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                } else {
                                    return res.send({ response_code: 200, response_message: "Post hide successfully", result: result1 })
                                }
                            })
                    }
                    if (req.body.type == "DELETE") {
                        communityModel.findOneAndUpdate({ _id: req.body.communityId, userId: result._id, status: "ACTIVE" },
                            {
                                $set: { status: "DELETE" }
                            },
                            { new: true },
                            (err1, result1) => {
                                if (err1) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!result1) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                } else {
                                    return res.send({ response_code: 200, response_message: "Post delete successfully", result: result1 })
                                }
                            })
                    }

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }
    },
    communityReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                        }
                        else {
                            var obj = new communityReportModel({
                                reportedBy: userData._id,
                                communityId: result._id,
                                reportReason: req.body.reportReason
                            })
                            obj.save((saveErr, savedData) => {
                                if (saveErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.POST_REPORT)
                                }
                            })
                        }
                    })
                }


            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    trendingCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    communityModel.find({ status: "ACTIVE" }).sort({ "likeCount": -1, "commentCount": -1 }).exec((error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (findRes.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, findRes, SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    recommendedCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    communityModel.find({ userId: userData._id, status: "ACTIVE" }, (error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (findRes.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, findRes, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    commentList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    communityModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (postErr, postData) => {
                        console.log("i am in update", postErr, postData)
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!postData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, postData.comments, SuccessMessage.DATA_FOUND);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    communityProfileList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    communityModel.find({ status: "ACTIVE" }).populate({ path: 'userId', select: 'name profilePic' }).select('userId').exec((error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (findRes.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {

                            response(res, SuccessCode.SUCCESS, findRes, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    bookmarkCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }, (communityErr, communityResult) => {
                        if (communityErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!communityResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var updatedKey = {};
                            if (req.body.bookmark == true) {
                                updatedKey = {
                                    $addToSet: { bookmarks: result._id }
                                }
                            }
                            else {
                                updatedKey = {
                                    $pull: { bookmarks: result._id }
                                }
                            }
                            communityModel.findByIdAndUpdate(communityResult._id, updatedKey, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.COMMUNITY_BOOKMARK);
                                }
                            })
                        }

                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    communityFilter: (req, res) => {
        if (!req.body.category && !req.body.time && req.body.location) {
            communityModel.aggregate([{
                "$geoNear": {
                    "near": {
                        type: "Point",
                        coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                    },
                    "maxDistance": 10000,
                    "distanceField": "dist.calculated",
                    "includeLocs": "dist.location",
                    "spherical": true
                }
            },
            { $match: { status: "ACTIVE" } },


            ], function (err, data) {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    return res.send({ response_code: 200, response_message: "Data found successfully", data })
                }
            })
        }
        else if (req.body.category && !req.body.location && !req.body.time) {
            communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    return res.send({ response_code: 200, response_message: "Data found successfully", data })
                }
            })
        }
        else if (req.body.time && !req.body.location && !req.body.category) {
            if (req.body.time == "today") {
                var start = new Date();
                start.setHours(0, 0, 0, 0);

                var end = new Date();
                end.setHours(23, 59, 59, 999);

                communityModel.find({ createdAt: { $gte: start, $lt: end } }, (error, data) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })

                    }
                })
            }
            else if (req.body.time == "weekly") {
                Date.prototype.getWeek = function () {
                    var onejan = new Date(this.getFullYear(), 0, 1);
                    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                    var dayOfYear = ((today - onejan + 86400000) / 86400000);
                    return Math.ceil(dayOfYear / 7)
                };
                var today = new Date();
                var currentWeekNumber = today.getWeek();


                communityModel.aggregate([
                    {
                        "$redact": {
                            "$cond": [
                                { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                                "$$KEEP",
                                "$$PRUNE"
                            ]
                        }
                    },

                ], function (err, data) {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })
                    }
                })
            }
            else if (req.body.time == "monthly") {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var month = Number(end.toISOString().split("-")[1])

                communityModel.aggregate([
                    {
                        "$redact": {
                            "$cond": [
                                { "$eq": [{ "$month": "$createdAt" }, month] },

                                "$$KEEP",
                                "$$PRUNE"
                            ]
                        }
                    },

                ], function (err, data) {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })
                    }
                })
            }
            else {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var year = Number(end.toISOString().split("-")[0])

                communityModel.aggregate([
                    {
                        "$redact": {
                            "$cond": [
                                { "$eq": [{ "$year": "$createdAt" }, year] },

                                "$$KEEP",
                                "$$PRUNE"
                            ]
                        }
                    },

                ], function (err, data) {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })
                    }
                })
            }
        }

        else if (req.body.time && req.body.location && !req.body.category) {
            if (req.body.time == "today" && req.body.location == true) {
                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },
                { $match: { status: "ACTIVE" } },


                ], function (error, locationData) {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!locationData) {
                        return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                        var start = new Date();
                        start.setHours(0, 0, 0, 0);

                        var end = new Date();
                        end.setHours(23, 59, 59, 999);

                        communityModel.find({ createdAt: { $gte: start, $lt: end } }, (error, data) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })

                            }
                        })
                    }
                })
            }
            else if (req.body.time == "weekly" && req.body.location == true) {

                Date.prototype.getWeek = function () {
                    var onejan = new Date(this.getFullYear(), 0, 1);
                    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                    var dayOfYear = ((today - onejan + 86400000) / 86400000);
                    return Math.ceil(dayOfYear / 7)
                };
                var today = new Date();
                var currentWeekNumber = today.getWeek();

                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },
                {
                    "$redact": {
                        "$cond": [
                            { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                            "$$KEEP",
                            "$$PRUNE"
                        ]
                    }
                },
                { $match: { status: "ACTIVE" } },


                ], function (error, data) {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })

                    }
                })
            }
            else if (req.body.time == "monthly" && req.body.location == true) {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var month = Number(end.toISOString().split("-")[1])
                var year = Number(end.toISOString().split("-")[0])



                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },
                {
                    "$redact": {
                        "$cond": [
                            { "$eq": [{ "$month": "$createdAt" }, month] },

                            "$$KEEP",
                            "$$PRUNE"
                        ]
                    }
                },
                { $match: { status: "ACTIVE" } },


                ], function (error, data) {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })

                    }
                })
            }
            else {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var year = Number(end.toISOString().split("-")[0])



                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },
                {
                    "$redact": {
                        "$cond": [
                            { "$eq": [{ "$year": "$createdAt" }, year] },

                            "$$KEEP",
                            "$$PRUNE"
                        ]
                    }
                },
                { $match: { status: "ACTIVE" } },


                ], function (error, data) {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })

                    }
                })
            }

        }


        else if (req.body.time && req.body.category && !req.body.location) {
            if (req.body.time == "today" && req.body.category == true) {
                var start1 = new Date();
                start1.setHours(0, 0, 0, 0);

                var end1 = new Date();
                end1.setHours(23, 59, 59, 999);

                communityModel.find({ createdAt: { $gte: start1, $lt: end1 }, categoryId: { $in: req.body.categoryId }, }, (error, data) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Data found successfully", data })
                    }
                })
            }
            else if (req.body.time == "weekly" && req.body.category == true) {
                communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data1) => {
                    if (userErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        Date.prototype.getWeek = function () {
                            var onejan = new Date(this.getFullYear(), 0, 1);
                            var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                            var dayOfYear = ((today - onejan + 86400000) / 86400000);
                            return Math.ceil(dayOfYear / 7)
                        };
                        var today = new Date();
                        var currentWeekNumber = today.getWeek();
                        console.log("1182====>",currentWeekNumber)
        
        
                        communityModel.aggregate([
                            {
                                "$redact": {
                                    "$cond": [
                                        { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },
        
                                        "$$KEEP",
                                        "$$PRUNE"
                                    ]
                                }
                            },
        
                        ], function (err, data) {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })
                            }
                        })
                    }
                })
            }
            else if (req.body.time == "monthly" && req.body.category == true) {
                communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data1) => {
                    if (userErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                        var month = Number(end.toISOString().split("-")[1])

                        communityModel.aggregate([
                            {
                                "$redact": {
                                    "$cond": [
                                        { "$eq": [{ "$month": "$createdAt" }, month] },

                                        "$$KEEP",
                                        "$$PRUNE"
                                    ]
                                }
                            },
                            { $match: { status: "ACTIVE" } },

                        ], function (err, data) {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })
                            }
                        })
                    }
                })
            }
            else {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var year = Number(end.toISOString().split("-")[0])

                communityModel.aggregate([
                    {
                        "$redact": {
                            "$cond": [
                                { "$eq": [{ "$year": "$createdAt" }, year] },

                                "$$KEEP",
                                "$$PRUNE"
                            ]
                        }
                    },
                    { $match: { status: "ACTIVE" } },


                ], function (err, data1) {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })
                            }
                        })
                    }
                })
            }
        }
        else if (req.body.location && req.body.category && !req.body.time) {
            communityModel.aggregate([{
                "$geoNear": {
                    "near": {
                        type: "Point",
                        coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                    },
                    "maxDistance": 10000,
                    "distanceField": "dist.calculated",
                    "includeLocs": "dist.location",
                    "spherical": true
                }
            },

            { $match: { status: "ACTIVE" } },


            ], function (error, data1) {
                console.log("1206===>", error, data1)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data1.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data) => {
                        if (userErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (data.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            return res.send({ response_code: 200, response_message: "Data found successfully", data })
                        }
                    })
                }
            })

        }
        else if (req.body.location && req.body.category && req.body.time) {
            if (req.body.location == true && req.body.category == true && req.body.time == "today") {
                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },

                { $match: { status: "ACTIVE" } },


                ], function (error, data1) {
                    console.log("1206===>", error, data1)
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {

                        communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data2) => {
                            console.log("1310===>", userErr, data2)
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data2.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                var start = new Date();
                                start.setHours(0, 0, 0, 0);

                                var end = new Date();
                                end.setHours(23, 59, 59, 999);

                                communityModel.find({ createdAt: { $gte: start, $lt: end } }, (error, data) => {
                                    console.log("1325====>", error, data)
                                    if (error) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (data.length == 0) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                                    }
                                    else {
                                        return res.send({ response_code: 200, response_message: "Data found successfully", data })

                                    }
                                })
                            }
                        })
                    }
                })
            }
            else if (req.body.location == true && req.body.category == true && req.body.time == "weekly") {


                communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data1) => {
                    if (userErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        Date.prototype.getWeek = function () {
                            var onejan = new Date(this.getFullYear(), 0, 1);
                            var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                            var dayOfYear = ((today - onejan + 86400000) / 86400000);
                            return Math.ceil(dayOfYear / 7)
                        };
                        var today = new Date();
                        var currentWeekNumber1 = today.getWeek();
        
                        communityModel.aggregate([{
                            "$geoNear": {
                                "near": {
                                    type: "Point",
                                    coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                                },
                                "maxDistance": 10000,
                                "distanceField": "dist.calculated",
                                "includeLocs": "dist.location",
                                "spherical": true
                            }
                        },
                        {
                            "$redact": {
                                "$cond": [
                                    { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber1] },
        
                                    "$$KEEP",
                                    "$$PRUNE"
                                ]
                            }
                        },
        
                        { $match: { status: "ACTIVE" } },
        
        
                        ], function (error, data) {
                            console.log("1206===>", error, data)
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })
                            }
                        })
                    }
                })
              
            }
            else if (req.body.location == true && req.body.category == true && req.body.time == "monthly") {


                communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data1) => {
                    if (userErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                        var month = Number(end.toISOString().split("-")[1])
        
                        communityModel.aggregate([{
                            "$geoNear": {
                                "near": {
                                    type: "Point",
                                    coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                                },
                                "maxDistance": 10000,
                                "distanceField": "dist.calculated",
                                "includeLocs": "dist.location",
                                "spherical": true
                            }
                        },
                        {
                            "$redact": {
                                "$cond": [
                                    { "$eq": [{ "$month": "$createdAt" }, month] },
        
                                    "$$KEEP",
                                    "$$PRUNE"
                                ]
                            }
                        },
        
                        { $match: { status: "ACTIVE" } },
        
        
                        ], function (error, data) {
                            console.log("1206===>", error, data)
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })
                            }
                        })
                    }
                })
            }
            else {
                let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                var year = Number(end.toISOString().split("-")[0])

                communityModel.aggregate([{
                    "$geoNear": {
                        "near": {
                            type: "Point",
                            coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                        },
                        "maxDistance": 10000,
                        "distanceField": "dist.calculated",
                        "includeLocs": "dist.location",
                        "spherical": true
                    }
                },
                {
                    "$redact": {
                        "$cond": [
                            { "$eq": [{ "$year": "$createdAt" }, year] },

                            "$$KEEP",
                            "$$PRUNE"
                        ]
                    }
                },

                { $match: { status: "ACTIVE" } },


                ], function (error, data1) {
                    console.log("1206===>", error, data1)
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (data1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        communityModel.find({ categoryId: { $in: req.body.categoryId }, status: "ACTIVE" }, (userErr, data) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (data.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                return res.send({ response_code: 200, response_message: "Data found successfully", data })

                            }
                        })
                    }
                })
            }
        }

    },

    myCommunityList: (req, res) => {
        userModel.findOne({ _id: req.query.userId, status: "ACTIVE" }, (userErr, userResult) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            } else if (!userResult) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                var aggregate = communityModel.aggregate([
                    { $match: { userId: mongoose.Types.ObjectId(req.query.userId), status: "ACTIVE" } },

                    {
                        $addFields: {
                            "isLike": {
                                $cond: {
                                    if: {
                                        $in: [mongoose.Types.ObjectId(req.query.userId), "$likes"]
                                    },
                                    then: true,
                                    else: false
                                }
                            },
                            "isBookmark": {
                                $cond: {
                                    if: {
                                        $in: [mongoose.Types.ObjectId(req.query.userId), "$bookmarks"]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },

                ])

                var options = {
                    page: req.query.page || 1,
                    limit: req.query.limit || 10,
                    sort: { createdAt: -1 }
                };

                communityModel.aggregatePaginate(aggregate, options, (err, result, totalpage, total) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        return res.send({ response_code: 200, response_message: "Requested data found", result, totalpage, total })
                    }
                })
            }
        })

    },

    //-------------community story--------------------------------------
    createCommunityStory: async (req, res) => {
        try {
            var form = new multiparty.Form();
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, result) => {
                console.log("im in user", result)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    form.parse(req, async (err, fields, files) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], "Unsupported format")
                        }
                        else {
                            if (files.image) {
                                var imgArray = files.image.map((item) => (item.path))
                                function convertImage() {
                                    return new Promise((resolve, reject) => {
                                        commonFunction.multipleImageUploadCloudinary(imgArray, (imageError, upload) => {
                                            if (imageError) {
                                                console.log("Error uploading image")
                                            }
                                            else {
                                                resolve(upload)
                                            }
                                        })
                                    })
                                }
                            }
                            if (files.video) {
                                var videoArray = files.video.map((item) => (item.path))
                                function convertVideo() {
                                    return new Promise((resolve, reject) => {
                                        commonFunction.multipleVideoUploadCloudinary(videoArray, (videoErr, uploadData) => {
                                            if (videoErr) {
                                                console.log("error while video Uploading")
                                            }
                                            else {
                                                resolve(uploadData)
                                            }
                                        })
                                    })
                                }

                            }
                            if (files.image) {
                                var picture = await convertImage()
                            }
                            if (files.video) {
                                var videoUrl = await convertVideo()
                            }

                            var story = {
                                userId: result._id,
                                userName: result.name,
                                userPic: result.profilePic,
                                storyPrivacy: fields.storyPrivacy[0],
                                text: fields.text[0],
                                image: picture,
                                video: videoUrl
                            }
                            // if (fields.feedType == "PRIVATE") {
                            //     post.feedType = "PRIVATE"
                            //         post.timeLine = []
                            //     result.friendList.forEach(x => {
                            //         post.timeLine.push(x.friendId)
                            //     })
                            // }
                            communityStoryModel.create(story, async (postError, storyData) => {
                                console.log("im in save data", postError, storyData)
                                if (postError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, storyData, SuccessMessage.DATA_SAVED)
                                }
                            })
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewStory: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    communityStoryModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (err, data) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    storyList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 5,
                        sort: {
                            createdAt: -1
                        },
                    }
                    communityStoryModel.paginate({ status: "ACTIVE" }, options, (storyErr, storyData) => {
                        if (storyErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (storyData.length == 0) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, storyData, SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    myCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 5,
                        sort: {
                            createdAt: -1
                        },
                    }
                    communityModel.paginate({ status: "ACTIVE" ,userId: req.userId}, options, (storyErr, storyData) => {
                        if (storyErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (storyData.docs.length == 0) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, storyData, SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

}