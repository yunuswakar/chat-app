const userModel = require('../models/userModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const bcrypt = require('bcrypt-nodejs');
const staticModel = require('../models/staticModel')
const jwt = require('jsonwebtoken');
const faqModel = require('../models/FAQModel')
const QRCode = require('qrcode')
const supportModel = require('../models/supportModel')
const ratingModel = require('../models/ratingModel')
const request = require('request')
// var client_id = "6ccd73be546d4000a6ada5092a27ab9c"//ALI
var client_id = "a80fb294cb1146ccb2b33c1787e3baca" //know1
var app_user_id = "2544535"
// var client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"//Ali
var client_secret = "Z5bae7LJMM9gSHClBVW3lkVt74HUKx6G"//know1
// var client_secret = "dCiyEuY6qSjbooxeY4XIiR4tC8H1DByU"
// var client_id = "72e496c6a099430a8c3224ed5a522fc9"
const providerModel = require('../models/providerModel');
const { options } = require('../routes/userRoute/userRoutes');
const { query } = require('express');
const notificationModel = require('../models/notificationModel')
const myTestModel = require('../models/myTestModel')
const requestify = require('requestify')

module.exports = {

    signUp: (req, res) => {
        try {
            if (
                !req.body.firstName ||
                !req.body.lastName ||
                !req.body.email ||
                !req.body.phoneNumber ||
                !req.body.password
            ) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                var query = {
                    $and: [
                        {
                            $or: [
                                { email: req.body.email },

                                { phoneNumber: req.body.phoneNumber }
                            ]
                        },
                        { status: { $in: ["ACTIVE", "BLOCK"] } }
                    ]
                };
                userModel.findOne(query, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (result) {
                        if (result.phoneNumber == req.body.phoneNumber) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                        } else {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                        }
                    } else {
                        var hashPassword = bcrypt.hashSync(req.body.password);

                        var data = new userModel({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            phoneNumber: req.body.phoneNumber,
                            password: hashPassword,
                            passCodeStatus: req.body.passCodeStatus,
                            passCode: req.body.passCode,
                        });
                        data.save((saveErr, saveResult) => {
                            if (saveErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var html =
                                    `My id is ${saveResult.patientId}`;
                                QRCode.toDataURL(html, function (err2, result2) {
                                    if (err2) {
                                        res.send({ responseCode: 404, responseMessage: "something went wrong", err2 })
                                    }
                                    else {
                                        console.log(result2)
                                        commonFunction.uploadImage(result2, (err3, result3) => {
                                            if (err3) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                console.log("QRCODE", result3)
                                                userModel.findOneAndUpdate({ _id: saveResult._id, status: "ACTIVE" }, { $set: { qrCode: result3 } }, { new: true }, (updateError, update) => {
                                                    if (updateError) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                });
            }
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    addUserDetails: (req, res) => {
        try {
            if (!req.body.userId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userData) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        let obj = {
                            "birthday": req.body.birthday,
                            "gender": req.body.gender,
                            "zipCode": req.body.zipCode,
                            "addressLine1": req.body.addressLine1,
                            "addressLine2": req.body.addressLine2,
                            "state": req.body.state,
                            "city": req.body.city,
                            "userId": req.body.userId
                        }
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $push: { userDetail: obj } }, { new: true }, (userError, addressData) => {
                            if (userError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }

                            else {

                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            return res.send({ responseCode: 500, responseMessage: "Something went wrong" })
        }
    },
    setPassCode: async (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (userErr, userResult) => {
            if (userErr) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userResult) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var data = await userModel.findOneAndUpdate({ _id: userResult._id, passCodeStatus: false },
                    { $set: { passCode: req.body.passCode, passCodeStatus: true } }, { new: true })
                if (data) {
                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_SAVED);
                }
                else {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
            }
        })
    },

    login: (req, res) => {
        try {
            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.email },
                            { phoneNumber: req.body.email },

                        ]
                    },
                    { status: { $in: ["ACTIVE", "BLOCK"] } }
                ]
            };
            userModel.findOne(query, (err, result) => {
                console.log("145======>", result.passCodeStatus)

                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 200, responseMessage: "User not found" })
                }
                else {
                    if (result.passCodeStatus == true) {
                        var check = bcrypt.compareSync(req.body.password, result.password);
                        console.log("154======>", check)
                        if (!check) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $set: { fcmToken: req.body.fcmToken } }, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.LOGIN_SUCCESS);
                                }
                            })
                        }
                    }
                    else {
                        var check1 = bcrypt.compareSync(req.body.password, result.password);
                        console.log("169=====>", check)
                        if (!check1) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $set: { fcmToken: req.body.fcmToken } }, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.LOGIN_SUCCESS);
                                }
                            })
                        }
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    getQrcode: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {

                var html =
                    `My id is ${result._id}`;

                QRCode.toDataURL(html, function (err2, result2) {

                    if (err2) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        commonFunction.uploadImage(result2, (err3, result3) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "QR code generated", result3 })

                            }
                        })
                    }
                })
            }
        })
    },
    forgotPassword: (req, res) => {
        try {
            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.mobileNumber },
                            { phoneNumber: req.body.mobileNumber },

                        ]
                    },
                    { status: "ACTIVE" }
                ]
            };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp3 = commonFunction.getOTP();
                    var otpTime4 = new Date().getTime();
                    var phoneNumber = result.countryCode + req.body.mobileNumber;
                    if (result.phoneNumber == req.body.mobileNumber) {

                        commonFunction.sendSMS(phoneNumber, `Your otp:${otp3}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            }
                            else {
                                userModel.findOneAndUpdate({ phoneNumber: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (otpErr, otpUpdate) => {
                                    if (otpErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.OTP_SEND);
                                    }
                                })
                            }
                        })
                    }
                    else if (result.email == req.body.mobileNumber) {
                        commonFunction.sendOtpFor2fa(req.body.mobileNumber, "know it otp", `Your otp:${otp3}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (otpError, otpUpdate) => {
                                    if (otpError) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.OTP_SEND);
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
    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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

    verifyPassCode: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, passCodeStatus: true }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.passCode == result.passCode) {
                        res.send({ responseCode: 200, responseMessage: "Passcode matched successfully.", result })
                    }
                    else {
                        res.send({ responseCode: 400, responseMessage: "Invalid passCode." })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    otpVerify: (req, res) => {
        try {
            var query = { $or: [{ phoneNumber: req.body.phoneNumber }, { email: req.body.phoneNumber }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var otpTime2 = new Date().getTime();
                    var diff = otpTime2 - result.otpTime;
                    if (req.body.phoneNumber == result.phoneNumber) {
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            if (req.body.otp == result.otp) {
                                userModel.findOneAndUpdate({ phoneNumber: req.body.phoneNumber, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }, (err2, result2) => {
                                    if (err2) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, result2, SuccessMessage.VERIFY_OTP);
                                    }
                                })
                            }
                            else {
                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                            }

                        }
                    }
                    else {
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            if (req.body.otp == result.otp) {
                                userModel.findOneAndUpdate({ email: req.body.phoneNumber, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }, (err2, result2) => {
                                    if (err2) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, result2, SuccessMessage.VERIFY_OTP);
                                    }

                                })
                            }
                            else {
                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                            }
                        }
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    myProfile: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);

            }
            else {
                res.send({ responseCode: 200, responseMessage: "Data found successfully", result })

            }
        })
    },
    sendNotificationToPatient: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, err);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOne({ patientId: req.body.patientId, status: "ACTIVE" }, (patientErr, patientResult) => {
                    if (patientErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, patientErr);
                    }
                    else if (!patientResult) {
                        res.send({ responseCode: 404, responseMessage: "Patient not found" })
                    }
                    else {
                        commonFunction.pushNotification(patientResult.fcmToken, "Access Permission", result.firstName + ' ' + "wants to access your test status. ", (err, notificationResult) => {
                            if (err) {
                                return res.send({ responseCode: 500, responseMessage: "Internal server error", err })
                            }
                            else {
                                var notification = {
                                    senderId: req.body.userId,
                                    receiverId: req.body.patientId,
                                    title: "Access Permission ",
                                    body: `${result.firstName} wants to access your test status.`,
                                    message: `${result.firstName} has requested you to access your test report`,
                                    notificationType: "Test Access Request",
                                    notificationStatus: "Pending"
                                }
                                var notify = new notificationModel(notification)
                                console.log("512====>", notify)
                                notify.save((SaveError, save) => {
                                    console.log("513=====>", SaveError, save)
                                    if (SaveError) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, SaveError);
                                    }
                                    else {
                                        res.send({ responseCode: 200, responseMessage: "Notification send successfully", save })
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
    },
    acceptNotification: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                notificationModel.findOne({ _id: req.body.notificationId, notificationStatus: "Pending" }).populate('senderId').exec((checkErr, checkResult) => {
                    console.log("541====>", checkErr, checkResult)
                    if (checkErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!checkResult) {
                        res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                        notificationModel.findOneAndUpdate({ _id: checkResult._id }, { $set: { notificationStatus: "Approve" } }, (acceptErr, acceptResult) => {
                            if (acceptErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!acceptResult) {
                                res.send({ responseCode: 404, responseMessage: "Data not found" })
                            }
                            else {
                                // res.send({ responseCode: 200, responseMessage: "Approved successfully" })
                                commonFunction.pushNotification(checkResult.senderId.fcmToken, "Permission Granted", result.firstName + ' ' + "has approved your request ", (err1, notificationResult) => {
                                    console.log("498====>", err1, notificationResult)
                                    if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error1", err1 })
                                    }
                                    else {
                                        var notification = {
                                            senderId: req.body.userId,
                                            receiverId: checkResult.senderId._id,
                                            title: "Permission Granted",
                                            body: `${result.firstName} has approved your request`,
                                            message: `${result.firstName} has approved your request`,
                                            notificationType: "Test Access Request",
                                            notificationStatus: "Complete"
                                        }
                                        var notify = new notificationModel(notification)
                                        console.log("512====>", notify)
                                        notify.save((SaveError, save) => {
                                            console.log("513=====>", SaveError, save)
                                            if (SaveError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, SaveError);
                                            }
                                            else {
                                                res.send({ responseCode: 200, responseMessage: "Notification send successfully", save })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })///

            }
        })
    },
    rejectNotification: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                notificationModel.findOne({ _id: req.body.notificationId, notificationStatus: "Pending" }).populate('senderId').exec((checkErr, checkResult) => {
                    console.log("541====>", checkErr, checkResult)
                    if (checkErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!checkResult) {
                        res.send({ responseCode: 404, responseMessage: "Data not found" })
                    }
                    else {
                        notificationModel.findOneAndUpdate({ _id: checkResult._id }, { $set: { notificationStatus: "Reject" } }, (acceptErr, acceptResult) => {
                            if (acceptErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!acceptResult) {
                                res.send({ responseCode: 404, responseMessage: "Data not found" })
                            }
                            else {
                                commonFunction.pushNotification(checkResult.senderId.fcmToken, "Permission Rejected", result.firstName + ' ' + "has rejected your request", (err1, notificationResult) => {
                                    console.log("498====>", err1, notificationResult)
                                    if (err1) {
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error1", err1 })
                                    }
                                    else {
                                        var notification = {
                                            senderId: req.body.userId,
                                            receiverId: checkResult.senderId._id,
                                            title: "Permission Rejected",
                                            body: `${result.firstName} has rejected your request`,
                                            message: `${result.firstName} has rejected your request`,
                                            notificationType: "Test Access Request",
                                            notificationStatus: "Reject"
                                        }
                                        var notify = new notificationModel(notification)
                                        console.log("512====>", notify)
                                        notify.save((SaveError, save) => {
                                            console.log("513=====>", SaveError, save)
                                            if (SaveError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, SaveError);
                                            }
                                            else {
                                                res.send({ responseCode: 200, responseMessage: "Rejected successfully" })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })///

            }
        })
    },
    notificationList: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                notificationModel.findOne({ receiverId: result._id }, (notificationErr, notificationResult) => {
                    if (notificationErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, notificationResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },
    contactSupport: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var data = new supportModel({
                    userId: result._id,
                    name: result.firstName + " " + result.lastName,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    selectPurpose: req.body.selectPurpose,
                    title: req.body.title,
                    message: req.body.message
                })
                data.save((saveErr, saveResult) => {
                    if (saveErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        })
    },


    resetPassCode: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (result.passCode == req.body.passCode) {
                        var buf1 = Buffer.from(req.body.newPassCode);
                        var buf2 = Buffer.from(req.body.confirmPassCode);
                        var x = Buffer.compare(buf1, buf2);

                        if (x) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.NOT_MATCH);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $set: { passCode: buf2 } }, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.PASSWORD_UPDATE);
                                }
                            })
                        }
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_PASSCODE);
                    }

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    shareApp: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userData) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOneAndUpdate({ _id: userData._id }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                    if (updateErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);

                    }
                })
            }
        })
    },
    ratingByUser: async (req, res) => {
        var userData = await userModel.findOne({ _id: req.body.userId, status: "ACTIVE" })
        if (userData) {
            ratingModel.findOne({ userId: req.body.userId }, (ratingErr, ratingResult) => {
                if (ratingErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (ratingResult) {
                    ratingModel.findOneAndUpdate({ userId: req.body.userId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
                        }
                    })
                }
                else {
                    new ratingModel(req.body).save((saveErr, saveResult) => {
                        if (saveErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                        }
                    })
                }
            })
        }
    },
    editProfile: async (req, res) => {
        if (req.body.profilePic) {
            req.body.profilePic = await uploadImage(req.body.profilePic)
        }
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOneAndUpdate({ _id: result._id }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                    console.log("598=======>", updateErr, updateResult)
                    if (updateErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        })
    },
    helpCenter: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.faqId) {
                        faqModel.findOne({ _id: req.body.faqId, status: "ACTIVE" }, (faqErr, faqData) => {
                            if (faqErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!faqData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [faqData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] } };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { question: { $regex: req.body.search, $options: 'i' } }]
                        }


                        faqModel.find(query, (faqError, faqData) => {
                            if (faqError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (faqData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [faqData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    userHistory: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userData) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.find({ status: "ACTIVE", userType: "USER" }, (error, result) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, [result], SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },
    getQrCode: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userData) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var data = {
                    qrcode: userData.qrcode
                }

                response(res, SuccessCode.SUCCESS, [data], SuccessMessage.DATA_FOUND);
            }
        })
    },
    createUser: (req, res) => {
        try {
            req.params.client_id = client_id
            req.params.client_secret = client_secret
            req.params.app_user_id = req.params.userId
            var options = {
                method: 'GET',
                form: req.params,
                url: 'https://api.1up.health/user-management/v1/user'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am here ", someData)
                    if (someData.status == "ERROR") {
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    fhirOAuth: (req, res) => {
        try {
            req.params.client_id = client_id
            req.params.client_secret = client_secret
            req.params.app_user_id = req.params.userId
            var options = {
                method: 'POST',
                form: req.params,
                url: 'https://api.1up.health/fhir/oauth2/token'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am here ", someData)
                    if (someData.status == "ERROR") {
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========dsdsdsds>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    fhirRefreshToken: (req, res) => {
        try {
            req.params.client_id = client_id
            req.params.client_secret = client_secret
            req.params.app_user_id = req.params.userId
            var options = {
                method: 'POST',
                form: req.params,
                url: 'https://api.1up.health/fhir/oauth2/token'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am here ", someData)
                    if (someData.status == "ERROR") {
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========dsdsdsds>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    exchangeAuthCode: (req, res) => {
        try {
            req.params.client_id = "6ccd73be546d4000a6ada5092a27ab9c"
            req.params.client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"
            req.params.code = "c386c86428b44f5a8e2768ff5ffb365e"
            req.params.grant_type = 'authorization_code'

            var options = {
                method: 'POST',
                form: req.params,
                url: 'https://api.1up.health/fhir/oauth2/token'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("i am all", body)

                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log(someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    //-------------------------------


    //--------------------4. Get New OAuth Access Token with Refresh Token------------------------------
    outhTokenWithRefreshToken: (req, res) => {
        try {
            req.params.client_id = "6ccd73be546d4000a6ada5092a27ab9c"
            req.params.client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"
            req.params.refresh_token = "9e9cb4dbc5b84e469cadc262ef02889c"
            req.params.grant_type = 'refresh_token'

            var options = {
                method: 'POST',
                form: req.params,
                url: 'https://api.1up.health/fhir/oauth2/token'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("i am all", body)

                    let data = JSON.stringify(response)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log(someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    userSignUp: (req, res) => {
        try {
            console.log(req.body)
            if (
                !req.body.firstName ||
                !req.body.lastName ||
                !req.body.email ||
                !req.body.phoneNumber ||
                !req.body.password
            ) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                var query = {
                    $and: [
                        {
                            $or: [
                                { email: req.body.email },

                                { phoneNumber: req.body.phoneNumber }
                            ]
                        },
                        { status: { $in: ["ACTIVE", "BLOCK"] } }
                    ]
                };
                userModel.findOne(query, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (result) {
                        if (result.phoneNumber == req.body.phoneNumber) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                        } else {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                        }
                    } else {
                        req.params.client_id = client_id
                        req.params.client_secret = client_secret
                        req.params.app_user_id = app_user_id
                        var options = {
                            method: 'GET',
                            form: req.params,
                            url: 'https://api.1up.health/user-management/v1/user'
                        };
                        request(options, async function (error, response1, body) {
                            // console.log("680==========>", error, response1)
                            if (error) {
                                res.send({ status: false, error })
                            }
                            else {
                                let data = JSON.stringify(response1)
                                let newData = await JSON.parse(data)
                                console.log("I am here 12 .>>>>>", newData.body)
                                var someData = await JSON.parse(newData.body)
                                console.log("I am here ", someData)
                                if (someData.status == "ERROR") {
                                    res.send({ responseCode: 500, responseMessage: someData.reason })
                                }
                                else {
                                    var newPatient = await createPatientResource(req, res)
                                    console.log("PAtIENT DATA", newPatient)
                                    var hashPassword = bcrypt.hashSync(req.body.password);
                                    var data1 = new userModel({
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        email: req.body.email,
                                        phoneNumber: req.body.phoneNumber,
                                        password: hashPassword,
                                        gender: req.body.gender,
                                        passCodeStatus: req.body.passCodeStatus,
                                        passCode: req.body.passCode ? req.body.passCode : null,
                                        userAppId: someData.entry[0].app_user_id,
                                        oneup_user_id: someData.entry[0].oneup_user_id,
                                        patientId: newPatient,
                                        "birthday": req.body.birthday,
                                        "zipCode": req.body.zipCode,
                                        "addressLine1": req.body.addressLine1,
                                        "addressLine2": req.body.addressLine2,
                                        "state": req.body.state,
                                        "city": req.body.city,
                                        "fcmToken": req.body.fcmToken
                                    });
                                    console.log(">>>>>>>>>>>>PATUENT", newPatient)
                                    data1.save(async (saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            // res.send({ responseCode: 200, someData })
                                            var html =
                                                `My id is ${saveResult.patientId}`;
                                            QRCode.toDataURL(html, function (err2, result2) {
                                                if (err2) {
                                                    res.send({ responseCode: 404, responseMessage: "something went wrong", err2 })
                                                }
                                                else {
                                                    console.log(result2)
                                                    commonFunction.uploadImage(result2, (err3, result3) => {
                                                        if (err3) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            console.log("QRCODE", result3)
                                                            userModel.findOneAndUpdate({ _id: saveResult._id, status: "ACTIVE" }, { $set: { qrCode: result3 } }, { new: true }, (updateError, update) => {
                                                                if (updateError) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        });
                    }
                });
            }
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    searchDoctors: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, async (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var tokenData = await createToken(req)
                    var urlToHit = (req.query.name && !req.query.id) ? `https://api.1up.health/fhir/dstu2/Practitioner?name=${req.query.name}&_public=true` : `https://api.1up.health/fhir/dstu2/Practitioner?id=${req.query.id}&_public=true`
                    var options3 = {
                        method: 'GET',
                        'headers': {
                            'Authorization': `Bearer ${tokenData}`
                        },
                        url: urlToHit
                    }
                    request(options3, async (doctError, docData, docBody) => {
                        if (doctError) {
                            res.send({ responseCode: 500, responseMessage: someData.reason })
                        }
                        else {
                            let docDat = await JSON.stringify(docData)
                            console.log("Here is the data", docData)
                            let newData3 = await JSON.parse(docDat)
                            console.log("I am here 12 .>>>>>", newData3.body)
                            let someData3 = await JSON.parse(newData3.body)
                            console.log("I am here ", someData3)
                            res.send(someData3)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    searchProviders: async (req, res) => {
        try {
            var accessToken = await createToken(req)
            console.log(accessToken)
            var newU = (req.query.query) ? `https://system-search.1up.health/api/search?query=${req.query.query}` : `https://system-search.1up.health/api/search`
            var options = {
                method: 'POST',
                'headers': {
                    'Authorization': `Bearer ${accessToken}`
                },
                url: newU
            };
            request(options, async function (error, response1, body) {
                // console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all", body)
                    let data = JSON.stringify(response1)
                    // console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    // console.log(someData)
                    if (someData.status == "ERROR") {
                        // console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    getAllProviders: (req, res) => {
        try {
            req.params.client_id = "6ccd73be546d4000a6ada5092a27ab9c"
            req.params.client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"
            var options = {
                method: 'GET',
                form: req.params,
                url: 'https://api.1up.health/connect/system/clinical'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("i am all", body)
                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log(someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    getAllConnectedHealthSystem: (req, res) => {
        try {
            req.params.client_id = "6ccd73be546d4000a6ada5092a27ab9c"
            req.params.client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"
            var options123 = {
                method: 'GET',
                form: req.params,
                url: 'https://api.1up.health/connect/system/clinical'
            };
            request(options123, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("1140=====>i am all", body)
                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am iherer", someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    blockChainData: (req, res) => {
        try {
            req.params.module = "contract"
            req.params.action = "getabi"
            req.params.address = "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413"
            req.params.apikey = "YourApiKeyToken"


            var options123 = {
                method: 'GET',
                form: req.params,
                url: `https://api.etherscan.io/api/${req.params.module}/${req.params.action}/${req.params.address}/${req.params.apikey}`
            };
            request(options123, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("1140=====>i am all", body)
                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am iherer", someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    newKey: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.NewKey"

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },

    listOfKey: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.ListKeys"
        req.body.params=[];

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },


    unlockKey: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.UnlockKey"

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },
    lockKey: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.LockKey"

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },

    isKeyUnlocked: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.IsKeyUnlocked"

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },
    txApi: (req, res) => {
        req.body.jsonrpc = "2.0"
        req.body.method = "thetacli.Send"

        requestify.post('https://blockchaincli.pandotest.com/rpc', req.body)
            .then(function (response) {
                console.log("1437======>", response)
                // Get the response body (JSON parsed or jQuery object for XMLs)
                response.getBody();

                // Get the raw response body
                response.body;
                console.log("1452=======>", typeof response.body)
                res.status(200).send(JSON.parse(response.body))
            })
    },

    getAuthToken: async (req, res) => {
        var toenData = await createToken(req)
        if (toenData) {
            console.log(toenData)
            res.send({ responseCode: 200, responseMessage: "Token found successfully.", token: toenData })
        }
    },
    saveTestReport: async (req, res) => {
        var tokenData = req.headers.token
        var options = {
            method: "GET",
            'headers': {
                'Authorization': `Bearer ${tokenData}`
            },
            url: `https://api.1up.health/fhir/dstu2/Patient`
        }
        request(options, (error, responses, body) => {
            if (error) {
                res.send({ status: false, error })
            }
            else {
                var newBodyData = responses.body
                var DataParse = JSON.parse(newBodyData)
                if (DataParse.entry.length != 0) {
                    var arr = []
                    var obj = {
                        patientId: req.headers.patientid
                    };

                    DataParse.entry.forEach((a, i) => {
                        console.log(a.resource.id)
                        var options = {
                            method: "GET",
                            'headers': {
                                'Authorization': `Bearer ${tokenData}`
                            },
                            url: `https://api.1up.health/fhir/dstu2/Patient/${a.resource.id}/$everything`
                        }
                        request(options, (error1, responses1, body1) => {
                            if (error1) {
                                res.send({ status: false, error1 })
                            }
                            else {
                                console.log("test report", typeof responses1.body)
                                var SaveData = JSON.parse(responses1.body)
                                console.log(SaveData)
                                if (SaveData) {
                                    arr.push(SaveData)
                                    if (DataParse.entry.length - 1 == i) {
                                        obj.testData = arr
                                        new myTestModel(obj).save((error, save) => {
                                            console.log("2226======>", error, save)
                                        })
                                    }
                                }
                            }
                        })
                    })
                    res.send({ responseCode: 200, responseMessage: "Data saved successfully" })
                }

            }
        })
    },
    getTestReport: (req, res) => {
        try {
            myTestModel.find({ patientId: req.headers.patientid, status: "ACTIVE" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Data fetched successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    recentTestReport: (req, res) => {
        try {
            myTestModel.find({ patientId: req.headers.patientid, status: "ACTIVE" }).sort({ createdAt: -1 }).limit(1).exec((error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Data fetched successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    connectProvideSearch: async (req, res) => {
        var tokenData = await createToken(req)
        var options = {
            method: "GET",
            'headers': {
                'Authorization': `Bearer ${tokenData}`
            },
            url: `https://api.1up.health/connect/system/provider/search?q=${req.query.q}`
        }
        request(options, (error, responses, body) => {
            if (error) {
                res.send({ status: false, error })
            }
            else {
                console.log(error, responses, body)
            }
        })
    },
    loginForFhir: (req, res) => {
        try {
            req.params.client_id = "6ccd73be546d4000a6ada5092a27ab9c"
            req.params.client_secret = "DYtqdVk5Qbpv6pH7gMS4XHrWKWUM4LPu"
            var options = {
                method: 'GET',
                form: req.params,
                url: 'https://api.1up.health/connect/system/clinical'
            };
            request(options, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("i am all", body)
                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am iherer", someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            console.log("714==========>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    addProvider: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var data = new providerModel({
                    userId: result._id,
                    providerName: req.body.providerName,
                    address: req.body.address,
                    phoneNumber: req.body.phoneNumber,
                    countryCode: req.body.countryCode
                })
                data.save((saveErr, saveResult) => {
                    if (saveErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        })
    },


    deleteProvider: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    providerModel.findOneAndUpdate({ _id: req.body.providerId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (providerError, providerData) => {
                        if (providerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Provider deleted successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    providerList: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    let query = { status: "ACTIVE" };
                    var options = {
                        page: req.body.page || 1,
                        limit: req.body.limit || 5,
                        sort: { createdAt: -1 }
                    };
                    if (req.body.userId) {
                        query.userId = req.body.userId
                    }
                    providerModel.paginate(query, options, (cuponError, cuponData) => {
                        console.log("1054=====>", cuponError, cuponData)
                        if (cuponError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (cuponData.length == 0) {
                            return res.send({ responseCode: 404, responseMessage: "No provider found for this retailer." })
                        }
                        else {
                            return res.send({ responseCode: 200, responseMessage: "Provider found successfully.", cuponData })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    existApi: (req, res) => {
        try {
            let query = { $and: [{ $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }] }, { status: { $in: ["ACTIVE", "BLOCK"] } }] }
            userModel.findOne(query, (error, result) => {
                console.log("1330=====>", error, result)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    if (result.email == req.body.email) {
                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                    }
                    else {
                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    emailVerify: (req, res) => {
        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                res.send({ responseCode: 201, responseMessage: "Emial is OK to be registetred" })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Emial already exists." })
            }
        })
    },
    phoneVerify: (req, res) => {
        if (req.body.phoneNumber && !req.body.email) {
            userModel.findOne({ phoneNumber: req.body.phoneNumber, status: { $ne: "DELETE" } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 201, responseMessage: "Mobile Number is OK to be registetred" })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Mobile Number already exists." })
                }
            })
        }
        else if (!req.body.phoneNumber && req.body.email) {
            userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 201, responseMessage: "Emial is OK to be registetred" })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Emial already exists." })
                }
            })
        }
    },

    aboutUs: (req, res) => {
        staticModel.findOne({ title: "Terms & Conditions" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "T&C Found successfully.", result })
            }
        })
    },

    privacyPolicy: (req, res) => {
        staticModel.findOne({ title: "Privacy Policy" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Privacy policy Found successfully.", result })
            }
        })
    },

    legal: (req, res) => {
        staticModel.findOne({ title: "legal" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Data Found successfully.", result })
            }
        })
    },
    turnOnNotification: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { notificationStatus: req.body.notificationStatus } }, { new: true }, (providerError, providerData) => {
                        if (providerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Data Updated successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    turnPassCodeStatus: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { passCodeStatus: req.body.passCodeStatus } }, { new: true }, (providerError, providerData) => {
                        console.log("1459=======>", providerError, providerData)
                        if (providerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Data Updated successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    faqList: (req, res) => {
        try {
            let query14 = { status: { $in: ["ACTIVE", "BLOCK"] } };
            if (req.body.search) {
                query14.$and = [{ status: { $ne: "DELETE" } }, { question: { $regex: req.body.search, $options: 'i' } }]
            }
            faqModel.find(query14, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "FaqList fetched successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewFaq: (req, res) => {
        try {
            faqModel.findOne({ _id: req.body.faqId, status: "ACTIVE" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Faq fetched successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    deleteAccount: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (providerError, providerData) => {
                        if (providerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Account deleted successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    addReport: (req, res) => {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userError, userData) => {
            if (userError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var data = {
                    patientId: userData.patientId,
                    resourceType: req.body.resourceType,
                    identifier: req.body.identifier,
                    status: req.body.status,
                    category: req.body.category,
                    code: req.body.code,
                    subject: req.body.subject,
                    encounter: req.body.encounter,
                    effectiveDateTime: Date.now(),
                    effectivePeriod: req.body.effectivePeriod,
                    issued: req.body.issued,
                    performer: req.body.performer,
                    request: req.body.request,
                    specimen: req.body.specimen,
                    result: req.body.result,
                    imagingStudy: req.body.imagingStudy,
                    image: req.body.image,
                    conclusion: req.body.conclusion,
                    codedDiagnosis: req.body.codedDiagnosis,
                    presentedForm: req.body.presentedForm
                }
                var toSave = new reportModel(data)
                toSave.save((saveErr, saved) => {
                    if (saveErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "Data saved", result })
                    }
                })
            }
        })
    },
    connect: (req, res) => {
        try {
            var optionss = {
                method: 'GET',
                form: req.params,
                url: `https://quick.1up.health/connect/${req.params.systemId}?access_token=${access_token}&state=CA&bg=Black`
            };
            request(optionss, async function (error, response1, body) {
                console.log("680==========>", error, response1, body)
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    console.log("i am all", body)
                    let data = JSON.stringify(response1)
                    console.log("700============>", data)
                    let newData = await JSON.parse(data)
                    console.log("I am here 12 .>>>>>", newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("I am iherer", someData)
                    if (someData.status == "ERROR") {
                        console.log('761=======>', someData.authorization_code)
                        res.send({ responseCode: 500, responseMessage: someData.reason })
                    }
                    else {
                        res.send({ responseCode: 200, someData })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    getOneUpCreds: (req, res) => {
        if (req.query.success === "false") {
            res.send({ responseCode: 201, responseMessage: "Authentication false" })
        }
        else if (req.query.success === "true") {
            res.send({ responseCode: 200, responseMessage: "OK" })
        }
    }

}
function createPatientResource(req, res) {
    return new Promise(async (resolve, reject) => {
        var tokenData = await createToken(req)
        console.log("I am in here.")
        var bodyData = {
            resourceType: "PATIENT",
            id: commonFunction.getOTP(),
            gender: req.body.gender
        }
        var options3 = {
            method: 'POST',
            form: bodyData,
            'headers': {
                'Authorization': `Bearer ${tokenData}`
            },
            url: 'https://api.1up.health/fhir/dstu2/Patient'
        }
        request(options3, async (doctError, docData, docBody) => {
            if (doctError) {
                res.send({ responseCode: 500, responseMessage: someData.reason })
            }
            else {
                let docDat = await JSON.stringify(docData)
                // console.log(docData)
                let newData3 = await JSON.parse(docDat)
                // console.log("I am here 12 .>>>>>", newData3.body)
                let someData3 = await JSON.parse(newData3.body)
                // console.log("I am here254 ", someData3)
                resolve(someData3.id)
            }
        })
    })
}
function createToken(req) {
    return new Promise((resolve, reject) => {
        console.log("I am in here.")
        req.params.app_user_id = app_user_id
        var options = {
            method: 'POST',
            url: `https://api.1up.health/user-management/v1/user/auth-code?client_id=${client_id}&client_secret=${client_secret}&app_user_id=${app_user_id}`
        };
        request(options, async function (error, response0, body) {
            // console.log("680==========>", error, response, body)
            if (error) {
                console.log({ status: false, error })
            }
            else {
                let data = JSON.stringify(response0)
                let newData = await JSON.parse(data)
                // console.log("I am here 12 .>>>>>", newData.body)
                let someData = await JSON.parse(newData.body)
                // console.log("I am here ", someData)
                if (someData.status == "ERROR") {
                    console.log({ responseCode: 500, responseMessage: someData.reason })
                }
                else {
                    // console.log(someData)
                    var options1 = {
                        method: 'POST',
                        url: `https://api.1up.health/fhir/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&code=${someData.code}&grant_type=authorization_code`
                    };
                    request(options1, async function (tokenError, response1, body1) {
                        if (tokenError) {
                            console.log({ status: false, tokenError })
                        }
                        else {
                            let tokenData = await JSON.stringify(response1)
                            let newData1 = await JSON.parse(tokenData)
                            // console.log("I am here 12 .>>>>>", newData1.body)
                            let someData1 = await JSON.parse(newData1.body)
                            // console.log("I am here ", someData1)
                            if (someData1.status == "ERROR") {
                                console.log({ responseCode: 500, responseMessage: someData.reason })
                            }
                            else {
                                resolve(someData1.access_token)
                            }
                        }
                    })
                }
            }
        });
    })
}

function uploadImage(req) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(req, (uploadErr, uploadRes) => {
            if (uploadErr) {
                console.log(uploadErr)
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                resolve(uploadRes)
            }
        })
    })
}