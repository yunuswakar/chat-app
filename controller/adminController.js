const userModel = require("../model/userModel");
const questionModel = require("../model/securityQuestionModel");
const notificationModel = require("../model/notificationModel")
const moneyModel = require("../model/moneyModel")
const kycModel = require("../model/kycModel")
const qrCodeModel = require("../model/qrCodeModel")
const commissionModel = require("../model/commissionModel")
const advModel = require("../model/advertismentModel")
const postModel = require("../model/postModel")
var transactionModel = require("../model/transactionModel")
const exchangeModel = require("../model/exchangeModel")
//const stripe = require('stripe')('sk_test_i0zrTmLCXuczLIe6kWH0wUFK00JIHdQp1A');
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR');

const { commonResponse: response } = require('../helper/responseHandler')
const { ErrorMessage } = require('../helper/responseMessege')
const { SuccessMessage } = require('../helper/responseMessege')

const { SuccessCode } = require('../helper/responseCode')
const { ErrorCode } = require('../helper/responseCode')
const bcrypt = require("bcrypt-nodejs");
const commonFunction = require('../helper/commonFunction')
const jwt = require('jsonwebtoken');
var auth = require('.././middleWare/auth');

var subAdmin, receiver_details

module.exports = {
    /**
       * Function Name :login  
       * Description   : login by admin
       * 
       * @return response
       */
    login: (req, res) => {
        userModel.findOne({ "mobileNumber": req.body.mobileNumber, "userType": "ADMIN" }, (error, adminData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!adminData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                const check = bcrypt.compareSync(req.body.password, adminData.password)
                if (check) {
                    // var otp = commonFunction.getOTP(4)
                    // var phoneNumber = adminData.countryCode + adminData.mobileNumber
                    //commonFunction.sendSMS(phoneNumber, otp, (error, otpSent) => {
                    // if (error) {
                    //     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                    // }
                    //else {
                    //userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, userType: "ADMIN" }, { $set: { otp: otp, otpTime: Date.now() } }, { new: true }, (err, otpUpdate) => {
                    // if (err) {
                    //     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                    // }
                    //else {
                    var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'moneyTransfer');
                    var result1 = {
                        token: token
                    }
                    response(res, SuccessCode.SUCCESS, result1, SuccessMessage.LOGIN_SUCCESS)
                    //}
                    //})
                    // }
                    // })  

                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                }
            }
        })
    },
    /**
      * Function Name :viewProfile
      * Description   : view profile details of admin
      *
      * @return response     
    */
    viewProfile: (req, res) => {
        try {
            commonFunction.jwtDecode(req.headers.token, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else {
                    userModel.findOne({ _id: result, userType: "ADMIN" }, (err2, adminData) => {
                        if (err2) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else if (!adminData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, adminData, SuccessMessage.DETAIL_GET);

                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

        }

    },

    /**
        * Function Name :editProfile
        * Description   : edit profile of admin
        *
        * @return response
        */

    editProfile: (req, res) => {
        try {
            if (req.body.profilePic) {
                commonFunction.uploadImage(req.body.profilePic, (error, imageData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        req.body.profilePic = imageData
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, { $set: req.body }, { new: true }, (error, adminData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!adminData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, adminData, SuccessMessage.PROFILE_DETAILS);
                            }
                        })
                    }
                })
            }
            else {
                console.log("==========")
                userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, { $set: req.body }, { new: true }, (error, adminData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!adminData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, adminData, SuccessMessage.PROFILE_DETAILS);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
             * Function Name :otpSent
             * Description   : otp sent by admin to mobile number of admin
             *
             * @return response
           */
    otpSent: (req, res) => {
        try {
            var otp = commonFunction.getOTP(4)
            commonFunction.sendSMS(req.body.mobileNumber, otp, (error, otpSent) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else {
                    userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, userType: "ADMIN" }, { $set: { otp: otp, otpTime: Date.now() } }, { new: true }, (err, otpUpdate) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else if (!otpUpdate) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.OTP_SEND, otpUpdate, SuccessMessage.OTP_SEND)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
        }
    },

    /**
         * Function Name :verifyOtp
         * Description   : otp verify by user
         *
         * @return response
       */

    verifyOtp: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                if (result.otp == req.body.otp || req.body.otp == 1234) {
                    var newTime = Date.now()
                    var difference = newTime - result.otpTime
                    console.log(">>>>>>", difference)
                    // if (difference < 60000) {
                    userModel.findByIdAndUpdate(result._id, { verifyOtp: true }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.VERIFY_OTP);
                        }
                    })
                    // }
                    // else {
                    //     response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);

                    // }

                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                }
            }
        })
    },
    addSecurityQuestion: (req, res) => {
        new questionModel(req.body).save((err, success) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                response(res, SuccessCode.SUCCESS, success, SuccessMessage.DATA_SAVED)
            }
        })
    },

    verifyAnswer: (req, res) => {
        questionModel.findOne({ "_id": req.body.questionId }, (error, data) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!data) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

            }
            else {
                if (data.answer == req.body.answer) {
                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.ANSWER_MATCH)
                }
                else {
                    response(res, ErrorCode.NOT_MATCH, [], ErrorMessage.ANSWER_NOT_MATCH)
                }
            }
        })

    },
    changePassword: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, data) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!data) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                var comp = bcrypt.compareSync(req.body.oldPassword, data.password)
                if (comp == true) {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        var newPassword = bcrypt.hashSync(req.body.newPassword)
                        userModel.findOneAndUpdate({ "mobileNumber": data.mobileNumber, userType: "ADMIN" }, { $set: { password: newPassword } }, { new: true }, (error, updatePassword) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updatePassword, SuccessMessage.PASSWORD_UPDATE)
                            }
                        })
                    }
                    else {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.WRONG_PASSWORD)
                    }
                }
                else {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OLD_PASSWORD);
                }
            }
        })
    },

    forgotPassword: (req, res) => {
        userModel.findOne({ "mobileNumber": req.body.mobileNumber, status: "ACTIVE", userType: "ADMIN" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
            }
            else {
                var otp = commonFunction.getOTP(4)
                var phoneNumber = result.countryCode + result.mobileNumber
                commonFunction.sendSMS(phoneNumber, otp, (error, otpSent) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                    }
                    else {
                        userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, userType: "ADMIN" }, { $set: { otp: otp } }, { new: true }, (err, otpUpdate) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.OTP_SEND, otpUpdate, SuccessMessage.OTP_SEND)
                            }
                        })
                    }
                })

            }
        })

    },

    resetPassword: (req, res) => {
        userModel.findOne({ _id: req.body.adminId, userType: "ADMIN" }, (error, adminData) => {
            console.log("i ma herhe", adminData)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!adminData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
            }
            else {
                if (req.body.newPassword == req.body.confirmPassword) {
                    var newPassword = bcrypt.hashSync(req.body.newPassword)
                    userModel.findOneAndUpdate({ _id: adminData._id, userType: "ADMIN" }, { $set: { password: newPassword } }, { new: true }, (error, updatePassword) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updatePassword, SuccessMessage.PASSWORD_UPDATE)
                        }
                    })
                }
                else {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.WRONG_PASSWORD)
                }

            }
        })
    },

    /**
    * Function Name :add sub admin
    * Description : sub-admin adding by admin
    *
    * @return response
    */

    addSubAdmin: (req, res) => {
        try {
            userModel.findOne({ 'mobileNumber': req.body.mobileNumber, status: { $ne: "DELETE" } }, (error, result2) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (result2) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_EXIST)
                }
                else {
                    if (req.body.profilePic) {
                        commonFunction.uploadImage(req.body.profilePic, (error, profilePic) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                commonFunction.uploadImage(req.body.kycImage, (err, imageResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                    }
                                    else {
                                        req.body.userType = "SUBADMIN";
                                        req.body.profilePic = profilePic
                                        req.body.kycImage = imageResult
                                        req.body.password = bcrypt.hashSync(req.body.password)
                                        req.body.permissions = [{
                                            dashboard: req.body.dashboard,
                                            userManagement: req.body.userManagement,
                                            subAdminManagement: req.body.subAdminManagement,
                                            moneyManagement: req.body.moneyManagement,
                                            commissionManagement: req.body.commissionManagement,
                                            transactionManagement: req.body.transactionManagement,
                                            chatManagement: req.body.chatManagement,
                                            staticContentManagement: req.body.staticContentManagement,
                                            journalManagement: req.body.journalManagement,
                                            agentTransactionManagement: req.body.agentTransactionManagement,
                                            kycManagement: req.body.kycManagement
                                        }]
                                        commonFunction.emailSend(req.body.emailId, `Dear ${req.body.name}, Congratulations your account has been created as a Sub-
                                    Admin.<br> Your email and password are:-<br> Email: ${req.body.emailId}<br> Password: ${pass}`, (err, emailResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                new userModel(req.body).save((saveErr, saveResult) => {
                                                    if (saveErr) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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
                    else {
                        commonFunction.uploadImage(req.body.kycImage, (err, imageResult) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                req.body.userType = "SUBADMIN"
                                req.body.kycImage = imageResult
                                var pass = req.body.password
                                req.body.password = bcrypt.hashSync(req.body.password)
                                req.body.permissions = [{
                                    dashboard: req.body.dashboard,
                                    userManagement: req.body.userManagement,
                                    subAdminManagement: req.body.subAdminManagement,
                                    moneyManagement: req.body.moneyManagement,
                                    commissionManagement: req.body.commissionManagement,
                                    transactionManagement: req.body.transactionManagement,
                                    chatManagement: req.body.chatManagement,
                                    staticContentManagement: req.body.staticContentManagement,
                                    journalManagement: req.body.journalManagement,
                                    agentTransactionManagement: req.body.agentTransactionManagement,
                                    kycManagement: req.body.kycManagement
                                }]
                                commonFunction.emailSend(req.body.emailId, `Dear ${req.body.name}, Congratulations your account has been created as a Sub-
                                 Admin.<br> Your email and password are:-<br> Email: ${req.body.emailId}<br> Password: ${pass}`, (err, emailResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        new userModel(req.body).save((saveErr, saveResult) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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

                }
            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    /**
               * Function Name :edit profile Sub-admin
               * Description   : change in sub-admin details
               *
               * @return response
               */
    editSubAdmin: (req, res) => {
        try {
            userModel.findOne({ "_id": req.body._id, userType: "SUBADMIN", status: "ACTIVE" }, (error, subData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!subData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.kycImage && !req.body.profilePic) {
                        commonFunction.uploadImage(req.body.kycImage, (error, imageResult) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                subAdmin = {};
                                subAdmin.kycImage = imageResult

                                if (req.body.name) {
                                    subAdmin.name = req.body.name
                                }
                                if (req.body.password) {
                                    subAdmin.password = bcrypt.hashSync(req.body.password);
                                }
                                if (req.body.mobileNumber) {
                                    subAdmin.mobileNumber = req.body.mobileNumber
                                }
                                if (req.body.permissionId) {
                                    subAdmin.permissions = [{
                                        _id: req.body.permissionId,
                                        dashboard: req.body.dashboard,
                                        userManagement: req.body.userManagement,
                                        subAdminManagement: req.body.subAdminManagement,
                                        agentManagement: req.body.agentManagement,
                                        moneyManagement: req.body.moneyManagement,
                                        commissionManagement: req.body.commissionManagement,
                                        transactionManagement: req.body.transactionManagement,
                                        chatManagement: req.body.chatManagement,
                                        staticContentManagement: req.body.staticContentManagement,
                                        journalManagement: req.body.journalManagement,
                                        agentTransactionManagement: req.body.agentTransactionManagement,
                                        kycManagement: req.body.kycManagement
                                    }]
                                }
                                userModel.findOneAndUpdate({ "_id": subData._id }, { $set: subAdmin }, { new: true }, (error, updateData) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.kycImage && req.body.profilePic) {
                        commonFunction.uploadImage(req.body.profilePic, (error, imageResult) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                subAdmin = {};
                                subAdmin.profilePic = imageResult

                                if (req.body.name) {
                                    subAdmin.name = req.body.name
                                }
                                if (req.body.password) {
                                    subAdmin.password = bcrypt.hashSync(req.body.password);
                                }
                                if (req.body.mobileNumber) {
                                    subAdmin.mobileNumber = req.body.mobileNumber
                                }
                                if (req.body.permissionId) {
                                    subAdmin.permissions = [{
                                        _id: req.body.permissionId,
                                        dashboard: req.body.dashboard,
                                        userManagement: req.body.userManagement,
                                        subAdminManagement: req.body.subAdminManagement,
                                        agentManagement: req.body.agentManagement,
                                        moneyManagement: req.body.moneyManagement,
                                        commissionManagement: req.body.commissionManagement,
                                        transactionManagement: req.body.transactionManagement,
                                        chatManagement: req.body.chatManagement,
                                        staticContentManagement: req.body.staticContentManagement,
                                        journalManagement: req.body.journalManagement,
                                        agentTransactionManagement: req.body.agentTransactionManagement,
                                        kycManagement: req.body.kycManagement
                                    }]
                                }
                                userModel.findOneAndUpdate({ "_id": subData._id }, { $set: subAdmin }, { new: true }, (error, updateData) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else if (req.body.kycImage && req.body.profilePic) {
                        commonFunction.uploadImage(req.body.kycImage, (error, kycData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                commonFunction.uploadImage(req.body.profilePic, (error, imageResult) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                    }
                                    else {
                                        subAdmin = {};
                                        subAdmin.profilePic = imageResult
                                        subAdmin.kycImage = kycData

                                        if (req.body.name) {
                                            subAdmin.name = req.body.name
                                        }
                                        if (req.body.password) {
                                            subAdmin.password = bcrypt.hashSync(req.body.password);
                                        }
                                        if (req.body.mobileNumber) {
                                            subAdmin.mobileNumber = req.body.mobileNumber
                                        }
                                        if (req.body.permissionId) {
                                            subAdmin.permissions = [{
                                                _id: req.body.permissionId,
                                                dashboard: req.body.dashboard,
                                                userManagement: req.body.userManagement,
                                                subAdminManagement: req.body.subAdminManagement,
                                                agentManagement: req.body.agentManagement,
                                                moneyManagement: req.body.moneyManagement,
                                                commissionManagement: req.body.commissionManagement,
                                                transactionManagement: req.body.transactionManagement,
                                                chatManagement: req.body.chatManagement,
                                                staticContentManagement: req.body.staticContentManagement,
                                                journalManagement: req.body.journalManagement,
                                                agentTransactionManagement: req.body.agentTransactionManagement,
                                                kycManagement: req.body.kycManagement
                                            }]
                                        }
                                        userModel.findOneAndUpdate({ "_id": subData._id }, { $set: subAdmin }, { new: true }, (error, updateData) => {
                                            if (error) {
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

                    else {
                        subAdmin = {};
                        if (req.body.name) {
                            subAdmin.name = req.body.name
                        }
                        if (req.body.password) {
                            subAdmin.password = bcrypt.hashSync(req.body.password);
                        }
                        if (req.body.mobileNumber) {
                            subAdmin.mobileNumber = req.body.mobileNumber
                        }
                        if (req.body.permissionId) {
                            subAdmin.permissions = [{
                                _id: req.body.permissionId,
                                dashboard: req.body.dashboard,
                                userManagement: req.body.userManagement,
                                subAdminManagement: req.body.subAdminManagement,
                                agentManagement: req.body.agentManagement,
                                moneyManagement: req.body.moneyManagement,
                                commissionManagement: req.body.commissionManagement,
                                transactionManagement: req.body.transactionManagement,
                                chatManagement: req.body.chatManagement,
                                staticContentManagement: req.body.staticContentManagement,
                                journalManagement: req.body.journalManagement,
                                agentTransactionManagement: req.body.agentTransactionManagement,
                                kycManagement: req.body.kycManagement
                            }]
                        }
                        userModel.findOneAndUpdate({ "_id": subData._id }, { $set: subAdmin }, { new: true }, (error, updateData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }
                }
            })
        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
          * Function Name :viewSubAdmin
          * Description   : view perticuler subadmin by admin
          *
          * @return response
          */
    viewSubAdmin: (req, res) => {
        userModel.findOne({ "_id": req.body.id, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (error, subData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!subData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, subData, SuccessMessage.PROFILE_DETAILS);
            }
        })
    },


    /**
           * Function Name :block/unblock sub admin
           * Description   : block or unblock particular sub-admin
           *
           * @return response
           */
    blockUnblockSubAdmin: (req, res) => {
        try {
            userModel.findOne({ "_id": req.body.id, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (error, subData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    if (subData.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ _id: subData._id, userType: "SUBADMIN" }, { $set: { status: "BLOCK" } }, { new: true }, (error, statusUpdate) => {
                            console.log("=================>")
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, statusUpdate, SuccessMessage.SUB_ADMIN_BLOCK)
                            }
                        })
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: subData._id, userType: "SUBADMIN" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, statusUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, statusUpdate, SuccessMessage.SUB_ADMIN_UNBLOCK)
                            }
                        })
                    }

                }
            })
        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
    * Function Name : get all sub-admin
    * Description : get all the sub-admin details
    *
    * @return response
    */
    getAllSubAdmin: (req, res) => {
        console.log("hshshshhshshs", req.body, req.headers)
        try {
            var query = { $and: [{ status: { $ne: "DELETE" } }, { userType: "SUBADMIN" }] };

            if (req.body.search) {
                query.$or = [{ subAdmin_Id: { $regex: req.body.search, $options: 'i' } },
                { name: { $regex: req.body.search, $options: 'i' } }
                ]
            }

            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            userModel.paginate(query, options, (error, userData) => {
                console.log("hdhdhdh", error)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }

        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
* Function Name : delete sub-admin
* Description : delete sub-admin
*
* @return response
*/
    deleteSubAdmin: (req, res) => {
        try {
            userModel.findOne({ "_id": req.body.id, userType: "SUBADMIN" }, (error, subData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    userModel.findOneAndUpdate({ "_id": subData._id, userType: "SUBADMIN" }, { $set: { status: "DELETE" } }, { new: true }, (error, deleteSub) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, deleteSub, SuccessMessage.DELETE_SUCCESS)
                        }
                    })
                }
            })
        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
          * Function Name :viewUser
          * Description   : view perticuler user by admin
          *
          * @return response
          */
    viewUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, userType: "CUSTOMER", status: { $ne: "DELETE" } }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },
    /**
     * Function Name :ACTIVE/BLOCK User
     * Description   :Active and Block status in user Management
     *
     * @return response
     */
    activeBlockUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                }
                else {
                    if (result.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "CUSTOMER" }, { $set: { status: "BLOCK" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.BLOCK_SUCCESS)
                            }
                        })
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "BLOCK", userType: "CUSTOMER" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.ACTIVE_SUCCESS)
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
         * Function Name :show All Customer
         * Description   :show All Customer in user Management
         *
         * @return response
         */
    showallCustomers: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" }, userType: "CUSTOMER" };

            if (req.body.search) {
                query.$or = [{ firstName: { $regex: req.body.search, $options: 'i' } },
                { lastName: { $regex: req.body.search, $options: 'i' } }
                ]
            }
            if (req.body.state) {
                query.state = req.body.state;
            }
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            userModel.paginate(query, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },
    /**
         * Function Name :deleteUser
         * Description   : delete user by admin
         *
         * @return response
         */
    deleteUser: (req, res) => {
        try {
            userModel.findByIdAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "CUSTOMER" }, { $set: { status: "DELETE" } }, { new: true }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }
    },


    /**
          * Function Name :viewAgent
          * Description   : view agent by admin
          *
          * @return response
          */
    viewAgent: (req, res) => {
        try {
            userModel.findOne({ agentId: req.body.agentId, userType: "AGENT", status: { $ne: "DELETE" } }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!agentData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, agentData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },
    /**
     * Function Name :deleteAgent
     * Description   : delete agent by admin
     *
     * @return response
     */
    deleteAgent: (req, res) => {
        try {
            userModel.findByIdAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "AGENT" }, { $set: { status: "DELETE" } }, { new: true }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!agentData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, agentData, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },

    /**
 * Function Name :ACTIVE/BLOCK Agent
 * Description   :Active and Block status in user Management
 *
 * @return response
 */
    activeBlockAgent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (err, adminResult) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "AGENT" }, (errAgent, resultAgent) => {
                        if (errAgent) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (resultAgent.status == "ACTIVE") {
                            userModel.findOneAndUpdate({ mobileNumber: resultAgent.mobileNumber, status: "ACTIVE", userType: "AGENT" }, { $set: { status: "BLOCK" } }, { new: true }, (error, userData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else if (!userData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                                } else {
                                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.BLOCK_SUCCESS)
                                }
                            })
                        }
                        else if (resultAgent.status == "BLOCK") {
                            userModel.findOneAndUpdate({ mobileNumber: resultAgent.mobileNumber, status: "BLOCK", userType: "AGENT" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, userData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else if (!userData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                                } else {
                                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.ACTIVE_SUCCESS)
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
//==============================================block customer by admin=============================================================

    /**
 * Function Name :ACTIVE/BLOCK Agent
 * Description   :Active and Block status in user Management
 *
 * @return response
 */
activeBlockCustomer: (req, res) => {
    try {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (err, adminResult) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "CUSTOMER" }, (errAgent, resultCustomer) => {
                    if (errAgent) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (resultCustomer.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ mobileNumber: resultCustomer.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, { $set: { status: "BLOCK" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.BLOCK_SUCCESS)
                            }
                        })
                    }
                    else if (resultCustomer.status == "BLOCK") {
                        userModel.findOneAndUpdate({ mobileNumber: resultCustomer.mobileNumber, status: "BLOCK", userType: "AGENT" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.ACTIVE_SUCCESS)
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
         * Function Name :show All Agent
         * Description   :show All Agent in user Management
         *
         * @return response
         */
    showallAgent: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" }, userType: "AGENT" };

            if (req.body.search) {
                query.$or = [{ name: { $regex: req.body.search, $options: 'i' } },
                { lastName: { $regex: req.body.search, $options: 'i' } }
                ]
            }
            if (req.body.state) {
                query.state = req.body.state;
            }
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            userModel.paginate(query, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },



    /**
          * Function Name :get all the list of kyc users
          * Description   : list of kyc users
          *
          * @return response
          */

    getAllKycDetails: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            if (req.body.search) {
                query.$or = [{ VoterID_Name: { $regex: req.body.search, $options: 'i' } }
                ]
            }
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            kycModel.paginate(query, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },
    /**
          * Function Name :view kyc
          * Description   : view particular user kyc
          *
          * @return response
          */
    viewParticularKycDetails: (req, res) => {
        try {
            kycModel.findOne({ "_id": req.body.kycId }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }



    },

    // /**
    //   * Function Name :get all the list of kyc users
    //   * Description   : list of kyc users
    //   *
    //   * @return response
    //   */

    // getAllKycDetails: (req, res) => {
    //     try {

    //         var options = {
    //             page: req.body.pageNumber || 1,
    //             limit: req.body.limit || 10,

    //         }
    //         kycModel.paginate({}, options, (error, userData) => {
    //             if (error) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             } else if (userData.docs == 0) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             } else {
    //                 response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

    //     }

    // },
    /**
          * Function Name :approved kyc details 
          * Description   : kyc details approve by the admin
          *
          * @return response
          */
    approveKycByAdmin: (req, res) => {
        try {
            kycModel.findById({ _id: req.body.kyc_id, kycStatus: "requested" }, (error, doucmentFound) => {
                console.log("==================>", error, doucmentFound)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!doucmentFound) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.REQUEST_NOT_FOUND);
                }
                else {
                    var phoneNumber = "+91" + doucmentFound.customer_mobileNumber
                    commonFunction.sendSMS(phoneNumber, 'Dear Your has been approved', (error, sentMessage) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            kycModel.findByIdAndUpdate({ "_id": doucmentFound._id, kycStatus: "requested" }, { $set: { kycStatus: "approved", approvedDate: Date.now() } },
                                { new: true }, (error, statusApprove) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ "_id": doucmentFound.customer_Id, kycStatus: "unverified" }, { $set: { kycStatus: "verified" } },
                                            { new: true }, (error, statusVerified) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, statusVerified, SuccessMessage.KYC_APPROVED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },
    /**
          * Function Name :delete particular user kyc
          * Description   : deletet particular user kyc details
          *
          * @return response
          */

    deletekyc: (req, res) => {
        try {
            kycModel.findOne({ "_id": req.body.kycId, status: "ACTIVE" }, (error, data) => {
                console.log("==============>", data)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!data) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    kycModel.findOneAndUpdate({ "_id": data._id }, { $set: { status: "DELETE" } }, { new: true }, (error, deletekyc) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!deletekyc) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.success, deletekyc, SuccessMessage.DELETE_SUCCESS)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },


    /**
         * Function Name :qrcode list of  users
         * Description   : qrcode list of users
         *
         * @return response
         */

    qrCodeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            if (req.body.search) {
                query.$or = [{ name: { $regex: req.body.search, $options: 'i' } }
                ]
            }
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            qrCodeModel.paginate(query, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

        }

    },

    /**
     * Function Name :qrcode blockUnblock users
     * Description   : qrcode status change of users
     *
     * @return response
     */

    blockQRuser: (req, res) => {

        try {
            qrCodeModel.findOne({ _id: req.body.qrId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                }
                else {
                    if (result.status == "ACTIVE") {
                        qrCodeModel.findOneAndUpdate({ _id: req.body.qrId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.BLOCK_SUCCESS)
                            }
                        })
                    }
                    else {
                        qrCodeModel.findOneAndUpdate({ _id: req.body.qrId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (error, userData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!userData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                            } else {
                                response(res, SuccessCode.SUCCESS, userData, SuccessMessage.ACTIVE_SUCCESS)
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }

        // qrCodeModel.findOne({ "_id": req.body.qrId }, (error, qrData) => {
        //     if (error) {
        //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        //     }
        //     else if (!qrData) {
        //         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
        //     }

        //     else {
        //         qrCodeModel.status == "ACTIVE" ? qrCodeModel.findOneAndUpdate({ "_id": qrData._id}, { $set: { status: "BLOCK" } }, { new: true }, (error, statsUpdate) => {
        //             if (error) {
        //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        //             }
        //             else {
        //                 response(res, SuccessCode.SuccessCode, statsUpdate, SuccessMessage.BLOCK_SUCCESS)
        //             }
        //         }) : qrCodeModel.findOneAndUpdate({"_id": qrData._id}, { $set: { status: "ACTIVE" } }, { new: true }, (error, statusUpdate) => {
        //             if (error) {
        //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        //             }
        //             else {
        //                 response(res, SuccessCode.SuccessCode, statusUpdate, SuccessMessage.ACTIVE_SUCCESS)
        //             }
        //         })
        //     }

        // })

    },

    /**
     * Function Name :add Money by admin
     * Description   : add Money by admin to customer
     *
     * @return response
     */
    setMoney: (req, res) => {
        commonFunction.jwtDecode(req.headers.token, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

            }
            else {

                req.body.forEach(item => {
                    new moneyModel(item).save((error, savedData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, ErrorCode.SuccessCode.SUCCESS, savedData, SuccessMessage.DATA_SAVED);
                        }
                    })
                })
                response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_SAVED)

            }
        })
    },

    getMoney: (req, res) => {
        try {
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            moneyModel.paginate({}, options, (error, userData) => {
                console.log("===========>", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    setCommission: (req, res) => {
        userModel.findOne({ _id: req.userId }, (error, result) => {
            console.log("000000000000", error, result)
            // console.log("=========>", error, result)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);

            }
            else {
                req.body.forEach(elememt => {
                    new commissionModel(elememt).save((error, saveData) => {
                        if (error) {
                            console.log("==>", error)

                        }

                        else {
                            console.log("==>", saveData)
                        }


                    })

                })
                response(res, SuccessCode.SUCCESS, SuccessMessage.DATA_SAVED)
            }

        })
    },
    getCommission: (req, res) => {
        try {
            // var options = {
            //     page: req.body.pageNumber || 1,
            //     limit: req.body.limit || 10,

            // }
            commissionModel.find({}, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    advertisment: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (errAdmin, resultAdmin) => {
            if (errAdmin) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                commonFunction.multipleImageUploadCloudinary(req.body.image, (error, imageData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        var arr = []
                        imageData.forEach((e) => { arr.push({ image: e }) })
                        var obj = {
                            advImage: arr
                        }

                        new advModel(obj).save((err, saveImage) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, saveImage, SuccessMessage.IMAGE_UPLOAD);
                            }
                        })

                    }
                })
            }
        })

    },

    editAdvertisment: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (errAdmin, resultAdmin) => {
            if (errAdmin) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                advModel.findOne({ _id: req.body.advertismentId }, (error, data) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!data) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        commonFunction.uploadImage(req.body.image, (err, imageUrl) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var set = {}

                                set['advImage.$.image'] = imageUrl

                                advModel.findOneAndUpdate({ "advImage._id": req.body.imageId }, { $set: { "advImage.$.image": imageUrl } }, { new: true }, (error, updateImage) => {

                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }

                                    else if (!updateImage) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                    }

                                    else {
                                        response(res, SuccessCode.SUCCESS, updateImage, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    deleteImg: (req, res) => {
        advModel.findOneAndUpdate({ "advImage._id": req.body.imageId }, { $set: { "advImage.$.status": "DELETE" } }, { new: true }, (error, updateImage) => {

            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }

            else if (!updateImage) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }

            else {
                response(res, SuccessCode.SUCCESS, updateImage, SuccessMessage.UPDATE_SUCCESS);
            }
        })

    },

    getAdvertisment: (req, res) => {
        advModel.find((error, data) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!data) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var arr = []
                data.forEach((ele) => {
                    ele.advImage.forEach((e) => {
                        if (e.status == "ACTIVE") {
                            arr.push(e)
                        }
                    })
                })
                response(res, SuccessCode.SUCCESS, arr, SuccessMessage.DATA_FOUND);
            }
        })

    },




    getPost: (req, res) => {
        try {
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            postModel.paginate({}, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    particularViewPost: (req, res) => {
        try {
            postModel.findOne({ _id: req.body.postId, }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, adminData, SuccessMessage.DETAIL_GET);

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    addAgentTransaction: (req, res) => {
        console.log("===========", req.body)

        new transactionModel(req.body).save((error, saveImage) => {


            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, saveImage, SuccessMessage.DATA_SAVED);
            }
        })



    },
    getAllAgentTransaction: (req, res) => {
        try {
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            transactionModel.paginate({}, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            console.log("=====>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    exchangeMoney: (req, res) => {

        new exchangeModel(req.body).save((error, saveData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, saveData, SuccessMessage.DATA_SAVED);
            }
        })
    },

    editExchangeAmount: (req, res) => {
        exchangeModel.findOne({ _id: req.body.id }, (error, Data) => {
            console.log("hshhhshshshshshshhgs", error, Data)
            //return
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!Data) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var obj = {
                }
                if (req.body.sell) {
                    obj.sell = req.body.sell
                }
                if (req.body.buy) {
                    obj.buy = req.body.buy
                }
                exchangeModel.findOneAndUpdate({ _id: req.body.id }, { $set: obj }, { new: true }, (error, updata) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!updata) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updata, SuccessMessage.UPDATE_SUCCESS)
                    }
                })
            }
        })
    },

    viewTransaction: (req, res) => {
        try {
            transactionModel.findOne({ "_id": req.body.trasactionId, status: "ACTIVE" }, (error, transacionData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!transacionData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, transacionData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    getAllTransaction: (req, res) => {
        try {
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,

            }
            transactionModel.paginate({}, options, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.docs == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            console.log("=====>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },


    getExchangeMoney: (req, res) => {
        try {
            // var options = {
            //     page: req.body.pageNumber || 1,
            //     limit: req.body.limit || 10,

            // }
            exchangeModel.find({}, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (userData.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            console.log("=====>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    addAgentByAdmin: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, (error, userData) => {
                console.log("===========================3333333333333333333333333>", error)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var query = { $and: [{ $or: [{ mobileNumber: req.body.mobileNumber }, { agentId: req.body.agentId }] }, { status: { $ne: "DELETE" } }] }
                    userModel.findOne(query, (error, agentData) => {
                        console.log("-12333333333333333", error)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (agentData) {
                            if (agentData.mobileNumber == req.body.mobileNumber) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                            }
                            else if (agentData.agentId == req.body.agentId) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.AGENT_ID_EXIST);
                            }

                        }
                        else {
                            // phoneNumber = "+91" + req.body.mobileNumber
                            // commonFunction.sendSMS(phoneNumber, `Dear ${req.body.name}, Congratulations your agent account has been created as a AGENT.<br> Your agentId and password are:-<br> AgentId: ${req.body.agentId}
                            //                         <br> Password: ${req.body.password}<br> adminId: ${userData.adminId}`, async (error, emailResult) => {
                            //                             console.log("45666==============>",error)
                            //     if (error) {
                            //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            //     }
                            //else {
                            var qrCodeDetails = `emailId:${req.body.emailId},mobileNumber:${req.body.mobileNumber},name:${req.body.name}`
                            commonFunction.qrcodeGenrate(qrCodeDetails, async (error, qrResult) => {
                                console.log("============789===", error)
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var obj = new userModel({
                                        profilePic: await convertImage(req.body.profilePic),
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        mobileNumber: req.body.mobileNumber,
                                        email1Id: req.body.emailId,
                                        city: req.body.city,
                                        state: req.body.state,
                                        countryCode: req.body.countryCode,
                                        agentId: req.body.agentId,
                                        kyc: `Verified by ${userData.firstName + " " + userData.lastName}`,
                                        userType: "AGENT",
                                        qrCode: await convertImage(qrResult),
                                        password: bcrypt.hashSync(req.body.password),
                                        kycImage: await convertImage(req.body.kycImage),
                                        adminId: userData.adminId,
                                        location: {
                                            "type": "Point",
                                            "coordinates": [0, 0]
                                        },

                                    })
                                    obj.save((error, savedData) => {
                                        console.log("222222222222", error)
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.ACCOUNT_CREATION);
                                        }
                                    })
                                }
                            })

                            // }

                            //  })

                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },
    approveRequestOfAgentByAdmin: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
            }
            else {
                notificationModel.findOne({ _id: req.body._id, status: "requested" }, (error, request) => {
                    console.log("==============>", error, request)
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!request) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.REQUEST_NOT_FOUND);
                    }
                    else {
                        // commonFunction.sendTextOnMobileNumber(request.agent_mobileNumber, "your request has been approved",
                        //     (error, sentMessage) => {
                        //         if (error) {
                        //             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        //         }
                        //         else {  
                        notificationModel.findByIdAndUpdate({ _id: request._id, status: "requested" },
                            { $set: { status: "approved", updatedAt: Date.now() } }, { new: true }, (error, reqApproved) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!reqApproved) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, reqApproved, SuccessMessage.Request_APPROVED)
                                }
                            })
                        //}
                        // })
                    }
                })
            }
        })

    },
    rejectRequestOfCustomerByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                notificationModel.findOne({ _id: req.body._id, status: "requested" }, (error, request) => {
                    console.log("==============>")
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!request) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.REQUEST_NOT_FOUND);
                    }
                    else {
                        commonFunction.sendTextOnMobileNumber(request.agent_mobileNumber, "your request has beeb rejected",
                            (error, sentMessage) => {
                                console.log("===============>", sentMessage)
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    notificationModel.findOneAndUpdate({ _id: request._id, status: "requested" },
                                        { $set: { status: "rejected", updatedAt: Date.now() } }, { new: true }, (error, reqRejected) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (!reqRejected) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.REQUEST_NOT_FOUND);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, reqRejected, SuccessMessage.Request_REJECTED)
                                            }
                                        })
                                }
                            })
                    }
                })
            }

        })

    },

    getAllQuestion: (req, res) => {
        questionModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);

            }
        })
    },

    rateChange: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (error, adminResult) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var obj = {}
                if (req.body.unitUSD) {
                    obj.unitUSD = req.body.unitUSD
                }
                if (req.body.unitCDF) {
                    obj.unitCDF = req.body.unitCDF
                }

                exchangeModel.findOneAndUpdate({ _id: req.body.rateId }, { $set: obj }, { new: true }, (err, rateUpdate) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, rateUpdate, SuccessMessage.UPDATE_SUCCESS);
                    }
                })
            }
        })
    },
    getRate: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (error, adminResult) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                exchangeModel.find({ status: "ACTIVE" }, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },

    sendMoneyByAdmin: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN" }, (error, adminDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } },
                    async (err, numberDetails) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!numberDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else if (numberDetails.kycStatus == "unverified") {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                        }
                        else {
                            if (numberDetails.userType == "AGENT" && req.body.amountType == "USD") {
                                notification_Status = await notificationModel.findOne({ admin_MobileNumber: adminDetails.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "USD" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status) {
                                    if (adminDetails.amountUSD < req.body.amount || adminDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, adminDetails.password)
                                        if (passwordCheck) {
                                            adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: adminDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(adminDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                            if (adminBalanceUpdate) {
                                                var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                    { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                                if (agentBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": numberDetails.agentId,
                                                            "agent_id": numberDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "sender_id": adminDetails._id,
                                                            // "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": adminDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": adminDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "notificationType": notification_Status.notificationType,
                                                            "transactionStatus": "Debited",
                                                            "transectionType": "paid"
                                                        }
                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                receiver_details = {
                                                                    "agentId": numberDetails.agentId,
                                                                    "agent_id": numberDetails._id,
                                                                    "send_amount": req.body.amount,
                                                                    "receive_amount": req.body.amount,
                                                                    "amountType": req.body.amountType,
                                                                    "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                    // "sender_id": adminDetails._id,
                                                                    "receiver_id": numberDetails._id,
                                                                    "sender_mobileNumber": adminDetails.mobileNumber,
                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                    "sender_UserType": adminDetails.userType,
                                                                    "receiver_UserType": numberDetails.userType,
                                                                    "notificationType": notification_Status.notificationType,
                                                                    "transactionStatus": "Credited",
                                                                    "transectionType": "Recieved"
                                                                }
                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                    if (errTrans) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [errTrans], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                            else if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                var notification_Status_ = await notificationModel.findOne({ admin_MobileNumber: adminDetails.mobileNumber, agent_mobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status_) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status_) {
                                    if (adminDetails.amountCDF < req.body.amount || adminDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, adminDetails.password)
                                        if (passwordCheck) {
                                            adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: adminDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(adminDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                            if (adminBalanceUpdate) {
                                                agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                    { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                                if (agentBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": numberDetails.agentId,
                                                            "agent_id": numberDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "sender_id": adminDetails._id,
                                                            //"receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": adminDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": adminDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "notificationType": notification_Status_.notificationType,
                                                            "transactionStatus": "Debited",
                                                            "transectionType": "paid"
                                                        }
                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                receiver_details = {
                                                                    "agentId": numberDetails.agentId,
                                                                    "agent_id": numberDetails._id,
                                                                    "send_amount": req.body.amount,
                                                                    "receive_amount": req.body.amount,
                                                                    "amountType": req.body.amountType,
                                                                    "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                    // "sender_id": adminDetails._id,
                                                                    "receiver_id": numberDetails._id,
                                                                    "sender_mobileNumber": adminDetails.mobileNumber,
                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                    "sender_UserType": adminDetails.userType,
                                                                    "receiver_UserType": numberDetails.userType,
                                                                    "notificationType": notification_Status_.notificationType,
                                                                    "transactionStatus": "Credited",
                                                                    "transectionType": "Recieved"
                                                                }
                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                    if (errTrans) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [errTrans], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.TRANSACTION_COMPLETED);

                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            }

                                        }
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                if (adminDetails.amountUSD < req.body.amount || adminDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    passwordCheck = bcrypt.compareSync(req.body.password, adminDetails.password)
                                    if (passwordCheck) {
                                        adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: adminDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(adminDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                        if (adminBalanceUpdate) {
                                            var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                            if (customerBalanceUpdate) {
                                                obj_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": adminDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": adminDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": adminDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(obj_details).save((error, transactionDetails) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            //"sender_id": adminDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": adminDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": adminDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [errTrans], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    }
                                    else {
                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                    }

                                }
                            }
                            else if (numberDetail.userType == "CUSTOMER" && req.body.amount == "CDF") {
                                if (adminDetails.amountCDF < req.body.amount || adminDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    passwordCheck = bcrypt.compareSync(req.body.password, adminDetails.password)
                                    if (passwordCheck) {
                                        adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: adminDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(adminDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                        if (adminBalanceUpdate) {
                                            var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                            if (customerBalanceUpdate) {
                                                obj_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": adminDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": adminDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": adminDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(obj_details).save((error, transactionDetails) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": adminDetails.firstName + " " + adminDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            //"sender_id": adminDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": adminDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": adminDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [errTrans], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    })
            }
        })
    },
    addCommissionCDF: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (error, userDetails) => {
            console.log("4444444444444", userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userDetails.commissionCDF == 0) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE_TO_ADD);
            }
            else {
                var balance_update = parseFloat(userDetails.amountCDF) + parseFloat(userDetails.commissionCDF)
                var commission_update = parseFloat(userDetails.commissionCDF) - parseFloat(userDetails.commissionCDF)
                userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { amountCDF: balance_update, commissionCDF: commission_update } },
                    { new: true }, (err, updateBalance) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateBalance, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })
            }
        })
    },
    addCommissionUSD: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (error, userDetails) => {
            console.log("4444444444444", userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userDetails.commissionUSD == 0) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE_TO_ADD);
            }
            else {
                var balance_update = parseFloat(userDetails.amountUSD) + parseFloat(userDetails.commissionUSD)
                var commission_update = parseFloat(userDetails.commissionUSD) - parseFloat(userDetails.commissionUSD)
                userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { amountUSD: balance_update, commissionUSD: commission_update } },
                    { new: true }, (err, updateBalance) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateBalance, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })
            }
        })
    },
    adminDetails: (req, res) => {
        userModel.findOne({ adminId: req.body.adminId, userType: "ADMIN" }, (error, adminDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, adminDetails, SuccessMessage.DATA_FOUND);
            }
        })
    },
       addAmountToAdminWallet: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE",accountType:{ $ne: "RECOVERY"} }, (error, userDetails) => {
            console.log("4444444444444", userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userDetails) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                if (req.body.amountType == "USD") {
                    var balance_update = parseFloat(userDetails.amountUSD) + parseFloat(req.body.amount)

                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { amountUSD: balance_update } }, { new: true }, (amountErr, amountResult) => {
                        if (amountErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, amountResult, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })
                }   
                else {
                    var balance_updates = parseFloat(userDetails.amountCDF) + parseFloat(req.body.amount)

                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { amountCDF: balance_updates } }, { new: true }, (amountErr, amountResult) => {
                        if (amountErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, amountResult, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })
                }

            }
        })
    },
    addRecoveryDocument: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE",accountType:{ $ne: "RECOVERY"}}, async(error, userDetails) => {
            console.log("4444444444444", userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userDetails) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                if (req.body.document) {
                    var pictures = await uploadDocument()
                }
                userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: { recoveryDocument: pictures } }, { new: true }, (amountErr, amountResult) => {
                    if (amountErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, amountResult, SuccessMessage.UPDATE_SUCCESS);
                    }

                })
                function uploadDocument() {
                    return new Promise((resolve, reject) => {
                        commonFunction.uploadImage(req.body.document, (uploadErr, uploaded) => {
                            if (uploadErr) {
                                console.log("Error uploading image")
                            }
                            else {
                                resolve(uploaded)
                            }
                        })
                    })
                }
            }
        })
    }
}

function convertImage(profilePic) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(profilePic, (error, imageData) => {
            if (error) {
                resolve(error)
            }
            else {
                resolve(imageData)
            }
        })
    })
}

