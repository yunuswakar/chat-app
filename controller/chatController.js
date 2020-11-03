const userModel = require('../model/userModel');
const chatModel = require('../model/chatModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction');


module.exports = {
    chatAPI: (req, res) => {
        var query = {};
        if (req.body.receiverId && req.userId) {
            query.$and = [{ $or: [{ receiverId: req.body.receiverId }, { receiverId: req.userId }] }, { $or: [{ senderId: req.userId }, { senderId: req.body.receiverId }] }, { status: "ACTIVE" }]

        }
        chatModel.findOne(query).populate('receiverId senderId').exec((err, result) => {
            console.log(">>>>>19", err, result)
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                userModel.findOne({ "_id": req.body.receiverId, status: "ACTIVE" }).exec((err2, userData) => {
                    if (err2) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        userModel.findOne({ "_id": req.userId, status: "ACTIVE" }).exec((buddyErr, buddyData) => {
                            if (buddyErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!buddyData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.sendMessageViaNotification(userData.deviceToken, req.body.message, (chatErr, chatResult) => {
                                    console.log(">>>>>>>>40", chatErr, chatResult)
                                    if (chatErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.senderId= req.userId;
                                        req.body.messages = [{
                                            senderId: req.userId,
                                            message: req.body.message
                                        }];
                                        new chatModel(req.body).save((saveErr, saveResult) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.MESSAGE_SEND);
                                            }

                                        })
                                    }
                                })

                            }
                        })



                    }

                })
            }
            else {
                console.log(">>>>>>>>72", result.receiverId.deviceToken)
                commonFunction.sendMessageViaNotification(result.receiverId.deviceToken, req.body.message, (err3, chatResult) => {
                    console.log(">>>>>>>>74", err, chatResult)
                    if (err3) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        chatModel.findByIdAndUpdate({ "_id": result._id }, { $push: { messages: [{senderId: req.userId,message:req.body.message }]} }, { new: true }).populate("userId buddyId", "name").exec((updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.MESSAGE_SEND);
                            }

                        })
                   }
                })


            }
        })


    },


    chatList: (req, res) => {
        var query = { $and: [{ status: "ACTIVE"  }, { $or: [{ receiverId: req.userId }, { buddyId: req.userId }] }] }
        // if (req.body.userId) {
        //     query.userId = req.body.userId;
        // }

        // if (req.body.userId && req.body.buddyId) {
        //     query.$and = [{ userId: req.body.userId }, { buddyId: req.body.buddyId }];
        // }

        chatModel.find(query, (err, result) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
            }
        })
    }
}