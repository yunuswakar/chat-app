const userModel = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');
const QRCode = require('qrcode')
const config = require('../config/config')
const retailerCouponModel = require('../models/retailerCouponModel');
const retailerSavedModel = require('../models/retailerSavedCouponModel');
const couponTemplate = require('../models/couponTemplatesModel');
const rechargeModel = require('../models/rechargeModel');
const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel')
const creditModel = require("../models/creditModel")
const couponModel = require('../models/userCouponModel')
const martModel = require('../models/martModel')
const paymentModel = require('../models/transactionModel')
const configurationModel = require('../models/configurationModel')
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
var request = require('request')
const jwt = require('jsonwebtoken');
const websiteModel = require('../models/websiteModel')
const cryptoJs = require('crypto-js')
const notificationModel = require('../models/notificationModel')
const mongoose = require('mongoose')
module.exports = {

    /**
     * Function Name :signUpRetailer
     * Description   : signUp of retailer
     *
     * @return response
    */
    signUpRetailer: (req, res) => {
        try {
            userModel.findOne({ "mobileNumber": req.body.mobileNumber, "status": "ACTIVE", "userType": "RETAILER" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    console.log(result)
                    if (result.hasSignedUp == true && result.otpVerification == true) {
                        res.send({ responseCode: 402, responseMessage: "Mobile Number already exists.", signUpStatus: result.hasSignedUp })
                    }
                    else {
                        if (result.hasSignedUp == false && result.otpVerification == true) {
                            res.send({ responseCode: 403, responseMessage: "Mobile Number already exists.Please redirect to signup.", signUpStatus: result.hasSignedUp })
                        }
                        else if (result.hasSignedUp == false && result.otpVerification == false) {
                            req.body.otp = commonFunction.getOTP();
                            req.body.otpTime = new Date().getTime();
                            commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Thankyou for registering with Lighthouse Enterprises as retailer. Your One Time Password is:- ${req.body.otp} . Please verify your otp.`, (snsOtpError, snOtp) => {
                                if (snsOtpError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var newOtpData = {
                                        "otp": req.body.otp,
                                        "otpTime": req.body.otpTime
                                    }
                                    userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: newOtpData }, { new: true }, (updationError, updation) => {
                                        if (updationError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                                        }
                                        else {
                                            res.send({ responseCode: 400, responseMessage: "Otp successfully sent to mobile Number", updation })
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
                else {
                    req.body.otp = commonFunction.getOTP();
                    req.body.otpTime = new Date().getTime();
                    commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Thankyou for registering with Lighthouse Enterprises as retailer. Your One Time Password is:- ${req.body.otp} . Please verify your otp.`, (smsErr, smsResult) => {
                        if (smsErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var data = {
                                "mobileNumber": req.body.mobileNumber,
                                "otp": req.body.otp,
                                "otpTime": req.body.otpTime,
                                "userType": "RETAILER"
                            }
                            var newSignupData = new userModel(data)
                            newSignupData.save((savedError, saved) => {
                                if (savedError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Successfully sent otp . Please verify your otp now .", saved })
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
     * Function Name :signUp
     * Description   : signUp of retailer
     *
     * @return response
    */

    signUp: (req, res) => {
        var query = { mobileNumber: req.body.mobileNumber, status: "ACTIVE", hasSignedUp: true }
        userModel.findOne(query, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                var query1 = { email: req.body.email, status: { $ne: "DELETE" } }
                userModel.findOne(query1, (emailError, email) => {
                    if (emailError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (email) {
                        res.send({ responseCode: 402, responseMessage: "Email Id already exists." })
                    }
                    else {
                        userModel.findOne({ mobileNumber: req.body.mobileNumber }, (mobileError, userData) => {
                            if (mobileError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!userData) {
                                res.send({ responseCode: 404, responseMessage: "Mobile number not found" })
                            }
                            else {
                                martModel.findOne({ _id: req.body.martId, status: "ACTIVE" }, (ErrorMart, mart) => {
                                    if (ErrorMart) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!mart) {
                                        res.send({ responseCode: 404, responseMessage: "Mart not found" })
                                    }
                                    else {
                                        var otp = commonFunction.getOTP();
                                        var otpTime = new Date().getTime();
                                        console.log(">>>>>>69", otp, otpTime)
                                        console.log(">>>>>>>>>>89")
                                        commonFunction.sendMail(req.body.email, `Thankyou for registering Lighthouse Enterprises. Your One Time Password is:- ${otp} . Please verify your otp.`, (smsErr, smsResult) => {
                                            if (smsErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                function genReferral() {
                                                    const d = new Date()
                                                    let gentxnid = cryptoJs.SHA256(Math.floor((Math.random() * 2) + 1).toString() + d.getTime().toString())
                                                    return 'lth' + gentxnid.toString().substr(0, 6)
                                                }
                                                req.body.password = bcrypt.hashSync(req.body.password);
                                                configurationModel.findOne({ configType: "RETAILER" }, (configError, configs) => {
                                                    if (configError) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        var data = {
                                                            martName: mart.martName,
                                                            martId: req.body.martId,
                                                            shopName: req.body.shopName,
                                                            shopNumber: req.body.shopNumber,
                                                            floorNumber: req.body.floorNumber,
                                                            email: req.body.email,
                                                            password: req.body.password,
                                                            userType: "RETAILER",
                                                            retailerReferralCode: genReferral(),
                                                            otp: otp,
                                                            otpTime: otpTime,
                                                            otpVerification: false,
                                                            credit: configs.signupCredits,
                                                            hasSignedUp: true
                                                        }
                                                        userModel.findOneAndUpdate({ _id: userData._id }, { $set: data }, { new: true }, (saveErr, saveResult) => {
                                                            console.log(">>>>>94", saveErr, saveResult)
                                                            if (saveErr) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                var creditData = {
                                                                    retailerId: saveResult._id,
                                                                    credit: config.signupCredits,
                                                                    creditType: "SIGNUP CREDIT"
                                                                }
                                                                var newCreditData = new creditModel(creditData)
                                                                newCreditData.save(async (creditError, credited) => {
                                                                    if (creditError) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var adminData = await userModel.findOne({ userType: "ADMIN" })
                                                                        var obj = {
                                                                            retailerId: saveResult._id,
                                                                            notificationType: "ADMIN",
                                                                            userId: adminData._id,
                                                                            title: `RETAILER SIGNED UP.`,
                                                                            body: `Retailer ${saveResult.shopName} has signed up. Please accept or reject the retailer.`
                                                                        }
                                                                        var newObj = new notificationModel(obj)
                                                                        newObj.save((saveError, savedData) => {
                                                                            console.log(saveError, savedData)
                                                                            if (saveError) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                var html =
                                                                                    `My id is ${saveResult._id}`;
                                                                                QRCode.toDataURL(html, function (err2, result2) {
                                                                                    if (err2) {
                                                                                        res.send({ responseCode: 404, responseMessage: "something went wrong", err2 })
                                                                                    }
                                                                                    else {
                                                                                        commonFunction.uploadImage(result2, (err3, result3) => {
                                                                                            if (err3) {
                                                                                                res.send({ responseCode: 404, responseMessage: "internal server error", err3 })
                                                                                            }
                                                                                            else {
                                                                                                userModel.findOneAndUpdate({ _id: saveResult._id }, { $set: { qrCode: result3 } }, { new: true }, async (updationError, updation) => {
                                                                                                    if (updationError) {
                                                                                                        res.send({ responseCode: 404, responseMessage: "internal server error", err3 })
                                                                                                    }
                                                                                                    else {
                                                                                                        var token = jwt.sign({ id: saveResult._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                                                                                                        var adminData1 = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                                                                                        commonFunction.sendMail(adminData1.email, "RETAILER SIGNED UP.", async (adminMailError, adminMailed) => {
                                                                                                            if (adminMailed) {
                                                                                                                res.send({ responseCode: 200, responseMessage: "An OTP has been sent to your registered email address .Please verify", token })
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
            else {
                res.send({ responseCode: 400, responseMessage: "Mobile number already taken. Please check your phone number." })
            }
        })
    },


    /**
     * Function Name :otpVerify
     * Description   : otpVerify of user/retailer
     *
     * @return response
    */

    otpVerify: (req, res) => {
        try {
            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.mobileNumber },
                            { mobileNumber: req.body.mobileNumber }
                        ]
                    },
                    { status: { $in: ["ACTIVE", "BLOCK"] } },
                    { otp: req.body.otp },
                    { userType: { $in: ["USER", "RETAILER"] } },



                ]
            };
            userModel.findOne(query, (resultError, result) => {
                if (resultError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    if (result.otp == req.body.otp) {
                        var otpTime2 = new Date().getTime();
                        var diff = otpTime2 - result.otpTime;
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { otpVerification: true }, { new: true }, (verifyError, verified) => {
                                if (verifyError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Otp verified successfully." })
                                }
                            })
                        }
                    }
                    else {
                        res.send({ responseCode: 404, responseMessage: "Please enter correct otp." })
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
     * Description   : resendOTP of user/retailer
     *
     * @return response
    */

    resendOTP: (req, res) => {
        try {

            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.email },
                            { mobileNumber: req.body.email }
                        ]
                    },
                    { status: { $in: ["ACTIVE", "BLOCK"] } }
                ]
            };

            userModel.findOne(query, (err, result) => {
                console.log(err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp2 = commonFunction.getOTP();
                    var otpTime3 = new Date().getTime();
                    if (req.body.email == result.email) {
                        commonFunction.sendMail(req.body.email, `OTP for ${result.shopName} is:- ${otp2}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }, (errors, otpUpdate) => {
                                    if (errors) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otp2, SuccessMessage.EMAIL_SEND);
                                    }

                                })
                            }
                        })
                    }
                    else {
                        commonFunction.sendSMSOTPSNS(req.body.email, `OTP for ${result.shopName} is:- ${otp2}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.email, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }, (errors, otpUpdate) => {
                                    if (errors) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otp2, SuccessMessage.OTP_SEND);
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
     * Description   : forgotPassword for user/retailer
     *
     * @return response
    */

    forgotPassword: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email }, (err, result) => {
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
                        commonFunction.sendLink(req.body.email, result.firstName, result._id, (error, otpSent) => {
                            console.log(error, otpSent)
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (errors, otpUpdate) => {
                                    if (errors) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.EMAIL_SEND);
                                    }

                                })
                            }
                        })
                    }
                    else {
                        console.log("dddddddd")
                        commonFunction.sendSMS(req.body.mobileNumber, `Your otp is:- ${otp3}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.email, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (errors, otpUpdate) => {
                                    if (errors) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.OTP_SEND);
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
     * Description   : resetPassword for user/retailer
     *
     * @return response
    */

    resetPassword: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                console.log(result)
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var pass = bcrypt.hashSync(req.body.newPassword);
                    var query2 = (req.body.email == result.email) ? { email: req.body.email, status: "ACTIVE" } : { mobileNumber: req.body.email, status: "ACTIVE" }
                    userModel.findOneAndUpdate(query2, { $set: { password: pass } }, (error, updatePassword) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updatePassword, SuccessMessage.PASSWORD_UPDATE);
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
     * Function Name : login
     * Description   : myProfile for user/retailer
     *
     * @return response
    */


    login: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], loginStatus: "UNBLOCK" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    console.log(result)
                    if (result.otpVerification == true) {
                        var check = bcrypt.compareSync(req.body.password, result.password);
                        console.log(check)
                        if (!check) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }
                        else {
                            var token = jwt.sign({ id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                            var data = {
                                userId: result._id,
                                token: token,
                                retailerStatus: result.retailerStatus,
                                hasSignedUp: result.hasSignedUp
                            };
                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.LOGIN_SUCCESS);
                        }
                    }
                    else if (result.otpVerification == false) {
                        if (req.body.email) {
                            var otp3 = commonFunction.getOTP();
                            var otpTime4 = new Date().getTime();
                            commonFunction.sendMail(result.email, `Please verify your account for  Lighthouse Enterprises. Your One Time Password is:- ${otp3} . Please verify your otp.`, (smsErr, smsResult) => {
                                console.log(">>>>89", smsErr, smsResult)
                                if (smsErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: result._id }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true, multi: true }, (updateError, update) => {
                                        if (updateError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "OTP sent to your registered email address. Please verify your otp " })
                                        }
                                    })
                                }
                            })
                        }
                        else if (req.body.mobileNumber) {
                            var otpMob = commonFunction.getOTP();
                            var otpTimeNew = new Date().getTime();
                            commonFunction.sendSMSOTPSNS(result.mobileNumber, `Please verify your account for  Lighthouse Enterprises. Your One Time Password is:- ${otpMob} . Please verify your otp.`, (smsErr, smsResult) => {
                                console.log(">>>>89", smsErr, smsResult)
                                if (smsErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    console.log(result)
                                    userModel.findOneAndUpdate({ _id: result._id }, { $set: { otp: otpMob, otpTime: otpTimeNew } }, { new: true, multi: true }, (updateErrors, updated) => {
                                        if (updateErrors) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "OTP sent to your registered email address. Please verify your otp " })
                                        }
                                    })
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
     * Function Name :myProfile
     * Description   : myProfile for user/retailer
     *
     * @return response
    */

    myProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
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
     * Description   : changePassword for user/retailer
     *
     * @return response
    */

    changePassword: (req, res) => {
        try {
            userModel.findById({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var check = bcrypt.compareSync(req.body.password, result.password);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                    }
                    else {
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword);
                        userModel.findByIdAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (errs, updateResult) => {
                            if (errs) {
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
     * Function Name :assignManagerToRetailer
     * Description   : assignManagerToRetailer in retailer management
     *
     * @return response
    */

    'assignManagerToRetailer': (req, res) => {
        try {
            userModel.findOneAndUpdate({
                '_id': req.body.retailerId,
                userType: "RETAILER"
            }, {
                $set: {
                    assignManagerId: req.body.assignManagerId
                }
            }, {
                new: true
            }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                } else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.MANAGER_ASSIGN);
                }

            })
        }
        catch (error) {
            response(Res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :allRetailerLists
     * Description   : allRetailerLists in retailer management
     *
     * @return response
    */

    'allRetailerLists': (req, res) => {
        try {
            let query = {
                status: {
                    $ne: "DELETE"
                },
                userType: req.body.userType
            }
            if (req.body.retailerId) {
                query._id = req.body.retailerId
            }

            let option = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                populate: {
                    path: "assignManagerId",
                    select: "firstName"
                },
                select: "-password"
            }

            userModel.paginate(query, option, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == false) {
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



    //*********************************change Status forretailer**********************as well as for website approval ******/

    /**
     * Function Name :statusChange
     * Description   : statusChange in retailer management
     *
     * @return response
    */

    statusChange: (req, res) => {
        try {
            userModel.findByIdAndUpdate(
                req.body.userId, req.body, {
                new: true
            }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                } else {
                    return res.send({
                        responseCode: 200,
                        // response_message: status ? `User ${req.body.status.toLowerCase()} successfully.` :"User data updated successfully.",
                        responseMessage: "User data updated successfully."
                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    //**************************   Coupon list for particular retailer ****************************/

    /**
     * Function Name :couponsLists
     * Description   : couponsLists in coupon management
     *
     * @return response
    */

    couponsLists: (req, res) => {
        try {
            let todayEndTime = new Date().toISOString().split('T')[0] + 'T23:59:59.000Z'
            let todayStartTime = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z'

            let query = {
                status: {
                    $ne: 'DELETE'
                }
            }
            if (req.body.retailerId) {
                query.retailerId = req.body.retailerId
            }

            if (req.body.couponId) {
                query._id = req.body.couponId
            }
            if (req.body.couponStatus) {
                query.couponStatus = req.body.couponStatus;
            }

            if (req.body.appovalStatus) {
                query.$and = [{
                    appovalStatus: req.body.appovalStatus
                }, {
                    ExpiryDate: {
                        $gte: todayStartTime
                    }
                }]
            }

            if (req.body.fromDate && !req.body.toDate) {
                query.ExpiryDate = {
                    $gte: req.body.fromDate
                };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.ExpiryDate = {
                    $lte: req.body.toDate
                };
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                    ExpiryDate: {
                        $gte: req.body.fromDate
                    }
                }, {
                    ExpiryDate: {
                        $lte: req.body.ExpiryDate
                    }
                }];
            }

            if (req.body.isExpityTab == true || req.body.isExpityTab == "true") {
                query.ExpiryDate = {
                    $lte: todayEndTime
                }
            }

            let option = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                populate: [{
                    path: "categoryId",
                    select: "id"

                }, {
                    path: 'retailerId',
                    select: "id"
                }

                ]
            }

            retailerCouponModel.paginate(query, option, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == false) {
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
     * Function Name :couponTemplateList
     * Description   : couponTemplateList in coupon templates
     *
     * @return response
    */

    couponTemplateList: (req, res) => {
        try {
            couponTemplate.find({}, (err, result) => {
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
     * Function Name :addCoupon
     * Description   : addCoupon in website
     *
     * @return response
    */

    // addCoupon: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, userType: "RETAILER", status: "ACTIVE" }, (err, result) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 let query={}
    //                 query.$or =[{title: req.body.title,couponCode:req.body.couponCode,status:"ACTIVE"}]
    //                 retailerCouponModel.findOne(query, (err, couponResult) => {
    //                     console.log(couponResult, err)
    //                     if (err) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (couponResult) {
    //                         if (couponResult.title == req.body.title) {
    //                             response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TITLE_EXIST);
    //                         }
    //                         else {
    //                             response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUPON_CODE_EXIST);
    //                         }
    //                     }
    //                     else {
    //                         commonFunction.uploadImage(req.body.image, async (err, imageResult) => {
    //                             if (err) {
    //                                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                             }
    //                             else {
    //                                 req.body.retailerId = req.userId;
    //                                 req.body.martId = result.martId;
    //                                 req.body.image = imageResult;
    //                                 new retailerCouponModel(req.body).save(async (saveErr, saveResult) => {
    //                                     if (saveErr) {
    //                                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                                     }
    //                                     else {
    //                                         var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
    //                                         commonFunction.sendMail(adminData.email, "RETAILER ADDED A COUPON.", async (adminMailError, adminMailed) => {
    //                                             if (adminMailed) {
    //                                                 var subAdminData = await userModel.findOne({ userType: "SUBADMIN", status: "ACTIVE" })
    //                                                 subAdminData.forEach(a => {
    //                                                     commonFunction.sendMail(a.email, "RETAILER ADDED A COUPON.", (subError, subResult) => {
    //                                                         if (subError) {
    //                                                             console.log({ responseCode: 404, responseMessage: "internal server error", err })
    //                                                         }
    //                                                         else {
    //                                                             console.log({ responseCode: 200, responseMessage: "mail send" })
    //                                                         }
    //                                                     })
    //                                                 })
    //                                                 response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.COUPON_ADD);

    //                                             }
    //                                         })
    //                                     }
    //                                 })
    //                             }
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },
    // addCoupon: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, userType: "RETAILER", status: "ACTIVE" }, (err, result) => {
    //             console.log("676========>", err, result)
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 var query = { $or: [{ title: req.body.title }, { couponCode: req.body.couponCode }], status: { $ne: "DELETE" } };
    //                 retailerCouponModel.findOne(query, (err, couponResult) => {
    //                     console.log("686=====>", err, couponResult)
    //                     if (err) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (couponResult) {
    //                         if (couponResult.title == req.body.title) {
    //                             response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TITLE_EXIST);
    //                         }
    //                         else {
    //                             response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUPON_CODE_EXIST);
    //                         }
    //                     }
    //                     else {
    //                         martModel.findOne({ _id: req.body.martId, status: "ACTIVE" }, (martErr, martResult) => {
    //                             console.log("690=====>", martResult.location)
    //                             if (martErr) {
    //                                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                             }
    //                             else if (!martResult) {
    //                                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //                             }
    //                             else {
    //                                 categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (catError, category) => {
    //                                     console.log(category)
    //                                     if (catError) {
    //                                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                                     }
    //                                     else if (!category) {
    //                                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //                                     }
    //                                     else {
    //                                         subCategoryModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE" }, (subError, subCategory) => {
    //                                             console.log(subCategory)
    //                                             if (subError) {
    //                                                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                                             }
    //                                             else if (!subCategory) {
    //                                                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //                                             }
    //                                             else {
    //                                                 commonFunction.uploadImage(req.body.image, (err, imageResult) => {
    //                                                     console.log("700=====>", err, imageResult)
    //                                                     if (err) {
    //                                                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                                                     }
    //                                                     else {
    //                                                         req.body.retailerId = req.userId;
    //                                                         req.body.image = imageResult;
    //                                                         var obj = new retailerCouponModel({
    //                                                             "title": req.body.title,
    //                                                             "retailerId": req.userId,
    //                                                             "martId": martResult._id,
    //                                                             "mobileNumber": req.body.mobileNumber,
    //                                                             "couponCode": req.body.couponCode,
    //                                                             "discount": req.body.discount,
    //                                                             "image": imageResult,
    //                                                             "itemType": req.body.itemType,
    //                                                             "itemName": req.body.itemName,
    //                                                             "brandName": req.body.brandName,
    //                                                             "couponStatus": req.body.couponStatus,
    //                                                             "shopName": req.body.shopName,
    //                                                             "couponAppliedOn": req.body.couponAppliedOn,
    //                                                             "floorNumber": req.body.floorNumber,
    //                                                             categoryDetails: [{
    //                                                                 categoryId: req.body.categoryId,
    //                                                                 categoryName: category.categoryName,
    //                                                                 categoryImage: category.image
    //                                                             }],
    //                                                             subCategoryDetails: [{
    //                                                                 subCategoryId: req.body.subCategoryId,
    //                                                                 subCategoryName: subCategory.subCategoryName,
    //                                                                 subCategoryImage: subCategory.image
    //                                                             }],
    //                                                             "ExpiryDate": req.body.ExpiryDate,
    //                                                             "restrictions": req.body.restrictions,
    //                                                             "oneTimeCoupon": req.body.oneTimeCoupon,
    //                                                             "Inside_Mart_Notifications": req.body.Inside_Mart_Notifications,
    //                                                             "outside_Mart_Notifications": req.body.outside_Mart_Notifications,
    //                                                             "shopPhoneNumber": req.body.shopPhoneNumber,
    //                                                             "location": martResult.location
    //                                                         })
    //                                                         obj.save((saveErr, saveResult) => {
    //                                                             if (saveErr) {
    //                                                                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                                                             }
    //                                                             else {

    //                                                                 response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.COUPON_ADD);
    //                                                             }
    //                                                         })
    //                                                     }
    //                                                 })
    //                                             }
    //                                         })
    //                                     }
    //                                 })
    //                             }
    //                         })
    //                     }//
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },


    submitCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "RETAILER", status: "ACTIVE" }, (err, result) => {
                console.log("676========>", err, result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var query = { $or: [{ title: req.body.title }, { couponCode: req.body.couponCode }], status: { $ne: "DELETE" } };
                    retailerCouponModel.findOne(query, (err2, couponResult) => {
                        console.log("686=====>", err2, couponResult)
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (couponResult) {
                            if (couponResult.title == req.body.title) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TITLE_EXIST);
                            }
                            else {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUPON_CODE_EXIST);
                            }
                        }
                        else {
                            martModel.findOne({ _id: req.body.martId, status: "ACTIVE" }, (martErr, martResult) => {
                                console.log("690=====>", martResult.location)
                                if (martErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!martResult) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                }
                                else {
                                    if (req.body.categoryId && !req.body.subCategoryId) {
                                        categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (catError, category) => {
                                            console.log(category)
                                            if (catError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (!category) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                            }
                                            else {
                                                let newApply;
                                                if (req.body.couponAppliedOn == "CATEGORY") {
                                                    newApply = category.categoryName
                                                }
                                                else if (req.body.couponAppliedOn == "SUBCATGEORY") {
                                                    newApply = subCategory.subCategoryName
                                                }

                                                commonFunction.uploadImage(req.body.image, (err22, imageResult) => {
                                                    console.log("700=====>", err22, imageResult)
                                                    if (err22) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        req.body.image = imageResult;
                                                        var obj = new retailerCouponModel({
                                                            "title": req.body.title,
                                                            "mobileNumber": req.body.mobileNumber,
                                                            "couponCode": req.body.couponCode,
                                                            "discount": req.body.discount,
                                                            "templateId": req.body.templateId,
                                                            "image": imageResult,
                                                            "itemType": req.body.itemType,
                                                            "itemName": req.body.itemName,
                                                            "brandName": req.body.brandName,
                                                            "couponStatus": req.body.couponStatus,
                                                            "shopName": req.body.shopName,
                                                            "retailerId": req.body.retailerId,
                                                            "couponAppliedOn": req.body.couponAppliedOn,
                                                            "AppliedOnName": newApply,
                                                            "floorNumber": req.body.floorNumber,

                                                            "categoryName": category.categoryName,
                                                            "categoryId": req.body.categoryId,
                                                            "categoryImage": category.image,
                                                            "categoryPriority": category.categoryPriority,
                                                            "productServiceType": category.productServiceType,


                                                            "martId": req.body.martId,
                                                            "martName": martResult.martName,
                                                            "martImage": martResult.images[0],
                                                            "radius": martResult.radius,


                                                            "ExpiryDate": req.body.ExpiryDate,
                                                            "restrictions": req.body.restrictions,
                                                            "oneTimeCoupon": req.body.oneTimeCoupon,
                                                            "Inside_Mart_Notifications": req.body.Inside_Mart_Notifications,
                                                            "outside_Mart_Notifications": req.body.outside_Mart_Notifications,
                                                            "shopPhoneNumber": req.body.shopPhoneNumber,
                                                            "location": martResult.location
                                                        })
                                                        obj.save(async (saveErr, saveResult) => {
                                                            console.log("765=======>", saveErr, saveResult)
                                                            if (saveErr) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                var linkData = `${global.gConfig.couponLink}/${saveResult._id}`
                                                                console.log("LINK DATA", linkData)
                                                                retailerCouponModel.findOneAndUpdate({ _id: saveResult._id }, { $set: { link: linkData } }, { new: true }, async (updtedError, updt) => {
                                                                    if (updtedError) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                                                        var subAdminData = await userModel.findOne({ _id: result.assignedManagerId, status: "ACTIVE" })
                                                                        commonFunction.sendMail(adminData.email, "Coupon added", (mailError, adminMailed) => {
                                                                            if (mailError) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                commonFunction.sendMail(subAdminData.email, "Coupon added", (subAdminError, subAdminMailed) => {
                                                                                    if (subAdminError) {
                                                                                        console.log("Error send mail to subadmin.")
                                                                                    }
                                                                                    else {
                                                                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.COUPON_ADD);
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
                                                //     }
                                                // })
                                            }
                                        })
                                    }
                                    else if (!req.body.categoryId && req.body.subCategoryId) {
                                        subCategoryModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE" }, (subError, subCategory) => {
                                            console.log(subCategory)
                                            if (subError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (!subCategory) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                            }
                                            else {
                                                let newApply;
                                                if (req.body.couponAppliedOn == "CATEGORY") {
                                                    newApply = category.categoryName
                                                }
                                                else if (req.body.couponAppliedOn == "SUBCATGEORY") {
                                                    newApply = subCategory.subCategoryName
                                                }
                                                commonFunction.uploadImage(req.body.image, (err22, imageResult) => {
                                                    console.log("700=====>", err22, imageResult)
                                                    if (err22) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        req.body.image = imageResult;
                                                        var obj = new retailerCouponModel({
                                                            "title": req.body.title,
                                                            "mobileNumber": req.body.mobileNumber,
                                                            "couponCode": req.body.couponCode,
                                                            "discount": req.body.discount,
                                                            "templateId": req.body.templateId,
                                                            "image": imageResult,
                                                            "itemType": req.body.itemType,
                                                            "itemName": req.body.itemName,
                                                            "brandName": req.body.brandName,
                                                            "couponStatus": req.body.couponStatus,
                                                            "shopName": req.body.shopName,
                                                            "retailerId": req.userId,
                                                            "couponAppliedOn": req.body.couponAppliedOn,
                                                            "AppliedOnName": newApply,
                                                            "floorNumber": req.body.floorNumber,
                                                            "subCategoryId": req.body.subCategoryId,
                                                            "subCategoryName": subCategory.subCategoryName,
                                                            "subCategoryPriority": subCategory.subCategoryPriority,

                                                            "martId": req.body.martId,
                                                            "martName": martResult.martName,
                                                            "martImage": martResult.images[0],
                                                            "radius": martResult.radius,


                                                            "ExpiryDate": req.body.ExpiryDate,
                                                            "restrictions": req.body.restrictions,
                                                            "oneTimeCoupon": req.body.oneTimeCoupon,
                                                            "Inside_Mart_Notifications": req.body.Inside_Mart_Notifications,
                                                            "outside_Mart_Notifications": req.body.outside_Mart_Notifications,
                                                            "shopPhoneNumber": req.body.shopPhoneNumber,
                                                            "location": martResult.location
                                                        })
                                                        obj.save(async (saveErr, saveResult) => {
                                                            console.log("765=======>", saveErr, saveResult)
                                                            if (saveErr) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                var linkData = `${global.gConfig.couponLink}/${saveResult._id}`
                                                                console.log("LINK DATA", linkData)
                                                                retailerCouponModel.findOneAndUpdate({ _id: saveResult._id }, { $set: { link: linkData } }, { new: true }, async (updtedError, updt) => {
                                                                    if (updtedError) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                                                        var subAdminData = await userModel.findOne({ _id: result.assignedManagerId, status: "ACTIVE" })
                                                                        commonFunction.sendMail(adminData.email, "Coupon added", (mailError, adminMailed) => {
                                                                            if (mailError) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                commonFunction.sendMail(subAdminData.email, "Coupon added", (subAdminError, subAdminMailed) => {
                                                                                    if (subAdminError) {
                                                                                        console.log("Error send mail to subadmin.")
                                                                                    }
                                                                                    else {
                                                                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.COUPON_ADD);
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
                                        //     }
                                        // })
                                    }
                                    else if (req.body.categoryId && req.body.subCategoryId) {
                                        categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (catError, category) => {
                                            console.log(category)
                                            if (catError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (!category) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                            }
                                            else {
                                                subCategoryModel.findOne({ _id: req.body.subCategoryId, status: "ACTIVE" }, (subError, subCategory) => {
                                                    console.log(subCategory)
                                                    if (subError) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else if (!subCategory) {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                    }
                                                    else {
                                                        let newApply;
                                                        if (req.body.couponAppliedOn == "CATEGORY") {
                                                            newApply = category.categoryName
                                                        }
                                                        else if (req.body.couponAppliedOn == "SUBCATGEORY") {
                                                            newApply = subCategory.subCategoryName
                                                        }
                                                        commonFunction.uploadImage(req.body.image, (err22, imageResult) => {
                                                            console.log("700=====>", err22, imageResult)
                                                            if (err22) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                req.body.image = imageResult;
                                                                var obj = new retailerCouponModel({
                                                                    "title": req.body.title,
                                                                    "mobileNumber": req.body.mobileNumber,
                                                                    "couponCode": req.body.couponCode,
                                                                    "discount": req.body.discount,
                                                                    "templateId": req.body.templateId,
                                                                    "image": imageResult,
                                                                    "itemType": req.body.itemType,
                                                                    "itemName": req.body.itemName,
                                                                    "brandName": req.body.brandName,
                                                                    "couponStatus": req.body.couponStatus,
                                                                    "shopName": req.body.shopName,
                                                                    "retailerId": req.userId,
                                                                    "couponAppliedOn": req.body.couponAppliedOn,
                                                                    "AppliedOnName": newApply,
                                                                    "floorNumber": req.body.floorNumber,

                                                                    "categoryName": category.categoryName,
                                                                    "categoryId": req.body.categoryId,
                                                                    "categoryImage": category.image,
                                                                    "categoryPriority": category.categoryPriority,
                                                                    "productServiceType": category.productServiceType,

                                                                    "subCategoryId": req.body.subCategoryId,
                                                                    "subCategoryName": subCategory.subCategoryName,
                                                                    "subCategoryPriority": subCategory.subCategoryPriority,

                                                                    "martId": req.body.martId,
                                                                    "martName": martResult.martName,
                                                                    "martImage": martResult.images[0],
                                                                    "radius": martResult.radius,


                                                                    "ExpiryDate": req.body.ExpiryDate,
                                                                    "restrictions": req.body.restrictions,
                                                                    "oneTimeCoupon": req.body.oneTimeCoupon,
                                                                    "Inside_Mart_Notifications": req.body.Inside_Mart_Notifications,
                                                                    "outside_Mart_Notifications": req.body.outside_Mart_Notifications,
                                                                    "shopPhoneNumber": req.body.shopPhoneNumber,
                                                                    "location": martResult.location
                                                                })
                                                                obj.save(async (saveErr, saveResult) => {
                                                                    console.log("765=======>", saveErr, saveResult)
                                                                    if (saveErr) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var linkData = `${global.gConfig.couponLink}/${saveResult._id}`
                                                                        console.log("LINK DATA", linkData)
                                                                        retailerCouponModel.findOneAndUpdate({ _id: saveResult._id }, { $set: { link: linkData } }, { new: true }, async (updtedError, updt) => {
                                                                            if (updtedError) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                                                                var subAdminData = await userModel.findOne({ _id: result.assignedManagerId, status: "ACTIVE" })
                                                                                commonFunction.sendMail(adminData.email, "Coupon added", (mailError, adminMailed) => {
                                                                                    if (mailError) {
                                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        commonFunction.sendMail(subAdminData.email, "Coupon added", (subAdminError, subAdminMailed) => {
                                                                                            if (subAdminError) {
                                                                                                console.log("Error send mail to subadmin.")
                                                                                            }
                                                                                            else {
                                                                                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.COUPON_ADD);
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
                                        })
                                    }
                                }
                            })
                        }//
                    })
                }
            })
        }
        catch (error) {
            console.log("1470=====>", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },




    saveCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "RETAILER", status: "ACTIVE" }, async (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    req.body.couponStatus = "SAVED"
                    if (req.body.image) {
                        req.body.image = await convertImage()
                    }
                    function convertImage() {
                        new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.image, (imageError, image) => {
                                if (imageError) {
                                    console.log("Error converting image.")
                                }
                                else {
                                    resolve(image)
                                }
                            })
                        })
                    }
                    new retailerSavedModel(req.body).save((saveErr, saveRes) => {
                        if (saveErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, ErrorCode.SuccessCode, saveRes, SuccessMessage.COUPON_ADD)
                        }

                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
     * Function Name :editCoupon
     * Description   : editCoupon in website
     *
     * @return response
    */

    editCoupon: (req, res) => {
        try {
            retailerCouponModel.findOne({ _id: req.body.couponId, status: "ACTIVE" }, (err, result) => {
                console.log("I am here", result)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    let query = { $or: [{ title: req.body.title }, { couponCode: req.body.couponCode }], status: { $ne: "DELETE" }, _id: { $ne: req.body.couponId } }
                    retailerCouponModel.findOne(query, (errs, couponResult) => {
                        console.log(errs)
                        if (errs) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (couponResult) {
                            if (couponResult.title == req.body.title) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TITLE_EXIST);
                            }
                            else {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUPON_CODE_EXIST);
                            }
                        }
                        else {
                            if (req.body.image) {
                                commonFunction.uploadImage(req.body.image, (err1, imageResult) => {
                                    if (err1) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.image = imageResult;
                                        retailerCouponModel.findOneAndUpdate({ _id: req.body.couponId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (erra, updateResult) => {
                                            if (erra) {
                                                console.log(erra)
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
                                retailerCouponModel.findOneAndUpdate({ _id: req.body.couponId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (errss, updateResult) => {
                                    if (errss) {
                                        console.log(errss)
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
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :couponStatus
     * Description   : couponStatus in website
     *
     * @return response
    */
    couponStatus: (req, res) => {
        try {
            retailerCouponModel.findByIdAndUpdate(req.body.couponId, req.body, { new: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    return res.send({
                        responseCode: 200,
                        response_message: req.body.couponStatus ? `Coupons ${req.body.couponStatus.toLowerCase()} successfully.` : "Coupons data updated successfully.",
                        result: result
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    verifySingleUseCoupon: (req, res) => {
        try {
            retailerCouponModel.findOne({ couponCode: req.body.couponCode, oneTimeCoupon: true, mobileNumber: { $elemMatch: { mobileNumber: req.body.mobileNumber } } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, err, ErrorMessage.INTERNAL_ERROR);
                    console.log(err)
                }
                else if (result) {
                    res.send({ responseCode: 402, responseMessage: `The coupon code ${req.body.couponCode} is already redeemed by ${req.body.mobileNumber}.` })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: `The coupon code ${req.body.couponCode} has not been redeemed by ${req.body.mobileNumber}. Do you want to redeem it now ? ` })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :singleUseCoupon
     * Description   : singleUseCoupon in website
     *
     * @return response
    */

    singleUseCoupon: (req, res) => {
        try {
            retailerCouponModel.findOne({ couponCode: req.body.couponCode, couponStatus: "PUBLISHED", oneTimeCoupon: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUPON_CODE_EXIST);
                }
                else {
                    var obj = {
                        mobileNumber: [{ mobileNumber: req.body.mobileNumber }]
                    };
                    retailerCouponModel.findOneAndUpdate({ _id: result._id }, { $set: obj }, { new: true }, (updationError, updation) => {
                        if (updationError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updation, SuccessMessage.DETAILS_GET);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    couponHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.couponStatus) {
            query.couponStatus = req.body.couponStatus
        }
        if (req.userId) {
            query.retailerId = req.userId
        }
        retailerCouponModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "Coupon not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", cuponData })
            }
        })
    },

    /**
     * Function Name :deleteCoupon
     * Description   : deleteCoupon in website
     *
     * @return response
    */

    deleteCoupon: (req, res) => {
        try {
            retailerCouponModel.findOneAndUpdate({ _id: req.body.couponId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewCoupon: (req, res) => {
        try {
            retailerCouponModel.findOne({ _id: req.params.couponId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAILS_GET);
                }
            })
        }
        catch (error) {
            throw error
        }
    },
    /**
     * Function Name :rechargeHistory
     * Description   : rechargeHistory of retailer in website
     *
     * @return response
    */

    rechargeHistory: (req, res) => {
        try {
            let query = { status: "ACTIVE" };
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            if (req.userId) {
                query.retailerId = req.userId
            }
            rechargeModel.paginate(query, options, (paginError, paginated) => {
                if (paginError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (paginated.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: "Recharge history not found" })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Recharge history fetched successfully", paginated })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewQrCode: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.retailerId, status: "ACTIVE" }, (error, result) => {
                console.log(error, result)
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var data = {
                        QRCode: result.qrCode, referralCode: result.retailerReferralCode
                    }
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    retailerListWithPagination: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" }, userType: "RETAILER" };

            if (req.body.martName) {
                query.martName = { $regex: req.body.martName, $options: 'i' }
            }
            if (req.body.shopName) {
                query.shopName = { $regex: req.body.shopName, $options: 'i' }
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            userModel.findOne(options, query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result.qrCode, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    topUpOfRetailer: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.retailerId, status: "ACTIVE", userType: "RETAILER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result.qrCode, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    paymentHistory: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };

            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            paymentModel.paginate(options, query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result.qrCode, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    paymentHistoryForCSV: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };

            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            paymentModel.paginate(options, query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result.qrCode, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    paymentHistoryForPDF: (req, res) => {
        try {
            paymentModel.find((error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result.qrCode, SuccessMessage.DETAILS_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    creditHistory: (req, res) => {
        let query = { status: "ACTIVE", retailerId: req.userId };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        creditModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "credit not found not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "credit history found successfully", cuponData })
            }
        })
    },

    addBusinessForRetailer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var obj = {
                        GSTIN: req.body.GSTIN,
                        registeredBusinessName: req.body.registeredBusinessName,
                        registeredBusinessPhoneNumber: req.body.registeredBusinessPhoneNumber,
                        addressProof: await uploadAddressProof(),
                        pinCode: req.body.pinCode,
                        city: req.body.city,
                        state: req.body.state,
                        address: req.body.address,
                        hasRegisteredBusiness: true,
                        retailerStatus: "PENDING REVIEW"
                    }
                    function uploadAddressProof() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadPDF(req.body.addressProof, (pdfError, pdfResult) => {
                                if (pdfError) {
                                    console.log("Internal server error", pdfError)
                                }
                                else {
                                    // console.log("PDF UPLOAD", pdfResult)
                                    resolve(pdfResult.secure_url)
                                }
                            })
                        })
                    }
                    userModel.findOneAndUpdate({ _id: retailerDetails._id }, { $set: obj }, { new: true, multi: true }, async (errorUpdation, updation) => {
                        console.log(updation, errorUpdation)
                        if (errorUpdation) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var adminData = await userModel.findOne({ userType: "ADMIN" })
                            var objs = {
                                userId: adminData._id,
                                title: `REGISTERED BUSINESS.`,
                                body: `${req.body.shopName} has submitted their registation details for approval.`
                            }
                            var newObj = new notificationModel(objs)
                            newObj.save((saveError, saved) => {
                                if (saveError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updation, SuccessMessage.DATA_SAVED)
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

    verifyMobile: (req, res) => {
        var otp2 = commonFunction.getOTP();
        var otpTime3 = new Date().getTime();
        commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Your otp for lightHouse enterprises is ${otp2}.Please verify your otp.`, (otpError, otpSuccess) => {
            if (otpError) {
                console.log("Error sending sms.")
            }
            else {
                userModel.findOneAndUpdate({ _id: req.userId, loginStatus: "UNBLOCK" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }, (errors, otpUpdate) => {
                    if (errors) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, otp2, SuccessMessage.EMAIL_SEND);
                    }

                })
            }
        })
    },
    manageGeneralInfo: (req, res) => {
        try {

            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    martModel.findOne({ _id: retailerDetails.martId, status: "ACTIVE" }, async (martError, martFound) => {
                        if (martError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!martFound) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var obj = {
                                shopName: req.body.shopName,
                                shopNumber: req.body.shopNumber,
                                floorNumber: req.body.floorNumber,
                                martName: martFound.martName,
                                martId: martFound._id,
                                mobileNumber: req.body.mobileNumber,
                                email: req.body.email,
                                GSTIN: req.body.GSTIN,
                                registeredBusinessName: req.body.registeredBusinessName,
                                registeredBusinessPhoneNumber: req.body.registeredBusinessPhoneNumber,
                                pinCode: req.body.pinCode,
                                city: req.body.city,
                                state: req.body.state,
                                address: req.body.address
                            }
                            function uploadAddressProof() {
                                return new Promise((resolve, reject) => {
                                    commonFunction.uploadPDF(req.body.addressProof, (pdfError, pdfResult) => {
                                        if (pdfError) {
                                            console.log("Internal server error", pdfError)
                                        }
                                        else {
                                            resolve(pdfResult.secure_url)
                                        }
                                    })
                                })
                            }
                            userModel.findOneAndUpdate({ _id: retailerDetails._id }, { $set: obj }, { new: true, multi: true }, (errorUpdation, updation) => {
                                console.log(updation, errorUpdation)
                                if (errorUpdation) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updation, SuccessMessage.DATA_SAVED)
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


    addWebsite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, async (dataError, retailerData) => {
                console.log("I am here", retailerData)
                if (dataError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    websiteModel.findOne({ retailerId: req.userId }, async (webError, websiteData) => {
                        if (webError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!websiteData) {
                            console.log("I am too")
                            var data = {
                                webSiteImages: await convertImage(),
                                retailerId: req.userId,
                                basicInformation: req.body.basicInformation,
                                aboutUs: req.body.aboutUs,
                                shopTiming: req.body.shopTiming,
                                productServiceDetails: req.body.productServiceDetails
                            }
                            var websiteData1 = new websiteModel(data)
                            websiteData1.save(async (saveError, saved) => {
                                if (saveError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    console.log("IIIIUIIIHIdjksbkjadsf")
                                    var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                    commonFunction.sendRejectionMail(adminData.email, "RETAILER HAS ADDED HIS WEBSITE.", `The retailer ${retailerData.shopName} has added his website . Please approve or reject this website`, async (adminMailError, adminMailed) => {
                                        if (adminMailed) {
                                            console.log("IIIIUIIIHIdjksbkjadsf")
                                            var subAdminData = await userModel.findOne({ _id: retailerData.assignedManagerId })
                                            console.log("I am here<<<<<<777799", subAdminData)
                                            commonFunction.sendRejectionMail(subAdminData.email, "RETAILER HAS ADDED HIS WEBSITE.", `The retailer ${retailerData.shopName} has added his website . Please approve or reject this website`, (subError, subResult) => {
                                                console.log("im ages")
                                                if (subError) {
                                                    res.send({ responseCode: 500, responseMessage: "internal server error", subError })
                                                }
                                                else {
                                                    console.log(":I aaaaaa")
                                                    var obj = {
                                                        retailerId: retailerData._id,
                                                        userId: retailerData.assignedManagerId,
                                                        title: `RETAILER WEBSITE SUBMISSION.`,
                                                        body: `Retailer ${saved.shopName} has signed up. Please accept or reject the retailer.`
                                                    }
                                                    var newObj = new notificationModel(obj)
                                                    newObj.save((saveErrors, savedData) => {
                                                        console.log("im ages")
                                                        if (saveErrors) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            console.log("im ages")
                                                            userModel.findOneAndUpdate({ _id: req.userId }, { $set: { retailerImages: saved.webSiteImages, websiteStatus: "PENDING REVIEW" } }, { new: true }, (updationError, updation) => {
                                                                if (updationError) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    res.send({ responseCode: 200, responseMessage: "Website added successfully." })
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
                        else {
                            var data1 = {
                                webSiteImages: await convertImage(),
                                retailerId: req.userId,
                                basicInformation: req.body.basicInformation,
                                aboutUs: req.body.aboutUs,
                                shopTiming: req.body.shopTiming,
                                productServiceDetails: req.body.productServiceDetails
                            }
                            websiteModel.findOneAndUpdate({ retailerId: req.userId }, { $set: data1 }, { new: true }, async (updateError, updated) => {
                                if (updateError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    console.log("I am assigned", retailerData)
                                    var adminData = await userModel.findOne({ userType: "ADMIN", status: "ACTIVE" })
                                    commonFunction.sendRejectionMail(adminData.email, "RETAILER HAS UPDATED HIS WEBSITE.", `The retailer ${retailerData.shopName} has added his website . Please approve or reject this website.`, async (adminMailError, adminMailed) => {
                                        if (adminMailed) {
                                            console.log("I am here<<<<<<99", retailerData)
                                            // var managerData = await userModel.findOne({ _id: retailerData.assignedManagerId })
                                            // console.log("I am here<<<<<<99", retailerData)
                                            commonFunction.sendRejectionMail("no-bablumishra@mobiloitte.com", "RETAILER HAS UPDATED HIS WEBSITE.", `The retailer ${retailerData.shopName} has added his website . Please approve or reject this website`, (subError, subResult) => {
                                                if (subError) {
                                                    console.log({ responseCode: 404, responseMessage: "internal server error", err })
                                                }
                                                else {
                                                    console.log({ responseCode: 200, responseMessage: "mail send" })
                                                }
                                            })
                                            userModel.findOneAndUpdate({ _id: req.userId }, { $set: { retailerImages: updated.webSiteImages } }, { new: true }, (updationError, updation) => {
                                                if (updationError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Website added successfully." })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        function convertImage() {
                            return new Promise((resolve, reject) => {
                                commonFunction.uploadMultipleImage(req.body.webSiteImages, (error, result) => {
                                    console.log(result, "IAMHERE")
                                    if (error) {
                                        console.log(error)
                                    }
                                    else {
                                        resolve(result)
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


    viewWebsite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    websiteModel.findOne({ retailerId: req.userId }, async (martError, martFound) => {
                        console.log(martFound, martError)
                        if (martError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!martFound) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, martFound, SuccessMessage.DETAILS_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    websiteHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        websiteModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No website found for this retailer." })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Website found successfully.", cuponData })
            }
        })
    },

    payment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    req.body.orderId = genOrder()
                    function genOrder() {
                        const d = new Date()
                        let gentxnid = cryptoJs.SHA256(Math.floor((Math.random() * 2) + 1).toString() + d.getTime().toString())
                        return 'order' + gentxnid.toString().substr(0, 6)
                    }
                    req.body.appId = "14596f3c2ebbb0630235ddb0069541"
                    req.body.secretKey = "7a925cf13ca7acac24fc1e6adc96f5c0fe4659f5"
                    req.body.orderNote = "Signup Payment"
                    configurationModel.findOne({ configType: "RETAILER" }, (configError, configs) => {
                        if (configError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!configs) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            req.body.customerEmail = userData.email
                            req.body.customerPhone = userData.mobileNumber
                            var signupAmount = configs.retailerSignupAmount + (configs.retailerSignupAmount * configs.gstOnSignup / 100)
                            req.body.orderAmount = signupAmount
                            req.body.returnUrl = "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1507/api/v1/retailer/paymentStatus"
                            console.log(signupAmount)
                            var options = {
                                method: 'POST',
                                headers: [],
                                form: req.body,
                                url: 'https://test.cashfree.com/api/v1/order/create'
                            };
                            request(options, async function (error, response1, body) {
                                if (error) {
                                    res.send({ status: false, error })
                                }
                                else {
                                    console.log("i am all", body)
                                    let data = JSON.stringify(response1)
                                    let newData = await JSON.parse(data)
                                    console.log("I am here 12 .>>>>>", newData.body)
                                    let someData = await JSON.parse(newData.body)
                                    console.log(someData)
                                    if (someData.status == "ERROR") {
                                        res.send({ responseCode: 500, responseMessage: someData.reason })
                                    }
                                    else {
                                        console.log(userData.email)
                                        var paymentData = {
                                            retailerId: req.userId,
                                            transactionId: req.body.orderId,
                                            orderAmount: req.body.orderAmount,
                                            orderNote: "Signup Payment",
                                            customerEmail: userData.email,
                                            customerName: userData.firstName + " " + userData.lastName,
                                            customerPhone: userData.shopPhoneNumber,
                                            orderCurrency: 'INR',
                                            time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                                        }
                                        var obj = new paymentModel(paymentData)
                                        obj.save((saveError, saved) => {
                                            if (saveError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                
                                                res.send({ responseCode: 200, paymentLink: someData.paymentLink,saved })
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    viewPaymentHistory: (req, res) => {
        paymentModel.findOne({ _id: req.query.paymentId }, (error, resultts) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Payment status", resultts })
            }
        })
    },
    rechargePayment: (req, res) => {
        try {
            console.log(req.body)
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, userData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    req.body.orderId = genOrder()
                    function genOrder() {
                        const d = new Date()
                        let gentxnid = cryptoJs.SHA256(Math.floor((Math.random() * 2) + 1).toString() + d.getTime().toString())
                        return 'order' + gentxnid.toString().substr(0, 6)
                    }
                    req.body.appId = "14596f3c2ebbb0630235ddb0069541"
                    req.body.secretKey = "7a925cf13ca7acac24fc1e6adc96f5c0fe4659f5"
                    configurationModel.findOne({ configType: "RETAILER" }, (configError, configs) => {
                        if (configError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!configs) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            if (configs.minRechargeAmount > req.body.orderAmount) {
                                res.send({ responseCode: 401, responseMessage: `A minimum of ${configs.minRechargeAmount} is required for recharge.` })
                            }
                            else {
                                var rechrgeAmount = Number(req.body.rechargeAmount) + (req.body.rechargeAmount * configs.gstOnRecharge / 100)
                                req.body.orderAmount = rechrgeAmount
                                req.body.orderNote = "Recharge Payment"
                                req.body.customerEmail = userData.email
                                req.body.customerPhone = userData.mobileNumber
                                req.body.orderCurrency = "INR"
                                req.body.returnUrl = "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1507/api/v1/retailer/status"
                                var options = {
                                    method: 'POST',
                                    headers: [],
                                    form: req.body,
                                    url: 'https://test.cashfree.com/api/v1/order/create'
                                };
                                request(options, async function (error, response1, body) {
                                    if (error) {
                                        res.send({ status: false, error })
                                    }
                                    else {
                                        console.log("i am all", body)
                                        let data = JSON.stringify(response1)
                                        let newData = await JSON.parse(data)
                                        console.log("I am here 12 .>>>>>", newData.body)
                                        let someData = await JSON.parse(newData.body)
                                        console.log(someData)
                                        if (someData.status == "ERROR") {
                                            res.send({ responseCode: 500, responseMessage: someData.reason })
                                        }
                                        else {
                                            var paymentData = {
                                                retailerId: req.userId,
                                                transactionId: req.body.orderId,
                                                orderAmount: req.body.orderAmount,
                                                orderNote: "Recharge Payment",
                                                customerEmail: userData.email,
                                                customerName: userData.firstName + " " + userData.lastName,
                                                customerPhone: userData.mobileNumber,
                                                orderCurrency: 'INR',
                                                rechargeAmount: req.body.rechargeAmount,
                                                time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                                            }
                                            var obj = new paymentModel(paymentData)
                                            obj.save((saveError, saved) => {
                                                if (saveError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    var newObj = new rechargeModel(paymentData)
                                                    newObj.save((rechrError, rechrgeData) => {
                                                        if (rechrError) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            res.send({ responseCode: 200, paymentLink: someData.paymentLink, rechrgeData })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                });
                            }
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    status: (req, res) => {
            res.status(301).redirect("http://localhost:3000/Setting_retailer/Recharge")
        res.end()
    },

    paymentStatus: (req, res) => {
            res.status(301).redirect("http://localhost:3000/Setting_retailer/ManageGeneralInfo")
        res.end()
    },

    rechargeStatus: (req, res) => {
        rechargeModel.findOne({ _id: req.query.paymentId }, (error, resultts) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Payment status", resultts })
            }
        })
    },

    notificationList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var query = { retailerId: req.userId, status: "ACTIVE" }
                    notificationModel.find(query, (notifiError, notification) => {
                        console.log(notification)
                        if (notifiError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (notification.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Notifications found successfully.", notification })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },
    viewWebsites: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    websiteModel.findOne({ retailerId: req.userId }, async (martError, martFound) => {
                        console.log("FO1UND", martFound, martError)
                        if (martError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!martFound) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, martFound, SuccessMessage.DETAILS_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    clearNotification: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    notificationModel.findOneAndUpdate({ _id: req.body.notificationId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Notifications cleared successfuly", result })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    clearAll: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var query = { retailerId: req.userId, status: "ACTIVE" }
                    notificationModel.update(query, { $set: { status: "DELETE" } }, { new: true, multi: true }, (notifiError, notification) => {
                        if (notifiError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!notification) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Notifications cleared successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    getItembrandBysubcategory: (req, res) => {
        userModel.findOne({ _id: req.body.retailerId, status: "ACTIVE" }, (error, result) => {
            console.log(result)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                websiteModel.find({ retailerId: req.body.retailerId, "productServiceDetails.subCategoryId": req.body.subCategoryId }).select("productServiceDetails.itemType productServiceDetails.brand productServiceDetails.itemName").exec((errorCoup, results) => {
                    if (errorCoup) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (results.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "Item brand and Item type found successfully.", results })
                    }
                })
            }
        })
    },
    getWebsiteForRetailer: async (req, res) => {
        var configData = await configurationModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
        await console.log("852=====>", configData)
        var aggregate = retailerCouponModel.aggregate([{
            "$geoNear": {
                "near": {
                    type: "Point",
                    coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                },
                "maxDistance": configData.radiusEndUser,
                "distanceField": "dist.calculated",
                "includeLocs": "dist.location",
                "spherical": true
            }
        },
        { $match: { couponStatus: "PUBLISHED", status: "ACTIVE" } },

        { $match: { ExpiryDate: { $gte: new Date() } } },

        {
            $project: {
                retailerId: 1,
                shopName: 1,
                shopNumber: 1
            }
        },
        {
            $group:
            {
                _id: "$martId",
                details: { $push: "$$ROOT" },
                categoryId: { $addToSet: "$categoryId" }

            }
        },
            // { $unwind: "$details" },

        ])
        var options = {
            page: 1,
            limit: 5
        }
        console.log("AGGREGATE>>", aggregate)
        retailerCouponModel.aggregatePaginate(aggregate, options, async (err, result, pageCount, count) => {
            console.log("I AM HERE #@!$%%>>>", err, result[0].details)
            if (err) {
                res.send({ responseCode: 500, responseMessage: "Internal server error" });
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found" });
            }
            else {
                websiteModel.find({ retailerId: { $in: result[0].details.map(a => a.retailerId) } }, (websiteError, websiteData) => {
                    if (websiteError) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" });
                    }
                    else if (websiteData.length == 0) {
                        res.send({ responseCode: 401, responseMessage: "No website data found." })
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "website data found.", websiteData })
                    }
                })
            }
        })
    },

    getCategoriesByRetailer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, async (error, result) => {
            console.log(result)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                websiteModel.find({ retailerId: req.userId }).populate('productServiceDetails.categoryId').select("productServiceDetails[0].categoryId").exec((errorCoup, results) => {
                    if (errorCoup) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }

                    else {
                        // var categoryData = {
                        //     categoryName: results[0].productServiceDetails
                        // 
                        res.send({ responseCode: 200, responseMessage: "Data found successfully", results })
                    }
                })
            }
        })
    },

    getSubCategoriesByRetailer: (req, res) => {
        try {
            websiteModel.aggregate([
                { $match: { retailerId: mongoose.Types.ObjectId(req.body.retailerId), status: "ACTIVE" } },
                { $unwind: "$productServiceDetails" },
                { $match: { 'productServiceDetails.categoryId': req.body.categoryId } },
                {
                    $project: {
                        productServiceDetails: 1

                    }
                }
            ], (err1, result1) => {
                console.log("2589=======>", err1, result1)
                if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else {
                    // var productServiceDetails={
                    //     productServiceDetails:result1.productServiceDetail
                    // }
                    return res.send({ responseCode: 200, responseMessage: "Data found successfully", result1 })
                }

            })
        } catch (error) {
            console.log("2592=======", error)
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    getItemTypeByRetailer: (req, res) => {
        try {
            websiteModel.aggregate([
                { $match: { retailerId: mongoose.Types.ObjectId(req.body.retailerId), status: "ACTIVE" } },
                { $unwind: "$productServiceDetails" },
                { $match: { 'productServiceDetails.subCategoryId': mongoose.Types.ObjectId(req.body.subCategoryId) } },
                {
                    $project: {
                        productServiceDetails: 1

                    }
                }
            ], (err1, result1) => {
                console.log("2516=======>", err1, result1)
                if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else {
                    // var productServiceDetails={
                    //     productServiceDetails:result1.productServiceDetails

                    // }
                    return res.send({ responseCode: 200, responseMessage: "Data found successfully", result1 })
                }

            })
        } catch (error) {
            console.log("2592=======", error)
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    getBrandByRetailer: (req, res) => {
        try {
            websiteModel.aggregate([
                { $match: { retailerId: mongoose.Types.ObjectId(req.body.retailerId), status: "ACTIVE" } },
                { $unwind: "$productServiceDetails" },
                { $match: { 'productServiceDetails.subCategoryId': mongoose.Types.ObjectId(req.body.subCategoryId) } },
                {
                    $project: {
                        productServiceDetails: 1

                    }
                }
            ], (err1, result1) => {
                console.log("2589=======>", err1, result1)
                if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else {
                    // var productServiceDetails={
                    //     productServiceDetails:result1.productServiceDetails

                    // }
                    return res.send({ responseCode: 200, responseMessage: "Data found successfully", result1 })
                }

            })
        } catch (error) {
            console.log("2592=======", error)
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    getItemNameByRetailer: (req, res) => {
        try {
            websiteModel.aggregate([
                { $match: { retailerId: mongoose.Types.ObjectId(req.body.retailerId), status: "ACTIVE" } },
                { $unwind: "$productServiceDetails" },
                { $match: { 'productServiceDetails.subCategoryId': mongoose.Types.ObjectId(req.body.subCategoryId) } },
                {
                    $project: {
                        productServiceDetails: 1

                    }
                }
            ], (err1, result1) => {
                console.log("2589=======>", err1, result1)
                if (err1) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else {
                    // var productServiceDetails={
                    //     productServiceDetails:result1.productServiceDetails

                    // }
                    return res.send({ responseCode: 200, responseMessage: "Data found successfully", result1 })
                }

            })
        } catch (error) {
            console.log("2592=======", error)
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    },
    getAllSubCategoryByCategory: (req, res) => {
        subCategoryModel.find({ categoryId: req.body.categoryId, status: "ACTIVE" }, (error, result) => {
            if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (result.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", result })
            }
        })
    }














    //********************************************** End of Exports ********************************/
}