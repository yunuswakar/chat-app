const userModel = require('../model/userModel');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/messages')
const { SuccessMessage } = require('../helper/messages')
const { ErrorCode } = require('../helper/statusCodes')
const { SuccessCode } = require('../helper/statusCodes')
const commonFunction = require('../helper/commonFunction')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const salt = bcrypt.genSaltSync(10);
var mongoosePaginate = require('mongoose-paginate');
//const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');
const notificationModel = require("../model/notification")
const addTransactionModel = require('../model/transactionModel.js')
const transaction = require('../model/transaction.js');
const notification = require("../model/notification")
const contact = require("../model/contacts.js")
var BigNumber = require('big-number');
const mongoose = require('mongoose')
var Web3 = require('web3');
var web3Data = require('../controller/web3Data.js')
var web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/1c7b730f883e44f39134bc8a680efb9f');
let Tx = require('ethereumjs-tx');
const stripe=require("stripe")("sk_test_ZHansZT1CxkNml9BUCNZhTVG00fV4GVpBw");
/**
  * Function Name : signup
  * Description   : User signup 
  *
  * @return response
  */
const signup = async (req, res) => {
    try {
        console.log('aaaaa', req.body)
        var email1 = req.body.email.toLowerCase();
        stripe.accounts.create({
            type: 'custom',
            email: email1,
            country: 'US',
            requested_capabilities: ['card_payments','transfers'],
        }, (err, result) => {
            //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",err,result)
            if (err) {
                res.send({ responseCode: 500, responseMessage: "Internal server error", err })
            }
            else {
                var query = { $and: [{ status: { $in: ["ACTIVE", "BLOCKED"] } }, { $or: [{ email: email1 }, { mobileNumber: req.body.mobileNumber }, { userName: req.body.userName }] }] }
                // var query = { $and: [{ status: { $in: ["ACTIVE", "BLOCKED"] } }, { $or: [{ email: email1 }, { mobileNumber: req.body.mobileNumber }, { userName: req.body.userName }] }] }
                userModel.findOne(query, async (error, checkUserName) => {
                    if (error) {
                        response(res, 500, [], "Internal server error");
                    }
                    else if (checkUserName) {
                        req.body.password = bcrypt.hashSync(req.body.password, salt)
                        if (checkUserName && checkUserName.verifyOtp == false) {

                            var otp = commonFunction.getOTP();
                            console.log("ggggggggggggggg",otp)
                            req.body.otp = otp
                            let data = {
                                email: email1, mobileNumber: req.body.mobileNumber
                            }
                            // let check = await commonFunction.UserExist(data, checkUserName._id)
                            // console.log(check)
                            // if (!(check.status)) {
                            //     res.send(check)
                            // }
                            // else {
                            userModel.findByIdAndUpdate(checkUserName._id, req.body, { new: true }, (err1, result1) => {
                                if (err1) {
                                    response(res, 500, [], "Internal server error");
                                }
                                else if (!result1) {
                                    response(res, 400, [], "not found");
                                }
                                else {
                                    commonFunction.sendSms("Dear " + req.body.firstName + ", Please use "+ otp +" as your WalletApp OTP to complete your sign up.", req.body.mobileNumber, async (error, sendMessage) => {
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], "Please enter valid number");
                                        } else {
                                            var token = jwt.sign({ userId: result1._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                            var result = {
                                                userDetail: result1,
                                                token: token
                                            }
                                            response(res, 201, result, "SignUp successfully");
                                        }
                                    })
                                }
                            })
                            // }
                        }
                        else {
                            console.log(">>>>>>>>>91", checkUserName)
                            if (checkUserName.email == email1) {
                                res.send({ response_code: 404, response_message: "Email already exists", })
                            }
                            else if (checkUserName.mobileNumber == req.body.mobileNumber) {
                                res.send({ response_code: 404, response_message: "Mobile number already exists" })
                            }
                            else
                                if (checkUserName.userName == req.body.userName) {
                                    res.send({ response_code: 404, response_message: "User name already exists" })
                                }
                        }
                    }
                    else {
                        console.log("Body=>>>>>>>>>>>>>>>>", req.body)
                        req.body.password = bcrypt.hashSync(req.body.password, salt)
                        var number = req.body.mobileNumber;
                        var splitNumber = number.slice(1);
                        var otp = commonFunction.getOTP();
                        var data = {
                            userName: req.body.userName,
                            firstName: req.body.firstName,
                            middleName: req.body.middleName,
                            lastName: req.body.lastName,
                            email: email1,
                            country: req.body.country,
                            mobileNumber: req.body.mobileNumber,
                            splitMobileNumber: splitNumber,
                            password: req.body.password,
                            // otp: `use:<${otp}>`,
                            otp: otp,
                            countryCode: req.body.countryCode,
                            accountId: result.id,
                            socialId: req.body.socialId,
                            socialType: req.body.socialType
                        };
                        // commonFunction.sendSms("Dear " + req.body.firstName + "," + " " + " Your account is successfully signup  with having  otp verification : " + otp, req.body.mobileNumber, (error, sendMessage) => {
                        //     if (error) {
                        //         res.send({ response_code: 500, response_message: "Internal server error" })
                        //     }
                        //     else {
                        //         console.log("show me send message=>", sendMessage)
                        //     }
                        // })
                        console.log("Above sms")
                        commonFunction.sendSms("Dear " + req.body.firstName + ", Please use" + `<${otp}>`  + " as your WalletApp OTP to complete your sign up", req.body.mobileNumber, (error, sendMessage) => {
                            console.log("In sms=>>>>>>>>>>>", sendMessage, error)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], "Please enter valid number");
                            } else {
                                console.log("Before save data")
                                var obj = new userModel(data)
                                obj.save((error3, userSave) => {
                                    if (error3) {
                                        console.log("save data error")
                                        response(res, 500, [], "Internal server error");
                                    } else if (userSave) {
                                        console.log("save data token")
                                        var token = jwt.sign({ userId: userSave._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                        response(res, 201, { userDetail: userSave, token: token }, "SignUp successfully");
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }).catch(error => {
            res.send({ response_code: 400, response_message: "An error occurred with our connection to Stripe due to internet" })
        })
    }
    catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

//extra
const social = (req, res) => {
    try {
        userModel.findOne({ socialId: req.body.socialId, status: { $ne: "DELETED" } }, (error, checkUserName) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else {
                if (checkUserName) {
                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USERNAME_EXIST);
                } else {
                    var otp = commonFunction.getOTP();
                    req.body.otp = otp;
                    userModel.create(req.body, (error, userSave) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            var token = jwt.sign({ _id: userSave._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');

                            commonFunction.sendSms("Dear " + req.body.firstName + "," + " " + " Your account is successfully signup  with having  otp verification : " + otp, req.body.mobileNumber, (error, sendMessage) => {
                                console.log("give me otp=====>>", sendMessage)
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else {
                                    response(res, SuccessCode.OTP_SEND, { userDetail: userSave, token: token }, SuccessMessage.OTP_SEND);
                                }
                            })

                        }
                    })


                }
            }
        })
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

const socialLogin = (req, res) => {
    // if (!req.body.socialId || req.body.socialType)
    //     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    // else {
    userModel.findOne({ socialId: req.body.socialId, socialType: req.body.socialType, status: { $in: ["ACTIVE", "BLOCKED"] } }, (err, result) => {
        console.log("error is ==>>", err, req.body)
        if (err) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
        else if (!result) {
            response(res, 201, [], "Please signup first");
        }
        else {
            if (result.status == 'BLOCKED') {
                response(res, 404, [], ErrorMessage.BLOCKED_BY_ADMIN);
            }
            else {
                var token = jwt.sign({ _id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                response(res, SuccessCode.SUCCESS, { userDetail: result, token: token }, SuccessMessage.LOGIN_SUCCESS);
            }
        }
    })
    // }

}

/**
  * Function Name : login
  * Description   : Login with password and pin
  *
  * @return response
  */
// const login = (req, res) => {
//     try {
//         if (req.body.loginType == 'pin') {
//             console.log('userNameuserNameuserName',req.body.userName)
//             userModel.findOne({ userName: req.body.userName }, (error, userDetails) => {
//                 if (error) {
//                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                 } else if (userDetails) {
//                     if (userDetails.pin) {
//                         bcrypt.compare(req.body.password, userDetails.pin, (error, success) => {
//                             if (error) {
//                                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                             } else if (!success) {
//                                 response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
//                             } else if (userDetails.verifyOtp == false) {
//                                 response(res, SuccessCode.OTP_SEND, userDetails, SuccessMessage.OTP_SEND);
//                             } else {
//                                 var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
//                                 response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
//                             }
//                         })
//                     } else {
//                         response(res, SuccessCode.OTP_SEND, [], SuccessMessage.NO_PIN);
//                     }


//                 } else {
//                     response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
//                 }
//             })
//         } else {
//             userModel.findOne({ userName: req.body.userName }, (error, userDetails) => {
//                 if (error) {
//                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                 } else if (userDetails) {
//                     bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
//                         if (error) {
//                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                         } else if (!success) {
//                             response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
//                         } else if (userDetails.verifyOtp == false) {
//                             var otp = commonFunction.getOTP();
//                             userModel.findOneAndUpdate({ userName: req.body.userName }, { $set: { otp: otp } }, { multi: true }, (error, otpUpdate) => {
//                                 if (error) {
//                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                 } else {
//                                     commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, + userDetails.mobileNumber, (error, sendMessage) => {
//                                         if (error) {
//                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                         } else {
//                                             response(res, SuccessCode.OTP_SEND, otpUpdate, SuccessMessage.OTP_SEND);
//                                         }
//                                     })
//                                 }
//                             })

//                         } else {
//                             var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
//                             response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
//                         }
//                     })

//                 } else {
//                     response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
//                 }
//             })
//         }

//     } catch (error) {
//         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//     }
// }

/**
  * Function Name : setPin
  * Description   : Set the pin with user name
  *
  * @return response
  */
const setPin = (req, res) => {
    try {
        userModel.findOne({ userName: req.body.userName, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else if (userDetails) {
                req.body.pin = bcrypt.hashSync(req.body.pin, salt)
                userModel.findByIdAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { pin: req.body.pin } }, { new: true }, (error, pinUpdate) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        console.log("me hehre 304")
                        var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                        response(res, SuccessCode.SUCCESS, { token: token, pinUpdate }, SuccessMessage.PIN_SET);
                    }
                })
            } else {

                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
            }
        })
    } catch (error) {

        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

/**
  * Function Name : verifyOtp
  * Description   : Mobile number Verification of OTP , If type 1 before login mobile number verification if type 2 then after login change mobile number verification 
  *
  * @return response
  */
const verifyOtp = (req, res) => {
    try {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
              console.log("what is the user details=======>>>",userDetails.otp)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else if (userDetails) {
                if (req.body.type == 1) {//If type 1 before login mobile number verification
                    var checkOtp = userDetails.otp
                 
                    // if (req.body.otp == 1234 || checkOtp == 1234) {
                    if (req.body.otp == 1234 || req.body.otp == checkOtp) {
                        console.log("aaaaaaaaaaaaa",checkOtp)
                        userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { verifyOtp: true, otp: '' } }, { new: true }, (error, otpUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.VERIFY_OTP);
                            }
                        })
                    } else {
                        response(res, 201, [], SuccessMessage.INVALID_OTP);
                    }

                } else {//if type 2 then after login change mobile number verification
                    var checkOtp = userDetails.otp
                    if (req.body.otp == 1234 || req.body.otp == checkOtp) {
                        userModel.findOne({ mobileNumber: userDetails.tempMobileNumber, verifyOtp: true, _id: { $ne: req.body.userId }, status: { $ne: "DELETED" } }, (error, checkMobile) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

                            } else if (checkMobile) {
                                console.log('userDetailsuserDetails', checkMobile)
                                response(res, SuccessCode.SUCCESS, checkMobile, SuccessMessage.VERIFY_OTP);
                            } else {
                                userModel.findOneAndUpdate({ _id: checkMobile._id }, { $set: { mobileNumber: userDetails.tempMobileNumber, otp: '' } }, { new: true }, (error, otpUpdate) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    } else {
                                        response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.VERIFY_OTP);
                                    }
                                })
                            }
                        })
                    }
                }

            } else {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
            }
        })
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

/**
  * Function Name :resendOtponMail
  * Description   : Resend Otp on mail for reset pin
  *
  * @return response
  */
const resendOtpOnMail = (req, res) => {
    try {
        console.log("In resend on emaill->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                console.log('errorerror', error)
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else {
                if (userDetails) {
                    var otp = commonFunction.getOTP();
                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { otp: otp } }, { new: true }, (error, otpUpdate) => {
                        if (error) {
                            console.log('otpUpdateotpUpdate', error)
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            commonFunction.sendMail(userDetails.email, 'Forgot Password', userDetails.firstName, otp, (error, sendMail) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else {
                                    response(res, SuccessCode.OTP_SEND, [userDetails._id], SuccessMessage.OTP_SEND);
                                }
                            })
                        }
                    })
                } else {
                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
                }

            }
        })

    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

/**
  * Function Name :resendOtp
  * Description   : Resend Otp
  *
  * @return response
  */

const resendOtp = (req, res) => {
    try {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                console.log('errorerror', error)
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else {
                if (userDetails) {
                    var otp = commonFunction.getOTP();
                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { otp: otp } }, { new: true }, (error, otpUpdate) => {
                        if (error) {
                            console.log('otpUpdateotpUpdate', error)
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, userDetails.mobileNumber, (error, sendMessage) => {
                                if (error) {
                                    console.log('sendMessagesendMessagesendMessage', sendMessage)
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else {
                                    response(res, SuccessCode.OTP_SEND, otpUpdate, "OTP sent successfully");
                                }
                            })
                        }
                    })
                } else {
                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
                }

            }
        })

    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}
/**
  * Function Name :forgotPassword
  * Description   : Send Otp to registered mail
  *
  * @return response
  */
const forgotPassword = (req, res) => {
    try {
        userModel.findOne({ email: req.body.email, verifyOtp: true }, (error, userDetails) => {
            console.log("i am here 430", error, userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            }
            else if (!userDetails) {
                console.log("i am here 435")

                response(res, ErrorCode.NOT_FOUND, [], "You are not registered with us. Please signup first")
            }
            else if (userDetails.status == "BLOCKED") {
                res.send({ response_code: 400, response_message: "You are blocked by admin please contact Admin" })
            }

            else {
                console.log("i am here 442")

                var otp = commonFunction.getOTP();
                if (userDetails) {
                    userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { otp: otp } }, { new: true }, (error, otpUpdate) => {
                        if (error) {

                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            commonFunction.sendMail(req.body.email, 'Forgot Password', userDetails.firstName, otp, (error, sendMail) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else {
                                    response(res, SuccessCode.OTP_SEND, [userDetails._id], SuccessMessage.OTP_SEND);
                                }
                            })
                        }
                    })
                } else {
                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
                }

            }
        })
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

/**
  * Function Name :resetPassword
  * Description   :Upadted password
  *
  * @return response
  */
const resetPassword = (req, res) => {
    try {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else if (userDetails) {
                req.body.password = bcrypt.hashSync(req.body.password, salt)
                userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { password: req.body.password } }, { multi: true }, (error, otpUpdate) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.PASSWORD_UPDATE);
                    }
                })
            } else {
                response(res, SuccessCode.SUCCESS, userDetails, SuccessMessage.INVALID_OTP);
            }
        })
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}

/**
  * Function Name :userDetails
  * Description   :Get the user details
  *
  * @return response
  */
const userDetail = (req, res) => {
    try {
        userModel.findOne({ _id: req.params.userId }, (error, userDetails) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error, userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, error);
            } else if (!userDetails) {
                response(res, ErrorCode.NOT_FOUND, userDetails, ErrorMessage.NOT_FOUND);
            } else {
                response(res, 200, { userDetails }, "User details found successfully");
            }
        })
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}
/**
  * Function Name :userNameExist
  * Description   :Check user name exist or not
  *
  * @return response
  */
const userNameExist = (req, res) => {
    console.log("dsfdsfdsfds", req.body);
    reWhiteSpace = new RegExp(/^\s+$/);
    if (reWhiteSpace.test(req.body.userName)) {
        response(res, ErrorCode.BAD_REQUEST, [], 'Spaces not allowed');
    }
    else {
        userModel.findOne({ userName: req.body.userName, verifyOtp: { $ne: false }, status: { $ne: "DELETED" } }, (error, checkUserName) => {
            console.log("i am >>>>", error, checkUserName)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else if (checkUserName) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USERNAME_EXIST);

            }
            else {
                response(res, SuccessCode.SUCCESS, [], SuccessMessage.AUTHORIZATION);
            }
        })
    }
}

/**
  * Function Name :updateProfile
  * Description   :Update profile multipart api
  *
  * @return response
  */
//  const updateProfile = (req, res) => {
//     userModel.findOne({ email: req.locals['fields'].email[0], _id: { $ne: req.locals['fields'].userId[0] }, status: { $ne: "DELETED" } }, (error, checkUserName) => {
//         if (error) {
//             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//         } else if (checkUserName) {

//             response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.EMAIL_EXIST);
//         } else {
//             userModel.findOne({ mobileNumber: req.locals['fields'].mobileNumber[0], _id: { $ne: req.locals['fields'].userId[0] }, status: { $ne: "DELETED" } }, (error, checkMobile) => {
//                 if (error) {
//                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                 } else if (checkMobile) {
//                     response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.MOBILE_EXIST);
//                 } else {
//                     userModel.findOne({ _id: req.locals['fields'].userId[0] }, (error, userDetails) => {
//                         if (error) {
//                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                         } else {
//                             // check old mobile number and new mobile number both are same
//                             if (userDetails.mobileNumber == req.locals['fields'].mobileNumber[0]) {

//                                 if (Object.keys(req.locals['files']).length) {
//                                     var hostname = req.headers.host + '' + '/profileImage/';
//                                     commonFunction.writeImage(req.locals['files'].profilePic[0], Date.now() + '' + req.locals['files'].profilePic[0].originalFilename, '/public/profileImage/', (error, imageUrl) => {
//                                         if (error) {
//                                             console.log('errrrrrrr', error)
//                                         } else {
//                                             imageUrl = req.locals['files'].profilePic[0], Date.now() + '' + req.locals['files'].profilePic[0].originalFilename;
//                                             profilePicUrl = 'http://' + hostname + imageUrl;
//                                             var updateValue = {
//                                                 "email": req.locals['fields'].email[0],
//                                                 "mobileNumber": req.locals['fields'].mobileNumber[0],
//                                                 "firstName": req.locals['fields'].firstName[0],
//                                                 "lastName": req.locals['fields'].lastName[0],
//                                                 "middleName": req.locals['fields'].middleName[0],
//                                                 "profilePic": profilePicUrl
//                                             }
//                                             userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
//                                                 if (error) {
//                                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                                 } 
//                                                 else {
//                                                     response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.PROFILE_DETAILS);
//                                                 }
//                                             })
//                                         }
//                                     })
//                                 } else {
//                                     var updateValue = {
//                                         "email": req.locals['fields'].email[0],

//                                         "mobileNumber": req.locals['fields'].mobileNumber[0],
//                                         "firstName": req.locals['fields'].firstName[0],
//                                         "lastName": req.locals['fields'].lastName[0],
//                                         "middleName": req.locals['fields'].middleName[0]
//                                     }

//                                     userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
//                                         if (error) {
//                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                         } else {
//                                             response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.PROFILE_DETAILS);
//                                         }
//                                     })
//                                 }
//                             } else {// check old mobile number and new mobile number both are diffrence
//                                 var otp = commonFunction.getOTP();
//                                 // send OTP to register mobile number
//                                 commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, + req.locals['fields'].mobileNumber[0], (error, sendMessage) => {
//                                     if (error) {
//                                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                     } else {

//                                         // Check upload picture
//                                         if (Object.keys(req.locals['files']).length) {
//                                             var hostname = req.headers.host + '' + '/profileImage/';
//                                             commonFunction.writeImage(req.locals['files'].profilePic[0], Date.now() + '' + req.locals['files'].profilePic[0].originalFilename, '/public/profileImage/', (error, imageUrl) => {
//                                                 if (error) {
//                                                 } else {
//                                                     profilePicUrl = 'http://' + hostname + imageUrl;
//                                                     var updateValue = {
//                                                         "email": req.locals['fields'].email[0],

//                                                         "tempMobileNumber": req.locals['fields'].mobileNumber[0],
//                                                         "firstName": req.locals['fields'].firstName[0],
//                                                         "lastName": req.locals['fields'].lastName[0],
//                                                         "middleName": req.locals['fields'].middleName[0],
//                                                         "profilePic": profilePicUrl,
//                                                         "otp": otp
//                                                     }
//                                                     userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
//                                                         if (error) {
//                                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                                         } else {
//                                                             response(res, SuccessCode.OTP_SEND, userUpdate, SuccessMessage.OTP_SEND);
//                                                         }
//                                                     })
//                                                 }
//                                             })
//                                         } else {
//                                             var updateValue = {
//                                                 "email": req.locals['fields'].email[0],

//                                                 "tempMobileNumber": req.locals['fields'].mobileNumber[0],
//                                                 "firstName": req.locals['fields'].firstName[0],
//                                                 "lastName": req.locals['fields'].lastName[0],
//                                                 "middleName": req.locals['fields'].middleName[0],
//                                                 "otp": otp
//                                             }
//                                             userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
//                                                 if (error) {
//                                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
//                                                 } else {
//                                                     response(res, SuccessCode.OTP_SEND, userUpdate, SuccessMessage.OTP_SEND);
//                                                 }
//                                             })
//                                         }
//                                     }
//                                 })

//                             }
//                         }
//                     })

//                 }
//             })
//         }
//     })
// }


const updateProfile = (req, res) => {
    userModel.findOne({ email: req.body.email, _id: { $ne: req.body.userId }, status: { $ne: "DELETED" } }, (error, checkUserName) => {
        if (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        } else if (checkUserName) {

            response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.EMAIL_EXIST);
        } else {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, _id: { $ne: req.body.userId }, status: { $ne: "DELETED" } }, (error, checkMobile) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else if (checkMobile) {
                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.MOBILE_EXIST);
                } else {
                    userModel.findOne({ _id: req.body.userId }, (error, userDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            // check old mobile number and new mobile number both are same   
                            if (userDetails.mobileNumber == req.body.mobileNumber) {

                                if (req.body.image) {
                                    commonFunction.uploadImage(req.body.image, (error, imageUrl) => {
                                        if (error) {
                                            console.log('errrrrrrr', error)
                                        } else {
                                            var updateValue = {
                                                "email": req.body.email,
                                                //"mobileNumber": req.body.mobileNumber,
                                                "firstName": req.body.firstName,
                                                "lastName": req.body.lastName,
                                                "middleName": req.body.middleName,
                                                "profilePic": imageUrl
                                            }
                                            userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.PROFILE_DETAILS);
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    var updateValue = {
                                        "email": req.body.email,
                                        // "mobileNumber": req.body.mobileNumber,    
                                        "firstName": req.body.firstName,
                                        "lastName": req.body.lastName,
                                        "middleName": req.body.middleName
                                    }
                                    userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        } else {
                                            response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.PROFILE_DETAILS);
                                        }
                                    })
                                }
                            } else {// check old mobile number and new mobile number both are diffrence
                                var otp = commonFunction.getOTP();
                                // send OTP to register mobile number
                                commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, req.body.mobileNumber, (error, sendMessage) => {
                                    console.log("send message ===>>", sendMessage)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    } else {

                                        // Check upload picture
                                        if (req.body.image) {
                                            commonFunction.uploadImage(req.body.image, (error, imageUrl) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    var updateValue = {
                                                        "email": req.body.email,

                                                        // "mobileNumber": req.body.mobileNumber,
                                                        "firstName": req.body.firstName,
                                                        "lastName": req.body.lastName,
                                                        "middleName": req.body.middleName,
                                                        "profilePic": imageUrl,
                                                        "otp": otp
                                                    }
                                                    userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                        } else {
                                                            response(res, SuccessCode.OTP_SEND, userUpdate, SuccessMessage.OTP_SEND_MOBILE);
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            var updateValue = {
                                                "email": req.body.email,
                                                // "mobileNumber": req.body.mobileNumber,
                                                "firstName": req.body.firstName,
                                                "lastName": req.body.lastName,
                                                "middleName": req.body.middleName,
                                                "otp": otp
                                            }
                                            userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, SuccessCode.OTP_SEND, userUpdate, SuccessMessage.OTP_SEND_MOBILE);
                                                }
                                            })
                                        }
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
/**
  * Function Name :changePassword
  * Description   :Change Password
  *
  * @return response
  */

const changePassword = (req, res) => {

    if (!req.body.userId) {
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    } else {

        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            } else if (userDetails) {
                bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else if (!success) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                    }
                    else {
                        let salt = bcrypt.genSaltSync(10);
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)
                        let set = {
                            password: req.body.newPassword
                        }

                        userModel.findOneAndUpdate({ _id: req.body.userId }, set, { new: true }, (error, userUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                response(res, SuccessCode.SUCCESS, userUpdate, SuccessMessage.RESET_SUCCESS);
                            }
                        })
                    }
                })
            } else {
                response(res, ErrorCode.USER_FOUND, [], ErrorMessage.USER_FOUND);
            }
        })
    }
}


const verifyOtpUpdate = (req, res) => {
    userModel.findOne({ _id: req.body.userId, otp: req.body.otp }, (err, result) => {
        if (err) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        } else if (result) {
            {
                userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: { verifyOtp: true, otp: '', mobileNumber: req.body.mobileNumber } }, { new: true }, (err, result1) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        response(res, SuccessCode.SUCCESS, result1, SuccessMessage.VERIFY_OTP);
                    }
                })
            }
        } else {
            response(res, ErrorCode.UNAUTHORIZED, [], ErrorMessage.MISSING_PARAMETES);
        }
    })
}


const login = (req, res) => {
    try {
        if (req.body.loginType == 'pin') {
            userModel.findOne({ userName: req.body.userName, status: { $in: ["ACTIVE", "BLOCKED"] } }, (error, userDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (userDetails) {
                    if (userDetails.status == "BLOCKED") {
                        response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.BLOCKED_BY_ADMIN);
                    }
                    else {
                        var wait = new Date().getTime()
                        var waitTill = new Date().getTime() + 5 * 60 * 1000;
                        if (userDetails.login == false && wait >= userDetails.loginTime) {
                            if (userDetails.pin) {
                                bcrypt.compare(req.body.password, userDetails.pin, (error, success) => {
                                    console.log("error is =====>>>", error)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    } else if (!success) {
                                        if (userDetails.hitKey > 0) {
                                            userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $inc: { hitKey: -1 } }, (error1, result1) => {
                                                console.log("result1 is ===>>>>", result1)
                                                if (error1) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, ErrorCode.BAD_REQUEST, [], ErrorCode.VALID_PIN);
                                                }
                                            })
                                        } else if (userDetails.hitKey <= 0) {
                                            userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { login: false, loginTime: waitTill } }, { new: true }, (err, success1) => {
                                                console.log("success is ====>>", success1)
                                                if (err) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { login: true, hitKey: 5 } }, (error2, result2) => {
                                            console.log("result2 is ====>>", result2)
                                            if (error2) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            }
                                            else if (result2) {
                                                var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                                response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            } else {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                        }
                        else if (userDetails.login == true) {
                            if (userDetails.pin) {
                                console.log("i am here 933")
                                bcrypt.compare(req.body.password, userDetails.pin, (error, success) => {
                                    console.log("success is 934 =====>>>", success)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    } else if (!success) {
                                        if (userDetails.hitKey > 0) {
                                            userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $inc: { hitKey: -1 } }, { new: true }, (error1, result1) => {
                                                console.log("result1 is ===>>>>", result1)
                                                if (error1) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.VALID_PIN);
                                                }
                                            })
                                        } else if (userDetails.hitKey <= 0) {
                                            console.log("i am here 949")
                                            userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { login: false, loginTime: waitTill } }, { new: true }, (err, success1) => {
                                                console.log("success is 949 ====>>", success1)
                                                if (err) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.VALID_PIN);
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        var fit = {
                                            $set: { login: true, hitKey: 5 }
                                        }
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, fit, (error2, result2) => {
                                            console.log("result2 is ====>>", result2)
                                            if (error2) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            }
                                            else if (result2) {
                                                var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                                response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
                                            }
                                        })
                                    }
                                })
                            } else {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                        } else {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.BLOCK_LOGIN);
                        }
                    }
                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                }
            })
        }
        else {
            userModel.findOne({ userName: req.body.userName, status: { $in: ["ACTIVE", "BLOCKED"] } }, (error, userDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (userDetails) {
                    if (userDetails.status == "BLOCKED") {
                        response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.BLOCKED_BY_ADMIN);
                    }
                    else {
                        var wait = new Date().getTime()
                        var waitTill = new Date().getTime() + 5 * 60 * 1000;
                        if (userDetails.login == false && wait >= userDetails.loginTime) {
                            bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else if (!success) {
                                    if (userDetails.hitKey > 0) {
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $inc: { hitKey: -1 } }, (error1, result1) => {
                                            console.log("result1 is ===>>>>", result1)
                                            if (error1) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            } else {
                                                response(res, ErrorCode.BAD_REQUEST, [], ErrorCode.WRONG_PASSWORD);
                                            }
                                        })
                                    } else if (userDetails.hitKey <= 0) {
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { login: false, loginTime: waitTill } }, { new: true }, (err, success1) => {
                                            console.log("success is ====>>", success1)
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            }
                                            else {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.WRONG_PASSWORD);
                                            }
                                        })
                                    }
                                } else if (userDetails.verifyOtp == false) {
                                    var otp = commonFunction.getOTP();
                                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { otp: otp } }, { multi: true }, (error, otpUpdate) => {
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        } else {
                                            commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, userDetails.mobileNumber, (error, sendMessage) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, SuccessCode.NO_PIN, otpUpdate, ErrorMessage.USER_FOUND);
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    var fit = {
                                        $set: { login: true, hitKey: 5 }
                                    }
                                    userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, fit, (error2, result2) => {
                                        console.log("result2 is ====>>", result2)
                                        if (error2) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        }
                                        else if (result2) {
                                            var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                            response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
                                        }
                                    })
                                }
                            })
                        }
                        else if (userDetails.login == true) {
                            bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                } else if (!success) {
                                    if (userDetails.hitKey > 0) {
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $inc: { hitKey: -1 } }, (error1, result1) => {
                                            console.log("result1 is ===>>>>", result1)
                                            if (error1) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            } else {
                                                response(res, ErrorCode.BAD_REQUEST, [], ErrorCode.WRONG_PASSWORD);
                                            }
                                        })
                                    } else if (userDetails.hitKey <= 0) {
                                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, { $set: { login: false, loginTime: waitTill } }, { new: true }, (err, success1) => {
                                            console.log("success is ====>>", success1)
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                            }
                                            else {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.WRONG_PASSWORD);
                                            }
                                        })
                                    }
                                } else if (userDetails.verifyOtp == false) {
                                    var otp = commonFunction.getOTP();
                                    userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { otp: otp } }, { multi: true }, (error, otpUpdate) => {
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        } else {
                                            commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, userDetails.mobileNumber, (error, sendMessage) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                } else {
                                                    response(res, SuccessCode.NO_PIN, otpUpdate, ErrorMessage.USER_FOUND);
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    var fit = {
                                        $set: { login: true, hitKey: 5 }
                                    }
                                    userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE" }, fit, (error2, result2) => {
                                        console.log("result2 is ====>>", result2)
                                        if (error2) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                        }
                                        else if (result2) {
                                            var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                                            response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.BLOCK_LOGIN);
                        }
                    }
                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                }
            })

            //     userModel.findOne({ userName: req.body.userName, status: { $in: ["ACTIVE", "BLOCKED"] } }, (error, userDetails) => {
            //         if (error) {
            //             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            //         } else if (userDetails) {
            //             if (userDetails.status == "BLOCKED") {
            //                 response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.BLOCKED_BY_ADMIN);
            //             }
            //             else {
            //                 bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
            //                     if (error) {
            //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            //                     } else if (!success) {
            //                         response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
            //                     } else if (userDetails.verifyOtp == false) {
            //                         var otp = commonFunction.getOTP();
            //                         userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { otp: otp } }, { multi: true }, (error, otpUpdate) => {
            //                             if (error) {
            //                                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            //                             } else {
            //                                 commonFunction.sendSms("Dear " + userDetails.firstName + "," + " " + " Your OTP is : " + otp, userDetails.mobileNumber, (error, sendMessage) => {
            //                                     if (error) {
            //                                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            //                                     } else {
            //                                         response(res, SuccessCode.NO_PIN, otpUpdate, ErrorMessage.USER_FOUND);
            //                                     }
            //                                 })
            //                             }
            //                         })

            //                     } else {
            //                         var token = jwt.sign({ userId: userDetails._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
            //                         response(res, SuccessCode.SUCCESS, { userDetail: userDetails, token: token }, SuccessMessage.LOGIN_SUCCESS);
            //                     }
            //                 })
            //             }
            //     } else {
            //         response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
            //     }
            // })
        }
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}

const pinExists = (req, res) => {
    if (!req.body.userName) {
        response(res, ErrorCode.BAD_REQUEST, ErrorMessage.PARAMETERS_MISSING);
    }
    else {
        userModel.findOne({ userName: req.body.userName, status: "ACTIVE" }, (err, result) => {
            console.log("result is ====>>", result, err)
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            }
            else if (!result) {
                res.send({ responseCode: 400, responseMessage: "Please login" })
            }
            else if (result.pin) {
                console.log("success ======>>>", result.pin)
                response(res, SuccessCode.SUCCESS, [], SuccessMessage.PIN_EXISTS)
            }
            else {
                console.log("Not done")
                response(res, SuccessCode.OTP_SEND, [], ErrorMessage.USER_FOUND);
            }
        })
    }
}


const resetPin = (req, res) => {

    userModel.findOne({ _id: req.body.userId, verifyOtp: true, status: "ACTIVE" }, (error, result) => {
        if (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        } else if (result) {

            req.body.pin = bcrypt.hashSync(req.body.pin, salt)

            userModel.findOneAndUpdate({ _id: req.body.userId, verifyOtp: true, }, { $set: { pin: req.body.pin } }, { new: true }, (err, success) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else {
                    response(res, SuccessCode.SUCCESS, [success], SuccessMessage.PIN_RESET);
                }
            })
        } else {
            response(res, SuccessCode.SUCCESS, [], SuccessMessage.INVALID_OTP);
        }
    })


}


const isNumberValid = (req, res) => {
    try {
        if (req.body.search) {
            var query = {
                $and: [{ status: "ACTIVE" }, { userType: "USER" }, { _id: { $ne: req.body.userId } }]
            }
            userModel.find(query, (error, succ) => {
                console.log('>>>304>>>', error, req.body, succ)
                var result = _.filter(succ, _.matches({ "mobileNumber": req.body.search }));
                if (error) {
                    res.send({ response_code: 500, response_message: "Internal server error", err })
                } else if (succ.docs == false) {
                    res.send({ response_code: 404, response_message: "Number entered is not valid" })
                } else {
                    if (result.length == 0) {
                        let link = "xzy.com/...."
                        commonFunction.sendSms("Hi, looks like your friends are trying to send you money on WalletApp.Please download it here: " + link + "to accept", req.body.search, (error, sendMessage) => {
                            console.log("Request for msg send-", req.body)
                            if (error) {
                                console.log("Error in sending msg", error)
                                response(res, ErrorCode.SOMETHING_WRONG, [], "Please enter valid number");
                            } else {
                                console.log("sending msg succesfully", sendMessage)
                                res.send({ response_code: 404, response_message: "Number entered is not valid" })
                            }
                        })
                    } else {
                        res.send({ response_code: 200, response_message: "Data found successfully", result })
                    }
                }
            })
        } else {
            console.log('inside else>>>304>>>', req.body)
            res.send({ response_code: 200, response_message: "Invalid input" })
        }
    } catch (error) {
        res.send({ response_code: 404, response_message: "error in catch", error })
    }
}


const searchUser = (req, res) => {
    var query = {
        $and: [{
            $or: [{ "userName": { $regex: req.body.search, $options: 'i' } },
            { "firstName": { $regex: req.body.search, $options: 'i' } }]
        },
        { _id: { $ne: req.body.userId } },
        { userType: "USER" }, { status: "ACTIVE" },

        ]
    }
    //     
    userModel.find(query, (error, result2) => {
        console.log("result is====0678990", result2)
        if (error) {
            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (result2.length == 0) {
            res.send({ response_code: 400, response_message: "Not found " })
        }

        else {

            response(res, SuccessCode.SUCCESS, result2, "User searched successfully.");
        }
    })

}


const numberExists = (req, res) => {
    try {
        if (req.body.search == "+") {  // {  "search" : "+"   }
            console.log(">>>304>>>", req.body);
            var query = {
                $and: [
                    { mobileNumber: { $regex: ".*" + req.body.search + ".*" } },
                    { _id: { $ne: req.body.userId } }
                ]
            }

            userModel.find(query, (err, result) => {
                console.log(">>>>>>>>>>>>>>300>>>>>", err, result);
                if (err) {
                    res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        err
                    });
                } else if (result.docs == false) {
                    res.send({ response_code: 201, response_message: "Data not found" });
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Data found successfully",
                        result
                    });
                }
            }
            );
        } else { // {  "search" : "+9"   }
            console.log("inside else>>>304>>>", req.body);
            var number = req.body.search; //  number = req.body.search = +9
            console.log("number >>>>>100>>>", number);
            var splitNumber = number.slice(1);// splitnumber = 9
            console.log("splitNumber >>>>>102>>>", splitNumber);

            var query1 = {
                $and: [
                    { splitMobileNumber: { $regex: splitNumber } },
                    { _id: { $ne: req.body.userId } }
                ]
            }

            userModel.find(query1, (err, result) => {
                console.log(">>>>>>>>>>>>>>315>>>>>", err, result);
                if (err) {
                    res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        err
                    });
                } else if (result.docs == false) {
                    res.send({ response_code: 404, response_message: "Data not found" });
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Data found successfully",
                        result
                    });
                }
            });
        }
    } catch (error) {
        res.send({ response_code: 404, response_message: "error in catch", error });
    }
}

const notificationsList = (req, res) => {
    // let popObj = { path: 'notificationId', select: 'amount notification', match: { status: "PENDING" }};
    notificationModel.find({ userId: req.body.userId }).sort({ createdAt: -1 }).exec((err, result) => {
        if (err) {
            res.send({
                response_code: 500,
                response_message: "Internal server error",
                err
            });
        } else if (result.length == 0) {
            res.send({
                response_code: 200,
                response_message: "Data not found",
                result: []
            });
        } else {
            res.send({


                response_code: 200,
                response_message: " User notifications ",
                result: result
            });
        }
    })
}

const approveAndReject = (req, res) => {
    notificationModel.findOne({ userId: req.body.userId }, (err, result) => {      ///jisko request ki ja rahi hai
        console.log("userId is in notification ====>>", result)
        if (err) {
            res.send({
                response_code: 500,
                response_message: "Internal server error",
                err
            });
        } else if (!result) {
            res.send({
                response_code: 201,
                response_message: "Data not found"
            });
        } else {
            notificationModel.findOne({ _id: req.body.notificationId }, (err1, result1) => {
                //console.log("notification id is  RESULT1===8888 ===>>", result1)
                if (err1) {
                    res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        err
                    });
                }
                else if (!result1) {
                    res.send({
                        response_code: 201,
                        response_message: "Invalid notification Id"
                    });
                } else {
                    userModel.findOne({ _id: req.body.userId }, (err112, result112) => {  /// from request 
                     console.log("result of requested one is =====>>", result112)
                        if (err112) {
                            res.send({
                                response_code: 500,
                                response_message: "Internal server error",
                                err
                            });
                        } else {
                            userModel.findOne({ _id: result1.requestedId }, (errr, resultt) => {
                                console.log("333333333333333333", resultt)
                                if (errr) {
                                    res.send({
                                        response_code: 500,
                                        response_message: "Internal server error",
                                        err
                                    });
                                } else {
                                    if (req.body.status == "ACCEPTED") {
                                        // userModel.findOne({_id:},(err98,result98)=>{
                                        //     if(err98 || !result98){

                                        //     }
                                        // })
                                        if (result112.balance < result1.convertedAmount) {
                                            res.send({ response_code: 400, response_message: "Not enough balance to transfer" })
                                        }
                                        else {
                                            //  console.log("show me ammounttttttt====>>>", result1.amount)
                                            //  console.log("show me ammount converted====>>>", result1.convertedAmount)
                                            notificationModel.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "ACCEPTED", notifications: `${resultt.firstName}'s request was accepted for the amount ${result1.convertedAmount} ${result.receiverCurrency}` } }, { new: true }, (err11, result11) => {
                                                // console.log("tell me the accepted result", result11)
                                                if (err11) {
                                                    res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error",
                                                        err
                                                    });
                                                } else {
                                                    userModel.findOne({ _id: result11.requestedId }, (err111, result111) => { // requested to 
                                                        if (err111) {
                                                            res.send({ response_code: 500, response_message: "Internal server error" })
                                                        } else if (!result111) {
                                                            console.log("user not found  in 1440")
                                                            res.send({
                                                                response_code: 201,
                                                                response_message: "User not found"
                                                            });
                                                        } else {
                                                            ///////////start////////////////////
                                                            if (result111.country === result112.country) {
                                                                userModel.findOne({ userType: "ADMIN" }, (err45, result45) => {
                                                                    // console.log("show me the admin result =====>>>",result.conversionFee)
                                                                    if (err45) {
                                                                        response(res, 500, [], "Internal server error");
                                                                    }
                                                                    else if (!result45) {
                                                                        response(res, 400, [], "Not found");
                                                                    }
                                                                    else if (!result45.transactionFee && !result45.conversionFee) {
                                                                        response(res, 400, [], "Fee not set");
                                                                    }
                                                                    else {
                                                                        userModel.findOne({ _id: result112._id }, (err55, result55) => {
                                                                            //  console.log("result of sender is =====>>>", result55.balance)
                                                                            if (err55) {
                                                                                response(res, 500, [], "Internal server error");
                                                                            }
                                                                            else if (!result55) {
                                                                                response(res, 400, [], "Not found");
                                                                            }

                                                                            else {
                                                                                // console.log("show me notification amount-=====>>", result.amount)

                                                                                var cut = parseInt(result1.convertedAmount) + (result45.transactionFee / 100) * parseInt(result1.convertedAmount)
                                                                                //  console.log("cut amount is ====>>",cut)

                                                                                if (result55.balance < cut) {
                                                                                    //  console.log("dgjkhkhjklj=====================+++++++")
                                                                                    res.send({ response_code: 400, response_message: "Not enough balance" })
                                                                                }
                                                                                else {
                                                                                    var minus = parseInt(result1.convertedAmount) + (result45.transactionFee / 100) * parseInt(result1.convertedAmount)
                                                                                    console.log("minus amount is =====>>", minus, result1.convertedAmount, result45.transactionFee)
                                                                                    var query = result55.balance - minus
                                                                                    console.log("query result is =====>>>", query)

                                                                                    userModel.findByIdAndUpdate({ _id: result112._id }, { $set: { balance: result55.balance - minus, transfer: "Sender" }, }, { new: true }, (error, success) => {
                                                                                        // console.log("updated of from is ======>>>>", success)
                                                                                        if (error) {
                                                                                            response(res, 500, [], "Internal server error");
                                                                                        }
                                                                                        else {

                                                                                            userModel.findOne({ _id: result11.requestedId }, (error27, result27) => {
                                                                                                //  console.log("result of receiver is ======>>>", result27.balance)
                                                                                                if (error27) {
                                                                                                    response(res, 500, [], "Internal server error");
                                                                                                }
                                                                                                else if (!result27) {
                                                                                                    response(res, 400, [], "Not found");
                                                                                                }
                                                                                                else {
                                                                                                    var query1 = parseInt(result1.amount) + result27.balance
                                                                                                    //console.log("to available balance query ====>>", query1)

                                                                                                    userModel.findByIdAndUpdate({ _id: result11.requestedId }, { $set: { balance: parseInt(result1.amount) + result27.balance } }, { new: true }, (error2, result2) => {
                                                                                                        //  console.log("result is ====>>>", result2)
                                                                                                        if (error2) {
                                                                                                            response(res, 500, [], "Internal server error");
                                                                                                        }
                                                                                                        else {
                                                                                                            var showTransaction = new transaction({
                                                                                                                fromUserId: success._id,
                                                                                                                toUserId: result2._id,
                                                                                                                senderAmount: result.amount,
                                                                                                                toBalance: result2.balance,
                                                                                                                toEmail: result2.email,
                                                                                                                toUserName: result2.toUserName,
                                                                                                                toCountry: result2.country,
                                                                                                                toCountryCode: result2.countryCode,
                                                                                                                toMobileNumber: result2.mobileNumber,
                                                                                                                toFirstName: result2.firstName,
                                                                                                                toLastName: result2.lastName,
                                                                                                                toMiddleName: result2.middleName,
                                                                                                                toAccountId: result2.accountId,
                                                                                                                fromCountryAmount: result11.convertedAmount,
                                                                                                                toAvailableAccountBalance: result2.availableBalance,
                                                                                                                fromMessage: result1.message,
                                                                                                                transactionType: "RECEIVE",
                                                                                                                fromCountry: success.country
                                                                                                            })
                                                                                                            showTransaction.save((error28, result28) => {
                                                                                                                console.log("show222222222222222222===>>", result28)
                                                                                                                if (error28) {
                                                                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                }
                                                                                                                else if (!result28) {
                                                                                                                    res.send({ response_code: 400, response_message: "Not Found" })
                                                                                                                }
                                                                                                                else {
                                                                                                                    if (result28._id.toString() == undefined ||
                                                                                                                        result28.fromUserId.toString() == undefined ||
                                                                                                                        result28.toUserId.toString() == undefined ||
                                                                                                                        result28.senderAmount.toString() == undefined
                                                                                                                    ) {
                                                                                                                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>there is a undefined value in 1517")
                                                                                                                    } else {
                                                                                                                        let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
                                                                                                                        web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145", "pending").then(count => {
                                                                                                                            var amount = result28.senderAmount
                                                                                                                            var fromMessage = "This is transaction notification for same country "
                                                                                                                            var requestTo = result28.toUserId.toString()
                                                                                                                            var requestFrom = result28.fromUserId.toString()
                                                                                                                            var tranxId = result28._id.toString()
                                                                                                                            //  console.log("sh>>>>>>>>>>>>>>>>><<><>>><><><>><><><><><><>", amount, fromMessage, requestTo, requestFrom, tranxId)
                                                                                                                            // var chargeId = charge.id
                                                                                                                            var rawTransaction = {
                                                                                                                                "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
                                                                                                                                "gasPrice": web3.utils.toHex(10 * 1e9),
                                                                                                                                "gasLimit": web3.utils.toHex(1000000),
                                                                                                                                "to": web3Data.contractAddress,
                                                                                                                                "value": "0x0",
                                                                                                                                "data": contract.methods.setAllDetails(tranxId, requestFrom, requestTo, fromMessage, amount).encodeABI(),
                                                                                                                                "nonce": web3.utils.toHex(count)
                                                                                                                            }
                                                                                                                            var privateKey1 = "C60D6261B8CC6FF1910E1E1BE54591DA3AA2BE681564F2550767A630C0ADBB5B"
                                                                                                                            privateKey = new Buffer(privateKey1, 'hex');
                                                                                                                            var transaction1 = new Tx(rawTransaction)
                                                                                                                            transaction1.sign(privateKey)
                                                                                                                            web3.eth.sendSignedTransaction('0x' + transaction1.serialize().toString('hex'), (err2, hash) => {
                                                                                                                                //   console.log('error and hash=====>>>>>>>', err2, hash);
                                                                                                                                var hub = "https://ropsten.etherscan.io/tx/" + hash
                                                                                                                                if (err2) {
                                                                                                                                    response(res, 500, [], "Internal server error");
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                    transaction.findOneAndUpdate({ _id: result28._id }, { $set: { Url: hub } }, { new: true }, (error54, success54) => {
                                                                                                                                        if (error54) {
                                                                                                                                            res.send({ response_code: 500, response_message: "Internal server error" })
                                                                                                                                        }
                                                                                                                                        else if (!success54) {
                                                                                                                                            res.send({ response_code: 400, response_message: "Not found" })
                                                                                                                                        } else {
                                                                                                                                            commonFunction.pushNotification(result2.fcmToken, "you request has been approved for money", "Request Approved", "", (err23, result11) => {
                                                                                                                                                //  console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                                                                                                                if (err23) {

                                                                                                                                                    var notify = new notification({
                                                                                                                                                        requestedId: success._id,
                                                                                                                                                        userId: result2._id,
                                                                                                                                                        status: "ACCEPTED",
                                                                                                                                                        amount: result11.amount,
                                                                                                                                                        convertedAmount: result11.convertedAmount,
                                                                                                                                                        notificationType: "REQUEST",

                                                                                                                                                        notifications: ` ${result2.userName} request is accepted for ${result28.fromCountryAmount} ${result.receiverCurrency}`

                                                                                                                                                    })
                                                                                                                                                    notify.save((err117, result117) => {
                                                                                                                                                        if (err117) {
                                                                                                                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                                                        }
                                                                                                                                                        else if (!result117) {
                                                                                                                                                            console.log("Result not found")
                                                                                                                                                        }
                                                                                                                                                        else {

                                                                                                                                                            console.log("notification saved", result117)
                                                                                                                                                            console.log("Push notification detail>>");
                                                                                                                                                            //   res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                                                                                                                                        }
                                                                                                                                                    })


                                                                                                                                                    res.send({ response_code: 200, response_message: "Your request has been accepted successfully" })
                                                                                                                                                }
                                                                                                                                                else {

                                                                                                                                                    var notify = new notification({
                                                                                                                                                        requestedId: success._id,
                                                                                                                                                        userId: result2._id,
                                                                                                                                                        status: "ACCEPTED",
                                                                                                                                                        amount: result11.amount,
                                                                                                                                                        convertedAmount: result11.convertedAmount,
                                                                                                                                                        notificationType: "REQUEST",
                                                                                                                                                        notifications: ` ${result2.userName} request is accepted for ${result28.fromCountryAmount} `

                                                                                                                                                    })
                                                                                                                                                    notify.save((err117, result117) => {
                                                                                                                                                        if (err117) {
                                                                                                                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                                                        }
                                                                                                                                                        else if (!result117) {
                                                                                                                                                            console.log("Result not found")
                                                                                                                                                        }
                                                                                                                                                        else {

                                                                                                                                                            console.log("notification saved", result117)
                                                                                                                                                            console.log("Push notification detail>>");
                                                                                                                                                            //   res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                                                                                                                                        }
                                                                                                                                                    })


                                                                                                                                                    res.send({ response_code: 200, response_message: "Your request has been accepted successfully" })
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        }
                                                                                                                                    })
                                                                                                                                }
                                                                                                                            })
                                                                                                                        }).catch(error => { console.log("iam in 277>>>>>>>>>>>>>>>>>", error) })
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
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                            else {
                                                                userModel.findOne({ userType: "ADMIN" }, (err46, result46) => {
                                                                    //  console.log("show me the admin result =====>>>", result46.transactionFee)
                                                                    //  console.log("show me the admin result =====>>>", result46.conversionFee)
                                                                    if (err46) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else if (!result46) {
                                                                        response(res, 400, [], "Not found");
                                                                    }
                                                                    else if (!result46.transactionFee && !result46.conversionFee) {
                                                                        response(res, 400, [], "Fee not set");
                                                                    }
                                                                    else {
                                                                        userModel.findOne({ _id: result112._id }, (err3, result3) => {
                                                                            //  console.log("result of from =====>>>", result3)
                                                                            if (err3) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else if (!result3) {
                                                                                response(res, 400, [], "Not found");
                                                                            }
                                                                            else {
                                                                                var different = ((result46.transactionFee / 100) * result3.balance) + ((result46.conversionFee / 100) * result3.balance)
                                                                                console.log("show me difference======>>>", different)
                                                                                var cut1 = parseInt(result1.convertedAmount) + ((result46.transactionFee / 100) * parseInt(result1.convertedAmount)) + ((result46.conversionFee / 100) * parseInt(result1.convertedAmount))

                                                                                //  console.log("cut amount++++++++++++++ is ====>>", cut1)
                                                                                if (result3.balance < cut1) {
                                                                                    res.send({ response_code: 400, response_message: "Not enough balance in sender account" })
                                                                                }
                                                                                else {
                                                                                    var subtract = parseInt(result1.convertedAmount) + ((result46.transactionFee / 100) * parseInt(result1.convertedAmount)) + ((result46.conversionFee / 100) * parseInt(result1.convertedAmount))
                                                                                    //  console.log("tell me the answer=====>>>", subtract)
                                                                                    userModel.findByIdAndUpdate({ _id: result112._id }, { $set: { balance: result3.balance - subtract, transfer: "Sender" } }, { new: true }, (error4, success4) => {
                                                                                        //  console.log(" result  of updated  from is ======>>>>", success4)
                                                                                        if (error4) {
                                                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {

                                                                                            userModel.findOne({ _id: result11.requestedId }, (error5, result5) => {
                                                                                                //  console.log("result of send to ======>>>", result5.balance)
                                                                                                if (error5) {
                                                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else if (!result5) {
                                                                                                    response(res, 400, [], "Not found");
                                                                                                }
                                                                                                else {
                                                                                                    //   console.log("to available balance query ====>>", parseInt(result.amount) + result5.balance)
                                                                                                    userModel.findByIdAndUpdate({ _id: result11.requestedId }, { $set: { balance: parseInt(result1.amount) + result5.balance } }, { new: true }, (error6, result6) => {
                                                                                                        //    console.log("result of updated send to is ====>>>", result6)
                                                                                                        if (error6) {
                                                                                                            // console.log('error6error6error6', error6)
                                                                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                        }
                                                                                                        else {

                                                                                                            var showTransaction = new transaction({
                                                                                                                fromUserId: success4._id,
                                                                                                                toUserId: result6._id,
                                                                                                                senderAmount: result.amount,
                                                                                                                toBalance: result6.balance,
                                                                                                                toEmail: result6.email,
                                                                                                                toUserName: result6.toUserName,
                                                                                                                toCountry: result6.country,
                                                                                                                toCountryCode: result6.countryCode,
                                                                                                                toMobileNumber: result6.mobileNumber,
                                                                                                                toFirstName: result6.firstName,
                                                                                                                toLastName: result6.lastName,
                                                                                                                toMiddleName: result6.middleName,
                                                                                                                toAccountId: result6.accountId,
                                                                                                                fromCountryAmount: result11.convertedAmount,
                                                                                                                toAvailableAccountBalance: result6.availableBalance,
                                                                                                                fromMessage: result1.message,
                                                                                                                transactionType: "RECEIVE",
                                                                                                                fromCountry: success4.country

                                                                                                            })
                                                                                                            showTransaction.save((error27, result27) => {
                                                                                                                if (error27) {
                                                                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                }
                                                                                                                else if (!result27) {
                                                                                                                    res.send({ response_code: 400, response_message: "Not found" })
                                                                                                                }
                                                                                                                else {
                                                                                                                    let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
                                                                                                                    web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145", "pending").then(count => {
                                                                                                                        // console.log(".,,,,,,,,,,,,.,.,.,.,.,.,.,,.,.,.,", count, "asuytdraysrdasuydfyhafkdshkasf", result27)


                                                                                                                        var amount = result27.senderAmount
                                                                                                                        var fromMessage = "This is transaction notification for diffrent countries"
                                                                                                                        var requestTo = result27.toUserId
                                                                                                                        var requestFrom = result27.fromUserId
                                                                                                                        var tranxId = result27._id.toString()
                                                                                                                        // console.log("i am in>>>>>>>>>>>>>>>>>>>>", amount, fromMessage, requestTo, requestFrom, tranxId)

                                                                                                                        // var chargeId = charge.id

                                                                                                                        var rawTransaction = {
                                                                                                                            "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
                                                                                                                            "gasPrice": web3.utils.toHex(10 * 1e9),
                                                                                                                            "gasLimit": web3.utils.toHex(1000000),
                                                                                                                            "to": web3Data.contractAddress,
                                                                                                                            "value": "0x0",
                                                                                                                            "data": contract.methods.setAllDetails(tranxId, requestFrom, requestTo, fromMessage, amount).encodeABI(),
                                                                                                                            "nonce": web3.utils.toHex(count)
                                                                                                                        }
                                                                                                                        // console.log("i m in rawtranscation ",rawtransaction)

                                                                                                                        var privateKey1 = "C60D6261B8CC6FF1910E1E1BE54591DA3AA2BE681564F2550767A630C0ADBB5B"
                                                                                                                        privateKey = new Buffer(privateKey1, 'hex');
                                                                                                                        var transaction1 = new Tx(rawTransaction)
                                                                                                                        transaction1.sign(privateKey)
                                                                                                                        web3.eth.sendSignedTransaction('0x' + transaction1.serialize().toString('hex'), (err2, hash) => {

                                                                                                                            console.log('error and hash=====>>>>>>>', err2, hash);
                                                                                                                            var hub = "https://ropsten.etherscan.io/tx/" + hash
                                                                                                                            if (err2) {
                                                                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                console.log(",.,.,<><><><><><><><>>>>>>>>>>>>>>>>")

                                                                                                                                transaction.findOneAndUpdate({ _id: result27._id }, { $set: { Url: hub } }, { new: true }, (error5, success5) => {
                                                                                                                                    if (error5) {
                                                                                                                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                                                                                                                    }
                                                                                                                                    else if (!success5) {
                                                                                                                                        res.send({ response_code: 400, response_message: "Not found" })
                                                                                                                                    } else {
                                                                                                                                        console.log("show me t5he cc=========/'lxskcdkjopcfjd")
                                                                                                                                        commonFunction.pushNotification(result6.fcmToken, "your request has been approved for money", "Request Approved", "", (err23, result11) => {
                                                                                                                                            console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                                                                                                            if (err23) {
                                                                                                                                                let notify = new notification({
                                                                                                                                                    notificationType: "REQUEST",
                                                                                                                                                    requestedId: success4._id,
                                                                                                                                                    userId: result6._id,
                                                                                                                                                    status: "ACCEPTED",
                                                                                                                                                    amount: result27.senderAmount,
                                                                                                                                                    convertedAmount: result27.fromCountryAmount,
                                                                                                                                                    notifications: `${success4.userName} accepted for ${result27.fromCountryAmount} `
                                                                                                                                                })
                                                                                                                                                notify.save((notiErr, notiResult) => {
                                                                                                                                                    // console.log("notification error=======", notiErr)
                                                                                                                                                    if (notiErr) {
                                                                                                                                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                                                    }
                                                                                                                                                    else if (!notiResult) {
                                                                                                                                                        // console.log("Result not found")
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        // console.log("notification saved", notiResult)
                                                                                                                                                        console.log("Push notification detail>>");
                                                                                                                                                        //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                                                                                                    }
                                                                                                                                                })


                                                                                                                                                res.send({ response_code: 200, response_message: "Your request has been accepted successfully" })
                                                                                                                                            }
                                                                                                                                            else {

                                                                                                                                                let notify = new notification({
                                                                                                                                                    notificationType: "REQUEST",
                                                                                                                                                    requestedId: success4._id,
                                                                                                                                                    userId: result6._id,
                                                                                                                                                    status: "ACCEPTED",
                                                                                                                                                    amount: result27.senderAmount,
                                                                                                                                                    convertedAmount: result27.fromCountryAmount,
                                                                                                                                                    notifications: `${success4.userName} accepted for ${result27.fromCountryAmount} ${result27.senderCurrency} `
                                                                                                                                                })
                                                                                                                                                notify.save((notiErr, notiResult) => {
                                                                                                                                                    //    console.log("notification error=======", notiErr)
                                                                                                                                                    if (notiErr) {
                                                                                                                                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                                                                    }
                                                                                                                                                    else if (!notiResult) {
                                                                                                                                                        console.log("Result not found")
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        console.log("notification saved", notiResult)
                                                                                                                                                        // console.log("Push notification detail>>");
                                                                                                                                                        //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                                                                                                    }
                                                                                                                                                })


                                                                                                                                                res.send({ response_code: 200, response_message: "Your request has been accepted successfully" })
                                                                                                                                            }
                                                                                                                                        })
                                                                                                                                    }
                                                                                                                                })
                                                                                                                            }
                                                                                                                        })

                                                                                                                    }).catch(error => { console.log("iam in 277>>>>>>>>>>>>>>>>>", error) })


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

                                                                    }
                                                                })


                                                            }
                                                            //  })
                                                            // }
                                                            //  })
                                                            ////End/////////////////////////////////
                                                            commonFunction.sendMail(result112.email, "Accepted notification", result112.firstName, `${result112.firstName}'s request was accepted for the amount ${result1.amount} `, (error, sendMail) => {
                                                                if (error) {
                                                                    console.log("something went wrong in 1435")
                                                                } else {
                                                                    console.log("email successfully sent in 1437>>>>>>")
                                                                    // res.send({
                                                                    //     response_code: 200,
                                                                    //     response_message: "Request accepted successfully"
                                                                    // });
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                                // res.send({
                                                //     response_code: 200,
                                                //     response_message: "Request accepted successfully"
                                                // });
                                            })
                                        }
                                    }  ///// if accepted 
                                    else {
                                        console.log("tell ))))))))))))))))))) me the converted amout======346347564786", result.convertedAmount)
                                        notificationModel.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "REJECTED" }, notifications: `${resultt.firstName}'s request was rejected for the amount ${result1.convertedAmount} ` }, (err22, result22) => {
                                            if (err22) {
                                                res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error",
                                                    err
                                                });
                                            } else {
                                                userModel.findOne({ _id: result22.requestedId }, (err222, result222) => {
                                                    if (err222) {
                                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                                    } else if (!result222) {
                                                        // console.log("user not found in 1478")
                                                        res.send({
                                                            response_code: 201,
                                                            response_message: "User not found"
                                                        });
                                                    } else {
                                                        commonFunction.sendMail(result112.email, "Rejected notification", result112.firstName, `${result112.firstName}'s request was rejected for the amount ${result1.convertedAmount}`, (error, sendMail) => {
                                                            if (error) {
                                                                console.log("something went wrong in 1435")
                                                            } else {
                                                                console.log("email successfully sent in 1437>>>>>>")
                                                                commonFunction.pushNotification(result222.fcmToken, `Your request has been rejected for amount ${result1.convertedAmount}`, "Request rejected", "", (err23, result11) => {
                                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                                    if (err23) {
                                                                        let notify = new notification({
                                                                            notificationType: "REQUEST",
                                                                            requestedId: result112._id,        //result222._id,
                                                                            userId: result222._id,
                                                                            status: "REJECTED",
                                                                            amount: result1.amount,
                                                                            convertedAmount: result1.convertedAmount,
                                                                            notifications: `${result112.userName} rejected for amount ${result1.convertedAmount} ${result.senderCurrency} `
                                                                        })
                                                                        notify.save((notiErr, notiResult) => {
                                                                            /// console.log("notification error=======", notiErr)
                                                                            if (notiErr) {
                                                                                //  console.log("notification error=======", notiErr)
                                                                            }
                                                                            else if (!notiResult) {
                                                                                //  console.log("Result not found")
                                                                            }
                                                                            else {
                                                                                console.log("notification saved", notiResult)
                                                                                //  console.log("Push notification detail>>");
                                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                            }
                                                                        })


                                                                        // console.log("Notification successfully sent in 1818>>>>>>")
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Request rejected successfully"
                                                                        });
                                                                    }
                                                                    else {

                                                                        let notify = new notification({
                                                                            notificationType: "REQUEST",
                                                                            requestedId: result112._id,          //result222._id,
                                                                            userId: result222._id,
                                                                            status: "REJECTED",
                                                                            amount: result.amount,
                                                                            convertedAmount: result.convertedAmount,
                                                                            notifications: `${result112.userName} rejected for amount ${result1.convertedAmount} ${result.senderCurrency}`
                                                                        })
                                                                        notify.save((notiErr, notiResult) => {
                                                                            // console.log("notification error=======", notiErr)
                                                                            if (notiErr) {
                                                                                // console.log("internal server error===",notiErr)
                                                                            }
                                                                            else if (!notiResult) {
                                                                                // console.log("Result not found")
                                                                            }
                                                                            else {
                                                                                //  console.log("notification saved", notiResult)
                                                                                console.log("Push notification detail>>");
                                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                            }
                                                                        })
                                                                        // res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })


                                                                        // console.log("Notification successfully sent in 1825>>>>>>")
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Request rejected successfully"
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
                                }
                            })
                        }//hjgfjyhdsdgsf
                    })

                }

            })

        }
    })
}


const searchContact = (req, res) => {
    // var query =
    [{ "userName": { $regex: req.body.search, $options: 'i' } }]
    if (req.body.search == "+") {  // {  "search" : "+"   }
        console.log(">>>304>>>", req.body);
        var query = {
            $and: [
                { mobileNumber: { $regex: ".*" + req.body.search + ".*" } },

            ]
        }
        userModel.find(query, (err, result) => {
            console.log(">>>>>>>>>>>>>>300>>>>>", err, result);
            if (err) {
                res.send({
                    response_code: 500,
                    response_message: "Internal server error",
                    err
                });
            } else if (result.length == 0) {
                res.send({ response_code: 201, response_message: "Data not found" });
            } else {
                res.send({
                    response_code: 200,
                    response_message: "Data found successfully++++++++++++",
                    result
                });
            }
        });
    } else { // {  "search" : "+9"   }
        console.log("inside else>>>304>>>", req.body);
        var number = req.body.search;
        console.log("number >>>>>100>>>", number);
        var splitNumber = number.slice(1);
        console.log("splitNumber >>>>>102>>>", splitNumber);

        var query1 = {
            $and: [
                { splitMobileNumber: { $regex: splitNumber } },

            ]
        }

        userModel.find(query1, (err, result) => {
            console.log(">>>>>>>>>>>>>>315>>>>>", err, result);
            if (err) {
                res.send({
                    response_code: 500,
                    response_message: "Internal server error",
                    err
                });
            } else if (result.length == 0) {
                res.send({ response_code: 404, response_message: "Data not found" });
            } else {
                res.send({
                    response_code: 200,
                    response_message: "Data found successfully",
                    result
                });
            }
        });
    }
}

const addMoneyRequest = (req, res) => {
    try {
        console.log('ssssss===================', req.body);
        if (!req.body.userId) {
            res.send({ response_code: 400, response_message: "Parameters Missing" })
        }
        else {
            userModel.findOne({ _id: req.body.userId }, (error49, userDetails) => {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>2206",userDetails)
                if (error49) {
                    res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!userDetails) {
                    res.send({ response_code: 400, response_message: "Data not found" })
                }
                else {
                    userModel.findOne({ _id: req.body.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error3, vendorDetails) => {
                        console.log("result of request to is =====>>", vendorDetails)
                        if (error3) {
                            res.send({ response_code: 500, response_message: "Internal server error" })
                        }
                        else if (!vendorDetails) {
                            res.send({ response_code: 400, response_message: "Data not found" })
                        }
                        else {
                            let otp = commonFunction.getOTP();

                            var notify = new notification({
                                requestedId: req.body.userId,
                                status: "PENDING",
                                amount: req.body.amount,
                                senderCurrency: req.body.currency,
                                usdAmount: req.body.usdAmount,
                                notifications: ` ${userDetails.userName} requested for ${req.body.currency} ${req.body.amount}`,
                                vendorId: req.body.vendorId,
                                requestType: "CASH",
                                notificationType: "ADD",
                                 otp: otp
                            })
                            notify.save((err111, result111) => {
                                console.log("dffffffwwfefwefwff",notify)
                                if (err111)
                                    res.send({ response_code: 500, response_message: "Internal server error" })
                                else if (!result111)
                                    console.log("Result not found",notify)
                                else {

                                    commonFunction.sendRequestMoneyMail(userDetails.email, "OTP for Add Money", userDetails.firstName, otp, (error, sendMail) => {
                                        if (error) {
                                            console.log("something went wrong in mail")
                                        } else {
                                            console.log("email successfully sent in 1437>>>>>>----------")
                                            var message = `Hello , ${vendorDetails.firstName} \n the following WalletApp : ${userDetails.firstName} has just selected your services to Request the amount of ${req.body.currency?req.body.currency:''} ${req.body.amount}. The recipient can be reached at ${userDetails.splitMobileNumber}`
                                            commonFunction.sendMailToVendor(vendorDetails.email, "Notification",message, (error, vendorMail) =>{
                                                if(error){
                                                     res.send({responseCode:500,responseMessage:"Internal server error"})
                                                 }else{
                                                    res.send({ 
                                                        response_code: 200,
                                                        response_message: `Your request has been sent to ${vendorDetails.userName} successfully`
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
            })
        }
    }
    catch (error) {
        console.log("error", error)
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

const withdrawMoneyRequest = (req, res) => {
    try {
        if (!req.body.userId) {
            console.log("1")
            res.send({ response_code: 400, response_message: "Parameters Missing" })
        }
        else {
            userModel.findOne({ _id: req.body.userId }, (error, userDetails) => {
                if (error) {
                    console.log("2")
                    res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!userDetails) {
                    console.log("3")
                    res.send({ response_code: 400, response_message: "Data not found" })
                }
                else {
                    if (req.body.amount > userDetails.balance) {
                        res.send({ response_code: 400, response_message: "Insufficient Money" })
                    }
                    else {
                        userModel.findOne({ _id: req.body.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                            console.log("result of request to is =====>>", vendorDetails)
                            if (error) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            }
                            else if (!vendorDetails) {
                                console.log("4")
                                res.send({ response_code: 400, response_message: "Data not found" })
                            }
                            else {
                                console.log("5")
                                let otp = commonFunction.getOTP();
                                var notify = new notification({
                                    requestedId: req.body.userId,
                                    status: "PENDING",
                                    amount: req.body.amount,
                                    senderCurrency: req.body.currency,
                                    notifications: `${userDetails.userName} requested for ${req.body.amount} of cash`,
                                    vendorId: req.body.vendorId,
                                    requestType: "CASH",
                                    notificationType: "WITHDRAW",
                                    usdAmount: req.body.usdAmount,
                                    otp: otp
                                })
                                notify.save((err111, result111) => {
                                    if (err111) {
                                        console.log("6")
                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                    }
                                    else if (!result111) {
                                        console.log("Result not found")
                                    }
                                    else {
                                        console.log("7")
                                        commonFunction.sendRequestMoneyMail(userDetails.email, "OTP for Withdraw Money", userDetails.firstName, otp, (error, sendMail) => {
                                            if (error) {
                                                console.log("something went wrong in mail")
                                            } else {
                                                console.log("email successfully sent to user 1437>>>>>>")

                                                // commonFunction.sendVendorMail(userDetails.email, "Money Withdrawal Request", vendorDetails.firstName,`${userDetails.firstName} has transferred ${req.body.amount} to you for cash pick up. He can be reached at ${userDetails.splitMobileNumber}`, (error, sendMail) => {

                                                commonFunction.sendVendorNotiMail([userDetails.email, vendorDetails.email], "Money Withdrawal Request", vendorDetails.firstName, `${userDetails.firstName} has transferred ${req.body.amount} to ${vendorDetails.firstName} for cash pick up. He can be reached at ${userDetails.splitMobileNumber}`, (error, sendMail) => {
                                                    if (error) {
                                                        console.log("something went wrong in mail")
                                                    } else {
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: `Your request has been sent to ${vendorDetails.userName} successfully`
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
                }
            })
        }
    }
    catch (error) {
        console.log("error", error)
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}
const sendMoneyRequest = (req, res) => {
    try {
        console.log('reqreqreq----------------------s', req.body)
        if (!req.body.userId) {
            res.send({ response_code: 400, response_message: "Parameters Missing" })
        }
        else {
            userModel.findOne({ _id: req.body.userId }, (error, userDetails) => {
                if (error) {
                    res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!userDetails) {
                    res.send({ response_code: 400, response_message: "Data not found" })
                }
                else {
                    userModel.findOne({ _id: req.body.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                        console.log(">>>>>>>>>>>>>>>2370",vendorDetails)
                        if (error) {
                            res.send({ response_code: 500, response_message: "Internal server error" })
                        }
                        else if (!vendorDetails) {
                            res.send({ response_code: 400, response_message: "Data not found" })
                        }
                        else {
                            let otp = commonFunction.getOTP();
                            var bal = Number(req.body.amount)
                           

                            var storeNo = vendorDetails.storeNo ? vendorDetails.storeNo : "";
                            var street = vendorDetails.street ? vendorDetails.street : "";
                            var area = vendorDetails.area ? vendorDetails.area : "";
                            var city = vendorDetails.city ? vendorDetails.city : "";
                            var state = vendorDetails.state ? vendorDetails.state : "";
                            var pin = vendorDetails.pin ? vendorDetails.pin : "";
                            var country = vendorDetails.country ? vendorDetails.country : "";
                            var landMark = vendorDetails.landMark ? vendorDetails.landMark : "";

                            var message = userDetails.firstName + "send you " + req.body.amount + " amount at " + vendorDetails.storeNo + " " + vendorDetails.street + "," + vendorDetails.area + " " + vendorDetails.city + "," + vendorDetails.state + "-" + vendorDetails.pin + " " + vendorDetails.country + " Near " + vendorDetails.landMark;
                            console.log('messageee', message);
                            //   console.log('recieverNumberrecieverNumber',req.body.recieverNumber);

                            // commonFunction.sendSms(message, req.body.recieverNumber, (error, sendMessage) => {
                            //     if (error) {
                            //         res.send({ response_code: 500, response_message: "Mobile number in not correct" })
                            //     } else {
                            //userModel.findOne({ mobileNumber: req.body.recieverNumber }, (error, userDetailsReceiver) => {
                            // if(error){
                            //     res.send({response_code:500, response_message:"Internal server error"});
                            // }
                            // else if(!userDetailsReceiver){
                            //     res.send({response_code:404, response_message:"Mobile no not found"});
                            // }
                            // else{

                            var notify = new notification({
                                requestedId: req.body.userId,
                                status: "PENDING",
                                amount: req.body.amount,
                                notifications: ` ${userDetails.userName} requested to send  ${req.body.senderCurrency} ${req.body.amount}  to ${req.body.recieverNumber}`,
                                vendorId: req.body.vendorId,
                                senderCurrency: req.body.senderCurrency,
                                receiverCurrency: req.body.receiverCurrency,
                                requestType: "CASH",
                                notificationType: "SEND",
                                recieverNumber: req.body.recieverNumber,
                                usdAmount: req.body.usdAmount,
                                recieverName: req.body.recieverName,
                                otp: otp
                            })
                            notify.save((err111, result111) => {
                                if (err111) {
                                    res.send({ response_code: 500, response_message: "Internal server error" })
                                }
                                else if (!result111)
                                    res.send({ response_code: 404, response_message: "Data not found" })
                                else {

                                    if (bal > userDetails.balance) {
                                        res.send({
                                            response_code: 200,
                                            response_message: `Insufficent balance in your account`
                                        });
                                    }
                                    else {

                                        userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { balance: userDetails.balance - bal } }, { new: true }, (error, userTransaction) => {
                                            if (error) {
                                                res.send({ response_code: 500, response_message: "Internal server error", error });
                                            }
                                            else if (userTransaction) {
                                                userModel.findByIdAndUpdate({ _id: req.body.vendorId }, { $set: { escrowMoney: vendorDetails.escrowMoney + bal } }, { new: true }, (error, vendorTransaction) => {
                                                    if (error) {
                                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                                    }
                                                    else if (vendorTransaction) {
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: `Request send`
                                                        });
                                                        commonFunction.sendRequestMoneyMail(userDetails.email, "OTP for Send Money", userDetails.firstName, otp, (error, sendMail) => {
                                                            if (error) {
                                                                console.log("something went wrong in mail")
                                                            } else {
                                                                console.log("email successfully sent in 2436>>>>>>");

                                                                var message = `Hello , ${vendorDetails.firstName} , the following WalletApp : ${userDetails.firstName} has just selected your services to send ${req.body.recieverName} , the amount of ${req.body.senderCurrency} ${req.body.amount}. The recipient can be reached at ${req.body.recieverNumber}`

                                                                commonFunction.sendMailToVendor(vendorDetails.email, "Notification",message, (error, vendorMail) => {
                                                                    console.log("email successfully sent in 2458>>>>>>",vendorMail);
                                                                    if (error) {
                                                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                                                    } else {
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: `Your request has been sent to ${vendorDetails.userName} successfully`
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
                                }
                            })
                            // }


                            // })

                            //     }
                            // })
                        }
                    })
                }
            })
        }
    }
    catch (error) {
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

const getVendors = (req, res) => {
    try {
        // userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }).select("country").exec(function (error, userDetails) {
        //     console.log("Data:---->", error, userDetails)
        //     if (error) {
        //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        //     } else if (userDetails) {
        //         userModel.find({ country: userDetails.country, status: "ACTIVE", userType: "VENDOR" }).select("firstName middleName lastName email country countryCode mobileNumber").exec(function (error, vendorDetails) {
        //             if (error) {
        //                 res.send({ response_code: 500, response_message: "Internal server error" })
        //             } else if (vendorDetails) {
        //                 console.log("vendor data:", vendorDetails)
        //                 res.send({ response_code: 200, response_message: "Data:", vendorDetails })
        //             }
        //         })
        //     }
        // })



        let query = { status: "ACTIVE", userType: "VENDOR" }

        if (req.body.countryCode) {
            query.countryCode = { $regex: req.body.countryCode, $options: 'i' }
        }
        if (req.body.country) {
            query.country = { $regex: req.body.country, $options: 'i' }
        }
        if (req.body.city) {
            query.city = { $regex: req.body.city, $options: 'i' }
        }
        if (req.body.state) {
            query.state = { $regex: req.body.state, $options: 'i' }
        }
        console.log("me here>>>", query)
        userModel.find(query).select("firstName middleName lastName email city state country countryCode mobileNumber").exec(function (error, vendorDetails) {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            } else if (vendorDetails.length == false) {
                res.send({ response_code: 404, response_message: "Data not found" })

            }
            else {
                console.log("vendor data:", vendorDetails)
                res.send({ response_code: 200, response_message: "Data:", vendorDetails })
            }
        })


    }
    catch (error) {
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}


const addContact = (req, res) => {
    console.log("In add contact")
    if (!req.body.name || !req.body.number || !req.body.userId) {
        res.send({ response_code: 400, response_message: "Parameters missing" })
    }
    else {
        userModel.findOne({ _id: req.body.userId }, (error, result) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            }
            else if (!result) {
                console.log("Not found1", result)
                res.send({ response_code: 400, response_message: "Not found" })
            }
            else {
                var query = { number: req.body.number, userId: req.body.userId }
                contact.findOne(query, (error, result) => {
                    console.log("show me ====>>", result)
                    if (error) {
                        res.send({ response_code: 500, response_message: "Internal server error" })
                    }
                    else if (result) {
                        res.send({ response_code: 400, response_message: "Number already exists" })
                    }
                    else {
                        var number = req.body.number; //  req.body.mobileNumber = +919430666999//  number = +919430666999 
                        console.log("number >>>>>100>>>", number);
                        var splitNumber = number.slice(1);// splitNumber = 919430666999
                        console.log("splitNumber >>>>>102>>>", splitNumber);
                        var contacts = new contact({
                            name: req.body.name,
                            number: req.body.number,
                            userId: req.body.userId,
                            countryCode: req.body.countryCode,
                            splitMobileNumber: splitNumber,

                        })
                        console.log("splitnumber=====>>", contacts)
                        contacts.save((err, success) => {
                            if (err) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            }
                            else if (!success) {
                                res.send({ response_code: 200, response_message: "Not found" })
                            }
                            else {
                                res.send({ response_code: 200, response_message: "User successfully added", success })
                            }
                        })
                    }
                })
            }
        })
    }
}

const editContact = (req, res) => {
    console.log("iiiiouyfeidtyfudhsagjkhadils")
    if (!req.body.name || !req.body.number || !req.body.userId || !req.body.id) {
        console.log(req.body)
        res.send({ response_code: 400, response_message: "Parameters missing" })
    }
    else {
        userModel.findOne({ _id: req.body.userId }, (error, result2) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            }
            else if (!result2) {
                res.send({ response_code: 400, response_message: "Not found" })
            }
            else {
                contact.findOne({ number: req.body.number, userId: req.body.userId }, (error1, result1) => {
                    if (error1) {
                        res.send({ response_code: 500, response_message: "Internal server error" })
                    }
                    else if (result1) {
                        res.send({ response_code: 400, response_message: "Number already exists" })
                    }
                    else {
                        contact.findOne({ _id: req.body.id }, (errr, result) => {
                            if (errr) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            } else if (!result) {
                                res.send({ response_code: 400, response_message: "No record found" })
                            } else {
                                console.log("Update contact body=>", req.body)
                                req.body.splitMobileNumber = req.body.number.slice(1);
                                contact.findByIdAndUpdate({ _id: result._id }, { $set: req.body }, { new: true }, (error2, updateContact) => {
                                    if (error2)
                                        res.send({ response_code: 500, response_message: "Internal server error", error2 });
                                    else if (updateContact) {
                                        res.send({ response_code: 200, response_message: "User contact updated successfully", updateContact })
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

const deleteContact = (req, res) => {
    if (!req.body.id) {
        console.log(req.body)
        res.send({ response_code: 400, response_message: "Parameters missing" })
    }
    else {
        contact.findByIdAndRemove({ _id: req.body.id }, (error2, removeContact) => {
            if (error2)
                res.send({ response_code: 500, response_message: "Internal server error", error2 });
            else if (removeContact) {
                res.send({ response_code: 200, response_message: "User contact deleted successfully", removeContact })
            }
        })
    }
}

const listContact = (req, res) => {

    contact.find({ userId: req.body.userId }, (err, result) => {
        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (result.length == 0) {
            res.send({ response_code: 200, response_message: "Not found" })
        }
        else {
            res.send({ response_code: 200, response_message: "User successfully found", result })
        }
    })
}

const searchContactList = (req, res) => {

    if (!req.body.userId || !req.body.search) {
        res.send({ response_code: 404, response_message: "Parameters missing" })
    }
    else {
        if (req.body.search == "+") {  // {  "search" : "+"   }
            console.log(">>>304>>>", req.body);
            var query = {
                $and: [
                    { number: { $regex: ".*" + req.body.search + ".*" } },
                    { userId: req.body.userId }

                ]
            }
            contact.find(query, (err, success) => {
                console.log(">>>>>>>>>>>>>>300>>>>>", err, success);
                if (err) {
                    res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        err
                    });
                } else if (success.length == 0) {
                    res.send({ response_code: 201, response_message: "Contact number is not in your phonebook" });
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Contact found",
                        success
                    });
                }
            }
            );
        } else {
            // {  "search" : "+9"   }
            console.log("inside else>>>304>>>", req.body);
            var number = req.body.search;
            console.log("number >>>>>100>>>", number);
            var splitNumber = number.slice(1);
            console.log("splitNumber >>>>>102>>>", splitNumber);

            var query1 = {
                $and: [
                    { splitMobileNumber: { $regex: splitNumber } },
                    { userId: req.body.userId }

                ]
            }
            contact.find(query1, (err, success) => {
                console.log(">>>>>>>>>>>>>>315>>>>>", err, success);
                if (err) {
                    res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        err
                    });
                } else if (success.length == 0) {
                    res.send({ response_code: 404, response_message: "Contact number is not in your phonebook" });
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Contact found",
                        success
                    });
                }
            });
        }
    }

}
const addMoney = (req, res) => {
    try {
        if (!req.body.userId) {
            res.send({
                responseCode: 204,  
                responseMessage: "Parameter is missing"
            })
        } else {
            userModel.findOne({ _id: req.body.userId, status:"ACTIVE" }, (err, result) => {

                console.log("677=====", err, result)
                if (err) {
                    res.send({
                        responseCode: 500,
                        responseMessage: "Internal server error",
                        err
                    })
                } else if (!result) {
                    res.send({
                        responseCode: 404,
                        responseMessage: "Data not found"
                    })
                }
                else {
                    stripe.tokens.create({
                        card: {
                            "number": '4000000000000077',
                            "exp_month": 12,
                            "exp_year": 2021,
                            "cvc": '123',
                            "currency": "usd"
                        }
                    }, (error, token) => {
                        console.log("524==============>", error, token)
                        if (error) {
                            res.send({
                                responseCode: 500,
                                responseMesssage: "Internal server error1",
                                error
                            })
                        } else {
                            stripe.customers.create({

                                source: token.id,
                            }, (error1, customer) => {
                                console.log("534==========>", customer)
                                if (error1) {
                                    res.send({
                                        responseCode: 500,
                                        responseMessage: "Internal server error",
                                        error1
                                    })
                                } else {
                                    stripe.charges.create({
                                        amount: result.amount,
                                        currency: "usd",
                                        customer: customer.id,
                                    }, function (error2, charge) {
                                        if (error2) {
                                            console.log("lllllllllllllllllllllllllllll")
                                            res.send({
                                                responseCode: 500,
                                                responseMessage: "Internal server error",
                                                error2
                                            })
                                        } else {
                                            var obj = {
                                                transactionId: charge.balance_transaction,
                                                chargeId: charge.id,
                                                amount: charge.amount,
                                                customerId: charge.customer,
                                                url: charge.receipt_url,
                                                transactionStatus: charge.status,
                                    
                                            }
                                            //   console.log("568==============",charge.customer)
                                            var obj = new transactionModel(obj)
                                            obj.save((error4, result4) => {
                                                if (error4) {
                                                    res.send({
                                                        responseCode: 500,
                                                        responseMessage: "Internal server error"
                                                    })
                                                } else {

                                                    // var data = {
                                                    //     orderId: result4._id,
                                                    //     transactionId: result4.transactionId,
                                                    //     amount: result4.amount,
                                                    //     createdAt: result4.createdAt,
                                                    //     orderId: result4._id,
                                                    //     orderStatus: result4.orderStatus
                                                    // }
                                                    // console.log("587=============",result4)
                                                    res.send({
                                                        responseCode: 200,
                                                        responseMessage: "Charge",
                                                        data
                                                    })
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
    }
    catch (error) {
        res.send({ responseCode: 404, responseMessage: "Error in catch", error })
    } 
}
module.exports = {
    signup,
    login,
    setPin,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    userDetail,
    userNameExist,
    updateProfile,
    changePassword,
    verifyOtpUpdate,
    pinExists,
    resetPin,
    social,
    socialLogin,
    numberExists,
    searchUser,
    isNumberValid,
    notificationsList,
    approveAndReject,
    searchContact,
    resendOtpOnMail,
    getVendors,
    addMoneyRequest,
    withdrawMoneyRequest,
    sendMoneyRequest,
    addContact,
    editContact,
    deleteContact,
    listContact,
    searchContactList,
    addMoney,
}



// Today's task -
// 1) basic auth ,
// 2) Need KT for bank manager section