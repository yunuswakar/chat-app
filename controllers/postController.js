const userModel = require('../models/userModel');
const postModel = require('../models/postModel')
const notificationModel = require('../models/notificationModel')
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const postReportModel = require('../models/reportModel')
const jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
const mongoose = require('mongoose')

module.exports = {
    /**
     * Function Name :createPost
     * Description   : Create post by user
     *
     * @return response
    */

    createPost: async (req, res) => {
        try {
            var form = new multiparty.Form();
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (error, result) => {
                console.log("im in user", result)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    form.parse(req, async (err, fields, files) => {
                        console.log("files anf fields", files,fields)
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
                                console.log(">>>>>>>>>>>>>>>>>>>>> im in video",files.video)
                                var videoArray = files.video.map((item) => (item.path))
                                console.log(">>>>>>>>>>>11", videoArray)
                                function convertVideo() {
                                    return new Promise((resolve, reject) => {
                                        commonFunction.multipleVideoUploadCloudinary(videoArray, (videoErr, uploadData) => {
                                            console.log("im in upload function",videoErr,uploadData)
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

                            var post = {
                                userId: result._id,
                                postType: "POST",
                                userName: result.name,
                                userPic: result.profilePic,
                                feedType: fields.feedType[0],
                                title: fields.title[0],
                                categoryId: fields.categoryId[0],
                                categoryName: fields.categoryName[0],
                                image: picture,
                                video: videoUrl
                            }
                            if (fields.feedType == "PUBLIC") {
                                post.feedType = "PUBLIC"
                                    post.timeLine = []
                                result.following.forEach(x => {
                                    post.timeLine.push(x._id)
                                })
                            }
                            if (fields.feedType == "PRIVATE") {
                                post.feedType = "PRIVATE"
                                post.timeLine = []
                                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",fields.selectedFriend)
                                post.timeLine.push(...fields.selectedFriend)
                            }
                            postModel.create(post, async (postError, postData) => {
                                console.log("im in save data", postError, postData)
                                if (postError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, postData, SuccessMessage.DATA_SAVED)
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

    viewPost: (req, res) => {
        try {

            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    postModel.findOne({ _id: req.params._id, postStatus: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                        }
                    })
                 }
                })
     
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    // createPost: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, userType: "USER" }, async (err, result) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 if (req.body.feedType == "PRIVATE") {
    //                     post.feedType = "PRIVATE",
    //                         post.timeLine = []
    //                     result.friendList.forEach(x => {
    //                         post.timeLine.push(x.friendId)
    //                     })
    //                 }
    //                 if (req.body.image) {
    //                     var image = await convertImage()
    //                 }
    //                 if (req.body.video) {
    //                     var video = await convertVideo()
    //                 }
    //                 var post = {
    //                     userId: result._id,
    //                     title: req.body.title,
    //                     image: image,
    //                     video: video,
    //                     text: req.body.text,
    //                     tag: req.body.tagId,
    //                     feedType: req.body.feedType
    //                 }
    //                 postModel.create(post, async (error, success1) => {
    //                     if (error) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else {
    //                         response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_SAVED)
    //                     }
    //                 })
    //                 //*********************Function for  pic upload *************************************/
    //                 function convertImage() {
    //                     return new Promise((resolve, reject) => {
    //                         commonFunction.uploadImage(req.body.image, (error, upload) => {
    //                             if (error) {
    //                                 console.log("Error uploading image")
    //                             }
    //                             else {
    //                                 resolve(upload)
    //                             }
    //                         })
    //                     })
    //                 }
    //                 //*************************function for video upload*****************************/
    //                 function convertVideo() {
    //                     return new Promise((resolve, reject) => {
    //                         commonFunction.videoUpload(req.body.videoLink, (videoErr, uploadData) => {
    //                             console.log("i am in video")
    //                             if (videoErr) {
    //                                 console.log("error while video Uploading")
    //                             }
    //                             else {
    //                                 resolve(uploadData)
    //                             }
    //                         })
    //                     })
    //                 }
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    deletePost: (req, res) => {
        try {
            postModel.findOne({ _id: req.body.postId, userId: req.userId, postStatus: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    postModel.findOneAndUpdate({ _id: result._id }, { $set: { postStatus: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    hidePost: (req, res) => {
        try {
            postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    postModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { hiddenByUsers: req.userId } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.HIDE_SUCCESS);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
 * Function Name :editPost
 * Description   : edit post by user
 *
 * @return response
*/

editPost: async (req, res) => {
    try {
        userModel.findOne({ _id: req.userId, userType: "USER" }, async (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var form = new multiparty.Form();
                form.parse(req, async (error, field, files) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                    else {
                        var set = {}
                        if (files.image) {
                            var imgArray = files.image.map((item) => (item.path))
                            console.log(">>>>>>>>>>>11", imgArray)
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
                            set["image"] = await convertImage()
                        }
                        if (files.video) {
                            set["video"] = await convertVideo()
                        }
                        if (field.title) {
                            set["title"] =  field.title[0]
                        }
                        if (field.categoryId) {
                            set["categoryId"] =  field.categoryId[0]
                        }
                        if (field.categoryName) {
                            set["categoryName"] =  field.categoryName[0]
                        }
                        if (field.feedType) {
                            set["feedType"] =  field.feedType[0]
                        }
              
                        postModel.findOneAndUpdate({ _id: req.headers.post_id }, { $set: set }, { new: true }, async (updateErr, updateData) => {
                            console.log(">>>>>>>>>>>>>>>11",updateErr,updateData)
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS);
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


    /**
     * Function Name :togglePrivatePublic
     * Description   : toggle between private and public
     *
     * @return response
    */


    togglePrivatePublic: (req, res) => {
        try {
            var set = req.body.feedType
            postModel.findOneAndUpdate({ _id: req.body.postId, status: "ACTIVE" }, { $set: set }, { new: true }, async (err, toggle) => {

                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!toggle) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, post, SuccessMessage.UPDATE_SUCCESS);
                }

            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
         * Function Name :listPrivateFeeds
         * Description   : show all Private feeds
         *
         * @return response
        */

    listPrivateFeeds: (req, res) => {
        try {
            userModel.findOne({ userId: req.body.userId, status: "ACTIVE" }, async (err, list) => {

                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!list) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    postModel.find({ feedType: "PRIVATE" }, async (err, feed) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!feed) {
                            response(res, ErrorCode.NOT_FOUND, [], "Feed not found.")
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, post, SuccessMessage.UPDATE_SUCCESS);
                        }

                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
         * Function Name :listPublicFeeds
         * Description   : show all Public feeds
         *
         * @return response
        */

    listPublicFeeds: (req, res) => {
        try {
            userModel.findOne({ userId: req.body.userId, status: "ACTIVE" }, async (err, list) => {

                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!list) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    postModel.find({ feedType: "PUBLIC" }, async (err, feed) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!feed) {
                            response(res, ErrorCode.NOT_FOUND, [], "Feed not found.")
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, post, SuccessMessage.UPDATE_SUCCESS);
                        }

                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
     * Function Name :commentOnPost
     * Description   : comment on post by user
     *
     * @return response
    */

    commentOnPost: (req, res) => {
        try {
            //console.log("i am in body", req.body)
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                } else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }).populate('userId').exec((postErr, postData) => {
                        if (postErr) {
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
                            postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" }, { $push: { comments: comment } }, { new: true },
                                (error, success) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        var obj = {
                                            userId: success.userId,
                                            senderId: req.userId,
                                            postId: req.body.postId,
                                            title: "Post Commented",
                                            body: `${userData.name} commented on your post`,
                                            notificationType: "Post commented"
                                        };
                                        new notificationModel(obj).save((saveErr, saveResult) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                postModel.findOneAndUpdate({_id: req.body.postId, postStatus: "ACTIVE" },{$set:{commentCount:postData.commentCount+1}},{new:true},(countErr,countData)=>{
                                                    if (countErr) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else{
                                                        var activity = {
                                                            userId: userData._id,
                                                            name:userData.name,
                                                            profilePic:userData.profilePic, 
                                                            time : new Date(),                                                  
                                                            activity: `You commented on ${postData.userId.name}'s post.`,
                                                            postId: req.body.postId
                                                        };
                                                        commonFunction.saveActivity(activity);
                                                        response(res, SuccessCode.SUCCESS, success, SuccessMessage.POST_COMMENT);
                                                    }
                                                })
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
    likeAndDislikePost: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                } else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }).populate('userId').exec((postErr, postData) => {
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else {
                            var isBookmark = false;
                            if (req.body.like == true) {
                                postModel.findOneAndUpdate({ _id: postData._id }, { $addToSet: { likes: userData._id } }, { new: true }, (error, success) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        var obj = {
                                            userId: success.userId,
                                            senderId: req.userId,
                                            postId: req.body.postId,
                                            title: "Post Liked",
                                            body: `${userData.name} liked your post`,
                                            notificationType: "Post liked"
                                        };
                                        new notificationModel(obj).save((saveErr, saveResult) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                postModel.findOneAndUpdate({_id: req.body.postId, postStatus: "ACTIVE" },{$set:{likeCount:postData.likeCount+1}},{new:true},(countErr,countData)=>{
                                                    if (countErr) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else{
                                                        var activity = {
                                                            userId: userData._id,
                                                            name:userData.name,
                                                            profilePic:userData.profilePic,
                                                            activity: `You liked ${postData.userId.name}'s post.`,
                                                            postId: req.body.postId
                                                        };
                                                        commonFunction.saveActivity(activity);
                                                        if (success.bookmarks.includes(req.userId)) {
                                                            console.log("534", success.bookmarks)
                                                            isBookmark = true;
                                                        }
                                                        const count = success.likes.length;
                                                        var data = {
                                                            isLike: true,
                                                            isBookmark: isBookmark,
                                                            tag: success.tag,
                                                            image: success.image,
                                                            video: success.video,
                                                            feedType: success.feedType,
                                                            timeLine: success.timeLine,
                                                            postStatus: success.postStatus,
                                                            notifyUsers: success.notifyUsers,
                                                            likes: success.likes,
                                                            bookmarks: success.bookmarks,
                                                            _id: success._id,
                                                            userId: success.userId,
                                                            postType: success.postType,
                                                            userName: success.userName,
                                                            userPic: success.userPic,
                                                            title: success.title,
                                                            text: success.text,
                                                            categoryId: success.categoryId,
                                                            categoryName: success.categoryName,
                                                            comments: success.comments,
                                                            createdAt: success.createdAt,
                                                            updatedAt: success.updatedAt
                                                        }
                                                        return res.send({ response_code: 200, response_message: "Post liked successfully", likes: count, result: data })
                                                    }
                                                })

                                   
                                            }
                                        })
                                    }
                                })
                            }
                            if (req.body.like == false) {
                                postModel.findByIdAndUpdate({ _id: postData._id }, { $pull: { likes: userData._id } }, { new: true }, (error, update) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    } else if (!update) {
                                        return res.send({ responseCode: 404, responseMessage: "Unable to update" })
                                    } else {

                                        postModel.findOneAndUpdate({_id: req.body.postId, postStatus: "ACTIVE" },{$set:{likeCount:postData.likeCount-1}},{new:true},(countErr,countData)=>{
                                            if (countErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else{
                                                if (update.bookmarks.includes(req.userId)) {
                                                    isBookmark = true;
                                                }
                                                const count = update.likes.length;
                                                var data = {
                                                    isLike: false,
                                                    isBookmark: isBookmark,
                                                    tag: update.tag,
                                                    image: update.image,
                                                    video: update.video,
                                                    feedType: update.feedType,
                                                    timeLine: update.timeLine,
                                                    postStatus: update.postStatus,
                                                    notifyUsers: update.notifyUsers,
                                                    likes: update.likes,
                                                    bookmarks: update.bookmarks,
                                                    _id: update._id,
                                                    userId: update.userId,
                                                    postType: update.postType,
                                                    userName: update.userName,
                                                    userPic: update.userPic,
                                                    title: update.title,
                                                    text: update.text,
                                                    categoryId: update.categoryId,
                                                    categoryName: update.categoryName,
                                                    comments: update.comments,
                                                    createdAt: update.createdAt,
                                                    updatedAt: update.updatedAt
                                                }
                                                return res.send({ response_code: 200, response_message: "Post disliked successfully", likes: count, result: data })
                                            }
                                            })
                            
                                    }

                                })

                            }
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
                    postModel.findOne({ _id: req.body.postId, postStatus: { $ne: "DELETE" } }, (err1, postData) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                        }
                        else {
                            const deleteComments = _.filter(postData.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commentId) }));
                            console.log("dddddd", deleteComments[0])
                            postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" }, { $pull: { comments: deleteComments[0] } }, { new: true }, (updateErr, updatedData) => {
                                console.log("dddddd", updateErr, updatedData)

                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!updatedData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                                }
                                else {
                                    postModel.findOneAndUpdate({_id: req.body.postId, postStatus: "ACTIVE" },{$set:{commentCount:postData.commentCount+1}},{new:true},(countErr,countData)=>{
                                        if (countErr) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else{
                                            response(res, SuccessCode.SUCCESS, [updatedData], SuccessMessage.COMMENT_UPDATE);
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
    editPostComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: { $ne: "DELETE" } }, (err1, postData) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                        }
                        else {
                            const editComments = _.filter(result1.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commented) }));
                            const newComment = {
                                _id: editComments[0]._id,
                                commentedUser: editComments[0].commentedUser,
                                comment: req.body.comment,
                                name: editComments[0].name,
                                profilePic: editComments[0].profilePic,
                                commentedTime: new Date()
                            }
                            postModel.findOneAndUpdate({ 'comments._id': req.body.commented, postStatus: "ACTIVE" }, { $set: { "comments.$": newComment } }, { new: true }, (updateErr, updatedData) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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
    /**
     * Function Name : post list
     * Description   : post list get by user
     *
     * @return response
    */
    postList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userErr, userResult) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var aggregate = postModel.aggregate([
                        { $match: { postStatus: "ACTIVE", hiddenByUsers: { $nin: [mongoose.Types.ObjectId(req.userId)] } } },

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
                        page: req.query.page || 1,
                        limit: req.query.limit || 10,
                        sort: { createdAt: -1 }
                    };
                    postModel.aggregatePaginate(aggregate, options, function (err, results, totalpage, total) {
                        //console.log("256", err, results, totalpage, total)
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
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
      * Function Name :my post list
      * Description   : post list get by user
      *
      * @return response
     */
    myPostList: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userResult) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var aggregate = postModel.aggregate([
                        { $match: { userId: mongoose.Types.ObjectId(req.body.userId), postStatus: "ACTIVE" } },

                        {
                            $addFields: {
                                "isLike": {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(req.body.userId), "$likes"]
                                        },
                                        then: true,
                                        else: false
                                    }
                                },
                                "isBookmark": {
                                    $cond: {
                                        if: {
                                            $in: [mongoose.Types.ObjectId(req.body.userId), "$bookmarks"]
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

                    postModel.aggregatePaginate(aggregate, options, (err, result, totalpage, total) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            return res.send({ response_code: 200, response_message: "Requested data found", result, totalpage, total })
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
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
                    postModel.findOne({ _id: req.params._id, postStatus: "ACTIVE" }, (postErr, postData) => {
                        console.log("i am in update", postErr, postData)
                        //return
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
    replyOnComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOne({ _id: req.body.postId, "comments._id": req.body.commentId, postStatus: "ACTIVE" }).populate('comments.commentedUser').select({ 'comments.$._id': 1 }).exec((err, postResult) => {
                        console.log(">>>>>>>5091", err, postResult);
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var comment = {
                                commentId: req.body.commentId,
                                commentedUser: userData._id,
                                comment: req.body.comment,
                                userName: userData.name,
                                userPic: userData.profilePic,
                                commentedTime: new Date()
                            };
                            var obj = {
                                userId: postResult.comments[0].commentedUser._id,
                                senderId: userData._id,
                                title: "Reply on comment",
                                body: `${userData.name} replied on your comment.`,
                                senderIdMessage: `${userData.name} replied on ${postResult.comments[0].commentedUser.name} comment`,
                                notificationType: "Comment replied on post",
                                requestFor: "COMMENT"
                            };

                            new notificationModel(obj).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    console.log("post>>>>", postResult)
                                    postModel.findOneAndUpdate({ "comments._id": req.body.commentId, postStatus: "ACTIVE" },
                                        { $push: { "comments.$.replyComments": comment } },
                                        { new: true },
                                        (err2, result2) => {
                                            console.log("Repyyyy", result2)
                                            if (err2) {
                                                console.log("13107======>", err2, result2)

                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                            } else {
                                                response(res, SuccessCode.SUCCESS, result2, SuccessMessage.POST_COMMENT);
                                            }
                                        }
                                    )
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
    deleteReplyComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err1, postData) => {
                        console.log("sssfsfssss", err1, postData)
                        //return
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                        }
                        else {
                            // const deleteReplyComments = _.filter(postData.comments[0].replyComments, _.matches({ _id: mongoose.Types.ObjectId(req.body.replyId) }));
                            // console.log("hhdhddgd8888888888888d", deleteReplyComments[0])
                            // return
                            postModel.findOneAndUpdate({ "comments._id": req.body.commentId },
                                { $pull: { "comments.$.replyComments": { _id: req.body.replyId } } }, { new: true },
                                (updateErr, updatedData) => {
                                    console.log("ddd1019ddd", updateErr, updatedData)
                                    if (updateErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!updatedData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.DELETE_REPLY);
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
    createBlog: async (req, res) => {
        try {
            var form = new multiparty.Form();
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (error, result) => {
                console.log("im in user", result)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    form.parse(req, async (err, fields, files) => {
                        // console.log("files anf fields", files,fields)
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], "Unsupported format")
                        }
                        else {
                            if (files.image) {
                                var imgArray = files.image.map((item) => (item.path))
                                console.log(">>>>>>>>>>>11", imgArray)
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

                            var post = {
                                userId: result._id,
                                postType: "BLOG",
                                userName: result.name,
                                userPic: result.profilePic,
                                feedType: fields.feedType[0],
                                title: fields.title[0],
                                text: fields.text[0],
                                tag: fields.tag[0],
                                categoryId: fields.categoryId[0],
                                categoryName: fields.categoryName[0],
                                image: picture,
                                video: videoUrl
                            }
                            if (fields.feedType == "PUBLIC") {
                                post.feedType = "PUBLIC"
                                    post.timeLine = []
                                result.followers.forEach(x => {
                                    post.timeLine.push(x._id)
                                })
                            }
                            if (fields.feedType == "PRIVATE") {
                                post.feedType = "PRIVATE"
                                post.timeLine = []
                                //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",fields.selectedFriend)
                                post.timeLine.push(...fields.selectedFriend)
                            }
                            postModel.create(post, async (postError, postData) => {
                                console.log("im in save data", postError, postData)
                                if (postError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, postData, SuccessMessage.DATA_SAVED)
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
    /**
         * Function Name :report post
         * Description   : report of post by user
         *
         * @return response
        */

    postReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)
                        }
                        else {
                            postModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { hiddenByUsers: req.userId } }, { new: true }, (postErr, postResult) => {
                                if (postErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var obj = new postReportModel({
                                        reportedBy: userData._id,
                                        postId: postResult._id,
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
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    likeList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOne({ _id: req.params._id, postStatus: "ACTIVE" }, (postErr, postData) => {
                        console.log("i am in update", postErr, postData)

                        //return
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!postData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                           userModel.find({_id:postData.likes},{name:1,profilePic:1},(error,result)=>{
                               if(error){
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                               }
                               else{
                                   response(res, SuccessCode.SUCCESS,result, SuccessMessage.DATA_FOUND);
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



}








