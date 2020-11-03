const userModel = require('../model/userModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorCode } = require('../helper/statusCodes.js');
const { ErrorMessage } = require('../helper/messages.js');
const { SuccessMessage } = require('../helper/messages');
const { SuccessCode } = require('../helper/statusCodes');
const addTransactionModel = require('../model/transactionModel.js')

const transaction = require('../model/transaction.js');
const commonFunction = require('../helper/commonFunction')
var _ = require('lodash')
const notificationModel = require("../model/notification");
const transactions = require('../model/transaction.js')
const notification = require("../model/notification")
var BigNumber = require('big-number');
//const stripe = require('stripe')('sk_test_c1fuFQmWKd4OZeCThFOtLFuY'); - pramod
var async = require('async');
// const stripe = require('stripe')('sk_test_LBKlAsWDMrZ7FTcXKkH9iatQ00tS0lPXG3');
const stripe = require("stripe")("sk_test_ZHansZT1CxkNml9BUCNZhTVG00fV4GVpBw");
var Web3 = require('web3');
const convertCurrency = require('nodejs-currency-converter');
var web3Data = require('../controller/web3Data.js')
const mongoose = require('mongoose')

const converter = require('google-currency')

var web3 = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/1c7b730f883e44f39134bc8a680efb9f');


//let contractABI=[{"constant":true,"inputs":[{"name":"_userId","type":"string"}],"name":"getDetails","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"string"},{"name":"_transactionId","type":"string"}],"name":"setDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
let Tx = require('ethereumjs-tx');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const listCard = (req, res) => {
    console.log("hgghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    if (!req.params.userId) {
        response(res, ErrorCode.BAD_REQUEST, ErrorMessage.PARAMETERS_MISSING);
    }
    else {
        transactions.findOne({ userId: req.params.userId }, (error, result) => {
            console.log("result is ====>>", result, error)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                console.log("iam in console>>>>>>>>>>>")
                response(res, 200, [], "No cards found.");
            }
            else {
                var show = {
                    number: result.number,
                    exp_month: result.exp_month,
                    exp_year: result.exp_year,
                    holdersName: result.holdersName
                }
                console.log("result is ====>>>", result)
                response(res, SuccessCode.SUCCESS, [{ show }], SuccessMessage.CARD_FOUND);
            }
        })
    }
}
//===================================================================================================================================================================//

// const smartContractTransaction = (req, res) => {

//     if (!req.body.userId) {
//         response(res, ErrorCode.BAD_REQUEST, ErrorMessage.PARAMETERS_MISSING);
//     }
//     else
//         userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (errors, results) => {
//             console.log("result is ==========>>>>>>", results.balance)
//             if (errors) {
//                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
//             }
//             else if (!results) {
//                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
//             }
//             else

//                 stripe.tokens.create({
//                     card: {
//                         // "number": '400 00 00 00 00 00  077',
//                         // "exp_month": 12,
//                         // "exp_year": 2019,
//                         // "cvc": '123',
//                         // "currency": "usd"
//                         "number": req.body.number,
//                         "exp_month": req.body.exp_month,
//                         "exp_year": req.body.exp_year,
//                         "cvc": req.body.cvc,
//                         "currency": "usd"
//                     },
//                 }).then((result) => {
//                     if (result) {
//                         var token = result.id; // Using Express //////tok_visa
//                         console.log("token>>", result.id)
//                         stripe.customers.create({
//                             email: req.body.email,
//                             source: token,
//                         }).then((customer) => {
//                             console.log("customer>>", customer.id)
//                             return stripe.charges.create({
//                                 amount: req.body.amount, //used for change USD dollar to CENT 
//                                 currency: "usd",
//                                 customer: customer.id,

//                             })
//                             // console.log("customer====>", customer)
//                         }).then((charge) => {
//                             if (!charge) {
//                                 console.log("Cannot charge a customer that has no active card", charge)
//                                 res.send({ responseCode: 404, responseMesssage: "Cannot charge a customer that has no active card" })
//                             }

//                             else {
//                                 console.log("charge id is ======>>>>", charge)
//                                 var receipt = req.body.url
//                                 receipt = charge.receipt_url
//                                 var stuff = receipt.split('/');
//                                 console.log("stuff is ====>>", stuff[4])
//                                 req.body.account = stuff[4]
//                                 console.log("show me the card details=====>>>", charge.amount)
//                                 var query4 = {
//                                     balance: results.balance + charge.amount
//                                 }
//                                 console.log("show me the card details=====>>>", query4)


//                                 userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { balance: results.balance + charge.amount } }, { new: true }, (err9, result9) => {
//                                     console.log("result of updated balance====>>>", result9)
//                                     if (err9) {
//                                         console.log("err is=====>>", err9)
//                                     }
//                                     else {
//                                         userModel.findOne({ userType: "ADMIN" }, (errs, resultt) => {
//                                             console.log("result of admin ===>>>", resultt.availableBalance)
//                                             if (errs) {
//                                                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
//                                             }
//                                             else if (!resultt) {
//                                                 res.send({ responseCode: 400, responseMessage: "Not found" })
//                                             }
//                                             else {
//                                                 userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { availableBalance: resultt.availableBalance + charge.amount } }, { new: true }, (erro, resulto) => {
//                                                     console.log("updation of admin available balance is =====>>", resulto)
//                                                     if (erro) {
//                                                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
//                                                     }
//                                                     else if (!resulto) {
//                                                         res.send({ responseCode: 400, responseMessage: "Not found" })
//                                                     }
//                                                     else {
//                                                         console.log("updation of admin available balance is =====>>", resulto)

//                                                         let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
//                                                         web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145").then(count => {
//                                                             var userId = req.body.userId
//                                                             var tranxId = charge.balance_transaction
//                                                             // var chargeId = charge.id

//                                                             var rawTransaction = {
//                                                                 "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
//                                                                 "gasPrice": web3.utils.toHex(10 * 1e9),
//                                                                 "gasLimit": web3.utils.toHex(210000),
//                                                                 "to": web3Data.contractAddress,
//                                                                 "value": "0x0",
//                                                                 "data": contract.methods.setDetails(userId, tranxId).encodeABI(),
//                                                                 "nonce": web3.utils.toHex(count)
//                                                             }
//                                                             var privateKey1 = "C60D6261B8CC6FF1910E1E1BE54591DA3AA2BE681564F2550767A630C0ADBB5B"
//                                                             privateKey = new Buffer(privateKey1, 'hex');
//                                                             var transaction = new Tx(rawTransaction)
//                                                             transaction.sign(privateKey)
//                                                             web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err2, hash) => {

//                                                                 //  console.log('error and hash=====>>>>>>>', err2, hash);
//                                                                 var hub = "https://ropsten.etherscan.io/tx/" + hash
//                                                                 if (err2) {
//                                                                     response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
//                                                                 }
//                                                                 else {

//                                                                     addTransactionModel.create(req.body, (error5, success5) => {
//                                                                         if (error5) {
//                                                                             res.send({ responseCode: 500, responseMessage: "Internal server error" })
//                                                                         }

//                                                                         else if (!success5) {
//                                                                             res.send({ responseCode: 400, responseMessage: "Not found" })
//                                                                         } else {
//                                                                             var smartContract = new addTransactionModel({
//                                                                                 Url: hub,
//                                                                                 //  transactionId:tranxId,
//                                                                                 userId: req.body.userId,
//                                                                                 paymentType: "creditCard",
//                                                                                 number: req.body.number,
//                                                                                 exp_month: req.body.exp_month,
//                                                                                 exp_year: req.body.exp_year,
//                                                                                 cvc: req.body.cvc,
//                                                                                 currency: req.body.currency,
//                                                                                 holdersName: req.body.holdersName,
//                                                                                 amount: req.body.amount,
//                                                                                 email: req.body.email,


//                                                                             })
//                                                                             smartContract.save((err7, success7) => {
//                                                                                 if (err7) {
//                                                                                     res.send({ responseCode: 500, responseMessage: "Internal server error" })
//                                                                                 }
//                                                                                 else {
//                                                                                     response(res, "200", success7, "Payment Successfull");
//                                                                                 }
//                                                                             })


//                                                                         }
//                                                                     })
//                                                                     // }

//                                                                 }
//                                                             })

//                                                         }).catch(error => { console.log("iam in 277>>>>>>>>>>>>>>>>>", error) })

//                                                     }
//                                                 })
//                                             }

//                                         })
//                                     }
//                                 })
//                             }
//                         }).catch(err => {
//                             console.log("err in catch =====", err)
//                             response(res, 500, [], "Payment error due to no active card.....");
//                            // res.send({ responseCode: 500, responseMesssage: "Payment error due to no active card..... " })
//                         })
//                     }
//                     // else{
//                     //     console.log("error in cards=====>>>")
//                     // }

//                 }).catch(err => {
//                     console.log("err in catch =====", err)
//                     response(res, 201, [], "Your card details are incorrect.");
//                     //res.send({ responseCode: 201, responseMesssage: " Your card details are incorrect. " })
//                 })

//         })
// }




//============================================================Add money=========================================================================================================
const smartContractTransaction = (req, res) => {
    console.log('-----------', req.body)
    if (!req.body.userId) {
        response(res, ErrorCode.BAD_REQUEST, ErrorMessage.PARAMETERS_MISSING);
    }
    else
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (errors, results) => {
            console.log("result is ==========>>>>>>", results)
            if (errors) {
                response(res, 500, [], ErrorMessage.INTERNAL_ERROR)
            }
            else if (!results) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else

                stripe.tokens.create({
                    card: {
                        // "number": '400 00 00 00 00 00  077',
                        // "exp_month": 12,
                        // "exp_year": 2019,
                        // "cvc": '123',
                        // "currency": "usd"
                        "number": req.body.number,
                        "exp_month": req.body.exp_month,
                        "exp_year": req.body.exp_year,
                        "cvc": req.body.cvc,
                        "currency": "usd"
                    },
                }).then((result) => {
                    if (result) {
                        var token = result.id; // Using Express //////tok_visa
                        // console.log("token>>", result.id)
                        stripe.customers.create({
                            email: req.body.email,
                            source: token,
                        }).then((customer) => {
                            console.log("customer   _id is=== ======>>", req.body.usdAmount)
                            //  var amountValue = (req.body.usdAmount * 100).toFixed(2)
                            var amountValue = Math.round(req.body.usdAmount * 100);
                            console.log('amountamountamount', amountValue)
                            return stripe.charges.create({
                                amount: amountValue,  //used for change USD dollar to CENT 
                                currency: "usd",
                                customer: customer.id,

                            })
                            // console.log("customer====>", customer)
                        }).then((charge) => {
                            if (!charge) {
                                //  console.log("Cannot charge a customer that has no active card", charge)
                                res.send({ response_code: 404, response_messsage: "Cannot charge a customer that has no active card" })
                            }

                            else {
                                console.log("charge id is ======>>>>", charge)
                                console.log("charge id for customer==== is ======>>>>", charge.customer)
                                var receipt = req.body.url
                                receipt = charge.receipt_url
                                var stuff = receipt.split('/');
                                //  console.log("stuff is ====>>", stuff[4])
                                req.body.account = stuff[4]
                                // console.log("show me the card details=====>>>", charge.amount)
                                var query4 = {
                                    balance: results.balance + req.body.amount
                                }

                                console.log("show me the card details=====>>>", query4)
                                userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: query4 }, { new: true }, (err9, result9) => {
                                    // console.log("result of updated balance====>>>", result9)
                                    if (err9) {
                                        // console.log("err is=====>>", err9)
                                        res.send({ response_code: 500, response_message: "Internal server error" })

                                    }
                                    else {
                                        userModel.findOne({ userType: "ADMIN" }, (errs, resultt) => {
                                            console.log("result of admin ===>>>", resultt.availableBalance)

                                            if (errs) {
                                                res.send({ response_code: 500, response_message: "Internal server error", errs })
                                            }
                                            else if (!resultt) {
                                                res.send({ response_code: 400, response_message: "Not found" })
                                            }
                                            else {

                                                userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { availableBalance: resultt.availableBalance + req.body.amount } }, { new: true }, (erro, resulto) => {

                                                    if (erro) {
                                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                                    }
                                                    else if (!resulto) {
                                                        res.send({ response_code: 400, response_message: "Not found" })
                                                    }
                                                    else {
                                                        console.log("updation of admin available balance is =====>>", resulto)

                                                        let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);

                                                        web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145", "pending").then(async count => {
                                                            var userId = req.body.userId
                                                            var tranxId = charge.balance_transaction
                                                            // var chargeId = charge.id
                                                            console.log("mmmmnghhhhhhhhhhhhhhhhhhhhhhhhhh", count)
                                                            var rawTransaction = {
                                                                "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
                                                                "gasPrice": web3.utils.toHex(10 * 1e9),
                                                                "gasLimit": web3.utils.toHex(210000),
                                                                "to": web3Data.contractAddress,
                                                                "value": "0x0",
                                                                "data": contract.methods.setDetails(userId, tranxId).encodeABI(),
                                                                "nonce": await web3.utils.toHex(count)
                                                            }
                                                            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>.,,,,,,,,,,", count)
                                                            var privateKey1 = "C60D6261B8CC6FF1910E1E1BE54591DA3AA2BE681564F2550767A630C0ADBB5B"
                                                            privateKey = new Buffer(privateKey1, 'hex');
                                                            var transaction = new Tx(rawTransaction)
                                                            transaction.sign(privateKey)
                                                            web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err2, hash) => {

                                                                console.log('error and hash=====>>>>>>>', err2, hash);
                                                                var hub = "https://ropsten.etherscan.io/tx/" + hash
                                                                if (err2) {
                                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                }
                                                                else {
                                                                    var off1 = Math.round(req.body.amount * 1000) / 1000
                                                                    var smartContract = new transactions({
                                                                        Url: hub,
                                                                        //  transactionId:tranxId,
                                                                        userId: req.body.userId,
                                                                        paymentType: "creditCard",
                                                                        number: req.body.number,
                                                                        exp_month: req.body.exp_month,
                                                                        exp_year: req.body.exp_year,
                                                                        usdAmount: req.body.usdAmount,
                                                                        currency: req.body.currency,
                                                                        holdersName: req.body.holdersName,
                                                                        amount: off1,
                                                                        email: req.body.email,
                                                                        customerId: charge.customer,
                                                                        transactionType: "ADD"
                                                                    })
                                                                    smartContract.save((err7, success7) => {
                                                                        console.log("show me the transaction saved =====>>", success7)
                                                                        if (err7) {
                                                                            res.send({ response_code: 500, response_message: "Internal server error" })
                                                                        }
                                                                        else {
                                                                            commonFunction.pushNotification(results.fcmToken, `Congrats! ${results.firstName} you have added ${req.body.amount}  ${req.body.currency}`, "Amount in your wallet", req.body.message, (err23, result11) => {
                                                                                console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                                                if (err23) {
                                                                                    var notify = new notification({
                                                                                        notificationType: "ADD",
                                                                                        userId: results._id,
                                                                                        status: "ACCEPTED",
                                                                                        amount: Math.round(req.body.amount * 1000) / 1000,
                                                                                        notifications: ` ${results.userName} added ${req.body.amount} in wallet.`
                                                                                    })
                                                                                    notify.save((notiErr, notiResult) => {
                                                                                        if (notiErr) {
                                                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else if (!notiResult) {
                                                                                            // console.log("Result not found")
                                                                                        }
                                                                                        else {
                                                                                            console.log("notification saved", notiResult)
                                                                                            //  console.log("Push notification detail>>");
                                                                                            //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                                        }
                                                                                    })
                                                                                }
                                                                                else {
                                                                                    var notify = new notification({
                                                                                        notificationType: "ADD",
                                                                                        userId: results._id,
                                                                                        status: "ACCEPTED",
                                                                                        amount: Math.round(req.body.amount * 1000) / 1000,
                                                                                        // notifications: ` ${results.userName} requested for ${req.body.amount}`
                                                                                        notifications: ` ${results.userName} added  ${req.body.amount} in wallet`
                                                                                    })
                                                                                    notify.save((notiErr, notiResult) => {
                                                                                        if (notiErr) {
                                                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                        }
                                                                                        else if (!notiResult) {
                                                                                            //  console.log("Result not found")
                                                                                        }
                                                                                        else {
                                                                                            console.log("notification saved", notiResult)
                                                                                            // console.log("Push notification detail>>");
                                                                                            //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                                        }
                                                                                    })
                                                                                }
                                                                            })
                                                                            // stripe.retrieve.balance()
                                                                            response(res, "200", success7, "Amount added Successfully");
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }).catch(error => {
                                                            console.log("iam in 277>>>>>>>>>>>>>>>>>", error)
                                                        })
                                                    }
                                                })
                                            }  //
                                        })
                                    }
                                })
                            }
                        }).catch(err => {
                            console.log("err in catch =====", err)
                            return res.send({ response_code: 500, response_message: "Payment error due to no active card..... " })
                        })
                    }
                    // else{
                    //     console.log("error in cards=====>>>")
                    // }

                }).catch(err => {
                    console.log("err in catch =====", err)
                    return res.send({ response_code: 201, response_message: " Your card details are incorrect. " })
                })

        })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getContractDetails = (req, res) => {
    let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
    contract.methods.getDetails(req.body.userId).call().then(function (details) {
        console.log("details are =====", details)
        addTransactionModel.find((error, result) => {
            //console.log("result is ===>>",result)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, [result, details], "Successfull.");
            }
        })

        // res.send({ responseCode: 200, responseMessage: "Successfull", data: { details} })
    }).catch(err => console.log(err));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const setContractDetail = (req, res) => {
//     let contract = new web3.eth.Contract(contractABI, web3Data.contractAddress);
//     console.log("contract address>>>>>>>>>>>>>>>>>>>>>>>>>>>", web3Data.contractAddress)
//     web3.eth.getTransactionCount("0xB4F3b346ED83d477eE2132945Aeb03329B21280b").then(count => {
//         var rawTransaction = {
//             "from": "0xB4F3b346ED83d477eE2132945Aeb03329B21280b",
//             "gasPrice": web3.utils.toHex(10 * 1e9),
//             "gasLimit": web3.utils.toHex(210000),
//             "to": web3Data.contractAddress,
//             "value": "0x0",
//             "data": contract.methods.setDetails("2", "123").encodeABI(),
//             "nonce": web3.utils.toHex(count)
//         }
//         var privateKey1 = "C8DA0FDFDD1477070DA78707534DCD0E2C6B18078F9F1D21E32D8871D326A8BB"
//         privateKey = new Buffer(privateKey1, 'hex');
//         var transaction = new Tx(rawTransaction)
//         transaction.sign(privateKey)
//         web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err2, hash) => {
//             console.log('error and hash=====>>>>>>>', err2, hash);
//             return res.send({ responseCode: 200, responseMessage: "Success", data: hash })
//         })
//     })
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const accountBalance = (req, res) => {
//     userModel.findOne({ _id: req.body.userId }, (err, success) => {
//         console.log("success is ====>>>>", success.accountId)
//         if (err) {
//             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
//         }
//         else if (!success) {
//             response(res, ErrorCode.NOT_FOUND, [], "User not found")
//         }
//         else {
//             stripe.balance.retrieve({
//                 stripe_account: success.accountId, //acct_1EIG3MAWX9DP7PgU - admin account id
//             }, function (err, balance) {
//                 if (err) {
//                     response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
//                 }
//                 else {

//                     console.log("balance is ====>>>", balance)
//                     var query = {
//                         availableBalance: balance.available[0].amount
//                     }
//                     userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { availableBalance: balance.available[0].amount } }, { new: true }, (err2, result2) => {
//                         //  console.log("updated result is ====>>>>",result2)
//                         if (err2) {
//                             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
//                         }
//                         else {
//                             console.log("updated")
//                             response(res, SuccessCode.SUCCESS, [result2.availableBalance], "Updated account balance.");

//                         }
//                     })


//                 }
//             });
//         }


//     })


// }

/////////////////////////////////////////////////////////////////////////WITHDRAW//////////////////////////////////////////////////////////////////////////////
//

const withdrawTrial = async (req, res) => {

    let adminAccount = "acct_1EIG3MAWX9DP7PgU"
    // let checkBalance = await commonFunction.checkBalance(adminAccount)

    stripe.balance.retrieve({
        stripe_account: adminAccount,
    }, (err, balance) => {
        console.log("i am here >>>>", err, balance)

        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else {

            if ((balance.available[0].amount == 0) || (balance.available[0].amount < req.body.amount)) {
                response(res, 404, [], "Not enough balance");
            }

            else {
                console.log("show me admin balance====>>>", balance)


                userModel.findOne({ "_id": req.body.userId }).exec((err, result) => {
                    console.log("sh================>>>", err, result)

                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, 400, [], "Not found");
                    }
                    else {

                        if (result.balance < req.body.amount) {
                            res.send({ response_code: 404, response_message: "Request amount is more than available wallet amount" })
                        }
                        else {

                            stripe.transfers.create({
                                amount: req.body.usdAmount * 100,
                                currency: "usd",
                                destination: result.accountId,//"acct_1EOhSzLVglzITKT2",///admin   u2 // ,   //180467 , // 272721 , 273221
                            }, (err1, result1) => {

                                if (err1) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, err1);
                                }
                                else {
                                    var resentBalance = result.balance - req.body.amount

                                    userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { balance: resentBalance } }, { new: true }).select("balance _id email userName firstName lastName accountId").exec((err1, userData) => {
                                        if (err1) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (!userData) {
                                            response(res, 404, [], "User data not found");

                                        }
                                        else {
                                            userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { availableBalance: balance.available[0].amount } }, { new: true }, (error, adminData) => {

                                                if (error) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else if (!adminData) {
                                                    response(res, 400, [], "Admin data not found");
                                                }
                                                else {

                                                    response(res, SuccessCode.SUCCESS, [userData], "Withdraw done successfully.");

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
    })



}

//////////////////////////////////////////////////////////////////////////sendMoney/////////////////////////////////////////////////////////////////////////////
// send money charges only transaction fee for same country set by admin 
// and transaction fee and conversion fee for different country and then data gets stored using smart contract
// const sendMoney = (req, res) => {



////////////////////////////////////////////////////////////////////////////Receiver list/////////////////////////////////////////////////////////////////////
const receiverList = (req, res) => {
    transaction.find({ fromUserId: req.body.userId }).sort({ createdAt: -1 }).exec(function (err, result) {
        //        console.log("receivers are ====>>", result.receivers)
        if (err) {
            console.log("ghjhjjgjklhkjhkjhklhjjkhk", err)
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result) {
            response(res, 400, [], "Not found");
        }
        else {
            var removeDupliacte = _.uniqBy(result, 'toUserId');
            console.log("tell me the array length====>>>qqqqqqq985", removeDupliacte)
            response(res, 200, [], removeDupliacte);
        }
    })
}

// const receiverList = (req, res) => {
//     userModel.findById({_id:req.body.userId}).sort({createdAt:1 }).exec(function (err, result) {
//         console.log("receivers are ====>>", result.receivers)
//         if (err) {
//             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
//         }
//         else if (!result) {
//             response(res, 400, [], "Not found");
//         }
//         else {

//             var array = result.receivers
//             //var array1 = [array.length -1]
//             var chek = array.reverse(); 

//            var removeDupliacte = _.uniqBy(chek, 'id');
//             console.log("tell me the array length====>>>qqqqqqq985",removeDupliacte)


//             // var newarr = [],
//             //     unique = {};
//             // array.forEach(function (ab) {
//             //     if (!unique[ab.id]) {
//             //         newarr.push(ab);
//             //         unique[ab.id] = ab;
//             //     }
//             // })
//             // console.log("output is ======>>>", newarr)

//             // var valueArr = array.map(function(item){ return item.name });
//             // console.log("tell me value=====>>",valueArr)
//             // var isDuplicate = valueArr.some(function(item, idx){ 
//             //     return valueArr.indexOf(item) != idx 
//             // });
//             // console.log("show me=======>>>>",isDuplicate);

//             response(res, SuccessCode.SUCCESS,removeDupliacte, "List of receivers");

//         }

//     })


// userModel.findById({ _id: req.body.userId }, (err, result) => {
//     // console.log("receivers are ====>>", err, result)
//     if (err) {
//         res.send({ responseCode: 500, responseMessage: "Internal server error" })
//     }
//     else if (!result) {
//         res.send({ responseCode: 404, responseMessage: "user not dound" })
//     }
//     else {
//         var data = result.receivers;
//         res.send({ responseCode: 200, responseMessage: "get data successfully", data })
//         console.log(">>>963<>>>>>", data.length)

// for (var i = 0; i < data.length; i++){
//             for (var j = 0; j = distinct.length; j++) {
//                 if (data[i] != distinct[j]){
//                     distinct[0]=data[i];
//                 }                    
//             }                
//     }
//     console.log(" distinct>>>>>", distinct); 
// }
// })
//}

//////////////////////////////////////////////////////////////walletBalance ///////////////////////////////////////////////////////////////////////


const walletBalance = async (req, res) => {

    var data = await userModel.findOne({ _id: req.params.userId }).then((result) => {
        if (result) {
            res.send({ esponse_code: 200, response_message: "success", result: result.balance })
        }
        else if (!result) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
    }).catch(error => {
        res.send({ response_code: 500, response_message: "Internal server error", error })
    })
    //console.log(" show me the data ", data)
    // if (err) {
    //     response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    // }
    // else if (!result) {
    //     response(res, 400, [], "Not found");
    // }
    // else {
    //     response(res, SuccessCode.SUCCESS, [result.balance], "Wallet balance of user");
    // }

}



/////////////////////////////////////////////////////////////////RequestMoney/////////////////////////////////////////////////////////////////////////////////
//this is in receiver section 
//user request for amount and message to other users and sends notification using fcm

const requestMoney = (req, res) => {
    console.log('sssssssssssssssssssssssss', req.body);
    if (!req.body.userId) {
        res.send({ response_code: 400, response_message: "Parameters Missing" })
    }
    else {
        userModel.findOne({ _id: req.body.userId }, (error49, success) => {
            //console.log("result of request to is =====>>", success)
            if (error49) {
                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!success) {
                res.send({ response_code: 400, response_message: "Data not found" })
            }
            else {
                userModel.findOne({ _id: req.body.requestTo }, (error3, success3) => {
                    //console.log("result of request to is =====>>", success3)
                    if (error3) {
                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!success3) {
                        res.send({ response_code: 400, response_message: "Data not found" })
                    }
                    else {
                        if(req.body.message){

                        console.log("succcccc>>>>>>>>>>>>>>", success3.fcmToken)
                        commonFunction.pushNotification(success3.fcmToken, "you have been requested", `${success.userName} requested for ${req.body.convertedAmount} ${req.body.senderCurrency} amount.`, `${success.userName} also dropped a message saying ${req.body.message}`, (err23, result11) => {
                            console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                            if (err23) {

                                var notify = new notification({
                                    requestedId: req.body.userId,
                                    userId: req.body.requestTo,
                                    status: "PENDING",
                                    amount: req.body.amount,
                                    convertedAmount: Math.round(req.body.convertedAmount * 1000) / 1000,
                                    notificationType: "REQUEST",
                                    message: req.body.message,
                                    notifications: `${success.userName} has requested  ${req.body.convertedAmount} ${req.body.receiverCurrency} .${success.userName} also dropped a message saying ${req.body.message}`

                                })
                                notify.save((err111, result111) => {
                                    if (err111) {
                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!result111) {
                                        console.log("Result not found")
                                    }
                                    else {

                                        console.log("notification saved", result111)
                                        console.log("Push notification detail>>");
                                        res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                    }
                                })

                            }
                            else {
                                var notify = new notification({
                                    requestedId: req.body.userId,
                                    userId: success3._id,
                                    status: "PENDING",
                                    amount: req.body.amount,
                                    convertedAmount: Math.round(req.body.convertedAmount * 1000) / 1000,
                                    notificationType: "REQUEST",
                                    message: req.body.message,
                                    notifications: ` ${success.userName} has requested  ${req.body.convertedAmount} ${req.body.receiverCurrency}.${success.userName} also dropped a message saying ${req.body.message}`

                                })
                                notify.save((err111, result111) => {
                                    if (err111) {
                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!result111) {
                                        console.log("Result not found")
                                    }
                                    else {

                                        console.log("notification saved", result111)
                                        console.log("Push notification detail>>");
                                        res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                    }
                                })

                            }
                            //console.log("tell me the answer")
                        })
                    }
                    else{
                        commonFunction.pushNotification(success3.fcmToken, "you have been requested", `${success.userName} requested for ${req.body.convertedAmount} ${req.body.senderCurrency} amount.`, `${success.userName} also dropped a message saying ${req.body.message}`, (err23, result11) => {
                            console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                            if (err23) {

                                var notify = new notification({
                                    requestedId: req.body.userId,
                                    userId: req.body.requestTo,
                                    status: "PENDING",
                                    amount: req.body.amount,
                                    convertedAmount: Math.round(req.body.convertedAmount * 1000) / 1000,
                                    notificationType: "REQUEST",
                                    notifications: `${success.userName} has requested  ${req.body.convertedAmount} ${req.body.receiverCurrency}`

                                })
                                notify.save((err111, result111) => {
                                    if (err111) {
                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!result111) {
                                        console.log("Result not found")
                                    }
                                    else {

                                        console.log("notification saved", result111)
                                        console.log("Push notification detail>>");
                                        res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                    }
                                })

                            }
                            else {
                                var notify = new notification({
                                    requestedId: req.body.userId,
                                    userId: success3._id,
                                    status: "PENDING",
                                    amount: req.body.amount,
                                    convertedAmount: Math.round(req.body.convertedAmount * 1000) / 1000,
                                    notificationType: "REQUEST",
                                    notifications: ` ${success.userName} has requested  ${req.body.convertedAmount} ${req.body.receiverCurrency}`

                                })
                                notify.save((err111, result111) => {
                                    if (err111) {
                                        response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!result111) {
                                        console.log("Result not found")
                                    }
                                    else {

                                        console.log("notification saved", result111)
                                        console.log("Push notification detail>>");
                                        res.send({ response_code: 200, response_message: `Your request has been sent to ${success3.userName} successfully`, result: result111 })
                                    }
                                })

                            }
                            //console.log("tell me the answer")
                        })
                    }
                    }
                })
            }
        })
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//conversion fee and transaction fee set by admin

const conTransFee = (req, res) => {
    userModel.findOne({ userType: "ADMIN" }, (err, result) => {
        console.log("result of admin ====>>", result.transactionFee)
        if (err) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {
            var show = {
                transactionFee: result.transactionFee,
                conversionFee: result.conversionFee
            }
            res.send({ response_code: 200, response_message: "Found", data: show })
        }


    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fcm token set by each user

const tokenFcm = (req, res) => {
    userModel.findOne({ _id: req.body.userId }, (error, result1) => {
        if (error) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result1) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {
            userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { fcmToken: req.body.fcmToken } }, { new: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {

                    var show = {
                        fcmToken: result1.fcmToken
                    }
                    console.log("fcm token ", show)
                    res.send({ response_code: 200, result, response_message: "FCM token set" })
                }
            })
        }


    })

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const withdraw = async (req, res) => {

    userModel.findOne({ userType: "ADMIN" }, (error, adminResult) => {
        console.log("admin account id is  ======>>>", adminResult.accountId)
        if (error) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (!adminResult) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {
            stripe.balance.retrieve({
                stripe_account: adminResult.accountId,
            }, (err, balance) => {
                console.log("i am here >>>>", err, balance)

                if (err) {
                    res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else {

                    if ((balance.available[0].amount == 0) || (balance.available[0].amount < req.body.amount)) {
                        response(res, 404, [], "There is less amount in your wallet , please add some.");
                    }

                    else {
                        console.log("show me admin balance====>>>", balance)
                        userModel.findOne({ "_id": req.body.userId }).exec((err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, 400, [], "Not found");
                            }
                            else {

                                if (result.balance < req.body.amount) {
                                    res.send({ response_code: 404, response_message: "Request amount is more than available wallet amount" })
                                }
                                else {

                                    stripe.transfers.create({
                                        amount: req.body.usdAmount * 100,
                                        currency: "usd",
                                        destination: result.accountId,//"acct_1EOhSzLVglzITKT2",///admin   u2 // ,   //180467 , // 272721 , 273221
                                    }, (err1, result1) => {
                                        console.log("show me transfer result=====>>", result1)
                                        if (err1) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR, err1);
                                        }
                                        else {
                                            var resentBalance = result.balance - req.body.amount

                                            userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { balance: resentBalance } }, { new: true }).select("balance _id email userName firstName lastName accountId").exec((err1, userData) => {
                                                console.log("show me the saved data of updated user=====>>>", userData)

                                                if (err1) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else if (!userData) {
                                                    response(res, 404, [], "User data not found");

                                                }
                                                else {
                                                    userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: { availableBalance: balance.available[0].amount } }, { new: true }, (error, adminData) => {
                                                        if (error) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else if (!adminData) {
                                                            response(res, 400, [], "Admin data not found");
                                                        }
                                                        else {

                                                            transactions.findOne({ userId: req.body.userId }, (err0, success0) => {
                                                                console.log("show me result =====>>of customer===>>", success0.customerId)
                                                                if (err0) {
                                                                    res.send({ response_code: 500, response_message: "Internal server error" })
                                                                }
                                                                else if (!success0) {
                                                                    console.log(")))))))))))))))))))))##################")
                                                                    res.send({ response_code: 201, response_message: "Not enough balance", result: [] })
                                                                }
                                                                else if (!success0.customerId) {
                                                                    res.send({ response_code: 400, response_message: "There is no customer id " })
                                                                }
                                                                else {

                                                                    stripe.tokens.create({
                                                                        bank_account: {
                                                                            country: 'US',
                                                                            currency: 'usd',
                                                                            account_holder_name: req.body.holdersName, /// 'Jenny Rosen',
                                                                            account_holder_type: 'individual',
                                                                            routing_number: req.body.routingNumber,  //'100000000',
                                                                            account_number: req.body.number   //'000123456789'
                                                                        }
                                                                    }).then((bankToken) => {
                                                                        if (bankToken) {
                                                                            console.log("show me the result ========", bankToken)

                                                                            return stripe.customers.createSource(
                                                                                success0.customerId,
                                                                                {
                                                                                    source: bankToken.id,
                                                                                })
                                                                                .then((createSource) => {
                                                                                    if (createSource) {
                                                                                        console.log("show me created charge ===>>", createSource)
                                                                                        stripe.customers.verifySource(
                                                                                            success0.customerId,
                                                                                            createSource.id,
                                                                                            {
                                                                                                amounts: [32, 45],
                                                                                            })
                                                                                            .then((bankAccount) => {
                                                                                                if (bankAccount) {
                                                                                                    console.log("show me the bank account ====>>", bankAccount)
                                                                                                    //   res.send({response_code:200 , response_message:"bank account details",bankAccount })

                                                                                                    let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
                                                                                                    web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145", "pending").then(async count => {
                                                                                                        var userId = req.body.userId
                                                                                                        var tranxId = result1.balance_transaction
                                                                                                        // var chargeId = charge.id

                                                                                                        var rawTransaction = {
                                                                                                            "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
                                                                                                            "gasPrice": web3.utils.toHex(10 * 1e9),
                                                                                                            "gasLimit": web3.utils.toHex(210000),
                                                                                                            "to": web3Data.contractAddress,
                                                                                                            "value": "0x0",
                                                                                                            "data": contract.methods.setDetails(userId, tranxId).encodeABI(),
                                                                                                            "nonce": web3.utils.toHex(count)
                                                                                                        }

                                                                                                        var privateKey1 = "C60D6261B8CC6FF1910E1E1BE54591DA3AA2BE681564F2550767A630C0ADBB5B"
                                                                                                        privateKey = new Buffer(privateKey1, 'hex');
                                                                                                        var transaction = new Tx(rawTransaction)
                                                                                                        transaction.sign(privateKey)
                                                                                                        web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err2, hash) => {

                                                                                                            console.log('error and hash=====>>>>>>>', err2, hash);
                                                                                                            var hub = "https://ropsten.etherscan.io/tx/" + hash
                                                                                                            if (err2) {
                                                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                            }
                                                                                                            else {

                                                                                                                var withdraw = new transactions({
                                                                                                                    //  "email": req.locals['fields'].email,
                                                                                                                    transactionType: "WITHDRAW",
                                                                                                                    country: result.country,
                                                                                                                    bankName: req.body.bankName,
                                                                                                                    branchName: req.body.branchName,
                                                                                                                    bankImage: req.body.bankImage,

                                                                                                                    nickName: req.body.nickName,
                                                                                                                    holdersName: bankToken.bank_account.account_holder_name,
                                                                                                                    routingNumber: bankToken.bank_account.routing_number,
                                                                                                                    accountHolderType: 'individual',
                                                                                                                    number: bankToken.bank_account.last4,
                                                                                                                    userId: result._id,
                                                                                                                    Url: hub

                                                                                                                })

                                                                                                                withdraw.save((error21, result21) => {
                                                                                                                    console.log("withraw saved=======>>", result21._id)
                                                                                                                    if (error21) {
                                                                                                                        res.send({ response_code: 500, response_message: "Internal server error" })
                                                                                                                    }
                                                                                                                    else if (!result21) {
                                                                                                                        res.send({ response_code: 400, response_message: "Not found" })
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        var data = {
                                                                                                                            result: [userData, result21]
                                                                                                                        }
                                                                                                                        res.send({ response_code: 200, response_message: "Withdraw successfully", data })
                                                                                                                    }


                                                                                                                })

                                                                                                            }

                                                                                                        })


                                                                                                    }).catch(error => { console.log("error of web3 is =====>>>>", error) })

                                                                                                }
                                                                                            }).catch(error1 => {
                                                                                                res.send({ response_code: 400, response_message: "Cannot verify" })
                                                                                                console.log("show me the error====>>", error1)
                                                                                            })

                                                                                    }
                                                                                }).catch(err => {
                                                                                    console.log("err in catch =====", err)
                                                                                    res.send({ response_code: 400, response_message: "A bank account with that routing number and account number already exists for this customer." })
                                                                                })
                                                                        }
                                                                    }).catch(error => {
                                                                        res.send({ response_code: 400, response_message: "Invalid bank credentials" })
                                                                        console.log("tell me the error====>>", error)
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

                    }
                }

            })
        }
    })
}

const checkStripe = (req, res) => {

    addTransactionModel.findOne({ userId: req.body.userId }, (err0, success0) => {
        console.log("show me result =====>>of customer===>>", success0.customerId)
        if (err0) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (!success0) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {

            stripe.tokens.create({
                bank_account: {
                    country: 'US',
                    // currency: 'usd',
                    account_holder_name: req.body.holdersName,
                    //  account_holder_type: 'individual',
                    routing_number: req.body.routingNumber,    //110000000
                    account_number: req.body.number         ///000123456789
                }
            }).then((bankToken) => {
                if (bankToken) {
                    console.log("show me the result ========", bankToken)

                    return stripe.customers.createSource(
                        success0.customerId,
                        {
                            source: bankToken.id,
                        })
                        .then((createSource) => {
                            if (createSource) {
                                console.log("show me created charge ===>>", createSource)
                                stripe.customers.verifySource(
                                    success0.customerId,
                                    createSource.id,
                                    {
                                        amounts: [32, 45],
                                    })
                                    .then((bankAccount) => {
                                        if (bankAccount) {
                                            console.log("show me the bank account ====>>", bankAccount)
                                            res.send({ response_code: 200, response_message: "bank account details", bankAccount })
                                        }
                                    }).catch(error1 => {
                                        res.send({ response_code: 400, response_message: "Cannot verify" })
                                        console.log("show me the error====>>", error1)
                                    })

                            }
                        }).catch(err => {
                            console.log("err in catch =====", err)
                            res.send({ response_code: 400, response_message: "A bank account with that routing number and account number already exists for this customer." })
                        })
                }
            }).catch(error => {
                res.send({ response_code: 400, response_message: "Invalid bank credentials" })
                console.log("tell me the error====>>", error)
            })

        }
    })

}

const listBankAccount = (req, res) => {
    addTransactionModel.find({ transactionType: "WITHDRAW" }, (err, success) => {
        if (err) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (success.length == 0) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {
            res.send({ response_code: 200, response_message: "Found successfully", result: success })
        }
    })
}

const userBankAccounts = (req, res) => {
    var query = {
        transactionType: "WITHDRAW",
        userId: req.body.userId
    }
    addTransactionModel.find(query, (error, result) => {
        if (error) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (result.length == 0) {
            res.send({ response_code: 200, response_message: "Not found", result: [] })
        }
        else {
            res.send({ response_code: 200, response_message: "Found successfully", result: result })
        }
    })
}


const sendRequest = (req, res) => {

    console.log("reqreqreq----------------------", req.body)
    userModel.findOne({ userType: "ADMIN" }, (err45, result45) => {
        // console.log("show me the admin result =====>>>", result45.transactionFee)
        // console.log("show me the admin result =====>>>",result.conversionFee)
        if (err45) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result45) {
            response(res, 400, [], " Admin not found");
        }
        else if (!result45.transactionFee && !result45.conversionFee) {
            response(res, 400, [], "Fee not set");
        }
        else {
            userModel.findOne({ _id: req.body.from }, (err, result) => {
                //  console.log("result of sender is =====>>>", result.balance)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, 400, [], " Sender Not found");
                }
                else {
                    userModel.findOne({ _id: req.body.to }, (err3, result3) => {
                        //  console.log("show me amount===", result3.balance)
                        if (err3) {
                            res.send({ response_code: 500, response_messsage: "Internal server error" })
                        }
                        else if (!result3) {
                            res.send({ response_code: 400, response_messsage: "Receiver not found" })
                        }
                        else {
                            if (result.country == result3.country) {
                                var percent = (result45.transactionFee / 100) * result.balance
                                // console.log("show me percent ========>>>>", percent)
                                // console.log("show me the admin result111111111111111 =====>>>", result45.transactionFee)
                                var cut = req.body.balance + (result45.transactionFee / 100) * req.body.balance
                                // console.log("cut amount is ====>>", cut)
                                if (result.balance < cut) {
                                    res.send({ response_code: 400, response_message: "Not enough balance" })
                                }
                                else {
                                    userModel.findByIdAndUpdate({ _id: req.body.from }, { $set: { balance: result.balance - cut, transfer: "Sender", amountSent: req.body.amountSent, message: req.body.message }, }, { new: true }, (error22, success22) => {
                                        console.log("message   of updated is =====>>>", success22)
                                        if (error22) {
                                            res.send({ response_code: 400, response_message: "Not enough balance" })
                                        }
                                        else {
                                            commonFunction.pushNotification(result.fcmToken, "Sent money ", `You send ${req.body.amountSent} ${req.body.senderCurrency} to ${result3.userName}`, req.body.message, (err23, result1) => {
                                                console.log("Senders detaisl=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111111", result)
                                                console.log("result of notification is send by me<><><><><><><><><><<><><><<><><> =====>>>", err23, result1)
                                                if (err23) {
                                                    let notify = new notification({
                                                        notificationType: "SEND",
                                                        requestedId: result3._id,
                                                        userId: result._id,
                                                        status: "ACCEPTED",
                                                        amount: req.body.balance,
                                                        senderCurrency: req.body.senderCurrency,
                                                        receiverCurrency: req.body.receiverCurrency,
                                                        message: req.body.message,
                                                        convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                        notifications: `You send ${req.body.amountSent} ${req.body.senderCurrency} to ${result3.userName}`
                                                    })
                                                    notify.save((notiErr, sendNotiResult) => {
                                                        console.log("notification error======= send", notiErr)
                                                        if (notiErr) {
                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else if (!sendNotiResult) {
                                                            console.log("Result not found")
                                                        }
                                                        else {
                                                            console.log("notification saved send", sendNotiResult)
                                                            console.log("Push notification detail send>>1356");
                                                        }
                                                    })
                                                }
                                                else {
                                                    let notify = new notification({
                                                        notificationType: "SEND",
                                                        requestedId: result3._id,
                                                        userId: result._id,
                                                        status: "ACCEPTED",
                                                        amount: req.body.balance,
                                                        message: req.body.message,
                                                        senderCurrency: req.body.senderCurrency,
                                                        receiverCurrency: req.body.receiverCurrency,
                                                        convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                        notifications: `You send ${req.body.amountSent} ${req.body.senderCurrency} to ${result3.userName}`
                                                    })
                                                    notify.save((notiErr, sendNotiResult) => {
                                                        console.log("notification error======= send", notiErr)
                                                        if (notiErr) {
                                                            response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else if (!sendNotiResult) {
                                                            console.log("Result not found")
                                                        }
                                                        else {
                                                            console.log("notification saved send ", sendNotiResult)
                                                            console.log("Push notification detail send>>");
                                                        }
                                                    })
                                                }
                                            })
                                            if (req.body.message) {
                                                commonFunction.pushNotification(result3.fcmToken, "wants to sent", `${result.firstName} wants to send ${req.body.amountSent} ${req.body.senderCurrency} to you.`, `${result.firstName} also dropped a message saying ${req.body.message}`, (err23, result11) => {
                                                    console.log("Senders currency=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111111", req.body.senderCurrency)
                                                    console.log("Recievers detaisl=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1111111", result3)
                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                    if (err23) {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,

                                                            message: req.body.message,
                                                            notifications: `${result.userName} wants to send ${req.body.receiverCurrency} ${req.body.amountSent} to you.${result.userName} also dropped a message saying, "${req.body.message}"`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            console.log("notification error=======", notiErr)
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            notifications: `${result.userName} wants to send ${req.body.receiverCurrency} ${req.body.amountSent} to you.${result.userName} also dropped a message saying, "${req.body.message}"`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                commonFunction.pushNotification(result3.fcmToken, `${result.userName} wants to send`, `${result.userName} wants to send ${req.body.amountSent} ${req.body.receiverCurrency} to you.`, req.body.message, (err23, result11) => {
                                                    console.log("result of ummm is<><><><><><><><><><<><><><<><><> =====>>>",req.body.receiverCurrency)
                                                    if (err23) {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            notifications: `${result.userName} wants to send ${req.body.receiverCurrency} ${req.body.amountSent} to you .`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            console.log("notification error=======", notiErr)
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            notifications: `${result.userName} wants to send ${req.body.receiverCurrency} ${req.body.amountSent} to you `
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            res.send({ response_code: 200, response_message: ` A request has been sent to ${result3.userName} for accepting the amount ${req.body.amountSent} ${req.body.senderCurrency}` })
                                            //  res.send({ response_code: 200, response_message: ` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                            //  }
                                            //  })
                                        }
                                    })
                                }
                            }
                            else {
                                var perAm = ((result45.transactionFee / 100) * result.balance) + ((result45.conversionFee / 100) * result.balance)
                                console.log("show me the result of perammmm=====>>>>", perAm)
                                var cut1 = req.body.balance + ((result45.transactionFee / 100) * req.body.balance) + ((result45.conversionFee / 100) * req.body.balance)
                                console.log("cut amount is ====>>", cut1)
                                if (result.balance < cut1) {
                                    res.send({ response_code: 400, response_message: "Not enough balance" })
                                }
                                else {
                                    userModel.findByIdAndUpdate({ _id: req.body.from }, { $set: { balance: result.balance - cut1, transfer: "Sender", amountSent: req.body.amountSent, message: req.body.message }, }, { new: true }, (error22, success22) => {
                                        console.log("show me the message --=======>>>", success22)
                                        if (error22) {
                                            res.send({ response_code: 400, response_message: "Not enough balance" })
                                        }
                                        else {
                                            if (req.body.message) {
                                                commonFunction.pushNotification(result3.fcmToken, `${result.userName} wants to send`, `${result.userName} wants to send ${req.body.amountSent} ${req.body.receiverCurrency} + to you.`, `${result.userName} also dropped a message saying ${success22.message}`, (err23, result11) => {
                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                    if (err23) {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            userId: req.body.to,   // jisko requset ja rahi hai
                                                            requestedId: result._id,    //jaha se ja rahi hai   
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            notifications: ` ${result.userName} wants to send ${req.body.receiverCurrency} ${req.body.receiverCurrency} to you.${result.userName}  also dropped a message saying, "${req.body.message}"`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            notifications: `${result.userName} wants to send ${req.body.amountSent} ${req.body.receiverCurrency}   to you.${result.userName} also dropped a message saying, "${req.body.message}"`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                commonFunction.pushNotification(result3.fcmToken, `${result.userName} wants to send`, req.body.amountSent + ' ' + req.body.receiverCurrency + "to you ", success22.message, (err23, result11) => {
                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                    if (err23) {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            userId: req.body.to,   // jisko requset ja rahi hai
                                                            requestedId: result._id,    //jaha se ja rahi hai   
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            notifications: ` ${result.userName} wants to send ${req.body.amountSent} ${req.body.receiverCurrency}  to you .`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        let notify = new notification({
                                                            notificationType: "SEND",
                                                            requestedId: result._id,
                                                            userId: req.body.to,
                                                            status: "PENDING",
                                                            amount: req.body.balance,
                                                            senderCurrency: req.body.senderCurrency,
                                                            receiverCurrency: req.body.receiverCurrency,
                                                            convertedAmount: Math.round(req.body.amountSent * 1000) / 1000,
                                                            message: req.body.message,
                                                            notifications: `${result.userName} wants to send ${req.body.amountSent} ${req.body.receiverCurrency}  to you.`
                                                        })
                                                        notify.save((notiErr, notiResult) => {
                                                            if (notiErr) {
                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!notiResult) {
                                                                console.log("Result not found")
                                                            }
                                                            else {
                                                                console.log("notification saved", notiResult)
                                                                console.log("Push notification detail>>");
                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            // res.send({ response_code: 200, response_message: ` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                            // a req
                                            res.send({ response_code: 200, response_message: ` A request has been sent to ${result3.userName} for accepting the amount ${cut1} ${req.body.senderCurrency} ` })
                                            // }
                                            // })
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    })
}

const acceptOrRejectSend = (req, res) => {
    console.log('najmu-------------------------')
    notificationModel.findOne({ _id: req.body.notificationId }, (err11, result11) => {
        // console.log("show me result =====>>>>",result11.convertedAmount)
        console.log("I want to know result 99 >>>>>>>>>>>>>>>",result11)
        if (err11) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (!result11) {
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {
            userModel.findOne({ _id: result11.requestedId }, (err99, result99) => {
                console.log("i am in 786",result99)
                if (err99 || !result99) {
                    res.send({ response_code: 500, response_message: "Something went wrong" })
                }
                else {
                    if (req.body.status == "ACCEPTED") {
                        notificationModel.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "ACCEPTED", notifications: ` ${result11.convertedAmount}  ${result11.receiverCurrency} sent by ${result99.userName}  was accepted` } }, { new: true }, (err22, result22) => {
                            if (err22) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            }
                            else {
                                userModel.findOne({ _id: result11.userId }, (err1, result1) => {
                                    if (err1 || !result1) {
                                        res.send({ response_code: 500, response_message: "Something went wrong" })
                                    }
                                    else {
                                        userModel.findOne({ _id: result11.requestedId }, (err88, result88) => {
                                            console.log("Umiiii tetll meeeeee amount sent==", result88)
                                            if (err88 || !result88) {
                                                res.send({ response_code: 500, response_message: "Something went wrong" })
                                            }
                                            else {
                                                userModel.findByIdAndUpdate({ _id: result11.userId }, { $set: { balance: result1.balance + result11.convertedAmount } }, { new: true }, (error2, result2) => {
                                                    console.log("result is ====>>>", result2)
                                                    if (error2) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        var showTransaction = new transaction({
                                                            fromUserId: result11.requestedId,    // result11.userId,  
                                                            toUserId: result11.userId,
                                                            senderAmount: result11.amount,
                                                            toBalance: result88.amount,
                                                            fromMessage: result88.message,
                                                            transactionType: "SEND"
                                                        })
                                                        showTransaction.save((error27, result27) => {
                                                            console.log("transaction result====", result27)
                                                            if (error27) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!result27) {
                                                                res.send({ responseCode: 400, responseMessage: "Not found" })
                                                            }
                                                            else {
                                                                let contract = new web3.eth.Contract(web3Data.contractABI, web3Data.contractAddress);
                                                                web3.eth.getTransactionCount("0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145", "pending").then(count => {
                                                                    console.log(" show me the count====>>", count)
                                                                    var senderAmount = result27.senderAmount
                                                                    var fromMessage = ""
                                                                    var toUserId = result27.toUserId
                                                                    var fromUserId = result27.fromUserId
                                                                    var tranxId = result27._id.toString()
                                                                    console.log("777 for smartContract details", senderAmount, toUserId, fromUserId, tranxId)
                                                                    // var chargeId = charge.id
                                                                    var rawTransaction = {
                                                                        "from": "0x6c5F8879eab4e73b92Cc4Bc89d364C381cb69145",
                                                                        "gasPrice": web3.utils.toHex(10 * 1e9),
                                                                        "gasLimit": web3.utils.toHex(1000000),
                                                                        "to": web3Data.contractAddress,
                                                                        "value": "0x0",
                                                                        "data": contract.methods.setAllDetails(tranxId, fromUserId, toUserId, "", senderAmount).encodeABI(),
                                                                        "nonce": web3.utils.toHex(count)
                                                                    }
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
                                                                            console.log("show me result ===5465765766875698709821==>>>>", result11.convertedAmount)
                                                                            transaction.findOneAndUpdate({ _id: result27._id }, { $set: { Url: hub } }, { new: true }, (error5, success5) => {
                                                                                if (error5) {
                                                                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                                                }
                                                                                else if (!success5) {
                                                                                    res.send({ responseCode: 400, responseMessage: "Not found" })
                                                                                } else {
                                                                                    commonFunction.pushNotification(result2.fcmToken, result22.convertedAmount, "was deposited to your wallet !", result88.message, (err23, result101) => {
                                                                                        console.log("result of notification is<<><<><><><<><><> =====>>>", err23, result101)
                                                                                        if (err23) {

                                                                                            let notify = new notification({
                                                                                                notificationType: "SEND",
                                                                                                requestedId: result1._id,
                                                                                                userId: result88._id,
                                                                                                status: "ACCEPTED",
                                                                                                amount: result22.amount,

                                                                                                notifications: `${result1.userName} received ${result22.convertedAmount}${result11.senderCurrency}`
                                                                                            })
                                                                                            notify.save((notiErr, notiResult) => {
                                                                                                console.log("notification error=======", notiErr)
                                                                                                if (notiErr) {
                                                                                                    response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else if (!notiResult) {
                                                                                                    console.log("Result not found")
                                                                                                }
                                                                                                else {
                                                                                                    console.log("notification saved", notiResult)
                                                                                                    console.log("Push notification detail>>");
                                                                                                    //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        else {
                                                                                            console.log("I mght be inr >>>>>>>>>>>>>>>>>",result11.senderCurrency)
                                                                                            let notify = new notification({
                                                                                                notificationType: "SEND",
                                                                                                requestedId: result1._id,
                                                                                                userId: result88._id,
                                                                                                status: "ACCEPTED",
                                                                                                amount: result22.amount,
                                                                                                convertedAmount: result22.convertedAmount,
                                                                                                notifications: `${result1.userName} received ${result22.convertedAmount} ${result11.senderCurrency}  `

                                                                                            })
                                                                                            notify.save((notiErr, notiResult) => {
                                                                                                if (notiErr) {
                                                                                                    response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                                                }
                                                                                                else if (!notiResult) {
                                                                                                    console.log("Result not found")
                                                                                                }
                                                                                                else {
                                                                                                    console.log("notification saved", notiResult)
                                                                                                    console.log("Push notification detail>>");
                                                                                                    // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                                                                }
                                                                                            })

                                                                                        }
                                                                                    })
                                                                                    response(res, SuccessCode.SUCCESS, [success5], " Sent amount has been added successfully in wallet")
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
                        })
                    }
                    else {
                        // console.log("show me the result of admin ====>>", result11.convertedAmount)
                        notificationModel.findOneAndUpdate({ _id: req.body.notificationId }, { $set: { status: "REJECTED", notifications: ` ${result11.convertedAmount} ${result11.receiverCurrency} was sent by ${result99.userName}  is rejected` } }, { new: true }, (err33, result33) => {
                            console.log("give me the result converted amount======++++", result33.convertedAmount)
                            if (err33) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            }
                            else {
                                userModel.findOne({ _id: result11.userId }, (err44, result44) => {
                                    console.log("show me the country===>>", result44.country)
                                    if (err44 || !result44) {
                                        res.send({ response_code: 500, response_message: "Something went wrong" })
                                    }
                                    else {
                                        userModel.findOne({ _id: result11.requestedId }, (err55, result55) => {
                                            console.log("show me another country===>>", result55.country)
                                            if (err55 || !result55) {
                                                res.send({ response_code: 500, response_message: "Something went wrong" })
                                            }
                                            else if (result44.country == result55.country) {

                                                userModel.findOne({ userType: "ADMIN" }, (err66, result66) => {
                                                    console.log("admi result====", result66)
                                                    if (err66 || !result66) {
                                                        res.send({ response_code: 500, response_message: "Something went wrong" })
                                                    }
                                                    else {
                                                        var kut = (result66.transactionFee / 100) * result55.balance
                                                        console.log("show me same kutt====>>", kut)
                                                        var cut = (result66.transactionFee / 100) * parseInt(result11.amount) + parseInt(result11.amount)
                                                        console.log("show me cut amount ===>>", cut)
                                                        userModel.findByIdAndUpdate({ _id: result11.requestedId }, { $set: { balance: result55.balance + cut } }, (err77, result77) => {
                                                            console.log("updated from result ====", result77)
                                                            if (err77) {
                                                                res.send({ response_code: 500, response_message: "Something went wrong" })
                                                            }
                                                            else {
                                                                  console.log(" uk show me the result of admin ====>>", result11.senderCurrency)
                                                                commonFunction.pushNotification(result55.fcmToken, "Your sent amount is rejected", "Amount", result55.message, (err23, result101) => {
                                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result11)
                                                                    if (err23) {

                                                                        let notify = new notification({
                                                                            notificationType: "SEND",
                                                                            requestedId: result44._id,   //  result55._id,
                                                                            userId: result55._id,
                                                                            status: "REJECTED",
                                                                            amount: result33.amount,
                                                                            convertedAmount: result33.convertedAmount,
                                                                            notifications: `${result44.userName} rejected your transfer of 
                                                                            ${result11.senderCurrency} ${result33.convertedAmount} `
                                                                        })
                                                                        notify.save((notiErr, notiResult) => {

                                                                            console.log("notification result=======", notiResult)
                                                                            if (notiErr) {
                                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else if (!notiResult) {
                                                                                console.log("Result not found")
                                                                            }
                                                                            else {
                                                                                console.log("notification saved", notiResult)
                                                                                console.log("Push notification detail>>");
                                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        let notify = new notification({
                                                                            notificationType: "SEND",
                                                                            requestedId: result44._id,    //  result55._id,
                                                                            userId: result55._id,
                                                                            status: "REJECTED",
                                                                            amount: result33.amount,
                                                                            convertedAmount: result33.convertedAmount,
                                                                            notifications: `${result44.userName} rejected your transfer of 
                                                                            ${result11.senderCurrency} ${result33.convertedAmount} `

                                                                        })
                                                                        notify.save((notiErr, notiResult) => {
                                                                            if (notiErr) {
                                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else if (!notiResult) {
                                                                                console.log("Result not found")
                                                                            }
                                                                            else {

                                                                                console.log("notification saved", notiResult)
                                                                                console.log("Push notification detail>>");
                                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                                            }
                                                                        })

                                                                    }
                                                                })


                                                                res.send({ response_code: 200, response_message: "Amount rejected." })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                userModel.findOne({ userType: "ADMIN" }, (err66, result66) => {
                                                    if (err66 || !result66) {
                                                        res.send({ response_code: 500, response_message: "Something went wrong" })
                                                    }
                                                    else {
                                                        var pers = ((result66.transactionFee / 100) * result55.balance) + ((result66.conversionFee / 100) * result55.balance)
                                                        console.log("show me added back amount ====....", pers)

                                                        var cut = ((result66.transactionFee / 100) * parseInt(result11.amount)) + ((result66.conversionFee / 100) * parseInt(result11.amount)) + parseInt(result11.amount)
                                                        console.log("show me the cut amount", cut)

                                                        userModel.findByIdAndUpdate({ _id: result11.requestedId }, { $set: { balance: result55.balance + cut } }, (err77, result77) => {
                                                            if (err77) {
                                                                res.send({ response_code: 500, response_message: "Something went wrong" })
                                                            }
                                                            else {
                                                                commonFunction.pushNotification(result55.fcmToken, "Your sent amount is rejected", "Amount", result55.message, (err23, result1111111111) => {
                                                                    console.log("result of notification is<><><><><><><><><><<><><><<><><> =====>>>", err23, result1111111111)
                                                                    if (err23) {

                                                                        let notify = new notification({
                                                                            notificationType: "SEND",
                                                                            requestedId: result44._id,      // result55._id,
                                                                            userId: result55._id,
                                                                            status: "REJECTED",
                                                                            amount: result33.amount,
                                                                            convertedAmount: result33.convertedAmount,
                                                                            notifications: `${result44.userName} rejected  ${result33.convertedAmount} ${result11.senderCurrency} `
                                                                        })
                                                                        notify.save((notiErr, notiResult) => {
                                                                            console.log("notification error=======", notiErr)
                                                                            if (notiErr) {
                                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else if (!notiResult) {
                                                                                console.log("Result not found")
                                                                            }
                                                                            else {
                                                                                console.log("notification saved", notiResult)
                                                                                console.log("Push notification detail>>");
                                                                                //  res.send({ response_code: 200, response_message:` ${results.userName} wallet has been added successfully`, result: notiResult })
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        let notify = new notification({
                                                                            notificationType: "SEND",
                                                                            requestedId: result44._id,   //result55._id
                                                                            userId: result55._id,
                                                                            status: "REJECTED",
                                                                            amount: result33.amount,
                                                                            convertedAmount: result33.convertedAmount,
                                                                            notifications: `${result44.userName} rejected  ${result33.convertedAmount} ${result11.senderCurrency}`

                                                                        })
                                                                        notify.save((notiErr, notiResult) => {
                                                                            if (notiErr) {
                                                                                response(res, 500, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else if (!notiResult) {
                                                                                console.log("Result not found")
                                                                            }
                                                                            else {

                                                                                console.log("notification saved", notiResult)
                                                                                console.log("Push notification detail>>");
                                                                                // res.send({ response_code: 200, response_message:` ${result.userName} sent ${req.body.balance} to ${result3.userName}` })
                                                                            }
                                                                        })

                                                                    }
                                                                })



                                                                res.send({ response_code: 200, response_message: " Amount rejected" })
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
        }
    })
}

module.exports = {
    listCard,
    smartContractTransaction,
    getContractDetails,
    withdraw,
    receiverList,
    walletBalance,
    requestMoney,
    conTransFee,
    tokenFcm,
    withdrawTrial,
    checkStripe,
    listBankAccount,
    userBankAccounts,
    sendRequest,
    acceptOrRejectSend
}
