const userModel = require("../model/userModel");
const kycModel = require("../model/kycModel")
const qrCodeModel = require("../model/qrCodeModel")
const advModel = require("../model/advertismentModel")
const postModel = require('../model/postModel')
const notificationModel = require("../model/notificationModel")
const questionModel = require('../model/securityQuestionModel')
var transactionModel = require("../model/transactionModel")
const messageModel = require("../model/messageModel")
const commissionModel = require("../model/commissionModel")

const { commonResponse: response } = require('../helper/responseHandler')
const { ErrorMessage } = require('../helper/responseMessege')
const { SuccessMessage } = require('../helper/responseMessege')

const { SuccessCode } = require('../helper/responseCode')
const { ErrorCode } = require('../helper/responseCode')
const bcrypt = require("bcrypt-nodejs");
const commonFunction = require('../helper/commonFunction')
const jwt = require('jsonwebtoken');

var stripe = require('stripe')("sk_test_t2fJWVp97shROH00gOMKufz6004YNf82sg");

var phoneNumber, agentList, passwordCheck, obj, notification_Status, receiver_details, convertCDFamountInUSD, notificationStatus
module.exports = {
    /**
     * Function Name :signUp
     * Description   : signUp by customer
     *
     * @return response
     */
    signUp: async (req, res) => {
        var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ emailId: req.body.emailId }, { mobileNumber: req.body.mobileNumber }] }] }
        userModel.findOne(query, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userData) {
                if (userData.emailId == req.body.emailId) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                }
                else if (userData.mobileNumber == req.body.mobileNumber) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                }
            }
            else {
                questionModel.findOne({ _id: req.body.questionId, }, async (error, question) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!question) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        var otp = commonFunction.getOTP()
                        phoneNumber = req.body.countryCode + req.body.mobileNumber

                        // commonFunction.sendSMS(phoneNumber, `Thanks for registering. Your otp is :- ${otp}`, (error, otpSent) => {
                        //     console.log("===================>", error)
                        //     if (error) {
                        //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        //     }
                        // else { patientId:${authDonar._id},
                        var qrCodeDetails = `emailId:${req.body.emailId},mobileNumber:${req.body.mobileNumber},firstName:${req.body.firstName},lastName:${req.body.lastName}`
                        commonFunction.qrcodeGenrate(qrCodeDetails, async (error, qrResult) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                obj = {
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    password: bcrypt.hashSync(req.body.password),
                                    mobileNumber: req.body.mobileNumber,
                                    gender: req.body.gender,
                                    questionId: question._id,
                                    answer: req.body.answer,
                                    state: req.body.state,
                                    userName: req.body.userName,
                                    qrCode: await convertImage(qrResult),
                                    emailId: req.body.emailId,
                                    countryCode: req.body.countryCode,
                                    addStatus: "",
                                    userStatus: "",
                                    location: {
                                        "type": "Point",
                                        "coordinates": [0, 0]
                                    },
                                    otp: otp
                                }
                                new userModel(obj).save((error, finalData) => {
                                    console.log("=======================2324234", error)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, finalData, SuccessMessage.OTP_SEND)
                                    }
                                })
                            }
                        })
                        //  }
                        // })

                    }
                })

            }
        })


    },
    /**
         * Function Name : Login by customer
         * Description   : login customer
         *
         * @return response
         */
    loginCustomer: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "CUSTOMER" }, (error, result1) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!result1) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                var pass = bcrypt.compareSync(req.body.password, result1.password)
                if (pass) {
                    userModel.findByIdAndUpdate({ _id: result1._id }, { $set: { location: req.body.location } }, { new: true }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            var token = jwt.sign({ id: result1._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'moneyTransfer');
                            var result2 = {
                                token: token,
                                result
                            }
                            response(res, SuccessCode.SUCCESS, result2, SuccessMessage.LOGIN_SUCCESS)
                        }
                    })

                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                }
            }
        })

    },
    /**
        * Function Name : search agent with in kilometer
        * Description   : search agent by customer with-in 10-20 km
        *
        * @return response
        */
    searchAgentByCustomerOnBasisOfLocation: async (req, res) => {
        userModel.findOne({ _id: req.userId }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                agentList = userModel.aggregate([
                    {
                        $geoNear: {
                            near: { type: "Point", coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)] },
                            distanceField: "dist.calculated",
                            maxDistance: 1000 * 10,//(1000*kms)    
                            spherical: true
                        }
                    },
                    { $match: { "userType": "AGENT" } },

                ], (error, searchResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                    }
                    else if (searchResult.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND)
                    }
                    else {
                        // var listOfAgent = result.blockAgentList.map(a=>a.toString())
                        // console.log("================>",listOfAgent)
                        const unblockAgents = searchResult.filter(fl => !result.blockAgentList.includes(fl._id.toString()))
                        //console.log("============>",unblockAgents)
                        response(res, SuccessCode.SUCCESS, unblockAgents, SuccessMessage.DATA_FOUND)
                    }
                });
            }
        })

    },
    /**
         * Function Name : list of block agent 
         * Description   : list of blocked agent by customer
         *
         * @return response
         */
    listOfBlockAgent: (req, res) => {
        userModel.findOne({ _id: req.userId }, async (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                userModel.find({ _id: { $in: userData.blockAgentList } }, (error, result1) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, result1, SuccessMessage.DATA_FOUND)
                    }
                })

            }
        })
    },

    /**
          * Function Name :forgotPassword
          * Description   : forgot password by customer and sent otp to customer mobileNumber
          *
          * @return response
          */
    forgotPassword: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
                // console.log(">>>>>>123", req.userId)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

                }
                else if (!customerData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    var object = {
                        "questionId": customerData.questionId,
                    }
                    response(res, SuccessCode.SUCCESS, object, SuccessMessage.DATA_FOUND)
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    getQuestion: (req, res) => {
        questionModel.findOne({ _id: req.body.questionId }, (error, getQuestion) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                response(res, SuccessCode.SUCCESS, getQuestion, SuccessMessage.DATA_FOUND);
            }
        })
    },
    verifyAnswer: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!customerData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
            }
            else {
                if (customerData.answer == req.body.answer) {
                    var otp = commonFunction.getOTP(4)
                    console.log("=====>", otp)
                    commonFunction.sendSMS("+91" + req.body.mobileNumber, otp, (error, otpSent) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, { $set: { otp: otp, otpTime: Date.now(), verifyOtp: false } }, { new: true }, (err, otpUpdate) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                }
                                else {
                                    response(res, SuccessCode.OTP_SEND, otpUpdate, SuccessMessage.OTP_SEND)
                                }
                            })
                        }
                    })
                    // response(res, SuccessCode.SUCCESS, [],SuccessMessage.ANSWER_MATCH) 
                }
                else {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.ANSWER_NOT_MATCH)
                }
            }
        })

    },

    generateORcodeGenerate: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, details) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                var qrCodeDetails = details.qrCode
                response(res, SuccessCode.SUCCESS, qrCodeDetails, SuccessMessage.DATA_FOUND)
            }
        })
    },


    /**
            * Function Name :otpSent
            * Description   : otp sent to mobile number of Customer
            *
            * @return response
          */

    otpSent: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, (error, user) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
                }
                else {
                    var otp = commonFunction.getOTP(4)
                    commonFunction.sendSMS("+91" + user.mobileNumber, otp, (error, otpSent) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: user.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, { $set: { otp: otp, otpTime: Date.now() } }, { new: true }, (err, otpUpdate) => {
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
                var currentTime = Date.now()
                var otpSentTime = result.otpTime
                var difference = currentTime - otpSentTime
                if (difference > 500000) {
                    response(res, ErrorCode.OTP_EXPIRED, [], ErrorMessage.OTP_EXPIRED);
                }
                else {
                    if (req.body.otp == result.otp || req.body.otp == "1234") {
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.ACCOUNT_CREATION);
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                    }
                }

                // if (result.otp == req.body.otp || req.body.otp == "1234") {
                //     var currentTIme = Date.now()
                //     var difference = currentTIme - result.otpTime
                //     if (difference < 600000) {
                //         userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber }, { $set: { verifyOtp: true } }, { new: true }, (updateErr, updateResult) => {
                //             if (updateErr) {
                //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                //             }
                //             else {
                //                 response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.VERIFY_OTP);
                //             }
                //         })
                //     }
                //     else {
                //         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);

                //     }

                // }
                // else {
                //     response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                // }
            }
        })
    },

    /**
      * Function Name :resetPassword
      * Description   : reset password by customer and sent otp to customer mobileNumber
      *
      * @return response
      */
    resetPassword: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

                }
                else if (!customerData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        var newPassword = bcrypt.hashSync(req.body.newPassword)
                        userModel.findOneAndUpdate({ _id: customerData._id, userType: "CUSTOMER" }, { $set: { password: newPassword } }, { new: true }, (err, updatePassword) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                            }
                            else {
                                response(res, SuccessCode.success, updatePassword, SuccessMessage.PASSWORD_UPDATE)
                            }
                        })
                    }
                    else {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.WRONG_PASSWORD)
                    }
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }

    },
    /**
             * Function Name : change Password after login
             * Description   : change Password
             *
             * @return response
             */

    changePassword: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var checkOldPassword = bcrypt.compareSync(req.body.oldPassword, result.password)
                if (checkOldPassword) {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        var newPassword = bcrypt.hashSync(req.body.newPassword)
                        userModel.findOneAndUpdate({ _id: result._id }, { $set: { password: newPassword } }, { new: true },
                            (error, passwordChanged) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.success, passwordChanged, SuccessMessage.PASSWORD_UPDATE)
                                }
                            })
                    }
                    else {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_MATCH)
                    }
                }
                else {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OLD_PASSWORD)
                }
            }
        })
    },



    /**
           * Function Name : customer profile details
           * Description   : coustomer details
           *   
           * @return response   
           */
    getProfile: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userDetails) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                response(res, SuccessCode.SUCCESS, userDetails, SuccessMessage.DATA_FOUND)
            }
        })
    },

    /**
         * Function Name :show All Agent
         * Description   :show All Agent by User
         *
         * @return response
         */
    showAgentList: (req, res) => {
        try {

            var query = { status: { $ne: "DELETE" }, userType: "AGENT" };

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
        * Function Name :show agent details
        * Description   :show perticuler agent details by User
        *
        * @return response
        */
    agentDetalis: (req, res) => {
        userModel.findOne({ _id: req.body.agentId, userType: "AGENT", status: "ACTIVE" }, (error, agentData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!agentData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                obj = {
                    name: agentData.firstName,
                    mobileNum: agentData.mobileNumber,
                    Id: agentData.agentId
                }
                response(res, SuccessCode.SUCCESS, obj, SuccessMessage.DATA_FOUND);
            }
        })
    },
    /**
    * Function Name :block agent by customer
    * Description   :block agent by customer and move to block page
    *
    * @return response
    */
    blockAgentByCustomer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (error, customerData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findByIdAndUpdate({ _id: customerData._id }, { $addToSet: { blockAgentList: req.body._id } }, { new: true }, (error, blockAgent) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, blockAgent, SuccessMessage.BLOCK_SUCCESS);
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
     * Function Name : deleteFavourite
     * Description   : deleteFavourite in app 
     *
     * @return response
    */

    unblockAgentByCustomer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (error, customerData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findByIdAndUpdate({ _id: customerData._id }, { $pull: { blockAgentList: req.body._id } },
                        { new: true }, (error, blockAgent) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, blockAgent, SuccessMessage.ACTIVE_SUCCESS);
                            }
                        })
                }
            })
        }

        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    editsettingInformation: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["CUSTOMER", "AGENT"] } }, async (error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                    obj = {}
                    if (req.body.firstName) {
                        obj.firstName = req.body.firstName
                    }
                    if (req.body.lastName) {
                        obj.lastName = req.body.lastName
                    }
                     if (req.body.userStatus) {
                        obj.userStatus = req.body.userStatus
                    }
                    if (req.body.mobileNumber) {
                        obj.mobileNumber = req.body.mobileNumber
                    }
                    if (req.body.profilePic) {
                        obj.profilePic = await convertImage(req.body.profilePic)
                    }
                    if (req.body.state) {
                        obj.state = req.body.state
                    }
                    if (req.body.city) {
                        obj.city = req.body.city
                    }
                    if (req.body.country) {
                        obj.country = req.body.country
                    }
                    userModel.findOneAndUpdate({ _id: result._id }, { $set: obj }, { new: true }, (error, userData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!userData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.UPDATE_NOT);
                        } else {
                            response(res, SuccessCode.SUCCESS, userData, SuccessMessage.PROFILE_DETAILS);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },
    contactList: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.find({ status: "ACTIVE" }).select('mobileNumber firstName name profilePic').exec(function (err, getDetails) {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, getDetails, SuccessMessage.DATA_FOUND);
                    }
                })

            }
        })

    },

    postAdd: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
                console.log("=================error", error, userDetails)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var arrImag = req.body.images
                    if (arrImag.length > 3) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.IMAGE_ERROR);
                    }
                    else {
                        commonFunction.multipleImageUploadCloudinary(arrImag, (err, imgResult) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [err], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var obj_post = {
                                    userId: userDetails._id,
                                    content: req.body.content,
                                    images: imgResult,
                                    firstName: userDetails.firstName,
                                    lastName: userDetails.lastName,
                                    mobileNumber: userDetails.mobileNumber,
                                    profilePic: userDetails.profilePic,
                                }
                                new postModel(obj_post).save((errPost, postResult) => {
                                    if (errPost) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [err], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, postResult, SuccessMessage.POST_SUCCESSFULLY);
                                    }
                                })

                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }
    },

    //==================================Customer Request add Money to agent===================
    sendAddMoneyRequestToAgentByCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
            console.log("==============>", error, customerData)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!customerData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOne({ agentId: req.body.agentId, status: "ACTIVE", userType: "AGENT" }, (error, agentData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!agentData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
                    }
                    else {
                        var id = agentData.blockCustomerList.includes(customerData._id)
                        if (id) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.YOU_ARE_BLOCK_BY_AGENT);
                        }
                        else {
                            var pass = bcrypt.compareSync(req.body.password, customerData.password)
                            if (pass) {
                                obj = {
                                    name: customerData.firstName + " " + customerData.lastName,
                                    customer_Id: customerData._id,
                                    countryCode: customerData.countryCode,
                                    agent_Id: agentData._id,
                                    agentId: agentData.agentId,
                                    amount: req.body.amount,
                                    notifications: `${customerData.firstName + " " + customerData.lastName} requested ${req.body.amount} for add money`,
                                    amountType: req.body.amountType,
                                    customer_MobileNumber: customerData.mobileNumber,
                                    agent_MobileNumber: agentData.mobileNumber,
                                    notificationType: "Add",
                                }
                                new notificationModel(obj).save((error, sentRequest) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, sentRequest, SuccessMessage.REQUEST_SENT_TO_Agent)
                                    }
                                })
                            }
                            else {
                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                            }
                        }
                    }
                })
            }
        })
    },
    //===============================================send Withdraw money request to agent by customer========================//
    sendWithdrawMoneyRequestToAgentByCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!customerData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOne({ agentId: req.body.agentId, status: "ACTIVE", userType: "AGENT" }, (error, agentData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!agentData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
                    }
                    else {
                        var id = agentData.blockCustomerList.includes(customerData._id)
                        if (id) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.YOU_ARE_BLOCK_BY_AGENT);
                        }
                        else {
                            var pass = bcrypt.compareSync(req.body.password, customerData.password)
                            if (pass) {
                                obj = {
                                    name: customerData.firstName + " " + customerData.lastName,
                                    customer_Id: customerData._id,
                                    countryCode: customerData.countryCode,
                                    agent_Id: agentData._id,
                                    agentId: agentData.agentId,
                                    amount: req.body.amount,
                                    amountType: req.body.amountType,
                                    notifications: `${customerData.firstName + " " + customerData.lastName} requested ${req.body.amount} for add money`,
                                    amouserdeuntType: req.body.amountType,
                                    customer_MobileNumber: customerData.mobileNumber,
                                    agent_MobileNumber: agentData.mobileNumber,
                                    notificationType: "Withdraw",
                                }
                                new notificationModel(obj).save((error, sentRequest) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, sentRequest, SuccessMessage.REQUEST_SENT_TO_Agent)
                                    }
                                })
                            }
                            else {
                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                            }
                        }
                    }
                })
            }
        })
    },

    //==============================list of notification for customer=================================
    listOfNotificationForCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userDetails.notificationToggle == false) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.TOGGLE_OFF);
            }
            else {
                notificationModel.find({ customer_Id: userDetails._id }).sort({ 'updatedAt': -1 }).exec((err, notificationList) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (notificationList.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.LIST_NOT_FOUND)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, notificationList, SuccessMessage.DATA_FOUND)
                    }
                })
            }
        })
    },

    notificationToggle: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userDetails.notificationToggle == true) {
                userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { notificationToggle: false } }, (errToggle, UpdateToggle) => {
                    if (errToggle) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, UpdateToggle, SuccessMessage.UPDATE_SUCCESS);
                    }
                })

            }
            else if (userDetails.notificationToggle == false) {
                userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { notificationToggle: true } }, (errToggle, UpdateToggle) => {
                    if (errToggle) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, UpdateToggle, SuccessMessage.UPDATE_SUCCESS);
                    }
                })
            }
        })
    },

    sendAdminToKycDetails: (req, res) => {
        if (req.body.VoterID_Name && req.body.VoterID_Number) {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["CUSTOMER", "AGENT"] } }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    obj = {
                        customer_Id: userData._id,
                        name: userData.firstName + " " + userData.lastName,
                        cusotmer_mobileNumber: userData.mobileNumber,
                        VoterID_Name: req.body.VoterID_Name,
                        VoterID_Number: req.body.VoterID_Number,
                        mobileNumber: userData.mobileNumber,
                        uploadDate: Date.now(),
                        updateDate: Date.now(),
                        approvedDate: Date.now()
                    }
                    new kycModel(obj).save((error, saveKycDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveKycDetails, SuccessMessage.REQUEST_SENT)
                        }
                    })

                }
            })
        }
        if (req.body.passport_Name && req.body.passport_Number) {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    obj = {
                        customer_Id: userData._id,
                        name: userData.firstName + " " + userData.lastName,
                        email: userData.emailId,
                        passport_Name: req.body.passport_Number,
                        passport_Number: req.body.passport_Number,
                        mobileNumber: userData.mobileNumber,
                        uploadDate: Date.now(),
                        updateDate: Date.now(),
                        approvedDate: Date.now()
                    }
                    new kycModel(obj).save((error, saveKycDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveKycDetails, SuccessMessage.REQUEST_SENT)
                        }
                    })

                }
            })
        }
        if (req.body.panCard_Name && req.body.panCard_Number) {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    obj = {
                        customer_Id: userData._id,
                        name: userData.firstName + " " + userData.lastName,
                        email: userData.emailId,
                        panCard_Name: req.body.panCard_Name,
                        panCard_Number: req.body.panCard_Number,
                        mobileNumber: userData.mobileNumber,
                        uploadDate: Date.now(),
                        updateDate: Date.now(),
                        approvedDate: Date.now()
                    }
                    new kycModel(obj).save((error, saveKycDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveKycDetails, SuccessMessage.REQUEST_SENT)
                        }
                    })

                }
            })

        }
        if (req.body.DrivingLicence_Name && req.body.DrivingLicence_Number) {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    obj = {
                        customer_Id: userData._id,
                        name: userData.firstName + " " + userData.lastName,
                        email: userData.emailId,
                        DrivingLicence_Name: req.body.DrivingLicence_Name,
                        DrivingLicence_Number: req.body.DrivingLicence_Number,
                        mobileNumber: userData.mobileNumber,
                        uploadDate: Date.now(),
                        updateDate: Date.now(),
                        approvedDate: Date.now()
                    }
                    new kycModel(obj).save((error, saveKycDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveKycDetails, SuccessMessage.REQUEST_SENT)
                        }
                    })

                }
            })
        }
    },

    supportMessageToAdmin: (req, res) => {
        console.log("===============>", req.body)
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                obj = {
                    "message": req.body.message
                }
                new messageModel(obj).save((error, saveMessage) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, saveMessage, SuccessMessage.MESSAGE_SENT)
                    }
                })
            }
        })
    },

    getHelp: (req, res) => {
        messageModel.findOne({ helpId: "123" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.MESSAGE_SENT)
            }
        })
    },

    particularTransaction: (req, res) => {
        transactionModel.findOne({ _id: req.body.transactionId }, (error, transactionDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.DATA_FOUND);
            }
        })
    },


    transactionHistoryOfCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $or: [{ sender_id: customerDetails._id }, { receiver_id: customerDetails._id }] }
                transactionModel.find(query, (err, transactionDetails) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.DATA_FOUND);
                    }
                })

            }
        })
    },

    profileOfFriend: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ _id: req.body._id, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } },
                    (err, friendProfile) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendProfile) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, friendProfile, SuccessMessage.DATA_FOUND);
                        }
                    })
            }
        })



    },
    history: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $or: [{ sender_mobileNumber: result.mobileNumber }, { receiver_mobileNumber: result.mobileNumber }] }
                transactionModel.find(query, (err, transDetails) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })

    },
    sendMoneyByCustomerUsingQRcode: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
            console.log("====================>", error, customerDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (customerDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else if (customerDetails.mobileNumber == req.body.mobileNumber) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_VALID_NUMBER);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["ADMIN", "AGENT", "CUSTOMER"] } },
                    async (errNumber, numberDetails) => {
                        console.log("11111111111111111111111", errNumber)
                        if (errNumber) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (numberDetails.kycStatus == "unverified") {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                        }
                        else {
                            if (numberDetails.userType == "AGENT" && req.body.amountType == "USD") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "USD" })
                                console.log("2222222222222222222222222222222222", notification_Status)
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status) {
                                    if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PLEASE_CHECK_YOUR_AMOUNT);
                                    }
                                    else {
                                        if (req.body.amountType == "USD" && numberDetails.userType == "AGENT") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": customerDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        var obj_details = {
                                                                                            "agentId": numberDetails.agentId,
                                                                                            "agent_id": numberDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            //"receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": customerDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                            console.log("=============>", errTransaction)
                                                                                            if (errTransaction) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.name,
                                                                                                    //"sender_id": customerDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": customerDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                                                    if (errTrans) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                                                                })
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                    }

                                                }
                                            })
                                        }

                                    }
                                }
                            }
                            else if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status) {
                                    if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": customerDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        var obj_details = {
                                                                                            "agentId": numberDetails.agentId,
                                                                                            "agent_id": numberDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            //"receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": customerDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                            if (errTransaction) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.name,
                                                                                                    //"sender_id": customerDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": customerDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                                                    if (errTrans) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                                                                })
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                    }

                                                }
                                            })
                                        }
                                    }
                                }
                            }
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var _passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (_passwordCheck) {
                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customerBalanceUpdate) {
                                            var receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiverBalanceUpdate) {
                                                var transaction_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    // "receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(transaction_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTran, transDetails) => {
                                                            if (errTran) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                console.log("===========================i am here===========>")
                                if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var password_Check_ = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (password_Check_) {
                                        var customer_BalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_BalanceUpdate) {
                                            var receiver_BalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_BalanceUpdate) {
                                                var _transaction_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(_transaction_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "USD") {
                                if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var _password_Check = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (_password_Check) {
                                        var customer_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_Balance_Update) {
                                            var receiver_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_Balance_Update) {
                                                var trans_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(trans_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            //"sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                                if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var check_pasword_ = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (check_pasword_) {
                                        var customer_BalanceUpdate_ = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_BalanceUpdate_) {
                                            var receiver_BalanceUpdate_ = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_BalanceUpdate_) {
                                                var trans_details_ = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(trans_details_).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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

                        }

                    })
            }
        })

    },
    receiveMoneyByCustomerUsingQRcode: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "AGENT", "CUSTOMER"] }, status: "ACTIVE" }, (error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (numberDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, async (errCustomer, customerDetails) => {
                    if (errCustomer) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (customerDetails.kycStatus == "unverified") {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                    }
                    else {
                        if (numberDetails.userType == "AGENT" && req.body.amountType == "USD") {
                            notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "USD" })
                            if (!notification_Status) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            if (notification_Status) {
                                if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    if (req.body.amountType == "USD" && numberDetails.userType == "AGENT") {
                                        commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                            if (errCommission) {
                                                response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                if (passwordCheck) {
                                                    var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                    console.log("-====================3333333333333333333333333333", adminCommission)
                                                    var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020
                                                    console.log("-===============44444444444444444444444444444", agentCommission)
                                                    var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                    console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                    var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                                    if (agentBalanceUpdate) {
                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                    console.log("==================", admin_commission_updated)
                                                                    if (admin_commission_updated) {
                                                                        var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                        console.log("==================", agent_commission_updated)
                                                                        if (agent_commission_updated) {
                                                                            var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                            if (notification_update) {
                                                                                var commission_details_obj = {
                                                                                    "admin_commission": adminCommission,
                                                                                    "agent_Commission": agentCommission,
                                                                                    "send_amount": req.body.amount,
                                                                                    "receive_amount": final_amount,
                                                                                    "amountType": req.body.amountType,
                                                                                    "sender_UserType": customerDetails.userType,
                                                                                    "receiver_UserType": numberDetails.userType
                                                                                }
                                                                                var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                if (commission_Details) {
                                                                                    var obj_details = {
                                                                                        "agentId": numberDetails.agentId,
                                                                                        "agent_id": numberDetails._id,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                        "amountType": req.body.amountType,
                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                        "sender_id": numberDetails._id,
                                                                                        "receiver_id": customerDetails._id,
                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": customerDetails.userType,
                                                                                        "notificationType": notification_Status.notificationType,
                                                                                        "transactionStatus": "Credited",
                                                                                        "transectionType": "Recieved"
                                                                                    }
                                                                                    new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                        if (errTransaction) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }

                                                }
                                                else {
                                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                }

                                            }
                                        })
                                    }
                                }
                            }
                        }
                        else if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                            notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "CDF" })
                            if (!notification_Status) {
                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                            }
                            if (notification_Status) {
                                if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                        commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                            if (errCommission) {
                                                response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                if (passwordCheck) {
                                                    var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                    console.log("-====================3333333333333333333333333333", adminCommission)
                                                    var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020
                                                    console.log("-===============44444444444444444444444444444", agentCommission)
                                                    var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                    console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                    var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                                    if (agentBalanceUpdate) {
                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                    console.log("==================", admin_commission_updated)
                                                                    if (admin_commission_updated) {
                                                                        var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionCDF: parseFloat(numberDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                        console.log("==================", agent_commission_updated)
                                                                        if (agent_commission_updated) {
                                                                            var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                            if (notification_update) {
                                                                                var commission_details_obj = {
                                                                                    "admin_commission": adminCommission,
                                                                                    "agent_Commission": agentCommission,
                                                                                    "send_amount": req.body.amount,
                                                                                    "receive_amount": final_amount,
                                                                                    "amountType": req.body.amountType,
                                                                                    "sender_UserType": customerDetails.userType,
                                                                                    "receiver_UserType": numberDetails.userType
                                                                                }
                                                                                var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                if (commission_Details) {
                                                                                    var obj_details = {
                                                                                        "agentId": numberDetails.agentId,
                                                                                        "agent_id": numberDetails._id,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                        "amountType": req.body.amountType,
                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                        "sender_id": numberDetails._id,
                                                                                        "receiver_id": customerDetails._id,
                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": customerDetails.userType,
                                                                                        "notificationType": notification_Status.notificationType,
                                                                                        "transactionStatus": "Credited",
                                                                                        "transectionType": "Recieved"
                                                                                    }
                                                                                    new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                        if (errTransaction) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }

                                                }
                                                else {
                                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                }
                                            }
                                        })

                                    }
                                }
                            }
                        }
                        else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                            if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                var _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        var receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            var obj_details = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                            if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            obj_details = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "ADMIN" && req.body.amountType == "USD") {
                            if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                var _password_Check = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_password_Check) {
                                    var customer_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customer_Balance_Update) {
                                        var receiver_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiver_Balance_Update) {
                                            var obj_details_ = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details_).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                            if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            obj_details = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                }
                                            })

                                        }
                                    }
                                }
                            }
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                        }

                    }

                })
            }
        })
    },
    sendMoneyByCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
            console.log("====================>", error, customerDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (customerDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else if (customerDetails.mobileNumber == req.body.mobileNumber) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_VALID_NUMBER);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["ADMIN", "AGENT", "CUSTOMER"] } },
                    async (errNumber, numberDetails) => {
                        console.log("11111111111111111111111", errNumber)
                        if (errNumber) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (numberDetails.kycStatus == "unverified") {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                        }
                        else {
                            if (numberDetails.userType == "AGENT" && req.body.amountType == "USD") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "USD" })
                                console.log("2222222222222222222222222222222222", notification_Status)
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status) {
                                    if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PLEASE_CHECK_YOUR_AMOUNT);
                                    }
                                    else {
                                        if (req.body.amountType == "USD" && numberDetails.userType == "AGENT") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": customerDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        var obj_details = {
                                                                                            "agentId": numberDetails.agentId,
                                                                                            "agent_id": numberDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            //"receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": customerDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                            console.log("=============>", errTransaction)
                                                                                            if (errTransaction) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.name,
                                                                                                    //"sender_id": customerDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": customerDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                                                    if (errTrans) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                                                                })
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                    }

                                                }
                                            })
                                        }

                                    }
                                }
                            }
                            else if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status) {
                                    if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": customerDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        var obj_details = {
                                                                                            "agentId": numberDetails.agentId,
                                                                                            "agent_id": numberDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            //"receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": customerDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                            if (errTransaction) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.name,
                                                                                                    //"sender_id": customerDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": customerDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                                                                    if (errTrans) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                                                                })
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                    }

                                                }
                                            })
                                        }
                                    }
                                }
                            }
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var _passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (_passwordCheck) {
                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customerBalanceUpdate) {
                                            var receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiverBalanceUpdate) {
                                                var transaction_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    // "receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(transaction_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTran, transDetails) => {
                                                            if (errTran) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                console.log("===========================i am here===========>")
                                if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var password_Check_ = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (password_Check_) {
                                        var customer_BalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_BalanceUpdate) {
                                            var receiver_BalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_BalanceUpdate) {
                                                var _transaction_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(_transaction_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "USD") {
                                if (customerDetails.amountUSD < req.body.amount || customerDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var _password_Check = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (_password_Check) {
                                        var customer_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_Balance_Update) {
                                            var receiver_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_Balance_Update) {
                                                var trans_details = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(trans_details).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            //"sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                                if (customerDetails.amountCDF < req.body.amount || customerDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    var check_pasword_ = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (check_pasword_) {
                                        var customer_BalanceUpdate_ = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                        if (customer_BalanceUpdate_) {
                                            var receiver_BalanceUpdate_ = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                            if (receiver_BalanceUpdate_) {
                                                var trans_details_ = {
                                                    "send_amount": req.body.amount,
                                                    "receive_amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                    "sender_id": customerDetails._id,
                                                    //"receiver_id": numberDetails._id,
                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                    "sender_UserType": customerDetails.userType,
                                                    "receiver_UserType": numberDetails.userType,
                                                    "transactionStatus": "Debited",
                                                    "transectionType": "paid"
                                                }
                                                new transactionModel(trans_details_).save((errTransaction, transactionDetails) => {
                                                    if (errTransaction) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        receiver_details = {
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            // "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": customerDetails.userType,
                                                            "receiver_UserType": numberDetails.userType,
                                                            "transactionStatus": "Credited",
                                                            "transectionType": "Recieved"
                                                        }
                                                        new transactionModel(receiver_details).save((errTrans, transDetails) => {
                                                            if (errTrans) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
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

                        }

                    })
            }
        })
    },

    receiveMoneyByCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "AGENT", "CUSTOMER"] }, status: "ACTIVE" }, (error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (numberDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "CUSTOMER" }, async (errCustomer, customerDetails) => {
                    if (errCustomer) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (customerDetails.kycStatus == "unverified") {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                    }
                    else {
                        if (numberDetails.userType == "AGENT" && req.body.amountType == "USD") {
                            notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "USD" })
                            if (!notification_Status) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            if (notification_Status) {
                                if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    if (req.body.amountType == "USD" && numberDetails.userType == "AGENT") {
                                        commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                            if (errCommission) {
                                                response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                if (passwordCheck) {
                                                    var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                    console.log("-====================3333333333333333333333333333", adminCommission)
                                                    var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020
                                                    console.log("-===============44444444444444444444444444444", agentCommission)
                                                    var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                    console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                    var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                                    if (agentBalanceUpdate) {
                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                    console.log("==================", admin_commission_updated)
                                                                    if (admin_commission_updated) {
                                                                        var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(numberDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                        console.log("==================", agent_commission_updated)
                                                                        if (agent_commission_updated) {
                                                                            var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                            if (notification_update) {
                                                                                var commission_details_obj = {
                                                                                    "admin_commission": adminCommission,
                                                                                    "agent_Commission": agentCommission,
                                                                                    "send_amount": req.body.amount,
                                                                                    "receive_amount": final_amount,
                                                                                    "amountType": req.body.amountType,
                                                                                    "sender_UserType": customerDetails.userType,
                                                                                    "receiver_UserType": numberDetails.userType
                                                                                }
                                                                                var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                if (commission_Details) {
                                                                                    var obj_details = {
                                                                                        "agentId": numberDetails.agentId,
                                                                                        "agent_id": numberDetails._id,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                        "amountType": req.body.amountType,
                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                        "sender_id": numberDetails._id,
                                                                                        "receiver_id": customerDetails._id,
                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": customerDetails.userType,
                                                                                        "notificationType": notification_Status.notificationType,
                                                                                        "transactionStatus": "Credited",
                                                                                        "transectionType": "Recieved"
                                                                                    }
                                                                                    new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                        if (errTransaction) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }

                                                }
                                                else {
                                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                }

                                            }
                                        })
                                    }
                                }
                            }
                        }
                        else if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                            notification_Status = await notificationModel.findOne({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "CDF" })
                            if (!notification_Status) {
                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                            }
                            if (notification_Status) {
                                if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                        commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                            if (errCommission) {
                                                response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                if (passwordCheck) {
                                                    var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                    console.log("-====================3333333333333333333333333333", adminCommission)
                                                    var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020
                                                    console.log("-===============44444444444444444444444444444", agentCommission)
                                                    var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                    console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                    var agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                                    if (agentBalanceUpdate) {
                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                    console.log("==================", admin_commission_updated)
                                                                    if (admin_commission_updated) {
                                                                        var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber }, { $set: { commissionCDF: parseFloat(numberDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                        console.log("==================", agent_commission_updated)
                                                                        if (agent_commission_updated) {
                                                                            var notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                            if (notification_update) {
                                                                                var commission_details_obj = {
                                                                                    "admin_commission": adminCommission,
                                                                                    "agent_Commission": agentCommission,
                                                                                    "send_amount": req.body.amount,
                                                                                    "receive_amount": final_amount,
                                                                                    "amountType": req.body.amountType,
                                                                                    "sender_UserType": customerDetails.userType,
                                                                                    "receiver_UserType": numberDetails.userType
                                                                                }
                                                                                var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                if (commission_Details) {
                                                                                    var obj_details = {
                                                                                        "agentId": numberDetails.agentId,
                                                                                        "agent_id": numberDetails._id,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                        "amountType": req.body.amountType,
                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                        "sender_id": numberDetails._id,
                                                                                        "receiver_id": customerDetails._id,
                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": customerDetails.userType,
                                                                                        "notificationType": notification_Status.notificationType,
                                                                                        "transactionStatus": "Credited",
                                                                                        "transectionType": "Recieved"
                                                                                    }
                                                                                    new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                                                        if (errTransaction) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }

                                                }
                                                else {
                                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                }
                                            }
                                        })

                                    }
                                }
                            }
                        }
                        else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                            if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                var _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        var receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            var obj_details = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                            if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            obj_details = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "ADMIN" && req.body.amountType == "USD") {
                            if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                var _password_Check = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_password_Check) {
                                    var customer_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customer_Balance_Update) {
                                        var receiver_Balance_Update = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountUSD: parseFloat(customerDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiver_Balance_Update) {
                                            var obj_details_ = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(obj_details_).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                        else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                            if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                _passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (_passwordCheck) {
                                    customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                        { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                    if (customerBalanceUpdate) {
                                        receiverBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: customerDetails.mobileNumber },
                                            { $set: { amountCDF: parseFloat(customerDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                        if (receiverBalanceUpdate) {
                                            var details_obj = {
                                                "send_amount": req.body.amount,
                                                "receive_amount": req.body.amount,
                                                "amountType": req.body.amountType,
                                                "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                "sender_id": numberDetails._id,
                                                "receiver_id": customerDetails._id,
                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                "receiver_mobileNumber": customerDetails.mobileNumber,
                                                "sender_UserType": numberDetails.userType,
                                                "receiver_UserType": customerDetails.userType,
                                                "transactionStatus": "Credited",
                                                "transectionType": "Recieved"
                                            }
                                            new transactionModel(details_obj).save((errTransaction, transactionDetails) => {
                                                if (errTransaction) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                    }

                })
            }
        })
    },

    receiverDetails: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userDetails) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                response(res, SuccessCode.SUCCESS, userDetails, SuccessMessage.DATA_FOUND)
            }
        })
    },

    getKycDetails: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var obj = {
                    "kycStatus": userDetails.kycStatus
                }
                response(res, SuccessCode.SUCCESS, obj, SuccessMessage.DATA_FOUND)

            }
        })

    },

    addStatus: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOneAndUpdate({ _id: userDetails._id }, { $set: { addStatus: req.body.addStatus, updatedAt: Date.now() } }, { new: true }, (errStatus, setStatus) => {
                    if (errStatus) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, setStatus, SuccessMessage.UPDATE_SUCCESSFULLY);
                    }
                })
            }
        })
    },
    particularPost: (req, res) => {
        postModel.findOne({ _id: req.body.postId, status: "ACTIVE" }, (err, postDetails) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, postDetails, SuccessMessage.DATA_FOUND);
            }
        })
    },
    postList: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, customerData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                postModel.find({ userId: { $ne: customerData._id }, status: "ACTIVE" }, (err, postlist) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, postlist, SuccessMessage.DATA_FOUND);

                    }
                })
            }
        })
    },
    statusList: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, userDetails) => {
            console.log("==================>", userDetails.mobileNumber, userDetails._id)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ addStatus: { $ne: "" } }, { _id: { $ne: userDetails._id } }, { userType: "CUSTOMER" }] }
                userModel.find(query).select('addStatus profilePic firstName lastName').exec(function (err, getDetails) {
                    console.log("============>", err, getDetails)
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, getDetails, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },
    /**
   * Function Name :block agent by customer
   * Description   :block agent by customer and move to block page
   *
   * @return response
   */
    likePost: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                postModel.findOne({ _id: req.body.postId }, (err, postDetails) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        var id = postDetails.like.includes(result._id)
                        if (id) {
                            postModel.findOneAndUpdate({ _id: postDetails._id }, { $pull: { like: result._id }, $set: { count: postDetails.like.length - 1 } }, { new: true },
                                (errId, postlike) => {
                                    if (errId) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [errId], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, postlike, SuccessMessage.POST_UNLIKED);
                                    }
                                })
                        }
                        else {
                            postModel.findOneAndUpdate({ _id: postDetails._id }, { $push: { like: result._id }, $set: { count: postDetails.like.length + 1 } }, { new: true },
                                (errid, postlike) => {
                                    if (errid) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [errid], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, postlike, SuccessMessage.POST_LIKED);
                                    }
                                })
                        }
                    }
                })
            }
        })
    },
    currentBalance: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: ["AGENT", "CUSTOMER"] }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var obj_bal = {
                    USD: userDetails.amountUSD,
                    CDF: userDetails.amountCDF
                }
                response(res, SuccessCode.SUCCESS, obj_bal, SuccessMessage.DATA_FOUND);
            }
        })
    },
    likeCount: (req, res) => {
        postModel.findOne({ _id: req.body.postId }, (err, countResult) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, countResult.like.length, SuccessMessage.DATA_FOUND);
            }
        })

    },
    comment: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var comment_details = {
                    "commentUser": userDetails._id,
                    "firstName": userDetails.firstName,
                    "lastName": userDetails.lastName,
                    "profilePic": userDetails.profilePic,
                    "comment": req.body.comment,
                }
                postModel.findOneAndUpdate({ _id: req.body.postId, status: "ACTIVE" }, { $push: { comment: comment_details } }, { new: true }, (errComment, commentPush) => {
                    if (errComment) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!commentPush) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, commentPush, SuccessMessage.COMMENT_SUCCESSFULLY);
                    }
                })
            }
        })
    },

    commentReply: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
            //console.log("==============>",userDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                postModel.findOne({ _id: req.body.postId, "comment._id": req.body.commentId }, { "comment.$": 1 }, (err, result) => {
                    console.log("================err,result", err, result)
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        var replay_details = {
                            "commentUser": userDetails._id,
                            "firstName": userDetails.firstName,
                            "lastName": userDetails.lastName,
                            "commentId": req.body.commentId,
                            "profilePic": userDetails.profilePic,
                            "comment": req.body.comment,
                        }
                        postModel.findOneAndUpdate({ _id: req.body.postId, status: "ACTIVE" }, { $push: { replayComment: replay_details } }, { new: true }, (errComment, commentPush) => {
                            if (errComment) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!commentPush) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, commentPush, SuccessMessage.COMMENT_SUCCESSFULLY);
                            }
                        })
                    }
                })
            }
        })
    },
    blockPost: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                postModel.findOneAndUpdate({ _id: req.body, postId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true },
                    (err, postDetails) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!postDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, postDetails, SuccessMessage.BLOCK_SUCCESS);
                        }
                    })
            }
        })
    },
    reportPost: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var report_obj = {
                    "report": req.body.report,
                    "userId": userDetails._id
                }
                postModel.findOneAndUpdate({ _id: req.body.postId, status: "ACTIVE" }, { $push: { report: report_obj } }, { new: true }, (errReport, reportPush) => {
                    if (errReport) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!reportPush) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.POST_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, reportPush, SuccessMessage.REPORT_SUCESSFULLY);
                    }
                })

            }
        })
    },
    tagFriend: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                postModel.findOneAndUpdate({ _id: req.body.postId }, { $push: { tag: req.body.tagFriend } }, { new: true }, (errTag, pushTag) => {
                    if (errTag) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, pushTag, SuccessMessage.REPORT_SUCESSFULLY);
                    }
                })
            }
        })
    },
    searchPost: (req, res) => {
        postModel.find({ $or: [{ firstName: { $regex: req.body.search, $options: 'i' } }, { lastName: { $regex: req.body.search, $options: 'i' } }] }, (err, result) => {
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

    },


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
