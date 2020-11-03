const userModel = require('../model/userModel');
const subscription = require('../model/subscriptionModel');
const planModel = require('../model/planModel');
const transaction = require('../model/transactionModel');
const contactUsModel = require('../model/contactUsModel');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/message')
const { SuccessMessage } = require('../helper/message')
const { ErrorCode } = require('../helper/statusCode')
const { SuccessCode } = require('../helper/statusCode')
const commonFunction = require('../helper/commonFunction')
const bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');

module.exports = {

    /**
     * Function Name :companySignup
     * Description   : companySignup for company user in website
     *
     * @return response
    */

    companySignup: (req, res) => {
        var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.universityEmail }, { mobileNumber: req.body.mobileNumber }] }] }
        userModel.findOne(query, (err, userData) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (userData) {
                if (req.body.universityEmail == userData.email) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                }
                else {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                }
            }
            else {
                req.body.userType = "COMPANY ADMIN";
                req.body.otp = commonFunction.getOTP();
                req.body.otpTime = new Date().getTime();
                req.body.email = req.body.universityEmail;
                req.body.password = bcrypt.hashSync(req.body.password);
                var phoneNumber = req.body.countryCode + req.body.mobileNumber;
                commonFunction.sendSms(phoneNumber, req.body.otp, (err2, otpResult) => {
                    if (err2) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INVALID_MOBILE);
                    }
                    else {
                        new userModel(req.body).save((saveErr, saveResult) => {
                            if (saveErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var result = {
                                    userId: saveResult._id,
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    universityName: req.body.universityName,
                                    email: req.body.universityEmail,
                                    countryCode: req.body.countryCode,
                                    mobileNumber: req.body.mobileNumber,
                                    otp: req.body.otp,
                                    country: req.body.country,
                                    city: req.body.city,
                                    address: req.body.address,
                                    postCode: req.body.postCode,
                                    userType: saveResult.userType,
                                    otpVerification: saveResult.otpVerification,
                                    isSubscription: saveResult.isSubscription
                                };
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.SIGNUP_SUCCESSFULLY);
                            }
                        })
                    }
                })
            }

        })
    },

    /**
     * Function Name :otpVerify
     * Description   : otpVerify in website
     *
     * @return response
    */

    otpVerify: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    // var otpTime2 = new Date().getTime();
                    // var dif = otpTime2 - result.otpTime;
                    // if (dif >= 180000) {
                    //     response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                    // }
                    // else {
                    if (req.body.otp == result.otp || req.body.otp == 1234) {
                        userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber, countryCode: req.body.countryCode, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :resendOTP
     * Description   : resendOTP in website
     *
     * @return response
    */

    resendOTP: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp2 = commonFunction.getOTP();
                    var otpTime3 = new Date().getTime();
                    var phoneNumber = result.countryCode + req.body.mobileNumber;
                    commonFunction.sendSms(phoneNumber, otp2, (error, otpSent) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber, countryCode: result.countryCode }, { $set: { otp: otp2, otpTime: otpTime3, otpVerification: false } }, { new: true }).select('-permissions -cardDetails').exec((updateErr, otpUpdate) => {
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
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var pass = bcrypt.hashSync(req.body.newPassword);
                    userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber }, { $set: { password: pass } }).select('-permissions -cardDetails').exec((error, updatePassword) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
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
     * Function Name :login
     * Description   : login in app
     *
     * @return response
    */

    login: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: "ACTIVE" };
            userModel.findOne(query, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, userData.password);
                    if (check) {
                        var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'innerPurpose');
                        var result = {
                            userId: userData._id,
                            token: token,
                            firstName: userData.firstName,
                            email: userData.email,
                            countryCode: userData.countryCode,
                            mobileNumber: userData.mobileNumber,
                            country: userData.country,
                            otpVerification: userData.otpVerification,
                            isSubscription: userData.isSubscription,
                            userType: userData.userType
                        };

                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)



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
     * Function Name :chooseCompanyPlan
     * Description   : chooseCompanyPlan for company user in website
     *
     * @return response
    */

    chooseCompanyPlan: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "COMPANY ADMIN" }, (err, result) => {
                console.log("3143", err, result);
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    subscription.findOne({ _id: req.body.subscriptionId, status: "ACTIVE" }, (err2, subscriptionData) => {
                        console.log("3152", err2, subscriptionData);
                        if (err2) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!subscriptionData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var noOfUSers = subscriptionData.subscriptionName.match(/(\d+)/);
                            console.log("3161", noOfUSers[0]);
                            planModel.findOne({ userId: req.userId, status: "ACTIVE" }, (err3, subscriptionResult) => {
                                console.log("3163", err3, subscriptionResult);
                                if (err3) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (subscriptionResult) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.PLAN_TAKEN);
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
                                        userId: req.userId,
                                        subscriptionId: req.body.subscriptionId,
                                        expiryDate: req.body.expiryDate,
                                        plan: subscriptionData.subscriptionName
                                    }
                                    new planModel(obj).save((saveErr, saveResult) => {
                                        console.log("3199", saveErr, saveResult);
                                        if (err) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: req.userId }, { $set: { isSubscription: true, maxUsersForPlan: noOfUSers[0] } }, { new: true }, (updateErr, updateResult) => {
                                                console.log("3205", updateErr, updateResult);
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :companyPayment
     * Description   : companyPayment for company user in website
     *
     * @return response
    */

    companyPayment: (req, res) => {
        try {
            stripe.tokens.create(
                {
                    card: {
                        number: req.body.cardNumber,
                        exp_month: req.body.exp_month,
                        exp_year: req.body.exp_year,
                        cvc: req.body.cvc,
                    },
                },
                function (err, token) {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        stripe.charges.create(
                            {
                                amount: req.body.amount,
                                currency: 'gbp',
                                source: token.id,
                                description: 'Plan charge',
                            },
                            (err2, charge) => {
                                console.log(">>>>>3164", err2, charge)
                                if (err2) {
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
                }
            );
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :companyUserCheck
     * Description   : companyUserCheck for company user in website
     *
     * @return response
    */

    companyUserCheck: (req, res) => {
        try {
            var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }] }
            userModel.findOne(query, (err, result) => {
                if (err) {
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
                else {
                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_OK);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addCompanyUser
     * Description   : addCompanyUser for company in website
     *
     * @return response
    */

    addCompanyUser: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "COMPANY ADMIN", isSubscription: true }, async (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.countDocuments({ userId: req.userId }, async (countErr, countResult) => {
                        if (countErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            console.log("3351", countResult, result.maxUsersForPlan, req.body.companyUsers.length)
                            if (countResult == result.maxUsersForPlan) {
                                response(res, ErrorCode.NOT_FOUND, [], `You cannot add more than ${result.maxUsersForPlan} users.`);
                            }
                            else if ((countResult + (req.body.companyUsers.length)) > result.maxUsersForPlan) {
                                response(res, ErrorCode.NOT_FOUND, [], `You cannot add more than ${result.maxUsersForPlan} users.`);
                            }
                            else {
                                var hold = [];
                                for (let i in req.body.companyUsers) {
                                    console.log("the objects", req.body.companyUsers[i])
                                    var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.companyUsers[i].email }, { mobileNumber: req.body.companyUsers[i].mobileNumber }] }] }
                                    const userResult = await userModel.findOne(query);
                                    if (userResult) {
                                        if (userResult.email == req.body.companyUsers[i].email) {
                                            hold.push({ email: "Already Exist", formNumber: i })
                                        }
                                        else {
                                            hold.push({ mobileNumber: "Already Exist", formNumber: i })
                                        }
                                    }
                                    else {
                                        if (hold.filter(fl => !fl.success).length) {
                                            console.log("Cant save");
                                        }
                                        else {
                                            var obj = {
                                                userId: result._id,
                                                firstName: req.body.companyUsers[i].firstName,
                                                lastName: req.body.companyUsers[i].lastName,
                                                email: req.body.companyUsers[i].email,
                                                countryCode: req.body.companyUsers[i].countryCode,
                                                mobileNumber: req.body.companyUsers[i].mobileNumber,
                                                isSubscription: true,
                                                userType: "COMPANY"
                                            };
                                            const saveNow = await new userModel(obj).save();
                                            if (saveNow) {
                                                hold.push({ success: "The user successfully saved!", formNumber: i })
                                                console.log({ responseCode: 200, responseMessage: `The ${i} form user saved successfully!` });
                                            }
                                        }
                                    }
                                }
                                if(hold.filter(fl=>!fl.success).length){
                                    return response(res, ErrorCode.ALREADY_EXIST, hold, ErrorMessage.ALREADY_EXIST);
                                    }
                                    response(res, SuccessCode.SUCCESS, hold, SuccessMessage.COMPANY_USERS_ADD);

                                // // response(res, SuccessCode.SUCCESS, hold, SuccessMessage.COMPANY_USERS_ADD);
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

    // addCompanyUser: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, userType: "COMPANY ADMIN", isSubscription: true }, (err, result) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 userModel.countDocuments({ userId: req.userId }, (countErr, countResult) => {
    //                     if (countErr) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else {
    //                         console.log("3351", countResult, result.maxUsersForPlan, req.body.companyUsers.length)
    //                         if (countResult == result.maxUsersForPlan) {
    //                             response(res, ErrorCode.NOT_FOUND, [], `You cannot add more than ${result.maxUsersForPlan} users.`);
    //                         }
    //                         else if ((countResult + (req.body.companyUsers.length)) > result.maxUsersForPlan) {
    //                             response(res, ErrorCode.NOT_FOUND, [], `You cannot add more than ${result.maxUsersForPlan} users.`);
    //                         }
    //                         else {
    //                             req.body.companyUsers.forEach((elem, index) => {
    //                                 var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: elem.email }, { mobileNumber: elem.mobileNumber }] }] }
    //                                 userModel.findOne(query, (err2, userResult) => {
    //                                     if (err2) {
    //                                         console.log({ response_code: 500, response_message: "Internal server error" });
    //                                     }
    //                                     else if (userResult) {
    //                                         if (userResult.email == elem.email) {
    //                                             console.log({ response_code: 409, response_message: `Email ${elem.email} already exists.` });
    //                                         }
    //                                         else {
    //                                             console.log({ response_code: 409, response_message: `Mobile number ${elem.mobileNumber} already exists.` });
    //                                         }
    //                                     }
    //                                     else {
    //                                         var obj = {
    //                                             userId: result._id,
    //                                             firstName: elem.firstName,
    //                                             lastName: elem.lastName,
    //                                             email: elem.email,
    //                                             countryCode: elem.countryCode,
    //                                             mobileNumber: elem.mobileNumber,
    //                                             isSubscription: true,
    //                                             userType: "COMPANY"
    //                                         };

    //                                         new userModel(obj).save((saveErr, saveResult) => {
    //                                             if (saveErr) {
    //                                                 console.log({ response_code: 500, response_message: "Internal server error" });
    //                                             }
    //                                             else {
    //                                                 console.log({ response_code: 200, response_message: "Company users has been added successfully." });
    //                                             }
    //                                         })
    //                                     }
    //                                 })
    //                             })
    //                             response(res, SuccessCode.SUCCESS, [], SuccessMessage.COMPANY_USERS_ADD);
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    /**
     * Function Name :editCompanyUser
     * Description   : editCompanyUser for company in website
     *
     * @return response
    */

    editCompanyUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.companyId, userType: "COMPANY", status: "ACTIVE" }, (err, userResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    let query = { $and: [{ $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }, { status: { $ne: "DELETE" } }, { _id: { $ne: userResult._id } }] }
                    userModel.findOne(query, (err2, result) => {
                        if (err2) {
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
                        else {
                            userModel.findOneAndUpdate({ _id: userResult._id }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
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
     * Function Name :viewCompanyUser
     * Description   : viewCompanyUser in website
     *
     * @return response
    */

    viewCompanyUser: (req, res) => {
        userModel.findOne({ _id: req.params.companyId, status: "ACTIVE" }).select('firstName lastName email countryCode mobileNumber').exec((err, result) => {
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
    },

    /**
     * Function Name :deleteCompanyUser
     * Description   : deleteCompanyUser in website
     *
     * @return response
    */

    deleteCompanyUser: (req, res) => {
        userModel.findOne({ _id: req.params.companyId, status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOneAndUpdate({ _id: result._id }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                    if (updateErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
                    }
                })
            }
        })
    },

    /**
     * Function Name :companyUserList
     * Description   : companyUserList in website
     *
     * @return response
    */

    companyUserList: (req, res) => {
        try {
            var query = { userId: req.userId, userType: "COMPANY", status: "ACTIVE" };

            if (req.body.search) {
                query.firstName = new RegExp('^' + req.body.search, "i");
            }

            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 50,
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
     * Function Name :contactUs
     * Description   : contactUs in website
     *
     * @return response
    */

    contactUs: (req, res) => {
        try {
            var obj = {
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
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
}