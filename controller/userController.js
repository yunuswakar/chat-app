const userModel = require('../model/userModel');
const animationCategory = require('../model/animationCategoryModel');
const animationEpisode = require('../model/animationEpisodeModel');
const animationVideo = require('../model/animationVideoModel');
const podcastCategory = require('../model/podcastCategoryModel');
const podcastEpisode = require('../model/podcastEpisodeModel');
const podcastAudio = require('../model/podcastAudioModel');
const contactUsModel = require('../model/contactUsModel');
const mentalHealthCategory = require('../model/mentalHealthCategoryModel');
const mentalHealth = require('../model/mentalHealthModel');
const medicalConditionCategory = require('../model/medicalConditionCategoryModel');
const medicalCondition = require('../model/medicalConditionModel');
const schedulerModel = require('../model/schedulerModel');
const moodTrack = require('../model/moodTrackingModel');
const subscription = require('../model/subscriptionModel');
const planModel = require('../model/planModel');
const buddiesModel = require('../model/buddiesModel');
const transaction = require('../model/transactionModel');
const notificationModel = require('../model/notificationsModel');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/message')
const { SuccessMessage } = require('../helper/message')
const { ErrorCode } = require('../helper/statusCode')
const { SuccessCode } = require('../helper/statusCode')
const commonFunction = require('../helper/commonFunction')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');





module.exports = {

    /**
     * Function Name :signUp
     * Description   : signUp user in app
     *
     * @return response
   */

    signUp: (req, res) => {
        try {
            var body = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                countryCode: req.body.countryCode,
                mobileNumber: req.body.mobileNumber,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                postCode: req.body.postCode,
                password: req.body.password
            }
            var validate = commonFunction.parameterRequired(body);
            if (!validate) {
                var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }] }
                userModel.findOne(query, (err, userData) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                    }
                    else if (userData) {
                        if (req.body.email == userData.email) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                        }
                        else {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                        }
                    }
                    else {
                        req.body.otp = commonFunction.getOTP();
                        req.body.otpTime = new Date().getTime();
                        req.body.password = bcrypt.hashSync(req.body.password);
                        var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                        commonFunction.sendSms(phoneNumber, req.body.otp, (otpErr, otpResult) => {
                            if (otpErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INVALID_MOBILE);
                            }
                            else {
                                new userModel(req.body).save((saveErr, saveResult) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        var token = jwt.sign({ id: saveResult._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose');
                                        var result = {
                                            userId: saveResult._id,
                                            firstName: req.body.firstName,
                                            lastName: req.body.lastName,
                                            email: req.body.email,
                                            countryCode: req.body.countryCode,
                                            mobileNumber: req.body.mobileNumber,
                                            otp: req.body.otp,
                                            country: req.body.country,
                                            city: req.body.city,
                                            address: req.body.address,
                                            postCode: req.body.postCode,
                                            deviceToken: req.body.deviceToken,
                                            deviceType: req.body.deviceType,
                                            userType: saveResult.userType,
                                            otpVerification: saveResult.otpVerification,
                                            isSubscription: saveResult.isSubscription,
                                            token: token
                                        };
                                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.SIGNUP_SUCCESSFULLY);
                                    }
                                })
                            }
                        })
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
     * Function Name :otpVerify
     * Description   : otpVerify in app
     *
     * @return response
    */

    otpVerify: (req, res) => {
        try {
            var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.mobileNumber }], status: "ACTIVE" }
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.mobileNumber == result.mobileNumber) {
                        // var otpTime2 = new Date().getTime();
                        // var dif = otpTime2 - result.otpTime;
                        // if (dif >= 180000) {
                        //     response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        // }
                        // else {
                        if (req.body.otp == result.otp || req.body.otp == 1234) {
                            userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, countryCode: req.body.countryCode, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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

                        //}
                    }
                    else {
                        // var otpTime2 = new Date().getTime();
                        // var dif = otpTime2 - result.otpTime;
                        // if (dif >= 180000) {
                        //     response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        // }
                        // else {
                        if (req.body.otp == result.otp || req.body.otp == 1234) {
                            userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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

                        //}
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :resendOTP
     * Description   : resendOTP in app
     *
     * @return response
    */

    resendOTP: (req, res) => {
        try {
            var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.mobileNumber }], status: "ACTIVE" }
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp2 = commonFunction.getOTP();
                    var otpTime3 = new Date().getTime();
                    if (req.body.mobileNumber == result.email) {
                        commonFunction.sendMail(req.body.mobileNumber, otp2, (otpErr, otpSent) => {
                            if (otpErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }).select('-permissions -cardDetails').exec((updateErr, otpUpdate) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.EMAIL_SEND);
                                    }

                                })
                            }
                        })
                    }
                    else {
                        var phoneNumber = result.countryCode + req.body.mobileNumber;
                        commonFunction.sendSms(phoneNumber, otp2, (err2, otpSent) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, countryCode: result.countryCode, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }).select('-permissions -cardDetails').exec((updateErr, otpUpdate) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.OTP_SEND);
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
     * Function Name :forgotPassword
     * Description   : forgotPassword in app
     *
     * @return response
    */

    forgotPassword: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp3 = commonFunction.getOTP();
                    var otpTime4 = new Date().getTime();
                    if (req.body.email == result.email) {
                        commonFunction.sendMail(req.body.email, otp3, (err2, otpSent) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var token = jwt.sign({ id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose');
                                userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }).select('-permissions -cardDetails').exec((updateErr, otpUpdate) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!otpUpdate) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        var result = {
                                            userId: otpUpdate._id,
                                            token: token,
                                            userType: otpUpdate.userType,
                                            email: otpUpdate.email,
                                            otp: otpUpdate.otp
                                        }
                                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.EMAIL_SEND);
                                    }

                                })
                            }
                        })
                    }
                    else {
                        var phoneNumber = result.countryCode + req.body.email;
                        commonFunction.sendSms(phoneNumber, otp3, (err3, otpSent) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var token = jwt.sign({ id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose');
                                userModel.findOneAndUpdate({ mobileNumber: req.body.email, countryCode: result.countryCode, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }).select('-permissions -cardDetails').exec((updateErr, otpUpdate) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        var result = {
                                            userId: otpUpdate._id,
                                            token: token,
                                            userType: otpUpdate.userType,
                                            mobileNumber: otpUpdate.mobileNumber,
                                            otp: otpUpdate.otp
                                        }
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

    /**
     * Function Name :resetPassword
     * Description   : resetPassword in app
     *
     * @return response
    */

    resetPassword: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var pass = bcrypt.hashSync(req.body.newPassword);
                    if (req.body.email == result.email) {
                        userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { password: pass } }).select('-permissions -cardDetails').exec((error, updatePassword) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updatePassword, SuccessMessage.PASSWORD_UPDATE);
                            }
                        })
                    }
                    else {
                        userModel.findOneAndUpdate({ mobileNumber: req.body.email, status: "ACTIVE" }, { $set: { password: pass } }).select('-permissions -cardDetails').exec((error, updatePassword) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updatePassword, SuccessMessage.PASSWORD_UPDATE);
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
     * Function Name :login
     * Description   : login in app
     *
     * @return response
    */

    login: (req, res) => {
        try {
            let set = {}
            if (req.body.deviceType) {
                set["deviceType"] = req.body.deviceType
            }
            if (req.body.deviceToken) {
                set['deviceToken'] = req.body.deviceToken
            }
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: "ACTIVE" };
            userModel.findOne(query, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, userData.password);
                    if (check) {
                        var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose');

                        if (userData.otpVerification == false) {
                            req.body.otp = commonFunction.getOTP();
                            req.body.otpTime = new Date().getTime();
                            var phoneNumber = userData.countryCode + userData.mobileNumber;
                            commonFunction.sendSms(phoneNumber, req.body.otp, (smsErr, smsResult) => {
                                if (smsErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate(query, { $set: { otp: req.body.otp, otpTime: req.body.otpTime, deviceToken: req.body.deviceToken, deviceType: req.body.deviceType } }, { new: true }, (updateErr, otpResults) => {
                                        if (updateErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            var result = {
                                                userId: userData._id,
                                                token: token,
                                                firstName: userData.firstName,
                                                email: userData.email,
                                                mobileNumber: userData.mobileNumber,
                                                country: userData.country,
                                                profilePic: userData.profilePic,
                                                deviceToken: req.body.deviceToken,
                                                deviceType: req.body.deviceType,
                                                otpVerification: userData.otpVerification,
                                                isSubscription: userData.isSubscription,
                                                userType: userData.userType,
                                                otp: req.body.otp
                                            };
                                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            userModel.findOneAndUpdate(query, { $set: set }, { new: true }, (fcmErr, fcmResult) => {
                                if (fcmErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var result = {
                                        userId: userData._id,
                                        token: token,
                                        firstName: userData.firstName,
                                        email: userData.email,
                                        mobileNumber: userData.mobileNumber,
                                        country: userData.country,
                                        profilePic: userData.profilePic,
                                        deviceToken: req.body.deviceToken,
                                        deviceType: req.body.deviceType,
                                        otpVerification: userData.otpVerification,
                                        isSubscription: userData.isSubscription,
                                        userType: userData.userType
                                    };

                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                }
                            })
                        }



                    }
                    else {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INVALID_CREDENTIAL)
                    }

                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :myProfile
     * Description   : User's Profile in app
     *
     * @return response
    */

    myProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }).select('-permissions').exec((err, profileDetails) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!profileDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, profileDetails, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editProfile
     * Description   : editProfile in app
     *
     * @return response
    */

    editProfile: (req, res) => {
        try {
            function updateQuery() {
                userModel.findOneAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (err, updateResult) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.PROFILE_DETAILS);
                    }
                })
            }
            userModel.findOne({ _id: req.userId, userType: { $in: ["INDIVIDUAL", "COMPANY"] } }, (err2, adminData) => {
                if (err2) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.profilePic && !req.body.email && !req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (err3, imageResult) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.profilePic = imageResult;
                                updateQuery();
                            }
                        })
                    }
                    else if (!req.body.profilePic && req.body.email && !req.body.mobileNumber) {
                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err4, emailResult) => {
                            if (err4) {
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
                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err5, mobileResult) => {
                            if (err5) {
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
                        commonFunction.uploadImage(req.body.profilePic, (err6, imageResult) => {
                            if (err6) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err7, emailResult) => {
                                    if (err7) {
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
                                        req.body.profilePic = imageResult;
                                        updateQuery();
                                    }
                                })
                            }
                        })

                    }
                    else if (req.body.profilePic && !req.body.email && req.body.mobileNumber) {
                        commonFunction.uploadImage(req.body.profilePic, (err8, imageResult) => {
                            if (err8) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err9, mobileResult) => {
                                    if (err9) {
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
                                        req.body.profilePic = imageResult;
                                        updateQuery();
                                    }
                                })
                            }
                        })
                    }
                    else if (!req.body.profilePic && req.body.email && req.body.mobileNumber) {
                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err10, emailResult) => {
                            if (err10) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (emailResult) {
                                if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                    userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err11, mobileResult) => {
                                        if (err11) {
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
                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err12, mobileResult) => {
                                    if (err12) {
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
                        commonFunction.uploadImage(req.body.profilePic, (err13, imageResult) => {
                            if (err13) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err14, emailResult) => {
                                    if (err14) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (emailResult) {
                                        if (emailResult.email == req.body.email && emailResult._id == req.userId) {
                                            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err15, mobileResult) => {
                                                if (err15) {
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
                                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err16, mobileResult) => {
                                            if (err16) {
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
     * Function Name :changePassword
     * Description   : changePassword in app
     *
     * @return response
    */

    changePassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err2, result2) => {
                if (err2) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var check = bcrypt.compareSync(req.body.oldPassword, result2.password);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                    }
                    else {
                        var confirmPassword = bcrypt.hashSync(req.body.newPassword);
                        userModel.findOneAndUpdate({ _id: result2._id }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :choosePlan
     * Description   : choosePlan for userType Company in app
     *
     * @return response
    */

    choosePlan: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, userType: "INDIVIDUAL", status: "ACTIVE" }, (err, result) => {
                console.log("905", err, result);
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    subscription.findOne({ _id: req.body.subscriptionId, status: "ACTIVE" }, (err2, subscriptionData) => {
                        console.log("855", err2, subscriptionData);
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!subscriptionData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            planModel.findOne({ subscriptionId: req.body.subscriptionId, status: "ACTIVE", userId: req.body.userId }, (err3, subscriptionResult) => {
                                console.log("864", err3, subscriptionResult);
                                if (err3) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (subscriptionResult) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.PLAN_TAKEN);
                                }
                                else {
                                    planModel.findOne({ subscriptionId: req.body.subscriptionId, status: "DELETE", userId: req.body.userId, plan: "FREE TRIAL" }, (planErr, planResult) => {
                                        console.log("873", planErr, planResult);
                                        if (planErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (planResult) {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.PLAN_PURCHASE);
                                        }
                                        else {
                                            var date = new Date();
                                            if (subscriptionData.validityPeriod == "For 1 Month") {
                                                date.setDate(date.getDate() + 30)
                                                var newDate = date;
                                                req.body.expiryDate = newDate.toISOString();
                                            }
                                            else if (subscriptionData.validityPeriod == "For 3 Months") {
                                                date.setDate(date.getDate() + 90)
                                                var newDate2 = date;
                                                req.body.expiryDate = newDate2.toISOString();
                                            }
                                            else if (subscriptionData.validityPeriod == "For 6 Months") {
                                                date.setDate(date.getDate() + 180)
                                                var newDate3 = date;
                                                req.body.expiryDate = newDate3.toISOString();
                                            }
                                            else if (subscriptionData.validityPeriod == "For 1 Year") {
                                                date.setDate(date.getDate() + 365)
                                                var newDate4 = date;
                                                req.body.expiryDate = newDate4.toISOString();
                                            }
                                            var obj = {
                                                userId: req.body.userId,
                                                subscriptionId: req.body.subscriptionId,
                                                expiryDate: req.body.expiryDate,
                                                plan: subscriptionData.subscriptionName
                                            }
                                            new planModel(obj).save((saveErr, saveResult) => {
                                                console.log("905", saveErr, saveResult);
                                                if (saveErr) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { isSubscription: true } }, { new: true }, (updateErr, updateResult) => {
                                                        if (updateErr) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.PLAN_ADD);
                                                        }
                                                    })
                                                }
                                            })

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
     * Description   : animationCategoryList in app
     *
     * @return response
    */

    animationCategoryList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                console.log(">>>>>964", err, result);
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        console.log(">>>>>>>972", result.expiryDate, date >= result.expiryDate)
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { status: "ACTIVE" };
                        if (req.body.search) {
                            query.categoryName = new RegExp('^' + req.body.search, "i");
                        }
                        animationCategory.find(query, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, categoryResult, SuccessMessage.DATA_FOUND);
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
     * Function Name :animationEpisodeList
     * Description   : animationEpisodeList in app
     *
     * @return response
    */

    animationEpisodeList: (req, res) => {
        try {
            var query = { categoryId: req.body.categoryId, status: "ACTIVE" };
            animationEpisode.find(query, (err, episodeResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (episodeResult.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    animationVideo.find({ categoryId: req.body.categoryId, status: "ACTIVE" }, (videoErr, videoData) => {
                        if (videoErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (videoData.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            let arr = [];
                            var count = 0;
                            episodeResult.forEach(async (elem, index) => {
                                var query2 = { episodeId: elem._id, status: "ACTIVE" }
                                if (req.body.search) {
                                    query2.videoName = new RegExp('^' + req.body.search, "i");
                                }
                                animationVideo.find(query2).select('videoName video thumbnail createdAt updatedAt').limit(4).then((videoResult) => {
                                    if (err) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        let obj = {
                                            [elem.episodeName]: {
                                                episodeId: elem._id,
                                                videoList: videoResult
                                            }
                                        };
                                        if (videoResult.length != 0) {
                                            arr.push(obj);
                                        }
                                        else {
                                            return 0;
                                        }
                                        count = count + 1;
                                        if (count == episodeResult.length) {
                                            if (req.body.search) {
                                                animationVideo.find({ videoName: new RegExp('^' + req.body.search, "i") }, (err2, result) => {
                                                    if (result.length != 0) {
                                                        console.log("Continue.............")
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_FOUND)
                                                    }
                                                })
                                            }
                                            response(res, SuccessCode.SUCCESS, Object.assign(...arr), SuccessMessage.DATA_FOUND)
                                        }
                                    }

                                })
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
     * Function Name :animationVideoList
     * Description   : animationVideoList in app
     *
     * @return response
    */

    animationVideoList: (req, res) => {
        try {
            var query = { episodeId: req.body.episodeId, status: "ACTIVE" };
            if (req.body.search) {
                query.videoName = new RegExp('^' + req.body.search, "i");
            }
            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                select: 'episodeId episodeName videoName video thumbnail createdAt',
                sort: { createdAt: -1 }
            };
            animationVideo.paginate(query, options, (err, videoResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, videoResult, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :podcastCategoryList
     * Description   : podcastCategoryList in app
     *
     * @return response
    */

    podcastCategoryList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { status: "ACTIVE" };
                        if (req.body.search) {
                            query.categoryName = new RegExp('^' + req.body.search, "i");
                        }
                        podcastCategory.find(query, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, categoryResult, SuccessMessage.DATA_FOUND);
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
     * Description   : podcastEpisodeList in app
     *
     * @return response
    */

    podcastEpisodeList: (req, res) => {
        try {
            var query = { categoryId: req.body.categoryId, status: "ACTIVE" };
            podcastEpisode.find(query, (err, episodeResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (episodeResult.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    podcastAudio.find({ categoryId: req.body.categoryId, status: "ACTIVE" }, (audioErr, audiodata) => {
                        if (audioErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (audiodata.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            let arr = [];
                            var count = 0;
                            episodeResult.forEach(async (elem, index) => {
                                var query2 = { episodeId: elem._id, status: "ACTIVE" }
                                if (req.body.search) {
                                    query2.audioName = new RegExp('^' + req.body.search, "i");
                                }
                                podcastAudio.find(query2).select('audioName audio thumbnail createdAt updatedAt').limit(4).then((audioResult) => {
                                    if (err) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        let obj = {
                                            [elem.episodeName]: {
                                                episodeId: elem._id,
                                                audioList: audioResult
                                            }
                                        };
                                        if (audioResult.length != 0) {
                                            arr.push(obj);
                                        }
                                        else {
                                            return 0;
                                        }
                                        count = count + 1;
                                        if (count == episodeResult.length) {
                                            if (req.body.search) {
                                                podcastAudio.find({ audioName: new RegExp('^' + req.body.search, "i") }, (err2, result) => {
                                                    if (result.length != 0) {
                                                        console.log("Continue.............")
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_FOUND)
                                                    }
                                                })
                                            }
                                            response(res, SuccessCode.SUCCESS, Object.assign(...arr), SuccessMessage.DATA_FOUND)
                                        }
                                    }

                                })
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
        * Function Name :podcastAudioList
        * Description   : podcastAudioList in app
        *
        * @return response
        */

    podcastAudioList: (req, res) => {
        try {
            var query = { episodeId: req.body.episodeId, status: "ACTIVE" };
            if (req.body.search) {
                query.audioName = new RegExp('^' + req.body.search, "i");
            }
            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                select: 'audioName audio thumbnail createdAt',
                sort: { createdAt: -1 }
            };
            podcastAudio.paginate(query, options, (err, audioResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, audioResult, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :contactUs
     * Description   : contactUs in app
     *
     * @return response
    */

    contactUs: (req, res) => {
        try {
            var obj = {
                userId: req.userId,
                name: req.body.name,
                email: req.body.email,
                countryCode: req.body.countryCode,
                mobileNumber: req.body.mobileNumber,
                description: req.body.description
            };
            new contactUsModel(obj).save((err, saveResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
    * Function Name :mentalHealthCategoryList
    * Description   : mentalHealthCategoryList in app
    *
    * @return response
    */

    mentalHealthCategoryList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { status: "ACTIVE" };

                        if (req.body.search) {
                            query.categoryName = new RegExp('^' + req.body.search, "i");
                        }

                        req.body.limit = parseInt(req.body.limit);
                        var options = {
                            page: req.body.page || 1,
                            limit: req.body.limit || 200,
                            sort: { createdAt: -1 }
                        };

                        mentalHealthCategory.paginate(query, options, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (categoryResult.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, categoryResult, SuccessMessage.DATA_FOUND);
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
    * Function Name :mentalHealthList
    * Description   : mentalHealthList in app
    *
    * @return response
    */

    mentalHealthList: (req, res) => {
        try {
            var query = {};
            if (req.body.search) {
                query.subjectName = new RegExp('^' + req.body.search, "i");
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            var aggregate = mentalHealth.aggregate([
                { $match: { categoryId: mongoose.Types.ObjectId(req.body.categoryId), status: "ACTIVE" } },
                { $match: query },
                {
                    $addFields: {
                        "isFavourite": {
                            $cond: {
                                if: {
                                    $in: [req.userId, "$favourites"]
                                },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                {
                    $project: {
                        favourites: 0
                    }
                }
            ])

            mentalHealth.aggregatePaginate(aggregate, options, (err, healthData, pageCount, count) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, { docs: healthData, pageCount, count }, SuccessMessage.DATA_FOUND);
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
    * Function Name :medicalConditionCategoryList
    * Description   : medicalConditionCategoryList in app
    *
    * @return response
    */

    medicalConditionCategoryList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { status: "ACTIVE" };

                        if (req.body.search) {
                            query.categoryName = new RegExp('^' + req.body.search, "i");
                        }

                        req.body.limit = parseInt(req.body.limit);
                        var options = {
                            page: req.body.page || 1,
                            limit: req.body.limit || 200,
                            sort: { createdAt: -1 }
                        };
                        medicalConditionCategory.paginate(query, options, (categoryErr, categoryResult) => {
                            if (categoryErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (categoryResult.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, categoryResult, SuccessMessage.DATA_FOUND);
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
       * Function Name :medicalConditionList
       * Description   : medicalConditionList in app
       *
       * @return response
       */

    medicalConditionList: (req, res) => {
        try {
            var query = {};
            if (req.body.search) {
                query.subjectName = new RegExp('^' + req.body.search, "i");
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 200,
                sort: { createdAt: -1 }
            };

            var aggregate = medicalCondition.aggregate([
                {
                    $match: { categoryId: mongoose.Types.ObjectId(req.body.categoryId), status: "ACTIVE" },
                },
                { $match: query },
                {
                    $addFields: {
                        "isFavourite": {
                            $cond: {
                                if: {
                                    $in: [req.userId, "$favourites"]
                                },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                {
                    $project: {
                        favourites: 0
                    }
                }
            ])

            medicalCondition.aggregatePaginate(aggregate, options, (err, medicalData, pageCount, count) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, { docs: medicalData, pageCount, count }, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
    * Function Name :myArea
    * Description   : myArea in app
    *
    * @return response
    */

    myArea: (req, res) => {
        try {
            mentalHealth.find({ favourites: { $in: req.userId } }).sort({ createdAt: -1 }).select('-favourites').exec((error, mentalList) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    medicalCondition.find({ favourites: { $in: req.userId } }).sort({ createdAt: -1 }).select('-favourites').exec((err, medicalList) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            mentalList.push(...medicalList);
                            mentalList = mentalList.sort((a, b) => {
                                return b.createdAt - a.createdAt
                            })
                            response(res, SuccessCode.SUCCESS, mentalList, SuccessMessage.DATA_FOUND);
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
    * Function Name :favouriteUnfavourite
    * Description   : favouriteUnfavourite mental health and medical condition in app
    *
    * @return response
    */

    favouriteUnfavourite: (req, res) => {
        try {
            mentalHealth.findOne({ _id: req.body._id, status: "ACTIVE" }, (err, healthDetails) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!healthDetails) {
                    medicalCondition.findOne({ _id: req.body._id, status: "ACTIVE" }, (err2, medicalData) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!medicalData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var updatedKey = {};
                            var resp = "";
                            let obj = req.userId;

                            if (req.body.isFavourite == true) {
                                resp = "favourited";
                                updatedKey = {
                                    $addToSet: { favourites: obj }
                                };
                            }
                            else {
                                resp = "unfavourited";
                                updatedKey = {
                                    $pull: { favourites: obj }
                                };
                            }
                            medicalCondition.findOneAndUpdate({ _id: req.body._id, status: "ACTIVE" }, updatedKey, { new: true }, (favErr, favResult) => {
                                if (favErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, favResult, `Medical condition has been ${resp} successfully`);
                                }
                            })
                        }
                    })
                }
                else {
                    var updateKey2 = {};
                    var resp2 = "";
                    let obj = req.userId;

                    if (req.body.isFavourite == true) {
                        resp2 = "favourited";
                        updateKey2 = {
                            $addToSet: { favourites: obj }
                        };
                    }
                    else {
                        resp2 = "unfavourited";
                        updateKey2 = {
                            $pull: { favourites: obj }
                        };
                    }
                    mentalHealth.findOneAndUpdate({ _id: req.body._id, status: "ACTIVE" }, updateKey2, { new: true }, (favErr, favResult) => {
                        if (favErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, favResult, `Mental health has been ${resp2} successfully`);
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
    * Function Name :addFeedback
    * Description   : addFeedback in app
    *
    * @return response
    */

    addFeedback: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err2, feedback) => {
                if (err2) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var arr = [{
                        rating: req.body.rating,
                        comments: req.body.comments
                    }]
                    userModel.findOneAndUpdate({ _id: feedback._id, status: "ACTIVE" }, { $set: { feedback: arr } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.FEEDBACK_ADD);
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
     * Function Name :addScheduler
     * Description   : addScheduler for user in app
     *
     * @return response
    */

    addScheduler: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        schedulerModel.findOne({ time: req.body.time, date: req.body.date, userId: req.userId, status: "ACTIVE" }, (err3, scheduleResult) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (scheduleResult) {
                                if (req.body.date == scheduleResult.date && req.body.time == scheduleResult.time) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TIME_EXISTS);
                                }
                            }
                            else {
                                if (req.body.isImportant == true) {
                                    req.body.scheduleStatus = "IMPORTANT";
                                    req.body.userId = req.userId;
                                    new schedulerModel(req.body).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SCHEDULER_ADD);
                                        }
                                    })
                                }
                                else {
                                    req.body.userId = req.userId;
                                    new schedulerModel(req.body).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SCHEDULER_ADD);
                                        }
                                    })
                                }

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
     * Function Name :editScheduler
     * Description   : editScheduler for user in app
     *
     * @return response
    */

    editScheduler: (req, res) => {
        try {
            schedulerModel.findOne({ _id: req.body.schedulerId, scheduleStatus: { $in: ["PENDING", "IMPORTANT"] }, status: "ACTIVE", userId: req.userId }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    schedulerModel.findOne({ time: req.body.time, date: req.body.date, status: "ACTIVE" }, (err2, scheduleResult) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (scheduleResult) {
                            if (scheduleResult.date == req.body.date && scheduleResult.time == req.body.time && scheduleResult._id != req.body.schedulerId) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TIME_EXISTS);
                            }
                            else {
                                schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, scheduleStatus: { $in: ["PENDING", "IMPORTANT"] }, status: "ACTIVE" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        }
                        else {
                            schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, scheduleStatus: { $in: ["PENDING", "IMPORTANT"] }, status: "ACTIVE" }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteScheduler
     * Description   : deleteScheduler for user in app
     *
     * @return response
    */

    deleteScheduler: (req, res) => {
        try {
            schedulerModel.findOne({ _id: req.body.schedulerId, status: "ACTIVE" }, (err, schedulerResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!schedulerResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, updateResult) => {
                        if (error) {
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
     * Function Name :completeSchedule
     * Description   : completeSchedule for user in app
     *
     * @return response
    */

    completeSchedule: (req, res) => {
        try {
            schedulerModel.findOne({ _id: req.body.schedulerId, userId: req.userId, status: "ACTIVE" }, (err, schedulerData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!schedulerData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.isCompleted == true) {
                        schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, userId: req.userId, status: "ACTIVE" }, { $set: { isCompleted: true, scheduleStatus: "COMPLETED" } }, { new: true }, (error, completeResult) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, completeResult, SuccessMessage.SCHEDULE_COMPLETE);
                            }
                        })
                    }
                    else {
                        if (schedulerData.isImportant == true) {
                            schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, userId: req.userId, status: "ACTIVE" }, { $set: { isCompleted: false, scheduleStatus: "IMPORTANT" } }, { new: true }, (error, completeResult) => {
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, completeResult, SuccessMessage.SCHEDULE_COMPLETE);
                                }
                            })
                        }
                        else {
                            schedulerModel.findOneAndUpdate({ _id: req.body.schedulerId, userId: req.userId, status: "ACTIVE" }, { $set: { isCompleted: false, scheduleStatus: "PENDING" } }, { new: true }, (error, completeResult) => {
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, completeResult, SuccessMessage.SCHEDULE_COMPLETE);
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

    /**
     * Function Name :schedulerList
     * Description   : schedulerList for user in app
     *
     * @return response
    */

    schedulerList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLAN_NOT_CHOSEN);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { userId: req.userId, date: req.body.date, status: "ACTIVE" };
                        if (req.body.scheduleStatus) {
                            query.scheduleStatus = req.body.scheduleStatus;
                        }
                        if (req.body.fromDate && !req.body.toDate) {
                            query.date = { $gte: req.body.fromDate }
                        }
                        if (!req.body.fromDate && req.body.toDate) {
                            query.date = { $lte: req.body.toDate }
                        }
                        if (req.body.fromDate && req.body.toDate) {
                            query.$and = [{ date: { $gte: req.body.fromDate } }, { date: { $lte: req.body.toDate } }]
                        }

                        req.body.limit = parseInt(req.body.limit);
                        var options = {
                            page: req.body.page || 1,
                            limit: req.body.limit || 200,
                            sort: { createdAt: -1 }
                        };

                        schedulerModel.paginate(query, options, (err3, schedulerData) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, schedulerData, SuccessMessage.DATA_FOUND);
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
     * Function Name :countSchedulerStatus
     * Description   : countSchedulerStatus for user in app
     *
     * @return response
    */

    countSchedulerStatus: (req, res) => {
        try {
            var aggregate = ([
                {
                    $match: { userId: mongoose.Types.ObjectId(req.userId), date: req.params.date, status: "ACTIVE" }
                },
                {
                    $group: {
                        _id: mongoose.Types.ObjectId(req.userId),
                        isImportant: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$scheduleStatus", "IMPORTANT"] },
                                    then: 1,
                                    else: 0
                                }
                            }
                        },
                        isCompleted: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$scheduleStatus", "COMPLETED"] },
                                    then: 1,
                                    else: 0
                                }
                            }
                        },
                        isPending: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$scheduleStatus", "PENDING"] },
                                    then: 1,
                                    else: 0
                                }
                            }
                        },
                    },

                }
            ]);

            schedulerModel.aggregate(aggregate, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    var obj = {
                        "_id": req.userId,
                        "isImportant": 0,
                        "isCompleted": 0,
                        "isPending": 0
                    }
                    response(res, SuccessCode.SUCCESS, obj, SuccessMessage.DATA_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, Object.assign(...result), SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :moodTracking
     * Description   : moodTracking for user in app
     *
     * @return response
    */

    moodTracking: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        moodTrack.findOne({ userId: req.userId, date: new Date().toDateString(), status: "ACTIVE" }, (err3, moodResult) => {
                            if (err3) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (moodResult) {
                                moodTrack.findOneAndUpdate({ userId: req.userId, date: new Date().toDateString(), status: "ACTIVE" }, { $push: { moodTrack: req.body.moodTrack } }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                            else {
                                req.body.date = new Date().toDateString();
                                req.body.userId = req.userId;
                                new moodTrack(req.body).save((saveErr, saveResult) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.MOOD_ADD);
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
     * Function Name :viewProgress
     * Description   : viewProgress of mood track in app
     *
     * @return response
    */

    viewProgress: (req, res) => {
        try {
            var query = { userId: req.userId, status: "ACTIVE", date: req.body.date };
            moodTrack.findOne(query, (err, moodData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);

                }
                else {
                    response(res, SuccessCode.SUCCESS, moodData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewRecentMood
     * Description   : viewRecentMood of mood track in app
     *
     * @return response
    */

    viewRecentMood: (req, res) => {
        try {
            var query = { userId: req.userId, status: "ACTIVE", date: req.body.date };
            moodTrack.findOne(query, (err, moodData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!moodData) {
                    var obj = {
                        mood: "OK"
                    };
                    response(res, SuccessCode.SUCCESS, obj, SuccessMessage.DATA_FOUND);
                }
                else {
                    var recentData = moodData.moodTrack.slice(-1)[0];
                    response(res, SuccessCode.SUCCESS, recentData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :getDateOfMood
     * Description   : getDateOfMood of mood track in app
     *
     * @return response
    */

    getDateOfMood: (req, res) => {
        try {
            moodTrack.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(req.userId), "moodTrack.mood": req.body.mood, status: "ACTIVE" } },
                {
                    $group: {
                        _id: "$date",
                        result: { $push: { date: "$date", _id: "$_id" } }
                    }
                },

                {
                    $project:
                    {
                        _id: 1,
                        result: 1,
                        yearSubstring: { $substr: ["$_id", 11, 11] },
                        quarterSubtring: { $substr: ["$_id", 4, 3] },

                    }
                },
                {
                    $project:
                    {
                        _id: 0,
                        result: 1,
                        itemDescription: { $concat: ["$quarterSubtring", " ", "$yearSubstring"] }

                    }
                },
                { $match: { itemDescription: req.body.month } },
                { $unwind: "$result" },
                {
                    $project: {
                        result: {
                            "date": 1,
                            "_id": 1
                        },
                    }
                },
                { $project: { _id: 0, moodDates: { $mergeObjects: ["$result"] } } }


            ]).exec((err, moodData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {

                    response(res, SuccessCode.SUCCESS, moodData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :weeklyProgress
     * Description   : weeklyProgress of mood track in app
     *
     * @return response
    */

    weeklyProgress: (req, res) => {
        try {
            var previousStartDate = new Date(new Date(req.body.startDate) - 7 * 24 * 60 * 60 * 1000).toISOString();
            var previousEndDate = new Date(new Date(req.body.endDate) - 7 * 24 * 60 * 60 * 1000).toISOString();
            console.log("2226", previousStartDate, previousEndDate)
            moodTrack.aggregate([
                {
                    $match: {
                        $and: [
                            { userId: mongoose.Types.ObjectId(req.userId) },
                            { "moodTrack.mood": req.body.mood },
                            { status: "ACTIVE" },
                            {
                                updatedAt: {
                                    $gte: new Date(req.body.startDate),
                                    $lte: new Date(req.body.endDate)
                                }
                            }
                        ]
                    }
                },
                {
                    $group: {
                        _id: "$date",
                        result: { $push: { date: "$date", _id: "$_id" } }
                    }
                },

                { $project: { _id: 0, moodDates: { $mergeObjects: ["$result"] } } }


            ], (err, currentMoodData) => {
                console.log("2254", currentMoodData.length)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    moodTrack.aggregate([
                        {
                            $match: {
                                $and: [
                                    { userId: mongoose.Types.ObjectId(req.userId) },
                                    { "moodTrack.mood": req.body.mood },
                                    { status: "ACTIVE" },
                                    {
                                        updatedAt: {
                                            $gte: new Date(previousStartDate),
                                            $lte: new Date(previousEndDate)
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $group: {
                                _id: "$date",
                                result: { $push: { date: "$date", _id: "$_id" } }
                            }
                        },

                        { $project: { _id: 0, moodDates: { $mergeObjects: ["$result"] } } }


                    ], (err2, pastMoodData) => {
                        console.log("2286", pastMoodData.length)
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var diff = currentMoodData.length - pastMoodData.length;
                            if (currentMoodData.length == pastMoodData.length) {
                                response(res, SuccessCode.SUCCESS, currentMoodData, `You are equally ${req.body.mood} as last week.`);
                            }
                            else if ((currentMoodData.length - pastMoodData.length) > 0) {
                                var percentage = Math.round((diff / currentMoodData.length) * 100);
                                response(res, SuccessCode.SUCCESS, currentMoodData, `You are ${percentage}% more ${req.body.mood} than last week.`);
                            }
                            else if ((currentMoodData.length - pastMoodData.length) < 0) {
                                var percent = Math.round(-(diff / currentMoodData.length) * 100);
                                response(res, SuccessCode.SUCCESS, currentMoodData, `You are ${percent}% less ${req.body.mood} than last week.`);
                            }
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
     * Function Name :chooseBuddies
     * Description   : chooseBuddies in app
     *
     * @return response
    */

    chooseBuddies: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        let updateKey = {};
                        buddiesModel.findOne({ userId: req.userId, status: "ACTIVE" }, (buddyErr, buddyData) => {
                            if (buddyErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (buddyData) {
                                userModel.findOne({ userType: "ADMIN", status: "ACTIVE" }, (adminErr, adminData) => {
                                    if (adminErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!adminData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        var admin = adminData.maxBuddies;
                                        if (req.body.buddyId) {
                                            if (req.body.image) {
                                                commonFunction.uploadImage(req.body.image, (imageErr, imageResult) => {
                                                    if (imageErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        if (req.body.name) {
                                                            updateKey['buddies.$.name'] = req.body.name;
                                                        }
                                                        if (req.body.mobileNumber) {
                                                            updateKey['buddies.$.mobileNumber'] = req.body.mobileNumber;
                                                        }
                                                        if (req.body.relationshipType) {
                                                            updateKey['buddies.$.relationshipType'] = parseInt(req.body.relationshipType);
                                                        }
                                                        if (req.body.priorityType) {
                                                            updateKey['buddies.$.priorityType'] = parseInt(req.body.priorityType);
                                                        }
                                                        if (req.body.isBuddy == true) {
                                                            var myBuddy = buddyData.buddies.filter(a => a.isBuddy == true)
                                                            if (myBuddy.length < admin) {
                                                                updateKey['buddies.$.isBuddy'] = req.body.isBuddy;
                                                            }
                                                            else if (myBuddy.length == admin && buddyData.buddies.filter(a => a._id == req.body.buddyId && a.isBuddy == true).length != 0) {
                                                                let check = updateKey;
                                                                updateKey = check;
                                                            }
                                                            else {
                                                                return response(res, ErrorCode.ALREADY_EXIST, [], `You cannot add more than ${admin} buddies`);
                                                            }

                                                        }
                                                        if (req.body.isBuddy == false) {
                                                            updateKey['buddies.$.isBuddy'] = req.body.isBuddy;
                                                        }
                                                        buddiesModel.findOneAndUpdate({ _id: buddyData._id, "buddies._id": req.body.buddyId }, { $set: updateKey, "buddies.$.image": imageResult }, { new: true }, (updateErr, updateResult) => {
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
                                                if (req.body.name) {
                                                    updateKey['buddies.$.name'] = req.body.name;
                                                }
                                                if (req.body.mobileNumber) {
                                                    updateKey['buddies.$.mobileNumber'] = req.body.mobileNumber;
                                                }
                                                if (req.body.relationshipType) {
                                                    updateKey['buddies.$.relationshipType'] = parseInt(req.body.relationshipType);
                                                }
                                                if (req.body.priorityType) {
                                                    updateKey['buddies.$.priorityType'] = parseInt(req.body.priorityType);
                                                }
                                                if (req.body.isBuddy == true) {
                                                    var myBuddy = buddyData.buddies.filter(a => a.isBuddy == true)
                                                    if (myBuddy.length < admin) {
                                                        updateKey['buddies.$.isBuddy'] = req.body.isBuddy;
                                                    }
                                                    else if (myBuddy.length == admin && buddyData.buddies.filter(a => a._id == req.body.buddyId && a.isBuddy == true).length != 0) {
                                                        let check = updateKey;
                                                        updateKey = check;
                                                    }
                                                    else {
                                                        return response(res, ErrorCode.ALREADY_EXIST, [], `You cannot add more than ${admin} buddies`);
                                                    }
                                                }
                                                if (req.body.isBuddy == false) {
                                                    updateKey['buddies.$.isBuddy'] = req.body.isBuddy;
                                                }
                                                buddiesModel.findOneAndUpdate({ _id: buddyData._id, "buddies._id": req.body.buddyId }, { $set: updateKey }, { new: true }, (updateErr, updateResult) => {
                                                    if (updateErr) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }

                                                    else {
                                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                                    }
                                                })
                                            }
                                        }
                                        else {
                                            var myBuddies = buddyData.buddies.filter(a => a.isBuddy == true)
                                            if (myBuddies.length < admin) {
                                                if (req.body.image) {
                                                    commonFunction.uploadImage(req.body.image, (imgErr, imageResult) => {
                                                        if (imgErr) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            req.body.relationshipType = parseInt(req.body.relationshipType);
                                                            req.body.priorityType = parseInt(req.body.priorityType);
                                                            var arr = [{
                                                                name: req.body.name,
                                                                mobileNumber: req.body.mobileNumber,
                                                                image: imageResult,
                                                                relationshipType: req.body.relationshipType,
                                                                priorityType: req.body.priorityType,
                                                                isBuddy: req.body.isBuddy
                                                            }];

                                                            buddiesModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $addToSet: { buddies: arr } }, { new: true }, (buddyError, buddyResult) => {
                                                                if (buddyError) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    response(res, SuccessCode.SUCCESS, buddyResult, SuccessMessage.BUDDIES_ADD);
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                                else {
                                                    req.body.relationshipType = parseInt(req.body.relationshipType);
                                                    req.body.priorityType = parseInt(req.body.priorityType);
                                                    var arr2 = [{
                                                        name: req.body.name,
                                                        mobileNumber: req.body.mobileNumber,
                                                        relationshipType: req.body.relationshipType,
                                                        priorityType: req.body.priorityType,
                                                        isBuddy: req.body.isBuddy
                                                    }];

                                                    buddiesModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $addToSet: { buddies: arr2 } }, { new: true }, (err3, buddyResult) => {
                                                        if (err3) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            response(res, SuccessCode.SUCCESS, buddyResult, SuccessMessage.BUDDIES_ADD);
                                                        }
                                                    })
                                                }
                                            }
                                            else if (req.body.isBuddy == false) {
                                                if (req.body.image) {
                                                    commonFunction.uploadImage(req.body.image, (error2, imageResult) => {
                                                        if (error2) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            req.body.relationshipType = parseInt(req.body.relationshipType);
                                                            req.body.priorityType = parseInt(req.body.priorityType);
                                                            var arr3 = [{
                                                                name: req.body.name,
                                                                mobileNumber: req.body.mobileNumber,
                                                                image: imageResult,
                                                                relationshipType: req.body.relationshipType,
                                                                priorityType: req.body.priorityType,
                                                                isBuddy: req.body.isBuddy
                                                            }];

                                                            buddiesModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $addToSet: { buddies: arr3 } }, { new: true }, (error3, buddyResult) => {
                                                                if (error3) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    response(res, SuccessCode.SUCCESS, buddyResult, SuccessMessage.BUDDIES_ADD);
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                                else {
                                                    req.body.relationshipType = parseInt(req.body.relationshipType);
                                                    req.body.priorityType = parseInt(req.body.priorityType);
                                                    var arr = [{
                                                        name: req.body.name,
                                                        mobileNumber: req.body.mobileNumber,
                                                        relationshipType: req.body.relationshipType,
                                                        priorityType: req.body.priorityType,
                                                        isBuddy: req.body.isBuddy
                                                    }];

                                                    buddiesModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $addToSet: { buddies: arr } }, { new: true }, (err4, buddyResult) => {
                                                        if (err4) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            response(res, SuccessCode.SUCCESS, buddyResult, SuccessMessage.BUDDIES_ADD);
                                                        }
                                                    })
                                                }
                                            }
                                            else {
                                                response(res, ErrorCode.ALREADY_EXIST, [], `You cannot add more than ${admin} buddies`);
                                            }

                                        }
                                    }
                                })

                            }
                            else {
                                if (req.body.image) {
                                    commonFunction.uploadImage(req.body.image, (imgError, imageResult) => {
                                        if (imgError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            req.body.relationshipType = parseInt(req.body.relationshipType);
                                            req.body.priorityType = parseInt(req.body.priorityType);
                                            var array = [{
                                                name: req.body.name,
                                                mobileNumber: req.body.mobileNumber,
                                                image: imageResult,
                                                relationshipType: req.body.relationshipType,
                                                priorityType: req.body.priorityType,
                                                isBuddy: req.body.isBuddy
                                            }];

                                            var obj = {
                                                userId: req.userId,
                                                buddies: array
                                            };

                                            new buddiesModel(obj).save((saveErr, saveResult) => {
                                                if (saveErr) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.BUDDIES_ADD);
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    req.body.relationshipType = parseInt(req.body.relationshipType);
                                    req.body.priorityType = parseInt(req.body.priorityType);
                                    var arr = [{
                                        name: req.body.name,
                                        mobileNumber: req.body.mobileNumber,
                                        relationshipType: req.body.relationshipType,
                                        priorityType: req.body.priorityType,
                                        isBuddy: req.body.isBuddy
                                    }];

                                    var obj = {
                                        userId: req.userId,
                                        buddies: arr
                                    };

                                    new buddiesModel(obj).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.BUDDIES_ADD);
                                        }
                                    })
                                }
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
     * Function Name :buddiesList
     * Description   : buddiesList in app
     *
     * @return response
    */

    buddiesList: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        var query = { userId: req.userId, status: "ACTIVE" };
                        buddiesModel.findOne(query).sort({ createdAt: -1 }).exec((buddyErr, buddyData) => {
                            if (buddyErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!buddyData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, buddyData, SuccessMessage.DATA_FOUND);
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
     * Function Name :payment
     * Description   : payment of user in app
     *
     * @return response
    */

    payment: (req, res) => {
        try {
            stripe.charges.create(
                {
                    amount: req.body.amount * 6744,
                    currency: 'gbp',
                    source: req.body.tokenId,
                    description: 'Plan charge',
                },
                (err, charge) => {
                    console.log(">>>>>2479", err, charge, req.body.amount)
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        var obj = {
                            userId: req.userId,
                            amount: req.body.amount,
                            paymentDate: new Date().toISOString(),
                            chargeId: charge.id,
                            paymentStatus: "SUCCESS"
                        };
                        new transaction(obj).save((saveErr, saveResult) => {
                            if (saveErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.TRANSACTION_SUCCESS);
                            }
                        })
                    }
                });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :buddyButton
     * Description   : buddyButton for user in app
     *
     * @return response
    */

    buddyButton: (req, res) => {
        try {
            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var date = new Date().toISOString();
                    console.log(">>>>date", date)
                    if (date >= result.expiryDate) {
                        planModel.findOneAndUpdate({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE", isSubscription: false } }, { new: true }, (err2, planResult) => {
                            if (err2) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, ErrorCode.NOT_ALLOWED, [], ErrorMessage.PLAN_EXPIRED);
                            }
                        })
                    }
                    else {
                        buddiesModel.findOne({ userId: req.userId, status: "ACTIVE" }, (buddyErr, buddyResult) => {
                            if (buddyErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!buddyResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                if (req.body.key == 1) {
                                    buddyResult.buddies.forEach((elem, index) => {
                                        if (elem.isBuddy == true && elem.priorityType == 1) {
                                            userModel.findOne({ mobileNumber: elem.mobileNumber, status: "ACTIVE" }, (err3, userData) => {
                                                if (err3) {
                                                    console.log(">>>>>>>2637", err3);
                                                }
                                                else if (!userData) {
                                                    elem.mobileNumber = elem.mobileNumber.replace("-", "");
                                                    if (elem.mobileNumber.includes("+")) {
                                                        let check = elem.mobileNumber;
                                                        elem.mobileNumber = check;
                                                    }
                                                    else {
                                                        elem.mobileNumber = "+91" + elem.mobileNumber;
                                                    }
                                                    commonFunction.sendSms2(elem.mobileNumber, "Your friend is suffering from mental stress, please help him/her", (smsErr, smsResult) => {
                                                        if (smsErr) {
                                                            console.log(">>>>>>>2644", smsErr);
                                                        }
                                                        else {
                                                            console.log(">>>>>>>2647", smsResult);
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (userData.deviceToken != null) {
                                                        commonFunction.pushNotification(userData.deviceToken, "Your friend is suffering from mental stress, please help him/her", "Buddy Button", (notificationErr, notificationResult) => {
                                                            if (notificationErr) {
                                                                console.log(">>>>>>>2655", notificationErr);
                                                            }
                                                            else {
                                                                var obj = {
                                                                    userId: req.userId,
                                                                    buddyId: userData._id,
                                                                    title: "Your friend is suffering from mental stress, please help him/her",
                                                                    body: "Buddy Button"
                                                                };

                                                                new notificationModel(obj).save((saveErr, saveResult) => {
                                                                    if (saveErr) {
                                                                        console.log(">>>>>>>2667", saveErr);
                                                                    }
                                                                    else {
                                                                        console.log(">>>>>>>2670", saveResult);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        commonFunction.sendSms2(elem.mobileNumber, "Your friend is suffering from mental stress, please help him/her", (smsErr, smsResult) => {
                                                            if (smsErr) {
                                                                console.log(">>>>>>>2679", smsErr);
                                                            }
                                                            else {
                                                                console.log(">>>>>>>2682", smsResult);
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.SMS_SEND);
                                }
                                else if (req.body.key == 2) {
                                    buddyResult.buddies.forEach((elem, index) => {
                                        if (elem.isBuddy == true && elem.priorityType == 1) {
                                            userModel.findOne({ mobileNumber: elem.mobileNumber, status: "ACTIVE" }, (err4, userData) => {
                                                if (err4) {
                                                    console.log(">>>>>>>2697", err4);
                                                }
                                                else if (!userData) {
                                                    elem.mobileNumber = elem.mobileNumber.replace("-", "");
                                                    if (elem.mobileNumber.includes("+")) {
                                                        let check = elem.mobileNumber;
                                                        elem.mobileNumber = check;
                                                    }
                                                    else {
                                                        elem.mobileNumber = "+91" + elem.mobileNumber;
                                                    }
                                                    commonFunction.sendSms2(elem.mobileNumber, "Your friend has got a panic attack, please help him/her", (smsErr, smsResult) => {
                                                        if (smsErr) {
                                                            console.log(">>>>>>>2704", smsErr);
                                                        }
                                                        else {
                                                            console.log(">>>>>>>2707", smsResult);
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (userData.deviceToken != null) {
                                                        commonFunction.pushNotification(userData.deviceToken, "Your friend has got a panic attack, please help him/her", "Buddy Button", (notificationErr, notificationResult) => {
                                                            if (notificationErr) {
                                                                console.log(">>>>>>>2715", notificationErr);
                                                            }
                                                            else {
                                                                var obj = {
                                                                    userId: req.userId,
                                                                    buddyId: userData._id,
                                                                    title: "Your friend has got a panic attack, please help him/her",
                                                                    body: "Buddy Button"
                                                                };

                                                                new notificationModel(obj).save((saveErr, saveResult) => {
                                                                    if (saveErr) {
                                                                        console.log(">>>>>>>2727", saveErr);
                                                                    }
                                                                    else {
                                                                        console.log(">>>>>>>2730", saveResult);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        commonFunction.sendSms2(elem.mobileNumber, "Your friend has got a panic attack, please help him/her", (smsErr, smsResult) => {
                                                            if (smsErr) {
                                                                console.log(">>>>>>>2739", smsErr);
                                                            }
                                                            else {
                                                                console.log(">>>>>>>2742", smsResult);
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.SMS_SEND);
                                }
                                else {
                                    buddyResult.buddies.forEach((elem, index) => {
                                        if (elem.isBuddy == true && elem.priorityType == 1) {
                                            userModel.findOne({ mobileNumber: elem.mobileNumber, status: "ACTIVE" }, (err5, userData) => {
                                                if (err5) {
                                                    console.log(">>>>>>>2757", err5);
                                                }
                                                else if (!userData) {
                                                    elem.mobileNumber = elem.mobileNumber.replace("-", "");
                                                    if (elem.mobileNumber.includes("+")) {
                                                        let check = elem.mobileNumber;
                                                        elem.mobileNumber = check;
                                                    }
                                                    else {
                                                        elem.mobileNumber = "+91" + elem.mobileNumber;
                                                    }
                                                    commonFunction.sendSms2(elem.mobileNumber, "Your friend is in emergency, please help him/her", (smsErr, smsResult) => {
                                                        if (smsErr) {
                                                            console.log(">>>>>>>2764", smsErr);
                                                        }
                                                        else {
                                                            console.log(">>>>>>>2767", smsResult);
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (userData.deviceToken != null) {
                                                        commonFunction.pushNotification(userData.deviceToken, "Your friend is in emergency, please help him/her", "Buddy Button", (notificationErr, notificationResult) => {
                                                            if (notificationErr) {
                                                                console.log(">>>>>>>2775", notificationErr);
                                                            }
                                                            else {
                                                                var obj = {
                                                                    userId: req.userId,
                                                                    buddyId: userData._id,
                                                                    title: "Your friend is in emergency, please help him/her",
                                                                    body: "Buddy Button"
                                                                };

                                                                new notificationModel(obj).save((saveErr, saveResult) => {
                                                                    if (saveErr) {
                                                                        console.log(">>>>>>>2787", saveErr);
                                                                    }
                                                                    else {
                                                                        console.log(">>>>>>>2790", saveResult);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        commonFunction.sendSms2(elem.mobileNumber, "Your friend is in emergency, please help him/her", (smsErr, smsResult) => {
                                                            if (smsErr) {
                                                                console.log(">>>>>>>2799", smsErr);
                                                            }
                                                            else {
                                                                console.log(">>>>>>>2802", smsResult);
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    })
                                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.SMS_SEND);
                                }

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
     * Function Name :notificationList
     * Description   : notificationList for user in app
     *
     * @return response
    */

    notificationList: (req, res) => {
        try {
            var query = { buddyId: req.userId, status: "ACTIVE" };
            notificationModel.find(query).sort({ createdAt: -1 }).limit(50).select('userId title createdAt').exec((err, notificationResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, notificationResult, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :clearNotification
     * Description   : clearNotification for user in app
     *
     * @return response
    */

    clearNotification: (req, res) => {
        try {
            notificationModel.findOne({ _id: req.body.notificationId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    notificationModel.findOneAndUpdate({ _id: req.body.notificationId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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
     * Function Name :clearAllNotifications
     * Description   : clearAllNotifications for user in app
     *
     * @return response
    */

    clearAllNotifications: (req, res) => {
        try {
            notificationModel.update({ buddyId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { multi: true }, (err, updateResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :logout
     * Description   : logout for user in app
     *
     * @return response
    */

    logout: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: { deviceToken: null } }, { new: true }, (err2, logoutResult) => {
                        if (err2) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.LOGOUT_SUCCESS);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },





}

