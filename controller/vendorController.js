//const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');
const stripe=require("stripe")("sk_test_ZHansZT1CxkNml9BUCNZhTVG00fV4GVpBw");
const mongoose = require('mongoose');
const vendorModel = require('../model/userModel');
const userModel = require('../model/userModel');
const commonFunction = require('../helper/commonFunction')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const notification = require("../model/notification")
const transaction = require('../model/transaction.js');
// const vendorLogin = (req, res) => {
//     try {
//         if (!req.body.email || !req.body.password) {
//             res.send({ response_code: 400, response_message: "Parameter missing" })
//         } else {
//             vendorModel.findOne({ $and: [{ email: req.body.email }, { userType: "VENDOR" }, { status: "ACTIVE" }] }, (err, result) => {
//                 if (err) {
//                     res.send({ response_code: 500, response_message: "Something went wrong" })
//                 } else if (!result) {
//                     res.send({ response_code: 404, response_message: "Vendor not found" })
//                 } else {
//                     const id = result._id
//                     const token = jwt.sign({ _id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
//                     const password = bcrypt.compareSync(req.body.password, result.password)
//                     if (password) {
//                         res.send({
//                             response_code: 200, response_message: "You are successfully logged in.",
//                             result: { token, id }
//                         })
//                     } else {
//                         res.send({ response_code: 402, response_message: "Password incorrect" })
//                     }
//                 }
//             })
//         }
//     } catch (error) {
//         console.log("Error in catch")
//         res.send({ response_code: 500, response_message: "Something went wrong" })
//     }
// }


const vendorLogin = (req, res) => {
    try {
        console.log('emailemailemail',req.body.email);
        if (!req.body.email) {
            res.send({ response_code: 400, response_message: "Parameter missing" })
        } else {
            vendorModel.findOne({ $and: [{ email: req.body.email }, { userType: "VENDOR" }, { status: "ACTIVE" }] }, (err, result) => {
                if (err) {
                    res.send({ response_code: 500, response_message: "Something went wrong" })
                } else if (!result) {
                    res.send({ response_code: 404, response_message: "Vendor not found" })
                } else {
                    const id = result._id
                    const token = jwt.sign({ _id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                    
                 //   const password = bcrypt.compareSync(req.body.password, result.password)
                   // if (password) {
                        res.send({
                            response_code: 200, response_message: "You are successfully logged in.",
                            result: { token, id }
                        })
                    // } else {
                    //     res.send({ response_code: 402, response_message: "Password incorrect" })
                    // }
                }
            })
        }
    } catch (error) {
        console.log("Error in catch")
        res.send({ response_code: 500, response_message: "Something went wrong" })
    }
}
const forgotPassword = (req, res) => {
    try {
        if (!req.body.email) {
            res.send({ response_code: 400, response_message: "Parameter missing" })
        } else {
            vendorModel.findOne({ email: req.body.email, status: "ACTIVE", userType: "VENDOR" },
                (error, vendorDetails) => {
                    if (error) {
                        res.send({ response_code: 500, response_message: "Something went wrong" })
                    }
                    else if (!vendorDetails) {
                        res.send({ response_code: 404, response_message: "Vendor not found" })
                    } else {
                        const token = jwt.sign({ _id: vendorDetails._id }, 'walletApp');
                        vendorModel.findOneAndUpdate({ _id: vendorDetails._id, status: "ACTIVE" }, { $set: { forgotToken: token } }, { new: true }, (error1, otpUpdate) => {
                            if (error1) {
                                res.send({ response_code: 500, response_message: "Something went wrong" })
                            } else {
                                let link = `${req.body.link}/${vendorDetails._id}/${token}`
                                console.log("Link:", link)
                                commonFunction.sendLinkMail(req.body.email, 'Forgot Password', vendorDetails.firstName, link, (error2, sendMail) => {
                                    if (error2) {
                                        res.send({ response_code: 500, response_message: "Something went wrong" })
                                    } else if (sendMail) {
                                        res.send({ response_code: 201, response_message: "Forgot link sent to your mail" })
                                    }
                                })
                            }
                        })
                    }
                })
        }
    } catch (error) {
        console.log("Error in catch")
        res.send({ response_code: 500, response_message: "Something went wrong" })
    }
}

const resetPassword = (req, res) => {
    try {
        vendorModel.findById({ _id: req.body.userId, status: "ACTIVE", userType: "VENDOR" }, (error, userDetails) => {
            console.log("Query", req.body.userId, req.body.token)
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            } else if (userDetails) {
                if (userDetails.forgotToken == req.body.token) {
                    let salt = bcrypt.genSaltSync(10);
                    req.body.password = bcrypt.hashSync(req.body.password, salt)
                    vendorModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { password: req.body.password, forgotToken: "" } }, { multi: true }, (error, otpUpdate) => {
                        if (error) {
                            res.send({ response_code: 500, response_message: "Internal server error" })
                        } else if (otpUpdate) {
                            res.send({ response_code: 200, response_message: "Password reset successfully." })
                        }
                    })
                }
                else {
                    res.send({ response_code: 200, response_message: "Invalid Link" })
                }
            }
        })
    } catch (error) {
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

const changePassword = (req, res) => {
    if (!req.body.userId || !req.body.oldPassword || !req.body.newPassword) {
        res.send({ response_code: 400, response_message: "Parameter missing" })
    } else {
        vendorModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
            if (error) {
                console.log("In start1", error)
                res.send({ response_code: 500, response_message: "Something went wrong" })
            } else if (userDetails) {
                bcrypt.compare(req.body.oldPassword, userDetails.password, (error, success) => {
                    if (error) {
                        console.log("In start2", error)
                        res.send({ response_code: 500, response_message: "Something went wrong" })
                    } else if (!success) {
                        res.send({ response_code: 500, response_message: "Old password is wrong" })
                    }
                    else {
                        let salt = bcrypt.genSaltSync(10);
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)
                        let set = {
                            password: req.body.newPassword
                        }
                        vendorModel.findOneAndUpdate({ _id: req.body.userId }, set, { new: true }, (error, userUpdate) => {
                            if (error) {
                                console.log("In final", error)
                                res.send({ response_code: 500, response_message: "Something went wrong" })
                            } else {
                                res.send({ response_code: 200, response_message: "Password is changed successfully" })
                            }
                        })
                    }
                })
            } else {
                console.log("In final")
                res.send({ response_code: 500, response_message: "Something went wrong" })
            }
        })
    }
}

const showProfile = (req, res) => {
    try {
        vendorModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "VENDOR" }, (error, userDetails) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            } else if (userDetails) {
                res.send({ response_code: 200, response_message: "Data found", userDetails })
            }
            else {
                res.send({ response_code: 404, response_message: "No data found" })
            }
        })
    } catch (error) {
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

const editProfile = (req, res) => {
    try {
        vendorModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "VENDOR" }, (error, userDetails) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            } else if (userDetails) {
                vendorModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: req.body }, { multi: true }, (error, otpUpdate) => {
                    if (error) {
                        res.send({ response_code: 500, response_message: "Internal server error" })
                    } else {
                        res.send({ response_code: 201, response_message: "Profile Updated" })
                    }
                })
            }
            else {
                res.send({ response_code: 404, response_message: "No data found" })
            }
        })
    } catch (error) {
        console.log("error", error)
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

const acceptAddMoney = (req, res) => {
    console.log('najmu===============')
    userModel.findOne({ userType: "ADMIN" }).select("_id balance").exec(function (error, adminDetails) {
        if (error) {
            res.send({ response_code: 500, response_message: "Internal server error", error });
        }
        else if (!adminDetails) {
            res.send({ response_code: 500, response_message: "Admin not found" });
        }
        else if (adminDetails) {
            notification.findOne({ _id: req.body.notificationId, status: "PENDING", notificationType: "ADD" }).select("vendorId requestedId amount otp senderCurrency usdAmount").exec(function (error, notificationDetails) {
                if (error)
                    res.send({ response_code: 500, response_message: "Internal server error", error });
                else if (!notificationDetails)
                    res.send({ response_code: 500, response_message: "Invalid notification Id" });
                else {
                    console.log('ssss',notificationDetails)
                    vendorModel.findOne({ _id: notificationDetails.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                        if (error)
                            res.send({ response_code: 500, response_message: "Internal server error", error })
                        else if (vendorDetails) {
                            if (notificationDetails.otp == req.body.otp) {
                                userModel.findOne({ _id: notificationDetails.requestedId }, (error, userDetails) => {
                                    if (error) {
                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                    }
                                    else if (userDetails) {
                                        if (adminDetails.balance >= notificationDetails.amount) {
                                            userModel.findByIdAndUpdate({ _id: adminDetails._id }, { $set: { balance: adminDetails.balance - notificationDetails.amount } }, { new: true }, (error, adminUpdate) => {
                                                if (error) {
                                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                                }
                                                else if (adminUpdate) {

                                                    var finalUpdate =  parseInt(userDetails.balance) + parseInt(notificationDetails.amount)
                                                    userModel.findByIdAndUpdate({ _id: notificationDetails.requestedId }, { $set: { balance: finalUpdate } }, { new: true }, (error, userTransaction) => {
                                                        if (error) {
                                                            res.send({ response_code: 500, response_message: "Internal server error", error });
                                                        }

                                                        
                                                        else if (userTransaction) {
                                                            console.log('notificationDetailsnotificationDetails', notificationDetails)
                                                            var showTransaction = new transaction({
                                                                toUserId: userDetails._id, 
                                                                senderCurrency:notificationDetails.senderCurrency,
                                                                senderAmount: notificationDetails.amount,
                                                                toBalance: userDetails.balance, toEmail: userDetails.email,
                                                                toCountry: userDetails.country, toCountryCode: userDetails.countryCode,
                                                                toMobileNumber: userDetails.mobileNumber, toFirstName: userDetails.firstName,
                                                                toLastName: userDetails.lastName, toMiddleName: userDetails.middleName,
                                                                toAccountId: userDetails.accountId, toAvailableAccountBalance: userDetails.availableBalance,
                                                                toUserName: userDetails.userName, fromMessage: req.body.message,
                                                                usdAmount: notificationDetails.usdAmount,

                                                                transactionType: "ADD"
                                                            })
                                                            showTransaction.save((error, addTransaction) => {
                                                                if (error) {
                                                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                                                }
                                                                else if (!addTransaction) {
                                                                    res.send({ response_code: 400, response_message: "Not Found" })
                                                                }
                                                                else {
                                                                    notification.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "ACCEPTED",transactionId:addTransaction._id, notifications: `${userDetails.firstName}'s request was accepted for the amount ${notificationDetails.amount} ` } }, { new: true }, (error, notificationUpdate) => {
                                                                        if (error)
                                                                            res.send({ response_code: 500, response_message: "Internal server error", error });
                                                                        else if (notificationUpdate) {

                                                                            commonFunction.pushNotification(userDetails.fcmToken, "wants to sent", "Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you have successfully received " +notificationDetails.senderCurrency + " " +notificationDetails.amount+ " in your account", '', (err23, result11) => {

                                                                            var notificationSave = new notification({
                                                                                userId:  notificationDetails.requestedId,    // result11.userId,  
                                                                                "notifications":"Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you have successfully received " +notificationDetails.amount+" "+notificationDetails.senderCurrency + " in your account"                                                                            })
                                                                            notificationSave.save((error27, notificationsave) => {
                                                                                res.send({ response_code: 200, response_message: "Request accepted", notificationUpdate })
                                                                            })
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
                                            res.send({ response_code: 500, response_message: "Insufficient balance in admin account" });
                                        }
                                    }
                                })
                            }
                            else
                                res.send({ response_code: 500, response_message: "Wrong OTP" })
                        }
                    })
                }
            })
        }
    })
}

const acceptSendMoney = (req, res) => {
    notification.findOne({ _id: req.body.notificationId, status: "PENDING", notificationType: "SEND" }, (error, notificationDetails) => {
        console.log(">>>>>>>>>>>>>>>>>288",notificationDetails)
        if (error)
            res.send({ response_code: 500, response_message: "Internal server error", error });
        else if (!notificationDetails)
            res.send({ response_code: 500, response_message: "Invalid notification Id" });
        else {
            vendorModel.findOne({ _id: notificationDetails.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                if (error)
                    res.send({ response_code: 500, response_message: "Internal server error", error })
                else if (vendorDetails) {
                    if (notificationDetails.otp == req.body.otp) {
                        userModel.findById({ _id: notificationDetails.requestedId }, (error, userDetails) => {
                            if (error) {
                                res.send({ response_code: 500, response_message: "Internal server error", error });
                            }
                            else if (userDetails) {
                                var bal = Number(notificationDetails.amount)
                                userModel.findByIdAndUpdate({ _id: notificationDetails.vendorId }, { $set: { balance: vendorDetails.escrowMoney - bal } }, { new: true }, (error, userTransaction) => {
                                    if (error)
                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                    else if (userTransaction) {
                                        var showTransaction = new transaction({
                                            senderCurrency:notificationDetails.senderCurrency,
                                            fromUserId: notificationDetails.requestedId,
                                            senderAmount: notificationDetails.amount,
                                            toMobileNumber: userDetails.mobileNumber,
                                            toLastName: userDetails.lastName,
                                            toEmail: userDetails.email,
                                            toFirstName: userDetails.firstName,
                                            fromMessage: req.body.message,
                                            transactionType: "SEND",
                                            usdAmount:notificationDetails.usdAmount,
                                            toUserName: userDetails.userName
                                        })

                                      
                                        showTransaction.save((error, addTransaction) => {
                                            if (error)
                                                res.send({ response_code: 500, response_message: "Internal server error", error });
                                            else if (!addTransaction)
                                                res.send({ response_code: 400, response_message: "Not Found" })
                                            else {
                                                console.log('addTransactionaddTransactionaddTransaction',addTransaction)
                                                notification.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "ACCEPTED",transactionId:addTransaction._id, notifications: `${userDetails.firstName}'s request was accepted for sending amount ${notificationDetails.amount} ${notificationDetails.senderCurrency} to ${notificationDetails.recieverNumber}` } }, { new: true }, (error, notificationUpdate) => {
                                                    if (error)
                                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                                    else if (notificationUpdate) {
                                                       // res.send({ response_code: 200, response_message: "Request accepted", notificationUpdate })
                                                        commonFunction.pushNotification(userDetails.fcmToken, "wants to sent", "Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you have successfully send " +notificationDetails.senderCurrency + " " +notificationDetails.amount+ " to " +notificationDetails.recieverNumber, '', (err23, result11) => {

                                                            var notificationSave = new notification({
                                                                userId:  notificationDetails.requestedId,    // result11.userId,  
                                                                "notifications":"Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you have successfully send " +notificationDetails.amount+ " "  +notificationDetails.senderCurrency+ " to " +notificationDetails.recieverNumber,                                                                            })
                                                            notificationSave.save((error27, notificationsave) => {
                                                                res.send({ response_code: 200, response_message: "Request accepted", notificationUpdate })
                                                            })
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
                    else
                        res.send({ response_code: 500, response_message: "Wrong OTP" })
                }
            })
        }
    })
}

const rejectRequest = (req, res) => {
    notification.findOne({ _id: req.body.notificationId, status: "PENDING" }, (error, notificationDetails) => {
        if (error) {
            console.log("errr1", error)
            res.send({ response_code: 500, response_message: "Internal server error", error });
        }
        else if (!notificationDetails) {
            console.log("errr2", notificationDetails)
            res.send({ response_code: 500, response_message: "Invalid notification Id" });
        }
        else {
            console.log("errr3", notificationDetails)
            userModel.findById({ _id: notificationDetails.requestedId }, (error, userDetails) => {
                if (error) {
                    console.log("errr4", error)
                    res.send({ response_code: 500, response_message: "Internal server error", error });
                }
                else if (userDetails) {
                    console.log("errro5", userDetails)
                    notification.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "REJECTED" }, notifications: `${userDetails.firstName}'s request was rejected for the amount of ${notificationDetails.amount}` }, { new: true }, (error, rejectRequest) => {
                        if (error) {
                            console.log("errro6", error)
                            res.send({ response_code: 500, response_message: "Internal server error", error });
                        }
                        else if (rejectRequest) {
                            console.log("errro7", error)
                            commonFunction.sendSms(`Dear ${userDetails.firstName}, your request was rejected for amount ${notificationDetails.amount}`, userDetails.mobileNumber, (error, sendMessage) => {
                                if (error) {
                                    console.log("errro8", error)
                                    res.send({ response_code: 500, response_message: "Internal server error" })
                                } else {
                                    console.log("errro9", sendMessage)

                                    commonFunction.pushNotification(userDetails.fcmToken, "wants to sent", "Dear "+ userDetails.firstName+" "+ userDetails.lastName+" your request was rejected for amount " + notificationDetails.amount, '', (err23, result11) => {
                                        var notificationSave = new notification({
                                            userId:  notificationDetails.requestedId,    // result11.userId,  
                                            "notifications":"Dear "+ userDetails.firstName+" "+ userDetails.lastName+" your request was rejected for amount " + notificationDetails.amount                                                                            
                                        })
                                        notificationSave.save((error27, notificationsave) => {

                                            var showTransaction = new transaction({
                                                senderCurrency:notificationDetails.senderCurrency,
                                                transactionStatus: "REJECTED",
                                                transactionType:notificationDetails.notificationType,
                                                fromUserId: userDetails._id, senderAmount: notificationDetails.amount,
                                                toEmail: userDetails.email, toUserName: userDetails.toUserName,
                                                toCountry: userDetails.country, toCountryCode: userDetails.countryCode,
                                                toMobileNumber: userDetails.mobileNumber, toFirstName: userDetails.firstName,
                                                toLastName: userDetails.lastName, toMiddleName: userDetails.middleName,
                                                toAccountId: userDetails.accountId, toAvailableAccountBalance: userDetails.availableBalance,
                                                usdAmount: notificationDetails.usdAmount,
                                                fromMessage: req.body.message,
                                            })
                                            
                                            showTransaction.save((error, addTransaction) => {
                                                if (error){
                                                    console.log('errorerrorerror',error)
                                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                                }
                                                  
                                                else if (!addTransaction)
                                                    res.send({ response_code: 400, response_message: "Not Found" })
                                                else {
                                                    res.send({
                                                        response_code: 200,
                                                        response_message: `Request rejected`,
                                                        result: sendMessage
                                                    });
                                                }})
                                         
                                        })
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

const rejectSendRequest = (req, res) => {
    notification.findOne({ _id: req.body.notificationId, status: "PENDING" }, (error, notificationDetails) => {
        if (error)
            res.send({ response_code: 500, response_message: "Internal server error", error });
        else if (!notificationDetails)
            res.send({ response_code: 500, response_message: "Invalid notification Id" });
        else {
            userModel.findById({ _id: notificationDetails.requestedId }, (error, userDetails) => {
                if (error)
                    res.send({ response_code: 500, response_message: "Internal server error", error });
                else if (userDetails) {
                    vendorModel.findOne({ _id: notificationDetails.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                        if (error)
                            res.send({ response_code: 500, response_message: "Internal server error", error })
                        else if (vendorDetails) {
                            let bal = Number(notificationDetails.amount)
                            userModel.findByIdAndUpdate({ _id: notificationDetails.vendorId }, { $set: { balance: vendorDetails.escrowMoney - bal } }, { new: true }, (error, vendorTransaction) => {
                                if (error)
                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                else if (vendorTransaction) {
                                    userModel.findByIdAndUpdate({ _id: notificationDetails.requestedId }, { $set: { balance: userDetails.balance + bal } }, { new: true }, (error, userTransaction) => {
                                        if (error)
                                            res.send({ response_code: 500, response_message: "Internal server error", error });
                                        else if (userTransaction) {
                                            notification.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "REJECTED" }, notifications: `${userDetails.firstName}'s request was rejected for sending ${notificationDetails.amount} amount to ${notificationDetails.recieverName}` }, { new: true }, (error, rejectRequest) => {
                                                if (error) {
                                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                                }
                                                else if (rejectRequest) {
                                                    commonFunction.sendSms(`Dear ${userDetails.firstName}, your request was rejected for sending ${notificationDetails.amount} amount to ${notificationDetails.recieverName}`, userDetails.mobileNumber, (error, sendMessage) => {
                                                        if (error) {
                                                            res.send({ response_code: 500, response_message: "Internal server error" })
                                                        } else {
                                                            var showTransaction = new transaction({
                                                                senderCurrency:notificationDetails.senderCurrency,
                                                                transactionType:notificationDetails.notificationType,
                                                                transactionStatus: "REJECTED",
                                                                fromUserId: userDetails._id, senderAmount: notificationDetails.amount,
                                                                toEmail: userDetails.email, toUserName: userDetails.toUserName,
                                                                toCountry: userDetails.country, toCountryCode: userDetails.countryCode,
                                                                toMobileNumber: userDetails.mobileNumber, toFirstName: userDetails.firstName,
                                                                toLastName: userDetails.lastName, toMiddleName: userDetails.middleName,
                                                                toAccountId: userDetails.accountId, toAvailableAccountBalance: userDetails.availableBalance,
                                                                usdAmount: notificationDetails.usdAmount,
                                                                fromMessage: req.body.message,
                                                                
                                                            })
                                                            showTransaction.save((error, addTransaction) => {
                                                                if (error){
                                                                    console.log('errorerrorerror',error)
                                                                    res.send({ response_code: 500, response_message: "Internal server error", error });
                                                                }
                                                                    
                                                                else if (!addTransaction)
                                                                    res.send({ response_code: 400, response_message: "Not Found" })
                                                                else {
                                                                    res.send({
                                                                        response_code: 200,
                                                                        response_message: `Request rejected`,
                                                                        result: sendMessage
                                                                    });
                                                                }})
                                                           
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

const viewParticularRequests = (req, res) => {
    notification.findOne({ _id: req.body.notificationId }, (error, notificationDetails) => {
        if (error)
            res.send({ response_code: 500, response_message: "Internal server error", error });
        else if (!notificationDetails)
            res.send({ response_code: 500, response_message: "Invalid notification Id" });
        else {
            console.log("Data Notification", notificationDetails)
            notification.findOne({ '_id': req.body.notificationId }).populate("requestedId", ('firstName lastName mobileNumber email createdAt')).exec((err, result) => {
                if (result) {
                    console.log("Data user", result)
                    res.send({ response_code: 200, response_message: "get Data", result })
                }
            })
        }
    })
}

const viewAddMoneyRequests = (req, res) => {
    var query, options, searchRegex = '';
    query = {
        vendorId: mongoose.Types.ObjectId(req.body.userId),
        notificationType: "ADD"
    };
    if (req.body.search)
        searchRegex = req.body.search;
    if (req.body.status) {
        query['status'] = req.body.status;
    }
    options = {
        limit: req.body.limit || 10,
        page: req.body.page || 1,
        sort: { createdAt: -1 },
    }
    var aggregate = notification.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "users",
                localField: "requestedId",
                foreignField: "_id",
                as: "viewAddMoney"
            }
        },
        { $unwind: "$viewAddMoney" },
        {
            $match: {
                $or: [{ "viewAddMoney.firstName": { $regex: searchRegex, $options: 'i' } },
                { "viewAddMoney.lastName": { $regex: searchRegex, $options: 'i' } }]
            }
        },
        // {createdAt: {
        //     $gte: ISODate("2010-04-29T00:00:00.000Z"),
        //     $lte: ISODate("2010-05-01T00:00:00.000Z")
        // }},
        { $sort: { createdAt: -1 } }
    
    ])
    notification.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error", err });
        }
        else {
            const data = {
                "total": total,
                "limit": options.limit,
                "currentPage": options.page,
                "totalPage": pages
            }
            res.send({ response_code: 200, response_message: "Data found", data, success })
        }
    })
}

const viewWithdrawMoneyRequests = (req, res) => {
    var query, options, searchRegex = '';
    query = {
        vendorId: mongoose.Types.ObjectId(req.body.userId),
        notificationType: "WITHDRAW"
    };
    if (req.body.search)
        searchRegex = req.body.search;
    if (req.body.status) {
        query['status'] = req.body.status;
    }
    console.log('searchRegexsearchRegexsearchRegex',searchRegex)
    options = {
        limit: req.body.limit || 10,
        page: req.body.page || 1,
       // sort: { createdAt: -1 },
    }
    var aggregate = notification.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "users",
                localField: "requestedId",
                foreignField: "_id",
                as: "viewAddMoney"
            }
        },
        { $unwind: "$viewAddMoney" },
        {
            $match: {
                $or: [{ "viewAddMoney.firstName": { $regex: searchRegex, $options: 'i' } },
                { "viewAddMoney.lastName": { $regex: searchRegex, $options: 'i' } }]
            }
        },
        { $sort: { createdAt: -1 } }
    ])
    notification.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error", err });
        }
        else {
            const data = {
                "total": total,
                "limit": options.limit,
                "currentPage": options.page,
                "totalPage": pages
            }
            res.send({ response_code: 200, response_message: "Data found", data, success })
        }
    })
}

const viewSendMoneyRequests = (req, res) => {
    var query, options, searchRegex = '';
    query = {
        vendorId: mongoose.Types.ObjectId(req.body.userId),
        notificationType: "SEND"
    };
    if (req.body.search)
        searchRegex = req.body.search;
    if (req.body.status) {
        query['status'] = req.body.status;
    }
    options = {
        limit: req.body.limit || 5,
        page: req.body.page || 1,
        // $sort: { createdAt: -1 },
    }
    var aggregate = notification.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "users",
                localField: "requestedId",
                foreignField: "_id",
                as: "viewAddMoney"
            }
        },
        { $unwind: "$viewAddMoney" },
        {
            $match: {
                $or: [{ "viewAddMoney.firstName": { $regex: searchRegex, $options: 'i' } },
                { "viewAddMoney.lastName": { $regex: searchRegex, $options: 'i' } }]
            }
        },
        
        { $sort: { createdAt: -1 } }
    ])
    notification.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error", err });
        }
        else {
            const data = {
                "total": total,
                "limit": options.limit,
                "currentPage": options.page,
                "totalPage": pages
            }
            res.send({ response_code: 200, response_message: "Data found", data, success })
        }
    })
}

const acceptWithdrawMoney = (req, res) => {
    notification.findOne({ _id: req.body.notificationId, status: "PENDING", notificationType: "WITHDRAW" }, (error, notificationDetails) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>688",notificationDetails)
        if (error)
            res.send({ response_code: 500, response_message: "Internal server error", error });
        else if (!notificationDetails)
            res.send({ response_code: 500, response_message: "Invalid notification Id" });
        else {
            vendorModel.findOne({ _id: notificationDetails.vendorId, status: "ACTIVE", userType: "VENDOR" }, (error, vendorDetails) => {
                if (error)
                    res.send({ response_code: 500, response_message: "Internal server error", error })
                else if (vendorDetails) {
                    if (notificationDetails.otp == req.body.otp) {
                        userModel.findById({ _id: notificationDetails.requestedId }, (error, userDetails) => {
                            if (error) {
                                res.send({ response_code: 500, response_message: "Internal server error", error });
                            }
                            else if (userDetails) {
                                userModel.findByIdAndUpdate({ _id: notificationDetails.requestedId }, { $set: { balance: userDetails.balance - notificationDetails.amount } }, { new: true }, (error, userTransaction) => {
                                    if (error)
                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                    else if (userTransaction) {
                                        var showTransaction = new transaction({
                                            senderCurrency:notificationDetails.senderCurrency,
                                            fromUserId: userDetails._id, senderAmount: notificationDetails.amount,
                                            toEmail: userDetails.email, toUserName: userDetails.toUserName,
                                            toCountry: userDetails.country, toCountryCode: userDetails.countryCode,
                                            toMobileNumber: userDetails.mobileNumber, toFirstName: userDetails.firstName,
                                            toLastName: userDetails.lastName, toMiddleName: userDetails.middleName,
                                            toAccountId: userDetails.accountId, toAvailableAccountBalance: userDetails.availableBalance,
                                            usdAmount: notificationDetails.usdAmount,
                                            fromMessage: req.body.message,
                                            transactionType: "WITHDRAW"
                                        })
                                        showTransaction.save((error, addTransaction) => {
                                            if (error)
                                                res.send({ response_code: 500, response_message: "Internal server error", error });
                                            else if (!addTransaction)
                                                res.send({ response_code: 400, response_message: "Not Found" })
                                            else {
                                                notification.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "ACCEPTED",transactionId:addTransaction._id, notifications: `${userDetails.firstName}'s request was accepted for the cash of ${notificationDetails.amount} ` } }, { new: true }, (error, notificationUpdate) => {

                                                    if (error)
                                                        res.send({ response_code: 500, response_message: "Internal server error", error });
                                                    else if (notificationUpdate) {
                                                        commonFunction.pushNotification(userDetails.fcmToken, "wants to sent", "Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you successfully withdrew " +notificationDetails.amount+ " from your account", '', (err23, result11) => {

                                                    
                                                        var notificationSave = new notification({
                                                            userId:  notificationDetails.requestedId,    // result11.userId,  
                                                            "notifications":"Congrats ! "+userDetails.firstName+" "+ userDetails.lastName +" , you successfully withdrew "+notificationDetails.senderCurrency+" " +notificationDetails.amount+ "  from your account"                                                                            })
                                                        notificationSave.save((error27, notificationsave) => {
                                                            res.send({ response_code: 200, response_message: "Request accepted", notificationUpdate })
                                                        })
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
                    else
                        res.send({ response_code: 500, response_message: "Wrong OTP" })
                }
            })
        }
    })
}
const addMoney =(req,res)=>{
      try {
        console.log('ssssss===================', req.body);
        if (!req.body.userId) {
            res.send({ response_code: 400, response_message: "Parameters Missing" })
        }
        else {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (error, userDetails) => {
                if (error) {
                    res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!userDetails) {
                    res.send({ response_code: 400, response_message: "Data not found" })
                }
                // else {
                //     userModel.findOne({ _id: req.body.vendorId, status: "ACTIVE", userType:  }, (error2, success3) => {
                //         console.log("result of request to is =====>>", success3)
                //         if (error2) {
                //             res.send({ response_code: 500, response_message: "Internal server error" })
                //         }
                //         else if (!success3) {
                //             res.send({ response_code: 400, response_message: "Data not found" })
                //         }
                        else {
                            let otp = commonFunction.getOTP();
                            var notify = new notification({
                                requestedId: req.body.userId,
                                status: "PENDING",
                                amount: req.body.amount,
                                senderCurrency: req.body.currency,
                                notifications: ` ${success.userName} requested for ${req.body.amount}`,
                                vendorId: req.body.vendorId,
                                requestType: "CASH",
                                notificationType: "ADD",
                                otp: otp
                            })
                            notify.save((err111, result111) => {
                                if (err111)
                                    res.send({ response_code: 500, response_message: "Internal server error" })
                                else if (!result111)
                                    console.log("Result not found")
                                else {
                                    commonFunction.sendRequestMoneyMail(success.email, "OTP for Add Money", success.firstName, otp, (error, sendMail) => {
                                        if (error) {
                                            console.log("something went wrong in mail")
                                        } else {
                                            console.log("email successfully sent in 1437>>>>>>----------")
                                            res.send({
                                                response_code: 200,
                                                response_message: `Your request has been sent to ${success3.userName} successfully`
                                            });
                                        }
                                    })
                                }
                            })
                        }
            //         })
            //     }
             })
        }
    }
    catch (error) {
        console.log("error", error)
        res.send({ response_code: 500, response_message: "Internal server error" })
    }
}

module.exports = {
    vendorLogin: vendorLogin,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    changePassword: changePassword,
    showProfile: showProfile,
    editProfile: editProfile,
    acceptAddMoney: acceptAddMoney,
    rejectRequest: rejectRequest,
    viewAddMoneyRequests: viewAddMoneyRequests,
    viewParticularRequests: viewParticularRequests,
    viewWithdrawMoneyRequests: viewWithdrawMoneyRequests,
    acceptWithdrawMoney: acceptWithdrawMoney,
    viewSendMoneyRequests: viewSendMoneyRequests,
    acceptSendMoney: acceptSendMoney,
    rejectSendRequest: rejectSendRequest
}