const userModel = require('../model/userModel');
const animationCategoryModel = require('../model/animationCategoryModel');
const animationEpisodeModel = require('../model/animationEpisodeModel');
const animationVideoModel = require('../model/animationVideoModel');
const podcastCategory = require('../model/podcastCategoryModel');
const podcastEpisode = require('../model/podcastEpisodeModel');
const podcastAudioModel = require('../model/podcastAudioModel');
const contactUsModel = require('../model/contactUsModel');
const subscription = require('../model/subscriptionModel');
const mentalHealthCategory = require('../model/mentalHealthCategoryModel');
const mentalHealth = require('../model/mentalHealthModel');
const medicalConditionCategory = require('../model/medicalConditionCategoryModel');
const medicalCondition = require('../model/medicalConditionModel');
const transactionModel = require('../model/transactionModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction');
const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');
const Thumbler = require('thumbler');

module.exports = {
    /**
     * Function Name :login
     * Description   : login for admin
     *
     * @return response
   */

    login: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (err, adminData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, adminData.password)
                    if (check) {
                        var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose', { expiresIn: '24h' });
                        var result = {
                            userId: adminData._id,
                            token: token,
                            firstName: adminData.firstName,
                            email: adminData.email,
                            mobileNumber: adminData.mobileNumber,
                            country: adminData.country,
                            profilePic: adminData.profilePic,
                            permissions: adminData.permissions
                        };
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS);
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                    }

                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :forgotPassword
     * Description   : forgotPassword for admin
     *
     * @return response
   */

    forgotPassword: (req, res) => {
        try {
            if (!req.body.email) {
                response(res, ErrorCode.BAD_REQUEST, [], "Please enter email ID");
            }
            else {
                userModel.findOne({ email: req.body.email, status: "ACTIVE", userType: "ADMIN" }, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EMAIL_NOT_REGISTERED);
                    }
                    else {
                        commonFunction.sendLink(result.email, result.firstName, result._id, (emailErr, emailResult) => {
                            if (emailErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!emailResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EMAIL_NOT_SEND);
                            }
                            else {
                                var data = result._id;
                                response(res, SuccessCode.SUCCESS, data, SuccessMessage.FORGET_SUCCESS);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :resetPassword
     * Description   : resetPassword for admin
     *
     * @return response
   */

    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "ADMIN" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    req.body.password = bcrypt.hashSync(req.body.newPassword);
                    var confirmPassword = bcrypt.hashSync(req.body.confirmPassword);
                    var check = bcrypt.compareSync(req.body.newPassword, confirmPassword);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.NOT_MATCH);
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.params._id }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.PASSWORD_UPDATE);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :getProfile
     * Description   : profile of admin
     *
     * @return response
   */

    getProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })


        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :changePassword
     * Description   : changePassword for admin
     *
     * @return response
   */

    changePassword: (req, res) => {
        try {
            var body = {
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword
            }
            var validate = commonFunction.parameterRequired(body);
            if (!validate) {
                userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        var check = bcrypt.compareSync(req.body.oldPassword, result.password);
                        if (!check) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                        }
                        else {
                            var confirmPassword = bcrypt.hashSync(req.body.newPassword);
                            userModel.findOneAndUpdate({ _id: result._id }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.RESET_SUCCESS);
                                }
                            })
                        }
                    }
                })

            }
            else {
                response(res, ErrorCode.NOT_FOUND, [], `Please enter ${validate}`);
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editProfile
     * Description   : editProfile for admin
     *
     * @return response
   */

    editProfile: (req, res) => {
        try {
            function updateQuery() {
                userModel.findOneAndUpdate({ _id: req.userId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                    if (updateErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.PROFILE_DETAILS);
                    }
                })
            }
            userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (err, adminData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.profilePic && !req.body.email && !req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (imageErr, imageResult) => {
                            if (imageErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.profilePic = imageResult;
                                updateQuery();
                            }
                        })
                    }
                    else if (!req.body.profilePic && req.body.email && !req.body.mobileNumber) {
                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (emailErr, emailResult) => {
                            if (emailErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (emailResult) {
                                if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                    updateQuery();
                                }
                                else {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                }

                            }
                            else {
                                updateQuery();
                            }
                        })
                    }
                    else if (!req.body.profilePic && !req.body.email && req.body.mobileNumber) {
                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileErr, mobileResult) => {
                            if (mobileErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (mobileResult) {
                                if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                    updateQuery();
                                }
                                else {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                }
                            }
                            else {
                                updateQuery();
                            }
                        })
                    }
                    else if (req.body.profilePic && req.body.email && !req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (imgErr, imgResult) => {
                            if (imgErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (emailError, emailResult) => {
                                    if (emailError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (emailResult) {
                                        if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                            req.body.profilePic = imgResult;
                                            updateQuery();
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                        }
                                    }
                                    else {
                                        req.body.profilePic = imageResult;
                                        updateQuery();
                                    }
                                })
                            }
                        })

                    }
                    else if (req.body.profilePic && !req.body.email && req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (profileErr, profileResult) => {
                            if (profileErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
                                    if (mobileError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (mobileResult) {
                                        if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                            req.body.profilePic = profileResult;
                                            updateQuery();
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                        }
                                    }
                                    else {
                                        req.body.profilePic = imageResult;
                                        updateQuery();
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.profilePic && req.body.email && req.body.mobileNumber) {
                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err2, emailResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (emailResult) {
                                if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                    userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err3, mobileResult) => {
                                        if (err3) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (mobileResult) {
                                            if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                                updateQuery();
                                            }
                                            else {
                                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                            }
                                        }
                                        else {
                                            updateQuery();
                                        }
                                    })
                                }
                                else {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                }
                            }
                            else {
                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err4, mobileResult) => {
                                    if (err4) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (mobileResult) {
                                        if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                            updateQuery();
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                        }
                                    }
                                    else {
                                        updateQuery();
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.profilePic && req.body.email && req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (err5, imageResult) => {
                            if (err5) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err6, emailResult) => {
                                    if (err6) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (emailResult) {
                                        if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err7, mobileResult) => {
                                                if (err7) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else if (mobileResult) {
                                                    if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                                        req.body.profilePic = imageResult;
                                                        updateQuery();
                                                    }
                                                    else {
                                                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                    }
                                                }
                                                else {
                                                    req.body.profilePic = imageResult;
                                                    updateQuery();
                                                }
                                            })
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                        }
                                    }
                                    else {
                                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err8, mobileResult) => {
                                            if (err8) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (mobileResult) {
                                                if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == req.userId) {
                                                    req.body.profilePic = imageResult;
                                                    updateQuery();
                                                }
                                                else {
                                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                }
                                            }
                                            else {
                                                req.body.profilePic = imageResult;
                                                updateQuery();
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        updateQuery();
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addSubAdmin
     * Description   : addSubAdmin in Sub-admin management
     *
     * @return response
   */

    addSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (adminErr, adminResult) => {
                if (adminErr) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (result) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                        }
                        else {
                            req.body.firstName = req.body.name;
                            var password = req.body.password;
                            req.body.password = bcrypt.hashSync(req.body.password);
                            req.body.userType = "SUBADMIN";
                            req.body.permissions = [{
                                dashboard: req.body.dashboard,
                                userManagement: req.body.userManagement,
                                subAdminManagement: req.body.subAdminManagement,
                                animationManagement: req.body.animationManagement,
                                podcastManagement: req.body.podcastManagement,
                                mentalHealthCampaign: req.body.mentalHealthCampaign,
                                medicalConditionKnowledge: req.body.medicalConditionKnowledge,
                                contactUsManagement: req.body.contactUsManagement,
                                subscriptionManagement: req.body.subscriptionManagement,
                                transactionManagement: req.body.transactionManagement,
                                staticContentManagement: req.body.staticContentManagement
                            }];
                            commonFunction.emailSend(req.body.email, `Your account has been created successfully as a "Sub-Admin user". Your email and password are:- <br>Email: ${req.body.email}, <br>Password: ${password}. <br>Please click on this link for login. ${global.gConfig.adminURL}`, (emailErr, emailResult) => {
                                if (emailErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    new userModel(req.body).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SUB_ADMIN_CREATED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editSubAdmin
     * Description   : editSubAdmin in Sub-admin management
     *
     * @return response
   */

    editSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subAdminId, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (err, subAdminResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subAdminResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.password) {
                        commonFunction.emailSend(subAdminResult.email, `Dear ${subAdminResult.firstName}, <br>Your password has been updated as:- ${req.body.password}.Please click on this link for login. ${global.gConfig.adminURL}`, (emailErr, emailData) => {
                            if (emailErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, err, ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.firstName = req.body.name;
                                req.body.password = bcrypt.hashSync(req.body.password);
                                req.body.permissions = [{
                                    dashboard: req.body.dashboard,
                                    userManagement: req.body.userManagement,
                                    subAdminManagement: req.body.subAdminManagement,
                                    animationManagement: req.body.animationManagement,
                                    podcastManagement: req.body.podcastManagement,
                                    mentalHealthCampaign: req.body.mentalHealthCampaign,
                                    medicalConditionKnowledge: req.body.medicalConditionKnowledge,
                                    contactUsManagement: req.body.contactUsManagement,
                                    subscriptionManagement: req.body.subscriptionManagement,
                                    transactionManagement: req.body.transactionManagement,
                                    staticContentManagement: req.body.staticContentManagement
                                }];
                                userModel.findOneAndUpdate({ _id: req.body.subAdminId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })

                    }
                    else {
                        req.body.firstName = req.body.name;
                        req.body.permissions = [{
                            _id: req.body.permissionId,
                            dashboard: req.body.dashboard,
                            userManagement: req.body.userManagement,
                            subAdminManagement: req.body.subAdminManagement,
                            animationManagement: req.body.animationManagement,
                            podcastManagement: req.body.podcastManagement,
                            mentalHealthCampaign: req.body.mentalHealthCampaign,
                            medicalConditionKnowledge: req.body.medicalConditionKnowledge,
                            contactUsManagement: req.body.contactUsManagement,
                            subscriptionManagement: req.body.subscriptionManagement,
                            transactionManagement: req.body.transactionManagement,
                            staticContentManagement: req.body.staticContentManagement
                        }];
                        userModel.findOneAndUpdate({ _id: req.body.subAdminId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }


                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewSubAdmin
     * Description   : viewSubAdmin in Sub-admin management
     *
     * @return response
   */

    viewSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.params.subAdminId, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockSubAdmin
     * Description   : Block/unblock SubAdmin in Sub-admin management
     *
     * @return response
   */

    blockUnblockSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subAdminId, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ _id: req.body.subAdminId }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        userModel.findByIdAndUpdate(req.body.subAdminId, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteSubAdmin
     * Description   : deleteSubAdmin in Sub-admin management
     *
     * @return response
   */

    deleteSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subAdminId, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findByIdAndUpdate(req.body.subAdminId, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :subAdminList
     * Description   : SubAdmin list in Sub-admin management
     *
     * @return response
   */

    subAdminList: (req, res) => {
        try {
            var query = {
                userType: "SUBADMIN",
                status: { $ne: "DELETE" }
            };
            if (req.body.search) {
                query.firstName = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit);

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            userModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :addAnimationCategory
     * Description   : addAnimationCategory in animation category management
     *
     * @return response
   */

    addAnimationCategory: (req, res) => {
        try {
            animationCategoryModel.findOne({ categoryName: req.body.categoryName, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXISTS);
                }
                else {
                    commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                        if (uploadErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            req.body.image = uploadResult;
                            new animationCategoryModel(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CATEGORY_ADD);
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
     * Function Name :viewAnimationCategory
     * Description   : viewAnimationCategory in animation category management
     *
     * @return response
   */

    viewAnimationCategory: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editAnimationCategory
     * Description   : editAnimationCategory in animation category management
     *
     * @return response
   */

    editAnimationCategory: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.image) {
                        commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                            if (uploadErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = uploadResult;
                                animationCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationEpisodeModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (episodeErr, episodeResult) => {
                                            if (episodeErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                animationVideoModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (videoErr, videoResult) => {
                                                    if (videoErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
                        animationCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                animationEpisodeModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationVideoModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockAnimationCategory
     * Description   : blockUnblockAnimationCategory in animation category management
     *
     * @return response
   */

    blockUnblockAnimationCategory: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        animationCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                animationEpisodeModel.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationVideoModel.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        animationCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                animationEpisodeModel.update({ categoryId: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationVideoModel.update({ categoryId: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { multi: true }, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteAnimationCategory
     * Description   : deleteAnimationCategory in animation category management
     *
     * @return response
   */

    deleteAnimationCategory: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else {
                            animationEpisodeModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (episodeErr, episodeResult) => {
                                if (episodeErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    animationVideoModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (videoErr, videoResult) => {
                                        if (videoErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :animationCategoryList
     * Description   : animationCategoryList in animation category management
     *
     * @return response
    */

    animationCategoryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.categoryName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            animationCategoryModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :getAllAnimationCategories
     * Description   : getAllAnimationCategories in animation category management
     *
     * @return response
    */

    getAllAnimationCategories: (req, res) => {
        try {
            animationCategoryModel.find({ status: { $ne: "DELETE" } }).select('categoryName').sort({ createdAt: -1 }).exec((err, categoryList) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (categoryList.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, categoryList, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addAnimationEpisode
     * Description   : addAnimationEpisode in animation episode management
     *
     * @return response
    */

    addAnimationEpisode: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationEpisodeModel.findOne({ episodeName: req.body.episodeName, status: { $ne: "DELETE" } }, (err2, episodeResult) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (episodeResult) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EPISODE_EXISTS);
                        }
                        else {
                            commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                                if (uploadErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    req.body.categoryName = result.categoryName;
                                    req.body.image = uploadResult;
                                    new animationEpisodeModel(req.body).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.EPISODE_ADD);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewAnimationEpisode
     * Description   : viewAnimationEpisode in animation episode management
     *
     * @return response
    */

    viewAnimationEpisode: (req, res) => {
        try {
            animationEpisodeModel.findOne({ _id: req.params.episodeId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editAnimationEpisode
     * Description   : editAnimationEpisode in animation episode management
     *
     * @return response
    */

    editAnimationEpisode: (req, res) => {
        try {
            animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.image && !req.body.categoryId) {
                        commonFunction.uploadImage(req.body.image, (imageErr, imageResult) => {
                            if (imageErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = imageResult;
                                animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationVideoModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })

                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.image && req.body.categoryId) {
                        animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryError, categoryResult) => {
                            if (categoryError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        animationVideoModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })

                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.image && req.body.categoryId) {
                        animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryData) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.uploadImage(req.body.image, (imgErr, imageData) => {
                                    if (imgErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.categoryName = categoryData.categoryName;
                                        req.body.image = imageData;
                                        animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                animationVideoModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (videoErr, videoResult) => {
                                                    if (videoErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
                        animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                animationVideoModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (videoErr, videoResult) => {
                                    if (videoErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
    * Function Name :blockUnblockAnimationEpisode
    * Description   : block/unblock AnimationEpisode in animation episode management
    *
    * @return response
   */

    blockUnblockAnimationEpisode: (req, res) => {
        try {
            animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                animationVideoModel.update({ episodeId: req.body.episodeId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (videoErr, videoResult) => {
                                    if (videoErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                animationVideoModel.update({ episodeId: req.body.episodeId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { multi: true }, (videoErr, videoResult) => {
                                    if (videoErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteAnimationEpisode
     * Description   : deleteAnimationEpisode in animation episode management
     *
     * @return response
    */

    deleteAnimationEpisode: (req, res) => {
        try {
            animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationEpisodeModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else {
                            animationVideoModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (videoErr, videoResult) => {
                                if (videoErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :animationEpisodeList
     * Description   : animationEpisodeList in animation episode management
     *
     * @return response
    */

    animationEpisodeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.episodeName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            animationEpisodeModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :getAllAnimationEpisodes
     * Description   : getAllAnimationEpisodes in animation category management
     *
     * @return response
    */

    getAllAnimationEpisodes: (req, res) => {
        try {
            animationEpisodeModel.find({ status: { $ne: "DELETE" } }).select('episodeName').sort({ createdAt: -1 }).exec((err, episodeList) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (episodeList.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, episodeList, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addAnimationVideo
     * Description   : addAnimationVideo in animation video management
     *
     * @return response
    */

    addAnimationVideo: (req, res) => {
        try {
            animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, categoryResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err2, episodeResult) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!episodeResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            animationVideoModel.findOne({ videoName: req.body.videoName, status: { $ne: "DELETE" } }, (err3, result) => {
                                if (err3) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (result) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.VIDEO_EXISTS);
                                }
                                else {
                                    commonFunction.videoUpload(req.body.video, (videoErr, videoResult) => {
                                        if (videoErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            Thumbler({
                                                type: 'video',
                                                input: videoResult,
                                                output: './public/videoResult.' + Date.now() + '.jpeg',
                                                time: '00:00:05'
                                            }, function (pathErr, path) {
                                                if (pathErr) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    commonFunction.uploadImage(path, (imageErr, imageResult) => {
                                                        if (imageErr) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            req.body.thumbnail = imageResult;
                                                            req.body.categoryName = categoryResult.categoryName;
                                                            req.body.episodeName = episodeResult.episodeName;
                                                            req.body.video = videoResult;
                                                            new animationVideoModel(req.body).save((saveErr, saveResult) => {
                                                                if (saveErr) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.VIDEO_ADD);
                                                                }
                                                            })
                                                        }
                                                    })

                                                }

                                            });

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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :viewAnimationVideo
     * Description   : viewAnimationVideo in animation video management
     *
     * @return response
    */

    viewAnimationVideo: (req, res) => {
        try {
            animationVideoModel.findOne({ _id: req.params.videoId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editAnimationVideo
     * Description   : editAnimationVideo in animation video management
     *
     * @return response
    */

    editAnimationVideo: (req, res) => {
        try {
            animationVideoModel.findOne({ _id: req.body.videoId, status: { $ne: "DELETE" } }, (err, result) => {
                console.log(">>>>>>>1534", err, result);
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.video && !req.body.categoryId && !req.body.episodeId) {
                        commonFunction.videoUpload(req.body.video, (videoErr, videoResult) => {
                            if (videoErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.video = videoResult;
                                animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.video && req.body.categoryId && !req.body.episodeId) {
                        animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryError, categoryResult) => {
                            if (categoryError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                animationVideoModel.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.video && !req.body.categoryId && req.body.episodeId) {
                        animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeErr, episodeResult) => {
                            if (episodeErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!episodeResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.episodeName = episodeResult.episodeName;
                                animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.video && req.body.categoryId && !req.body.episodeId) {
                        animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryData) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.videoUpload(req.body.video, (videoErr, videoResult) => {
                                    if (videoErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.categoryName = categoryData.categoryName;
                                        req.body.video = videoResult;
                                        animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.video && !req.body.categoryId && req.body.episodeId) {
                        animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err3, episodeData) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!episodeData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.videoUpload(req.body.video, (videoErr, videoResult) => {
                                    if (videoErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.episodeName = episodeData.episodeName;
                                        req.body.video = videoResult;
                                        animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.video && req.body.categoryId && req.body.episodeId) {
                        animationCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryErr, categoryData) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                animationEpisodeModel.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!episodeResult) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        commonFunction.videoUpload(req.body.video, (videoErr, videoResult) => {
                                            if (videoErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                req.body.categoryName = categoryData.categoryName;
                                                req.body.episodeName = episodeResult.episodeName;
                                                req.body.video = videoResult;
                                                animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                                    if (updateErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
                        animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockAnimationVideo
     * Description   : blockUnblockAnimationVideo in animation video management
     *
     * @return response
    */

    blockUnblockAnimationVideo: (req, res) => {
        try {
            animationVideoModel.findOne({ _id: req.body.videoId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteAnimationVideo
     * Description   : deleteAnimationVideo in animation video management
     *
     * @return response
    */

    deleteAnimationVideo: (req, res) => {
        try {
            animationVideoModel.findOne({ _id: req.body.videoId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationVideoModel.findOneAndUpdate({ _id: req.body.videoId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :animationVideoList
     * Description   : animationVideoList in animation video management
     *
     * @return response
    */

    animationVideoList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.videoName = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            animationVideoModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :addPodcastCategory
     * Description   : addPodcastCategory in podcast category management
     *
     * @return response
    */

    addPodcastCategory: (req, res) => {
        try {
            var query = { $and: [{ categoryName: req.body.categoryName }, { status: { $ne: "DELETE" } }] };
            podcastCategory.findOne(query, (categoryError, categoryData) => {
                if (categoryError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (categoryData) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXISTS);
                }
                else {
                    commonFunction.uploadImage(req.body.image, (imageErr, imageData) => {
                        if (imageErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            let obj = new podcastCategory({
                                "categoryName": req.body.categoryName,
                                "image": imageData
                            })
                            obj.save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CATEGORY_ADD);
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
     * Function Name :editPodcastCategory
     * Description   : editPodcastCategory in podcast category management
     *
     * @return response
    */

    editPodcastCategory: (req, res) => {
        try {
            if (req.body.image) {
                commonFunction.uploadImage(req.body.image, (imageErr, imageData) => {
                    if (imageErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        req.body.image = imageData;
                        podcastCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                podcastEpisode.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        podcastAudioModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
                podcastCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (error, updateResult) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        podcastEpisode.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (episodeErr, episodeResult) => {
                            if (episodeErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                podcastAudioModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (audioErr, audioResult) => {
                                    if (audioErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewPodcastCategory
     * Description   : viewPodcastCategory in podcast category management
     *
     * @return response
    */

    viewPodcastCategory: (req, res) => {
        try {
            podcastCategory.findOne({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, (categoryError, categoryResult) => {
                if (categoryError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, categoryResult, SuccessMessage.DETAIL_GET);
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
     * Function Name :blockUnblockPodcastCategory
     * Description   : blockUnblockPodcastCategory in podcast category management
     *
     * @return response
    */

    blockUnblockPodcastCategory: (req, res) => {
        try {
            podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        podcastCategory.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                podcastEpisode.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        podcastAudioModel.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        podcastCategory.findOneAndUpdate({ _id: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                podcastEpisode.update({ categoryId: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { multi: true }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        podcastAudioModel.update({ categoryId: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { multi: true }, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deletePodcastCategory
     * Description   : deletePodcastCategory in podcast category management
     *
     * @return response
    */

    deletePodcastCategory: (req, res) => {
        try {
            podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    podcastCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            podcastEpisode.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (episodeErr, episodeResult) => {
                                if (episodeErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    podcastAudioModel.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (audioErr, audioResult) => {
                                        if (audioErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :podcastCategoryList
     * Description   : podcastCategoryList in podcast category management
     *
     * @return response
    */

    podcastCategoryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.search) {
                query.categoryName = new RegExp('^' + req.body.search, "i");
            }

            req.body.limit = parseInt(req.body.limit);
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            }
            podcastCategory.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :getAllPodcastCategories
     * Description   : getAllPodcastCategories in podcast category management
     *
     * @return response
    */

    getAllPodcastCategories: (req, res) => {
        try {
            podcastCategory.find({ status: { $ne: "DELETE" } }).select('categoryName').sort({ createdAt: -1 }).exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
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

    /**
     * Function Name :addPodcastEpisode
     * Description   : addPodcastEpisode in podcast episode management
     *
     * @return response
    */

    addPodcastEpisode: (req, res) => {
        try {
            podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryError, categoryData) => {
                if (categoryError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {

                    var query = {
                        $and: [
                            {
                                episodeName: req.body.episodeName
                            },
                            { status: { $ne: "DELETE" } }
                        ]
                    };
                    podcastEpisode.findOne(query, (episodeError, episodeData) => {
                        if (episodeError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (episodeData) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EPISODE_EXISTS);
                        }
                        else {
                            commonFunction.uploadImage(req.body.image, (imageErr, imageData) => {
                                if (imageErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    let obj = new podcastEpisode({
                                        "categoryName": categoryData.categoryName,
                                        "image": imageData,
                                        "episodeName": req.body.episodeName,
                                        "categoryId": categoryData._id
                                    })
                                    obj.save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.EPISODE_ADD);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewPodcastEpisode
     * Description   : viewPodcastEpisode in podcast episode management
     *
     * @return response
    */

    viewPodcastEpisode: (req, res) => {
        try {
            podcastEpisode.findOne({ _id: req.params.episodeId, status: { $ne: "DELETE" } }, (episodeError, episodeData) => {
                if (episodeError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!episodeData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, episodeData, SuccessMessage.DETAIL_GET);

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deletePodcastEpisode
     * Description   : deletePodcastEpisode in podcast episode management
     *
     * @return response
    */

    deletePodcastEpisode: (req, res) => {
        try {
            podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeError, episodeData) => {
                if (episodeError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!episodeData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    podcastEpisode.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            podcastAudioModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (audioErr, audioResult) => {
                                if (audioErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :editPodcastEpisode
     * Description   : editPodcastEpisode in podcast episode management
     *
     * @return response
    */

    editPodcastEpisode: (req, res) => {
        try {
            podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.image && !req.body.categoryId) {
                        commonFunction.uploadImage(req.body.image, (imageErr, imageResult) => {
                            if (imageErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = imageResult;
                                podcastEpisode.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        podcastAudioModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.image && req.body.categoryId) {
                        podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                podcastEpisode.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        podcastAudioModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        podcastEpisode.findOneAndUpdate({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                podcastAudioModel.update({ episodeId: req.body.episodeId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (audioErr, audioResult) => {
                                    if (audioErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :podcastEpisodeList
     * Description   : podcastEpisodeList in podcast episode management
     *
     * @return response
    */

    podcastEpisodeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: {
                    createdAt: -1
                }
            }
            if (req.body.search) {
                query.episodeName = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }
            podcastEpisode.paginate(query, options, (episodeError, episodeResult) => {
                if (episodeError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (episodeResult.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, episodeResult, SuccessMessage.DATA_FOUND);
                }
            })

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :getAllPodcastEpisodes
     * Description   : getAllPodcastEpisodes in podcast episode management
     *
     * @return response
    */

    getAllPodcastEpisodes: (req, res) => {
        try {
            podcastEpisode.find({ status: { $ne: "DELETE" } }).select('episodeName').sort({ createdAt: -1 }).exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
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

    /**
     * Function Name :addPodcastAudio
     * Description   : addPodcastAudio in podcast audio management
     *
     * @return response
    */

    addPodcastAudio: (req, res) => {
        try {
            podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryError, categoryData) => {
                if (categoryError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeError, episodeData) => {
                        if (episodeError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!episodeData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            podcastAudioModel.findOne({ audioName: req.body.audioName, status: { $ne: "DELETE" } }, (err, result) => {
                                if (err) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (result) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.AUDIO_EXISTS);
                                }
                                else {
                                    commonFunction.videoUpload(req.body.audio, (audioErr, audioData) => {
                                        if (audioErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            if (req.body.thumbnail) {
                                                commonFunction.uploadImage(req.body.thumbnail, (imageErr, imageResult) => {
                                                    if (imageErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        let obj = new podcastAudioModel({
                                                            "categoryName": categoryData.categoryName,
                                                            "audio": audioData,
                                                            "episodeName": episodeData.episodeName,
                                                            "audioName": req.body.audioName,
                                                            "categoryId": categoryData._id,
                                                            "episodeId": episodeData._id,
                                                            "thumbnail": imageResult
                                                        })
                                                        obj.save((saveErr, saveResult) => {
                                                            if (saveErr) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.AUDIO_ADD);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                let obj = new podcastAudioModel({
                                                    "categoryName": categoryData.categoryName,
                                                    "audio": audioData,
                                                    "episodeName": episodeData.episodeName,
                                                    "audioName": req.body.audioName,
                                                    "categoryId": categoryData._id,
                                                    "episodeId": episodeData._id
                                                })
                                                obj.save((saveErr, saveResult) => {
                                                    if (saveErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.AUDIO_ADD);
                                                    }
                                                })
                                            }

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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editPodcastAudio
     * Description   : editPodcastAudio in podcast audio management
     *
     * @return response
    */

    editPodcastAudio: (req, res) => {
        try {
            podcastAudioModel.findOne({ _id: req.body.audioId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.audio && !req.body.categoryId && !req.body.episodeId) {
                        commonFunction.videoUpload(req.body.audio, (audioErr, audioResult) => {
                            if (audioErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.audio = audioResult;
                                podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.audio && req.body.categoryId && !req.body.episodeId) {
                        podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.audio && !req.body.categoryId && req.body.episodeId) {
                        podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeErr, episodeResult) => {
                            if (episodeErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!episodeResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.episodeName = episodeResult.episodeName;
                                podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.audio && req.body.categoryId && !req.body.episodeId) {
                        podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryData) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.videoUpload(req.body.audio, (audioErr, audioResult) => {
                                    if (audioErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.categoryName = categoryData.categoryName;
                                        req.body.audio = audioResult;
                                        podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.audio && !req.body.categoryId && req.body.episodeId) {
                        podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (err3, episodeData) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!episodeData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                commonFunction.videoUpload(req.body.audio, (audioErr, audioResult) => {
                                    if (audioErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.episodeName = episodeData.episodeName;
                                        req.body.audio = audioResult;
                                        podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.audio && req.body.categoryId && req.body.episodeId) {
                        podcastCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryData) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                podcastEpisode.findOne({ _id: req.body.episodeId, status: { $ne: "DELETE" } }, (episodeErr, episodeResult) => {
                                    if (episodeErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!episodeResult) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        commonFunction.videoUpload(req.body.audio, (audioErr, audioResult) => {
                                            if (audioErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                req.body.categoryName = categoryData.categoryName;
                                                req.body.episodeName = episodeResult.episodeName;
                                                req.body.audio = audioResult;
                                                podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                                    if (updateErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
                        podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewPodcastAudio
     * Description   : viewPodcastAudio in podcast audio management
     *
     * @return response
    */

    viewPodcastAudio: (req, res) => {
        try {
            podcastAudioModel.findOne({ _id: req.params.audioId, status: { $ne: "DELETE" } }, (err, audioData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!audioData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, audioData, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockPodcastAudio
     * Description   : blockUnblockPodcastAudio in podcast audio management
     *
     * @return response
    */

    blockUnblockPodcastAudio: (req, res) => {
        try {
            podcastAudioModel.findOne({ _id: req.body.audioId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deletePodcastAudio
     * Description   : deletePodcastAudio in podcast audio management
     *
     * @return response
    */

    deletePodcastAudio: (req, res) => {
        try {
            podcastAudioModel.findOne({ _id: req.body.audioId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    podcastAudioModel.findOneAndUpdate({ _id: req.body.audioId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :podcastAudioList
     * Description   : podcastAudioList in podcast audio management
     *
     * @return response
    */

    podcastAudioList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: {
                    createdAt: -1
                }
            }
            if (req.body.search) {
                query.audioName = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit);
            podcastAudioModel.paginate(query, options, (err, audioResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (audioResult.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, audioResult, SuccessMessage.DATA_FOUND);
                }
            })

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewContactUs
     * Description   : viewContactUs in contact us management
     *
     * @return response
    */

    viewContactUs: (req, res) => {
        try {
            contactUsModel.findOne({ _id: req.params.contactUsId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteContactUs
     * Description   : deleteContactUs in contact us management
     *
     * @return response
    */

    deleteContactUs: (req, res) => {
        try {
            contactUsModel.findOne({ _id: req.body.contactUsId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    contactUsModel.findOneAndUpdate({ _id: req.body.contactUsId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :contactUsList
     * Description   : contactUsList in contact us management
     *
     * @return response
    */

    contactUsList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.name = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            contactUsModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :addSubscription
     * Description   : addSubscription in subscription management
     *
     * @return response
    */

    addSubscription: (req, res) => {
        try {
            subscription.findOne({ subscriptionName: req.body.subscriptionName, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUBSCRIPTION_EXISTS);
                }
                else {
                    new subscription(req.body).save((err2, subscriptionData) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, subscriptionData, SuccessMessage.SUBSCRIPTION_ADD);
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
     * Function Name :editSubscription
     * Description   : editSubscription in subscription management
     *
     * @return response
    */

    editSubscription: (req, res) => {
        try {
            subscription.findOneAndUpdate({ _id: req.body.subscriptionId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (err, subscriptionData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subscriptionData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, subscriptionData, SuccessMessage.UPDATE_SUCCESS);

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :viewSubscription
     * Description   : viewSubscription in subscription management
     *
     * @return response
    */

    viewSubscription: (req, res) => {
        try {
            subscription.findOne({ _id: req.params.subscriptionId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteSubscription
     * Description   : deleteSubscription in subscription management
     *
     * @return response
    */

    deleteSubscription: (req, res) => {
        try {
            subscription.findOne({ _id: req.body.subscriptionId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    subscription.findOneAndUpdate({ _id: req.body.subscriptionId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :subscriptionList
     * Description   : subscriptionList in subscription management
     *
     * @return response
    */

    subscriptionList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var query = { status: { $ne: "DELETE" } };
                    if (result.userType == "INDIVIDUAL") {
                        query.type = "INDIVIDUAL";
                    }
                    if (result.userType == "COMPANY ADMIN") {
                        query.type = "COMPANY";
                    }

                    if (req.body.search) {
                        query.subscriptionName = new RegExp('^' + req.body.search, "i");
                    }

                    req.body.limit = parseInt(req.body.limit)
                    var options = {
                        page: req.body.page || 1,
                        limit: req.body.limit || 100,
                        sort: { createdAt: -1 }
                    };

                    subscription.paginate(query, options, (err2, subscriptionResult) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (subscriptionResult.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, subscriptionResult, SuccessMessage.DATA_FOUND);
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
     * Function Name :addMentalHealthCategory
     * Description   : addMentalHealthCategory in mental health category management
     *
     * @return response
   */

    addMentalHealthCategory: (req, res) => {
        try {
            mentalHealthCategory.findOne({ categoryName: req.body.categoryName, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXISTS);
                }
                else {
                    commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                        if (uploadErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            req.body.image = uploadResult;
                            new mentalHealthCategory(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CATEGORY_ADD);
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
     * Function Name :viewMentalHealthCategory
     * Description   : viewMentalHealthCategory in mental health category management
     *
     * @return response
    */

    viewMentalHealthCategory: (req, res) => {
        try {
            mentalHealthCategory.findOne({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editMentalHealthCategory
     * Description   : editMentalHealthCategory in mental health category management
     *
     * @return response
    */

    editMentalHealthCategory: (req, res) => {
        try {
            mentalHealthCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.image) {
                        commonFunction.uploadImage(req.body.image, (error, uploadResult) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = uploadResult;
                                mentalHealthCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        mentalHealth.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (updateError, updateResultt) => {
                                            if (updateError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        mentalHealthCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                mentalHealth.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (updateError, updateResultt) => {
                                    if (updateError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockMentalHealthCategory
     * Description   : blockUnblockMentalHealthCategory in mental health category management
     *
     * @return response
    */

    blockUnblockMentalHealthCategory: (req, res) => {
        try {
            mentalHealthCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        mentalHealthCategory.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                mentalHealth.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (updateError, updateResultt) => {
                                    if (updateError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        mentalHealthCategory.findOneAndUpdate({ _id: req.body.categoryId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                mentalHealth.update({ categoryId: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { multi: true }, (updateError, updateResultt) => {
                                    if (updateError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteMentalHealthCategory
     * Description   : deleteMentalHealthCategory in mental health category management
     *
     * @return response
    */

    deleteMentalHealthCategory: (req, res) => {
        try {
            mentalHealthCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    mentalHealthCategory.findOneAndUpdate({ _id: req.body.categoryId }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else {
                            mentalHealth.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (updateError, updateResultt) => {
                                if (updateError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :mentalHealthCategoryList
     * Description   : mentalHealthCategoryList in mental health category management
     *
     * @return response
    */

    mentalHealthCategoryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.categoryName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            mentalHealthCategory.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :getAllMentalHealthCategory
     * Description   : getAllMentalHealthCategory in mental health category management
     *
     * @return response
    */

    getAllMentalHealthCategories: (req, res) => {
        try {
            mentalHealthCategory.find({ status: { $ne: "DELETE" } }).select('categoryName').sort({ createdAt: -1 }).exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
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

    /**
     * Function Name :addMentalHealth
     * Description   : addMentalHealth in mental health management
     *
     * @return response
    */

    addMentalHealth: (req, res) => {
        try {
            mentalHealthCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, categoryData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    mentalHealth.findOne({ subjectName: req.body.subjectName, status: { $ne: "DELETE" } }, (err2, result) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else if (result) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUBJECT_EXISTS);
                        }
                        else {
                            var obj = {
                                categoryId: categoryData._id,
                                categoryName: categoryData.categoryName,
                                subjectName: req.body.subjectName,
                                description: req.body.description
                            };

                            new mentalHealth(obj).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.MENTAL_HEALTH_ADD);
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
     * Function Name :viewMentalHealth
     * Description   : viewMentalHealth in mental health management
     *
     * @return response
    */

    viewMentalHealth: (req, res) => {
        try {
            mentalHealth.findOne({ _id: req.params.healthId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editMentalHealth
     * Description   : editMentalHealth in mental health management
     *
     * @return response
    */

    editMentalHealth: (req, res) => {
        try {
            mentalHealth.findOne({ _id: req.body.healthId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.categoryId) {
                        mentalHealthCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                mentalHealth.findOneAndUpdate({ _id: req.body.healthId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        mentalHealth.findOneAndUpdate({ _id: req.body.healthId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockMentalHealth
     * Description   : blockUnblockMentalHealth in mental health management
     *
     * @return response
    */

    blockUnblockMentalHealth: (req, res) => {
        try {
            mentalHealth.findOne({ _id: req.body.healthId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        mentalHealth.findOneAndUpdate({ _id: req.body.healthId, status: { $ne: "DELETE" } }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        mentalHealth.findOneAndUpdate({ _id: req.body.healthId, status: { $ne: "DELETE" } }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteMentalHealth
     * Description   : deleteMentalHealth in mental health management
     *
     * @return response
    */

    deleteMentalHealth: (req, res) => {
        try {
            mentalHealth.findOne({ _id: req.body.healthId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    mentalHealth.findOneAndUpdate({ _id: req.body.healthId }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :mentalHealthList
     * Description   : mentalHealthList in mental health management
     *
     * @return response
    */

    mentalHealthList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            if (req.body.search) {
                query.subjectName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            mentalHealth.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :addMedicalCategory
     * Description   : addMedicalCategory in medical condition category management
     *
     * @return response
   */

    addMedicalCategory: (req, res) => {
        try {
            medicalConditionCategory.findOne({ categoryName: req.body.categoryName, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXISTS);
                }
                else {
                    commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                        if (uploadErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            req.body.image = uploadResult;
                            new medicalConditionCategory(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CATEGORY_ADD);
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
     * Function Name :viewMedicalCategory
     * Description   : viewMedicalCategory in medical condition category management
     *
     * @return response
    */

    viewMedicalCategory: (req, res) => {
        try {
            medicalConditionCategory.findOne({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editMedicalCategory
     * Description   : editMedicalCategory in medical condition category management
     *
     * @return response
    */

    editMedicalCategory: (req, res) => {
        try {
            medicalConditionCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.image) {
                        commonFunction.uploadImage(req.body.image, (uploadErr, uploadResult) => {
                            if (uploadErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = uploadResult;
                                medicalConditionCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        medicalCondition.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { categoryName: req.body.categoryName } }, { multi: true }, (updateError, updateResultt) => {
                                            if (updateError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        medicalConditionCategory.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                medicalCondition.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { multi: true }, (updateError, updateResultt) => {
                                    if (updateError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockMedicalCategory
     * Description   : blockUnblockMedicalCategory in medical condition category management
     *
     * @return response
    */

    blockUnblockMedicalCategory: (req, res) => {
        try {
            medicalConditionCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        medicalConditionCategory.findOneAndUpdate({ _id: req.body.categoryId }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        medicalConditionCategory.findOneAndUpdate({ _id: req.body.categoryId }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteMedicalCategory
     * Description   : deleteMedicalCategory in medical condition category management
     *
     * @return response
    */

    deleteMedicalCategory: (req, res) => {
        try {
            medicalConditionCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    medicalConditionCategory.findOneAndUpdate({ _id: req.body.categoryId }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else {
                            medicalCondition.update({ categoryId: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { multi: true }, (updateError, updateResultt) => {
                                if (updateError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :medicalCategoryList
     * Description   : medicalCategoryList in medical condition category management
     *
     * @return response
    */

    medicalCategoryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.categoryName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            medicalConditionCategory.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
     * Function Name :getAllMedicalCategories
     * Description   : getAllMedicalCategories in medical condition category management
     *
     * @return response
    */

    getAllMedicalCategories: (req, res) => {
        try {
            medicalConditionCategory.find({ status: { $ne: "DELETE" } }).select('categoryName').sort({ createdAt: -1 }).exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
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

    /**
     * Function Name :addMedicalCondition
     * Description   : addMedicalCondition in medical condition knowledge management
     *
     * @return response
    */

    addMedicalCondition: (req, res) => {
        try {
            medicalConditionCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, categoryData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!categoryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    medicalCondition.findOne({ subjectName: req.body.subjectName, status: { $ne: "DELETE" } }, (err2, result) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorCode.INTERNAL_ERROR);
                        }
                        else if (result) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUBJECT_EXISTS);
                        }
                        else {
                            var obj = {
                                categoryId: categoryData._id,
                                categoryName: categoryData.categoryName,
                                subjectName: req.body.subjectName,
                                description: req.body.description
                            };

                            new medicalCondition(obj).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.MEDICAL_ADD);
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
     * Function Name :viewMedicalCondition
     * Description   : viewMedicalCondition in medical condition knowledge management
     *
     * @return response
    */

    viewMedicalCondition: (req, res) => {
        try {
            medicalCondition.findOne({ _id: req.params.medicalId, status: { $ne: "DELETE" } }, (err, result) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editMedicalCondition
     * Description   : editMedicalCondition in medical condition knowledge management
     *
     * @return response
    */

    editMedicalCondition: (req, res) => {
        try {
            medicalCondition.findOne({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.categoryId) {
                        medicalConditionCategory.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err2, categoryResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.categoryName = categoryResult.categoryName;
                                medicalCondition.findOneAndUpdate({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        medicalCondition.findOneAndUpdate({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockMedicalCondition
     * Description   : blockUnblockMedicalCondition in medical condition knowledge management
     *
     * @return response
    */

    blockUnblockMedicalCondition: (req, res) => {
        try {
            medicalCondition.findOne({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        medicalCondition.findOneAndUpdate({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        medicalCondition.findOneAndUpdate({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteMedicalCondition
     * Description   : deleteMedicalCondition in medical condition knowledge management
     *
     * @return response
    */

    deleteMedicalCondition: (req, res) => {
        try {
            medicalCondition.findOne({ _id: req.body.medicalId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    medicalCondition.findOneAndUpdate({ _id: req.body.medicalId }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :medicalConditionList
     * Description   : medicalConditionList in medical condition knowledge management
     *
     * @return response
    */

    medicalConditionList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            if (req.body.search) {
                query.subjectName = new RegExp('^' + req.body.search, "i");
            }

            if (req.body.status) {
                query.status = req.body.status;
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            medicalCondition.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
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

    /**
    * Function Name :viewUser
    * Description   : viewUser in user management
    *
    * @return response
   */

    viewUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" }, userType: "INDIVIDUAL" }, (err, userDetails) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!userDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, userDetails, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :viewCompany
     * Description   : viewCompany in user management
     *
     * @return response
    */

    viewCompany: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" }, userType: "COMPANY" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockUser
     * Description   : blockUnblockUser in user management
     *
     * @return response
    */

    blockUnblockUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" } }, (err, data) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!data) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    if (data.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateStatus) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateStatus, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateStatus) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateStatus, SuccessMessage.UNBLOCK_SUCCESS);
                            }
                        })
                    }

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteUser
     * Description   : deleteUser in user management
     *
     * @return response
    */

    deleteUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.userId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateStatus) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateStatus, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :userList
     * Description   : userList in user management
     *
     * @return response
    */

    userList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" }, userType: { $in: ["INDIVIDUAL", "COMPANY"] } };
            if (req.body.search) {
                query.firstName = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }
            if (req.body.userType) {
                query.userType = req.body.userType;
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            }

            userModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.USER_LIST_FETCH);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :viewTransaction
     * Description   : viewTransaction in transaction management
     *
     * @return response
    */

    viewTransaction: (req, res) => {
        try {
            transactionModel.findOne({ _id: req.params.transactionId, status: { $ne: "DELETE" } }, (err, transactionData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!transactionData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, transactionData, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteTransaction
     * Description   : deleteTransaction in transaction management
     *
     * @return response
    */

    deleteTransaction: (req, res) => {
        try {
            transactionModel.findOne({ _id: req.body.transactionId, status: { $ne: "DELETE" } }, (err, transactionData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    transactionModel.findOneAndUpdate({ _id: req.body.transactionId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :transactionList
     * Description   : transactionList in transaction management
     *
     * @return response
    */

    transactionList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.chargeId = new RegExp('^' + req.body.search, "i");
            }

            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page,
                limit: req.body.limit,
                sort: { createdAt: -1 }
            };

            transactionModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    }





}

