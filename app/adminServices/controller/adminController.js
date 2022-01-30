/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const USER = require("../../userServices/model/userModel"); // import user model to perform crud operation
const POST = require("../../postService/model/postModel")
const COMMENT= require("../../commentService/model/commentModel")
const REPORT = require("../../reportService/model/reportModel")
const MOMENT = require('moment');
const ASYNC = require('async');
const fs = require("fs");// fs import to read/write file 
const multer = require("multer");// for file save on server
const dir = "./uploads/images/";// declare path of upload dir on server
const mongoose = require("mongoose");// set rules for mongoose id
const jwt = require("jsonwebtoken");
const duration = "1d";// set expiery time of token
const bcrypt = require("bcrypt");// bcrypt for encryption of password
const constant = require("../../../helpers/constant"); // some constant value 
const crypto = require("crypto");// bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
  .setResponseObject;
const _admin = {};

//multer
var storage = multer.diskStorage({
    /* destination*/
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime().toString() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage }).single("profileImg");


_admin.userList = async(req, res, next)=>{
    try{
        if(req.role !== 2 && req.role !== 1 ){
          throw {message:responseMessage.UNAUTHORIZED}
        }else{ 
            let pageNo = parseInt(req.query.pageNo) || 1;//set page no. if not exist then set to 1
            let pageSize = parseInt(req.query.pageSize) || 10;// set page Limit or default set to 10
            if (pageNo <= 0) {// throw error for invalid page no
                throw { message: responseMessage.PAGE_INVALID };
            }
            let email = req.query.search ? req.query.search : "";
            let userName = req.query.search ? req.query.search : "";
            let firstName = req.query.search ? req.query.search : "";
            let lastName = req.query.search ? req.query.search : "";
            
            let userList  = await USER.aggregate([
                {$match:
                    {
                        $and:[
                            { 
                                $or : 
                                [ 
                                    {role:{$ne:1}},
                                    {role:{$ne:2}}
                                ]
                            },
                        {
                            $or:[
                            {
                                email:{$regex: new RegExp(email, "i")},
                            },
                            {
                                userName:{$regex: new RegExp(userName, "i")},
                            },
                            {
                                firstName:{$regex: new RegExp(firstName, "i")},
                            },
                            {
                                lastName:{$regex: new RegExp(lastName, "i")},
                            }
                            ]
                        }
                    ]
                }
                },
                {
                    $project:{
                        _id:1,
                        profileImg:1,
                        firstName:1,
                        lastName:1,
                        email:1,
                        birthday:1,
                        gender:1,
                        userName:1,
                        phoneNo:1, 
                        countryCode:1, 
                        emailVerified:1, 
                        otpVerified:1, 
                        active:1, 
                        createdAt:1, 
                        updatedAt:1,
                        sPage:1,
                        badgeStatus:1
                    }
                },
                {
                $facet: {
                    data: [
                    { $sort: { createdAt: -1 } },
                    { $skip: pageSize * (pageNo - 1) },
                    { $limit: pageSize },
                    ],
                    count: [
                    {
                        $count: "count",
                    },
                    ],
                },
                },
                {
                $project:{
                    "data":"$data",
                    count:{ $arrayElemAt: [ "$count.count", 0 ] }
                }
            } 
            ]);
            await setResponseObject(req, true, responseMessage.RECORDFOUND, userList);
            next();
        }
    }catch(err){
        // throw exception message
        await setResponseObject(req, false, err.message?err.message:responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

_admin.adminList = async(req, res, next)=>{
    try{
        let pageNo = parseInt(req.query.pageNo) || 1;//set page no. if not exist then set to 1
        let pageSize = parseInt(req.query.pageSize) || 10;// set page Limit or default set to 10
        if (pageNo <= 0) {// throw error for invalid page no
            throw { message: responseMessage.PAGE_INVALID };
        }
        if (req.role!==2){
            throw {message:responseMessage.UNAUTHORIZED}
        }
        let count = await USER.find({role:1}).countDocuments()
        let result = await USER.find({role:1})
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdAt: -1 })
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result,count
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}

//Seller List for Admin Panel

_admin.SellerList=async(req,res)=>{
    try {
        let pageNo = parseInt(req.query.pageNo) || 1;//set page no. if not exist then set to 1
        let pageSize = parseInt(req.query.pageSize) || 10;// set page Limit or default set to 10
        if (pageNo <= 0) {// throw error for invalid page no
            throw { message: responseMessage.PAGE_INVALID };
        }
        let filter = {$or:[{isSeller:true},{role:3}]};
        if (req.query.search) {
            filter = {...filter,
                $or:[
                    {firstName: { $regex: req.query.search ? req.query.search : "", $options: 'i' }},
                    {lastName: { $regex: req.query.search ? req.query.search : "", $options: 'i' }},
                    {userName: { $regex: req.query.search ? req.query.search : "", $options: 'i' }},
                    {email: { $regex: req.query.search ? req.query.search : "", $options: 'i' }},

                ]
            };
        }
        console.log(req.role,"-----");
        if (req.role!==2 && req.role!==1){
            res.status(400).send({
                success:false,
                message:responseMessage.UNAUTHORIZED
            })
        }
        let count = await USER.find(filter).countDocuments()
        let result = await USER.find(filter)
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ updatedAt: -1 })
        res.status(200).send({
            success:true,
            message:responseMessage.DATA_FOUND,
            data:result,count
        })
    }catch(error){
        res.status(400).send({
            success:false,
            message:responseMessage.SOMETHING_WRONG
        })
    }
}


_admin.deleteUser = async(req, res, next)=>{
    try{
        if(req.role !== 2 && req.role !== 1){
            throw {message:responseMessage.UNAUTHORIZED}
        }else{
            let deleteUser = await USER.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
            if(!deleteUser){
                throw {message:responseMessage.RECORD_NOTFOUND('user record')}
            }else{
                await setResponseObject(req, true, responseMessage.VERIFICATION("record deleted"), "");
                next();
            }
            let criteria= req.params.id
            let findallReportedUser= await REPORT.deleteMany(
                {$or:[{reportedTo:mongoose.Types.ObjectId(criteria)},
                {reportedBy:mongoose.Types.ObjectId(criteria)}]},
                {multi:true}
            )
        }
    }catch(err){
        // throw exception message
        await setResponseObject(req, false, err.message?err.message:responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

//Add Admin by Super Admin
_admin.AddAdmin = async (req, res, next) => {
    try {
        if(req.role!= 2){
            throw {message:responseMessage.UNAUTHORIZED}
        }
      upload(req, res, async (err) => {
        if (err) {
          await setResponseObject(req, false, err.message, "");
          next();
        } else {
          try {
            let data = req.body;
            if (req.file) {
              let image = req.file.path;
              data.profileImg = image;
            }
            // create random string for sign token
            let signtoken = crypto.randomBytes(constant.cryptkn).toString("hex");
            if (data.password) {
              let hash = await bcrypt.hash( // password cncrypt
                data.password,
                parseInt(process.env.SALT_ROUNDS)
              );
              data.password = hash;
            }
            data.otpVerified=true,
            data.active=true,
            data.emailVerified=true
            let saveUser = await new USER(data).save();
            let token_Data = {
              email: saveUser.email,
              _id: saveUser._id,
              role: saveUser.role,
              userName: saveUser.userName,
            };
            let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
              expiresIn: duration, // expires in 24 hours
            });
            if (saveUser) {
              await setResponseObject(req, true, responseMessage.VERIFICATION('Admin Added'), { token, saveUser });
              next();
            }
          } catch (err) {
            let keyError = "";
            err.keyPattern.userName ? keyError = responseMessage.ALREADYEXIST('userName') : err.keyPattern.email ?
              keyError = responseMessage.ALREADYEXIST('email') : err.keyPattern.phoneNo ? keyError = responseMessage.ALREADYEXIST('phone') : responseMessage.SOMETHING_WRONG
            await setResponseObject(req, false, keyError, "");
            next();
          }
        }
      });
    } catch (err) {
      // throw exception message
      await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
      next();
    }
  };

//Dashboard
_admin.dashboard= async(req, res)=>{
    try {
        if(req.role !== 2 && req.role !== 1){
            throw {message:responseMessage.UNAUTHORIZED}  
        }
        let activeUser= await USER.countDocuments({active:true})
        let blockUser= await USER.countDocuments({active:false})
        let countUser= await USER.countDocuments()
        let countPost= await POST.countDocuments()
        let countComment= await COMMENT.countDocuments()
        res.send({
            status:200,
            success:true,
            message:responseMessage.DATA_FOUND,
            data:countUser,blockUser,activeUser,countPost,countComment
        })
        
    } catch (error) {
        await setResponseObject(
            req,
            false, 
            error.message?error.message:responseMessage.SOMETHING_WRONG,
            ""
        )
        
    }
}
_admin.dashboardSeller= async(req, res)=>{
    try {
        if(req.role !== 2 && req.role !== 1){
            throw {message:responseMessage.UNAUTHORIZED}  
        }
        let countSeller= await USER.countDocuments({role:3})
        let activeSeller= await USER.countDocuments({role:3, active:true})
        let InactiveSeller= await USER.countDocuments({role:3, active:false})
        res.send({
            status:200,
            success:true,
            message:responseMessage.DATA_FOUND,
            data:countSeller,activeSeller,InactiveSeller
        })
        
    } catch (error) {
        await setResponseObject(
            req,
            false, 
            error.message?error.message:responseMessage.SOMETHING_WRONG,
            ""
        )
    }
}

//Get All stats for Dashboard
_admin.getAdminStats = (req, res, next) => {
    try {
        // find year from momnet
        let startOfYear = MOMENT(req.body.filterStartDate).startOf('year').toDate();
        let endOfYear = MOMENT(req.body.filterEndDate).endOf('year').toDate();
        // find parallel data using async
        ASYNC.parallel({
            // find total users which is added from start to current time
            totalUserCount: (callback) => {
                USER.aggregate([
                    // {
                    //     // match record with given monthly reocrd
                    //     $match: {
                    //         role: 2
                    //     }
                    // },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // find users which is added in this year
            totalNewUserCount: (callback) => {
                USER.aggregate([{
                        // match record with given monthly reocrd
                        $match: {
                            createdAt: {
                                $gt: startOfYear,
                                $lt: endOfYear
                            },
                            role: 2
                        }
                    },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // find total vendors which is added from start to current time
            totalVendorCount: (callback) => {
                USER.aggregate([{
                        // match record with given monthly reocrd
                        $match: {
                            role: 1
                        }
                    },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // find vendors which is added in this year
            totalNewVendorCount: (callback) => {
                USER.aggregate([{
                        // match record with given monthly reocrd
                        $match: {
                            createdAt: {
                                $gt: startOfYear,
                                $lt: endOfYear
                            },
                            role: 1
                        }
                    },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // find total physcian which is added from start to current time
            totalPhyscianCount: (callback) => {
                USER.aggregate([{
                        // match record with given monthly reocrd
                        $match: {
                            role: 1,
                            type: 2
                        }
                    },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // find physcian which is added in this year
            totalNewPhyscianCount: (callback) => {
                USER.aggregate([{
                        // match record with given monthly reocrd
                        $match: {
                            createdAt: {
                                $gt: startOfYear,
                                $lt: endOfYear
                            },
                            role: 1,
                            type: 1
                        }
                    },
                    {
                        // get record with group by month,year and count
                        $group: {
                            _id: {
                                month: {
                                    $month: "$createdAt"
                                },
                                year: {
                                    $year: "$createdAt"
                                },
                            },
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ], (err, result) => {
                    // if error send error
                    if (err) throw err;
                    callback(err, result);
                })
            },
            // totalSalesByVendors: (callback) => {
            //     ORDER.aggregate([{
            //         // get record with group by month,year and count
            //         $group: {
            //             _id: {
            //                 month: {
            //                     $month: "$createdAt"
            //                 },
            //                 year: {
            //                     $year: "$createdAt"
            //                 },
            //             },
            //             total: {
            //                 $sum: 1
            //             }
            //         }
            //     }], (err, result) => {
            //         if (err) throw err;
            //         callback(err, result);
            //     })
            // }
        }, (err, response) => {
            if (err) { // send error
                HELPER.errorCase(req, RESPONSEMESSAGE.ERROR, err);
            } else { // send success
                HELPER.successCase(req, RESPONSEMESSAGE.RECORDFOUND, response);
            }
            next();
        });


    } catch (err) { // send exception error
        HELPER.errorCase(req, RESPONSEMESSAGE.ERROR, err);
        next();
    }
}

module.exports = _admin;