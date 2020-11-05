const userModel = require('../models/userModel');
const groupModel = require('../models/groupModel')

const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction')
const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');
const fs = require("fs");
const post = require("../models/postModel");
var multiparty = require('multiparty');


module.exports = {
    createGroup: (req, res) => {
        console.log("im in requesttttttttttttttttttttttttttttttttttttttttttttttt", req.body)
        try {

            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, async (UserErr, userData) => {
                console.log("im in user", UserErr, userData)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    let admin = {
                        memberId: userData._id,
                        role: "GROUPADMIN"
                    };
                    if (req.body.groupPic) {
                        var picture = await convertImage()
                    }
                    req.body.members.push(admin);
                    // var obj = new group(req.body);
                    //obj.userName = result2.name
                    var obj = {
                        members: req.body.members,
                        groupPic: picture,
                        groupName: req.body.groupName,
                        description: req.body.description,
                        userName: userData.name,
                        userId: userData._id
                    }
                    var data = new groupModel(obj);

                    data.save((err1, result) => {
                        console.log("im in data", err1, result)
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else {
                            res.send({ response_code: 200, response_message: "Group created successfully", result })

                        }
                    });
                    //*********************Function for profile pic upload *************************************/
                    function convertImage() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.groupPic, (imageError, upload) => {
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

            })

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    addMembersInGroup: (req, res) => {
        try {
            groupModel.findOne({ _id: req.body.groupId, userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    groupModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { members: req.body.members } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.MEMBER_ADD);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    deleteGroup: (req, res) => {
        try {
            groupModel.findOne({ _id: req.body.groupId, userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    groupModel.findOneAndUpdate({ _id: result._id }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    exitGroup: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    groupModel.findOne({ _id: req.body.groupId, status: "ACTIVE" }, (groupErr, groupResult) => {
                        if (groupErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            groupModel.findOneAndUpdate({ _id: groupResult._id, "members.memberId": result._id, "members.role": "GROUPUSER" }, { $pull: { members: { memberId: result._id } } }, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.EXITED_SUCCESS);
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

    viewMembers: (req, res) => {
        try {
            groupModel.findOne({ _id: req.body.groupId, status: "ACTIVE" }).populate({ path: "members.memberId", select: "name profilePic mobileNumber" }).select('members').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    groupList: (req, res) => {
        groupModel.find({ status: { $ne: "DELETE" } }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
            }
        })
    },



}