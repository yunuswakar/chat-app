const userModel = require('../models/userModel');
const martModel = require('../models/martModel');
const wishListModel = require('../models/myWishList')
const previewModel = require('../models/previewModel');
const couponModel = require('../models//userCouponModel');
const categoryModel = require('../models/categoryModel')
const subCategoryModel = require('../models/subCategoryModel')
const retailerCoupon = require('../models//retailerCouponModel.js');
const notificationModel = require('../models/notificationModel')
const activityModel = require('../models/activityModel')
const configurationModel = require('../models/configurationModel')
const creditModel = require('../models/creditModel')
const websiteModel = require('../models/websiteModel')
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const guestUserModel = require("../models/guestUserModel")
// const previewModel = require("../models/previewModel")
const retailerCouponModel = require('../models/retailerCouponModel');
const { result } = require('lodash');
const mongoose = require('mongoose')




module.exports = {




    getDataByCategory: async (req, res) => {

        var configData = await configurationModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
        console.log("1826=====>", configData.radiusEndUser)
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
        { $match: { categoryId: mongoose.Types.ObjectId(req.body.categoryId) } },
        { $match: { status: "ACTIVE" } },
        { $match: { ExpiryDate: { $gte: new Date() } } },

        {
            $project: {
                _id: 1,
                oneTimeCoupon: 1,
                Inside_Mart_Notifications: 1,
                outside_Mart_Notifications: 1,
                status: 1,
                couponStatus: 1,
                appovalStatus: 1,
                title: 1,
                mobileNumber: 1,
                couponCode: 1,
                discount: 1,
                image: 1,
                itemType: 1,
                itemName: 1,
                brandName: 1,
                shopName: 1,
                retailerId: 1,
                couponAppliedOn: 1,
                floorNumber: 1,
                categoryId: 1,
                categoryName: 1,
                categoryImage: 1,
                categoryPriority: 1,
                productServiceType: 1,
                subCategoryId: 1,
                subCategoryName: 1,
                subCategoryPriority: 1,
                martId: 1,
                martName: 1,
                ExpiryDate: 1,
                restrictions: 1,
                shopPhoneNumber: 1,
                createdAt: 1,
                updatedAt: 1,
                location: 1
            }
        },
        ])
        var options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 }
        }
        console.log("AGGREGATE>>", aggregate)
        retailerCouponModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                res.send({ responseCode: 200, responseMessage: "Data not found" });
            }
            else {

                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
        })
    },
    getSubCategoryByCategory: async (req, res) => {

        var configData = await configurationModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
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
        { $match: { categoryId: mongoose.Types.ObjectId(req.body.categoryId) } },
        { $match: { status: "ACTIVE" } },
        { $match: { ExpiryDate: { $gte: new Date() } } },

        {
            $project: {
                subCategoryId: 1,
                subCategoryName: 1,
                subCategoryPriority: 1,
                subCategoryImage: 1

            }
        },
        ])
        var options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 }
        }
        console.log("AGGREGATE>>", aggregate)
        retailerCouponModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            console.log("I AM HERE #@!$%%>>>", err, result)
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                res.send({ responseCode: 200, responseMessage: "Data not found" });
            }
            else {

                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
        })
    },
    getMartAndRetailerByCategory: async (req, res) => {

        var configData = await configurationModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
        console.log("1826=====>", configData.radiusEndUser)
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
        { $match: { categoryId: mongoose.Types.ObjectId(req.body.categoryId) } },
        { $match: { status: "ACTIVE" } },
        { $match: { ExpiryDate: { $gte: new Date() } } },

        {
            $project: {
                martId: 1,
                martName: 1,
                martImage: 1,
                retailerId: 1,
                shopName: 1,
                retailerImage: 1
            }
        },
        ])
        var options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 }
        }
        retailerCouponModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                res.send({ responseCode: 200, responseMessage: "Data not found" });
            }
            else {

                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
        })
    },

    getMartsByUser: async (req, res) => {
        var configData = await configurationModel.findOne({ configType: "USER", status: "ACTIVE" })
        await console.log("852=====>", configData.radiusEndUser)
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
                martName: 1,
                martId: 1,
                martImage: 1,
                categoryId: 1,
                categoryPriority: 1,
                categoryName: 1,
                categoryImage: 1,
                productServiceType: 1,
                location: 1,
                dist: 1,
                radius: 1,
                martUsers: 1,
                categoryUsers: 1
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
        retailerCouponModel.aggregatePaginate(aggregate, options, async (err, result, pageCount, count) => {
            console.log("mart data====>", err, result)
            if (err) {

                res.send({ responseCode: 500, responseMessage: "Internal server error" });
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found" });
            }
            else {
                if (result[0].details[0].dist.calculated <= result[0].details[0].radius) {

                    var data = await retailerCouponModel.find({ martId: result[0]._id, Inside_Mart_Notifications: "targetAll" }).select('title couponCode discount itemName image ExpiryDate -_id martId categoryId subCategoryId retailerId')
                    console.log("980===========>", data)
                    if (data.length != 0) {
                        var obj = {
                            userId: req.body.userId,
                            coupon: data
                        }
                        new notificationModel(obj).save((error, save) => {
                            console.log("982======>", error, save)
                        })
                    }
                    var webData = await retailerCouponModel.find({ martId: result[0]._id, Inside_Mart_Notifications: "wishlistBased" }).select('title couponCode discount itemName image ExpiryDate martId categoryId subCategoryId retailerId')
                    console.log("2199=======>", webData)
                    if (webData.length != 0) {
                        var coupons = []
                        var objss = {
                            userId: req.body.userId

                        }
                        webData.forEach((a, i) => {

                            var query = {
                                $and: [
                                    {
                                        $or: [
                                            { martId: a.martId },
                                            { categoryId: a.categoryId },
                                            { subCategoryId: a.subCategoryId },
                                            { retailerId: a.retailerId },
                                        ]
                                    },
                                    { userId: req.body.userId }
                                ]
                            };
                            wishListModel.findOne(query, (wishlistErr, wishlistResult) => {
                                console.log("2216=====>", wishlistErr, wishlistResult)
                                if (wishlistResult) {

                                    coupons.push(a)

                                    if (webData.length - 1 == i) {
                                        objss.coupon = coupons

                                        new notificationModel(objss).save((error, save) => {
                                            console.log("2226======>", error, save)
                                        })
                                    }
                                }
                            })
                        })
                    }
                    res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
                }
                else {
                    var datas = await retailerCouponModel.find({ martId: result[0]._id, outside_Mart_Notifications: "targetAll" }).select('title couponCode discount itemName image ExpiryDate -_id martId categoryId subCategoryId retailerId')
                    console.log("980===========>", datas)
                    if (datas.length != 0) {
                        var objs = {
                            userId: req.body.userId,
                            coupon: datas
                        }
                        new notificationModel(objs).save((error, save) => {
                            console.log("982======>", error, save)
                        })
                    }
                    var webDatas = await retailerCouponModel.find({ martId: result[0]._id, outside_Mart_Notifications: "wishlistBased" }).select('title couponCode discount itemName image ExpiryDate martId categoryId subCategoryId retailerId')
                    console.log("2199=======>", webDatas)
                    if (webDatas.length != 0) {
                        var couponss = []
                        var ob = {
                            userId: req.body.userId
                        }
                        webDatas.forEach((a, i) => {
                            var query = {
                                $and: [
                                    {
                                        $or: [
                                            { martId: a.martId },
                                            { categoryId: a.categoryId },
                                            { subCategoryId: a.subCategoryId },
                                            { retailerId: a.retailerId },
                                        ]
                                    },
                                    { userId: req.body.userId }
                                ]
                            };
                            wishListModel.findOne(query, (wishlistErr, wishlistResult) => {
                                console.log("2216=====>", wishlistErr, wishlistResult)
                                if (wishlistResult) {
                                    couponss.push(a)
                                    if (webDatas.length - 1 == i) {
                                        ob.coupon = couponss
                                        new notificationModel(ob).save((error, save) => {
                                            console.log("2226======>", error, save)
                                        })
                                    }
                                }
                            })
                        })
                    }
                    res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });

                }
            }
        })
    },

    getMartsByRetailer: async (req, res) => {
        var configData = await configurationModel.findOne({ configType: "RETAILER", status: "ACTIVE" })
        await console.log("852=====>", configData.radiusRetailer)
        var redius = configData.radiusRetailer;
        console.log("939=====>", redius)
        var aggregate = martModel.aggregate([{
            "$geoNear": {
                "near": {
                    type: "Point",
                    coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
                },
                "maxDistance": redius,
                "distanceField": "dist.calculated",
                "includeLocs": "dist.location",
                "spherical": true
            }
        },
        { $match: { status: "ACTIVE" } },
        {
            $project: {
                _id: 1,
                location: 1,
                martName: 1
            }
        },
        ])
        var options = {
            page: 1,
            limit: 5
        }
        martModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            if (err) {

                res.send({ responseCode: 500, responseMessage: "Internal server error" });
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found" });
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
        })
    },

    searchAllByLocation: async (req, res) => {
        let query = {
            $and: [{ status: "ACTIVE" }, {
                $or: [{ martName: { $regex: req.body.search, $options: 'i' } },
                { subCategoryName: { $regex: req.body.search, $options: 'i' } },
                { categoryName: { $regex: req.body.search, $options: 'i' } },
                { shopName: { $regex: req.body.search, $options: 'i' } },
                { itemType: { $regex: req.body.search, $options: 'i' } },
                { brandName: { $regex: req.body.search, $options: 'i' } }]
            }]
        }
        var configData = await configurationModel.findOne({ configType: "USER", status: "ACTIVE" })
        console.log("1826=====>", configData.radiusEndUser)
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
        { $match: query },
        {
            $project: {
                _id: 1,
                oneTimeCoupon: 1,
                Inside_Mart_Notifications: 1,
                outside_Mart_Notifications: 1,
                status: 1,
                couponStatus: 1,
                appovalStatus: 1,
                title: 1,
                mobileNumber: 1,
                couponCode: 1,
                discount: 1,
                image: 1,
                itemType: 1,
                itemName: 1,
                brandName: 1,
                shopName: 1,
                retailerId: 1,
                couponAppliedOn: 1,
                floorNumber: 1,
                categoryId: 1,
                categoryPriority: 1,
                productServiceType: 1,
                subCategoryId: 1,
                subCategoryPriority: 1,
                martId: 1,
                ExpiryDate: 1,
                restrictions: 1,
                shopPhoneNumber: 1,
                createdAt: 1,
                updatedAt: 1,
                location: 1
            }
        },
        ])
        var options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 }
        }
        console.log("AGGREGATE>>", aggregate)
        retailerCouponModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            console.log("I AM HERE #@!$%%>>>", err, result)
            if (err) {

                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.length == 0) {
                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
            else {
                var obj1 = new activityModel({
                    userId: req.body.userId,
                    activity: "Searched the website."
                })
                obj1.save();
                res.send({ responseCode: 200, responseMessage: "Data found successfully", result, pageCount, count });
            }
        })
    },

    getShopByMart: async (req, res) => {

        userModel.find({ status: "ACTIVE", userType: "RETAILER", martId: req.body.martId }).populate("martId").exec((userErr, userData) => {
            if (userErr) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (userData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "User not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Shop found successfully", userData })
            }
        })
    },
    getAllCouponOfMart: async (req, res) => {
        var couponData = await retailerCoupon.find({ martId: { $in: req.body.martId }, status: "ACTIVE", ExpiryDate: { $gte: new Date() } })
        if (couponData) {
            return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", couponData })
        }
        else if (couponData.length == 0) {
            return res.send({ responseCode: 404, responseMessage: "Coupon not found successfully", couponData })
        }
    },
    getAllCategoryOfMart: async (req, res) => {
        var couponData = await retailerCoupon.find({ martId: { $in: req.body.martId }, status: "ACTIVE" }).populate("categoryId").select('categoryId')
        if (couponData) {
            return res.send({ responseCode: 200, responseMessage: "Category found successfully", couponData })
        }
        else if (couponData.length == 0) {
            return res.send({ responseCode: 404, responseMessage: "Category not found successfully", couponData })
        }
    },
    dashboardPopupAddress: async (req, res) => {
        if (req.body.userId) {
            var userData = await userModel.findOneAndUpdate({ _id: req.body.userId, userType: "USER", status: "ACTIVE" }, { $set: { popUpAddress: req.body.popUpAddress } }, { new: true, multi: true })
            return res.send({ responseCode: 200, responseMessage: "Location added successfully", userData })
        }
        else {
            new guestUserModel(req.body).save((saveErr, saveResult) => {
                if (saveErr) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    return res.send({ responseCode: 200, responseMessage: "Location added successfully", saveResult })

                }
            })
        }
    },

    //-----------------------------------landing dashboard end----------------------------------
    //--------------------------------------------------------------------------------------------------
    //-------------------------------------all retailers && all coupons display retailers (mart and retailers)start-----------------------------------

    applyOnForCategory: async (req, res) => {
        if (req.body.martId) {
            var martData = await retailerCoupon.find({ martId: req.body.martId, status: "ACTIVE" }).populate("categoryId").select('categoryId')
            if (martData) {

                return res.send({ responseCode: 200, responseMessage: "Category found successfully", martData })

            } else if (martData.length == 0) {

                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
        else {
            var martData1 = await retailerCoupon.find({ retailerId: req.body.retailerId, status: "ACTIVE" }).populate("categoryId").select('categoryId')
            if (martData1) {

                return res.send({ responseCode: 200, responseMessage: "Category found successfully", martData1 })

            } else if (martData1.length == 0) {

                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
    },
    applyOnForSubCategory: async (req, res) => {
        if (req.body.martId) {
            var martData = await retailerCoupon.find({ martId: req.body.martId, status: "ACTIVE" }).populate("subCategoryId").select('subCategoryId')
            if (martData) {

                return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", martData })

            } else if (martData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
        else {
            var martData1 = await retailerCoupon.find({ retailerId: req.body.retailerId, status: "ACTIVE" }).populate("subCategoryId").select('subCategoryId')
            if (martData1) {
                return res.send({ responseCode: 200, responseMessage: "SubCategory found successfully", martData1 })
            } else if (martData1.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
    },
    applyOnForItemType: async (req, res) => {
        if (req.body.martId) {
            var martData = await retailerCoupon.find({ martId: req.body.martId, status: "ACTIVE" }).select("itemType")
            if (martData) {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", martData })

            } else if (martData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
        else {
            var martData1 = await retailerCoupon.find({ retailerId: req.body.retailerId, status: "ACTIVE" }).select('itemType')
            if (martData1) {

                return res.send({ responseCode: 200, responseMessage: "Data found successfully", martData1 })

            } else if (martData1.length == 0) {

                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
    },
    applyOnForBrand: async (req, res) => {
        if (req.body.martId) {
            var martData = await retailerCoupon.find({ martId: req.body.martId, status: "ACTIVE" }).select('brandName')
            if (martData) {
                return res.send({ responseCode: 200, responseMessage: "Brand found successfully", martData })

            } else if (martData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
        else {
            var martData1 = await retailerCoupon.find({ retailerId: req.body.retailerId, status: "ACTIVE" }).select('brandName')
            if (martData1) {

                return res.send({ responseCode: 200, responseMessage: "Brand found successfully", martData1 })

            } else if (martData1.length == 0) {

                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
    },
    filterInCoupunAllRetailers: (req, res) => {
        let query = {}
        if (req.body.categoryId && req.body.martId) {
            query.$and = [{
                categoryId: { $in: req.body.categoryId }
            },
            {
                martId: req.body.martId
            }]
        }
        if (req.body.subCategoryId && req.body.martId) {
            query.$and = [{
                subCategoryId: { $in: req.body.subCategoryId }
            },
            {
                martId: req.body.martId
            }]
        }
        if (req.body.itemType && req.body.martId) {
            query.$and = [{
                itemType: { $in: req.body.itemType }
            },
            {
                martId: req.body.martId
            }]
        }
        if (req.body.brandName && req.body.martId) {
            query.$and = [{
                brandName: { $in: req.body.brandName }
            },
            {
                martId: req.body.martId
            }]
        }
        if (req.body.categoryId && req.body.retailerId) {
            query.$and = [{
                categoryId: { $in: req.body.categoryId }
            },
            {
                retailerId: req.body.retailerId
            }]
        }
        if (req.body.subCategoryId && req.body.retailerId) {
            query.$and = [{
                subCategoryId: { $in: req.body.subCategoryId }
            },
            {
                retailerId: req.body.retailerId
            }]
        }

        if (req.body.itemType && req.body.retailerId) {
            query.$and = [{
                itemType: { $in: req.body.itemType }
            },
            {
                retailerId: req.body.retailerId
            }]
        }
        if (req.body.brandName && req.body.retailerId) {
            query.$and = [{
                brandName: { $in: req.body.brandName }
            },
            {
                retailerId: req.body.retailerId
            }]
        }
        var options = {
            page: 1,
            limit: 5,
            sort: { createdAt: -1 }
        }

        retailerCoupon.paginate(query, options, (cuponError, cuponData) => {
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
    allCouponDisplayForRetailer: async (req, res) => {
        var data = await retailerCoupon.find({ retailerId: req.body.retailerId }).select('-location -categoryImage -martImage')
        if (data) {
            return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", data })
        }
        else if (data.length == 0) {
            return res.send({ responseCode: 404, responseMessage: "Coupon not found" })

        }
    },
    getRetailerAndCouponByMart: async (req, res) => {
        var Data = await retailerCoupon.find({ martId: req.body.martId, status: "ACTIVE" }).populate("retailerId").select("-categoryImage -martImage -location")
        if (Data) {
            return res.send({ responseCode: 200, responseMessage: "Data found successfully", Data })
        }
        else if (Data.length == 0) {
            return res.send({ responseCode: 200, responseMessage: "Data not found" })
        }
    },


    //------------------------coupon preview start------------------------------------
    previewCouponByUser: (req, res) => {
        userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
            }
            else {
                retailerCoupon.findOne({ _id: req.body.couponId, status: "ACTIVE" }).populate("couponId").select('-location -categoryImage -martImage').exec((couponError, couponData) => {
                    if (couponError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!couponData) {
                        return res.send({ responseCode: 404, responseMessage: "Coupon not found" })
                    }
                    else {
                        userModel.findOne({ _id: couponData.retailerId, status: "ACTIVE", userType: "RETAILER" }, (retailerErr, retailerResult) => {
                            if (retailerErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!retailerResult) {
                                return res.send({ responseCode: 404, responseMessage: "Retailer not found" })
                            }
                            else {
                                if (retailerResult.credit > 0) {
                                    var obj = new previewModel({
                                        "userId": req.userId,
                                        "couponId": req.body.couponId,
                                        "couponCode": couponData.couponCode,
                                        "retailerId": couponData.retailerId,
                                        "lastViewTime": new Date().getTime(),
                                        dateOfAnniversary: result.dateOfAnniversary,
                                        educationalLevel: result.dateOfAnniversary,
                                        ageRange: result.ageRange,
                                        incomeRange: result.incomeRange,
                                        homeOwnership: result.homeOwnership,
                                        occupation: result.occupation,
                                        gender: result.gender,
                                        address: result.address
                                    })
                                    obj.save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: retailerResult._id }, { $set: { credit: retailerResult.credit - 1 } }, { new: true }, (error, result1) => {
                                                if (error) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    var obj1 = new activityModel({
                                                        userId: req.userId,
                                                        activity: "viewed coupon."
                                                    })
                                                    obj1.save();
                                                    return res.send({ responseCode: 200, responseMessage: "Coupon viewed successfully", obj })
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    return res.send({ responseCode: 404, responseMessage: "Retailer not found" })
                                }
                            }
                        })

                    }
                })
            }
        })
    },
    previewCouponAnyTime: (req, res) => {
        retailerCoupon.findOne({ _id: req.body.couponId }, (couponError, couponResult) => {
            if (couponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var obj = new previewModel({
                    "userId": req.body.userId,
                    "couponId": req.body.couponId,
                    "couponCode": couponResult.couponCode,
                    "retailerId": couponResult.retailerId,
                    "viewTime": new Date()
                })
                obj.save((saveErr, saveResult) => {
                    if (saveErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        return res.send({ responseCode: 200, responseMessage: "Coupon viewed successfully", obj })

                    }
                })
            }
        })
    },

    getViewCoupon: (req, res) => {
        previewModel.find({ userId: req.body.userId, couponId: req.body.couponId }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", result })
            }
        })
    },
    //--------------------------------coupon preview end---------------------------
    //------------------------------------------------------------------------------------------
    //-----------------------------------category and category expened start------------------------------
    getSubCategoryAndCouponByCategory: async (req, res) => {
        var Data = await retailerCoupon.find({ categoryId: req.body.categoryId, martId: { $in: req.body.martId }, status: "ACTIVE" }).populate("subCategoryId").select("-categoryImage -martImage -location -subCategoryPriority -subCategoryName")
        if (Data) {
            return res.send({ responseCode: 200, responseMessage: "Data found successfully", Data })
        }
        else if (Data.length == 0) {
            return res.send({ responseCode: 200, responseMessage: "Data not found" })
        }
        else {
            res.send({ responseCode: 200, responseMessage: "Data found successfully.", Data })
        }
    },

    getCouponByMartSubCategory: async (req, res) => {
        var Data = await retailerCoupon.find({ subCategoryId: req.body.subCategoryId, martId: { $in: req.body.martId }, subCategoryId: req.body.subCategoryId, status: "ACTIVE" }).select('-location -categoryImage -martImage')
        if (Data) {
            return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", Data })
        }
        else if (Data.length == 0) {
            return res.send({ responseCode: 200, responseMessage: "Coupon not found" })
        }
        else {
            res.send({ responseCode: 200, responseMessage: "data found successfully.", Data })
        }
    },

    getAllRetailerOfMartAndAllCoupon: async (req, res) => {
        if (req.body.martId) {
            var martData = await userModel.find({ martId: req.body.martId, status: "ACTIVE", userType: "RETAILER" })
            if (martData) {
                return res.send({ responseCode: 200, responseMessage: "Retailer found successfully", martData })

            } else if (martData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No retailer found" })
            }
        }
        else {
            var couponData = await userModel.find({ retailerId: { $in: req.body.retailerId }, status: "ACTIVE", ExpiryDate: { $gte: new Date() } })
            if (couponData) {
                return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", couponData })
            }
            else if (couponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "Coupon not found" })
            }
        }
    },
    getMultipleRetailerofMultipleMart: async (req, res) => {
        var data = await userModel.find({ martId: { $in: req.body.martId }, status: "ACTIVE", userType: "RETAILER" })
        if (data) {
            return res.send({ responseCode: 200, responseMessage: "Retailer found successfully", data })
        }
        else if (data.length == 0) {
            return res.send({ responseCode: 200, responseMessage: "No retailer found" })
        }
    },

    //-----------------------------------category and catgeory expened end-----------------------------------


    //------------------------------------------report management start---------------------------------------

    reportManagement: (req, res) => {
        try {
            let query = {}

            if (req.body.couponCode) {
                query.couponCode = req.body.couponCode
            }

            if (req.body.retailerId) {
                query.retailerId = req.body.retailerId
            }
            if (req.body.gender) {
                query.gender = req.body.gender
            }

            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{
                    createdAt: { $gte: req.body.fromDate }
                },
                {
                    createdAt: { $lte: req.body.toDate }
                }]
            }

            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate }
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 }
            };

            previewModel.paginate(query, options, (err, result) => {
                console.log("1525=======>", err, result)
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
    getAllCouponForRetailer: async (req, res) => {

        var data = await retailerCoupon.find({ retailerId: req.body.retailerId }).select('-location -categoryImage -martImage')
        if (data) {
            return res.send({ responseCode: 200, responseMessage: "Coupon found successfully", data })
        }
        else if (data.length == 0) {
            return res.send({ responseCode: 404, responseMessage: "Coupon not found" })

        }
    },




    //--------------------------------------dashboard end-------------------------------------------------------
    /**
     * Function Name :signUp
     * Description   : signUp of user/retailer
     *
     * @return response
    */

    signUp: (req, res) => {
        var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.mobileNumber }], status: "ACTIVE" };
        userModel.findOne(query, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result) {
                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
            }
            else {
                req.body.otp = commonFunction.getOTP();
                req.body.otpTime = new Date().getTime();
                req.body.password = bcrypt.hashSync(req.body.password);
                console.log(">>>>>>69", req.body.otp, req.body.otpTime)
                if (req.body.userType == "USER") {
                    console.log(">>>>>>>>71")
                    commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Thankyou for registering Lighthouse Enterprises. Your One Time Password is:- ${req.body.otp} . Please verify your otp.`, (smsErr, smsResult) => {
                        if (smsErr) {
                            console.log(smsErr)
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            new userModel(req.body).save((saveErr, saveResult) => {
                                console.log(">>>>>79", saveErr, saveResult)
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    if (req.body.referralCode) {
                                        configurationModel.findOne({ configType: "RETAILER" }, (configError, config) => {
                                            console.log(configError, config)
                                            if (configError) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (!config) {
                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                            }
                                            else {
                                                userModel.findOne({ retailerReferralCode: req.body.referralCode }, (referralError, refferal) => {
                                                    console.log(refferal, referralError)
                                                    if (referralError) {
                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else if (!refferal) {
                                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                                                    }
                                                    else {
                                                        var newCredit = config.earnedCredits + refferal.credit
                                                        console.log("New credit", newCredit)
                                                        userModel.findOneAndUpdate({ _id: refferal._id }, { $set: { credit: newCredit } }, { new: true }, (creditError, credit) => {
                                                            console.log("I am here", credit, creditError)
                                                            if (creditError) {
                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else {
                                                                userModel.findOneAndUpdate({ _id: saveResult._id }, { $set: { retailerReferralCode: req.body.referralCode } }, { new: true }, (userRefError, userRef) => {
                                                                    if (userRefError) {
                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                    }
                                                                    else {
                                                                        var obj = {
                                                                            retailerId: refferal._id,
                                                                            title: "Reffered user",
                                                                            notificationType: "RETAILER",
                                                                            body: `User signed up using ${refferal.shopName} referral code.`
                                                                        }
                                                                        var newObj = new notificationModel(obj)
                                                                        newObj.save((saveError, savedData) => {
                                                                            console.log(saveError, savedData)
                                                                            if (saveError) {
                                                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                var creditData = {
                                                                                    retailerId: refferal._id,
                                                                                    creditType: "EARNED CREDIT",
                                                                                    credit: config.earnedCredits
                                                                                }
                                                                                var creditHistory = new creditModel(creditData)
                                                                                creditHistory.save((creditError1, credited) => {
                                                                                    if (creditError1) {
                                                                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                                                    }
                                                                                    else {
                                                                                        var token = jwt.sign({ id: saveResult._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                                                                                        var saveResults = {
                                                                                            token: token,
                                                                                            saveResult: saveResult
                                                                                        }
                                                                                        response(res, SuccessCode.SUCCESS, saveResults, SuccessMessage.SIGNUP_SUCCESS);
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
                                        var token = jwt.sign({ id: saveResult._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                                        var saveResults = {
                                            token: token,
                                            saveResult: saveResult
                                        }
                                        response(res, SuccessCode.SUCCESS, saveResults, SuccessMessage.SIGNUP_SUCCESS);
                                    }
                                }
                            })
                        }
                    })
                }
                else {
                    console.log(">>>>>>>>>>89")
                    commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Thankyou for registering Lighthouse Enterprises. Your One Time Password is:- ${req.body.otp} . Please verify your otp.`, (smsErr, smsResult) => {
                        console.log(">>>>89", smsErr, smsResult)
                        if (smsErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            new userModel(req.body).save((saveErr, saveResult) => {
                                console.log(">>>>>94", saveErr, saveResult)
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SIGNUP_SUCCESS);
                                }
                            })
                        }
                    })
                }
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
            var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.mobileNumber }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var otpTime2 = new Date().getTime();
                    var diff = otpTime2 - result.otpTime;
                    if (req.body.mobileNumber == result.mobileNumber) {
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            if (req.body.otp == result.otp) {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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

                        }
                    }
                    else {
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            if (req.body.otp == result.otp) {
                                userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otpVerification: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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
     * Function Name :resendOTP
     * Description   : resendOTP of user/retailer
     *
     * @return response
    */

    resendOTP: (req, res) => {
        try {
            var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.mobileNumber }], status: "ACTIVE" }
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp2 = commonFunction.getOTP();
                    var otpTime3 = new Date().getTime();
                    if (req.body.mobileNumber == result.email) {
                        commonFunction.sendMail(req.body.mobileNumber, `Dear ${result.firstName}, your otp is:- ${otp2}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }, (error1, otpUpdate) => {
                                    if (error1) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.EMAIL_SEND);
                                    }

                                })
                            }
                        })
                    }
                    else {
                        commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Dear ${result.firstName}, your otp is:- ${otp2}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, { $set: { otp: otp2, otpTime: otpTime3 } }, { new: true }, (error1, otpUpdate) => {
                                    if (error1) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.OTP_SEND);
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
            var query = { $or: [{ mobileNumber: req.body.mobileNumber }, { email: req.body.email }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                console.log(result)
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
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (error1, otpUpdate) => {
                                    if (error1) {
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
                        commonFunction.sendSMSOTPSNS(req.body.mobileNumber, `Your otp is:- ${otp3}`, (error, otpSent) => {
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                userModel.findOneAndUpdate({ mobileNumber: req.body.email, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }, (error1, otpUpdate) => {
                                    if (error1) {
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
            // var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.email }], status: { $in: ["ACTIVE", "INACTIVE"] }, loginStatus: "UNBLOCKED" };
            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.email },
                            { mobileNumber: req.body.email }
                        ]
                    },
                    { status: { $in: ["ACTIVE", "INACTIVE"] } }
                ]
            };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    if (result.loginStatus == "BLOCK") {
                        res.send({ responseCode: 201, responseMessage: "Your account has been blocked by the admin.Please contact admin" })
                    }
                    else {
                        var check = bcrypt.compareSync(req.body.password, result.password);
                        if (!check) {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }
                        else {
                            var token = jwt.sign({ id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                            var data = {
                                userId: result._id,
                                token: token,
                                weeklySignup: result.weeklyEmail
                            };
                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.LOGIN_SUCCESS);
                            var obj = new activityModel({
                                userId: result._id,
                                activity: "Logged in."
                            })
                            obj.save();
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
            userModel.findOne({ _id: req.userId, loginStatus: "UNBLOCK", status: { $in: ["ACTIVE", "INACTIVE"] } }, (err, result) => {
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
            userModel.findById({ _id: req.userId, loginStatus: "UNBLOCK", status: { $in: ["ACTIVE", "INACTIVE"] } }, (err, result) => {
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
                        userModel.findByIdAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (err1, updateResult) => {
                            if (err1) {
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


    manageGeneralInfo: (req, res) => {
        try {
            let set = {}
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, userFound) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userFound) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    if (req.body.firstName) {
                        set["firstName"] = req.body.firstName
                    }
                    if (req.body.lastName) {
                        set["lastName"] = req.body.lastName
                    }
                    if (req.body.countryCode) {
                        set["countryCode"] = req.body.countryCode
                    }
                    if (req.body.phoneNumber) {
                        set["phoneNumber"] = req.body.phoneNumber
                    }
                    if (req.body.ageRange) {
                        set["ageRange"] = req.body.ageRange
                    }
                    if (req.body.email) {
                        set["email"] = req.body.email
                    }
                    if (req.body.dateOfBirth) {
                        set["dateOfBirth"] = req.body.dateOfBirth
                    }
                    if (req.body.gender) {
                        set["gender"] = req.body.gender
                    }
                    if (req.body.dateOfAnniversary) {
                        set["dateOfAnniversary"] = req.body.dateOfAnniversary
                    }
                    if (req.body.occupation) {
                        set["occupation"] = req.body.occupation
                    }
                    if (req.body.incomeRange) {
                        set["incomeRange"] = req.body.incomeRange
                    }
                    if (req.body.homeOwnership) {
                        set["homeOwnership"] = req.body.homeOwnership
                    }
                    if (req.body.educationalLevel) {
                        set["educationalLevel"] = req.body.educationalLevel
                    }
                    if (req.body.homeAddress) {
                        set["homeAddress"] = req.body.homeAddress
                    }
                    if (req.body.pinCode) {
                        set["pinCode"] = req.body.pinCode
                    }
                    if (req.body.city) {
                        set["city"] = req.body.city
                    }
                    if (req.body.state) {
                        set["state"] = req.body.state
                    }
                    if (req.body.address) {
                        set["address"] = req.body.address
                    }
                    userModel.findOneAndUpdate({ _id: userFound._id }, { $set: set }, { new: true }, (updateError, update) => {
                        if (updateError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "General info updated successfully." })
                            var obj = new activityModel({
                                userId: req.userId,
                                activity: "Edited profile."
                            })
                            obj.save();
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
     * Function Name :weeklyEmailSignup
     * Description   : weeklyEmailSignup for user
     *
     * @return response
    */

    weeklyEmailSignup: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", loginStatus: "UNBLOCK" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    let body = {
                        email: req.body.email,
                        pinCode: req.body.pinCode,
                        state: req.body.state,
                        city: req.body.city,
                        address: req.body.address
                    }
                    let valid = commonFunction.Validator(body);
                    if (valid) {
                        return res.send({ responseCode: 400, responseMessage: valid })
                    }
                    else {
                        // userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                        //     console.log(findRes)
                        //     if (findErr) {
                        //         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        //     }
                        //     else if (findRes) {
                        //         response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                        //     }
                        //     else {
                        req.body.otp = commonFunction.getOTP();
                        req.body.otpTime = new Date().getTime();
                        commonFunction.sendOtpFor2fa(req.body.email, "Weekly Signup Otp", `Your otp for Lighthouse enterprises is ${req.body.otp}.Use this otp to verify .`, (otpError, otpSent) => {
                            if (otpError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.weeklyEmail = true
                                userModel.findOneAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (err1, updateResult) => {
                                    if (err1) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                        //     }
                        // })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name : personalisedExperience
     * Description   : personalisedExperience for user/retailer
     *
     * @return response
    */

    personalisedExperience: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE", loginStatus: "UNBLOCK" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.userId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (err1, updateResult) => {
                        if (err1) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
     * Function Name : addToWishList
     * Description   : addToWishList for user/retailer
     *
     * @return response
    */

    addToWishList: (req, res) => {
        console.log("jdhdhdhhdh")
        try {
            console.log("jdhdhdhhdh")
            userModel.findOne({ _id: req.userId, userType: "USER", loginStatus: "UNBLOCK", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    wishListModel.findOne({ wishId: req.body.wishId, userId: req.userId, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                        if (findErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (findRes) {
                            wishListModel.remove({ _id: findRes._id }, (removeErr, removeRes) => {
                                if (removeErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, removeRes, SuccessMessage.DELETE_SUCCESS);
                                }
                            })
                        }
                        else {
                            var obj = {
                                userId: req.userId,
                                wishId: req.body.wishId,
                                type: req.body.type
                            };
                            new wishListModel(obj).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, "Item added to wishlist");
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }
    },


    getUserWishList: (req, res) => {
        try {
            console.log(req.body)
            wishListModel.find({ userId: req.userId, type: req.body.type }, (error, results) => {
                if (error) {
                    console.log(error, results)
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (results.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "WishList found successfully.", results })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }
    },

    sendOtpOnMail: (req, res) => {
        try {
            req.body.otp = commonFunction.getOTP();
            req.body.otpTime = new Date().getTime();
            commonFunction.sendOtpFor2fa(req.body.email, "Email verification", req.body.otp, (mailError, mailed) => {
                if (mailError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { emailOtp: req.body.otp, emailOtpTime: req.body.otpTime } }, { new: true }, (otpError, results) => {
                        if (otpError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Otp sent to mail successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }
    },
    verifyEmail: async (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (err, resultss) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!resultss) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var otpTime2 = new Date().getTime();
                    var diff = otpTime2 - resultss.emailOtpTime;
                    if (diff >= 180000) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                    }
                    else {
                        if (req.body.otp == resultss.emailOtp) {
                            userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { emailOtpVerify: true } }, { new: true }).select('_id countryCode mobileNumber email otpVerification userType').exec((err2, result2) => {
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
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    updateOneTimeSignup: (req, res) => {
        try {
            userModel.findOneAndUpdate({ _id: req.userId, loginStatus: "UNBLOCK" }, { $set: { oneTimeSignUp: true } }, { new: true }, (error, resultss) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Updated" })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    resendOtpOnMail: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId }, (err, resultsss) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!resultsss) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp2 = commonFunction.getOTP();
                    var otpTime3 = new Date().getTime();
                    commonFunction.sendMail(req.body.email, `Dear ${resultsss.firstName}, your otp is:- ${otp2}`, (error, otpSent) => {
                        if (error) {
                            console.log(error)
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            userModel.findOneAndUpdate({ email: req.body.mobileNumber, status: "ACTIVE" }, { $set: { emailOtp: otp2, emailOtpTime: otpTime3 } }, { new: true }, (error1, otpUpdate) => {
                                if (error1) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, otpUpdate, SuccessMessage.EMAIL_SEND);
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
     * Function Name : myWishList
     * Description   : myWishList for user/retailer
     *
     * @return response
    */

    myWishList: (req, res) => {
        try {
            var obj = { path: "wishId" }
            var query = { userId: req.userId, status: "ACTIVE" };
            if (req.body.type == "CATEGORY") {
                obj.model = 'category'
                query.type = req.body.type;
            }
            if (req.body.type == "SUBCATEGORY") {
                obj.model = 'subcategory'
                query.type = req.body.type;
            }
            if (req.body.type == "MART") {
                obj.model = 'mart'
                query.type = req.body.type;
            }
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate };
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 },
                populate: obj
            };

            wishListModel.paginate(query, options, (err, resultss) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (resultss.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, resultss, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }

    },


    /**
     * Function Name : searchWishList
     * Description   : searchWishList for user/retailer
     *
     * @return response
    */

    searchWishList: (req, res) => {
        try {
            if (!req.body.search) {
                response(res, ErrorCode.BAD_REQUEST, ErrorMessage.FIELD_REQUIRED)
            }
            else {
                let query = { status: { $ne: "DELETE" } };
                if (req.body.search) {
                    query.type = new RegExp('^' + req.body.search, 'i');
                }

                var options = {
                    page: req.body.page || 1,
                    limit: req.body.limit || 5,
                    sort: { createdAt: -1 }
                };
                wishListModel.paginate(query, options, (err, resultss) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (resultss.docs.length == false) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, resultss, SuccessMessage.DATA_FOUND);
                    }
                });
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }

    },

    /**
     * Function Name : saveMyCoupon
     * Description   : saveMyCoupon for user
     *
     * @return response
    */

    saveMyCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", status: "ACTIVE" }, (err, resultts) => {
                console.log("726====>", err, resultts)
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!resultts) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    couponModel.findOne({ userId: req.userId, couponId: req.body.couponId, status: "ACTIVE" }, (checkErr, checkResult) => {
                        if (checkErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (checkResult) {
                            res.send({ responseCode: 404, responseMessage: "Data already saved" });
                        }
                        else {
                            retailerCoupon.findOne({ _id: req.body.couponId, status: "ACTIVE" }, (err1, couponResult) => {
                                if (err1) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!couponResult) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    var data = new couponModel({
                                        "userId": req.userId,
                                        "couponId": req.body.couponId,
                                        "title": couponResult.title,
                                        "couponCode": couponResult.couponCode,
                                        "discount": couponResult.discount,
                                        "image": couponResult.image,
                                        "itemType": couponResult.itemType,
                                        "itemName": couponResult.itemName,
                                        "brandName": couponResult.brandName,
                                        "couponStatus": couponResult.couponStatus,
                                        "shopName": couponResult.shopName,
                                        "retailerId": couponResult.retailerId,
                                        "couponAppliedOn": couponResult.couponAppliedOn,
                                        "floorNumber": couponResult.floorNumber,
                                        "categoryName": couponResult.categoryName,
                                        "categoryId": couponResult.categoryId,
                                        "productServiceType": couponResult.productServiceType,
                                        "subCategoryId": couponResult.subCategoryId,
                                        "subCategoryName": couponResult.subCategoryName,
                                        "martId": couponResult.martId,
                                        "martName": couponResult.martName,
                                        "ExpiryDate": couponResult.ExpiryDate,
                                        "restrictions": couponResult.restrictions,
                                        "oneTimeCoupon": couponResult.oneTimeCoupon,
                                        "Inside_Mart_Notifications": couponResult.Inside_Mart_Notifications,
                                        "outside_Mart_Notifications": couponResult.outside_Mart_Notifications,
                                        "shopPhoneNumber": couponResult.shopPhoneNumber,

                                    })
                                    data.save((saveErr, saveRes) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Data saved successfully." })
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
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
     * Function Name : myCoupons
     * Description   : myCoupons for user in website
     *
     * @return response
    */

    myCoupons: (req, res) => {
        try {
            let query = { status: "ACTIVE" };
            if (req.body.search) {
                query.$and = [{ status: "ACTIVE" }, { title: { $regex: req.body.search, $options: 'i' } }]
            }
            if (req.body.userId) {
                query.userId = req.body.userId
            }
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                },
            }
            couponModel.paginate(query, options, (err, result) => {
                console.log("838=======>", err, result)
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
    viewCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (adminError, admin) => {
                if (adminError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!admin) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    retailerCouponModel.findOne({ _id: req.params.couponId, status: "ACTIVE" }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
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
         * Function Name : deleteCoupon
         * Description   : deleteCoupon for user/retailer
         *
         * @return response
        */
    //7065820946
    deleteCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "USER", loginStatus: "UNBLOCK" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    couponModel.findOneAndUpdate({ couponId: req.body.couponId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, deleteResult) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.DELETE_SUCCESS);
                            var obj = new activityModel({
                                userId: result._id,
                                activity: "Deleted saved coupon."
                            })
                            obj.save();
                        }
                    })
                }
            })
        }
        catch (error) {
            console.log("845======>", error)
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
        }
    },


    /**
    * Function Name : hideCoupon
    * Description   : hideCoupon for user in website
    *
    * @return response
   */

    hideCoupon: (req, res) => {
        couponModel.findOne({ _id: req.body.couponId, status: "ACTIVE", userId: req.userId }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                couponModel.findOneAndUpdate({ _id: req.body.couponId, userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, updateResult) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.COUPON_HIDE);
                    }
                })
            }
        })
    },


    addRetailerToWishList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (userDataError, userData) => {
                if (userDataError) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!userData) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.retailerId, status: "ACTIVE" }, { $addToSet: { users: req.userId } }, { new: true }, (retailerError, retailerData) => {
                        if (retailerError) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (!retailerData) {
                            res.send({ responseCode: 404, responseMessage: "Data not found" })
                        }
                        else {
                            wishListModel.findOne({ retailerId: req.body.retailerId, userId: userData._id }, async (wihError, wishData) => {
                                if (wihError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else if (!wishData) {
                                    var obj = {
                                        userId: userData._id,
                                        retailerId: retailerData._id,
                                        type: "RETAILER",
                                        shopName: retailerData.shopName,
                                        users: retailerData.users,
                                        retailerImage: await getWebsiteImage(req.body.retailerId)
                                    }
                                    var wishSave = new wishListModel(obj)
                                    wishSave.save((saveError, savedData) => {
                                        if (saveError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Retailer Added to wishlist successfully." })
                                        }
                                    })
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $pull: { users: req.userId } }, { new: true }, (userError, donePull) => {
                                        if (userError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            wishListModel.findOneAndRemove({ _id: wishData._id }, (removeError, removed) => {
                                                if (removeError) {
                                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Retailer removed from wishlist successfully." })
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
            res.send({ responseCode: 500, responseMessage: "Something went wrong." })
        }
    },

    // addRetailerToWishList: (req, res) => {
    //     try {
    //         console.log('i am here to check req>>>>>>', req.userId)
    //         userModel.findOne({ _id: req.userId, loginStatus: "UNBLOCKED", status: { $in: ["ACTIVE", "INACTIVE"] } }, (error, result) => {
    //             console.log("I am Sender", error, result)
    //             if (error) {
    //                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //             }
    //             else if (!result) {
    //                 res.send({ responseCode: 404, responseMessage: "Data not found" })
    //             }
    //             else {
    //                 userModel.findOne({ _id: req.body.retailerId, status: "ACTIVE" }, (error2, result2) => {
    //                     if (error2) {
    //                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                     }
    //                     else if (!result2) {
    //                         res.send({ responseCode: 404, responseMessage: "Data not found" })
    //                     } else {
    //                             userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $addToSet: { favourites: req.userId } }, { new: true }, (error3, result3) => {
    //                                 if (error3) {
    //                                     res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                 }
    //                                 else if (!result3) {
    //                                     res.send({ responseCode: 404, responseMessage: "Data not found" })
    //                                 }
    //                                 else {
    //                                     res.send({ responseCode: 200, responseMessage: "Retailer added to wishlist Successfully" })
    //                                 }
    //                             })
    //                             userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $pull: { favourites: req.userId } }, { new: true }, (error1, result1) => {
    //                                 if (error1) {
    //                                     res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                 }
    //                                 else if (!result1) {
    //                                     res.send({ responseCode: 404, responseMessage: "Data not found", result1 })
    //                                 }
    //                                 else {
    //                                     res.send({ responseCode: 200, responseMessage: "Retailer removed from wishlist successfully." })
    //                                 }
    //                             })
    //                     }
    //                 })
    //             }
    //         })

    //     }
    //     catch{
    //         console.log("I am Error")
    //         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //     }
    // },

    // addMartToWishList: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId }, (userDataError, userData) => {
    //             if (userDataError) {
    //                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //             }
    //             else if (!userData) {
    //                 res.send({ responseCode: 404, responseMessage: "Data not found" })
    //             }
    //             else {
    //                 retailerCouponModel.findOneAndUpdate({ martId: req.body.martId, status: "ACTIVE" }, { $addToSet: { martUsers: req.userId } }, { new: true }, (retailerError, retailerData) => {
    //                     if (retailerError) {
    //                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                     }
    //                     else if (!retailerData) {
    //                         res.send({ responseCode: 404, responseMessage: "Data not found" })
    //                     }
    //                     else {
    //                         wishListModel.findOne({ martId: req.body.martId, userId: userData._id }, (wihError, wishData) => {
    //                             if (wihError) {
    //                                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                             }
    //                             else if (!wishData) {
    //                                 var obj = {
    //                                     userId: userData._id,
    //                                     martId: retailerData._id,
    //                                     type: "MART",
    //                                     martName: retailerData.martName,
    //                                     martImage: retailerData.images
    //                                 }
    //                                 var wishSave = new wishListModel(obj)
    //                                 wishSave.save((saveError, savedData) => {
    //                                     if (saveError) {
    //                                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                     }
    //                                     else {
    //                                         res.send({ responseCode: 200, responseMessage: "Mart Added to wishlist successfully." })
    //                                     }
    //                                 })
    //                             }
    //                             else {
    //                                 martModel.findOneAndUpdate({ _id: req.body.martId }, { $pull: { users: req.userId } }, { new: true }, (pullError, pulled) => {
    //                                     if (pullError) {
    //                                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                     }
    //                                     else {
    //                                         wishListModel.findOneAndRemove({ _id: wishData._id }, (removeError, removed) => {
    //                                             if (removeError) {
    //                                                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                             }
    //                                             else {
    //                                                 res.send({ responseCode: 200, responseMessage: "Retailer removed from wishlist successfully." })
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
    //         res.send({ responseCode: 500, responseMessage: "Something went wrong." })
    //     }
    // },

    addMartToWishList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (userDataError, userData) => {
                if (userDataError) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!userData) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    wishListModel.findOne({ categoryId: req.body.categoryId, userId: req.userId }, (wihError, wishData) => {
                        if (wihError) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (!wishData) {
                            retailerCouponModel.findOneAndUpdate({ _id: req.body.uniqueId, martId: req.body.martId, status: "ACTIVE" }, { $addToSet: { categoryUsers: req.userId } }, { new: true }, (retailerError, retailerData) => {
                                if (retailerError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else {
                                    console.log("LLLOOO", retailerData)
                                    var obj = {
                                        userId: userData._id,
                                        martId: retailerData.martId,
                                        uniqueId: retailerData._id,
                                        type: "MART",
                                        martName: retailerData.martName,
                                        martImage: retailerData.images,
                                        martUsers: retailerData.martUsers
                                    }
                                    var wishSave = new wishListModel(obj)
                                    wishSave.save((saveError, savedData) => {
                                        if (saveError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Mart Added to wishlist successfully." })
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            retailerCouponModel.findOneAndUpdate({ _id: req.body.uniqueId, categoryId: req.body.categoryId }, { $pull: { categoryUsers: req.userId } }, { new: true }, (pullError, pulled) => {
                                if (pullError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else {
                                    wishListModel.findOneAndRemove({ _id: wishData._id }, (removeError, removed) => {
                                        if (removeError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Mart removed from wishlist successfully." })
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
            res.send({ responseCode: 500, responseMessage: "Something went wrong." })
        }
    },


    // addMartToWishList: (req, res) => {
    //     try {
    //         console.log('i am here to check req>>>>>>', req.body)
    //         userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, result) => {
    //             console.log("I am Sender", error, result)
    //             if (error) {
    //                 res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //             }
    //             else if (!result) {
    //                 res.send({ responseCode: 404, responseMessage: "Data not found" })
    //             }
    //             else {
    //                 martModel.findOne({ _id: req.body.martId, status: "ACTIVE" }, (error2, result2) => {
    //                     if (error2) {
    //                         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                     }
    //                     else if (!result2) {
    //                         res.send({ responseCode: 404, responseMessage: "Data not found" })
    //                     } else {
    //                         if (req.body.wishType == true) {
    //                             console.log("I am here")
    //                             wishListModel.findOne({ userId: req.userId, martId: req.body.martId }, (error3, result3) => {
    //                                 console.log(result3, error3)
    //                                 if (error3) {
    //                                     res.send({ responseCode: 500, responseMessage: "Internal server error." })
    //                                 }
    //                                 else if (result3) {
    //                                     res.send({ responseCode: 402, responseMessage: "Already favourite." })
    //                                 }
    //                                 else {
    //                                     var data = {
    //                                         userId: req.userId,
    //                                         martId: result2._id,
    //                                         martName: result2.martName,
    //                                         martImage: result2.images
    //                                     }
    //                                     var newWishlist = new wishListModel(data)
    //                                     newWishlist.save((saveError, savedData) => {
    //                                         console.log(saveError)
    //                                         if (saveError) {
    //                                             res.send({ responseCode: 500, responseMessage: "Internal server error." })
    //                                         }
    //                                         else {
    //                                             res.send({ responseCode: 200, responseMessage: "Mart added to wishlist successfully.", savedData })
    //                                         }
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                         else if (req.body.wishType == false) {
    //                             wishListModel.findOneAndDelete({ userId: req.userId, martId: req.body.martId }, (deleteError, deleted) => {
    //                                 if (deleteError) {
    //                                     res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //                                 }
    //                                 else if (!deleted) {
    //                                     res.send({ responseCode: 404, responseMessage: "Data not found" })
    //                                 }
    //                                 else {
    //                                     res.send({ responseCode: 200, responseMessage: "Mart removed from wishlist successfully." })
    //                                 }
    //                             })
    //                         }
    //                         else {
    //                             res.send({ responseCode: 401, responseMessage: "Parameter Missing." })
    //                         }
    //                     }
    //                 })
    //             }
    //         })

    //     }
    //     catch{
    //         console.log("I am Error")
    //         res.send({ responseCode: 500, responseMessage: "Internal server error" })
    //     }
    // },

    addCategoryToWishList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (userDataError, userData) => {
                if (userDataError) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!userData) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    wishListModel.findOne({ categoryId: req.body.categoryId, userId: req.userId }, (wihError, wishData) => {
                        if (wihError) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (!wishData) {
                            retailerCouponModel.findOneAndUpdate({ _id: req.body.uniqueId, categoryId: req.body.categoryId, status: "ACTIVE" }, { $addToSet: { categoryUsers: req.userId } }, { new: true }, (retailerError, retailerData) => {
                                if (retailerError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else {
                                    console.log("LLLOOO", retailerData)
                                    var obj = {
                                        userId: userData._id,
                                        categoryId: retailerData.categoryId,
                                        uniqueId: req.body.uniqueId,
                                        type: "CATEGORY",
                                        categoryName: retailerData.categoryName,
                                        categoryImage: retailerData.image,
                                        categoryUsers: retailerData.categoryUsers
                                    }
                                    var wishSave = new wishListModel(obj)
                                    wishSave.save((saveError, savedData) => {
                                        if (saveError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Category Added to wishlist successfully." })
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            retailerCouponModel.findOneAndUpdate({ _id: req.body.uniqueId, categoryId: req.body.categoryId }, { $pull: { categoryUsers: req.userId } }, { new: true }, (pullError, pulled) => {
                                if (pullError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else {
                                    wishListModel.findOneAndRemove({ _id: wishData._id }, (removeError, removed) => {
                                        if (removeError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Category removed from wishlist successfully." })
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
            res.send({ responseCode: 500, responseMessage: "Something went wrong." })
        }
    },


    addSubCategoryToWishList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId }, (userDataError, userData) => {
                if (userDataError) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!userData) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    subCategoryModel.findOneAndUpdate({ _id: req.body.subCategoryId, status: "ACTIVE" }, { $addToSet: { users: req.userId } }, { new: true }, (retailerError, retailerData) => {
                        if (retailerError) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (!retailerData) {
                            res.send({ responseCode: 404, responseMessage: "Data not found" })
                        }
                        else {
                            wishListModel.findOne({ subCategoryId: req.body.subCategoryId, userId: userData._id }, (wihError, wishData) => {
                                if (wihError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else if (!wishData) {
                                    var obj = {
                                        userId: userData._id,
                                        categoryId: retailerData.categoryId,
                                        subCategoryId: retailerData._id,
                                        type: "SUBCATEGORY",
                                        subCategoryName: retailerData.subCategoryName,
                                        subCategoryImage: retailerData.image,
                                        users: retailerData.users
                                    }
                                    var wishSave = new wishListModel(obj)
                                    wishSave.save((saveError, savedData) => {
                                        if (saveError) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Sub Category Added to wishlist successfully." })
                                        }
                                    })
                                }
                                else {
                                    subCategoryModel.findOneAndUpdate({ _id: req.body.subCategoryId }, { $pull: { users: req.userId } }, { new: true }, (pullEoor, pulled) => {
                                        if (pullEoor) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        }
                                        else {
                                            wishListModel.findOneAndRemove({ _id: wishData._id }, (removeError, removed) => {
                                                if (removeError) {
                                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Sub Category removed from wishlist successfully." })
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
            res.send({ responseCode: 500, responseMessage: "Something went wrong." })
        }
    },

    getWishLists: (req, res) => {
        // console.log('i am here to chec/k req>>>>>>', req.body)
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, result) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    const ID = result._id.toString();
                    userModel.find({ favourites: { $all: [ID] } }, (error1, result1) => {
                        console.log("I am list", error, result1)
                        if (error1) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (result1.length == 0) {
                            res.send({ responseCode: 404, responseMessage: "Data not found" })
                        }
                        else {
                            martModel.find({ favourites: { $all: [ID] } }, (martError, mart) => {
                                if (martError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else if (!mart) {
                                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                                }
                                else {
                                    categoryModel.find({ favourites: { $all: [ID] } }, (categoryError, category) => {
                                        if (categoryError) {
                                            res.send({ responseCode: 404, responseMessage: "Internal server error" })
                                        }
                                        else if (!category) {
                                            res.send({ responseCode: 404, responseMessage: "Data not found" })
                                        }
                                        else {
                                            subCategoryModel.find({ favourites: { $all: [ID] } }, (subCatError, subCategory) => {
                                                if (subCatError) {
                                                    res.send({ responseCode: 404, responseMessage: "Internal server error" })
                                                }
                                                else if (!subCategory) {
                                                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Wishlist found successfully", result, mart, category, subCategory })
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
            throw error
        }
    },


    viewWebsite: (req, res) => {
        try {
            websiteModel.find({ websiteStatus: "APPROVED" }, (error, website) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                }
                else if (!website) {
                    res.send({ responseCode: 404, responseMessage: "Data not found" })
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Websites found successfully." })
                }
            })
        }
        catch (error) {
            throw error
        }
    },

    viewWebsites: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    websiteModel.findOne({ retailerId: req.params.retailerId }, async (martError, martFound) => {
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


    notificationList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var query = { status: "ACTIVE", userId: req.userId }
                    notificationModel.find(query, (notifiError, notification) => {
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

    clearNotifications: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "USER" }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    notificationModel.update({ userId: req.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
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





    contactUs: (req, res) => {
        try {
            configurationModel.findOne({ configType: "GENERAL" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    commonFunction.sendEmailSNS(req.body.email, req.body.subject, req.body.name, req.body.description, (mailError, Mail) => {
                        if (mailError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "ContactUs Email sent successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            throw error
        }
    },

    testEmail: (req, res) => {
        console.log(req.body.email)
        commonFunction.sendEmailSNS(req.body.email, "Test", "I am here", (error, result) => {
            console.log(error, result)
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Error", error })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "DONE", })
            }
        })
    }
}


function getWebsiteImage(req) {
    return new Promise((resolve, reject) => {
        console.log("REEEQQQQ", req)
        websiteModel.findOne({ retailerId: req }, (error, results) => {
            if (error) {
                console.log("Error finding website")
            }
            else if (!results) {
                console.log("No website found.")
            }
            else {
                resolve(results.webSiteImages[0])
            }
        })
    })
}


