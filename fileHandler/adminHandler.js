const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var func = require('../fileHandler/function.js');
var bcrypt = require('bcryptjs');
var config = require("../config/config");
var cloudinary = require('cloudinary');
var each = require('async-each-series');
var userSchema = require('../models/user')
var User = require('../models/user.js')
var Post = require('../models/postSchema.js')
var Follow = require('../models/followSchema.js')
var Retweet = require('../models/retweetSchema.js')
var Like = require('../models/likeSchema.js')
var Comment = require('../models/commentSchema.js')
var Bookmark = require('../models/bookmarksSchema.js')
var Viewpost = require('../models/viewpostSchema.js')
var Search = require('../models/searchSchema.js')
var staticModel = require('../models/staticContentSchema.js')
var Notification = require('../models/notificationSchema.js')
var Report = require('../models/reportSchema.js')
var Share = require('../models/shareSchema')
const saltRounds = 10;
var salt = bcrypt.genSaltSync();
var nodemailer = require('nodemailer')
var apn = require("apn");
var FCM = require('fcm-push');
var options = {
    "cert": "MobiloitteEnterpriseDistribution.pem",
    "key": "MobiloitteEnterpriseDistribution.pem",
    "passphrase": "Mobiloitte1",
    "gateway": "gateway.sandbox.push.apple.com",
    "port": 2195,
    "enhanced": true,
    "cacheLength": 5,
    production: true
};
// cloudinary.config({
//     cloud_name: "sumit9211",
//     api_key: "885582783668825",
//     api_secret: "0dT6FoxdcGb7UjTKtUGQbAVdOJI"
// });
cloudinary.config({
    cloud_name: "xplanator",
    api_key: "797484853721961",
    api_secret: "8e237pABTTEXc4-NvM1_6gNU9oY"
});


var Jimp = require("jimp");
var fs = require('fs');
var QrCode = require('qrcode-reader');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode')
var bodyParser = require('body-parser')



//============Nexmo==========//
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'aee1c95a',
    apiSecret: '7S9oBInUQHYRf6Qf',
}, { debug: true });

module.exports = {
//=====================================Login====================================================//
    adminLogin: (req, res) => {
        if(!req.body.email || !req.body.password || !req.body.role){
            return res.send({ response_code: 501, response_message: "All fields are requied." })
        }else{
            User.findOne({ email: req.body.email}, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!result) {
                    return res.send({ response_code: 500, response_message: "Email is not correct." })
                }
                else if (result && (result.role != req.body.role)) {
                    return res.send({ response_code: 500, response_message: "Only administrator login." })
                }
                else{
                    var result1 = bcrypt.compareSync(req.body.password, result.password);
                    if(result1){
                        var jwtToken = jwt.sign({ "email": req.body.email }, config.jwtSecretKey);
                        User.findOneAndUpdate({ _id: result._id }, { $set: { "jwtToken": jwtToken } }, { new: true }, (error2, result2) => {
                        if(error2){
                            return res.send({ response_code: 500, response_message: "Internal server error" })
                        }else{
                            return res.send({ response_code: 200, response_message: "Admin login successfully", Data: result2 })
                        }
                        });
                    }else{
                        return res.send({ response_code: 500, response_message: "Password is not correct." })
                    }
                }
            });
        }
    },
    //================================================userList====================================================//
    userList: (req, res) => {
        if(!req.body.userId){
            return res.send({ response_code: 501, response_message: "UserId is requied." })
        }else{
             let query = {};
             query.$and = []
             let query1={}
        
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
            }

            if (req.body.fromDate && req.body.toDate)
                    query.$and.push({
                        'createdAt': {
                            $gte: req.body.fromDate,
                            $lte: req.body.toDate
                        }
                    })
                if (req.body.search)
                {
                    query1.$or=[];
                    query1.$or.push({  'username': {
                            $regex: req.body.search,
                            $options: 'i'
                        }
                       })
                         query1.$or.push({
                        'name': {
                            $regex: req.body.search,
                            $options: 'i'
                        }
                    }) 
                       query1.$or.push({
                        'email': {
                            $regex: req.body.search,
                            $options: 'i'
                        }
                    })    
                }

                 
                query.$and.push(query1); 
                query.$and.push( {  'role': '2' })
            User.paginate(query,options, (error, result) => {
                if(error){
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }else{
                    return res.send({ response_code: 200, response_message: "User list fetch successfully.", Data: result })
                }
            });
        }
    },


   emailChange: (req, res) => {
    if(!req.body.userId || !req.body.email){
        return res.send({ response_code: 501, response_message: "All field are requied." })
    }else{
        User.findOne({ _id: req.body.userId }, (err, result) => {
            if(err){
                return res.send({ response_code: 500, response_message: "Internal server error." })
            }else if(!result){
                return res.send({ response_code: 400, response_message: "User not found." })
            }else{
                var query = {
                            $and: [{
                                email: req.body.email         
                            }, {
                                '_id': {
                                    $ne: req.body.userId
                                }
                            }]
                        }
            User.findOne(query, (err, result) => {
            if(err){
                return res.send({ response_code: 500, response_message: "Internal server error." })
            }else if(result){
                 return res.send({ response_code: 400, response_message: "Email already exist." })
            }else{
              User.findByIdAndUpdate({ "_id": req.body.userId }, { $set: { "email": req.body.email} },{ new:true }, (error1, result1) => {
            if(error1){
                return res.send({ response_code: 500, response_message: "Internal server error." })
            }else{
                return res.send({ response_code: 200, response_message: "You email updated successfully." })
            }
            
            })
        }
    })
    }
})
}
}, 

    //================================================postList====================================================//
    postList: (req, res) => {
        if (!req.body.userId) {
            return res.send({ response_code: 500, response_message: "UserId is required." })
        } else {
        let query = {};
         query.$and = []
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                populate: {
                    path: "userId",
                    select: 'name username profilePic follower'
                },
               
            }
            if (req.body.fromDate && req.body.toDate)
                    query.$and.push({
                        'createdAt': {
                            $gte: req.body.fromDate,
                            $lte: req.body.toDate
                        }
                })

                if (req.body.search)
                    query.$and.push({
                        'videoTitle': {
                            $regex: req.body.search,
                            $options: 'i'
                        }
                    })

           if(!req.body.fromDate && !req.body.toDate && !req.body.search )
             query ={}

            Post.paginate(query, options, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (result.length < 1) {
                    return res.send({ response_code: 500, response_message: "Data not found." })
                }
                else {
                    res.send({ response_code: 200, response_message: "Post list fetch successfully.", result })
                }
            })

        }
    },
    //=========================================Get User Data=======================================================//
    getUserDetail: (req, res) => {
        if (!req.body.userId) {
            return res.send({ response_code: 401, response_message: "User Id is required" })
        }
        else {
            User.findOne({ "_id": req.body.userId }, (error, result) => {
                if (error) {
                    console.log("Error is============>", error)
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!result) {
                    console.log("User Id is not correct")
                    return res.send({ response_code: 500, response_message: "User Id is not correct" })
                }
                else {
                    console.log("User data found successfully", result)
                    return res.send({ response_code: 200, response_message: "User data found successfully", Data: result })
                }
            })
        }
    },

    //=======================================post DetailList=======================================//
    getPostDetail: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({ response_code: 500, response_message: "All Fields are required." })
        } else {
            let options = {
                populate: {
                    path: "userId",
                    select: 'name username profilePic follower'
                }
            }
            Post.findOne({ "_id":req.body.postId }).populate('userId'). exec(function (error, result) {
                console.log(result)
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (result.length < 1) {
                    return res.send({ response_code: 500, response_message: "Post not found." })
                }
                else {
                    res.send({ response_code: 200, response_message: "Post detail fetch successfully.", result })
                }
            })

        }
    },

    //=======================================logout=======================================//
    logout: (req, res) => {
        if (!req.body.userId) {
            return res.send({ response_code: 401, response_message: "UserId is required" })
        }
        else {
            User.findOne({ "_id": req.body.userId }, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!result) {
                    res.send({ response_code: 404, response_message: "User Id is not correct" })
                }
                else {
                    User.findByIdAndUpdate({ "_id": req.body.userId }, { $set: { "jwtToken": "" } }, (error1, result1) => {
                        if (error1) {
                            return res.send({ response_code: 500, response_message: "Internal server error" })
                        }
                        else {
                            return res.send({ response_code: 200, response_message: "Admin logout successfully." })
                        }
                    })
                }
            })
        }

    },

    //=======================================updatePostStatus=======================================//
    updatePostStatus: (req, res) => {
        if (!req.body.userId || !req.body.postId || !req.body.status) {
            return res.send({ response_code: 401, response_message: "All fields are required" })
        }
        else {
            Post.findOne({ "_id": req.body.postId }, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (!result) {
                    res.send({ response_code: 404, response_message: "PostId is not correct." })
                }
                else {
                    if(req.body.status == 'INACTIVE'){
                        var time = new Date()
                    }else{
                        var time = '';
                    }
                    Post.findByIdAndUpdate({ "_id": req.body.postId }, { $set: { "status": req.body.status,"actionTime": time } }, (error1, result1) => {
                        if (error1) {
                            return res.send({ response_code: 500, response_message: "Internal server error." })
                        }
                        else {
                            return res.send({ response_code: 200, response_message: "Post status changed successfully." })
                        }
                    })
                }
            })
        }

    },

    //=======================================updateUserStatus=======================================//
    updateUserStatus: (req, res) => {
        if (!req.body.userId || !req.body.status) {
            return res.send({ response_code: 401, response_message: "All fields are required" })
        }
        else {
            User.findOne({ "_id": req.body.userId }, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (!result) {
                    res.send({ response_code: 404, response_message: "userId is not correct." })
                }
                else {
                    User.findByIdAndUpdate({ "_id": req.body.userId }, { $set: { "status": req.body.status } }, (error1, result1) => {
                        if (error1) {
                            return res.send({ response_code: 500, response_message: "Internal server error." })
                        }
                        else {
                            return res.send({ response_code: 200, response_message: "User status changed successfully." })
                        }
                    })
                }
            })
        }

    },
    //==========================================Password Change===================================================//

    passwordChange: (req, res) => {
        if (!req.body.newPassword || !req.body.userId || !req.body.password) {
            return res.send({ response_code: 401, response_message: "All fields are required." })
        }
        else {
            User.findOne({ _id: req.body.userId }, (err, result) => {
            if(err){
                return res.send({ response_code: 500, response_message: "Internal server error." })
            }else if(!result){
                return res.send({ response_code: 400, response_message: "User not found." })
            }else if(!(bcrypt.compareSync(req.body.password, result.password))){
                console.log("not")
                return res.send({ response_code: 401, response_message: "Old password is wrong." })
            }else{
                req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)
                User.findByIdAndUpdate({ "_id": req.body.userId }, { $set: { "password": req.body.newPassword } }, { new: true }, (error1, result1) => {
                    if (error1) {
                        return res.send({ response_code: 500, response_message: "Internal server error." })
                    }else {
                        console.log("Password updated successfully")
                        return res.send({ response_code: 200, response_message: "Password updated successfully." })
                    }
        
                })
            }
        
        })
    }
    },
    //==========================================totalCount===================================================//
    totalCount: (req, res) => {
        if (!req.body.userId) {
            return res.send({ response_code: 401, response_message: "UserId is required" })
        }
        else {
            User.findOne({ "_id": req.body.userId }, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (!result) {
                    return res.send({ response_code: 500, response_message: "UserId is not correct" })

                }
                else {
                    Like.find({ "status": 'LIKE' }, (error1, result1) => {
                        if (error1) {
                            return res.send({ response_code: 500, response_message: "Internal server error" })
                        }
                        else {
                            User.find({"role": '2'}, (error2, result2) => {
                                if (error2) {
                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                }
                                else {
                                    Post.find({"status": 'ACTIVE' }, (error3, result3) => {
                                        if (error3) {
                                            return res.send({ response_code: 500, response_message: "Internal server error" })
                                        }
                                        else {
                                            User.find({ "status": 'ACTIVE',"role": '2' }, (error4, result4) => {
                                                if (error4) {
                                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                                }
                                                else {
                                                    User.find({ "status": 'INACTIVE',"role": '2' }, (error5, result5) => {
                                                        if (error5) {
                                                            return res.send({ response_code: 500, response_message: "Internal server error" })
                                                        }
                                                        else {
                                                            Report.find({}, (error6, result6) => {
                                                                if (error6) {
                                                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                                                } else{
                                                                  Post.find({"status": 'ACTIVE' }, (error7, result7) => {
                                                                    if (error7) {
                                                                        return res.send({ response_code: 500, response_message: "Internal server error" })
                                                                    }else{
                                                                           var sumRate = 0;
                                                                           var sumDuration = 0;
                                                                           for (var i = 0; i < result7.length; i++) {
                                                                              if(result7[i].videoSize)
                                                                               sumRate = sumRate + result7[i].videoSize;
                                                                              if(result7[i].duration)
                                                                               sumDuration = sumDuration + Number(result7[i].duration); 
                                                                           }
                                                                          
                                                                          var VideoDurationData =  func.hoursFormat(sumDuration);
                                                                          console.log("Sum rate===========",VideoDurationData);
                                                                          var videoSizeDetail = (Number(sumRate)/1000000);
                                                                          var VideoSizeData = Number(videoSizeDetail).toFixed(6);
                                                                          var obj = { "Like": result1.length, "User": result2.length, "Post": result3.length, "ActiveUser": result4.length, "InactiveUser": result5.length,"Report": result6.length ,"videoDuration": VideoDurationData,"videoSize": VideoSizeData }
                                                                          return res.send({ response_code: 200, response_message: "Collection found", obj })
                                                                    }   
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
                    })
                }
            })
        }
    },
    //=====================================delete User=======================================//
    deleteUser: (req, res) => {
        if(!req.body.userId){
            return res.send({ response_code: 500, response_message: "All fields are required." })
        }else{
            User.findOne({ "_id": req.body.userId }, (error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (!result) {
                    return res.send({ response_code: 500, response_message: "User Id is not correct." })

                }
                else {
                    Post.remove({ "userId": req.body.userId }, (error1, result1) => {
                        if (error1) {
                            return res.send({ response_code: 500, response_message: "Internal server error." })
                        }else {
                            Like.remove({ "likeBy": req.body.userId }, (error3, result3) => {
                                if (error3) {
                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                }
                                else {
                                    Comment.remove({ "commentBy": req.body.userId }, (error4, result4) => {
                                        if (error4) {
                                            return res.send({ response_code: 500, response_message: "Internal server error" })
                                        }
                                        else {
                                            Bookmark.remove({ "bookMarkerId": req.body.userId }, (error5, result5) => {
                                                if (error5) {
                                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                                }
                                                else {
                                                    Retweet.remove({ "retweeterId": req.body.userId }, (error6, result6) => {
                                                        if (error6) {
                                                            return res.send({ response_code: 500, response_message: "Internal server error" })
                                                        }
                                                        else {
                                                            Viewpost.remove({ "viewBy": req.body.userId }, (error7, result7) => {
                                                                if (error7) {
                                                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                                                }
                                                                else {
                                                                    Report.remove({ "reportBy": req.body.userId }, (error9, result9) => {
                                                                        if (error9) {
                                                                            return res.send({ response_code: 500, response_message: "Internal server error" })
                                                                        }
                                                                        else {
                                                                            User.findByIdAndRemove({ "_id": req.body.userId }, (error8, result8) => {
                                                                                if (error8) {
                                                                                    return res.send({ response_code: 500, response_message: "Internal server error" })
                                                                                }
                                                                                else {
                                                                                    return res.send({ response_code: 200, response_message: "User deleted successfully." })
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
                    })
                }
            })
        }
        
    },
    //=====================================delete Post=======================================//
    deletePost: (req, res) => {
            if(!req.body.userId || !req.body.postId){
                return res.send({ response_code: 500, response_message: "All fields are required." })
            }else{
                User.findOne({ "_id": req.body.userId }, (error, result) => {
                    if (error) {
                        return res.send({ response_code: 500, response_message: "Internal server error1." })
                    }
                    else if (!result) {
                        return res.send({ response_code: 500, response_message: "User Id is not correct." })
                    }
                    else {
                        Post.findOne({ "_id": req.body.postId }, (error1, result1) => {
                            if (error1) {
                                return res.send({ response_code: 500, response_message: "Internal server error2." })
                            }
                            else if (!result1) {
                                return res.send({ response_code: 500, response_message: "Post Id is not correct." })
                            }
                            else {
                                Like.remove({ "postId": req.body.postId }, (error3, result3) => {
                                    if (error3) {
                                     return res.send({ response_code: 500, response_message: "Internal server error3" })
                                    }
                                    else {
                                        Comment.remove({ "postId": req.body.postId }, (error4, result4) => {
                                            if (error4) {
                                                return res.send({ response_code: 500, response_message: "Internal server error4" })
                                            }
                                            else {
                                                Bookmark.remove({ "postId": req.body.postId }, (error5, result5) => {
                                                    if (error5) {
                                                        return res.send({ response_code: 500, response_message: "Internal server error5" })
                                                    }
                                                    else {
                                                        Retweet.remove({ "postId": req.body.postId }, (error6, result6) => {
                                                            if (error6) {
                                                                return res.send({ response_code: 500, response_message: "Internal server error6" })
                                                            }
                                                            else {
                                                                Viewpost.remove({ "postId": req.body.postId }, (error7, result7) => {
                                                                    if (error7) {
                                                                        return res.send({ response_code: 500, response_message: "Internal server error7" })
                                                                    }
                                                                    else {
                                                                        Report.remove({ "postId": req.body.postId }, (error9, result9) => {
                                                                            if (error9) {
                                                                                return res.send({ response_code: 500, response_message: "Internal server error8" })
                                                                            }
                                                                            else {
                                                                                Post.findByIdAndRemove({ "_id": req.body.postId }, (error8, result8) => {
                                                                                    if (error8) {
                                                                                        return res.send({ response_code: 500, response_message: "Internal server error9" })
                                                                                    }
                                                                                    else {
                                                                                        Post.find({ "userId": req.body.userId }, (error7, result7) => {
                                                                                            if(error7){
                                                                                                return res.send({ response_code: 500, response_message: "Internal server error10" })
                                                                                            }else{
                                                                                                User.findByIdAndUpdate({ "_id": req.body.userId }, { $set: { "post": result7.length} }, { new: true }, (error9, result9) => {
                                                                                                    if(error9){
                                                                                                        return res.send({ response_code: 500, response_message: "Internal server error11" })
                                                                                                    }else{
                                                                                                        console.log("Post video deleted successfully", result9)
                                                                                                        res.send({ response_code: 200, response_message: "Post video deleted successfully.", Data: result9 });
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
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            
    },

//=====================================Get All report=======================================//
    reportList: (req, res) => {
        if (!req.body.userId) {
            console.log("Fields are required")
            return res.send({ response_code: 500, response_message: "Fields are required" })
        } else {
            var aggregate = Post.aggregate([
                {
                    $match: { 'report' :  { $regex: req.body.search, $options: 'i' } },
                },
               
                {
                    "$project": {
                        _id: 1,
                        report: 1,
                        reportBy: 1,
                        postId: 1,
                        createdAt: 1,
                        createdAt1: 1,
                    
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                    
                        "report": { "$first": "$report" },
                        "reportBy": { "$first": "$reportBy" },
                        "postId": { "$first": "$postId" },
                        "createdAt": { "$first": "$createdAt" },
                        "createdAt1": { "$first": "$createdAt1" }
                        
                    }
                },
                {
                    $lookup:
                    {
                        from: "user",
                        localField: "reportBy",
                        foreignField: "_id",
                        as: "userData"
                    }
                },
                {
                    $lookup:
                    {
                        from: "post",
                        localField: "postId",
                        foreignField: "_id",
                        as: "postData"
                    }
                }

            ])

            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: { createdAt1: -1 },
            }
            Report.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                if (err) {
                    console.log("Error  is============>", err)
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                } else {
                    let data = {
                        result: success,
                        page: options.page,
                        limit: options.limit,
                        pages: pages,
                        total: total
                    }
                    console.log('dddddddddddddd====>',data)
                    res.send({ response_code: 200, response_message: "Post found", data })
                }
            })


        }
    },

//================================================reportDetail====================================================//
    reportDetail: (req, res) => {
        if (!req.body.userId || !req.body.reportId) {
            return res.send({ response_code: 500, response_message: "All fields are required." })
        } else {
            Report.find({'_id':req.body.reportId}).populate('reportBy').populate('postId').exec((error, result) => {
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error." })
                }
                else if (result.length < 1) {
                    return res.send({ response_code: 500, response_message: "Data not found." })
                }
                else {
                    res.send({ response_code: 200, response_message: "Report detail fetch successfully.", result })
                }
            })

        }
    },

    //=====================================delete Report=======================================//

    deleteReport: (req, res) => {
        if (!req.body.userId || !req.body.reportId) {
            return res.send({ response_code: 500, response_message: "All fields are required" })
        } else {
            Report.findOneAndRemove({ "_id": req.body.reportId }, (error, result) => {    
                if (error) {
                    return res.send({ response_code: 500, response_message: "Internal server error" })
                }
                else if (result.length < 1) {
                    return res.send({ response_code: 400, response_message: "Notification id not found" })
                }
                else {
                    res.send({ response_code: 200, response_message: "Report deleted successfully." })
                }
            })
        }
    },


//==============================Particular content get=========================================//

'staticContentGet':(req,res)=>{
        console.log("You are in static content by Id api...")
        console.log("Request is==========>",req.body);
        if (!req.body.type) {
            console.log("All fields are required")
            return res.send({ response_code: 401, response_message: "All fields are required" })
        }
        else {
        staticModel.findOne({"Type":req.body.type},(error,result)=>{
            if(error){
                console.log("Error is=========>",error);
                return res.send({response_code:500,response_message:"Internal server error"})
            }
            else if(!result){
                console.log("Type is not correct");
                return res.send({ response_code: 500, response_message: "Type is not correct" })
            }
            else{
                console.log("Result is=========>",result);
                res.send({response_code:200,response_message:"Data found successfully",Data:result})

            }
        })
    }
    },

    StaticContentUpdate : (req, res) => {
        if (req.body.type == 'TermCondition') {
            var obj = { $set: {"description": req.body.description } }
        }
        if (req.body.type == 'PrivacyPolicy') {
            var obj = { $set: {"description": req.body.description } }        
        }
        staticModel.findOneAndUpdate({ "Type": req.body.type }, obj, { new: true },(error, result) => {
        if (error) {
             return res.send({ responseCode: 500, responseMessage: "Internal server error." })
        }
        else if (!result) {
             return res.send({ responseCode: 404, responseMessage: "No data found" })
        }
        else {
            res.send({ responseCode: 200, responseMessage: "Static content updated successfully.", Data: result })
            
        }
        
    })
        
 },




}