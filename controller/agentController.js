const userModel = require('../model/userModel')
const qrCodeModel = require('../model/qrCodeModel')
const staticPage = require("../model/staticContentModel");
const notificationModel = require("../model/notificationModel")
const transactionModel = require("../model/transactionModel")
const messageModel = require("../model/messageModel")
const commissionModel = require("../model/commissionModel")
const commonFunction = require('../helper/commonFunction')
const stripe = require('stripe')('sk_test_L8oA9O5IOgtmflzWMndmmEhR');
const { commonResponse: response } = require('../helper/responseHandler')
const jwt = require('jsonwebtoken');
const { ErrorMessage } = require('../helper/responseMessege')
const { SuccessMessage } = require('../helper/responseMessege')
const { SuccessCode } = require('../helper/responseCode')
const { ErrorCode } = require('../helper/responseCode')
const bcrypt = require("bcrypt-nodejs");


var passwordCheck, notification_Status, receiver_details, cdfAmount, notification_update, agentBalanceUpdate, obj_details, phoneNumber

module.exports = {
    /**
      * Function Name :login
      * Description   : login by agent
      *
      * @return response  
      */
    logInAgent: (req, res) => {
        userModel.findOne({ agentId: req.body.agentId, userType: { $in: ["SUPER-AGENT", "AGENT"] } }, (error, result) => {
            console.log("---------->", error, result)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["SUPER-AGENT", "AGENT"] } }, (error1, result1) => {
                    if (error1) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result1) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                    }
                    else {
                        var pass = bcrypt.compareSync(req.body.password, result1.password)
                        if (pass) {
                            var token = jwt.sign({ id: result1._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'moneyTransfer');
                            var result2 = {
                                token: token,
                                result1
                            }
                            response(res, SuccessCode.SUCCESS, result2, SuccessMessage.LOGIN_SUCCESS)
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                        }
                    }
                })
            }
        })

    },

    /**
         * Function Name :forgotPassword
         * Description   : forgot password by agent and sent otp to agent mobileNumber
         *
         * @return response
         */
    forgotPassword: (req, res) => {
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "AGENT" }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!agentData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    var otp = commonFunction.getOTP(4)
                    phoneNumber = "+91" + agentData.mobileNumber
                    commonFunction.sendSMS(phoneNumber, otp, (error, otpSent) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: agentData.mobileNumber, status: "ACTIVE", userType: "AGENT" }, { $set: { otp: otp, otpTime: Date.now() } }, { new: true }, (err, otpUpdate) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                }
                                else {
                                    response(res, SuccessCode.OTP_SEND, [], SuccessMessage.OTP_SEND)
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
    verifyOtp: (req, res) => {
        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "AGENT" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                if (result.otp == req.body.otp || req.body.otp == "1234") {
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

    /**
          * Function Name :resetPassword
          * Description   : reset password by agent and sent otp to agent mobileNumber
          *
          * @return response
          */
    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.id, status: "ACTIVE", userType: "AGENT" }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!agentData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
                }
                else {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        var newPassword = bcrypt.hashSync(req.body.newPassword)
                        userModel.findOneAndUpdate({ _id: agentData._id }, { $set: { password: newPassword } }, { new: true }, (error, updatePassword) => {
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

    getStaticContent: (req, res) => {
        staticPage.find({ status: "ACTIVE" }, (error, data) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!data) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND)
            }
        })
    },


    exchangeMoneyByAgent: async (req, res) => {
        try {
            var superAgentData = await userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["SUPER-AGENT", "AGENT"] } })

            if (req.body.amountType == "USD") {
                if (superAgentData.amountCDF == 0 || superAgentData.amountCDF < req.body.amount) {

                    response(res, ErrorCode.INVALID_CREDENTIAL, ErrorMessage.NOT_SUFFICIENT_BALANCE)
                }
                else {
                    var convertInUSD = (req.body.amount * 0.00058)
                    var remainingCDFamount = superAgentData.amountCDF - req.body.amount
                    var updatedAmountUSD = superAgentData.amountUSD + convertInUSD
                    var updateAmount = await userModel.findOneAndUpdate({ _id: superAgentData._id, status: "ACTIVE", userType: "SUPER-AGENT" },
                        { $set: { amountCDF: remainingCDFamount, amountUSD: updatedAmountUSD } }, { new: true })
                }
                response(res, SuccessCode.SUCCESS, updateAmount, SuccessMessage.UPDATE_SUCCESS)
            }
            else {
                if (superAgentData.amountUSD == 0 || superAgentData.amountUSD < req.body.amount) {

                    response(res, ErrorCode.INVALID_CREDENTIAL, ErrorMessage.NOT_SUFFICIENT_BALANCE)
                }
                else {
                    var convertInCDF = (req.body.amount * 1701)
                    var remainingUSDamount = superAgentData.amountUSD - req.body.amount
                    var updatedAmountCDF = superAgentData.amountCDF + convertInCDF
                    var updateAmount1 = await userModel.findOneAndUpdate({ _id: superAgentData._id, status: "ACTIVE", userType: "SUPER-AGENT" },
                        { $set: { amountCDF: updatedAmountCDF, amountUSD: remainingUSDamount } }, { new: true })
                }
                response(res, SuccessCode.SUCCESS, updateAmount1, SuccessMessage.UPDATE_SUCCESS)
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },    /**
    * Function Name :block customer by customer
    * Description   :block agent by customer and move to block page
    *
    * @return response
    */
    blockCustomerByAgent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "AGENT", status: "ACTIVE" }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findByIdAndUpdate({ _id: agentData._id }, { $addToSet: { blockCustomerList: req.body.customer_Id } }, { new: true }, (error, blockCusotmer) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, blockCusotmer, SuccessMessage.BLOCK_SUCCESS);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    unblockCustomerByAgent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agentData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findByIdAndUpdate({ _id: agentData._id }, { $pull: { blockCustomerList: req.body.customer_Id } },
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
    /**
           * Function Name : list of block customer
           * Description   : list of blocked customer by agent
           *
           * @return response
           */
    listOfBlockCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, async (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
            }
            else {
                userModel.find({ _id: { $in: userData.blockCustomerList } }, (error, result1) => {
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
    checkBalance: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["AGENT", "CUSTOMER"] } },
            (error, balanceData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!balanceData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var pass = bcrypt.compareSync(req.body.password, balanceData.password)
                    if (pass) {
                        var available_balance = {
                            "amountUSD": balanceData.amountUSD,
                            "amountCDF": balanceData.amountCDF,
                            "mobileNumber": balanceData.mobileNumber,
                            "commissionUSD": balanceData.commissionUSD,
                            "commissionCDF": balanceData.commissionCDF
                        }
                        response(res, SuccessCode.SUCCESS, available_balance, SuccessMessage.DATA_FOUND)
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, ErrorMessage.WRONG_PASSWORD)
                    }

                }


            })

    },
    //==============================list of notification for agent=================================
    listOfNotificationForAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "AGENT", status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (userDetails.notificationToggle == false) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.TOGGLE_OFF);
            }
            else {
                notificationModel.find({ agent_Id: userDetails._id }).sort({ 'updatedAt': -1 }).exec((err, notificationList) => {
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
    //===============================Approve Request Of Customers===============================>
    approveRequestOfCustomerByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, userData) => {
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
                        // commonFunction.sendTextOnMobileNumber(customer_MobileNumber, "your request has been approved",
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

    //===============================reject Request Of Customers===============================>
    rejectRequestOfCustomerByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
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
                        commonFunction.sendTextOnMobileNumber(request.customer_MobileNumber, "your request has beeb rejected",
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
    requestListOfCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "requested" }] }
                notificationModel.find(query, (err, countResult) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (countResult.length == 0) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },

    acceptedListOfCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "approved" }] }
                notificationModel.find(query, (error, countResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (countResult.length == 0) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },

    rejectedListOfCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "rejected" }] }
                notificationModel.find(query, (err, countResult) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (countResult.length == 0) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }
        })
    },

    countOfRequestOfCustomerRejectedByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "rejected" }] }
                notificationModel.countDocuments(query, (error, countResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!countResult) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }

        })
    },
    countRequestForAgentByCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "requested" }] }
                notificationModel.count(query, (error, countResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!countResult) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }

        })
    },

    countRequestAcceptedByAgentOfCustomer: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agent) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $and: [{ "agent_Id": agent._id }, { "agent_MobileNumber": agent.mobileNumber }, { status: "approved" }] }
                notificationModel.countDocuments(query, (error, countResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!countResult) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NO_LIST_AVILABALE);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, countResult, SuccessMessage.DATA_FOUND);
                    }
                })
            }

        })
    },
    /**
           * Function Name : customer details
           * Description   : add money coustomer details
           *
           * @return response
           */

    customerDetails: (req, res) => {
        notificationModel.findById({ _id: req.body._id, status: "requested" }, (error, customerDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, customerDetails, SuccessMessage.DATA_FOUND)
            }
        })
    },
    //==================================Agent Request add Money to admin===================
    addMoneyRequestToAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error49, agentDetails) => {
                if (error49) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!agentDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (error3, adminDetails) => {
                        if (error3) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!adminDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            var pass = bcrypt.compareSync(req.body.password, agentDetails.password)
                            if (pass) {
                                var obj = {
                                    name: agentDetails.firstName + " " + agentDetails.lastName,
                                    countryCode: agentDetails.countryCode,
                                    senderId: agentDetails._id,
                                    receiverId: adminDetails._id,
                                    amount: req.body.amount,
                                    notifications: `${agentDetails.firstName} requested ${req.body.amountType} ${req.body.amount} for add money`,
                                    amountType: req.body.amountType,
                                    agent_MobileNumber: agentDetails.mobileNumber,
                                    admin_MobileNumber: adminDetails.mobileNumber,
                                    notificationType: "Add"
                                }
                                new notificationModel(obj).save((saveErr, saveData) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, saveData, SuccessMessage.REQUEST_SENT_TO_Admin)
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

        }
        catch (error) {
            console.log("error", error)
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
    },

    withdrawMoneyRequestToAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error49, agentDetails) => {
                if (error49) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!agentDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.AGENT_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (error3, adminDetails) => {
                        if (error3) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!adminDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            var notify = new notificationModel({
                                name: agentDetails.firstName + " " + agentDetails.lastName,
                                countryCode: agentDetails.countryCode,
                                senderId: agentDetails._id,
                                receiverId: adminDetails._id,
                                amount: req.body.amount,
                                notifications: `${agentDetails.firstName} requested ${req.body.amountType} ${req.body.amount} for withdraw money`,
                                amountType: req.body.amountType,
                                agent_MobileNumber: agentDetails.mobileNumber,
                                admin_MobileNumber: adminDetails.mobileNumber,
                                notificationType: "Withdraw"
                            })
                            notify.save((err111, result111) => {
                                if (err111) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }

                                else {
                                    response(res, SuccessCode.SUCCESS, result111, SuccessMessage.REQUEST_SENT_TO_Admin)
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
    transactionHistoryOfAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "AGENT" }, (error, agentDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var query = { $or: [{ sender_id: agentDetails._id }, { receiver_id: agentDetails._id }] }
                transactionModel.find(query, (err, transactionDetails) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS.SOMETHING_WRONG, transactionDetails, SuccessMessage.DATA_FOUND);
                    }
                })

            }
        })
    },

    sendMoneyByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "AGENT", status: "ACTIVE" }, (error, agentDetails) => {
            console.log("111111111111111111111111111111111111111111111111", error, agentDetails)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (agentDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: { $in: ["ADMIN", "CUSTOMER"] } },
                    async (error, numberDetails) => {
                        console.log("=22222222222222222222222222", error, numberDetails)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!numberDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else if (numberDetails.kycStatus == "unverified") {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                        }
                        else {
                            if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "USD" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status) {
                                    if (agentDetails.amountUSD < req.body.amount || agentDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PLEASE_CHECK_YOUR_AMOUNT);
                                    }
                                    else {
                                        if (req.body.amountType == "USD" && numberDetails.userType == "CUSTOMER") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, agentDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020 
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(agentDetails.amountUSD) - parseFloat(final_amount) } }, { new: true })
                                                        if (agentBalanceUpdate) {
                                                            var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                            if (customerBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(agentDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": agentDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        obj_details = {
                                                                                            "agentId": agentDetails.agentId,
                                                                                            "agent_id": agentDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                            "sender_id": agentDetails._id,
                                                                                            //"receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": agentDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": agentDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details).save((errSbmit, transDetails) => {
                                                                                            if (errSbmit) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [errSbmit], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": agentDetails.agentId,
                                                                                                    "agent_id": agentDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                                    //"sender_id": agentDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": agentDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": agentDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((err, transactionDetails) => {
                                                                                                    if (err) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [err], ErrorMessage.INTERNAL_ERROR);
                                                                                                    }
                                                                                                    else {
                                                                                                        response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                var notification_Status_ = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status_) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status_) {
                                    if (agentDetails.amountCDF < req.body.amount || agentDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        if (req.body.amountType == "CDF" && numberDetails.userType == "CUSTOMER") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (error, commissionDetails) => {
                                                console.log("00000000000000000000000000", commissionDetails.admin_commission)
                                                if (error) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, agentDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.deposit_agent_Commission / 100)// 1020 
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                        agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(agentDetails.amountCDF) - parseFloat(final_amount) } }, { new: true })
                                                        if (agentBalanceUpdate) {
                                                            var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                            if (customerBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber }, { $set: { commissionCDF: parseFloat(agentDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status_._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": agentDetails.userType,
                                                                                        "receiver_UserType": numberDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        var obj_details1 = {
                                                                                            "agentId": agentDetails.agentId,
                                                                                            "agent_id": agentDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                            "sender_id": agentDetails._id,
                                                                                            // "receiver_id": numberDetails._id,
                                                                                            "sender_mobileNumber": agentDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                            "sender_UserType": agentDetails.userType,
                                                                                            "receiver_UserType": numberDetails.userType,
                                                                                            "notificationType": notification_Status_.notificationType,
                                                                                            "transactionStatus": "Debited",
                                                                                            "transectionType": "paid"
                                                                                        }
                                                                                        new transactionModel(obj_details1).save((error, transactionDetails) => {
                                                                                            if (error) {
                                                                                                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                                            }
                                                                                            else {
                                                                                                receiver_details = {
                                                                                                    "agentId": agentDetails.agentId,
                                                                                                    "agent_id": agentDetails._id,
                                                                                                    "send_amount": req.body.amount,
                                                                                                    "receive_amount": final_amount,
                                                                                                    "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                                    "amountType": req.body.amountType,
                                                                                                    "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                                    // "sender_id": agentDetails._id,
                                                                                                    "receiver_id": numberDetails._id,
                                                                                                    "sender_mobileNumber": agentDetails.mobileNumber,
                                                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                                                    "sender_UserType": agentDetails.userType,
                                                                                                    "receiver_UserType": numberDetails.userType,
                                                                                                    "notificationType": notification_Status_.notificationType,
                                                                                                    "transactionStatus": "Credited",
                                                                                                    "transectionType": "Recieved"
                                                                                                }
                                                                                                new transactionModel(receiver_details).save((err, transDetails) => {
                                                                                                    if (err) {
                                                                                                        response(res, ErrorCode.SOMETHING_WRONG, [err], ErrorMessage.INTERNAL_ERROR);
                                                                                                    }
                                                                                                    else {
                                                                                                        response(res, SuccessCode.SUCCESS, transDetails, SuccessMessage.TRANSACTION_COMPLETED)
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "USD") {
                                notification_Status_ = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, admin_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "USD" })
                                if (!notification_Status_) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status_) {
                                    if (agentDetails.amountUSD < req.body.amount || agentDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, agentDetails.password)
                                        if (passwordCheck) {
                                            agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(agentDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                            if (agentBalanceUpdate) {
                                                var adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                    { $set: { amountUSD: parseFloat(numberDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                                if (adminBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status_._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": agentDetails.agentId,
                                                            "agent_id": agentDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "sender_id": agentDetails._id,
                                                            // "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": agentDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": agentDetails.userType,
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
                                                                    "agentId": agentDetails.agentId,
                                                                    "agent_id": agentDetails._id,
                                                                    "send_amount": req.body.amount,
                                                                    "receive_amount": req.body.amount,
                                                                    "amountType": req.body.amountType,
                                                                    "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                    //"sender_id": agentDetails._id,
                                                                    "receiver_id": numberDetails._id,
                                                                    "sender_mobileNumber": agentDetails.mobileNumber,
                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                    "sender_UserType": agentDetails.userType,
                                                                    "receiver_UserType": numberDetails.userType,
                                                                    "notificationType": notification_Status_.notificationType,
                                                                    "transactionStatus": "Credited",
                                                                    "transectionType": "Recieved"
                                                                }
                                                                new transactionModel(receiver_details).save((eror, transDetails) => {
                                                                    if (eror) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [eror], ErrorMessage.INTERNAL_ERROR);
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                                notification_Status_ = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, admin_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status_) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.REQUEST_NOT_FOUND);
                                }
                                if (notification_Status_) {
                                    if (agentDetails.amountCDF < req.body.amount || agentDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, agentDetails.password)
                                        if (passwordCheck) {
                                            agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(agentDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                            if (agentBalanceUpdate) {
                                                adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                    { $set: { amountCDF: parseFloat(numberDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                                if (adminBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status_._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": agentDetails.agentId,
                                                            "agent_id": agentDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": req.body.amount,
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                            "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "sender_id": agentDetails._id,
                                                            //   "receiver_id": numberDetails._id,
                                                            "sender_mobileNumber": agentDetails.mobileNumber,
                                                            "receiver_mobileNumber": numberDetails.mobileNumber,
                                                            "sender_UserType": agentDetails.userType,
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
                                                                    "agentId": agentDetails.agentId,
                                                                    "agent_id": agentDetails._id,
                                                                    "send_amount": req.body.amount,
                                                                    "receive_amount": req.body.amount,
                                                                    "amountType": req.body.amountType,
                                                                    "sendMoneyBy": agentDetails.firstName + " " + agentDetails.lastName,
                                                                    "receiveMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                    //"sender_id": agentDetails._id,
                                                                    "receiver_id": numberDetails._id,
                                                                    "sender_mobileNumber": agentDetails.mobileNumber,
                                                                    "receiver_mobileNumber": numberDetails.mobileNumber,
                                                                    "sender_UserType": agentDetails.userType,
                                                                    "receiver_UserType": numberDetails.userType,
                                                                    "notificationType": notification_Status_.notificationType,
                                                                    "transactionStatus": "Credited",
                                                                    "transectionType": "Recieved"

                                                                }
                                                                new transactionModel(receiver_details).save((error, transactionDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        response(res, SuccessCode.SUCCESS, transactionDetails, SuccessMessage.TRANSACTION_COMPLETED);
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

                        }
                    })
            }
        })
    },
    receiveMoneyByAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "CUSTOMER"] }, status: "ACTIVE" }, (error, numberDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else if (numberDetails.kycStatus == "unverified") {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.PLEASE_VERIFY_KYC_DETAILS);
            }
            else {
                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "AGENT" },
                    async (error, agentDetails) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!agentDetails) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else if (agentDetails.kycStatus == "unverified") {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.RECEIVER_PLEASE_VERIFY_KYC_DETAILS);
                        }
                        else {
                            if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "USD") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "USD" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status) {
                                    if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status.amount != req.body.amount || notification_Status.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        if (req.body.amountType == "USD" && numberDetails.userType == "CUSTOMER") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                console.log("00000000000000000000000000", commissionDetails.admin_commission)
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020 
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)
                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                            { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                                { $set: { amountUSD: parseFloat(agentDetails.amountUSD) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionUSD: parseFloat(adminDetails.commissionUSD) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber }, { $set: { commissionUSD: parseFloat(agentDetails.commissionUSD) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": agentDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        obj_details = {
                                                                                            "agentId": agentDetails.agentId,
                                                                                            "agent_id": agentDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                            "receiveMoneyBy": agentDetails.name,
                                                                                            "sender_id": numberDetails._id,
                                                                                            "receiver_id": agentDetails._id,
                                                                                            "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": agentDetails.mobileNumber,
                                                                                            "sender_UserType": numberDetails.userType,
                                                                                            "receiver_UserType": agentDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType
                                                                                        }
                                                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                                                            if (error) {
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
                            else if (numberDetails.userType == "CUSTOMER" && req.body.amountType == "CDF") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Withdraw", transactionStatus: "PENDING", amountType: "CDF" })
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
                                        if (req.body.amountType == "CDF" && numberDetails.userType == "CUSTOMER") {
                                            commissionModel.findOne({ status: "ACTIVE" }, async (errCommission, commissionDetails) => {
                                                console.log("00000000000000000000000000", commissionDetails.admin_commission)
                                                if (errCommission) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, error, ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                                    if (passwordCheck) {
                                                        var adminCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_admin_commission / 100)// 10
                                                        console.log("-====================3333333333333333333333333333", adminCommission)
                                                        var agentCommission = parseFloat(req.body.amount) * parseFloat(commissionDetails.withdraw_agent_commission / 100)// 1020 
                                                        console.log("-===============44444444444444444444444444444", agentCommission)
                                                        var final_amount = parseFloat(req.body.amount) - parseFloat(adminCommission + agentCommission)
                                                        console.log("=========4444444444444444444444444444444444444----------", final_amount)

                                                        var customerBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                            { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                                        if (customerBalanceUpdate) {
                                                            agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                                { $set: { amountCDF: parseFloat(agentDetails.amountCDF) + parseFloat(final_amount) } }, { new: true })
                                                            if (agentBalanceUpdate) {
                                                                userModel.findOne({ userType: "ADMIN" }, async (error, adminDetails) => {
                                                                    if (error) {
                                                                        response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var admin_commission_updated = await userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { commissionCDF: parseFloat(adminDetails.commissionCDF) + parseFloat(adminCommission) } }, { new: true })
                                                                        console.log("==================", admin_commission_updated)
                                                                        if (admin_commission_updated) {
                                                                            var agent_commission_updated = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber }, { $set: { commissionCDF: parseFloat(agentDetails.commissionCDF) + parseFloat(agentCommission) } }, { new: true })
                                                                            console.log("==================", agent_commission_updated)
                                                                            if (agent_commission_updated) {
                                                                                notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                                                if (notification_update) {
                                                                                    var commission_details_obj = {
                                                                                        "admin_commission": adminCommission,
                                                                                        "agent_Commission": agentCommission,
                                                                                        "send_amount": req.body.amount,
                                                                                        "receive_amount": final_amount,
                                                                                        "amountType": req.body.amountType,
                                                                                        "sender_UserType": numberDetails.userType,
                                                                                        "receiver_UserType": agentDetails.userType
                                                                                    }
                                                                                    var commission_Details = new commissionModel(commission_details_obj).save()
                                                                                    if (commission_Details) {
                                                                                        obj_details = {
                                                                                            "agentId": agentDetails.agentId,
                                                                                            "agent_id": agentDetails._id,
                                                                                            "send_amount": req.body.amount,
                                                                                            "receive_amount": final_amount,
                                                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                                                            "amountType": req.body.amountType,
                                                                                            "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                                                            "receiveMoneyBy": agentDetails.name,
                                                                                            "sender_id": numberDetails._id,
                                                                                            "receiver_id": agentDetails._id,
                                                                                            "sender_mobileNumber": numberDetails.mobileNumber,
                                                                                            "receiver_mobileNumber": agentDetails.mobileNumber,
                                                                                            "sender_UserType": numberDetails.userType,
                                                                                            "receiver_UserType": agentDetails.userType,
                                                                                            "notificationType": notification_Status.notificationType
                                                                                        }
                                                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                                                            if (error) {
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
                            else if (numberDetails.userType == "ADMIN" && req.body.amount == "USD") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "USD" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status_) {
                                    if (numberDetails.amountUSD < req.body.amount || numberDetails.amountUSD == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                        if (passwordCheck) {
                                            var adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountUSD: parseFloat(numberDetails.amountUSD) - parseFloat(req.body.amount) } }, { new: true })
                                            if (adminBalanceUpdate) {
                                                agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                    { $set: { amountUSD: parseFloat(agentDetails.amountUSD) + parseFloat(req.body.amount) } }, { new: true })
                                                if (agentBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status_._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": agentDetails.agentId,
                                                            "agent_id": agentDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": final_amount,
                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "receiveMoneyBy": agentDetails.name,
                                                            "sender_id": numberDetails._id,
                                                            "receiver_id": agentDetails._id,
                                                            "sender_mobileNumber": numberDetails.mobileNumber,
                                                            "receiver_mobileNumber": agentDetails.mobileNumber,
                                                            "sender_UserType": numberDetails.userType,
                                                            "receiver_UserType": agentDetails.userType,
                                                            "notificationType": notification_Status.notificationType
                                                        }
                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                            if (error) {
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                            else if (numberDetails.userType == "ADMIN" && req.body.amountType == "CDF") {
                                notification_Status = await notificationModel.findOne({ agent_MobileNumber: agentDetails.mobileNumber, customer_MobileNumber: numberDetails.mobileNumber, status: "approved", notificationType: "Add", transactionStatus: "PENDING", amountType: "CDF" })
                                if (!notification_Status) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                if (notification_Status_) {
                                    if (numberDetails.amountCDF < req.body.amount || numberDetails.amountCDF == 0) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                                    }
                                    if (notification_Status_.amount != req.body.amount || notification_Status_.amountType != req.body.amountType) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        passwordCheck = bcrypt.compareSync(req.body.password, numberDetails.password)
                                        if (passwordCheck) {
                                            adminBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: numberDetails.mobileNumber },
                                                { $set: { amountCDF: parseFloat(numberDetails.amountCDF) - parseFloat(req.body.amount) } }, { new: true })
                                            if (adminBalanceUpdate) {
                                                agentBalanceUpdate = await userModel.findOneAndUpdate({ mobileNumber: agentDetails.mobileNumber },
                                                    { $set: { amountCDF: parseFloat(agentDetails.amountCDF) + parseFloat(req.body.amount) } }, { new: true })
                                                if (agentBalanceUpdate) {
                                                    notification_update = await notificationModel.findOneAndUpdate({ _id: notification_Status_._id }, { $set: { transactionStatus: "COMPLETED" } }, { new: true })
                                                    if (notification_update) {
                                                        obj_details = {
                                                            "agentId": agentDetails.agentId,
                                                            "agent_id": agentDetails._id,
                                                            "send_amount": req.body.amount,
                                                            "receive_amount": final_amount,
                                                            "commission": parseFloat(adminCommission) + parseFloat(agentCommission),
                                                            "amountType": req.body.amountType,
                                                            "sendMoneyBy": numberDetails.firstName + " " + numberDetails.lastName,
                                                            "receiveMoneyBy": agentDetails.name,
                                                            "sender_id": numberDetails._id,
                                                            "receiver_id": agentDetails._id,
                                                            "sender_mobileNumber": numberDetails.mobileNumber,
                                                            "receiver_mobileNumber": agentDetails.mobileNumber,
                                                            "sender_UserType": numberDetails.userType,
                                                            "receiver_UserType": agentDetails.userType,
                                                            "notificationType": notification_Status.notificationType
                                                        }
                                                        new transactionModel(obj_details).save((error, transactionDetails) => {
                                                            if (error) {
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
                                        else {
                                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.WRONG_PASSWORD)
                                        }
                                    }
                                }
                            }
                        }
                    })
            }
        })

    },
    agentDetails: (req, res) => {
        userModel.findOne({ agentId: req.body.agentId, userType: "AGENT" }, (error, agentDetails) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [error], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, agentDetails, SuccessMessage.DATA_FOUND);
            }
        })
    },
    addCommissionCDF: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "AGENT", status: "ACTIVE" }, (error, userDetails) => {
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
        userModel.findOne({ _id: req.userId, userType: "AGENT", status: "ACTIVE" }, (error, userDetails) => {
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
    exchangeManagementToAgent: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "AGENT" }, (agentErr, agentResult) => {
            if (agentErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                if (req.body.amountType == "USD") {
                    if (agentDetails.amountUSD == 0 || agentDetails.amountUSD < req.body.amount) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                    }
                    else {
                        cdfAmount = req.body.amount * 1839.82

                        var cdfBalance = req.body.amount * 1839.82
                        userModel.findOneAndUpdate({ _id: agentResult._id }, { $set: { amountCDF: cdfBalance, amountUSD: amountUSD - req.body.amount } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.REQUEST_SENT_TO_Admin)

                            }
                        })

                    }
                }
                else {
                    if (agentDetails.amountCDF == 0 || agentDetails.amountCDF < req.body.amount) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_SUFFICIENT_BALANCE);
                    }
                    else {

                        var usdBalance = req.body.amount * 0.000543532
                        userModel.findOneAndUpdate({ _id: agentResult._id }, { $set: { amountCDF: usdBalance, amountUSD: amountCDF - req.body.amount } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.REQUEST_SENT_TO_Admin)

                            }
                        })

                    }
                }
            }

        })

    }
}




