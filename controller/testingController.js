const userModel = require("../model/userModel");
const kycModel = require("../model/kycModel")
const qrCodeModel = require("../model/qrCodeModel")
const advModel = require("../model/advertismentModel")
const postModel = require('../model/postModel')
const notificationModel = require("../model/notificationModel")
const questionModel = require('../model/securityQuestionModel')
var transactionModel = require("../model/transactionModel")
const messageModel = require("../model/messageModel")

const { commonResponse: response } = require('../helper/responseHandler')
const { ErrorMessage } = require('../helper/responseMessege')
const { SuccessMessage } = require('../helper/responseMessege')

const { SuccessCode } = require('../helper/responseCode')
const { ErrorCode } = require('../helper/responseCode')
const bcrypt = require("bcrypt-nodejs");
const commonFunction = require('../helper/commonFunction')
const jwt = require('jsonwebtoken');

var stripe = require('stripe')("sk_test_t2fJWVp97shROH00gOMKufz6004YNf82sg");

var phoneNumber,agentList,passwordCheck,obj,notification_Status,convertCDFamountInUSD,notificationStatus
module.exports = {
    /**
     * Function Name :signUp
     * Description   : signUp by customer
     *
     * @return response
     */
    signUp: async (req, res) => {

        stripe.accounts.create({
            type: "custom",
            email: req.body.emailId,
            requested_capabilities: ['card_payments', 'transfers'],
        }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
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
                        questionModel.findOne({ _id: req.body.questionId, }, (error, question) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!question) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                var otp = commonFunction.getOTP()
                                 phoneNumber = req.body.countryCode + req.body.mobileNumber

                                commonFunction.sendSMS(phoneNumber, `Thanks for registering. Your otp is :- ${otp}`, (error, otpSent) => {
                                    console.log("===================>", error)
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                    }
                                    else {
                                        var qrCodeDetails = `${req.body.emailId},${req.body.mobileNumber},${req.body.firstName + " " + req.body.lastName},${result.id}`
                                        commonFunction.qrcodeGenrate(qrCodeDetails, async (error, qrResult) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                            }
                                            else {
                                                 obj = {
                                                    firstName: req.body.firstName,
                                                    lastName: req.body.lastName,
                                                    middleName: req.body.middleName,
                                                    password: bcrypt.hashSync(req.body.password),
                                                    mobileNumber: req.body.mobileNumber,
                                                    gender: req.body.gender,
                                                    questionId: question._id,
                                                    answer: req.body.answer,
                                                    state: req.body.state,
                                                    userName: req.body.userName,
                                                    qrCode: await convertImage(qrResult),
                                                    accountId: result.id,
                                                    emailId: req.body.emailId,
                                                    countryCode: req.body.countryCode,
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
                                                        response(res, SuccessCode.SUCCESS, finalData, SuccessMessage.ACCOUNT_CREATION)
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
                if (result.otp == req.body.otp) {
                    var currentTIme = Date.now()
                    var difference = currentTIme - result.otpTime
                    console.log(">>>>>>", difference)
                    if (difference < 600000) {
                        userModel.findOneAndUpdate({ mobileNumber: result.mobileNumber }, { $set: { verifyOtp: true } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.VERIFY_OTP);
                            }
                        })
                    }
                    else {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);

                    }

                }
                else {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_OTP);
                }
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
                        userModel.findOneAndUpdate({ _id: customerData._id, userType: "CUSTOMER" }, { $set: { password: newPassword } }, { new: true }, (error, updatePassword) => {
                            if (error) {
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
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, result) => {
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
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, userDetails) => {
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

    //================================================addCard================================================================
    addCard: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!result) {
                    res.send({ responseCode: 201, responseMessege: "User not found" })
                } else {
                    stripe.accounts.create({
                        type: 'custom',
                        email: result.email,
                        country: 'US',
                        requested_capabilities: ['card_payments', 'transfers'],
                    }, (error, stripeResult) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else {
                            let card = {
                                name: req.body.name,
                                bankName: req.body.bankName,
                                cardNumber: req.body.cardNumber,
                                expMonth: req.body.expMonth,
                                expYear: req.body.expYear,
                                cvvNumber: bcrypt.hashSync(req.body.cvvNumber),
                                stripeAccountId: stripeResult.id
                            }

                            userModel.findOneAndUpdate({ _id: result._id }, { $push: { cardDetails: card } }, { new: true }, (err1, result1) => {
                                if (err1) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                } else {
                                    res.send({ responseCode: 200, responseMessege: "Card created successfully", result1 })
                                }
                            })
                        }

                    })

                }
            })
        }
        catch (error) {
            console.log(error)
            res.send({ responseCode: 500, responseMessege: "somthing went wrong" })
        }
    },
    editsettingInformation: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, async (error, result) => {
                console.log("================>,user", result)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {

                     obj = {}
                    if (req.body.name) {
                        obj.firstName = req.body.name
                    }
                    if (req.body.userStatus) {
                        obj.userStatus = req.body.userStatus
                    }
                    if (req.body.profilePic) {
                        obj.profilePic = await convertImage(req.body.profilePic)
                    }
                    userModel.findOneAndUpdate({ _id: result._id, status: "ACTIVE", userType: "CUSTOMER" }, { $set: obj }, { new: true }, (error, userData) => {
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

    postAdd: (req, res) => {
        try {
            console.log("================---==>")
            new postModel(req.body).save((error, saveData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, saveData, SuccessMessage.DATA_SAVED)
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
                        var pass = bcrypt.compareSync(req.body.password, customerData.password)
                        if (pass) {
                             obj = {
                                name: customerData.firstName + " " + customerData.lastName,
                                customer_Id: customerData._id,
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
                    console.log("===========>", error, agentData.Name, agentData._id)
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!agentData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
                    }
                    else {
                        var pass = bcrypt.compareSync(req.body.password, customerData.password)
                        if (pass) {
                             obj = {
                                name: customerData.firstName + " " + customerData.lastName,
                                customer_Id: customerData._id,
                                agent_Id: agentData._id,
                                agentId: agentData.agentId,
                                amount: req.body.amount,
                                notifications: `${customerData.firstName + " " + customerData.lastName} requested ${req.body.amount} for withdraw money`,
                                amountType: req.body.amountType,
                                customer_MobileNumber: customerData.mobileNumber,
                                agent_MobileNumber: agentData.mobileNumber,
                                notificationType: "Withdraw"
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
                })
            }
        })
    },

    //==================sending money by customer wallet to agent wallet by customer when customer transfer/Send money to agent wallet for withdraw cash======================//
    /**
           * Function Name : withdraw cash by customer 
           * Description   : withdraw cash by cusotmer after request approve by agent
           *
           * @return response
           */
    sendMoneyByCusotmerToCustomerOrAgent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } },
                        async (error, numberDetails) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!numberDetails) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                            }
                            else {
                                if (numberDetails.userType == "AGENT") {
                                    if (customerDetails.balance < req.body.amount || customerDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                        if (req.body.amountType == "USD") {
                                             passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                            if (passwordCheck) {
                                                if (customerDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                if (numberDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                else {
                                                     notificationStatus = await notificationModel.findOneAndUpdate({ agent_MobileNumber: req.body.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING" }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notificationStatus) {
                                                         obj = {
                                                            "agentId": numberDetails.agentId,
                                                            "agent_id": numberDetails._id,
                                                            "amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.name,
                                                            "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                        }  
                                                        new transactionModel(obj).save(async (error, saveTransaction) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                var amountLess = parseInt(customerDetails.balance) - parseInt(req.body.amount)
                                                                var senderBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                                if (senderBalance) {
                                                                    var amountAdd = parseInt(numberDetails.balance) + parseInt(req.body.amount)
                                                                    var receiverBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                    if (receiverBalance) {
                                                                         phoneNumber = "+91" + customerDetails.mobileNumber
                                                                        commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                                commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msg_Sent) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
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
                                        else {
                                            var convertCDFinUSD = 0.121 * parseInt(req.body.amount)
                                            if (customerDetails.balance < convertCDFinUSD || customerDetails.balance == 0) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                            }
                                            else {
                                                var password_Check = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                if (password_Check) {
                                                    if (customerDetails.kycStatus == "unverified") {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                    }
                                                    if (numberDetails.kycStatus == "unverified") {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                    }
                                                    else {
                                                         notification_Status = await notificationModel.findOneAndUpdate({ agent_MobileNumber: req.body.mobileNumber, customer_MobileNumber: customerDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING" }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                        if (notification_Status) {
                                                            var obj1 = {
                                                                "agentId": numberDetails.agentId,
                                                                "agent_id": numberDetails._id,
                                                                "amount": req.body.amount,
                                                                "amountType": req.body.amountType,
                                                                "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                "receiveMoneyBy": numberDetails.name,
                                                                "sender_id": customerDetails._id,
                                                                "receiver_id": numberDetails._id,
                                                                "sender_mobileNumber": customerDetails.mobileNumber,
                                                                "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            }
                                                            new transactionModel(obj1).save(async (error, saveTransaction) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var amountLess = parseInt(customerDetails.balance) - parseInt(req.body.amount)
                                                                    var senderBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                                    if (senderBalance) {
                                                                        var amountAdd = parseInt(numberDetails.balance) + parseInt(req.body.amount)
                                                                        var receiverBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                        if (receiverBalance) {
                                                                            phoneNumber = "+91" + customerDetails.mobileNumber
                                                                            commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                    phoneNumber = "+91" + numberDetails.mobileNumber
                                                                                    commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
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
                                        }
                                    }
                                }
                                else {
                                    if (numberDetails.userType == "CUSTOMER") {
                                        if (customerDetails.balance < req.body.amount || customerDetails.balance == 0) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                        }
                                        else {
                                            if (req.body.amountType == "USD") {
                                                var passwordCheck1 = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                if (passwordCheck1) {
                                                    if (customerDetails.kycStatus == "unverified") {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                    }
                                                    if (numberDetails.kycStatus == "unverified") {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                    }
                                                    else {
                                                        var obj_save = {
                                                            "amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.name,
                                                            "sender_id": customerDetails._id,
                                                            "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                        }
                                                        new transactionModel(obj_save).save(async (error, saveTransaction) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                var amountLess = parseInt(customerDetails.balance) - parseInt(req.body.amount)
                                                                var senderBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                                if (senderBalance) {
                                                                    var amountAdd = parseInt(numberDetails.balance) + parseInt(req.body.amount)
                                                                    var receiverBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                    if (receiverBalance) {
                                                                      phoneNumber = "+91" + customerDetails.mobileNumber
                                                                        commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                phoneNumber = "+91" + numberDetails.mobileNumber
                                                                                commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                }

                                                            }
                                                        })

                                                    }
                                                }
                                                else {
                                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                }
                                            }
                                            else {
                                                 convertCDFinUSD = 0.121 * parseInt(req.body.amount)
                                                if (customerDetails.balance < convertCDFinUSD || customerDetails.balance == 0) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                                }
                                                else {
                                                     passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                                    if (passwordCheck) {
                                                        if (customerDetails.kycStatus == "unverified") {
                                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                        }
                                                        if (numberDetails.kycStatus == "unverified") {
                                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                        }
                                                        else {
                                                             obj = {
                                                                "amount": req.body.amount,
                                                                "amountType": req.body.amountType,
                                                                "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                "receiveMoneyBy": numberDetails.name,
                                                                "sender_id": customerDetails._id,
                                                                "receiver_id": numberDetails._id,
                                                                "sender_mobileNumber": customerDetails.mobileNumber,
                                                                "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            }
                                                            new transactionModel(obj).save(async (error, saveTransaction) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var amountLess = parseInt(customerDetails.balance) - convertCDFinUSD
                                                                    var senderBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                                    if (senderBalance) {
                                                                        var amountAdd = parseInt(numberDetails.balance) + convertCDFinUSD
                                                                        var receiverBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                        if (receiverBalance) {
                                                                             phoneNumber = "+91" + customerDetails.mobileNumber
                                                                            commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                                                                    commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    }

                                                                }
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                                    }
                                                }
                                            }
                                        }
                                    }
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
    //==================receive money by customer from agent or customer======================//
    /**
           * Function Name : add cash by agent to customer wallet OR transfer wallet to wallet by customers 
           * Description   : add cash by agent after request approve by agent OR customer sending money to customer wallet
           *
           * @return response
           */
    receiveMoneyByCusotmerFromCustomerOrAgent: (req, res) => {  
        userModel.findOne({ _id: req.userId, userType: { $in: ["AGENT","CUSTOMER"] }, status: "ACTIVE" }, async(error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "CUSTOMER", status: "ACTIVE" },
                async (error, customerDetails) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        if (numberDetails.userType == "AGENT") {
                            if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            else {
                                if (req.body.amountType == "USD") {
                                    passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                    if (passwordCheck) {
                                        if (numberDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);    
                                        }
                                        if (customerDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        else {         
                                             notificationStatus = await notificationModel.findOneAndUpdate({ agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: req.body.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING" }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                            if (notificationStatus) {
                                                 obj = {      
                                                    "agentId": numberDetails.agentId,
                                                    "agent_id": numberDetails._id,
                                                    "amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": numberDetails.name,
                                                    "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "sender_id": numberDetails._id,
                                                    "receiver_id": customerDetails._id,
                                                    "sender_mobileNumber": numberDetails.mobileNumber,
                                                    "receiver_mobileNumber": customerDetails.mobileNumber,
                                                }
                                                new transactionModel(obj).save(async (error, saveTransaction) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        var amountLess = parseInt(numberDetails.balance) - parseInt(req.body.amount)
                                                        var senderBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                        if (senderBalance) {
                                                            var amountAdd = parseInt(customerDetails.balance) + parseInt(req.body.amount)
                                                            var receiverBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                            if (receiverBalance) {
                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                         phoneNumber = "+91" + customerDetails.mobileNumber
                                                                        commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                            }
                                                                        })
                                                                    }
                                                                })
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
                                else {
                                    var convertCDFinUSD = 0.121 * parseInt(req.body.amount)
                                    if (numberDetails.balance < convertCDFinUSD || customerDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                         passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                        if (passwordCheck) {
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                 notificationStatus = await notificationModel.findOneAndUpdate({agent_MobileNumber: numberDetails.mobileNumber, customer_MobileNumber: req.body.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING" }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                if (notificationStatus) {
                                                     obj = {
                                                        "agentId": numberDetails.agentId,
                                                        "agent_id": numberDetails._id,
                                                        "amount": req.body.amount,
                                                        "amountType": req.body.amountType,
                                                        "sendMoneyBy": numberDetails.name,
                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                        "sender_id": numberDetails._id,
                                                        "receiver_id": customerDetails._id,
                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                    }
                                                    new transactionModel(obj).save(async (error, saveTransaction) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            var amountLess = parseInt(numberDetails.balance) - convertCDFinUSD
                                                            var senderBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                            if (senderBalance) {
                                                                var amountAdd = parseInt(customerDetails.balance) + convertCDFinUSD
                                                                var receiverBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                if (receiverBalance) {
                                                                    phoneNumber = "+91" + numberDetails.mobileNumber
                                                                    commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {
                                                                            phoneNumber = "+91" + customerDetails.mobileNumber
                                                                            commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                    response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (numberDetails.userType == "CUSTOMER") {
                                if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                    if (req.body.amountType == "USD") {
                                         passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                        if (passwordCheck) {
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                 obj = {
                                                    "amount": req.body.amount,
                                                    "amountType": req.body.amountType,
                                                    "sendMoneyBy": numberDetails.name,
                                                    "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                    "sender_id": numberDetails._id,
                                                    "receiver_id": customerDetails._id,
                                                    "sender_mobileNumber": numberDetails.mobileNumber,
                                                    "receiver_mobileNumber": customerDetails.mobileNumber,
                                                }
                                                new transactionModel(obj).save(async (error, saveTransaction) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        var amountLess = parseInt(numberDetails.balance) - parseInt(req.body.amount)
                                                        var senderBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                        if (senderBalance) {
                                                            var amountAdd = parseInt(customerDetails.balance) + parseInt(req.body.amount)
                                                            var receiverBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                            if (receiverBalance) {
                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        phoneNumber = "+91" + customerDetails.mobileNumber
                                                                        commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                    else {
                                         convertCDFinUSD = 0.121 * parseInt(req.body.amount)
                                        if (numberDetails.balance < convertCDFinUSD || customerDetails.balance == 0) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                        }
                                        else {
                                            passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                            if (passwordCheck) {
                                                if (customerDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                if (numberDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                else {
                                                     obj = {
                                                        "amount": req.body.amount,
                                                        "amountType": req.body.amountType,
                                                        "sendMoneyBy": numberDetails.name,
                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                        "sender_id": numberDetails._id,
                                                        "receiver_id": customerDetails._id,
                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                    }
                                                    new transactionModel(obj).save(async (error, saveTransaction) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            var amountLess = parseInt(numberDetails.balance) - convertCDFinUSD
                                                            var senderBalance = await userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: amountLess } }, { new: true })
                                                            if (senderBalance) {
                                                                var amountAdd = parseInt(customerDetails.balance) + convertCDFinUSD
                                                                var receiverBalance = await userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: amountAdd } }, { new: true })
                                                                if (receiverBalance) {
                                                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                                                    commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {
                                                                         phoneNumber = "+91" + customerDetails.mobileNumber
                                                                            commonFunction.sendTextOnMobileNumber(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                    response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
                                                                                }
                                                                            })  
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                            }
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

    //==============================list of notification for customer=================================
    listOfNotificationForCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                notificationModel.find({ customer_Id: userDetails._id }, (error, notificationList) => {
                    if (error) {
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

    sendAdminToKycDetails: (req, res) => {
        if (req.body.VoterID_Name && req.body.VoterID_Number) {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
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
    payMoneyUsingQRCodeByCustomerToCustomerOrAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } },
                    (error, numberDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!numberDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            if (numberDetails.userType == "AGENT") {
                                if (customerDetails.balance < req.body.amount || customerDetails.balance == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                if (req.body.amountType == "USD") {
                                     passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                    if (passwordCheck) {
                                        if (customerDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        if (numberDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        else {
                                            phoneNumber = "+91" + customerDetails.mobileNumber
                                            commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance - req.body.amount } },
                                                        { new: true }, (error, senderDetails) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance + req.body.amount } },
                                                                            { new: true }, (error, receiverDetails) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                    notificationModel.findOneAndUpdate({
                                                                                        agent_MobileNumber: req.body.mobileNumber, cusotmer_mobileNumber: customerDetails.mobileNumber,
                                                                                        notificationType: "Withdraw", transactionStatus: "PENDING"
                                                                                    }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                        { new: true }, (error, transactionUpdate) => {
                                                                                            if (error) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                 obj = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "amount": req.body.amount,
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.name,
                                                                                                    "sender_id": customerDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber
                                                                                                }
                                                                                                new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                    if (error) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                    }
                                                                                                    else {
                                                                                                        response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                    else {
                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                    }
                                }
                                else {
                                    if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                         convertCDFamountInUSD = 0.24214 * req.body.amount
                                        if (customerDetails.balance < convertCDFamountInUSD || customerDetails.balance == 0) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                        }
                                        else {
                                             passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                            if (passwordCheck) {
                                                if (customerDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                if (numberDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                else {
                                                    phoneNumber = "+91" + customerDetails.mobileNumber
                                                    commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance - convertCDFamountInUSD } },
                                                                { new: true }, (error, senderDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                         phoneNumber = "+91" + numberDetails.mobileNumber
                                                                        commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance + convertCDFamountInUSD } },
                                                                                    { new: true }, (error, receiverDetails) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            notificationModel.findOneAndUpdate({
                                                                                                agent_MobileNumber: req.body.mobileNumber, cusotmer_mobileNumber: customerDetails.mobileNumber,
                                                                                                notificationType: "Withdraw", transactionStatus: "PENDING"
                                                                                            }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                                { new: true }, (error, transactionUpdate) => {
                                                                                                    if (error) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                    }
                                                                                                    else {
                                                                                                         obj = {
                                                                                                            "agentId": numberDetails.agentId,
                                                                                                            "agent_id": numberDetails._id,
                                                                                                            "amount": req.body.amount,
                                                                                                            "amountType": req.body.amountType,
                                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                                            "sender_id": customerDetails._id,
                                                                                                            "receiver_id": numberDetails._id,
                                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber
                                                                                                        }
                                                                                                        new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                            if (error) {
                                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                            }
                                                                                                            else {
                                                                                                                response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                            else {
                                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                            }

                                        }
                                    }
                                }

                            }
                            else {
                                if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                    if (customerDetails.balance < req.body.amount || customerDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                         passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                        if (passwordCheck) {
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                 phoneNumber = "+91" + customerDetails.mobileNumber
                                                commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance - req.body.amount } },
                                                            { new: true }, (error, senderDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                     phoneNumber = "+91" + numberDetails.mobileNumber   
                                                                    commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {  
                                                                            userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance + req.body.amount } },
                                                                                { new: true }, (error, receiverDetails) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                         obj = {
                                                                                            "agentId": numberDetails.agentId,
                                                                                            "agent_id": numberDetails._id,
                                                                                            "amount": req.body.amount,
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            "receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                        }
                                                                                        new transactionModel(obj).save((error, saveTransaction) => {
                                                                                            if (error) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                                else {
                                    if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                         convertCDFamountInUSD = 0.24214 * req.body.amount
                                        if (customerDetails.balance < convertCDFamountInUSD || customerDetails.balance == 0) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                        }
                                        else {
                                            passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                            if (passwordCheck) {
                                                if (customerDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                if (numberDetails.kycStatus == "unverified") {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                                }
                                                else {
                                                     phoneNumber = "+91" + customerDetails.mobileNumber
                                                    commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance - convertCDFamountInUSD } },
                                                                { new: true }, (error, senderDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                         phoneNumber = "+91" + numberDetails.mobileNumber
                                                                        commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance + convertCDFamountInUSD } },
                                                                                    { new: true }, (error, receiverDetails) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                             obj = {
                                                                                                "agentId": numberDetails.agentId,
                                                                                                "agent_id": numberDetails._id,
                                                                                                "amount": req.body.amount,
                                                                                                "amountType": req.body.amountType,
                                                                                                "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                "receiveMoneyBy": numberDetails.name,
                                                                                                "sender_id": customerDetails._id,
                                                                                                "receiver_id": numberDetails._id,
                                                                                                "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                                "receiver_mobileNumber": numberDetails.mobileNumber
                                                                                            }
                                                                                            new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                if (error) {
                                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else {
                                                                                                    response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                            else {
                                                response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
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
    receiveMoneyUsingQRCodeByCustomerFromCustomerOrAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["AGENT", "CUSTOMER"] }, status: "ACTIVE" }, (error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        if (numberDetails.userType == "AGENT") {
                            if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            if (req.body.amountType == "USD") {
                                 passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (passwordCheck) {
                                    if (numberDetails.kycStatus == "unverified") {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                    }
                                    if (customerDetails.kycStatus == "unverified") {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                    }
                                    else {
                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                        commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - req.body.amount } },
                                                    { new: true }, (error, senderDetails) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            phoneNumber = "+91" + numberDetails.mobileNumber
                                                            commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + req.body.amount } },
                                                                        { new: true }, (error, sender_Details) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                notificationModel.findOneAndUpdate({
                                                                                    cusotmer_mobileNumber: req.body.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber,
                                                                                    notificationType: "Add", transactionStatus: "PENDING"
                                                                                }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                    { new: true }, (error, transactionUpdate) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                        obj = {
                                                                                                "agentId": numberDetails.agentId,
                                                                                                "agent_id": numberDetails._id,
                                                                                                "amount": req.body.amount,
                                                                                                "amountType": req.body.amountType,
                                                                                                "sendMoneyBy": numberDetails.name,
                                                                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                "sender_id": numberDetails._id,
                                                                                                "receiver_id": customerDetails._id,
                                                                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                                "receiver_mobileNumber": customerDetails.mobileNumber
                                                                                            }
                                                                                            new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                if (error) {
                                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else {
                                                                                                    response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                else {
                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                }
                            }
                            else {
                                if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                     convertCDFamountInUSD = 0.24214 * req.body.amount
                                    if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                         passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                        if (passwordCheck) {
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                phoneNumber = "+91" + numberDetails.mobileNumber
                                                commonFunction.sendSMS(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - convertCDFamountInUSD } },
                                                            { new: true }, (error, senderDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                                                    commonFunction.sendSMS(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {
                                                                            userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + convertCDFamountInUSD } },
                                                                                { new: true }, (error, receiverDetails) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        notificationModel.findOneAndUpdate({
                                                                                            cusotmer_mobileNumber: req.body.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber,
                                                                                            notificationType: "Add", transactionStatus: "PENDING"
                                                                                        }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                            { new: true }, (error, transactionUpdate) => {
                                                                                                if (error) {
                                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else {
                                                                                                    obj = {
                                                                                                        "agentId": numberDetails.agentId,
                                                                                                        "agent_id": numberDetails._id,
                                                                                                        "amount": req.body.amount,
                                                                                                        "amountType": req.body.amountType,
                                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                        "sender_id": numberDetails._id,
                                                                                                        "receiver_id": customerDetails._id,
                                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber
                                                                                                    }
                                                                                                    new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                        if (error) {
                                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                        }
                                                                                                        else {
                                                                                                            response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                     passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                    if (passwordCheck) {
                                        if (numberDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        if (customerDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        else {
                                            phoneNumber = "+91" + numberDetails.mobileNumber
                                            commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - req.body.amount } },
                                                        { new: true }, (error, senderDetails) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + req.body.amount } },
                                                                            { new: true }, (error, sender_Details) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                     obj = {
                                                                                        "amount": req.body.amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                        "sender_id": numberDetails._id,
                                                                                        "receiver_id": customerDetails._id,
                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber,
                                                                                        "transactionStatus": "COMPLETED"
                                                                                    }
                                                                                    new transactionModel(obj).save((error, saveTransaction) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                            response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                    else {
                                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                    }
                                }
                            }
                            else {
                                if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                    var convert_CDFamountIn_USD = 0.24214 * req.body.amount
                                    if (customerDetails.balance < convert_CDFamountIn_USD || customerDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, customerDetails.password)
                                        if (passwordCheck) {
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                var phone_Number = "+91" + customerDetails.mobileNumber
                                                commonFunction.sendSMS(phone_Number, 'requested amount debited to you wallet', (error, msgSent) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance - convert_CDFamountIn_USD } },
                                                            { new: true }, (error, senderDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                                                    commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msg_Sent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {
                                                                            userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance + convert_CDFamountIn_USD } },
                                                                                { new: true }, (error, receiverDetails) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                         obj = {
                                                                                            "amount": req.body.amount,
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.name,
                                                                                            "sender_id": customerDetails._id,
                                                                                            "receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": customerDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "transactionStatus": "COMPLETED"
                                                                                        }
                                                                                        new transactionModel(obj).save((error, saveTransaction) => {
                                                                                            if (error) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
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
    //==========================================F.API
    sendMoneyAgentTOCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["AGENT","CUSTOMER"] }, status: "ACTIVE" }, (error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, userType: "CUSTOMER", status: "ACTIVE" }, (error, customerDetails) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        if (numberDetails.userType == "AGENT") {
                            if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                            }
                            if (req.body.amountType == "USD") {
                                 passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                if (passwordCheck) {
                                    if (numberDetails.kycStatus == "unverified") {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                    }
                                    if (customerDetails.kycStatus == "unverified") {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                    }
                                    else {
                                         phoneNumber = "+91" + numberDetails.mobileNumber
                                        commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                            if (error) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - req.body.amount } },
                                                    { new: true }, (error, senderDetails) => {
                                                        if (error) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            phoneNumber = "+91" + numberDetails.mobileNumber
                                                            commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + req.body.amount } },
                                                                        { new: true }, (error, sender_Details) => {
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                notificationModel.findOneAndUpdate({
                                                                                    cusotmer_mobileNumber: req.body.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber,
                                                                                    notificationType: "Add", transactionStatus: "PENDING"
                                                                                }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                    { new: true }, (error, transactionUpdate) => {
                                                                                        if (error) {
                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else {
                                                                                             obj = {
                                                                                                "agentId": numberDetails.agentId,
                                                                                                "agent_id": numberDetails._id,
                                                                                                "amount": req.body.amount,
                                                                                                "amountType": req.body.amountType,
                                                                                                "sendMoneyBy": numberDetails.name,
                                                                                                "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                "sender_id": numberDetails._id,
                                                                                                "receiver_id": customerDetails._id,
                                                                                                "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                                "receiver_mobileNumber": customerDetails.mobileNumber
                                                                                            }
                                                                                            new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                if (error) {
                                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else {
                                                                                                    response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                else {
                                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                }
                            }
                            else {
                                if (numberDetails.userType == "AGENT" && req.body.amountType == "CDF") {
                                     convertCDFamountInUSD = 0.24214 * req.body.amount
                                    if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    else {
                                        var passwordCheck2 = bcrypt.compareSync(req.body.password, numberDetails.password)
                                        if (passwordCheck2) {
                                            if (numberDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            if (customerDetails.kycStatus == "unverified") {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                            }
                                            else {
                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                commonFunction.sendSMS(phoneNumber, 'requested amount debited to your wallet', (error, msgSent) => {
                                                    if (error) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - convertCDFamountInUSD } },
                                                            { new: true }, (error, senderDetails) => {
                                                                if (error) {
                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                     phoneNumber = "+91" + numberDetails.mobileNumber
                                                                    commonFunction.sendSMS(phoneNumber, 'requested amount credit to your wallet', (error, msg_Sent) => {
                                                                        if (error) {
                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                        }
                                                                        else {
                                                                            userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + convertCDFamountInUSD } },
                                                                                { new: true }, (error, receiverDetails) => {
                                                                                    if (error) {
                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        notificationModel.findOneAndUpdate({
                                                                                            cusotmer_mobileNumber: req.body.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber,
                                                                                            notificationType: "Add", transactionStatus: "PENDING"
                                                                                        }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                            { new: true }, (error, transactionUpdate) => {
                                                                                                if (error) {
                                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else {
                                                                                                   obj = {
                                                                                                        "agentId": numberDetails.agentId,
                                                                                                        "agent_id": numberDetails._id,
                                                                                                        "amount": req.body.amount,
                                                                                                        "amountType": req.body.amountType,
                                                                                                        "sendMoneyBy": numberDetails.name,
                                                                                                        "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                        "sender_id": numberDetails._id,
                                                                                                        "receiver_id": customerDetails._id,
                                                                                                        "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                                        "receiver_mobileNumber": customerDetails.mobileNumber
                                                                                                    }
                                                                                                    new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                        if (error) {
                                                                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                        }
                                                                                                        else {
                                                                                                            response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                if (numberDetails.balance < req.body.amount || numberDetails.balance == 0) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                }
                                else {
                                     passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                    if (passwordCheck) {
                                        if (numberDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        if (customerDetails.kycStatus == "unverified") {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                                        }
                                        else {
                                             phoneNumber = "+91" + numberDetails.mobileNumber
                                            commonFunction.sendSMS(phoneNumber, 'requested amount debited to you wallet', (error, msgSent) => {
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    userModel.findOneAndUpdate({ _id: numberDetails._id }, { $set: { balance: numberDetails.balance - req.body.amount } },
                                                        { new: true }, (error, senderDetails) => {
                                                            if (error) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                 phoneNumber = "+91" + numberDetails.mobileNumber
                                                                commonFunction.sendSMS(phoneNumber, 'requested amount credit to you wallet', (error, msg_Sent) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        userModel.findOneAndUpdate({ _id: customerDetails._id }, { $set: { balance: customerDetails.balance + req.body.amount } },
                                                                            { new: true }, (error, sender_Details) => {
                                                                                if (error) {
                                                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                }
                                                                                else {
                                                                                    notificationModel.findOneAndUpdate({
                                                                                        cusotmer_mobileNumber: req.body.mobileNumber, agent_MobileNumber: numberDetails.mobileNumber,
                                                                                        notificationType: "Add", transactionStatus: "PENDING"
                                                                                    }, { $set: { transactionStatus: "COMPLETED" } },
                                                                                        { new: true }, (error, transactionUpdate) => {
                                                                                            if (error) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                 obj = {
                                                                                                    "agentId": numberDetails.agentId,
                                                                                                    "agent_id": numberDetails._id,
                                                                                                    "amount": req.body.amount,
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": numberDetails.name,
                                                                                                    "receiveMoneyBy": customerDetails.firstName + " " + customerDetails.lastName,
                                                                                                    "sender_id": numberDetails._id,
                                                                                                    "receiver_id": customerDetails._id,
                                                                                                    "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": customerDetails.mobileNumber
                                                                                                }
                                                                                                new transactionModel(obj).save((error, saveTransaction) => {
                                                                                                    if (error) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                    }
                                                                                                    else {
                                                                                                        response(res, SuccessCode.SUCCESS, saveTransaction, SuccessMessage.TRANSACTION_COMPLETED);
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
                                }
                            }
                        }

                    }
                })
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
                transactionModel.find(query, (error, transactionDetails) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS.SOMETHING_WRONG, transactionDetails, SuccessMessage.DATA_FOUND);
                    }
                })

            }
        })
    },

    profileOfFriend: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                userModel.findOne({ _id: req.body._id, status: "ACTIVE", userType: "CUSTOMER" }, (error, friendProfile) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!friendProfile) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, friendProfile, ErrorMessage.DATA_FOUND);
                    }
                })
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



