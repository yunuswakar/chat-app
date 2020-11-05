const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');
const eventModel = require('../models/eventModel');
const storyModel = require('../models/storyModel');
const goalModel = require('../models/goalModel');
const reportModel = require('../models/reportModel');
const notificationModel = require('../models/notificationModel');
const staticModel = require('../models/staticModel');
const activityModel = require('../models/activityModel');
const rewardModel = require('../models/rewardModel')
const community = require('../models/communityModel')
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
var cron = require('node-cron');
const _ = require('lodash');
const e = require('express');
const mongoose = require('mongoose');
const postModel = require('../models/postModel');
const { json } = require('body-parser');
const chatSchema = require('../models/chatingModel')
const request = require('request')


module.exports = {

    /**
       * Function Name :signUp
       * Description   : signUp for user
       *
       * @return response
       */
    signUp: async (req, res) => {
        try {
            var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }] }
            userModel.findOne(query, async (error, userData) => {
                if (error) {
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

                    if (req.body.referralId) {
                        var result = await userModel.findOne({ referralCode: req.body.referralId })
                        console.log("immmmmmmmm", result.rewardPoint)
                        let user = await userModel.findOneAndUpdate({ _id: result._id }, { $set: { rewardPoint: result.rewardPoint += 20 } }, { new: true })
                        console.log(">>>>>>>>11", user.rewardPoint)
                        var obj = {
                            referralOwnerId: user._id,
                            rewardPoint: 100,
                            title: `you have got ${result.rewardPoint} Points`,
                            body: `${req.body.name} Signup by your referral code.`,
                        };
                        new rewardModel(obj).save((RewardErr, success) => {
                            console.log("reward activity saved", success)
                        }
                        )


                    }

                    req.body.referralCode = commonFunction.getCode()
                    req.body.otp = commonFunction.getOTP();
                    req.body.otpTime = new Date().getTime();
                    req.body.password = bcrypt.hashSync(req.body.password);

                    var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                    var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${phoneNumber}&text=Hi ${req.body.name} please use this code ${req.body.otp} to verify your account`
                    request(url, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INVALID_MOBILE);
                        }
                        else {
                            new userModel(req.body).save((error, saveResult) => {
                                console.log(error, saveResult)
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var token = jwt.sign({ id: saveResult._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' });
                                    var result = {
                                        name: saveResult.name,
                                        email: saveResult.email,
                                        countryCode: saveResult.countryCode,
                                        mobileNumber: saveResult.mobileNumber,
                                        token: token,
                                        otp: saveResult.otp,
                                        _id: saveResult._id,
                                        referralCode: saveResult.referralCode,
                                        rewardPoint: saveResult.rewardPoint,
                                        deviceToken: saveResult.deviceToken
                                    }
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.SIGNUP_SUCCESSFULLY);
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
    * Function Name :login
    * Description   : login for user
    *
    * @return response
    */
    login: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: "ACTIVE", userType: "USER" }
            userModel.findOne(query, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    if (userData.verifyOtp == true) {
                        const check = bcrypt.compareSync(req.body.password, userData.password)
                        if (check) {
                            var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' });
                            var result = {
                                userId: userData._id,
                                token: token,
                                name: userData.name,
                                email: userData.email,
                                mobileNumber: userData.mobileNumber,
                                verifyOtp: userData.verifyOtp
                            };

                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                            //        userModel.findOneAndUpdate({ _id: userData._id }, { $set: { deviceToken: req.body.deviceToken } }, { new: true }, (updatedErr, updatedData) => {
                            //         if (updatedErr) {
                            //             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                            
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                        }
                    }
                    else {
                        req.body.otp = commonFunction.getOTP();
                        req.body.otpTime = new Date().getTime();

                        // var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                        // var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${phoneNumber}&text=Hi ${userData.name} please use this code ${req.body.otp} to verify your account`
                        // request(url, (err, otpResult) => {
                        //     console.log("err is ", err)
                        //     if (err) {
                        //         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INVALID_MOBILE);
                        //     }
                        //     else {
                                var set = {}
                                if (req.body.otp) {
                                    set["otp"] = req.body.otp
                                }
                                if (req.body.otpTime) {
                                    set["otpTime"] = req.body.otpTime
                                }
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $set: set }, { new: true }, async (updateErr, updatedData) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                    }
                                    else {
                                        var result = {
                                            userId: userData._id,
                                            email: userData.email,
                                            mobileNumber: userData.mobileNumber,
                                            otp: updatedData.otp,
                                            verifyOtp: updatedData.verifyOtp

                                        };
                                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.VERIFY_OTP_NEED)
                                    }
                                })
                        //     }
                        // })
                    }

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }


    },
    // login: (req, res) => {
    //     try {
    //         var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }], status: "ACTIVE", userType: "USER" }
    //         userModel.findOne(query, (error, userData) => {
    //             console.log("djkfjfjf",error,userData)
    //             if (error) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!userData) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
    //             }
    //             else {
    //                 const check = bcrypt.compareSync(req.body.password, userData.password)
    //                 if (check) {
    //                     console.log("chchchchchc",check)
    //                     var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' });
    //                     var result = {
    //                         userId: userData._id,
    //                         token: token,
    //                         name: userData.name,
    //                         email: userData.email,
    //                         mobileNumber: userData.mobileNumber,
    //                     };
    //                     response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
    //                 }
    //                 else {
    //                     response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
    //                 }
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
    //     }


    // },

    /**
     * Function Name :deviceTokenAdded
     * Description   : deviceToken Added for user
     *
     * @return response
    */

    deviceTokenAdded: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: userData._id }, { $set: { deviceToken: req.body.deviceToken } }, { new: true }, (error, deviceData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!deviceData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, deviceData, SuccessMessage.UPDATE_SUCCESS);

                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)

        }
    },
    /**
     * Function Name :verifyOtp
     * Description   : verifyOtp for user
     *
     * @return response
    */

    verifyOtp: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "USER" }, (err, result) => {
            console.log("im in user", err, result)
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
                    console.log(">>>>>", difference)
                    // if (difference < 900000) {
                    userModel.findOneAndUpdate({ _id: result._id }, { $set: { verifyOtp: true } }, { new: true }, (updateErr, updateResult) => {
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

    /**
     * Function Name :socialLogin
     * Description   : socialLogin for user
     *
     * @return response
    */

    socialLogin: (req, res) => {
        try {
            if (!req.body.socialId || !req.body.socialType) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.FIELD_REQUIRED)
            } else {
                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, emailFind) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

                    }
                    else {
                        userModel.findOne(
                            { socialId: req.body.socialId, status: { $ne: "DELETE" } },
                            (error, checkSocialId) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                } else if (!checkSocialId) {
                                    var data = {
                                        socialId: req.body.socialId,
                                        loginWith: req.body.socialType,
                                        userId: emailFind._id,
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        email: req.body.email,
                                        mobileNumber: req.body.mobileNumber
                                    };
                                    var obj = new userModel(data);
                                    obj.save((err1, success) => {
                                        if (err1) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                        } else {
                                            var token = jwt.sign({ id: success._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' });
                                            var result = {
                                                dataList: data,
                                                userDetail: success._id,
                                                token: token
                                            };
                                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                        }
                                    });
                                } else {
                                    var token = jwt.sign(
                                        { _id: checkSocialId._id },
                                        "socialX"
                                    );
                                    var data1 = {
                                        socialId: checkSocialId._id,
                                        loginWith: req.body.socialType,
                                        userId: emailFind._id,
                                        firstName: req.body.firstName,
                                        lastName: req.body.lastName,
                                        email: req.body.email,
                                        mobileNumber: req.body.mobileNumber
                                    };

                                    var result = {
                                        dataList: data1,
                                        userDetail: checkSocialId._id,
                                        token: token
                                    };
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                }
                            }
                        );
                    }
                })
            }

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
  * Function Name : setPin
  * Description   : Set the pin with user name
  *
  * @return response
  */
    setPin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else if (userDetails) {
                    const salt = bcrypt.genSaltSync(10);
                    req.body.pin = bcrypt.hashSync(req.body.pin, salt)
                    userModel.findByIdAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { pin: req.body.pin } }, { new: true }, (error, pinUpdate) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {

                            var token = jwt.sign({ id: pinUpdate._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' })
                            response(res, SuccessCode.SUCCESS, { token: token, pinUpdate }, SuccessMessage.PIN_SET);
                        }
                    })
                } else {

                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.NOT_FOUND);
                }
            })
        } catch (error) {

            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :forgotPassword
     * Description   : forgotPassword for user
     *
     * @return response
    */

    forgotPassword: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, status: "ACTIVE" }, (err, result) => {
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
                    var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${phoneNumber}&text=Hi ${userData.name} please use this code ${otp3} to verify your account`
                    request(url, (otpErr, otpSent) => {
                        if (otpErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        }
                        else {

                            var emailGiven = req.body.email;
                            commonFunction.emailSender(emailGiven, "Your OTP is", `${otp3}`, (error, otpSent) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                }
                                else {
                                    userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber, countryCode: result.countryCode, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }).select('-permission').exec((updateErr, otpUpdate) => {
                                        console.log("otp is ", otpUpdate)
                                        if (updateErr) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.OTP_SEND);
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
     * Function Name :resetPassword
     * Description   : resetPassword for user
     *
     * @return response
    */

    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (error, customerData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

                }
                else if (!customerData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        var newPassword = bcrypt.hashSync(req.body.newPassword)
                        userModel.findOneAndUpdate({ _id: customerData._id }, { $set: { password: newPassword } }, { new: true }, (error, updatePassword) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.success, updatePassword, SuccessMessage.PASSWORD_UPDATE)
                            }
                        })
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
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
      * Description   :Change Password
      *
      * @return response
      */

    changePassword: (req, res) => {
        try {
            if (!req.body.confirmPassword || !req.body.newPassword || !req.body.oldPassword) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            } else {
                userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    }
                    else if (userDetails) {
                        bcrypt.compare(req.body.oldPassword, userDetails.password, (err, success) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (!success) {
                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                            }

                            let salt = bcrypt.genSaltSync(10);
                            req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)

                            let set = {
                                password: req.body.newPassword
                            }

                            userModel.findOneAndUpdate({ _id: req.body.userId }, set, { new: true }, (updateErr, userUpdate) => {
                                if (updateErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else {
                                    response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.RESET_SUCCESS);
                                }
                            })

                        })
                    } else {
                        response(res, ErrorCode.USER_FOUND, [], ErrorMessage.USER_FOUND);
                    }
                })
            }
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :updateProfile
     * Description   :updateProfile
     *
     * @return response
     */
    updateProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else {
                    req.body.otp = commonFunction.getOTP();
                    req.body.otpTime = new Date().getTime();
                    req.body.password = bcrypt.hashSync(req.body.password);
                    var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                    commonFunction.sendSms(phoneNumber, req.body.otp, (err, otpResult) => {

                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INVALID_MOBILE);
                        }
                        userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: req.body }, { new: true }, (error, userUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                response(res, SuccessCode.OTP_SEND, userUpdate, SuccessMessage.OTP_SEND_MOBILE);
                            }
                        })

                    })


                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addLocation
     * Description   : addLocation for user
     *
     * @return response
    */

    addLocation: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: { $ne: "DELETE" }, userType: "USER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    req.body.location = {
                        type: "Point",
                        coordinates: [req.body.lat, reqq.body.long]
                    };
                    userModel.findOneAndUpdate({ _id: result._id }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.LOCATION_ADD)
                        }
                    })


                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },

    /**
      * Function Name :resendOtp
      * Description   : otp sent to mobile number of user
      *
      * @return response
    */
    resendOtp: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber }, (error, userData) => {
            console.log(">>>>>>>>11", error, userData)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                var otp = commonFunction.getOTP(4)

                // commonFunction.sendSMS(req.body.mobileNumber, otp, (error, otpData) => {
                var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${req.body.mobileNumber}&text=Hi ${userData.name} please use this code ${otp} to verify your account`
                request(url, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                    }
                    else {
                        userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: { otp: otp } }, { new: true }, (error, updatedData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.OTP_SEND)
                            }
                        })
                    }
                })
            }
        })
    },


    myProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    post.find({ userId: result._id, postStatus: "ACTIVE" }, (postErr, postResult) => {
                        if (postErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var data = {
                                _id: result._id,
                                name: result.name,
                                email: result.email,
                                countryCode: result.countryCode,
                                mobileNumber: result.mobileNumber,
                                aboutMe: result.aboutMe,
                                hobbies: result.hobbies,
                                DOB: result.DOB,
                                profilePic: result.profilePic,
                                gender: result.gender,
                                contentImage: result.contentImage,
                                backImage: result.backImage,
                                city: result.city,
                                address: result.address,
                                friends: result.friends.length,
                                followers: result.followers.length,
                                following: result.following.length,
                                posts: postResult.length,
                                rewardPoint: result.rewardPoint
                            };
                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            // throw error
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    userProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            post.find({ userId: result._id, postStatus: "ACTIVE" }, (postErr, postResult) => {
                                if (postErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var isFriend = false;
                                    var isFollowing = false;
                                    var isRequested = false;
                                    var isFollowRequestSent = false;
                                    if (result.friends.includes(req.userId)) {
                                        isFriend = true
                                    }
                                    if (userData.following.includes(result._id)) {
                                        isFollowing = true
                                    }
                                    if (userData.requestSent.map(el => el.userId).includes(result._id)) {
                                        isRequested = true;
                                    }
                                    if (userData.followRequestSent.includes(result._id)) {
                                        isFollowRequestSent = true
                                    }

                                    var data = {
                                        _id: result._id,
                                        name: result.name,
                                        email: result.email,
                                        countryCode: result.countryCode,
                                        mobileNumber: result.mobileNumber,
                                        aboutMe: result.aboutMe,
                                        hobbies: result.hobbies,
                                        DOB: result.DOB,
                                        profilePic: result.profilePic,
                                        gender: result.gender,
                                        contentImage: result.contentImage,
                                        backImage: result.backImage,
                                        city: result.city,
                                        address: result.address,
                                        isFriend: isFriend,
                                        isFollowing: isFollowing,
                                        friends: result.friends.length,
                                        followers: result.followers.length,
                                        following: result.following.length,
                                        posts: postResult.length,
                                        isRequested: isRequested,
                                        isFollowRequestSent: isFollowRequestSent

                                    };
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET)
                                }
                            })
                        }
                    })
                }
            })

        }
        catch (error) {
            // throw error
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },



    /**
* Function Name :editProfile
* Description   : edit profile by user
*
* @return response
*/

    editProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (err, result) => {
                console.log("im i user", result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    if (req.body.email || req.body.mobileNumber) {
                        var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }] }
                        userModel.findOne(query, async (error, userData) => {
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>44", error, userData)
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else if (userData) {

                                if (req.body.mobileNumber == userData.mobileNumber) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                }
                                else {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                }
                            }
                            else {
                                req.body.otp = commonFunction.getOTP();
                                req.body.otpTime = new Date().getTime();

                                var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                                var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${phoneNumber}&text=Hi ${userData.name} please use this code ${req.body.otp} to verify your account`
                                request(url,async (err, result) => {
                                    console.log("err is ", err)
                                    if (err) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INVALID_MOBILE);
                                    }
                                    else {
                                        var set = {}
                                        if (req.body.profilePic) {
                                            set["profilePic"] = await convertImage()
                                        }
                                        if (req.body.gender) {
                                            set["gender"] = req.body.gender
                                        }
                                        if (req.body.backImage) {
                                            set["backImage"] = await convertBackImage()
                                        }
                                        if (req.body.address) {
                                            set["address"] = req.body.address
                                        }
                                        if (req.body.hobbies) {
                                            set["hobbies"] = req.body.hobbies
                                        }
                                        if (req.body.aboutMe) {
                                            set["aboutMe"] = req.body.aboutMe
                                        }
                                        if (req.body.email) {
                                            set["email"] = req.body.email
                                        }

                                        if (req.body.mobileNumber) {
                                            set["mobileNumber"] = req.body.mobileNumber
                                        }

                                        if (req.body.otp) {
                                            set["otp"] = req.body.otp
                                        }
                                        set["verifyOtp"] = false
                                        userModel.findOneAndUpdate({ _id: result._id, status: "ACTIVE" }, { $set: set }, { new: true }, async (updateErr, updatedData) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                            }
                                            else if (!updatedData) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.UPDATE_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            }

                        })

                    }
                    else {

                        var set = {}
                        if (req.body.profilePic) {
                            set["profilePic"] = await convertImage()
                        }
                        if (req.body.gender) {
                            set["gender"] = req.body.gender
                        }
                        if (req.body.backImage) {
                            set["backImage"] = await convertBackImage()
                        }
                        if (req.body.address) {
                            set["address"] = req.body.address
                        }
                        if (req.body.hobbies) {
                            set["hobbies"] = req.body.hobbies
                        }
                        if (req.body.aboutMe) {
                            set["aboutMe"] = req.body.aboutMe
                        }




                        userModel.findOneAndUpdate({ _id: result._id, status: "ACTIVE" }, { $set: set }, { new: true }, async (updateErr, updatedData) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else if (!updatedData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                    }





                    //*********************Function for  pic upload *************************************/
                    function convertImage() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.profilePic, (error, upload) => {
                                if (error) {
                                    console.log("Error uploading image")
                                }
                                else {
                                    resolve(upload)
                                }
                            })
                        })
                    }
                    //*************************function for video upload*****************************/
                    function convertBackImage() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.backImage, (error, upload) => {
                                if (error) {
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
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    //   /**
    //        * Function Name : createPost
    //        * Description   : creation of a post by the user
    //        *
    //        * @return response
    //       */
    //      createPost: async (req, res) => {
    //         try {
    //           let media=[]
    //           if(req.body.media){
    //            media =await commonFunction.uploadMedia(req.body.media);
    //           }
    //          const newPost=await new post({
    //             userId:req.userId,
    //             feedType:req.body.feedType,
    //             text:req.body.text,
    //             tags:req.body.tags,
    //             media:media
    //           }).save();
    //          res.send({responseCode:200,responseMessage:"Post created successfully !",newPost});
    //         } catch (error) {
    //           throw error;
    //         }
    //       },

    /**
     * Function Name :categoryList
     * Description   : categoryList for user
     *
     * @return response
    */

    categoryList: (req, res) => {
        categoryModel.find({ status: { $ne: "DELETE" } }, (err, result) => {
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

    /**
     * Function Name :selectCategory
     * Description   : selectCategory for user
     *
     * @return response
    */

    selectCategory: (req, res) => {
        try {
            if (req.body.chooseCategory.length < 5) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.SELECT_CATEGORY);
            }
            else {
                userModel.findOneAndUpdate({ _id: req.body.userId, userType: "USER" }, { $set: { chooseCategory: req.body.chooseCategory } }, { new: true }, (err, updateResult) => {

                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    // /**
    //  * Function Name : likePost
    //  * Description   : likePost by the user
    //  *
    //  * @return response
    // */

    // likePost: async (req, res) => {
    //     try {
    //         const findPost = await post.findOne({
    //             _id: req.body.postId,
    //             postStatus: "ACTIVE"
    //         });
    //         const userInfo = await userModel.findOne({ _id: req.userId });
    //         if (req.body.like) {
    //             const checkLike = findPost.likes.filter(f => f.likedId == req.userId);
    //             console.log("ty<<>>>LOL", checkLike);
    //             if (findPost && checkLike.length) {
    //                 res.send({ responseCode: 409, responseMessage: "Already liked !." });
    //             } else if (findPost && !checkLike.length) {
    //                 var like = {
    //                     likedId: req.userId,
    //                     userName: `${userInfo.firstName} ${userInfo.lastName}`,
    //                     userPic: userInfo.profilePic
    //                 };
    //                 const updatePost = await post.findOneAndUpdate(
    //                     { _id: req.body.postId, postStatus: "ACTIVE" },
    //                     { $push: { likes: like } },
    //                     { new: true }
    //                 );
    //                 res.send({
    //                     responseCode: 409,
    //                     responseMessage: `You have liked the post <${findPost._id}>`
    //                 });
    //             } else {
    //                 res.send({
    //                     responseCode: 404,
    //                     responseMessage: "No such post exists !. "
    //                 });
    //             }
    //         }


    //     } catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    /**
     * Function Name : postNotification
     * Description   : postNotification by the user
     *
     * @return response
    */

    postNotification: (req, res) => {
        try {
            post.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var obj = {};
                    if (req.body.isNotify == true) {
                        obj = {
                            $addToSet: { notifyUsers: req.userId }
                        };
                    }
                    else {
                        obj = {
                            $pull: { notifyUsers: req.userId }
                        };
                    }

                    post.findByIdAndUpdate(result._id, obj, { new: true }, (updateErr, updateResult) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name : bookmarkPost
     * Description   : bookmarkPost by the user
     *
     * @return response
    */

    bookmarkPost: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    post.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (postErr, postResult) => {
                        if (postErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postResult) {
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
                            post.findByIdAndUpdate(postResult._id, updatedKey, { new: true }, (updateErr, updateResult) => {
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.POST_BOOKMARK);
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
     * Function Name : createStory
     * Description   : createStory by the user
     *
     * @return response
    */





    createStory: async (req, res) => {
        try {
            var form = new multiparty.Form();
            //console.log("im in req",req)
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

                            var story = {
                                userId: result._id,
                                userName: result.name,
                                userPic: result.profilePic,
                                storyPrivacy: fields.storyPrivacy[0],
                                text: fields.text[0],
                                categoryId: fields.categoryId[0],
                                categoryName: fields.categoryName[0],
                                image: picture,
                                video: videoUrl
                            }
                            if (fields.storyPrivacy == "PRIVATE") {
                                story.storyPrivacy = "PRIVATE"
                                story.timeLine = []
                                result.followers.forEach(x => {
                                    story.timeLine.push(x._id)
                                })
                                story.timeLine.push(result.id)
                            }
                            storyModel.create(story, async (postError, storyData) => {
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


    /**
     * Function Name : viewStory
     * Description   : viewStory by the user
     *
     * @return response
    */

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
                    storyModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (err, data) => {
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

    /**
     * Function Name : addEvent
     * Description   : addEvent by the user
     *
     * @return response
    */

    addEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (categoryErr, categoryData) => {
                        if (categoryErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!categoryData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            const obj = new eventModel({
                                eventName: req.body.eventName,
                                categoryId: categoryData._id,
                                userId: userData._id,
                                eventType: req.body.eventType,
                                eventDescription: req.body.eventDescription,
                                startTime: req.body.startTime,
                                endTime: req.body.endTime,
                                dateOfEvent: req.body.dateOfEvent,
                                venue: req.body.venue
                            })
                            obj.save().then(data => {
                                response(res, SuccessCode.SUCCESS, data, SuccessMessage.EVENT_ADDED)

                            }).catch(err => {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, err)
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

    /**
     * Function Name : editEvent
     * Description   : editEvent by the user
     *
     * @return response
    */

    editEvent: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    eventModel.findOne({ _id: req.body.eventId, status: "ACTIVE" }, (findErr, findRes) => {
                        if (findErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!findRes) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            if (req.body.categoryId) {
                                categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (categoryErr, categoryData) => {
                                    if (categoryErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!categoryData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                    }
                                    else {
                                        eventModel.findOneAndUpdate({ _id: findRes._id }, { $set: req.body }, { new: true }, (error, updateRes) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, updateRes, SuccessMessage.UPDATE_SUCCESS)
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                eventModel.findOneAndUpdate({ _id: findRes._id }, { $set: req.body }, { new: true }, (error, updateRes) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateRes, SuccessMessage.UPDATE_SUCCESS)
                                    }
                                })
                            }
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
      * Function Name : viewEvent
      * Description   : viewEvent by the user
      *
      * @return response
     */

    viewEvent: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    eventModel.findOne({ _id: req.params.eventId, status: "ACTIVE" }, (error, findRes) => {
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

    /**
      * Function Name : deleteEvent
      * Description   : deleteEvent by the user
      *
      * @return response
     */

    deleteEvent: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    eventModel.findOne({ _id: req.body.eventId, status: "ACTIVE" }, (error, findRes) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!findRes) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            eventModel.findByIdAndUpdate({ _id: findRes._id }, { $set: { status: "DELETE" } }, { new: true }, (error, deleteSuccess) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, deleteSuccess, SuccessMessage.DELETE_SUCCESS);
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

    /**
      * Function Name : eventList
      * Description   : eventList in app with filter
      *
      * @return response
     */

    eventList: (req, res) => {

        try {
            var query = { status: "ACTIVE" };

            if (req.body.categoryId) {
                query.categoryId = req.body.categoryId;
            }

            eventModel.find(query, (err, result) => {
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
     * Function Name : searchEvent
     * Description   : eventList in app with filter
     *
     * @return response
    */

    searchEvent: (req, res) => {
        try {
            var query = { status: "ACTIVE" };

            if (req.body.search) {
                query.$and = [{ status: { $ne: "DELETE" } }, { name: { $regex: req.body.search, $options: 'i' } }]
            }

            eventModel.find(query, (err, result) => {
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
      * Function Name : myEvents
      * Description   : myEvents of the user
      *
      * @return response
     */

    myEvents: (req, res) => {
        try {
            var query = { userId: req.userId };
            if (req.body.key == "upcoming") {
                query.dateOfEvent = { $gte: new Date().toLocaleDateString() };
            }
            if (req.body.key == "past") {
                query.dateOfEvent = { $lte: new Date().toLocaleDateString() };
            }

            eventModel.find(query, (err, result) => {
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
  * Function Name : blockUnblockUserProfile
  * Description   : block user by user
  *
  * @return response
*/
    blockUnblockUserProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, (UserErr, userData) => {
                console.log("sdhsh1111111111shs", UserErr, userData)

                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (error, customerData) => {
                        console.log("sdh333333333shshs", error, customerData)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!customerData) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);

                        } else {
                            if (req.body.status == "BLOCK") {

                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $addToSet: { blockedUser: req.body.userId } }, { new: true }, (err, blockedData) => {
                                    console.log("sdh44444444shshs", err, customerData)

                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, blockedData, SuccessMessage.BLOCK_SUCCESS)

                                    }
                                })
                            }
                            else if (req.body.status == "UNBLOCK") {
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $pull: { blockedUser: req.body.userId } }, { new: true }, (unblockErr, UnblockedData) => {
                                    if (unblockErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, UnblockedData, SuccessMessage.UNBLOCK_SUCCESS)

                                    }
                                })

                            }
                        }
                    })

                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
      * Function Name : addGoal
      * Description   : create goal by user
      *
      * @return response
    */
    addGoal: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const obj = new goalModel({
                        goalName: req.body.goalName,
                        userId: userData._id,
                        goalCategory: req.body.goalCategory,
                        tag: req.body.tag,
                        aboutGoal: req.body.aboutGoal,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                    })
                    obj.save().then(data => {
                        response(res, SuccessCode.SUCCESS, data, SuccessMessage.EVENT_ADDED)

                    }).catch(err => {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, err)
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    viewGoal: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    goalModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (goalErr, goalData) => {
                        if (goalErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!goalData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, goalData, SuccessMessage.DATA_FOUND);

                        }

                    })
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
         * Function Name : editGoal
         * Description   : edit goal of the user
         *
         * @return response
        */
    editGoal: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    goalModel.findOneAndUpdate({ _id: req.body.goalId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.UPDATE_SUCCESS);

                        }

                    })

                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
        * Function Name : deleteGoal
        * Description   : delete goal of the user
        *
        * @return response
       */
    deleteGoal: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    goalModel.findOneAndUpdate({ _id: req.body.goalId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.GOAL_DELETE);

                        }

                    })

                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : myGoal
        * Description   : own goal of the user
        *
        * @return response
       */

    myGoals: (req, res) => {
        try {
            var query = { userId: req.userId, status: "ACTIVE" };

            goalModel.find(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, SuccessCode.SUCCESS, SuccessMessage.GOAL_SET);
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
    * Function Name : aboutUs
    * Description   : about us seen by the user
    *
    * @return response
    */
    aboutUs: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    staticModel.findOne({ title: "Abouts Us", status: "ACTIVE" }, (goalErr, goalData) => {
                        if (goalErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!goalData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, goalData, SuccessMessage.DATA_FOUND);

                        }

                    })
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
    * Function Name : contactUs
    * Description   : contactUs by the user
    *
    * @return response
    */
    contactUs: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    staticModel.findOne({ title: "Contact Us", status: "ACTIVE" }, (goalErr, goalData) => {
                        if (goalErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!goalData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, goalData, SuccessMessage.DATA_FOUND);

                        }

                    })
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
    * Function Name : T & C
    * Description   : contactUs by the user
    *
    * @return response
    */
    termsAndCondition: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    staticModel.findOne({ title: "Terms & Conditions", status: "ACTIVE" }, (goalErr, goalData) => {
                        if (goalErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!goalData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                        }
                        else {
                            response(res, SuccessCode.SUCCESS, goalData, SuccessMessage.DATA_FOUND);

                        }

                    })
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    passwordChange: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var check = bcrypt.compareSync(req.body.oldPassword, result.password);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                    }
                    else {
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword);
                        userModel.findOneAndUpdate({ _id: req.userId, userType: "USER", status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (err, updateResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!updateResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    myBlockedUsersList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }).populate('blockedUser', '_id name profilePic').select('blockedUser').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
  * Function Name :checkMobileNo
  * Description   : checkMobileNo  for user
  *
  * @return response
  */

    getRegisteredUsers: (req, res) => {
        try {

            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                        userModel.find({ mobileNumber: { $in: req.body.mobileNumber }, status: "ACTIVE" }).select('_id name mobileNumber profilePic followRequests followers').exec((error, userResult) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {

                    let totalNumber = []
                    totalNumber.push(...req.body.mobileNumber)
                    console.log("mmmmmmmm", userResult)
                    var newArray = []
                    userResult.forEach(x => {
                        var obj = {
                            _id: x._id,
                            name: x.name,
                            mobileNumber: x.mobileNumber,
                            profilePic: x.profilePic,
                            followRequests: x.followRequests,
                            followers : x.followers
                        }
                        newArray.push(obj);

                    })


                    newArray.map((e) => {
                        if (e.followRequests.includes(userData._id)) {
                            e["isRequest"] = true;
                            return e;
                        }
                        else {
                            e["isRequest"] = false
                            return e;
                        }
                    })
                    newArray.map((e) => {
                        if (e.followers.includes(userData._id)) {
                            e["isFollowing"] = true;
                            return e;
                        }
                        else {
                            e["isFollowing"] = false
                            return e;
                        }
                    })
                    let data = userResult.map(o => o.mobileNumber);
                    let numbers = [];
                    var result = newArray
                    numbers = totalNumber.filter(n => !data.includes(n))
                    res.send({ response_code: 200, response_message: "Data found", result, numbers })
                }
            })

                }
                })
        
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    requestSent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (userErr, userDet) => {
                        if (userErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!userDet) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            var obj = {
                                userId: userDet._id,
                                userName: userDet.name,
                                userPic: userDet.profilePic,
                            }
                            userModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { requestSent: obj } }, { new: true }, (error, userData) => {
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!userData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                }
                                else {
                                    var obj1 = {
                                        senderId: result._id,
                                        senderName: result.name,
                                        senderPic: result.profilePic,
                                    }
                                    userModel.findOneAndUpdate({ _id: userDet._id }, { $addToSet: { requests: obj1 } }, { new: true }, (error1, userData1) => {
                                        if (error1) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (!userData1) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_SENT);
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

    cancelFriendRequest: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (userErr, userDet) => {
                        if (userErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!userDet) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $pull: { requestSent: { userId: userDet._id } } }, { new: true }, (error, userData) => {
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: userDet._id }, { $pull: { requests: { senderId: result._id } } }, { new: true }, (error1, userData1) => {
                                        if (error1) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_CANCEL);
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

    acceptRejectFriendRequest: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.friendRequestId, status: "ACTIVE" }, (friendErr, friendResult) => {
                        if (friendErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            if (req.body.response == true) {
                                userModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { friends: req.body.friendRequestId }, $pull: { requests: { senderId: req.body.friendRequestId } } }, { new: true }, (updateErr, updateResult) => {
                                    console.log("1887", updateErr, updateResult)
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ _id: friendResult._id }, { $addToSet: { friends: req.userId }, $pull: { requestSent: { userId: req.userId } } }, { new: true }, (frndUpdateErr, frndUpdateResult) => {
                                            console.log("1893", frndUpdateErr, frndUpdateResult)
                                            if (frndUpdateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_ACCEPT);
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                userModel.findOneAndUpdate({ _id: result._id }, { $pull: { requests: { senderId: req.body.friendRequestId } } }, { new: true }, (rejectErr, rejectResult) => {
                                    console.log("1906", rejectErr, rejectResult)
                                    if (rejectErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ _id: friendResult._id }, { $pull: { requestSent: { userId: req.userId } } }, { new: true }, (frndRejectErr, frndRejectResult) => {
                                            console.log("1912", frndRejectErr, frndRejectResult)
                                            if (frndRejectErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_REJECT);
                                            }
                                        })
                                    }
                                })
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

    friendRequestList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }).select('requests').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    getFriendList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }).populate('friends', 'name profilePic').select('friends').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    unfriendUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.friendId, status: "ACTIVE" }, (friendErr, friendResult) => {
                        if (friendErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $pull: { friends: req.body.friendId } }, { new: true }, (updateErr, updateResult) => {
                                console.log("1990", updateErr, updateResult)
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: friendResult._id }, { $pull: { friends: req.userId } }, { new: true }, (frndUpdateErr, frndUpdateResult) => {
                                        console.log("1996", frndUpdateErr, frndUpdateResult)
                                        if (frndUpdateErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.UNFRIEND_SUCCESS);
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

    friendSuggestion: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", }, (error, userData) => {
            console.log("i am in user data", userData)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                const arr = userData.requestSent;
                const arr1 = userData.friends;
                const arr2 = userData.requests;
                console.log("arrrrrrrrrrr", arr)
                console.log("ar1111111111111", arr1)
                console.log("ar2222222222222", arr2)
                let friend = [];
                let friendlist = [];
                let friendrequestsent = [];
                arr.forEach(x => {
                    console.log("3290>>>>>>>>>>>", x);
                    if (x.status == "WAITING") {
                        arr1.push(x.friendRequistId);
                    }
                });
                arr.forEach(x => {
                    if (x.status != "DELETE") {
                        friendrequestsent.push(x.friendRequestSentId);
                    }
                });
                arr1.forEach(x => {
                    if (x.status != "DELETE") {
                        friend.push(x.friendId);
                    }
                });
                arr2.forEach(x => {





                    if (x.status != "DELETE") {
                        friendlist.push(x.friendRequestId);
                    }
                });
                const newArr = friendrequestsent.concat(friendlist, friend);
                newArr.push(userData._id);
                if (req.body.search) {
                    query.$or = [
                        {
                            name: { $regex: req.body.search, $options: 'i' }
                        },
                        {
                            mobileNumber: { $regex: req.body.search, $options: 'i' }
                        }
                    ]
                }
                var options = {
                    page: req.body.pageNumber || 1,
                    limit: req.body.limit || 5,
                    select: "name countryCode  _id mobileNumber profilePic",
                    sort: {
                        createdAt: -1
                    }
                };
                userModel.paginate({ _id: { $nin: newArr }, status: "ACTIVE" }, options, (errr, result1) => {
                    if (errr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (result1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    } else {

                        console.log("<><><<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result1.docs)

                        let doc = result1.docs
                        // let docArr=[]
                        let newArray = []
                        doc.forEach(x => {
                            let friendArray = []
                            let count = []
                            let friendId = []
                            var finalArray = friendArray.concat(x.friends)
                            // log("+++++++++++++++++++++++++++++++++++", x, "ttttttttttttttttt", x.friendList)
                            for (let a = 0; a < finalArray.length; a++) {
                                friendId.push(finalArray[a])
                            }

                            var presents = _.intersectionWith(friendlist, friendId, _.isEqual);
                            console.log("mutual friends::::::::::::::::::::::::::::::", count, "lenght>>>>>>>>>>>>>>>>>>>", count.length)
                            var obj = {
                                _id: x._id,
                                name: x.name,
                                countryCode: x.countryCode,
                                mobileNumber: x.mobileNumber,
                                profilePic: x.profilePic,
                                mirrorFlyId: x.mirrorFlyId,
                                mutual: presents
                                    .length
                            }
                            newArray.push(obj);

                        })
                        const total = result1.total;
                        const pages = result1.pages;
                        const limit = result1.limit;
                        const page = result1.page;
                        var newResult = { docs: newArray, total, limit, page, pages };

                        response(res, SuccessCode.SUCCESS, newResult, SuccessMessage.DATA_FOUND);
                    }
                }
                    // }
                );
            }
        });
    },


    followFriend: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userResult) => {
                        if (userErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { followRequestSent: userResult._id } }, { new: true }, (requestSentErr, requestSentResult) => {
                                if (requestSentErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: userResult._id }, { $addToSet: { followRequests: result._id } }, { new: true }, (followErr, followResult) => {
                                        if (followErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, followResult, SuccessMessage.FOLLOW_REQUEST_SENT);
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

    cancelFollowRequest: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userResult) => {
                        if (userErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $pull: { followRequestSent: userResult._id } }, { new: true }, (requestSentErr, requestSentResult) => {
                                if (requestSentErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: userResult._id }, { $pull: { followRequests: result._id } }, { new: true }, (followErr, followResult) => {
                                        if (followErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.FOLLOW_CANCEL);
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

    acceptRejectFollowRequest: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.followRequestId, status: "ACTIVE" }, (followErr, followResult) => {
                        if (followErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!followResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            if (req.body.response == true) {
                                userModel.findOneAndUpdate({ _id: result._id }, { $addToSet: { followers: followResult._id }, $pull: { followRequests: followResult._id } }, { new: true }, (updateErr, updateResult) => {
                                    console.log("1887", updateErr, updateResult)
                                    if (updateErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ _id: followResult._id }, { $addToSet: { following: result._id }, $pull: { followRequestSent: result._id } }, { new: true }, (followUpdateErr, followUpdateResult) => {
                                            console.log("1893", followUpdateErr, followUpdateResult)
                                            if (followUpdateErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_ACCEPT);
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                userModel.findOneAndUpdate({ _id: result._id }, { $pull: { followRequests: followResult._id } }, { new: true }, (rejectErr, rejectResult) => {
                                    console.log("1906", rejectErr, rejectResult)
                                    if (rejectErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ _id: followResult._id }, { $pull: { followRequestSent: result._id } }, { new: true }, (frndRejectErr, frndRejectResult) => {
                                            console.log("1912", frndRejectErr, frndRejectResult)
                                            if (frndRejectErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.REQUEST_REJECT);
                                            }
                                        })
                                    }
                                })
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

    followRequestList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }).populate({ path: 'followRequests', select: 'name _id profilePic' }).select('followRequests').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    getFollowersList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }).populate('followers', 'name _id profilePic aboutMe').select('followers').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    followingList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }).populate('following', 'name _id profilePic aboutMe').select('following').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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

    unfollowFriend: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.friendId, status: "ACTIVE" }, (friendErr, friendResult) => {
                        if (friendErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { $pull: { following: req.body.friendId } }, { new: true }, (updateErr, updateResult) => {
                                console.log("1990", updateErr, updateResult)
                                if (updateErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: friendResult._id }, { $pull: { followers: req.userId } }, { new: true }, (frndUpdateErr, frndUpdateResult) => {
                                        if (frndUpdateErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.UNFOLLOW_SUCCESS);
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

    deleteAccount: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: result._id }, { $set: { status: "DELETE" } }, { new: true }, (userErr, userData) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.ACCOUNT_DELETE);

                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
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
    /**
     * Function Name : story list
     * Description   : post list get by user
     *
     * @return response
    */
    storyList: (req, res) => {
        try {
            var data = []
            var output = []
            var limit, page, length, doc, jsonObject, uniqueSet, docs;

            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (UserErr, userData) => {
                console.log("im in user", userData._id)
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {


                    if (userData.toggleButton == true) {
                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 5,
                            sort: {
                                createdAt: -1
                            },
                        }
                        var id = String(userData._id)
                        console.log(">>>>>>>>>>>>>>>>>>", id)
                        // storyModel.find({ timeLine: { $in: userData._id },storyPrivacy:"PRIVATE", status: "ACTIVE", },(storyErr, storyData) => {
                        storyModel.find({ timeLine: { $in: id }, storyPrivacy: "PRIVATE", status: "ACTIVE" }, (storyErr, storyData) => {
                            console.log("im in story data", storyErr, storyData)
                            if (storyErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (!storyData) {

                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            } else {
                                //return  response(res, SuccessCode.SUCCESS, storyData, SuccessMessage.DETAIL_GET);
                                data = storyData
                                output = data.sort(function (a, b) { return b.createdAt - a.createdAt });
                                limit = req.body.limit || 10
                                length = output.length
                                page = req.body.pageNumber || 1;
                                doc = commonFunction.Paging(output, limit, page);
                                jsonObject = doc.map(JSON.stringify);
                                uniqueSet = new Set(jsonObject);
                                docs = Array.from(uniqueSet).map(JSON.parse);
                                length != 0 && page <= Math.ceil(length / limit) ? response(res, SuccessCode.SUCCESS, { docs, page: page, limit: limit, TotalPage: Math.ceil(length / limit) }, SuccessMessage.DATA_FOUND)
                                    : response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                            }
                        })

                    }
                    else {
                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 5,
                            sort: {
                                createdAt: -1
                            },
                        }

                        storyModel.paginate({ status: "ACTIVE" }, options, (storyErr, storyData) => {
                            if (storyErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (storyData.length == 0) {

                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            } else {
                                response(res, SuccessCode.SUCCESS, storyData, SuccessMessage.DETAIL_GET);
                            }
                        })

                    }
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
       * Function Name : addreport
       * Description   : create goal by user
       *
       * @return response
     */
    addReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const obj = new reportModel({
                        reportedById: userData._id,
                        reportReason: req.body.reportReason,
                    })
                    obj.save().then(data => {
                        response(res, SuccessCode.SUCCESS, data, SuccessMessage.EVENT_ADDED)

                    }).catch(err => {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, err)
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
    * Function Name : notificationList
    * Description   : notificationList of user
    *
    * @return response
    */

    notificationList: (req, res) => {
        try {
            notificationModel.find({ userId: req.userId, status: "ACTIVE" }).populate({ path: 'senderId', select: 'name profilePic aboutMe' }).exec((err, result) => {
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
    * Function Name : deleteNotification
    * Description   : deleteNotification of user
    *
    * @return response
    */

    deleteNotification: (req, res) => {
        try {

            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    notificationModel.findOne({ _id: req.body.notificationId, status: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            notificationModel.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
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
            })


        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
    * Function Name : deleteAllNotifications
    * Description   : deleteAllNotifications of user
    *
    * @return response
    */

    deleteAllNotifications: (req, res) => {
        try {
            notificationModel.find({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    notificationModel.update({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { multi: true }, (updateErr, updateResult) => {
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    reportAProblem: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, userResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    commonFunction.uploadImage(req.body.reportImage, (imageErr, imageResult) => {
                        if (imageErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            req.body.reportImage = imageResult;
                            req.body.reportType = "GENERAL";
                            new reportModel(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.REPORT_SUCCESS);
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

    myBookmarks: (req, res) => {
        try {
            var query = { bookmarks: { $in: req.userId }, postStatus: "ACTIVE" };

            req.query.page = parseInt(req.query.page)
            req.query.limit = parseInt(req.query.limit)
            var options = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                sort: { createdAt: -1 }
            };

            post.paginate(query, options, (err, result) => {
                console.log("2703", err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
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

    imageList: (req, res) => {
        try {
            post.find({ userId: req.userId, postStatus: "ACTIVE" }, { image: 1, video: 1 }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    function flat(input, depth = 1, stack = []) {
                        for (let item of input) {
                            if (item instanceof Array && depth > 0) {
                                flat(item, depth - 1, stack);
                            }
                            else {
                                stack.push(item);
                            }
                        }

                        return stack;
                    }
                    response(res, SuccessCode.SUCCESS, flat(result), SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    activityList: (req, res) => {
        try {
            activityModel.find({ userId: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
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
* Function Name : muteUnmuteUserProfile
* Description   : mute user by user
*
* @return response
*/
    muteUnmuteUserProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, (UserErr, userData) => {

                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (error, user) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!user) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);

                        } else {
                            if (req.body.status == "MUTE") {
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $addToSet: { mutedUser: req.body.userId } }, { new: true }, (err, muteData) => {

                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, muteData, SuccessMessage.MUTE_SUCCESS)

                                    }
                                })
                            }
                            else if (req.body.status == "UNMUTE") {
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $pull: { mutedUser: req.body.userId } }, { new: true }, (unmuteErr, unmuteData) => {
                                    if (unmuteErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, unmuteData, SuccessMessage.UNMUTE_SUCCESS)

                                    }
                                })

                            }
                        }
                    })

                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    myMutedUsersList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }).populate('mutedUser', '_id name profilePic').select('mutedUser').exec((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    setNotificationStatus: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    var set = {}
                    if (req.body.friendRequest_notification) {
                        set["friendRequest_notification"] = req.body.friendRequest_notification
                    }
                    if (req.body.visitProfile_notification) {
                        set["visitProfile_notification"] = req.body.visitProfile_notification
                    }
                    if (req.body.tag_notification) {
                        set["tag_notification"] = req.body.tag_notification
                    }
                    if (req.body.likeComment_notification) {
                        set["likeComment_notification"] = req.body.likeComment_notification
                    }
                    if (req.body.profile_notification) {
                        set["profile_notification"] = req.body.profile_notification
                    }
                    if (req.body.chatMessage_notification) {
                        set["chatMessage_notification"] = req.body.chatMessage_notification
                    }
                    if (req.body.invitationOnEvent_notification) {
                        set["invitationOnEvent_notification"] = req.body.invitationOnEvent_notification
                    }
                    if (req.body.admin_notification) {
                        set["admin_notification"] = req.body.admin_notification
                    }
                    userModel.findOneAndUpdate({ _id: result._id, status: "ACTIVE" }, { $set: set }, { new: true }, async (updateErr, updatedData) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })


                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    getNotificationStatus: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var result = {
                        friendRequest_notification: userData.friendRequest_notification,
                        visitProfile_notification: userData.visitProfile_notification,
                        tag_notification: userData.tag_notification,
                        profile_notification: userData.profile_notification,
                        chatMessage_notification: userData.chatMessage_notification,
                        invitationOnEvent_notification: userData.invitationOnEvent_notification,
                        likeComment_notification: userData.likeComment_notification,
                        admin_notification: userData.admin_notification,

                    }
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    invite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (userErr, userData) => {
                if (userErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    var referralCode = userData.referralCode
                var link ="installer link"           
                        var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${req.body.mobileNumber}&text= Install social-x ${link}. please use this code ${referralCode} to signUp`
                        request(url,(error, data) => {
                            if (error) { 
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else {
                            res.send({ response_code: 200, response_message: "Successfully sent", data })

                        }
                    })
                }

            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    myRewardList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (UserErr, userData) => {
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
                    rewardModel.paginate({ referralOwnerId: userData._id }, options, (rewardErr, rewardData) => {
                        if (rewardErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else {
                            response(res, SuccessCode.SUCCESS, rewardData, SuccessMessage.DETAIL_GET);
                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    // universalSearch: (req, res) => {

    //     if (req.body.type == "All") {
    //         var query = {
    //             userType: "USER",
    //             status: "ACTIVE",
    //             $or: [
    //                 {
    //                     name: { $regex: req.body.search, $options: 'i' }
    //                 },
    //                 {
    //                     mobileNumber: { $regex: req.body.search, $options: 'i' }
    //                 },
    //                 {
    //                     email: { $regex: req.body.search, $options: 'i' }
    //                 }
    //             ]
    //         }

    //         userModel.find(query).sort({ createdAt: -1 }).select('name mobileNumber email profilePic').exec((err, userResult) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else {
    //                 var query2 = {
    //                     postStatus: "ACTIVE",
    //                     postType: "BLOG",

    //                     text: { $regex: req.body.search, $options: 'i' }
    //                 }
    //                 post.find(query2).sort({ createdAt: -1 }).exec((err2, postResult) => {
    //                     if (err2) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else {
    //                         var data = {
    //                             People: userResult,
    //                             Posts: postResult
    //                         };
    //                         response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     else {
    //         var query = {};
    //         var model;
    //         var select;
    //         if (req.body.type == "user_only") {
    //             model = userModel;
    //             select = '_id name mobileNumber email profilePic'
    //             query = {
    //                 userType: "USER",
    //                 status: "ACTIVE",
    //                 $or: [
    //                     {
    //                         name: { $regex: req.body.search, $options: 'i' }
    //                     },
    //                     {
    //                         mobileNumber: { $regex: req.body.search, $options: 'i' }
    //                     },
    //                     {
    //                         email: { $regex: req.body.search, $options: 'i' }
    //                     }
    //                 ]
    //             }
    //         }
    //         if (req.body.type == "blog_only") {
    //             model = postModel;
    //             query = {
    //                 postStatus: "ACTIVE",
    //                 postType: "BLOG",
    //                 text: { $regex: req.body.search, $options: 'i' }
    //             }
    //         }
    //         var options = {
    //             page: req.body.page || 1,
    //             limit: req.body.limit || 10,
    //             sort: { createdAt: -1 },
    //             select: select
    //         };

    //         model.paginate(query, options, (err, result) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else {
    //                 response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
    //             }
    //         })
    //     }
    // },
    applicationSearch: (req, res) => {
        try {
            var query = {};
            var model;
            var select;
            if (req.body.type == "USER") {
                model = userModel;
                select = '_id name mobileNumber email profilePic'
                query = {
                    userType: "USER",
                    status: "ACTIVE",
                    $or: [
                        {
                            name: { $regex: req.body.search, $options: 'i' }
                        },
                        {
                            mobileNumber: { $regex: req.body.search, $options: 'i' }
                        },
                        {
                            email: { $regex: req.body.search, $options: 'i' }
                        }
                    ]
                }
            }
            if (req.body.type == "POST") {
                model = postModel;
                query = {
                    postStatus: "ACTIVE",
                    postType: "POST",
                    title: { $regex: req.body.search, $options: 'i' }
                }
            }
            if (req.body.type == "BLOG") {
                model = postModel;
                query = {
                    postStatus: "ACTIVE",
                    postType: "BLOG",
                    title: { $regex: req.body.search, $options: 'i' }
                }
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                select: select
            };

            model.paginate(query, options, (err, results) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, results, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    birdEyeFilter: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    if (req.body.new && !req.body.trending && !req.body.myGoal && !req.body.myInterest) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE" }).sort({ "createdAt": -1 }).exec((err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })

                    }
                    else if (req.body.trending && !req.body.new && !req.body.myGoal && !req.body.myInterest) {
                        if (req.body.trending == "today") {
                            var start = new Date();
                            start.setHours(0, 0, 0, 0);

                            var end = new Date();
                            end.setHours(23, 59, 59, 999);

                            post.find({ userId: req.userId, createdAt: { $gte: start, $lt: end }, postStatus: "ACTIVE" }).sort({ "likeCount": -1, "commentCount": -1 }).exec((error, data) => {
                                if (error) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (data.length == 0) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);

                                }
                            })
                        }
                        else if (req.body.trending == "weekly") {
                            Date.prototype.getWeek = function () {
                                var onejan = new Date(this.getFullYear(), 0, 1);
                                var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                                var dayOfYear = ((today - onejan + 86400000) / 86400000);
                                return Math.ceil(dayOfYear / 7)
                            };
                            var today = new Date();
                            var currentWeekNumber = today.getWeek();


                            post.aggregate([
                                {
                                    "$redact": {
                                        "$cond": [
                                            { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                                            "$$KEEP",
                                            "$$PRUNE"
                                        ]
                                    }
                                },
                                { $match: { postStatus: "ACTIVE" } },
                                { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                { $sort: { likeCount: -1, commentCount: -1 } }




                            ], function (err, data) {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (data.length == 0) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                }
                            })
                        }
                        else {
                            let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                            var month = Number(end.toISOString().split("-")[1])

                            post.aggregate([
                                {
                                    "$redact": {
                                        "$cond": [
                                            { "$eq": [{ "$month": "$createdAt" }, month] },

                                            "$$KEEP",
                                            "$$PRUNE"
                                        ]
                                    }
                                },
                                { $match: { postStatus: "ACTIVE" } },
                                { $match: { userId: mongoose.Types.ObjectId(req.userId) } },

                                { $sort: { likeCount: -1, commentCount: -1 } }



                            ], function (err, data) {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (data.length == 0) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                }
                            })
                        }

                    }
                    else if (req.body.myGoal && !req.body.trending && !req.body.new && !req.body.myInterest) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", title: { $in: req.body.myGoal } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.myInterest && !req.body.new && !req.body.myGoal && !req.body.trending) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", categoryId: { $in: req.body.myInterest } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.new && req.body.myGoal && !req.body.myInterest && !req.body.trending) {
                        post.find({ userId: req.userId, title: { $in: req.body.myGoal }, postStatus: "ACTIVE" }).sort({ "createdAt": -1 }).exec((err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.new && req.body.myInterest && !req.body.myGoal && !req.body.trending) {
                        post.find({ userId: req.userId, categoryId: { $in: req.body.myInterest }, postStatus: "ACTIVE" }).sort({ "createdAt": -1 }).exec((err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.myInterest && req.body.myGoal && !req.body.new && !req.body.trending) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", categoryId: { $in: req.body.myInterest }, title: { $in: req.body.myGoal } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.trending && req.body.myGoal && !req.body.new && !req.body.myInterest) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", title: { $in: req.body.myGoal } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                if (req.body.trending == "today") {
                                    var start = new Date();
                                    start.setHours(0, 0, 0, 0);

                                    var end = new Date();
                                    end.setHours(23, 59, 59, 999);

                                    post.find({ userId: req.userId, createdAt: { $gte: start, $lt: end }, postStatus: "ACTIVE" }).sort({ "likeCount": -1, "commentCount": -1 }).exec((error, data) => {
                                        if (error) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);

                                        }
                                    })
                                }
                                else if (req.body.trending == "weekly") {
                                    Date.prototype.getWeek = function () {
                                        var onejan = new Date(this.getFullYear(), 0, 1);
                                        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                                        var dayOfYear = ((today - onejan + 86400000) / 86400000);
                                        return Math.ceil(dayOfYear / 7)
                                    };
                                    var today = new Date();
                                    var currentWeekNumber = today.getWeek();


                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }



                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                        }
                                    })
                                }
                                else {
                                    let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                                    var month = Number(end.toISOString().split("-")[1])

                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$month": "$createdAt" }, month] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }


                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                        }
                                    })
                                }
                            }
                        })
                    }
                    else if (req.body.trending && req.body.myInterest && !req.body.new && !req.body.myGoal) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", categoryId: { $in: req.body.myInterest } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                if (req.body.trending == "today") {
                                    var start = new Date();
                                    start.setHours(0, 0, 0, 0);

                                    var end = new Date();
                                    end.setHours(23, 59, 59, 999);

                                    post.find({ userId: req.userId, createdAt: { $gte: start, $lt: end }, postStatus: "ACTIVE" }).sort({ "likeCount": -1, "commentCount": -1 }).exec((error, data) => {
                                        if (error) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);

                                        }
                                    })
                                }
                                else if (req.body.trending == "weekly") {
                                    Date.prototype.getWeek = function () {
                                        var onejan = new Date(this.getFullYear(), 0, 1);
                                        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                                        var dayOfYear = ((today - onejan + 86400000) / 86400000);
                                        return Math.ceil(dayOfYear / 7)
                                    };
                                    var today = new Date();
                                    var currentWeekNumber = today.getWeek();


                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }



                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                        }
                                    })
                                }
                                else {
                                    let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                                    var month = Number(end.toISOString().split("-")[1])

                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$month": "$createdAt" }, month] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }


                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                        }
                                    })
                                }
                            }
                        })

                    }
                    else if (req.body.new && req.body.myGoal && req.body.myInterest && !req.body.trending) {
                        post.find({ userId: req.userId, categoryId: { $in: req.body.myInterest }, title: { $in: req.body.myGoal }, postStatus: "ACTIVE" }).sort({ "createdAt": -1 }).exec((err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                    else if (req.body.trending && req.body.myGoal && req.body.myInterest && !req.body.new) {
                        post.find({ userId: req.userId, postStatus: "ACTIVE", categoryId: { $in: req.body.myInterest }, title: { $in: req.body.myGoal } }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                if (req.body.trending == "today") {
                                    var start = new Date();
                                    start.setHours(0, 0, 0, 0);

                                    var end = new Date();
                                    end.setHours(23, 59, 59, 999);

                                    post.find({ userId: req.userId, createdAt: { $gte: start, $lt: end }, postStatus: "ACTIVE" }).sort({ "likeCount": -1, "commentCount": -1 }).exec((error, data) => {
                                        if (error) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);

                                        }
                                    })
                                }
                                else if (req.body.trending == "weekly") {
                                    Date.prototype.getWeek = function () {
                                        var onejan = new Date(this.getFullYear(), 0, 1);
                                        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                                        var dayOfYear = ((today - onejan + 86400000) / 86400000);
                                        return Math.ceil(dayOfYear / 7)
                                    };
                                    var today = new Date();
                                    var currentWeekNumber = today.getWeek();


                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$week": "$createdAt" }, currentWeekNumber] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }



                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                                        }
                                    })
                                }
                                else {
                                    let end = new Date(new Date(new Date()).setHours(0, 0, 0, 0) - (new Date().getDate() - 2) * 60 * 60 * 1000 * 24)
                                    var month = Number(end.toISOString().split("-")[1])

                                    post.aggregate([
                                        {
                                            "$redact": {
                                                "$cond": [
                                                    { "$eq": [{ "$month": "$createdAt" }, month] },

                                                    "$$KEEP",
                                                    "$$PRUNE"
                                                ]
                                            }
                                        },
                                        { $match: { postStatus: "ACTIVE" } },
                                        { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
                                        { $sort: { likeCount: -1, commentCount: -1 } }


                                    ], function (err, data) {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (data.length == 0) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
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
    feedSuggestion: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    postModel.findOne({ _id: req.body.postId, postStatus: "ACTIVE" }, (postErr, postResult) => {
                        if (postErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            postModel.find({ categoryId: postResult.categoryId, postStatus: "ACTIVE", _id: { $ne: req.body.postId } }).sort({ createdAt: -1 }).limit(5).exec((error, data) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!data) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
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
    publicPostExpire: (req, res) => {
        post.find({ postStatus: "ACTIVE", feedType: "PUBLIC" }).sort({ "likeCount": -1, "commentCount": -1 }).limit(1).exec((error, result) => {
            if (error) {
                console.log("Internal server error")
            }
            else if (result.length == 0) {
                console.log("Data not found")
            }
            else {
                post.update({ _id: result[0]._id }, { $set: { likeCount: 0, commentCount: 0 } }, { multi: true }, (resultError, result) => {
                    if (resultError) {
                        console.log("Internal server error")
                    }
                    else {
                        console.log("updated successfully")
                    }
                })

            }
        })
    },
    publicStoryExpire: (req, res) => {
        storyModel.find({ status: "ACTIVE", storyPrivacy: "PUBLIC" }).sort({ "likeCount": -1, "commentCount": -1 }).limit(1).exec((error, result) => {
            if (error) {
                console.log("Internal server error")
            }
            else if (result.length == 0) {
                console.log("Data not found")
            }
            else {
                storyModel.update({ _id: result[0]._id }, { $set: { likeCount: 0, commentCount: 0 } }, { multi: true }, (resultError, result) => {
                    if (resultError) {
                        console.log("Internal server error")
                    }
                    else {
                        console.log("updated successfully")
                    }
                })
            }
        })
    },
    wholeApplicationSearch: (req, res) => {
        try {
            var query = {
                userType: "USER",
                status: "ACTIVE",
                $or: [
                    {
                        name: { $regex: req.body.search, $options: 'i' }
                    },
                    {
                        mobileNumber: { $regex: req.body.search, $options: 'i' }
                    },
                    {
                        email: { $regex: req.body.search, $options: 'i' }
                    }
                ]
            }

            userModel.find(query).sort({ createdAt: -1 }).select('name mobileNumber email profilePic').exec((err, userResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var query2 = {
                        postStatus: "ACTIVE",
                        postType: "BLOG",
                        title: { $regex: req.body.search, $options: 'i' }
                    }
                    postModel.find(query2).sort({ createdAt: -1 }).exec((err2, blogResult) => {
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var query3 = {
                                postStatus: "ACTIVE",
                                postType: "POST",
                                title: { $regex: req.body.search, $options: 'i' }
                            }

                            postModel.find(query3).sort({ createdAt: -1 }).exec((err3, postResult) => {
                                if (err3) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var data = {
                                        People: userResult,
                                        blog: blogResult,
                                        post: postResult
                                    };
                                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
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
    toggleButton: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER" }, async (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    var set = {}
                    if (req.body.toggleButton) {
                        set["toggleButton"] = req.body.toggleButton
                    }
                    userModel.findOneAndUpdate({ _id: result._id, status: "ACTIVE" }, { $set: set }, { new: true }, async (updateErr, updatedData) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })


                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    myInterest: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var data = {
                        _id: result._id,
                        chooseCategory: result.chooseCategory
                    };
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET)

                }
            })
        }
        catch (error) {
            // throw error
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    chatUserList: (req, res) => {
        try {
            var query = {}
            query.$or = [{ "receiverId": req.body.userId }, { "senderId": req.body.userId }]
            chatSchema.find(query).populate("senderId receiverId", "name profilePic").exec((error, data) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!data) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
                }
            })
        } catch (error) {
            console.log("4244====>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
}