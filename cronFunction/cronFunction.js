const couponModel = require('../models/retailerCouponModel');
const notificationModel = require('../models/notificationModel');
const userModel = require('../models/userModel');
const configModel = require('../models/configurationModel');
const retailerCouponModel = require('../models/retailerCouponModel')
const userCouponModel = require('../models/userCouponModel');
const templateModel = require('../models/emailTemplateModel');
const activityModel = require('../models/activityModel')
const paymentModel = require('../models/transactionModel');
const request = require('request');
const activeModel = require('../models/activeInactiveModel')
const rechargeModel = require('../models/rechargeModel');
const commonFunction = require('../helper/commonFunction');
const creditModel = require("../models/creditModel");
const config=require('../config/config')
module.exports = {
    couponExpiry: (req, res) => {
        let query = {
            "couponStatus": { $ne: "EXPIRED" },
            "ExpiryDate": {
                "$lte": new Date().getTime()
            }
        };
        couponModel.find(query, (error, result) => {
            console.log(new Date(), result)
            if (error) {
                console.log({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                console.log("No coupons found.")
            }
            else {
                result.forEach((element, index, array) => {
                    console.log("i am error", element._id)
                    couponModel.update({ _id: element._id }, { $set: { couponStatus: "EXPIRED" } }, { new: true }, (expError, expired) => {
                        if (expError) {
                            console.log("Error in updating coupon.", expError)
                        }
                        else {
                            console.log("Coupon expired.", expired)
                        }
                    })
                })
            }
        })
    },

    couponExpiryNotification: (req, res) => {
        var query = {
            "ExpiryDate": {
                "$lte": new Date(new Date().getTime() - 7 * 1000 * 86400)
            }
        }
        userCouponModel.find(query, (error, result) => {
            console.log("RESULTS", result)
            if (error) {
                console.log("Error in finding notification coupons.")
            }
            else if (result.length == 0) {
                console.log("No coupon data for this expiry notification")
            }
            else {
                result.forEach((ele, arr, index) => {
                    var obj = {
                        notificationType: "USER",
                        userId: ele.userId,
                        title: `Coupon expiry notification.`,
                        body: `Hurry up your coupon will expire. !.`,
                    }
                    var newObj = new notificationModel(obj)
                    newObj.save((saveError, saved) => {
                        if (saveError) {
                            console.log("Error sending notification.")
                        }
                        else {
                            result.forEach((eleme, index, array) => {
                                userCouponModel.update({ _id: eleme._id }, { $set: { notificationStatus: true } }, { new: true }, (updationError, updation) => {
                                    if (updationError) {
                                        console.log("Error updating status.")
                                    }
                                    else {
                                        console.log("Expiry notifications sent successfully.")
                                    }
                                })
                            })
                        }
                    })
                })

            }
        })
    },


    couponExpiryNotificationRetailer: (req, res) => {
        var query = {
            "ExpiryDate": {
                "$lte": new Date(new Date().getTime() - 7 * 1000 * 86400)
            }
        }
        retailerCouponModel.find(query, (error, result) => {
            console.log("RESULTS", result)
            if (error) {
                console.log("Error in finding notification coupons.")
            }
            else if (result.length == 0) {
                console.log("No coupon data for this expiry notification")
            }
            else {
                result.forEach((ele, arr, index) => {
                    var obj = {
                        notificationType: "RETAILER",
                        userId: ele.userId,
                        title: `Coupon expiry notification.`,
                        body: `Hurry up your coupon will expire. !.`,
                    }
                    var newObj = new notificationModel(obj)
                    newObj.save((saveError, saved) => {
                        if (saveError) {
                            console.log("Error sending notification.")
                        }
                        else {
                            result.forEach((eleme, index, array) => {
                                couponModel.update({ _id: eleme._id }, { $set: { notificationStatus: true } }, { new: true }, (updationError, updation) => {
                                    if (updationError) {
                                        console.log("Error updating status.")
                                    }
                                    else {
                                        console.log("Expiry notifications sent successfully.")
                                    }
                                })
                            })
                        }
                    })
                })

            }
        })
    },


    creditNotification: (req, res) => {
        configModel.findOne({ configType: "RETAILER" }, (error, result) => {
            if (error) {
                console.log("Error finding configuration.")
            }
            else if (!result) {
                console.log("No config Data found.")
            }
            else {
                var query = {
                    status: "ACTIVE",
                    notificationStatus: false,
                    userType: "RETAILER",
                    credit: { $lte: result.lowCreditAlert }
                }
                userModel.find(query, (userError, user) => {
                    if (userError) {
                        console.log("Error Found.")
                    }
                    else if (user.length == 0) {
                        console.log("No retailers found with low credits")
                    }
                    else {
                        user.forEach((elem, index, array) => {
                            var obj = {
                                retailerId: elem._id,
                                notificationType: "RETAILER",
                                title: `Low credit notification.`,
                                body: `Current Credit Balance is too low. Please recharge .`,
                                notificationStatus: true
                            }
                            var newObj = new notificationModel(obj)
                            newObj.save((saveError, data) => {
                                if (saveError) {
                                    console.log("Error sending notification.")
                                }
                                else {
                                    userModel.update({ _id: elem._id }, { notificationStatus: true }, { new: true }, (updateError, updated) => {
                                        if (updateError) {
                                            console.log("Error in status update.")
                                        }
                                        else {
                                            console.log("Notification Saved successfully.")
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    },


    inactivatingRetailerNotification: (req, res) => {
        var query = {
            status: "ACTIVE",
            userType: "RETAILER",
            credit: 0
        }
        userModel.find(query, (error, result) => {
            if (error) {
                console.log(error)
            }
            else if (result.length == 0) {
                console.log("No user found.")
            }
            else {
                result.forEach((ele, index, array) => {
                    var obj = {
                        retailerId: ele._id,
                        notificationType: "RETAILER",
                        title: `Inactivation notification.`,
                        body: `Your coupons will not display on this platform because your credit balance has fallen below zero.`,
                        notificationStatus: true
                    }
                    var newObj = new notificationModel(obj)
                    newObj.save((saveError, saveData) => {
                        if (saveError) {
                            console.log("Error saving data.")
                        }
                        else {
                            console.log("Inactivation notification saved successfully.")
                        }
                    })
                })
            }
        })
    },


    inactivateRetailers: (req, res) => {
        activeModel.findOne({ status: "ACTIVE" }, (error, success) => {
            if (error) {
                console.log("Error in finding activation model.")
            }
            else if (!success) {
                console.log("No inactivation data found.")
            }
            else {
                var query = {
                    userType: "RETAILER",
                    status: "ACTIVE",
                    credit: 0
                }
                userModel.find(query, (queryError, queried) => {
                    if (queryError) {
                        console.log("Error finding Retailers for Inactivation")
                    }
                    else if (queried.length == 0) {
                        "No Retailer found for inactivation."
                    }
                    else {
                        queried.forEach((ele, arr, index) => {
                            var query1 = {
                                _id: ele._id,
                                staus: "ACTIVE",
                                "lastCredit": {
                                    "$gte": new Date(new Date().getTime() + success.inactivateRetailers * 1000 * 86400)
                                }
                            }
                            userModel.update(query1, { $set: { status: "INACTIVE" } }, { new: true }, (resultError, result) => {
                                if (resultError) {
                                    console.log("Error updating retailer status.")
                                }
                                else {
                                    commonFunction.sendRejectionMail(ele.email, "ACCOUNT DEACTIVATED", "Your Account has been deactivated due to inactivity in maintaining your account .Please contact support for help.", (mailError, mailed) => {
                                        if (mailError) {
                                            console.log(mailError)
                                        }
                                        else {
                                            var obj = {
                                                retailerId: ele._id,
                                                notificationType: "RETAILER",
                                                title: `Inactivation notification.`,
                                                body: `Your Account has been deactivated due to inactivity in maintaining your account .Please contact support for help.`,
                                                notificationStatus: true
                                            }
                                            var newObj = new notificationModel(obj)
                                            newObj.save((saveError, saveData) => {
                                                if (saveError) {
                                                    console.log("Error saving data.")
                                                }
                                                else {
                                                    console.log("Retailer status updated successfully.")
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    },
    inactivateUsers: (req, res) => {
        activityModel.find().sort({ createdAt: -1 }).limit(1).exec((queryError, queried) => {
            if (queryError) {
                console.log("Error finding Retailers for Inactivation")
            }
            else if (queried.length == 0) {
                "No Retailer found for inactivation."
            }
            else {
                queried.forEach((ele, arr, index) => {
                    console.log("ELE.CREATEDAT", ele.createdAt)
                    userModel.update({ _id: ele.userId }, { $set: { lastActive: ele.createdAt } }, { multi: true }, (resultError, result) => {
                        if (resultError) {
                            console.log("Error updating retailer status.")
                        }
                        else {
                            console.log("User activity status updated successfully.")
                        }
                    })
                })
            }
        })
    },




    inactiveUser: async (req, res) => {
        var inactiveData = await activeModel.findOne({ status: "ACTIVE" })
        var query = {
            status: "ACTIVE",
            "lastActive": {
                "$gte": new Date(new Date().getTime() + 1000 * 86400 * inactiveData.inactiveUser)
            }
        }
        userModel.find(query, (error, result) => {
            if (error) {
                console.log("Error")
            }
            else if (result.length == 0) {
                console.log("No data for endUser Inactivation.")
            }
            else {
                result.forEach((ele, arr, index) => {
                    userModel.update({ _id: ele._id }, { $set: { status: "INACTIVE" } }, { new: true }, (updationError, updation) => {
                        if (updationError) {
                            console.log("updation error for this.")
                        }
                        else {
                            console.log("End User status updated successfully.")
                        }
                    })
                })
            }
        })

    },



    deleteExpiredCouponWeekly: (req, res) => {
        var query = {
            couponStatus: "EXPIRED",
            "ExpiryDate": {
                "$gte": new Date(new Date().getTime() + 1000 * 86400 * 7)
            }
        }
        userCouponModel.find(query, (error, result) => {
            if (error) {
                console.log("Error finding coupons whisch are expired.")
            }
            else if (result.length == 0) {
                console.log("No expired coupon found.")
            }
            else {
                result.forEach((ele, arr, index) => {
                    userCouponModel.deleteMany({ _id: ele._id }, (resultError, resultStatus) => {
                        if (resultError) {
                            console.log("Delete error.")
                        }
                        else {
                            console.log("Data deleted successfully.")
                        }
                    })
                })
            }
        })
    },


    weeklyEmailTemplate: async (req, res) => {
        var userData = await userModel.find({ weeklyEmail: true })
        // console.log(userData[0].location.coordinates[0])
        var configData = await configModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
        // await console.log("852=====>", configData)
        userData.forEach((ele, arr, index) => {
            // console.log("I am here >>>>.125", ele)
            var aggregate = retailerCouponModel.aggregate([{
                "$geoNear": {
                    "near": {
                        type: "Point",
                        coordinates: [parseFloat(ele.location.coordinates[0]), parseFloat(ele.location.coordinates[1])]
                    },
                    "maxDistance": configData.radiusEndUser,
                    "distanceField": "dist.calculated",
                    "includeLocs": "dist.location",
                    "spherical": true
                }
            },
            ])
            var options = {
                page: 1,
                limit: 5
            }
            // console.log("AGGREGATE>>", aggregate)
            retailerCouponModel.aggregatePaginate(aggregate, options, async (err, result, pageCount, count) => {
                // console.log("I AM HERE #@!$%%>>>", err, result)
                if (err) {
                    console.log({ responseCode: 500, responseMessage: "Internal server error", err });
                }
                else if (result.length == 0) {
                    console.log({ responseCode: 404, responseMessage: "Data not found1" });
                }
                else {
                    // let operation = false
                    // result.forEach(async (data, array, indexx) => {
                    //     function getTemplateData() {
                    //         return new Promise((resolve, reject) => {
                    //             if (result.length - 1 == indexx) {
                    //                 operation = true
                    //             }
                    //             resolve(data)
                    //         })
                    //     }
                    //     var newTemp = await getTemplateData()
                    //     dataArray.push(newTemp)
                    //     // console.log("DATA<<<<1899",  newTemp)
                    // })
                    var arr2 = []; let operation = false
                    function isString() {
                        return new Promise((resolve, reject) => {
                            result.forEach(function (element, indexs, array) {
                                if (indexs == result.length - 1) {   // only pushes the strings, not numbers or booleans
                                    operation = true
                                }
                                resolve(element)
                            })
                        })
                    }
                    var newData = await isString();
                    console.log(newData)
                    console.log(arr2)
                    var emailData = await templateModel.findOne({ status: "ACTIVE" })
                    // console.log("EMAIL DATA", emailData)
                    var time = new Date(emailData.time).getTime()
                    var date=newData.ExpiryDate
                    var dateData=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
                    if (time == new Date().getTime()) {
                        commonFunction.weeklyEmailTemplate(ele.email, "Weekly email template", newData.categoryName, newData.subCategoryName, newData.title, newData.martName, newData.shopName, newData.AppliedOnName, dateData, newData.link, emailData.header, emailData.footer,ele._id,global.gConfig.couponLink, (mailError, mailed) => {
                            if (mailError) {
                                console.log("Error sending mail.", mailError)
                            }
                            else {
                                console.log({ responseCode: 200, responseMessage: "newTemp found successfully", result, pageCount, count });
                            }
                        })
                    }
                }
            })
        })
    },

    paymentStatus: (req, res) => {
        paymentModel.find({ paymentStatus: { $in: ["PENDING", "FLAGGED"] } }, (error, result) => {
            if (error) {
                console.log("Error in staus", error)
            }
            else if (result.length == 0) {
                console.log("No status found")
            }
            else {
                console.log(result)
                var set = {}
                result.forEach((ele, index, array) => {
                    console.log(ele, "ELEM")
                    set["orderId"] = ele.transactionId
                    set["appId"] = "14596f3c2ebbb0630235ddb0069541"
                    set["secretKey"] = "7a925cf13ca7acac24fc1e6adc96f5c0fe4659f5"
                    var options = {
                        method: 'POST',
                        headers: [],
                        form: set,
                        url: 'https://test.cashfree.com/api/v1/order/info/status'
                    };
                    console.log(set, "SET")
                    request(options, async function (error1, response, body) {
                        if (error1) {
                            console.log({ status: false, error1 })
                        }
                        else {
                            console.log("i am all", body)
                            let data = JSON.stringify(response)
                            let newData = await JSON.parse(data)
                            console.log("I am here 12 .>>>>>", newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log(someData)
                            if (someData.status == "ERROR") {
                                console.log({ responseCode: 500, responseMessage: someData.reason })
                            }
                            else {
                                paymentModel.update({ _id: ele._id }, { $set: { paymentStatus: someData.txStatus ? someData.txStatus : "PENDING" } }, { new: true }, async(errorStat, success) => {
                                    if (errorStat) {
                                        console.log("Error in status uupdation. ")
                                    }
                                    else {
                                        var payStatus=await userModel.update({_id:ele.retailerId},{$set:{paymentStatus:true}},{new:true})
                                        console.log("Payment status updated successfully.",payStatus)
                                    }
                                })
                            }
                        }
                    });
                })
            }
        })
    },


    rechargeStatus: (req, res) => {
        rechargeModel.find({ rechargeStatus: { $in: ["PENDING", "FLAGGED"] } }, (error, result) => {
            if (error) {
                console.log("Error in staus")
            }
            else if (result.length == 0) {
                console.log("No status found")
            }
            else {
                console.log(result)
                var set = {}
                result.forEach((ele, index, array) => {
                    console.log(ele, "ELEM")
                    set["orderId"] = ele.transactionId
                    set["appId"] = "14596f3c2ebbb0630235ddb0069541"
                    set["secretKey"] = "7a925cf13ca7acac24fc1e6adc96f5c0fe4659f5"
                    var options = {
                        method: 'POST',
                        headers: [],
                        form: set,
                        url: 'https://test.cashfree.com/api/v1/order/info/status'
                    };
                    console.log(set, "SET")
                    request(options, async function (error1, response, body) {
                        if (error1) {
                            console.log({ status: false, error1 })
                        }
                        else {
                            console.log("i am all", body)
                            let data = JSON.stringify(response)
                            let newData = await JSON.parse(data)
                            console.log("I am here 12 .>>>>>", newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log(someData)
                            if (someData.status == "ERROR") {
                                console.log({ responseCode: 500, responseMessage: someData.reason })
                            }
                            else {
                                var configData = await configModel.findOne({ configType: "RETAILER" })
                                var datas = {
                                    rechargeStatus: someData.txStatus ? someData.txStatus : "PENDING",
                                    paymentMode: someData.paymentMode,
                                    credit: ele.rechargeAmount / configData.unitCreditCost
                                }
                                rechargeModel.update({ _id: ele._id }, { $set: datas }, { new: true }, (errorStat, success) => {
                                    if (error) {
                                        console.log("Error in status uupdation. ")
                                    }
                                    else {
                                        if (someData.txStatus == "SUCCESS") {
                                            configModel.findOne({ configType: "RETAILER" }, (configError, configs) => {
                                                if (configError) {
                                                    console.log("Configuration error")
                                                }
                                                else {
                                                    // console.log("Config", config)
                                                    var credits = ele.rechargeAmount / configs.unitCreditCost
                                                    console.log("credits", credits)
                                                    userModel.find({ _id: ele.retailerId }, (retailerError, retailerUpdate) => {
                                                        if (retailerError) {
                                                            console.log("Error in credit updation.")
                                                        }
                                                        else {
                                                            retailerUpdate.forEach((retailer, ind, arr) => {
                                                                console.log(credits + retailer.credit)
                                                                userModel.update({ _id: ele.retailerId }, { $set: { credit: credits + retailer.credit } }, { new: true }, (retaileErrors, retail) => {
                                                                    if (retaileErrors) {
                                                                        console.log("Error in status .")
                                                                    }
                                                                    else {
                                                                        var creditData = {
                                                                            retailerId: ele.retailerId,
                                                                            credit: credits,
                                                                            creditType: "PURCHASED CREDITS."
                                                                        }
                                                                        var newCredit = new creditModel(creditData)
                                                                        newCredit.save((creditError, credit) => {
                                                                            if (creditError) {
                                                                                console.log("Credit Error")
                                                                            }
                                                                            else {
                                                                                console.log("Retailer credit added .")
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        else {
                                            console.log("No success status was found.")
                                        }
                                    }
                                })
                            }
                        }
                    });
                })
            }
        })
    },


    emailTransaction: (req, res) => {
        var query = { isMailSent: false }
        paymentModel.find(query, (error, result) => {
            if (error) {
                console.log("Internal server error")
            }
            else if (result.length == 0) {
                console.log("No data found for mail")
            }
            else {
                var set = {}
                result.forEach((ele, index, arr) => {
                    set["orderId"] = ele.transactionId
                    set["appId"] = "14596f3c2ebbb0630235ddb0069541"
                    set["secretKey"] = "7a925cf13ca7acac24fc1e6adc96f5c0fe4659f5"
                    var options = {
                        method: 'POST',
                        headers: [],
                        form: set,
                        url: 'https://test.cashfree.com/api/v1/order/email'
                    };
                    request(options, async function (error1, response, body) {
                        if (error1) {
                            console.log({ status: false, error })
                        }
                        else {
                            console.log("i am all", body)
                            let data = JSON.stringify(response)
                            let newData = await JSON.parse(data)
                            console.log("I am here 12 .>>>>>", newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log(someData)
                            if (someData.status == "ERROR") {
                                console.log({ responseCode: 500, responseMessage: someData.reason })
                            }
                            else {
                                paymentModel.update({ _id: ele._id }, { isMailSent: true }, { new: true }, (emailError, emailed) => {
                                    if (emailError) {
                                        console.log("Email error")
                                    }
                                    else {
                                        console.log("Email triggered successfully.")
                                    }
                                })
                            }
                        }
                    })
                })
            }
        })
    },


}