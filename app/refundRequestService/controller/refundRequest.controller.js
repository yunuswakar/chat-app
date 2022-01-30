"use strict";
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.stripe_Key;

const REFUNDREQUEST = require("../model/refundRequestModel");
const ORDER = require("../../orderServices/model/orderModel");
const USER = require("../../userServices/model/userModel")
const ORDERNOTIFICATION = require("../../notificationService/model/orderNotificationModel");
const notification = require("../../notificationService/model/notificationModel")
const mongoose = require("mongoose"); // set rules for mongoose id
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
    require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files
const stripe = require("stripe")(secretKey);
const commonFunction = require("../../../helpers/commonFunctions");
const orderModel = require("../../orderServices/model/orderModel");
const constant = require("../../../helpers/constant");
const _refundRequest = {};

_refundRequest.addRefundRequest = async (req, res) => {
    try {
        let data = req.body
        data.userId = req.userId
        let existRequest = await REFUNDREQUEST.findOne({ userId: data.userId, orderID: data.orderID, productID: data.productID })
        if (existRequest) {
            res.status(constant.badRequest).send({
                success: false,
                message: responseMessage.ALREADYEXIST('Refund-Request'),
            })
            return
        }
        // console.log("Data RefundRequest: ",data);
        let result = await REFUNDREQUEST.create(data)
        // console.log("Result : ",result)
        if (result.requestStatus == constant.requestPending) {
            let orderRefunded = await ORDER.findOneAndUpdate({ booked_by: data.userId, orderId: data.orderID, product: data.productID }, { $set: { refundRequest: true } }, { new: true })
            // console.log("OrderRefunded: ",orderRefunded);
        }
        res.status(constant.success).send({
            success: true,
            message: responseMessage.ADD_SUCCESS('Refund-Request'),
            data: result
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequest = async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize
        let pageNo = parseInt(req.query.pageNo);
        let refundRequestData = await REFUNDREQUEST.aggregate([
            {
                $match: {
                    requestStatus: "Accepted"
                }
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "orderID",
                    foreignField: "orderId",
                    as: "orderDetails"
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { productID: "$productID" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$productID"] } } },
                        {
                            "$lookup": {
                                from: "categories",
                                let: { category: "$category" },
                                pipeline: [
                                    { "$match": { "$expr": { "$eq": ["$_id", "$$category"] } } }
                                ],
                                as: "categoryDetails"
                            }
                        },
                        {
                            $unwind: {
                                path: '$categoryDetails'
                            }
                        }
                    ],
                    as: 'productDetails'
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },
        ])
        let countRequest = await REFUNDREQUEST.countDocuments({ requestStatus: "Accepted" });
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundRequestData,
            countRequest: countRequest
        })
        if (refundRequestData.length == Constant.length) {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: [],
                count: 0
            });
        } else {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: refundRequestData ? refundRequestData : [],
            })
        }
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequestForSeller = async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize
        let pageNo = parseInt(req.query.pageNo);
        let refundRequest = await REFUNDREQUEST.aggregate([
            { $match: { sellerId: mongoose.Types.ObjectId(req.userId) } },
            { $match: { requestStatus: parseInt(req.query.status) } },
            {
                $lookup: {
                    from: "orders",
                    localField: "orderID",
                    foreignField: "orderId",
                    as: "orderDetails"
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { productID: "$productID" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$productID"] } } },
                        {
                            "$lookup": {
                                from: "categories",
                                let: { category: "$category" },
                                pipeline: [
                                    { "$match": { "$expr": { "$eq": ["$_id", "$$category"] } } }
                                ],
                                as: "categoryDetails"
                            }
                        },
                        {
                            $unwind: {
                                path: '$categoryDetails'
                            }
                        }
                    ],
                    as: 'productDetails'
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },
        ])


        let countRequest = await REFUNDREQUEST.countDocuments({
            sellerId: req.userId,
            requestStatus: req.query.status
        })

        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundRequest,
            count: countRequest
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequestPayByAdmin = async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize
        let pageNo = parseInt(req.query.pageNo);
        let refundRequest = await REFUNDREQUEST.aggregate([
            {
                $match: {
                    requestStatus : constant.RefundRequestCompleted
                }
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "orderID",
                    foreignField: "orderId",
                    as: "orderDetails"
                }
            },
            {
                $unwind: {
                    path: '$orderDetails'
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { productID: "$productID" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$productID"] } } },
                        {
                            "$lookup": {
                                from: "categories",
                                let: { category: "$category" },
                                pipeline: [
                                    { "$match": { "$expr": { "$eq": ["$_id", "$$category"] } } }
                                ],
                                as: "categoryDetails"
                            }
                        },
                        {
                            $unwind: {
                                path: '$categoryDetails'
                            }
                        }
                    ],
                    as: 'productDetails'
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },
        ])


        let countRequest = await REFUNDREQUEST.countDocuments({
            sellerId: req.userId,
            requestStatus: req.query.status
        })

        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundRequest,
            count: countRequest
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.updateRefundRequestBySeller = async (req, res) => {
    try {
        let obj = {}
        let newobj = {}
        let data = req.body
        let updateRequest = await REFUNDREQUEST.findByIdAndUpdate({ _id: data.requestId }, { $set: { requestStatus: data.status, rejectReasonBySeller: data.rejectedReason } }, { new: true })
        let user = await USER.findById({_id: updateRequest.userId})
        if (data.status == constant.requestAccepted) {
            let changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, { $set: { status: constant.Returned } }, { new: true })
        }
        if(data.status == constant.requestAccepted){
            let pushNot=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Refund Request has been accepted`)
            let notification=await commonFunction.followNotification(user.fcmToken, "Famebase", `Dear ${user.userName}! Your Refund Request has been accepted`)
            obj={
              sendBy:updateRequest.sellerId,
              sendTo:user._id,
              title: "Famebase",
              body:`Dear ${user.userName}! Your Refund Request has been accepted`,
              message:`Dear ${user.userName}! Your Refund Request has been accepted`,
              notificationType: "Refund Request",
              your_custom_key: "Refund"
            }
            newobj={
                sendBy:updateRequest.sellerId,
                sendTo:user._id,
                title: "Famebase",
                body:`Dear ${user.userName}! Your Refund Request has been accepted`,
                message:`Dear ${user.userName}! Your Refund Request has been accepted`,
                notificationType: "Refund Request",
            }    
        }else{
            let pushNot=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Refund Request has been rejected`)
            let notification=await commonFunction.followNotification(user.fcmToken, "Famebase", `Dear ${user.userName}! Your Refund Request has been rejected`)
            obj={
              sendBy:updateRequest.sellerId,
              sendTo:user._id,
              title: "Famebase",
              body:`Dear ${user.userName}! Your Refund Request has been rejected`,
              message:`Dear ${user.userName}! Your Refund Request has been rejected`,
              notificationType: "Refund Request",
              your_custom_key: "Refund"
            }
            newobj={
                sendBy:updateRequest.sellerId,
                sendTo:user._id,
                title: "Famebase",
                body:`Dear ${user.userName}! Your Refund Request has been accepted`,
                message:`Dear ${user.userName}! Your Refund Request has been accepted`,
                notificationType: "Refund Request",
            }    
        }
        let results = await new ORDERNOTIFICATION(obj).save();
        let notif = await new NOTIFICATION(newobj).save();
        res.status(constant.success).send({
            success: true,
            message: responseMessage.UPDATE_SUCCESS('Refund-Request Status'),
            data: updateRequest
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getRefundRequestById = async (req, res) => {
    try {
        let data = req.body
        let getRequest = await REFUNDREQUEST.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(data.id)
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderID',
                    foreignField: 'orderId',
                    as: 'orderDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'sellerDetails'
                }
            },
            {
                $unwind: {
                    path: "$sellerDetails"
                }
            }
        ])
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: getRequest
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.updateOrderStatusBySeller = async (req, res) => {
    try {
        let changeOrderStatus = {}
        let data = req.body
        // let changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID },
        //      { $set: { status: data.status } }, { new: true })
        let changeOrderStatusForRefund = await REFUNDREQUEST.findOneAndUpdate({ orderID: data.orderID, productID: data.productID },
             { $set: { requestStatus: data.status } }, { new: true })
        if (changeOrderStatusForRefund.requestStatus == constant.requestAccepted) {
            let user=await USER.findOne({_id:changeOrderStatusForRefund.userId})
            changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, 
                { $set: { status: constant.Returned } }, { new: true })
                let refundNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Refund Request is accepted for Order: ${data.orderID}!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:user._id,
                 title: "Famebase",
                 body:`Dear ${user.userName}! Your Refund Request is accepted for Order: ${data.orderID}!`,
                 message:`Dear ${user.userName}! Your Refund Request is accepted for Order: ${data.orderID}!`,
                 notificationType: "Refund",
                 orderId: data.orderID
             }
             let results = await new ORDERNOTIFICATION(obj).save();
        }else if(changeOrderStatusForRefund.requestStatus == constant.requestRejected){
            let user=await USER.findOne({_id:changeOrderStatusForRefund.userId})
            // let changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, 
            //     { $set: { status: constant.Returned } }, { new: true })
                let refundNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Refund Request is rejected for Order!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:user._id,
                 title: "Famebase",
                 body:`Dear ${user.userName}! Your Refund Request is rejected for Order!`,
                 message:`Dear ${user.userName}! Your Refund Request is rejected for Order!`,
                 notificationType: "Refund",
                 orderId: data.orderID
             }
             let results = await new ORDERNOTIFICATION(obj).save();
        }else if(changeOrderStatusForRefund.requestStatus == constant.Picked){
            let user=await USER.findOne({_id:changeOrderStatusForRefund.userId})
             changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, 
                { $set: { status: constant.Picked } }, { new: true })
                let refundNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Product is picked by the agent of seller!!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:user._id,
                 title: "Famebase",
                 body:`Dear ${user.userName}! Your Product is picked by the agent of seller!`,
                 message:`Dear ${user.userName}! Your Product is picked by the agent of seller!!`,
                 notificationType: "Refund",
                 orderId: data.orderID
             }
             let results = await new ORDERNOTIFICATION(obj).save();
        }else if(changeOrderStatusForRefund.requestStatus == constant.ReceivedBySeller){
            let user=await USER.findOne({_id:changeOrderStatusForRefund.userId})
             changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, 
                { $set: { status: constant.ReceivedBySeller } }, { new: true })
                let refundNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Product is received to the seller!!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:user._id,
                 title: "Famebase",
                 body:`Dear ${user.userName}! Your Product is received to the seller!`,
                 message:`Dear ${user.userName}! Your Product is received to the seller!`,
                 notificationType: "Refund",
                 orderId: data.orderID
             }
             let results = await new ORDERNOTIFICATION(obj).save();
        }else if(changeOrderStatusForRefund.requestStatus == constant.RefundRequestCompleted){
            let user=await USER.findOne({_id:changeOrderStatusForRefund.userId})
             changeOrderStatus = await ORDER.findOneAndUpdate({ orderId: data.orderID, product: data.productID }, 
                { $set: { status: constant.RefundRequestCompleted } }, { new: true })
                let refundNotification=await commonFunction.pushNotification(user.fcmToken, "Fambase", `Dear ${user.userName}! Your Refund Request has been completed!`)
               let obj={
                 sendBy:req.userId,
                 sendTo:user._id,
                 title: "Famebase",
                 body:`Dear ${user.userName}! Your Refund Request has been completed!`,
                 message:`Dear ${user.userName}! Your Refund Request has been completed!`,
                 notificationType: "Refund",
                 orderId: data.orderID
             }
             let results = await new ORDERNOTIFICATION(obj).save();
        }

        res.status(constant.success).send({
            success: true,
            message: responseMessage.UPDATE_SUCCESS('Tracking Order Status'),
            data: changeOrderStatus, changeOrderStatusForRefund
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequestForAdmin = async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize
        let pageNo = parseInt(req.query.pageNo);
        let refundOrder = await ORDER.aggregate([
            {
                $match: {
                    status: constant.ReceivedBySeller
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },
        ])
        let charges = await stripe.charges.list();
        refundOrder.map((e,i) => {
            charges.data.map((ele,ind) => {
              if(e.chargeId === ele.id){
                e.chargesDetail = ele
              }
            })
          })
        let countRequest = await ORDER.countDocuments({ status: constant.ReceivedBySeller });
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundOrder,
            countRequest: countRequest
        })
        if (refundOrder.length == Constant.length) {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: [],
                count: 0
            });
        } else {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: refundOrder ? refundOrder : [],
            })
        }
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequestForAdminByOrderId = async (req, res) => {
    try {
        let refundOrder = {}
        refundOrder = await ORDER.findOne({orderId: req.params.orderId, product: req.params.product}).populate("product sellerId")
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundOrder
        })
        if (refundOrder.length == Constant.length) {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: [],
                count: 0
            });
        } else {
            res.status(constant.success).send({
                success: true,
                message: responseMessage.DATA_FOUND,
                data: refundOrder ? refundOrder : [],
            })
        }
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getAllRefundRequestForAdminOrderId = async (req, res) => {
    try{
        let refundOrder = await ORDER.aggregate([
            {
                $match: {
                    $or : [{orderId: req.params.orderId},{product: req.params.product}]
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            }
        ])
        let charges = await stripe.charges.list();
        refundOrder.map((e,i) => {
            charges.data.map((ele,ind) => {
              if(e.chargeId === ele.id){
                e.chargesDetail = ele
              }
            })
          })
          res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: refundOrder
        })
    }catch(error){
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.getOrdersForRefund = async (req, res) => {
    try {
        let pageSize = parseInt(req.query.pageSize) || constant.pageSize
        let pageNo = parseInt(req.query.pageNo);
        let ordersReturn = await REFUNDREQUEST.aggregate([
            {
                $match: {
                    requestStatus: "Accepted"
                }
            },
            {
                $lookup: {
                    from: "orders",
                    let: { orderID: "$orderID", status: constant.RefundRequestCompleted },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$orderId", "$$orderID"]
                                        },
                                        {
                                            $eq: ["$status", "$$status"]
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "orderDetails"
                }
            },
            {
                $unwind: {
                    path: '$orderDetails'
                }
            },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },
        ])
        res.status(constant.success).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: ordersReturn
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}

_refundRequest.refundStatusToUser = async (req, res) => {
    try {
        let data = req.body
        data.userId = req.userId
        let dataExist = await REFUNDREQUEST.aggregate([
            {
                $match: { userId: mongoose.Types.ObjectId(req.userId) }
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "orderID",
                    foreignField: "orderId",
                    as: "orderDetails"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: {
                    path: '$orderDetails'
                }
            },
            {
                $unwind: {
                    path: '$productDetails'
                }
            },
            { $sort: { "updatedAt": -1 } },
        ])
        res.status(constant.success).send({
            success: true,
            message: responseMessage.RECORD_FOUND('Refund-Request'),
            data: dataExist
        })
    } catch (error) {
        res.status(constant.badRequest).send({
            success: false,
            message: error.message,
        });
    }
}


module.exports = _refundRequest;