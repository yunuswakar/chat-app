const userModel = require('../models/userModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction')
const mongoose = require("mongoose")
const postReportModel = require('../models/postReportModel')
var multiparty = require("multiparty");

const bcrypt = require("bcrypt-nodejs");
const _ = require("lodash")

var jwt = require('jsonwebtoken');
const postModel = require('../models/postModel');
const notificationModel = require('../models/notificationModel');



module.exports = {



    /**
   * Function Name :createPost
   * Description   : Create post by user
   *
   * @return response
  */

    createPost: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)

                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    var post = {
                        userId: result._id,
                        name: result.name,
                        profilePic: result.profilePic,
                        text: req.body.text,
                        tagFriends: req.body.tagFriends,
                        feeling: req.body.feeling,
                        activity: req.body.activity,
                        location: req.body.location
                    }
                    if (req.body.privacy == "Friends") {
                        console.log("i am in", result.friends)
                        post.privacy = "Friends"
                        post.timeLine = []
                        result.friends.forEach(x => {
                            post.timeLine.push(x.friendId)
                        })
                    }
                    if (req.body.privacy == "Friends of Friends") {
                        post.privacy = "Friends of Friends"
                        post.timeLine = req.body.friendId;
                    }
                    if (req.body.privacy == "Only Selected friends") {
                        post.privacy = "Only Selected friends"
                        post.timeLine = req.body.friendId

                    }
                    if (req.body.privacy == "ONLYME") {
                        post.privacy = "ONLYME"
                    }


                    postModel.create(post, async (error, postData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, postData, SuccessMessage.POST_CREATED)
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    uploadImageAndVideo: async (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
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
                            console.log("the uploading information....", files);
                            var set = {}
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
                                set["image"] = await convertImage()
                            }
                            if (files.video) {
                                set["video"] = await convertVideo()
                            }
                            postModel.findOneAndUpdate({ _id: req.headers.media_id }, { $set: set }, { new: true }, async (updateErr, updateData) => {
                                console.log("here in update", updateErr, updateData)
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!updateData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.EVENT_UPDATE);
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
    // createPost: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.headers._id, status:"ACTIVE" }, async(err, result) => {
    //             console.log("JDJJFJ",err,result)

    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 if (req.body.image) {
    //                     var imageUrl = await convertImage()
    //                 }
    //                 if (req.body.video) {
    //                     var videoUrl = await convertVideo()
    //                 }
    //                 var post = {
    //                     userId: result._id,
    //                     name:result.name,
    //                     profilePic:result.profilePic,
    //                     image: imageUrl,
    //                     video: videoUrl,
    //                     text: req.body.text,
    //                     tagFriends: req.body.tagFriends,
    //                     feeling:req.body.feeling,
    //                     activity:req.body.activity,
    //                     location:req.body.location
    //                 }
    //                 if (req.body.privacy == "Friends") {
    //                     console.log("i am in", result.friends)
    //                     post.privacy = "Friends"
    //                     post.timeLine = []
    //                     result.friends.forEach(x => {
    //                         post.timeLine.push(x.friendId)
    //                     })
    //                 }
    //                 if (req.body.privacy == "Friends of Friends") {
    //                     post.privacy = "Friends of Friends"
    //                     post.timeLine = req.body.friendId;
    //                 }
    //                 if (req.body.privacy == "Only Seleted friends") {
    //                     post.privacy = "Only Seleted friends"
    //                     post.timeLine = req.body.friendId

    //                 }
    //                 if (req.body.privacy == "ONLYME") {
    //                     post.privacy = "ONLYME"
    //                 }


    //                 postModel.create(post, async(error, postData) => {
    //                     if (error) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else {
    //                         response(res, SuccessCode.SUCCESS,postData, SuccessMessage.POST_CREATED)                    }
    //                 })
    //                 //*********************Function for  pic upload *************************************/
    //                 function convertImage() {
    //                     return new Promise((resolve, reject) => {
    //                         commonFunction.multipleImageUploadCloudinary(req.body.image, (error, upload) => {
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
    //                         commonFunction.multipleVideoUploadCloudinary(req.body.videoLink, (videoErr, uploadData) => {
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

    /**
   * Function Name :editPost
   * Description   : edit post by user
   *
   * @return response
  */

    editPost: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    postModel.findOne({ _id: req.body.postId, userId: result._id, postStatus: "ACTIVE" }, async (error, postData) => {
                        console.log("i am in post", error, postData)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            var set = {}
                            if (req.body.text) {
                                set["text"] = req.body.text
                            }
                            if (req.body.feeling) {
                                set["feeling"] = req.body.feeling
                            }
                            if (req.body.location) {
                                set["location"] = req.body.location
                            }
                            if (req.body.activity) {
                                set["activity"] = req.body.activity
                            }
                            if (req.body.tagFriends) {
                                set["tagfriends"] = req.body.tagFriends
                            }
                            if (req.body.privacy) {
                                set["privacy"] = req.body.privacy
                            }
                            postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: { $ne: "DELETE" } }, { $set: set }, { new: true }, async (postErr, postUpdate) => {
                                if (postErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, postUpdate, SuccessMessage.EDIT_SUCC);
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
        userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                postModel.findOne({ _id: req.params._id, postStatus: "ACTIVE" }, (PostError, postData) => {
                    console.log("jdfjfjf", PostError, postData)
                    if (PostError) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                    }
                    else if (!postData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, postData, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })

    },



    /**
         * Function Name :postComment
         * Description   : like and comment on post by user
         *
         * @return response
        */

    postComment: (req, res) => {
        try {
            console.log("i am in body", req.body)
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
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
                                response(res, SuccessCode.SUCCESS, success, SuccessMessage.POST_COMMENT);
                            }
                        }
                    )



                }
            })
        } catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    /**
             * Function Name :hide post
             * Description   : hide post by user
             *
             * @return response
            */
    hidePost: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" }, { $set: { postStatus: "HIDE" } }, { new: true }, (postErr, postData) => {
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!postData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [postData], SuccessMessage.HIDE_SUCCESS);
                        }
                    })
                }
            })
        } catch (error) {
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
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
                console.log("kkdkdkkk6733333333343", error, userData)

                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!userData) {
                            response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                        }
                        else {
                            var obj = new postReportModel({
                                reportBy: userData._id,
                                postId: result._id,
                                reason: req.body.reason,
                                //reportType:"userProfile"
                            })
                            obj.save((saveErr, savedData) => {
                                if (saveErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, [savedData], SuccessMessage.DATA_SAVED)
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

    /**
         * Function Name :edit comment
         * Description   : edit comment on post by user
         *
         * @return response
        */
    editComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, postData) => {
                        //console.log("hdhdhshsghgssgsg",postData.comments[0]._id)
                        console.log("hdhdhshsg44hgssgsg", postData)

                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            //return

                            const editComments = _.filter(postData.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commented) }));
                            console.log("hdhdhshsg44hgssgsg", editComments[0]._id)
                            //return

                            const newComment = {
                                _id: editComments[0]._id,
                                commentedUser: editComments[0].commentedUser,
                                comment: req.body.comment,
                                userName: editComments[0].userName,
                                userPic: editComments[0].userPic,
                                commentedTime: new Date()
                            }
                            postModel.findOneAndUpdate({ 'comments._id': req.body.commented, postStatus: "ACTIVE" }, { $set: { "comments.$": newComment } }, { new: true }, (updatedErr, updatedData) => {
                                if (updatedErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!updatedData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.DATA_FOUND);

                                }
                            })

                            //})
                            // response(res, SuccessCode.SUCCESS, [postData.comments._id], SuccessMessage.DATA_FOUND);

                        }
                    })
                }
            })
        } catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })

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
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
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
                    postModel.paginate({ userId: userData._id }, options, (postErr, postData) => {
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (postData.length == 0) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [postData], SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
         * Function Name :delete post
         * Description   : own post delete by user
         *
         * @return response
        */
    deletePost: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOneAndUpdate({ _id: req.body.postId, userId: userData._id, postStatus: "ACTIVE" }, { $set: { postStatus: "DELETE" } }, { new: true }, (postErr, postData) => {
                        console.log("i am in update", postErr, postData)
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!postData) {

                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [postData], SuccessMessage.DELETE_SUCCESS);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
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
            if (req.body.like == "true") {
                userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                    if (UserErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    } else {
                        postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE", likes: { $elemMatch: { likedId: userData._id } } }, (postErr, postData) => {
                            if (postErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (postData) {

                                response(res, SuccessCode.SUCCESS, postData, SuccessMessage.POST_LIKE);
                            } else {
                                var like = {
                                    likedId: userData._id,
                                    userName: userData.name,
                                    userPic: userData.profilePic,
                                    likeSymbol: req.body.likeSymbol
                                };
                                postModel.findOneAndUpdate({ _id: req.body.postId, postStatus: "ACTIVE" }, { $push: { likes: like } }, { new: true }, (error, success) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, success, SuccessMessage.POST_LIKE);
                                    }
                                })
                            }
                        })
                    }
                })
            }
            else if (req.body.like == "false") {
                postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE", likes: { $elemMatch: { likedId: userData._id } } }, (err, success) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (!success) {
                        return res.send({ responseCode: 404, responseMessage: "User havent liked yet" })
                    } else {
                        const dislike = _.filter(success.likes, _.matches({ likedId: userData._id }));
                        postModel.findByIdAndUpdate({ _id: req.body.postId }, { $pull: { likes: dislike[0] } }, { new: true }, (error, update) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!update) {
                                return res.send({ responseCode: 404, responseMessage: "Unable to update" })
                            } else {
                                response(res, SuccessCode.SUCCESS, [update], SuccessMessage.POST_DISLIKE);
                            }

                        })

                    }
                })
            }

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    editPostComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
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
                            const editComments = _.filter(postData.comments, _.matches({ _id: mongoose.Types.ObjectId(req.body.commented) }));
                            console.log("fgfgf", editComments)
                            //return
                            const newComment = {
                                _id: editComments[0]._id,
                                commentedUser: editComments[0].commentedUser,
                                comment: req.body.comment,
                                userName: editComments[0].userName,
                                userPic: editComments[0].userPic,
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

    commentList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("i am in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (postErr, postData) => {
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

    deleteComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
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
     * Description   : get post list by user
     *
     * @return response
    */
    postList: (req, res) => {
        try {
            //console.log("gdgdgd",req.headers,req.query)
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }

                else {
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 5,
                        sort: {
                            createdAt: -1
                        },
                    }
                    postModel.paginate({ postStatus: "ACTIVE" }, options, (postErr, postData) => {
                        console.log("gdg4444444444444444444dgd", postErr, postData)
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (postData.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, postData, SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :user post list
     * Description   : get post list of user by user
     *
     * @return response
    */
    userPostList: (req, res) => {
        try {
            //console.log("gdgdgd",req.headers,req.query)
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("NFNCCCC",UserErr,userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, result) => {
                        console.log("gdg8888888dgd", error, result)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            let options = {
                                page: req.body.pageNumber || 1,
                                limit: req.body.limit || 5,
                                sort: {
                                    createdAt: -1
                                },
                            }
                            postModel.paginate({ userId:(result._id),postStatus: "ACTIVE" }, options, (postErr, postData) => {
                                console.log("gdg4444444444444444444dgd", postErr, postData)
                                if (postErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                } else if (postData.docs.length == 0) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                } else {
                                    response(res, SuccessCode.SUCCESS, postData, SuccessMessage.DETAIL_GET);
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
    replyOnComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
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
                                senderId: req.headers._id,
                                title: "Reply on comment",
                                body: `${userData.name} replied on your comment.`,
                                senderIdMessage: `${userData.name} replied on ${postResult.comments[0].commentedUser.name} comment`,
                                notificationType: "Comment replied on post"
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
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    postModel.findOne({ _id: req.body.postId, postStatus: { $ne: "DELETE" } }, (err1, postData) => {
                        //console.log("sssfsfssss",err1,postData.comments[0].replyComments)
                        //return
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!postData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);

                        }
                        else {
                            const deleteReplyComments = _.filter(postData.comments[0].replyComments, _.matches({ _id: mongoose.Types.ObjectId(req.body.replyId) }));
                            console.log("dddddd", deleteReplyComments[0])
                            // return
                            postModel.findOneAndUpdate({ "comments._id": req.body.commentId, postStatus: "ACTIVE" }, {
                                $pull: {
                                    "comments.$.replyComments"
                                        : deleteReplyComments[0]
                                }
                            }, { new: true }, (updateErr, updatedData) => {
                                console.log("dddddd", updateErr, updatedData)

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


    updateReplyComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
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
                            const editComments = _.filter(postData.comments[0].replyComments, _.matches({ _id: mongoose.Types.ObjectId(req.body.replyId) }));
                            console.log("hdhdhshsg44hgssgsg", editComments[0]._id)
                            //return
                            const newComment = {
                                _id: editComments[0]._id,
                                commentedUser: editComments[0].commentedUser,
                                comment: req.body.comment,
                                userName: editComments[0].userName,
                                userPic: editComments[0].userPic,
                                commentedTime: new Date()
                            }
                            // return
                            postModel.findOneAndUpdate({ "comments.replyComments._id": req.body.replyId, postStatus: "ACTIVE" }, { $set: { "comments.$.replyComments": newComment } }, { new: true }, (updateErr, updatedData) => {
                                console.log("dddddd", updateErr, updatedData)

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

    LikesOnComment: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOne({ _id: req.body.postId, "comments._id": req.body.commentId, postStatus: "ACTIVE" }).populate('comments.likedId').select({ 'comments.$._id': 1 }).exec((err, postResult) => {
                        console.log(">>>>>>>5091", err, postResult);
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var like = {
                                commentId: req.body.commentId,
                                likedId: userData._id,
                                userName: userData.name,
                                userPic: userData.profilePic,
                                likeSymbol: req.body.likeSymbol
                            };


                            postModel.findOneAndUpdate({ "comments._id": req.body.commentId, postStatus: "ACTIVE" },
                                { $push: { "comments.$.likeOnComment": like } },
                                { new: true },
                                (err2, result2) => {
                                    console.log("i am in>>>>>>>>>", err2, result2)
                                    if (err2) {
                                        console.log("13107======>", err2, result2)

                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                    } else {
                                        response(res, SuccessCode.SUCCESS, result2, SuccessMessage.LIKE_COMMENT);
                                    }
                                }
                            )
                        }
                    })
                }
            })
        }
        catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },

}
