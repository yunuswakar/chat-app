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
var Tag = require('../models/tagSchema.js')
var Search = require('../models/searchSchema.js')
var staticModel = require('../models/staticContentSchema.js')
var Notification = require('../models/notificationSchema.js')
var userPermissionModel = require('../models/userPermissionModel.js')
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

var commonFunction = require('../commonFile/commonFunction')
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



//============Nexmo===============//
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'aee1c95a',
    apiSecret: '7S9oBInUQHYRf6Qf',
}, {
        debug: true
    });

var ACCOUNT_SID = 'AC148c926c2858695b013756d06c646bb0';
var AUTH_TOKEN = '3794fd3517f66915c23050e635950553';
var twilio = require('twilio');
var client = twilio(ACCOUNT_SID, AUTH_TOKEN);
var fromNumber = '+1 715 997 4721';
module.exports = {

    //============================================Signup====================================================//

    signup: (req, res) => {
        console.log("84>>>>>>>>>>>>", req.body)

        if (!req.body.password || !req.body.email || !req.body.name) {
            return res.send({
                response_code: 501,
                response_message: "All fields are required"
            })
        } else {

            var query = { $and: [{ status: { $ne: "DELETE" } }, { email: req.body.email }] }

            User.findOne(query, (error, result) => {
                console.log("96>>>>>>>>>>>>>", error, result)
                if (error) {

                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (result) {
                    if (result.email == req.body.email) {
                        return res.send({
                            response_code: 400,
                            response_message: "Email already exist"
                        })
                    }
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password, salt)
                    var otp = Math.floor(100000 + Math.random() * 900000);
                    var otp = otp.toString();
                    var number = req.body.countryCode + req.body.mobileNumber;
                    var text = "This is your one time password. Please do not share it " + otp;
                    var from = fromNumber;



                    if (req.body.mobileNumber != '') {
                        console.log(">>>>>>>>121")
                        client.messages.create({ to: number, from: from, body: text }, (error2, result2) => {
                            console.log("123>>>>>>>>", error2, result2)
                            if (error2) {

                                res.send({
                                    response_code: 500,
                                    response_message: "Invalid Phone Number",

                                })
                            }
                            else {
                                let obj = new User({
                                    "name": req.body.name,
                                    "email": req.body.email,
                                    "mobileNumber": req.body.mobileNumber,
                                    "password": req.body.password,
                                    "countryCode": req.body.countryCode,
                                    "country": req.body.country,
                                    "mobileOtp": otp,
                                    "deviceType": req.body.deviceType,
                                    "deviceToken": req.body.deviceToken
                                })
                                obj.save((error1, result1) => {
                                    console.log("145>>>>>>>>>>>", error1, result1)

                                    if (error1) {

                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {

                                        return res.send({
                                            response_code: 200,
                                            response_message: "Signup successfully & Otp sent your registed mobile number",
                                            Data: result1
                                        })
                                    }

                                })
                            }

                        })


                    }

                    else {
                        console.log("173>>>>>>>>>>>")
                        commonFunction.sendMailTest(req.body.email, otp, (err4, result4) => {
                            console.log("175>>>>>>>>>>>>", err4, result4)
                            if (err4) {
                                res.send({ response_code: 500, response_message: "Internal server error" })
                            }
                            else {

                                let obj = new User({
                                    "name": req.body.name,
                                    "email": req.body.email,
                                    "mobileNumber": req.body.mobileNumber,
                                    "password": req.body.password,
                                    "countryCode": req.body.countryCode,
                                    "country": req.body.country,
                                    "mobileOtp": otp,
                                    "deviceType": req.body.deviceType,
                                    "deviceToken": req.body.deviceToken
                                })
                                obj.save((error5, result5) => {
                                    console.log("192>>>>>>>>>>>", error5, result5)
                                    if (error5) {

                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {

                                        return res.send({
                                            response_code: 200,
                                            response_message: "Signup successfully & Otp sent your registed mobile number",
                                            Data: result5
                                        })
                                    }

                                })
                            }
                        })
                    }
                }
            })
        }
    },

    //===============================================Social Login============================================//

    socialLogin: (req, res) => {
        if (!req.body || !req.body.socialId || !req.body.providerType || !req.body.email || !req.body.name) {
            return res.send({
                response_code: 501,
                response_message: "All fields are required"
            })
        } else {
            var username = req.body.username.toLowerCase();
            var query = {
                $and: [{
                    "socialId": req.body.socialId
                }, {
                    "socialType": req.body.providerType
                }]
            }
            User.findOne(query, (error8, result8) => {
                if (error8) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (result8 && result8.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Block form Admin.Please contact to Administrator",
                    })
                } else if (result8) {
                    User.findByIdAndUpdate({
                        "_id": result8._id
                    }, {
                            $set: {
                                "deviceType": req.body.deviceType,
                                "deviceToken": req.body.deviceToken,
                                "updatedAt":new Date()
                            }
                        }, {
                            new: true
                        }, (error9, result9) => {
                            if (error9) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error",
                                })
                            } else {
                                return res.send({
                                    response_code: 200,
                                    response_message: "Social login successfully",
                                    Data: result9
                                })
                            }
                        })
                } else {
                    User.findOne({
                        "email": req.body.email
                    }, (error, result) => {
                        if (error) {
                            
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error",
                            })
                        } else if (result) {
                            if (result.email == req.body.email) {
                                return res.send({
                                    response_code: 400,
                                    response_message: "Email already exist"
                                })
                            }
                        } else {
                            req.body.password = bcrypt.hashSync(req.body.email, salt)
                            let obj = {
                                "name": req.body.name,
                                "email": req.body.email,
                                "password": req.body.password,
                                "profilePic": req.body.profileImage,
                                "deviceType": req.body.deviceType,
                                "deviceToken": req.body.deviceToken,
                                "username": username,
                                "socialId": req.body.socialId,
                                "socialType": req.body.providerType,
                                "usernameStatus": true,
                                "mobileOtpVerificationStatus": true,
                                "emailOtpVerificationStatus": true,
                                "createdAt":new Date()
                            }
                            User.create(obj, (error1, result1) => {
                                if (error1) {
                                    
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error2",
                                        error1
                                    })
                                } else {
                                    
                                    return res.send({
                                        response_code: 200,
                                        response_message: "Socail login successfully & Otp sent your registed mobile number",
                                        Data: result1
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    //============================================Mobile Otp Verification========================================//

    otpVerification: (req, res) => {

        if (!req.body.mobileOtp || !req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "OTP is required"
            })
        } else {
            var query = {
                $and: [{
                    "mobileOtp": req.body.mobileOtp
                }, {
                    "_id": req.body.userId
                }]
            }
            User.findOne(query, (error1, result1) => {
                if (error1) {
                    
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result1) {
                    return res.send({
                        response_code: 500,
                        response_message: "Invalid OTP"
                    })
                } else {
                    User.findByIdAndUpdate({
                        "_id": req.body.userId
                    }, {
                            $set: {
                                "mobileOtpVerificationStatus": true
                            }
                        }, {
                            new: true
                        }, (error, result) => {
                            if (error) {
                             
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "Invalid user Id"
                                })
                            } else {
                               
                                return res.send({
                                    response_code: 200,
                                    response_message: "OTP verified successfully",
                                    Data: result.usernameStatus
                                })
                            }
                        })
                }
            })
        }

    },
    //==========================================Resend Mobile Otp===================================================//

    resendMobileOtp: (req, res) => {

        if (!req.body.mobileNumber || !req.body.userId || !req.body.countryCode) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        }
        User.findOne({
            "mobileNumber": req.body.mobileNumber
        }, (error, result) => {
            if (error) {
                
                return res.send({
                    response_code: 500,
                    response_message: "Internal server error"
                })
            } else if (!result) {
                return res.send({
                    response_code: 500,
                    response_message: "Mobile number is not correct"
                })
            } else {
                var otp = Math.floor(100000 + Math.random() * 900000);
                var otp = otp.toString();
                User.findByIdAndUpdate({
                    "_id": req.body.userId
                }, {
                        $set: {
                            "mobileOtp": otp
                        }
                    }, {
                        new: true
                    }, (error1, result1) => {
                        if (error1) {
                           
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (!result1) {
                           
                            res.send({
                                response_code: 404,
                                response_message: "Invalid user Id"
                            })
                        } else {
                            var number = req.body.countryCode + req.body.mobileNumber;
                            var text = "This is your one time password. Please do not share it " + otp;
                            var from = fromNumber;
                           
                            client.messages.create({ to: number, from: from, body: text }, (error2, result2) => {
                                if (error2) {
                                    
                                    res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                }
                                else {
                                    
                                    return res.send({
                                        response_code: 200,
                                        response_message: "OTP re-sent successfully",
                                        Data: result1
                                    })
                                }
                            })
                        }

                    })
            }
        })
    },

    //===============================================Check Username and add=====================================//

    checkUsername: (req, res) => {

        if (!req.body.username || !req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            var username = req.body.username.toLowerCase();
            User.findOne({ "username": username }, (error, result) => {
                if (error) {
                  
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (result && result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Block form Admin.Please contact to Administrator",
                    })
                } else if (result) {
                   
                    return res.send({
                        response_code: 400,
                        response_message: "Username not available."
                    })

                } else {
                    User.findByIdAndUpdate({
                        "_id": req.body.userId
                    }, {
                            $set: {
                                "username": username,
                                "usernameStatus": true
                            }
                        }, {
                            new: true
                        }, (error1, result) => {
                            if (error1) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result) {
                               
                                res.send({
                                    response_code: 404,
                                    response_message: "Invalid user Id"
                                })
                            } else {
                               
                                return res.send({
                                    response_code: 200,
                                    response_message: "Username available"
                                })
                            }
                        })
                }
            })
        }
    },

    //===============================================Check Username and add=====================================//

    checkUsername1: (req, res) => {

        
        if (!req.body.username || !req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "Username is required"
            })
        } else {
            var username = req.body.username.toLowerCase();
            User.findOne({ "username": username }, (error, result) => {
                if (error) {
                   
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (result) {
                   
                    return res.send({
                        response_code: 400,
                        response_message: "Username not available.",
                    })
                } else {
                   
                    return res.send({
                        response_code: 200,
                        response_message: "Username available!"
                    })

                }
            })
        }
    },

    //==========================================Uplodate profle Pic==================================//

    uploadProfile: (req, res) => {


        var multiparty = require('multiparty');
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
          
            if (err) {
                console.log("err", err);
            } else {
                User.findOne({
                    "_id": fields.userId
                }, (error, result) => {
                    
                    if (error) {
                      
                        return res.send({
                            response_code: 500,
                            response_message: "Internal server error",
                            error
                        })
                    } else if (!result) {
                       
                        return res.send({
                            response_code: 202,
                            response_message: "User delted form Admin.Please contact to Administrator"
                        })
                    } else if (result) {
                        if (result.status != 'INACTIVE') {
                           
                            var c = files.profilePic[0].path;
                            cloudinary.v2.uploader.upload(files.profilePic[0].path, {
                                resource_type: "image"
                            }, (err, result1) => {
                                if (err) {
                                   
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                }
                                

                                User.findByIdAndUpdate({
                                    "_id": fields.userId
                                }, {
                                        $set: {
                                            "profilePic": result1.secure_url,
                                            "publicId": result1.public_id
                                        }
                                    }, {
                                        new: true
                                    }, (error1, result2) => {
                                        if (error1) {
                                           
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                           
                                            res.send({
                                                response_code: 200,
                                                response_message: "Profile updated successfully",
                                                Data: result2
                                            });
                                        }
                                    })
                            })
                        }
                        else if (result.status == 'INACTIVE')
                            return res.send({
                                response_code: 203,
                                response_message: "User Blocked form Admin.Please contact to Administrator",
                            })

                    }
                    else {
                        return res.send({
                            response_code: 400,
                            response_message: "No user found",
                            error
                        })
                    }
                })

            }

        })

    },
    //================================================Login====================================================//

    login: (req, res) => {
        
        User.findOne({
            $or: [{
                email: req.body.username
            }, {
                username: req.body.username
            }]
        }, (error, result) => {
           
            if (error) {
                
                return res.send({
                    response_code: 500,
                    response_message: "Internal server error"
                })
            } else if (!result) {
                return res.send({
                    response_code: 500,
                    response_message: "Invalid credential"
                })
            } else if (result.status == 'INACTIVE') {
                return res.send({
                    response_code: 203,
                    response_message: "User Blocked from Admin.Please contact to Administrator",
                })
            } else if (result) {
                
                var passVerify = bcrypt.compareSync(req.body.password, result.password);
                console.log("Password is===========>", passVerify)
                if (passVerify) {
                    var jwtToken = jwt.sign({
                        "email": req.body.email
                    }, config.jwtSecretKey);
                  
                    req.body.password = result.password
                    var query = { $and: [{ _id: result._id }, { password: req.body.password }] }
                    User.findOne(query, (error1, result1) => {
                        if (error1) {
                            
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (!result1) {
                           
                            res.send({
                                response_code: 404,
                                response_message: "Password is not correct"
                            })
                        } else {
                            if (req.body.deviceType && req.body.deviceToken) {
                                var query = {
                                    $and: [{
                                        _id: result._id
                                    }, {
                                        "mobileOtpVerificationStatus": true
                                    }]
                                }
                                User.findOneAndUpdate(query, {
                                    $set: {
                                        "jwtToken": jwtToken,
                                        "deviceType": req.body.deviceType,
                                        "deviceToken": req.body.deviceToken,
                                        "updatedAt":new Date()
                                    }
                                }, {
                                        new: true
                                    }, (error2, result2) => {
                                        if (error2) {
                                           
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else if (result2) {
                                            if (result2.usernameStatus) {
                                               
                                                return res.send({
                                                    response_code: 200,
                                                    response_message: "Login successfully",
                                                    Data: result2
                                                })
                                            } else {
                                          
                                                return res.send({
                                                    response_code: 200,
                                                    response_message: "Username not set",
                                                    usernameStatus: result2.usernameStatus,
                                                    Data: result2
                                                })
                                            }

                                        } else {
                                            var otp = Math.floor(100000 + Math.random() * 900000);
                                            var otp = otp.toString();
                                          
                                            User.findByIdAndUpdate({
                                                _id: result._id
                                            }, {
                                                    $set: {
                                                        "mobileOtp": otp
                                                    }
                                                }, {
                                                    new: true
                                                }, (error1, result1) => {

                                                    if (error1) {
                                                       
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        var number = result1.countryCode + result1.mobileNumber;
                                                        var text = "This is your one time password. Please do not share it " + otp;
                                                        var from = fromNumber;
                                                        client.messages.create({ to: number, from: from, body: text }, (error2, result2) => {
                                                            if (error2) {
                                                               
                                                                res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error"
                                                                })
                                                            }
                                                            else {
                                                               
                                                                return res.send({
                                                                    response_code: 200,
                                                                    response_message: "OTP send successfully ! Please verify OTP first",
                                                                    Data: result1
                                                                })
                                                            }
                                                        })
                                                    }

                                                })
                                        }
                                    })
                            } else {
                                var query = {
                                    $and: [{
                                        _id: result._id
                                    }, {
                                        "mobileOtpVerificationStatus": true
                                    }]
                                }
                                User.findOneAndUpdate(query, {
                                    $set: {
                                        "jwtToken": jwtToken,
                                        "deviceType": req.body.deviceType,
                                        "deviceToken": req.body.deviceToken,
                                        "updatedAt":new Date()
                                    }
                                }, {
                                        new: true
                                    }, (error2, result2) => {
                                        if (error2) {
                                         
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else if (result2) {
                                            if (result2.usernameStatus) {

                                               
                                                return res.send({
                                                    response_code: 200,
                                                    response_message: "Login successfully",
                                                    Data: result2
                                                })
                                            } else {
                                               
                                                return res.send({
                                                    response_code: 200,
                                                    response_message: "Username not set",
                                                    usernameStatus: result2.usernameStatus,
                                                    Data: result2
                                                })
                                            }
                                        } else {
                                            var otp = Math.floor(100000 + Math.random() * 900000);
                                            var otp = otp.toString();
                                           
                                            User.findOneAndUpdate({
                                                _id: result._id
                                            }, {
                                                    $set: {
                                                        "mobileOtp": otp
                                                    }
                                                }, {
                                                    new: true
                                                }, (error1, result1) => {

                                                    if (error1) {
                                                      
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        var number = result1.countryCode + result1.mobileNumber;
                                                        var text = "This is your one time password. Please do not share it " + otp;
                                                        var from = fromNumber;
                                                        client.messages.create({ to: number, from: from, body: text }, (error2, result2) => {
                                                            if (error2) {
                                                               
                                                                res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error"
                                                                })
                                                            }

                                                            else {
                                                               
                                                                return res.send({
                                                                    response_code: 200,
                                                                    response_message: "OTP send successfully ! Please verify OTP first",
                                                                    Data: result1
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
                 else {
                   
                    res.send({
                        response_code: 404,
                        response_message: "Password is not correct"
                    })
                }
            }
        })

    },
    //==========================================ForgotPassword=================================================//

    forgotPassword: (req, res) => {

        
        if (!req.body.emailOrUserName) {
            console.log("Email or username is required")
            return res.send({
                response_code: 401,
                response_message: "Email or username is required"
            })
        }
        User.findOne({
            $or: [{
                email: req.body.emailOrUserName
            }, {
                username: req.body.emailOrUserName
            }]
        }, (error, result) => {
            if (error) {
              
                return res.send({
                    response_code: 500,
                    response_message: "Internal server error"
                })
            } else if (!result) {
               
                return res.send({
                    response_code: 500,
                    response_message: "Invalid credential"
                });
            } else if (result.status == 'INACTIVE') {
                return res.send({
                    response_code: 203,
                    response_message: "User Blocked form Admin.Please contact to Administrator",
                })
            } else {
                var otp = Math.floor(100000 + Math.random() * 900000);
                var otp = otp.toString();
              
                User.findByIdAndUpdate({
                    "_id": result._id
                }, {
                        $set: {
                            "emailOtp": otp,
                            "mobileOtp": otp
                        }
                    }, {
                        new: true
                    }, (error2, result2) => {
                        if (error2) {
                          
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'a2karya8055@gmail.com',
                                    pass: 'Abhishek8055@'
                                }
                            });
                            var companyEmail = req.body.companyEmail;
                            var mailOptions = {
                                from: 'Do Not Reply <a2karya8055@gmail.com>',
                                to: result.email,
                                subject: 'Forgot password',
                                text: 'This is your one time password. Do not share it. ' + otp
                            };
                            transporter.sendMail(mailOptions, function (error3, info) {
                                if (error3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    });
                                    console.log("Error  in sending mail===========>", error3);
                                } else {
                                    var number = result.countryCode + result.mobileNumber;
                                    var text = "This is your one time password. Please do not share it " + otp;
                                    var from = fromNumber;
                                    client.messages.create({ to: number, from: from, body: text }, (error4, result4) => {
                                        if (error4) {
                                           
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        }
                                        else {
                                          
                                            return res.send({
                                                response_code: 200,
                                                response_message: "OTP send successfully ! Please verify OTP first",
                                                Data: result2
                                            })
                                        }
                                    })

                                }
                            });
                        }

                    })

            }

        })

    },
    //============================================Email Otp Verification========================================//

    emailOtpVerification: (req, res) => {

       
        if (!req.body.emailOtp || !req.body.userId) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            var query = {
                $and: [{
                    "emailOtp": req.body.emailOtp
                }, {
                    "_id": req.body.userId
                }]
            }
            User.findOne(query, (error1, result1) => {

                if (error1) {
                   
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result1) {
                   
                    return res.send({
                        response_code: 500,
                        response_message: "Invalid OTP. Please enter correct OTP."
                    })
                } else if (result1.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    User.findOneAndUpdate({
                        "_id": req.body.userId
                    }, {
                            $set: {
                                "emailOtpVerificationStatus": true
                            }
                        }, {
                            new: true
                        }, (error, result) => {
                            if (error) {
                              
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "User Id is not correct"
                                })
                            } else {
                               
                                return res.send({
                                    response_code: 200,
                                    response_message: "OTP verified successfully"
                                })
                            }
                        })
                }
            })
        }
    },
    //==========================================Password Change===================================================//

    passwordChange: (req, res) => {

        
        if (!req.body.password || !req.body.userId) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            User.findByIdAndUpdate({
                "_id": req.body.userId
            }, {
                    $set: {
                        "password": req.body.password
                    }
                }, {
                    new: true
                }, (error1, result1) => {
                    if (error1) {
                        
                        return res.send({
                            response_code: 500,
                            response_message: "Internal server error"
                        })
                    } else if (!result1) {
                        return res.send({
                            response_code: 202,
                            response_message: "Something went wrong"
                        })
                    } else if (result1.status == 'INACTIVE') {
                        return res.send({
                            response_code: 203,
                            response_message: "User Blocked form Admin.Please contact to Administrator",
                        })
                    } else {
                       
                        return res.send({
                            response_code: 200,
                            response_message: "Password updated successfully"
                        })
                    }

                })
        }
    },
    //================================================Update Profile=================================================//

    updateProfile: (req, res) => {
        
        var multiparty = require('multiparty');
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {

                return res.send({
                    response_code: 500,
                    response_message: "Unsupported content-type"
                })
            } else {
                User.findOne({
                    "_id": fields.userId
                }, (error, result) => {
                    if (error) {
                       
                        return res.send({

                            response_code: 500,
                            response_message: "Internal server error"
                        })
                    } else if (!result) {
                       
                        return res.send({
                            response_code: 202,
                            response_message: "User deletd form Admin.Please contact to Administrator"
                        })
                    } else if (result.status == 'INACTIVE') {
                        return res.send({
                            response_code: 203,
                            response_message: "User Blocked form Admin.Please contact to Administrator",
                        })
                    } else if (fields.username == result.username && fields.email == result.email) {
                        
                        if (files.profilePic) {
                            cloudinary.v2.uploader.upload(files.profilePic[0].path, {
                                resource_type: "image"
                            }, (err1, result1) => {
                                if (err1) {
                                   
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                }
                               
                                User.findByIdAndUpdate({
                                    "_id": fields.userId
                                }, {
                                        $set: {
                                            "profilePic": result1.secure_url,
                                            "publicId": result1.public_id,
                                            "bio": fields.bio,
                                            "name": fields.name,
                                            "dob": fields.dob
                                        }
                                    }, {
                                        new: true
                                    }, (error2, result2) => {
                                        if (error2) {
                                           
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                           
                                            res.send({
                                                response_code: 200,
                                                response_message: "Profile updated successfully"
                                            });
                                        }
                                    })
                            })
                        } else {
                            User.findByIdAndUpdate({
                                "_id": fields.userId
                            }, {
                                    $set: {
                                        "bio": fields.bio,
                                        "name": fields.name,
                                        "dob": fields.dob
                                    }
                                }, {
                                    new: true
                                }, (error3, result3) => {
                                    if (error3) {
                                       
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {
                                      
                                        res.send({
                                            response_code: 200,
                                            response_message: "Profile updated successfully"
                                        });
                                    }
                                })

                        }

                    } else {
                        var query = {
                            $and: [{
                                username: fields.username
                            }, {
                                '_id': {
                                    $ne: fields.userId
                                }
                            }]
                        }
                        User.findOne(query, (error4, result4) => {
                          
                            if (error4) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (result4) {
                                
                                return res.send({
                                    response_code: 500,
                                    response_message: "Username already exist"
                                })
                            } else {
                                var query1 = {
                                    $and: [{
                                        email: fields.email
                                    }, {
                                        '_id': {
                                            $ne: fields.userId
                                        }
                                    }]
                                }
                                User.findOne(query1, (error6, result6) => {
                                    if (error6) {
                                       
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else if (result6) {
                                       
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Email already exist"
                                        })
                                    } else {
                                        if (files.profilePic) {
                                            cloudinary.v2.uploader.upload(files.profilePic[0].path, {
                                                resource_type: "image"
                                            }, (err1, result1) => {
                                                if (err1) {
                                                    console.log("Err 1 is============>", err1)
                                                    return res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error"
                                                    })
                                                }
                                                
                                                User.findByIdAndUpdate({
                                                    "_id": fields.userId
                                                }, {
                                                        $set: {
                                                            "profilePic": result1.secure_url,
                                                            "publicId": result1.public_id,
                                                            "bio": fields.bio,
                                                            "name": fields.name,
                                                            "dob": fields.dob,
                                                            "username": fields.username,
                                                            "email": fields.email
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error2, result2) => {
                                                        if (error2) {
                                                           
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                           
                                                            res.send({
                                                                response_code: 200,
                                                                response_message: "Profile updated successfully"
                                                            });
                                                        }
                                                    })
                                            })
                                        } else {
                                            User.findByIdAndUpdate({
                                                "_id": fields.userId
                                            }, {
                                                    $set: {
                                                        "bio": fields.bio,
                                                        "name": fields.name,
                                                        "dob": fields.dob,
                                                        "username": fields.username,
                                                        "email": fields.email
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                        
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: "Profile updated successfully"
                                                        });
                                                    }
                                                })

                                        }
                                    }
                                })


                            }
                        })

                    }
                })
            }
        })


    },

    //=========================================Get User Data=======================================================//

    getUserData: (req, res) => {
        
        if (!req.body.userId) {
            console.log("User Id is required")
            return res.send({
                response_code: 401,
                response_message: "User Id is required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {

                if (error) {
                  
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                   
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                  
                    return res.send({
                        response_code: 200,
                        response_message: "User data found successfully",
                        Data: result
                    })
                }
            })
        }
    },

    //=============================================Reset password==================================================//

    resetPassword: (req, res) => {

       
        if (!req.body.userId || !req.body.password || !req.body.newPassword) {
            console.log("User Id is required")
            return res.send({
                response_code: 401,
                response_message: "User Id is required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                   
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                   
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result && result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var result5 = bcrypt.compareSync(req.body.password, result.password);
                    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)
                    var newPassword = req.body.newPassword;
                   
                    if (result5) {
                        req.body.password = result.password;
                        var query = {
                            $and: [{
                                "_id": req.body.userId
                            }, {
                                "password": req.body.password
                            }]
                        }
                        User.findOne(query, (error1, result1) => {
                            if (error1) {
                               
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result1) {
                              
                                res.send({
                                    response_code: 404,
                                    response_message: "Incorrect old password."
                                })
                            } else {
                                User.findByIdAndUpdate({
                                    "_id": req.body.userId
                                }, {
                                        $set: {
                                            "password": newPassword
                                        }
                                    }, {
                                        new: true
                                    }, (error2, result2) => {
                                        if (error2) {
                                           
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                           
                                            return res.send({
                                                response_code: 200,
                                                response_message: "password reset successfully",
                                                Data: result2
                                            })
                                        }

                                    })
                            }
                        })
                    } else {
                       
                        res.send({
                            response_code: 404,
                            response_message: "Password is not correct"
                        })
                    }
                }


            })
        }
    },

    //==========================================Password Change===================================================//

    mobileNumberChange: (req, res) => {
        if (!req.body.mobileNumber || !req.body.userId || !req.body.countryCode) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {

            User.findOne({
                "_id": req.body.userId
            }, (err3, result3) => {
                if (err3) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result3) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result3 && result3.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    User.findOne({
                        "mobileNumber": req.body.mobileNumber
                    }, (err4, result4) => {
                        if (err4) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result4) {
                            return res.send({
                                response_code: 500,
                                response_message: "Mobile number already exist"
                            })

                        } else {
                            var otp = Math.floor(100000 + Math.random() * 900000);
                            var otp = otp.toString();
                            User.findByIdAndUpdate({
                                "_id": req.body.userId
                            }, {
                                    $set: {
                                        "mobileOtp": otp,
                                    }
                                }, {
                                    new: true
                                }, (error1, result1) => {
                                    if (error1) {
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else if (!result1) {
                                        res.send({
                                            response_code: 404,
                                            response_message: "User Id is not correct"
                                        })
                                    } else {
                                        var number = req.body.countryCode + req.body.mobileNumber;
                                        var text = "This is your one time password. Please do not share it " + otp;
                                        var from = fromNumber;
                                        client.messages.create({ to: number, from: from, body: text }, (error2, result2) => {
                                            if (error2) {
                                                res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error"
                                                })
                                            }
                                            else {
                                                return res.send({
                                                    response_code: 200,
                                                    response_message: "OTP sent on your mobile number",
                                                    Data: result1
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
  //=========================================Verify Otp with phone===================================================//
    otpMobileChange: (req, res) => {
         if (!req.body.mobileNumber || !req.body.userId || !req.body.countryCode || !req.body.mobileOtp) {
            console.log("OTP is required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required."
            })
        } else {
            var query = {
                $and: [{
                    "mobileOtp": req.body.mobileOtp
                }, {
                    "_id": req.body.userId
                }]
            }
            User.findOne(query, (error1, result1) => {
                if (error1) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result1) {
                    console.log("Invalid OTP")
                    return res.send({
                        response_code: 500,
                        response_message: "Invalid OTP"
                    })
                } else {
                    User.findByIdAndUpdate({
                        "_id": req.body.userId
                    }, {
                            $set: {
                                "mobileOtpVerificationStatus": true,
                                "mobileNumber": req.body.mobileNumber,
                                "countryCode": req.body.countryCode,
                                "country": req.body.country,
                            }
                        }, {
                            new: true
                        }, (error, result) => {
                            if (error) {
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result) {
                                return res.send({
                                    response_code: 500,
                                    response_message: "Invalid user Id"
                                })
                            } else {
                                return res.send({
                                    response_code: 200,
                                    response_message: "OTP verified successfully.",
                                    Data: result.usernameStatus
                                })
                            }
                        })
                }
            })
        }

    },


    //==============================================Logout=========================================================//

    logout: (req, res) => {
        if (!req.body.userId) {
            console.log("UserId is required")
            return res.send({
                response_code: 401,
                response_message: "UserId is required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result && result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {

                    if (req.body.deviceToken || req.body.deviceType) {

                        var query = {
                            $and: [{
                                "deviceToken": req.body.deviceToken
                            }, {
                                "_id": req.body.userId
                            }]
                        }
                        User.findByIdAndUpdate(query, {
                            $set: {
                                "jwtToken": "",
                                "deviceToken": "",
                                "deviceType": ""
                            }
                        }, (error1, result1) => {
                            if (error1) {
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            } else if (!result1) {
                                res.send({
                                    response_code: 404,
                                    response_message: "User Id or Device token is not correct"
                                })
                            } else {
                                return res.send({
                                    response_code: 200,
                                    response_message: "logout successfully"
                                })
                            }
                        })

                    } else {
                        User.findByIdAndUpdate({
                            "_id": req.body.userId
                        }, {
                                $set: {
                                    "jwtToken": ""
                                }
                            }, (error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    return res.send({
                                        response_code: 200,
                                        response_message: "logout successfully"
                                    })
                                }
                            })
                    }


                }
            })
        }

    },

    //==========================================================Add Comment=====================================================//

    addComment: (req, res) => {
        if (!req.body.commentBy || !req.body.postId || !req.body.commentHeadline || !req.body.comment || !req.body.rate) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.commentBy
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result && result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {

                    Comment.findOneAndUpdate({
                        commentBy: req.body.commentBy
                    }, {
                            $set: {
                                "commentBy": req.body.commentBy,
                                "postId": req.body.postId,
                                "commentHeadline": req.body.commentHeadline,
                                "message": req.body.comment,
                                "rate": req.body.rate
                            }
                        }, {
                            new: true
                        }).exec((err_, succ_) => {
                            if (err_)
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            else if (succ_) {
                                Comment.find({
                                    "postId": req.body.postId
                                }, (error, result5) => {
                                    if (error)
                                        res.send({
                                            response_code: 500,
                                            response_message: "Internal server error."
                                        })
                                    else {
                                        if (result5.length == 0) {
                                            res.send({
                                                response_code: 401,
                                                response_message: "list not found"
                                            })

                                        } else {
                                            console.log(result5)
                                            var sumRate = 0;
                                            for (var i = 0; i < result5.length; i++) {
                                                sumRate = sumRate + result5[i].rate;
                                            }
                                            var avg = sumRate / result5.length
                                            Post.findByIdAndUpdate({
                                                "_id": req.body.postId
                                            }, {
                                                    $set: {
                                                        "commentCount": result5.length,
                                                        "rateAvg": avg
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        var value = [{
                                                            "userId": req.body.commentBy,
                                                            "isComment": true
                                                        }]
                                                        Post.findByIdAndUpdate({
                                                            "_id": req.body.postId
                                                        }, {
                                                                $set: {
                                                                    "comments": value
                                                                }
                                                            }, {
                                                                new: true
                                                            }, (error6, result6) => {
                                                                if (error6) {
                                                                    return res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error"
                                                                    })
                                                                } else {
                                                                    if (result6.userId == req.body.commentBy) {
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Comment add successfully",
                                                                            Data: result3
                                                                        });
                                                                    } else {
                                                                        var n = (new Date().getTimezoneOffset()) * 60000;
                                                                        var time = Date.now() - n;
                                                                        var objNoti = {
                                                                            "userId": result6.userId,
                                                                            "notiBy": req.body.commentBy,
                                                                            "message": result.name + " commented on your video " + result6.videoTitle,
                                                                            "title": "COMMENT",
                                                                            "postId": result6._id,
                                                                            "postTitle": result6.videoTitle,
                                                                        }
                                                                        new Notification(objNoti).save((error8, result8) => {
                                                                            if (error8) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error"
                                                                                })
                                                                            } else {

                                                                                User.findOne({
                                                                                    "_id": result6.userId
                                                                                }, (error9, result9) => {
                                                                                    if (error9) {
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error"
                                                                                        })
                                                                                    } else {
                                                                                        func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                        res.send({
                                                                                            response_code: 200,
                                                                                            response_message: "Comment add successfully",
                                                                                            Data: result3
                                                                                        });
                                                                                    }
                                                                                });

                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            })

                                                    }
                                                })
                                        }
                                    }
                                })
                            } else {
                                var value = {
                                    "commentBy": req.body.commentBy,
                                    "postId": req.body.postId,
                                    "commentHeadline": req.body.commentHeadline,
                                    "message": req.body.comment,
                                    "rate": req.body.rate
                                }
                                new Comment(value).save((error1, result1) => {
                                    if (error1)
                                        res.send({
                                            response_code: 500,
                                            response_message: "Internal server error."
                                        })
                                    else {


                                        Comment.find({
                                            "postId": req.body.postId
                                        }, (error, result5) => {
                                            if (error)
                                                res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error."
                                                })
                                            else {
                                                if (result5.length == 0) {
                                                    res.send({
                                                        response_code: 401,
                                                        response_message: "list not found"
                                                    })

                                                } else {
                                                    console.log(result5)
                                                    var sumRate = 0;
                                                    for (var i = 0; i < result5.length; i++) {
                                                        sumRate = sumRate + result5[i].rate;
                                                    }
                                                    var avg = sumRate / result5.length
                                                    Post.findByIdAndUpdate({
                                                        "_id": req.body.postId
                                                    }, {
                                                            $set: {
                                                                "commentCount": result5.length,
                                                                "rateAvg": avg
                                                            }
                                                        }, {
                                                            new: true
                                                        }, (error3, result3) => {
                                                            if (error3) {
                                                                return res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error"
                                                                })
                                                            } else {
                                                                var value = [{
                                                                    "userId": req.body.commentBy,
                                                                    "isComment": true
                                                                }]
                                                                Post.findByIdAndUpdate({
                                                                    "_id": req.body.postId
                                                                }, {
                                                                        $set: {
                                                                            "comments": value
                                                                        }
                                                                    }, {
                                                                        new: true
                                                                    }, (error6, result6) => {
                                                                        if (error6) {
                                                                            return res.send({
                                                                                response_code: 500,
                                                                                response_message: "Internal server error"
                                                                            })
                                                                        } else {
                                                                            if (result6.userId == req.body.commentBy) {
                                                                                res.send({
                                                                                    response_code: 200,
                                                                                    response_message: "Comment add successfully",
                                                                                    Data: result3
                                                                                });
                                                                            } else {
                                                                                var n = (new Date().getTimezoneOffset()) * 60000;
                                                                                var time = Date.now() - n;
                                                                                var objNoti = {
                                                                                    "userId": result6.userId,
                                                                                    "notiBy": req.body.commentBy,
                                                                                    "message": result.name + " commented on your video " + result6.videoTitle,
                                                                                    "title": "COMMENT",
                                                                                    "postId": result6._id,
                                                                                    "postTitle": result6.videoTitle,
                                                                                }
                                                                                new Notification(objNoti).save((error8, result8) => {
                                                                                    if (error8) {
                                                                                        console.log("Error 1 is============>", error8)
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error"
                                                                                        })
                                                                                    } else {

                                                                                        User.findOne({
                                                                                            "_id": result6.userId
                                                                                        }, (error9, result9) => {
                                                                                            if (error9) {
                                                                                                return res.send({
                                                                                                    response_code: 500,
                                                                                                    response_message: "Internal server error"
                                                                                                })
                                                                                            } else {
                                                                                                func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                                res.send({
                                                                                                    response_code: 200,
                                                                                                    response_message: "Comment add successfully",
                                                                                                    Data: result3
                                                                                                });
                                                                                            }
                                                                                        });

                                                                                    }
                                                                                });
                                                                            }
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
                        })




                }
            })
        }
    },

    //==============================================Comments List===================================//

    commentsList: (req, res) => {

        if (!req.body.postId) {
            console.log("Post Id is required")
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Comment.paginate({
                "postId": req.body.postId
            }, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "Comment not found"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },

    //==========================================================Video upload========================================================//

    videoUpload: (req, res) => {
        var multiparty = require('multiparty');
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {
                 return res.send({
                            response_code: 500,
                            response_message: "Internal server error",
                        })
            } else {
                User.findOne({
                    "_id": fields.userId
                }, (error, result) => {
                    if (error) {
                        return res.send({
                            response_code: 500,
                            response_message: "Internal server error",
                        })
                    } else if (!result) {
                        return res.send({
                            response_code: 202,
                            response_message: "User deleted form Admin.Please contact to Administrator"
                        })
                    } else if (result.status == 'INACTIVE') {
                        return res.send({
                            response_code: 203,
                            response_message: "User Blocked form Admin.Please contact to Administrator",
                        })
                    } else {
                        var array4 = fields.videosTag;
                        var videosTag = array4.toString().split(",");
                        var c = files.video[0].path;
                        cloudinary.v2.uploader.upload(files.video[0].path, {
                            resource_type: "video"
                        }, (err, result1) => {
                            if (err) {
                                return res.send({
                                    response_code: 500,
                                    response_message: "Internal server error"
                                })
                            }
                            var videoSize = result1.bytes/1000;
                            var value = {
                                "video": result1.secure_url,
                                "videoTitle": fields.videoTitle,
                                "videosDescription": fields.videoDescription,
                                "visibility": fields.visibility,
                                "publicId": result1.public_id,
                                "videoSize": videoSize,
                                "userId": fields.userId,
                                "duration": fields.duration,
                                "createdAt":new Date(),
                                "createdAt1":Date.now()
                            }
                            new Post(value).save((error1, result2) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    Post.findByIdAndUpdate({
                                        "_id": result2._id
                                    }, {
                                            $set: {
                                                "videosTag": videosTag
                                            }
                                        }, {
                                            new: true
                                        }, (error3, result3) => {
                                            if (error3) {
                                                return res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error"
                                                })
                                            } else {
                                                var c = files.videoThumbnailImage[0].path;
                                                cloudinary.v2.uploader.upload(files.videoThumbnailImage[0].path, {
                                                    resource_type: "image"
                                                }, (err4, result4) => {
                                                    if (err4) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        Post.findByIdAndUpdate({
                                                            "_id": result2._id
                                                        }, {
                                                                $set: {
                                                                    "thumbImage": result4.secure_url
                                                                }
                                                            }, {
                                                                new: true
                                                            }, (error5, result5) => {
                                                                if (error5) {
                                                                    return res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error"
                                                                    })
                                                                } else {
                                                                    var query8 = {
                                                                         $and: [{
                                                                            "postUserId": null
                                                                            }, {
                                                                            "userId": fields.userId
                                                                            }]
                                                                    }
                                                                   
                                                                     Post.find(query8, (error7, result7) => {
                                                                        if (error7) {
                                                                            return res.send({
                                                                                response_code: 500,
                                                                                response_message: "Internal server error1",
                                                                                error7
                                                                            })
                                                                        } else {
                                                                            User.findByIdAndUpdate({
                                                                                "_id": fields.userId
                                                                            }, {
                                                                                    $set: {
                                                                                        "posts": result7.length
                                                                                    }
                                                                                }, {
                                                                                    new: true
                                                                                }, (error9, result9) => {
                                                                                    if (error9) {
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error2",
                                                                                            error9
                                                                                        })
                                                                                    } else {
                                                                                        res.send({
                                                                                            response_code: 200,
                                                                                            response_message: "Video upload successfully",
                                                                                            Data: result5
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
                        })
                    }
                })

            }
        })
    },


    //=================================================================Like=====================================================//

    like: (req, res) => {
        if (!req.body.postId || !req.body.likeBy || !req.body.status) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.likeBy
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "likeBy": req.body.likeBy
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Like.findOne(query, (err2, result2) => {
                        if (err2) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result2 && result2.status == req.body.status) {
                            res.send({
                                response_code: 200,
                                response_message: "success"
                            })
                        } else if (!result2) {
                            var value = {
                                "likeBy": req.body.likeBy,
                                "status": req.body.status,
                                "postId": req.body.postId,
                            }
                            new Like(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'LIKE'
                                        }, {
                                            "postId": req.body.postId
                                        }]
                                    }
                                    Like.find(query, (error, result5) => {
                                        if (error) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            if (result5.length == 0) {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "success"
                                                })

                                            } else {
                                                var obj = {
                                                    "userId": req.body.likeBy,
                                                    "isLike": true
                                                }
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "likeCount": result5.length
                                                        },
                                                        $push: {
                                                            likes: obj
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            if (result3.userId == req.body.likeBy) {
                                                                res.send({
                                                                    response_code: 200,
                                                                    response_message: "Success",
                                                                    Data: result3
                                                                });
                                                            } else {
                                                                var n = (new Date().getTimezoneOffset()) * 60000; //-19800000
                                                                var time = Date.now() - n;
                                                                var objNoti = {
                                                                    "userId": result3.userId,
                                                                    "notiBy": req.body.likeBy,
                                                                    "message": result.name + " liked your video " + result3.videoTitle,
                                                                    "title": "LIKE",
                                                                    "postId": result3._id,
                                                                    "postTitle": result3.videoTitle,
                                                                }

                                                                new Notification(objNoti).save((error8, result8) => {
                                                                    if (error8) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        User.findOne({
                                                                            "_id": result3.userId
                                                                        }, (error9, result9) => {
                                                                            if (error9) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error"
                                                                                })
                                                                            } else if (result9) {
                                                                                Tag.findOneAndUpdate({
                                                                                    userId: req.body.likeBy
                                                                                }, {
                                                                                        $addToSet: {
                                                                                            tag: result3.videosTag
                                                                                        }
                                                                                    }, {
                                                                                        new: true
                                                                                    }, (err1o, result10) => {
                                                                                        if (err1o) {
                                                                                            return res.send({
                                                                                                response_code: 500,
                                                                                                response_message: "Internal server error"
                                                                                            })
                                                                                        } else if (!result10) {

                                                                                            var value = {
                                                                                                "userId": req.body.likeBy,
                                                                                                "tag": result3.videosTag
                                                                                            }
                                                                                            new Tag(value).save((error9, result9) => {
                                                                                                if (error9) {
                                                                                                    return res.send({
                                                                                                        response_code: 500,
                                                                                                        response_message: "Internal server error"
                                                                                                    })
                                                                                                } else {
                                                                                                    func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                                    res.send({
                                                                                                        response_code: 200,
                                                                                                        response_message: "Success",
                                                                                                        Data: result8
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                            res.send({
                                                                                                response_code: 200,
                                                                                                response_message: "Success",
                                                                                                Data: result8
                                                                                            });
                                                                                        }
                                                                                    })

                                                                            }
                                                                        });


                                                                    }
                                                                });

                                                            }
                                                        }

                                                    })


                                            }
                                        }
                                    })
                                }

                            })
                        } else {
                            var query = {
                                $and: [{
                                    "likeBy": req.body.likeBy
                                }, {
                                    "postId": req.body.postId
                                }]
                            }
                            Like.findOneAndUpdate(query, {
                                $set: {
                                    "status": req.body.status
                                }
                            }, (err3, result3) => {
                                if (err3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'LIKE'
                                        }, {
                                            "postId": req.body.postId
                                        }]
                                    }
                                    Like.find(query, (error, result5) => {
                                        if (error)
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error."
                                            })
                                        else {
                                            Post.findByIdAndUpdate({
                                                "_id": req.body.postId
                                            }, {
                                                    $set: {
                                                        "likeCount": result5.length
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        if (req.body.status == 'LIKE') {
                                                            var value = {
                                                                "userId": req.body.likeBy,
                                                                "isLike": true
                                                            }
                                                            Post.findByIdAndUpdate({
                                                                "_id": req.body.postId
                                                            }, {
                                                                    $push: {
                                                                        likes: value
                                                                    }
                                                                }, {
                                                                    new: true
                                                                }, (err, obj) => {

                                                                    if (err) {
                                                                         return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        if (obj.userId == req.body.likeBy) {
                                                                            res.send({
                                                                                response_code: 200,
                                                                                response_message: "Success",
                                                                                Data: obj
                                                                            });
                                                                        } else {
                                                                            var n = (new Date().getTimezoneOffset()) * 60000; //-19800000
                                                                            var time = Date.now() - n;
                                                                            var objNoti = {
                                                                                "userId": obj.userId,
                                                                                "notiBy": req.body.likeBy,
                                                                                "message": result.name + " liked your video " + obj.videoTitle,
                                                                                "title": "LIKE",
                                                                                "postId": obj._id,
                                                                                "postTitle": obj.videoTitle,
                                                                            }
                                                                            new Notification(objNoti).save((error8, result8) => {
                                                                                if (error8) {
                                                                                    return res.send({
                                                                                        response_code: 500,
                                                                                        response_message: "Internal server error"
                                                                                    })
                                                                                } else {
                                                                                    User.findOne({
                                                                                        "_id": obj.userId
                                                                                    }, (error9, result9) => {
                                                                                        if (error9) {
                                                                                            return res.send({
                                                                                                response_code: 500,
                                                                                                response_message: "Internal server error"
                                                                                            })
                                                                                        } else {

                                                                                            Tag.findOneAndUpdate({
                                                                                                userId: req.body.likeBy
                                                                                            }, {
                                                                                                    $addToSet: {
                                                                                                        tag: obj.videosTag
                                                                                                    }
                                                                                                }, {
                                                                                                    new: true
                                                                                                }, (err1o, result10) => {
                                                                                                    if (err1o) {
                                                                                                        return res.send({
                                                                                                            response_code: 500,
                                                                                                            response_message: "Internal server error"
                                                                                                        })
                                                                                                    } else if (!result10) {

                                                                                                        var value = {
                                                                                                            "userId": req.body.likeBy,
                                                                                                            "tag": obj.videosTag
                                                                                                        }
                                                                                                        new Tag(value).save((error9, result9) => {
                                                                                                            if (error9) {
                                                                                                                return res.send({
                                                                                                                    response_code: 500,
                                                                                                                    response_message: "Internal server error"
                                                                                                                })
                                                                                                            } else {
                                                                                                                func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                                                res.send({
                                                                                                                    response_code: 200,
                                                                                                                    response_message: "Success",
                                                                                                                    Data: result8
                                                                                                                });
                                                                                                            }
                                                                                                        });
                                                                                                    } else {
                                                                                                        func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                                                        res.send({
                                                                                                            response_code: 200,
                                                                                                            response_message: "Success",
                                                                                                            Data: result8
                                                                                                        });
                                                                                                    }
                                                                                                })
                                                                                        }
                                                                                    });

                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                        } else {
                                                            Post.findOneAndUpdate({
                                                                _id: req.body.postId,
                                                                "likes.userId": req.body.likeBy
                                                            }, {
                                                                    $pull: {
                                                                        likes: {
                                                                            userId: req.body.likeBy
                                                                        }
                                                                    }
                                                                }, {
                                                                    safe: true,
                                                                    new: true
                                                                }, (err, obj) => {
                                                                    if (err) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Success",
                                                                            Data: obj
                                                                        });

                                                                    }

                                                                });
                                                        }



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

    //=====================================================Like List=====================================================//

    likeList: (req, res) => {
        if (!req.body.postId) {
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Like.paginate({
                "postId": req.body.postId
            }, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "Like list not forund"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },

    //========================================Follower================================================//

    followers: (req, res) => {
        if (!req.body.followTo || !req.body.followBy || !req.body.status) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            var query = {
                $or: [{
                    "_id": req.body.followBy
                }, {
                    "_id": req.body.followTo
                }]
            }
            User.findOne(query, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                        error
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "followBy": req.body.followBy
                        }, {
                            "followTo": req.body.followTo
                        }]
                    }
                    Follow.findOne(query, (err2, result2) => {
                        if (err2) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error",
                                err2
                            })
                        } else if (result2 && result2.status == req.body.status) {
                            res.send({
                                response_code: 200,
                                response_message: "Success"
                            });
                        } else if (!result2) {
                            var value = {
                                "followBy": req.body.followBy,
                                "status": req.body.status,
                                "followTo": req.body.followTo,
                            }
                            new Follow(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error",
                                        error1
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'FOLLOW'
                                        }, {
                                            "followTo": req.body.followTo
                                        }]
                                    }
                                    Follow.find(query, (error, result5) => {
                                        if (error) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error",
                                                error
                                            })
                                        } else {
                                            if (result5.length < 1) {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "success"
                                                })
                                            } else {
                                                var value = [{
                                                    "userId": req.body.followBy,
                                                    "isFollow": true
                                                }]

                                                User.findByIdAndUpdate({
                                                    "_id": req.body.followTo
                                                }, {
                                                        $set: {
                                                            "followerCount": result5.length
                                                        },
                                                        $push: {
                                                            followers: value
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error",
                                                                error3
                                                            })
                                                        } else {
                                                            var query = {
                                                                $and: [{
                                                                    "status": 'FOLLOW'
                                                                }, {
                                                                    "followBy": req.body.followBy
                                                                }]
                                                            }
                                                            Follow.find(query, (error8, result8) => {
                                                                if (error) {
                                                                    res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error",
                                                                        error8
                                                                    })
                                                                } else {
                                                                    var value1 = [{
                                                                        "userId": req.body.followTo,
                                                                        "isFollow": true
                                                                    }]
                                                                    User.findByIdAndUpdate({
                                                                        "_id": req.body.followBy
                                                                    }, {
                                                                            $set: {
                                                                                "followingCount": result8.length
                                                                            },
                                                                            $push: {
                                                                                following: value1
                                                                            }
                                                                        }, {
                                                                            new: true
                                                                        }, (error4, result4) => {
                                                                            if (error4) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error",
                                                                                    error4
                                                                                })
                                                                            } else {
                                                                                var n = (new Date().getTimezoneOffset()) * 60000; //-19800000
                                                                                var time = Date.now() - n;
                                                                                var objNoti = {
                                                                                    "userId": req.body.followTo,
                                                                                    "notiBy": req.body.followBy,
                                                                                    "message": result4.name + " followed you ",
                                                                                    "title": "FOLLOW",
                                                                                }
                                                                                new Notification(objNoti).save((error8, result8) => {
                                                                                    if (error8) {
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error"
                                                                                        })
                                                                                    } else {
                                                                                        User.findOne({
                                                                                            "_id": req.body.followTo
                                                                                        }, (error9, result9) => {
                                                                                            if (error9) {
                                                                                                return res.send({
                                                                                                    response_code: 500,
                                                                                                    response_message: "Internal server error"
                                                                                                })
                                                                                            } else {
                                                                                                func.sendiosNotification(result9.deviceToken, objNoti.message, result4._id, result4.name);
                                                                                                res.send({
                                                                                                    response_code: 200,
                                                                                                    response_message: "Success",
                                                                                                    Data: result4
                                                                                                });
                                                                                            }
                                                                                        });

                                                                                    }
                                                                                });

                                                                            }
                                                                        });
                                                                }
                                                            });
                                                        }
                                                    })
                                            }
                                        }
                                    })
                                }
                            })
                        } else {
                            var query = {
                                $and: [{
                                    "followBy": req.body.followBy
                                }, {
                                    "followTo": req.body.followTo
                                }]
                            }
                            Follow.findOneAndUpdate(query, {
                                $set: {
                                    "status": req.body.status
                                }
                            }, (err3, result3) => {
                                if (err3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'FOLLOW'
                                        }, {
                                            "followTo": req.body.followTo
                                        }]
                                    }
                                    Follow.find(query, (error, result5) => {
                                        if (error)
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error."
                                            })
                                        else {
                                            User.findByIdAndUpdate({
                                                "_id": req.body.followTo
                                            }, {
                                                    $set: {
                                                        "followerCount": result5.length
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        if (req.body.status == 'FOLLOW') {
                                                            var value = [{
                                                                "userId": req.body.followBy,
                                                                "isFollow": true
                                                            }]
                                                            User.findByIdAndUpdate({
                                                                "_id": req.body.followTo
                                                            }, {
                                                                    $set: {
                                                                        "followerCount": result5.length
                                                                    },
                                                                    $push: {
                                                                        followers: value
                                                                    }
                                                                }, {
                                                                    new: true
                                                                }, (error3, result3) => {
                                                                    if (error3) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error",
                                                                            error3
                                                                        })
                                                                    } else {
                                                                        var query = {
                                                                            $and: [{
                                                                                "status": 'FOLLOW'
                                                                            }, {
                                                                                "followBy": req.body.followBy
                                                                            }]
                                                                        }
                                                                        Follow.find(query, (error8, result8) => {
                                                                            if (error) {
                                                                                res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error",
                                                                                    error8
                                                                                })
                                                                            } else {
                                                                                var value1 = [{
                                                                                    "userId": req.body.followTo,
                                                                                    "isFollow": true
                                                                                }]
                                                                                User.findByIdAndUpdate({
                                                                                    "_id": req.body.followBy
                                                                                }, {
                                                                                        $set: {
                                                                                            "followingCount": result8.length
                                                                                        },
                                                                                        $push: {
                                                                                            following: value1
                                                                                        }
                                                                                    }, {
                                                                                        new: true
                                                                                    }, (error4, result4) => {
                                                                                        if (error4) {
                                                                                            console.log("Error 1 is============>", error4)
                                                                                            return res.send({
                                                                                                response_code: 500,
                                                                                                response_message: "Internal server error",
                                                                                                error4
                                                                                            })
                                                                                        } else {
                                                                                            var n = (new Date().getTimezoneOffset()) * 60000; //-19800000
                                                                                            var time = Date.now() - n;
                                                                                            var objNoti = {
                                                                                                "userId": req.body.followTo,
                                                                                                "notiBy": req.body.followBy,
                                                                                                "message": result4.name + " followed you ",
                                                                                                "title": "FOLLOW",
                                                                                            }
                                                                                            new Notification(objNoti).save((error8, result8) => {
                                                                                                if (error8) {
                                                                                                    return res.send({
                                                                                                        response_code: 500,
                                                                                                        response_message: "Internal server error"
                                                                                                    })
                                                                                                } else {
                                                                                                    User.findOne({
                                                                                                        "_id": req.body.followTo
                                                                                                    }, (error9, result9) => {
                                                                                                        if (error9) {
                                                                                                            return res.send({
                                                                                                                response_code: 500,
                                                                                                                response_message: "Internal server error"
                                                                                                            })
                                                                                                        } else {
                                                                                                            func.sendiosNotification(result9.deviceToken, objNoti.message, result4._id, result4.name);
                                                                                                            res.send({
                                                                                                                response_code: 200,
                                                                                                                response_message: "Success",
                                                                                                                Data: result4
                                                                                                            });
                                                                                                        }
                                                                                                    });

                                                                                                }
                                                                                            });

                                                                                        }
                                                                                    });
                                                                            }
                                                                        });

                                                                    }
                                                                })

                                                        } else {
                                                            User.findOneAndUpdate({
                                                                _id: req.body.followTo,
                                                                "followers.userId": req.body.followBy
                                                            }, {
                                                                    $pull: {
                                                                        followers: {
                                                                            userId: req.body.followBy
                                                                        }
                                                                    }
                                                                }, {
                                                                    safe: true,
                                                                    new: true
                                                                }, (err, obj) => {
                                                                    if (err) {
                                                                        res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error",
                                                                            
                                                                        })
                                                                    } else {
                                                                        var query = {
                                                                            $and: [{
                                                                                "status": 'FOLLOW'
                                                                            }, {
                                                                                "followBy": req.body.followBy
                                                                            }]
                                                                        }
                                                                        Follow.find(query, (error8, result8) => {
                                                                            if (error) {
                                                                                res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error",
                                                                                    
                                                                                })
                                                                            } else {
                                                                                var value1 = [{
                                                                                    "userId": req.body.followTo,
                                                                                    "isFollow": true
                                                                                }]
                                                                                User.findOneAndUpdate({
                                                                                    _id: req.body.followBy,
                                                                                    "following.userId": req.body.followTo
                                                                                }, {
                                                                                        $pull: {
                                                                                            following: {
                                                                                                userId: req.body.followTo
                                                                                            }
                                                                                        }
                                                                                    }, {
                                                                                        safe: true,
                                                                                        new: true
                                                                                    }, (err8, obj8) => {
                                                                                        if (err8) {
                                                                                            return res.send({
                                                                                                response_code: 500,
                                                                                                response_message: "Internal server error",
                                                                                            })
                                                                                        } else {
                                                                                            User.findByIdAndUpdate({
                                                                                                "_id": req.body.followBy
                                                                                            }, {
                                                                                                    $set: {
                                                                                                        "followingCount": result8.length
                                                                                                    }
                                                                                                }, {
                                                                                                    new: true
                                                                                                }, (error9, result9) => {
                                                                                                    if (error9) {
                                                                                                        res.send({
                                                                                                            response_code: 500,
                                                                                                            response_message: "Internal server error",
                                                                                                        })
                                                                                                    } else {
                                                                                                        res.send({
                                                                                                            response_code: 200,
                                                                                                            response_message: "Success",
                                                                                                            Data: result9
                                                                                                        });
                                                                                                    }
                                                                                                });

                                                                                        }
                                                                                    });
                                                                            }
                                                                        });


                                                                    }

                                                                });
                                                        }

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

//========================================Follower new ================================================//
    follower: (req, res) => {
       if (!req.body.followTo || !req.body.followBy || !req.body.status) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            var query = {
                $or: [{
                    "_id": req.body.followBy
                }, {
                    "_id": req.body.followTo
                }]
            }
            User.findOne({"_id": req.body.followBy}, (error, result) => {
                 if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    if(req.body.status == 'FOLLOW'){
                         var value = {
                                "followBy": req.body.followBy,
                                "status": req.body.status,
                                "followTo": req.body.followTo,
                            }
                             new Follow(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error",
                                    })
                                } else {
                                     var query = {
                                        $and: [{
                                            "status": 'FOLLOW'
                                        }, {
                                            "followTo": req.body.followTo
                                        }]
                                    }
                                    Follow.find(query, (error, result5) => {
                                        if (error) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error",
                                            })
                                        } else {
                                            var value = [{
                                                    "userId": req.body.followBy,
                                                    "isFollow": true
                                                }]
                                                 User.findByIdAndUpdate({ "_id": req.body.followTo}, {
                                                    $set: {
                                                        "followerCount": result5.length
                                                    },
                                                    $push: {
                                                        followers: value
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error",
                                                            })
                                                        } else {
                                                             var query = {
                                                                $and: [{
                                                                    "status": 'FOLLOW'
                                                                }, {
                                                                    "followBy": req.body.followBy
                                                                }]
                                                            }
                                                             Follow.find(query, (error8, result8) => {
                                                                if (error8) {
                                                                    res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error",
                                                                    })
                                                                } else {
                                                                     var value1 = [{
                                                                        "userId": req.body.followTo,
                                                                        "isFollow": true
                                                                    }]
                                                                     User.findByIdAndUpdate({ "_id": req.body.followBy}, {
                                                                            $set: {
                                                                                "followingCount": result8.length
                                                                            },
                                                                            $push: {
                                                                                following: value1
                                                                            }
                                                                        }, {
                                                                            new: true
                                                                        }, (error4, result4) => {
                                                                             if (error4) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error",
                                                                                })
                                                                            } else {
                                                                                var objNoti = {
                                                                                    "userId": req.body.followTo,
                                                                                    "notiBy": req.body.followBy,
                                                                                    "message": result4.name + " followed you ",
                                                                                    "title": "FOLLOW"
                                                                                }
                                                                                new Notification(objNoti).save((error11, result11) => {
                                                                                    if (error11) {
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error"
                                                                                        })
                                                                                    } else {
                                                                                        User.findOne({
                                                                                            "_id": req.body.followTo
                                                                                        }, (error9, result9) => {
                                                                                            if (error9) {
                                                                                                return res.send({
                                                                                                    response_code: 500,
                                                                                                    response_message: "Internal server error"
                                                                                                })
                                                                                            } else {
                                                                                                func.sendiosNotification(result9.deviceToken, objNoti.message, result4._id, result4.name);
                                                                                                res.send({
                                                                                                    response_code: 200,
                                                                                                    response_message: "User follow successfully.",
                                                                                                    Data: result4
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
                    }else if(req.body.status == 'UNFOLLOW'){
                         var query = {
                                $and: [{
                                    "followBy": req.body.followBy
                                }, {
                                    "followTo": req.body.followTo
                                }]
                            }
                            Follow.findOneAndRemove(query,(err3, result3) => {
                                if(err3){
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error",
                                    })
                                }else{
                                    User.findOneAndUpdate({ _id: req.body.followTo,"followers.userId": req.body.followBy}, {
                                            $pull: {
                                                followers: {
                                                    userId: req.body.followBy
                                                }
                                            }
                                        }, {
                                            safe: true,
                                            new: true
                                        }, (err, obj) => {
                                            if (err) {
                                               return res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error",
                                                }) 
                                            } else {
                                                 var query = {
                                                    $and: [{
                                                        "status": 'FOLLOW'
                                                    }, {
                                                        "followBy": req.body.followBy
                                                    }]
                                                }
                                                Follow.find(query, (error8, result8) => {
                                                    if (error8) {
                                                        res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error",
                                                            
                                                        })
                                                    } else {
                                                        User.findOneAndUpdate({_id: req.body.followBy, "following.userId": req.body.followTo
                                                    }, {
                                                            $pull: {
                                                                following: {
                                                                    userId: req.body.followTo
                                                                }
                                                            }
                                                        }, {
                                                            safe: true,
                                                            new: true
                                                        }, (err8, obj8) => {
                                                             if (err8) {
                                                                return res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error",
                                                                })
                                                            } else {
                                                                User.findByIdAndUpdate({"_id": req.body.followBy }, {
                                                                        $set: {
                                                                            "followingCount": result8.length
                                                                        }
                                                                        }, {
                                                                            new: true
                                                                        }, (error9, result9) => {
                                                                            if (error9) {
                                                                                res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error",
                                                                                })
                                                                            } else {
                                                                                var query = {
                                                                                    $and: [{
                                                                                        "status": 'FOLLOW'
                                                                                    }, {
                                                                                        "followTo": req.body.followTo
                                                                                    }]
                                                                                }
                                                                                Follow.find(query, (error12, result12) => {
                                                                                    if (error12)
                                                                                        res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error."
                                                                                        })
                                                                                    else {
                                                                                        User.findByIdAndUpdate({
                                                                                        "_id": req.body.followTo
                                                                                    }, {
                                                                                            $set: {
                                                                                                "followerCount": result12.length
                                                                                            }
                                                                                        }, {
                                                                                            new: true
                                                                                        }, (error13, result13) => { 
                                                                                         if (error12)
                                                                                        res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error."
                                                                                        })
                                                                                        else {
                                                                                            res.send({
                                                                                                response_code: 200,
                                                                                                response_message: "User unfollow successfully.",
                                                                                                Data: result9
                                                                                            });
                                                                                        }
                                                                                        })

                                                                                    }
                                                                                })



                                                                                
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
                    }else{
                        return res.send({
                            response_code: 400,
                            response_message: "Status not correct.",
                        })
                    }
                }
            })
        } 
    },

    //==============================================================follower List=====================================================//

    followerList: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "User Id is required"
            })
        } else {

            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                },
                populate: {
                    path: "followBy",
                    select: 'name username profilePic followerCount followers'
                },
                lean: true

            }
            var query = {
                $and: [{
                    "status": 'FOLLOW'
                }, {
                    "followTo": req.body.userId
                }]
            }
            Follow.paginate(query, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (result.length < 1) {
                    return res.send({
                        response_code: 500,
                        response_message: "Follower not found"
                    })
                } else {
                    let complete = result.docs
                    if (complete.length > 0) {
                        for (let key of complete) {
                            if (!key.followBy || key.followBy.length < 1) {
                                key.isFollowStatus = false;
                            } else if (key.followBy.followers && key.followBy.followers.length < 1) {
                                key.isFollowStatus = false;
                            } else {
                                for (let item of key.followBy.followers) {
                                    if (item.userId == req.body.userId) {
                                        key.isFollowStatus = true;
                                        console.log("error 1st condition1", item)
                                        break;
                                    } else {
                                        key.isFollowStatus = false;
                                    }
                                }

                            }

                        }
                    }
                    let pagination = {
                        "total": result.total
                    }
                    console.log("Record found successfully", complete)
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: complete,
                        total: result.total,
                        page: result.page,
                        pages: result.pages,
                        limit: result.limit
                    });
                }
            })
        }
    },

    //=====================================================followering List=====================================================//

    followingList: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "User Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                },
                populate: {
                    path: "followTo",
                    select: 'name username profilePic followerCount followers'
                },
                lean: true
            }
            var query = {
                $and: [{
                    "status": 'FOLLOW'
                }, {
                    "followBy": req.body.userId
                }]
            }
            Follow.paginate(query, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (result.length < 1) {
                    return res.send({
                        response_code: 500,
                        response_message: "Following not found"
                    })
                } else {
                    let complete = result.docs
                    if (complete.length > 0) {
                        for (let key of complete) {
                            if (!key.followTo || key.followTo.length < 1) {
                                key.isFollowStatus = false;
                            } else if (key.followTo.followers && key.followTo.followers.length < 1) {
                                key.isFollowStatus = false;
                            } else {
                                for (let item of key.followTo.followers) {
                                    if (item.userId == req.body.userId) {
                                        key.isFollowStatus = true;
                                        console.log("error 1st condition1", item)
                                        break;
                                    } else {
                                        key.isFollowStatus = false;
                                    }
                                }

                            }

                        }
                    }
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: complete,
                        total: result.total,
                        page: result.page,
                        pages: result.pages,
                        limit: result.limit
                    });
                }
            })
        }
    },
    //=====================================================Video View=====================================================//

    videosView: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "viewBy": req.body.userId
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Viewpost.findOne(query, (err2, result2) => {
                        if (err2) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (!result2) {
                            var value = {
                                "postId": req.body.postId,
                                "viewBy": req.body.userId
                            }
                            new Viewpost(value).save((error1, result1) => {
                                if (error1) {

                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    Viewpost.find({
                                        postId: req.body.postId
                                    }, (error5, result5) => {
                                        if (error5) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error."
                                            })
                                        } else {
                                            if (result5.length == 0) {
                                                res.send({
                                                    response_code: 401,
                                                    response_message: "list not found"
                                                })

                                            } else {
                                                var obj = {
                                                    "userId": req.body.userId,
                                                    "isView": true
                                                }
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "viewCount": result5.length
                                                        },
                                                        $push: {
                                                            views: obj
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {

                                                            Tag.findOneAndUpdate({
                                                                userId: req.body.userId
                                                            }, {
                                                                    $addToSet: {
                                                                        tag: result3.videosTag
                                                                    }
                                                                }, {
                                                                    new: true
                                                                }, (err1o, result10) => {
                                                                    if (err1o) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else if (!result10) {
                                                                        var viewTag = result3.videosTag;
                                                                        var stringTag = viewTag.toString();
                                                                        var value = {
                                                                            "userId": req.body.userId,
                                                                            "tag": result3.videosTag
                                                                        }
                                                                        new Tag(value).save((error9, result9) => {
                                                                            if (error9) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error"
                                                                                })
                                                                            } else {
                                                                                res.send({
                                                                                    response_code: 200,
                                                                                    response_message: "Success",
                                                                                    Data: result3
                                                                                });
                                                                            }
                                                                        });
                                                                    } else {
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Success",
                                                                            Data: result10
                                                                        });
                                                                    }
                                                                })




                                                        }
                                                    })


                                            }
                                        }
                                    })
                                }
                            })
                        } else {
                            res.send({
                                response_code: 200,
                                response_message: "Success"
                            });
                        }
                    })

                }
            })
        }
    },

    //======================Viewer List============================//

    viewerList: (req, res) => {
        if (!req.body.postId) {
            console.log("Post Id is required")
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Viewpost.paginate({
                "postId": req.body.postId
            }, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "Post is not correct"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },
    //===============================================================Book Marks=====================================================//

    bookMarks: (req, res) => {
        if (!req.body.postId || !req.body.bookMarkerId || !req.body.status) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.bookMarkerId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error1"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "bookMarkerId": req.body.bookMarkerId
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Bookmark.findOne(query, (err2, result2) => {
                        if (err2) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error2"
                            })
                        } else if (result2 && result2.status == req.body.status) {
                            res.send({
                                response_code: 200,
                                response_message: "success"
                            })
                        } else if (!result2) {
                            var value = {
                                "bookMarkerId": req.body.bookMarkerId,
                                "status": req.body.status,
                                "postId": req.body.postId,
                            }
                            new Bookmark(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error3"
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'SAVED'
                                        }, {
                                            "postId": req.body.postId
                                        }]
                                    }
                                    Bookmark.find(query, (error, result5) => {
                                        if (error) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error4"
                                            })
                                        } else {
                                            if (result5.length == 0) {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "success"
                                                })

                                            } else {
                                                var value = [{
                                                    "userId": req.body.bookMarkerId,
                                                    "isBookmark": true
                                                }]
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "bookMarksCount": result5.length,
                                                            "bookMarks": value
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error5"
                                                            })
                                                        } else {
                                                            res.send({
                                                                response_code: 200,
                                                                response_message: "Success",
                                                                Data: result3
                                                            });
                                                        }
                                                    })


                                            }
                                        }
                                    })
                                }

                            })
                        } else {
                            var query = {
                                $and: [{
                                    "bookMarkerId": req.body.bookMarkerId
                                }, {
                                    "postId": req.body.postId
                                }]
                            }
                            Bookmark.findOneAndUpdate(query, {
                                $set: {
                                    "status": req.body.status
                                }
                            }, (err3, result3) => {
                                if (err3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    var query = {
                                        $and: [{
                                            "status": 'SAVED'
                                        }, {
                                            "postId": req.body.postId
                                        }]
                                    }
                                    Bookmark.find(query, (error, result5) => {
                                        if (error)
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error.",
                                                error
                                            })
                                        else {
                                            if (req.body.status == 'SAVED') {
                                                var value = [{
                                                    "userId": req.body.bookMarkerId,
                                                    "isBookmark": true
                                                }]
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "bookMarksCount": result5.length,
                                                            "bookMarks": value
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            res.send({
                                                                response_code: 200,
                                                                response_message: "Success"
                                                            });
                                                        }
                                                    });
                                            } else {
                                                Post.findByIdAndUpdate({
                                                    _id: req.body.postId
                                                }, {
                                                        $set: {
                                                            "bookMarksCount": result5.length
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error9, result9) => {
                                                        if (error9) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            Post.findOneAndUpdate({
                                                                _id: req.body.postId,
                                                                "bookMarks.userId": req.body.bookMarkerId
                                                            }, {
                                                                    $pull: {
                                                                        bookMarks: {
                                                                            userId: req.body.bookMarkerId
                                                                        }
                                                                    }
                                                                }, {
                                                                    safe: true,
                                                                    new: true
                                                                }, (err, obj) => {
                                                                    if (err) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Success",
                                                                            Data: obj
                                                                        });
                                                                    }
                                                                });
                                                        }
                                                    });

                                            }

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

    //=====================================================Book marks List=====================================================//

    bookMarksList: (req, res) => {
        if (!req.body.postId) {
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Bookmark.paginate({
                "postId": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "User Id is not correct"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },

    //============================================Re-tweet===========================================//

    retweet: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "retweeterId": req.body.userId
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Retweet.findOne(query, (error10, result10) => {
                        if (error10) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result10) {
                            return res.send({
                                response_code: 500,
                                response_message: "You have already Reshared this post.",
                                result10
                            })
                        } else {
                            var value = {
                                "postId": req.body.postId,
                                "retweeterId": req.body.userId
                            }
                            new Retweet(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    Retweet.find({
                                        postId: req.body.postId
                                    }, (error5, result5) => {
                                        if (error5) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error."
                                            })
                                        } else {
                                            if (result5.length == 0) {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "success"
                                                })

                                            } else {
                                                var value = [{
                                                    "userId": req.body.userId,
                                                    "isRetweet": true
                                                }]
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "retweetCount": result5.length,
                                                            "retweets": value
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error2, result2) => {
                                                        if (error2) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            var newPost = {
                                                                "video": result2.video,
                                                                "videoTitle": result2.videoTitle,
                                                                "videosDescription": result2.videosDescription,
                                                                "visibility": result2.visibility,
                                                                "publicId": result2.publicId,
                                                                "userId": req.body.userId,
                                                                "duration": result2.duration,
                                                                "videosTag": result2.videosTag,
                                                                "thumbImage": result2.thumbImage,
                                                                "postUserId": result2.userId
                                                            }
                                                            new Post(newPost).save((error7, result7) => {
                                                                if (error7) {
                                                                    return res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error"
                                                                    })
                                                                } else {

                                                                    Retweet.findByIdAndUpdate({
                                                                        "_id": result1._id
                                                                    }, {
                                                                            $set: {
                                                                                "newPostId": result7._id
                                                                            }
                                                                        }, {
                                                                            new: true
                                                                        }, (error9, result9) => {
                                                                            if (error9) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error"
                                                                                })
                                                                            } else {
                                                                                res.send({
                                                                                    response_code: 200,
                                                                                    response_message: "Success",
                                                                                    result7
                                                                                });
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

                    });
                }
            })
        }
    },

    //========================================================Retweet List=====================================================//

    retweetList: (req, res) => {
        if (!req.body.postId) {
            console.log("Post Id is required")
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Retweet.paginate({
                "postId": req.body.postId
            }, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "Post is not correct"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },
    //===========================================================Share================================================================//

    sharePost: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    console.log("User id is not correct")
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var value = {
                        "postId": req.body.postId,
                        "shareBy": req.body.userId
                    }
                    new Share(value).save((error1, result1) => {
                        if (error1) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            Share.find({
                                postId: req.body.postId
                            }, (error5, result5) => {
                                if (error5) {
                                    res.send({
                                        response_code: 500,
                                        response_message: "Internal server error."
                                    })
                                } else {
                                    if (result5.length == 0) {
                                        res.send({
                                            response_code: 200,
                                            response_message: "Post share successfully"
                                        })

                                    } else {
                                        var value = [{
                                            "userId": req.body.userId,
                                            "isShare": true
                                        }]
                                        Post.findByIdAndUpdate({
                                            "_id": req.body.postId
                                        }, {
                                                $set: {
                                                    "shareCount": result5.length,
                                                    "shares": value
                                                }
                                            }, {
                                                new: true
                                            }, (error2, result2) => {
                                                if (error2) {
                                                    return res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error"
                                                    })
                                                } else {
                                                    if (result2.userId == req.body.userId) {
                                                        console.log("Success")
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: "Post share successfully"
                                                        });
                                                    } else {
                                                        var n = (new Date().getTimezoneOffset()) * 60000; //-19800000
                                                        var time = Date.now() - n;
                                                        var objNoti = {
                                                            "userId": result2.userId,
                                                            "notiBy": req.body.userId,
                                                            "message": result.name + " shared your video " + result2.videoTitle,
                                                            "title": "SHARE",
                                                            "postId": result2._id,
                                                            "postTitle": result2.videoTitle,
                                                        }

                                                        new Notification(objNoti).save((error8, result8) => {
                                                            if (error8) {
                                                                return res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error"
                                                                })
                                                            } else {
                                                                User.findOne({
                                                                    "_id": result2.userId
                                                                }, (error9, result9) => {
                                                                    if (error9) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        func.sendiosNotification(result9.deviceToken, objNoti.message, result._id, result.name);
                                                                        res.send({
                                                                            response_code: 200,
                                                                            response_message: "Post share successfully"
                                                                        });
                                                                    }
                                                                });

                                                            }
                                                        });
                                                    }


                                                }
                                            })
                                    }
                                }
                            })

                        }
                    })
                }
            })
        }
    },

    //===================================Retweet List============================================//

    shareList: (req, res) => {
        if (!req.body.postId) {
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }

            }
            Share.paginate({
                "postId": req.body.postId
            }, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "User Id is not correct"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Record found successfully",
                        Data: result
                    });
                }
            })
        }
    },

    //=====================================Get All post dublicate=======================================//

    getPosts: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            let options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                },
                populate: {
                    path: "userId",
                    select: 'name username profilePic follower'
                }
            }
            Post.paginate({}, options, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (result.length < 1) {
                    return res.send({
                        response_code: 500,
                        response_message: "Data not found"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Post found",
                        result
                    })
                }
            })

        }
    },

    //=====================================Get All Home post=======================================//
    blockList: (req, res) => {

        let options = {
            page: req.body.pageNumber || 1,
            limit: req.body.limit || 10,
            sort: {
                createdAt: -1
            },
            populate: {
                path: "blockUserId",
                select: 'name username profilePic'
            }
        }
        userPermissionModel.paginate({ userId: { $eq: [req.body.userId] } }, options, (error, result) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            }

            else {
                res.send({ response_code: 200, response_message: "Data removed successfully", result: result })
            }
        });
    },
    //=====================================Get All Home post=======================================//
    getHomePost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    userPermissionModel.find({ userId: req.body.userId }, (error, blockUserList) => {
                        if (error) {

                        } else {

                            let sendArray = [];
                            blockUserList.forEach(async (element) => {
                                console.log('elementelement', element)


                                sendArray.push(mongoose.Types.ObjectId(element.blockUserId));
                            });


                            // return 1;
                            var d = new Date();
                            var lessDate = d.setDate(d.getDate() - 30);
                            var todayDate = new Date(lessDate).toISOString().slice(0, 10);

                            var tag = [];
                            if (req.body.search) {
                                tag.push(req.body.search)
                            }

                            Tag.findOne({
                                "userId": req.body.userId
                            }, (errorr, resultt) => {
                                if (errorr) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error",
                                    })

                                } else {
                                    var userTag = [];
                                    if (resultt)
                                        userTag = resultt.tag;

                                    Post.aggregate([


                                        {
                                            $match: { status: 'ACTIVE' }
                                        },
                                        {
                                            $match: { postUserId: null }
                                        },
                                        {
                                            $match: {
                                                $or: [{
                                                    videosTag: {
                                                        $in: userTag
                                                    }
                                                }]
                                            },
                                        },
                                        {
                                            $match: {
                                                $or: [{
                                                    videosDescription: {
                                                        $regex: req.body.search,
                                                        $options: 'i'
                                                    }
                                                }, {
                                                    videosTag: {
                                                        $in: tag
                                                    }
                                                }, {
                                                    videoTitle: {
                                                        $regex: req.body.search,
                                                        $options: 'i'
                                                    }
                                                }]
                                            },
                                        },

                                        {
                                            $match: {
                                                createdAt: {
                                                    $gte: new Date(todayDate)
                                                }
                                            },
                                        },

                                        {
                                            $match: {
                                                $or: [{
                                                    userId: mongoose.Types.ObjectId(req.body.userId)
                                                }, {
                                                    visibility: 'PUBLIC'
                                                }]
                                            }
                                        },

                                        {
                                            $unwind: {
                                                path: "$likes",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            $unwind: {
                                                path: "$comments",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            $unwind: {
                                                path: "$bookMarks",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            $unwind: {
                                                path: "$retweets",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            $unwind: {
                                                path: "$shares",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            $unwind: {
                                                path: "$views",
                                                preserveNullAndEmptyArrays: true
                                            }
                                        },
                                        {
                                            "$project": {
                                                _id: 1,
                                                userLikeStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$likes.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },

                                                userCommentStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$comments.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },
                                                userBookMarkStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$bookMarks.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },
                                                userRetweetStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$retweets.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },
                                                userShareStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$shares.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },
                                                userViewStatus: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$views.userId', req.body.userId]
                                                        },
                                                        then: "TRUE",
                                                        else: "FALSE",
                                                    }
                                                },
                                                reportCount: 1,
                                                videosTag: 1,
                                                visibility: 1,
                                                videosDescription: 1,
                                                createdAt: 1,
                                                createdAt1: 1,
                                                status: 1,
                                                commentCount: 1,
                                                likeCount: 1,
                                                rateAvg: 1,
                                                viewCount: 1,
                                                bookMarksCount: 1,
                                                retweetCount: 1,
                                                reportCount: 1,
                                                video: 1,
                                                videoTitle: 1,
                                                publicId: 1,
                                                thumbImage: 1,
                                                duration: 1,
                                                userId: 1,
                                                likes: 1
                                            }
                                        },
                                        {
                                            $group: {
                                                _id: "$_id",
                                                "reportCount": {
                                                    "$first": "$reportCount"
                                                },
                                                "videosTag": {
                                                    "$first": "$videosTag"
                                                },
                                                "createdAt": {
                                                    "$first": "$createdAt"
                                                },
                                                "createdAt1": {
                                                    "$first": "$createdAt1"
                                                },
                                                "status": {
                                                    "$first": "$status"
                                                },
                                                "commentCount": {
                                                    "$first": "$commentCount"
                                                },
                                                "likeCount": {
                                                    "$first": "$likeCount"
                                                },
                                                "rateAvg": {
                                                    "$first": "$rateAvg"
                                                },
                                                "viewCount": {
                                                    "$first": "$viewCount"
                                                },
                                                "bookMarksCount": {
                                                    "$first": "$bookMarksCount"
                                                },
                                                "retweetCount": {
                                                    "$first": "$retweetCount"
                                                },
                                                "video": {
                                                    "$first": "$video"
                                                },
                                                "likes": {
                                                    "$first": "$likes"
                                                },
                                                "duration": {
                                                    "$first": "$duration"
                                                },
                                                "videoTitle": {
                                                    "$first": "$videoTitle"
                                                },
                                                "publicId": {
                                                    "$first": "$publicId"
                                                },
                                                "thumbImage": {
                                                    "$first": "$thumbImage"
                                                },
                                                "visibility": {
                                                    "$first": "$visibility"
                                                },
                                                "videosDescription": {
                                                    "$first": "$videosDescription"
                                                },
                                                "userLikeStatus": {
                                                    "$max": "$userLikeStatus"
                                                },
                                                "userCommentStatus": {
                                                    "$max": "$userCommentStatus"
                                                },
                                                "userBookMarkStatus": {
                                                    "$max": "$userBookMarkStatus"
                                                },
                                                "userRetweetStatus": {
                                                    "$max": "$userRetweetStatus"
                                                },
                                                "userShareStatus": {
                                                    "$max": "$userShareStatus"
                                                },
                                                "userViewStatus": {
                                                    "$max": "$userViewStatus"
                                                },
                                                "userId": {
                                                    "$max": "$userId"
                                                },
                                            }
                                        },

                                        {
                                            $lookup: {
                                                from: "user",
                                                localField: "userId",
                                                foreignField: "_id",
                                                as: "userData"
                                            }
                                        }
                                    ])
                                        .exec((err2, success2) => {
                                            if (err2)
                                                return res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error"
                                                })
                                            else {
                                                var aggregate = Post.aggregate([{
                                                    $unwind: {
                                                        path: "$videosTag",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $match: { status: 'ACTIVE' }
                                                },
                                                {
                                                    $match: { postUserId: null }
                                                },


                                                {
                                                    $match: {
                                                        videosTag: {
                                                            $nin: userTag
                                                        }
                                                    },
                                                },
                                                {
                                                    $match: {
                                                        $or: [{
                                                            videosDescription: {
                                                                $regex: req.body.search,
                                                                $options: 'i'
                                                            }
                                                        }, {
                                                            videosTag: {
                                                                $in: tag
                                                            }
                                                        }, {
                                                            videoTitle: {
                                                                $regex: req.body.search,
                                                                $options: 'i'
                                                            }
                                                        }]
                                                    },
                                                },

                                                {
                                                    $match: {
                                                        createdAt: {
                                                            $gte: new Date(todayDate)
                                                        }
                                                    },
                                                },

                                                {
                                                    $match: {
                                                        userId: {
                                                            $nin: sendArray
                                                        }
                                                    },
                                                },

                                                {
                                                    $match: {
                                                        $or: [{
                                                            userId: mongoose.Types.ObjectId(req.body.userId)
                                                        }, {
                                                            visibility: 'PUBLIC'
                                                        }]
                                                    }
                                                },

                                                {
                                                    $unwind: {
                                                        path: "$likes",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $unwind: {
                                                        path: "$comments",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $unwind: {
                                                        path: "$bookMarks",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $unwind: {
                                                        path: "$retweets",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $unwind: {
                                                        path: "$shares",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    $unwind: {
                                                        path: "$views",
                                                        preserveNullAndEmptyArrays: true
                                                    }
                                                },
                                                {
                                                    "$project": {
                                                        _id: 1,
                                                        userLikeStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$likes.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },

                                                        userCommentStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$comments.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },
                                                        userBookMarkStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$bookMarks.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },
                                                        userRetweetStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$retweets.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },
                                                        userShareStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$shares.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },
                                                        userViewStatus: {
                                                            $cond: {
                                                                if: {
                                                                    $eq: ['$views.userId', req.body.userId]
                                                                },
                                                                then: "TRUE",
                                                                else: "FALSE",
                                                            }
                                                        },
                                                        reportCount: 1,
                                                        videosTag: 1,
                                                        visibility: 1,
                                                        videosDescription: 1,
                                                        createdAt: 1,
                                                        createdAt1: 1,
                                                        status: 1,
                                                        commentCount: 1,
                                                        likeCount: 1,
                                                        rateAvg: 1,
                                                        viewCount: 1,
                                                        bookMarksCount: 1,
                                                        retweetCount: 1,
                                                        reportCount: 1,
                                                        video: 1,
                                                        videoTitle: 1,
                                                        publicId: 1,
                                                        thumbImage: 1,
                                                        duration: 1,
                                                        userId: 1,
                                                        likes: 1
                                                    }
                                                },
                                                {
                                                    $group: {
                                                        _id: "$_id",
                                                        "reportCount": {
                                                            "$first": "$reportCount"
                                                        },
                                                        "videosTag": {
                                                            "$first": "$videosTag"
                                                        },
                                                        "createdAt": {
                                                            "$first": "$createdAt"
                                                        },
                                                        "createdAt1": {
                                                            "$first": "$createdAt1"
                                                        },
                                                        "status": {
                                                            "$first": "$status"
                                                        },
                                                        "commentCount": {
                                                            "$first": "$commentCount"
                                                        },
                                                        "likeCount": {
                                                            "$first": "$likeCount"
                                                        },
                                                        "rateAvg": {
                                                            "$first": "$rateAvg"
                                                        },
                                                        "viewCount": {
                                                            "$first": "$viewCount"
                                                        },
                                                        "bookMarksCount": {
                                                            "$first": "$bookMarksCount"
                                                        },
                                                        "retweetCount": {
                                                            "$first": "$retweetCount"
                                                        },
                                                        "video": {
                                                            "$first": "$video"
                                                        },
                                                        "likes": {
                                                            "$first": "$likes"
                                                        },
                                                        "duration": {
                                                            "$first": "$duration"
                                                        },
                                                        "videoTitle": {
                                                            "$first": "$videoTitle"
                                                        },
                                                        "publicId": {
                                                            "$first": "$publicId"
                                                        },
                                                        "thumbImage": {
                                                            "$first": "$thumbImage"
                                                        },
                                                        "visibility": {
                                                            "$first": "$visibility"
                                                        },
                                                        "videosDescription": {
                                                            "$first": "$videosDescription"
                                                        },
                                                        "userLikeStatus": {
                                                            "$max": "$userLikeStatus"
                                                        },
                                                        "userCommentStatus": {
                                                            "$max": "$userCommentStatus"
                                                        },
                                                        "userBookMarkStatus": {
                                                            "$max": "$userBookMarkStatus"
                                                        },
                                                        "userRetweetStatus": {
                                                            "$max": "$userRetweetStatus"
                                                        },
                                                        "userShareStatus": {
                                                            "$max": "$userShareStatus"
                                                        },
                                                        "userViewStatus": {
                                                            "$max": "$userViewStatus"
                                                        },
                                                        "userId": {
                                                            "$max": "$userId"
                                                        },
                                                    }
                                                },
                                                {
                                                    $lookup: {
                                                        from: "user",
                                                        localField: "userId",
                                                        foreignField: "_id",
                                                        as: "userData"
                                                    }
                                                }
                                                ])
                                                    .exec((err3, success3) => {
                                                        if (err3)
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        else {

                                                            let concattedArray = success2;

                                                            console.log('concattedArrayconcattedArrayconcattedArray', concattedArray);
                                                            console.log('success3success3', success3);

                                                            if (success3.length) {
                                                                for (let data of success3)
                                                                    concattedArray.push(data)
                                                            }
                                                            if (concattedArray.length < 1) {
                                                                var data = [];
                                                                res.send({
                                                                    response_code: 200,
                                                                    response_message: "Post found",
                                                                    data
                                                                })
                                                            } else {
                                                                for (let key of concattedArray) {

                                                                    if (!key.userData[0].followers) {
                                                                        key.isFollowStatus = false;
                                                                    } else {
                                                                        for (item of key.userData[0].followers) {
                                                                            if (item.userId == req.body.userId) {
                                                                                key.isFollowStatus = true;
                                                                                break;
                                                                            } else {
                                                                                key.isFollowStatus = false;
                                                                            }
                                                                        }

                                                                    }

                                                                }

                                                                let page = req.body.pageNumber || 1,
                                                                    limit = req.body.limit || 4
                                                                var data1 = concattedArray.slice((page - 1) * limit, page * limit)
                                                                let data = {
                                                                    result: data1,
                                                                    page: page,
                                                                    total: concattedArray.length,
                                                                    limit: limit,
                                                                    pages: Math.ceil(concattedArray.length / limit)
                                                                }
                                                                res.send({
                                                                    response_code: 200,
                                                                    response_message: "Post found",
                                                                    data
                                                                })
                                                            }


                                                        }
                                                    })
                                            }
                                        })
                                }
                            })

                        }
                    })
                }
            });
        }
    },

    userPermission: (req, res) => {
        try {

            if (!req.body.userID || !req.body.blockUserID || !req.body.type) {
                res.send({ responseCode: 404, responseMessage: "Fields are required" })
            } else {
                if (req.body.type == "block") {
                    var blockDetails = { userId: req.body.userID, blockUserId: req.body.blockUserID }
                    new userPermissionModel(blockDetails).save((err, userSave) => {
                        if (err) {
                            res.send({ "responseMessage": "something went wrong" });

                        }
                        else {
                            res.send({ 'responseCode': 200, 'responseMessage': 'block Detail Created Successfully', result: userSave })
                        }
                    })
                }
                else if (req.body.type == "unblock") {

                    userPermissionModel.findOneAndRemove({ userId: req.body.userID, blockUserId: req.body.blockUserID }, (err1, result1) => {
                        if (err1) {
                            res.send({ response_code: 500, response_message: "Internal server error" })
                        }
                        else if (!result1) {
                            res.send({ response_code: 404, response_message: "Data not found" })
                        }
                        else {
                            res.send({ response_code: 200, response_message: "Data removed successfully" })
                        }
                    })
                }
            }
        }
        catch (error) {
            throw error
        }

    },

    //=====================================Get All post=======================================//
    getPost: (req, res) => {
        if (!req.body.userId) {
            console.log("Fields are required")
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                   


                    userPermissionModel.find({ userId: req.body.userId }, (error, blockUserList) => {
                        if (error) {

                        } else {

                            let sendArray = [];
                            blockUserList.forEach(async (element) => {
                                console.log('elementelement', element)


                                sendArray.push(mongoose.Types.ObjectId(element.blockUserId));
                            });

                    if (req.body.type == '2') {
                        var d = new Date();
                        var lessDate = d.setDate(d.getDate() - 30);
                        var todayDate = new Date(lessDate).toISOString().slice(0, 10);
                    }
                    else {
                        var todayDate = '';
                    }

                    var tag = [];
                    tag.push(req.body.search)

                    var aggregate = Post.aggregate([{
                        $unwind: {
                            path: "$videosTag",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                     {
                        $match: {status: 'ACTIVE'}
                     },
                     {
                        $match: {postUserId: null}
                     },

                        {
                            $match: {
                                userId: {
                                    $nin: sendArray
                                }
                            },
                        },

                    {
                        $match: {
                            $or: [{
                                videosDescription: {
                                    $regex: req.body.search,
                                    $options: 'i'
                                }
                            }, {
                                videosTag: {
                                    $in: tag
                                }
                            }, {
                                videoTitle: {
                                    $regex: req.body.search,
                                    $options: 'i'
                                }
                            }]
                        },
                    },

                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(todayDate)
                            }
                        },
                    },

                    {
                        $match: {
                            $or: [{
                                userId: mongoose.Types.ObjectId(req.body.userId)
                            }, {
                                visibility: 'PUBLIC'
                            }]
                        }
                    },
                    {
                        $unwind: {
                            path: "$likes",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$bookMarks",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$retweets",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$shares",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$views",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        "$project": {
                            _id: 1,
                            userLikeStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$likes.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },

                            userCommentStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$comments.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userBookMarkStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$bookMarks.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userRetweetStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$retweets.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userShareStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$shares.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userViewStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$views.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            reportCount: 1,
                            videosTag: 1,
                            visibility: 1,
                            videosDescription: 1,
                            createdAt: 1,
                            createdAt1: 1,
                            status: 1,
                            commentCount: 1,
                            likeCount: 1,
                            rateAvg: 1,
                            viewCount: 1,
                            bookMarksCount: 1,
                            retweetCount: 1,
                            reportCount: 1,
                            video: 1,
                            videoTitle: 1,
                            publicId: 1,
                            thumbImage: 1,
                            duration: 1,
                            userId: 1,
                            likes: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "reportCount": {
                                "$first": "$reportCount"
                            },
                            "videosTag": {
                                "$first": "$videosTag"
                            },
                            "createdAt": {
                                "$first": "$createdAt"
                            },
                            "createdAt1": {
                                "$first": "$createdAt1"
                            },
                            "status": {
                                "$first": "$status"
                            },
                            "commentCount": {
                                "$first": "$commentCount"
                            },
                            "likeCount": {
                                "$first": "$likeCount"
                            },
                            "rateAvg": {
                                "$first": "$rateAvg"
                            },
                            "viewCount": {
                                "$first": "$viewCount"
                            },
                            "bookMarksCount": {
                                "$first": "$bookMarksCount"
                            },
                            "retweetCount": {
                                "$first": "$retweetCount"
                            },
                            "video": {
                                "$first": "$video"
                            },
                            "likes": {
                                "$first": "$likes"
                            },
                            "duration": {
                                "$first": "$duration"
                            },
                            "videoTitle": {
                                "$first": "$videoTitle"
                            },
                            "publicId": {
                                "$first": "$publicId"
                            },
                            "thumbImage": {
                                "$first": "$thumbImage"
                            },
                            "visibility": {
                                "$first": "$visibility"
                            },
                            "videosDescription": {
                                "$first": "$videosDescription"
                            },
                            "userLikeStatus": {
                                "$max": "$userLikeStatus"
                            },
                            "userCommentStatus": {
                                "$max": "$userCommentStatus"
                            },
                            "userBookMarkStatus": {
                                "$max": "$userBookMarkStatus"
                            },
                            "userRetweetStatus": {
                                "$max": "$userRetweetStatus"
                            },
                            "userShareStatus": {
                                "$max": "$userShareStatus"
                            },
                            "userViewStatus": {
                                "$max": "$userViewStatus"
                            },
                            "userId": {
                                "$max": "$userId"
                            },
                        }
                    },
                    {
                        $lookup: {
                            from: "user",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData"
                        }
                    }
                    ])

                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },

                        lean: true
                    }

                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    }
            )
    }
    },

    //=====================================Get All trading post=======================================//
    getTradingPost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var tag = [];
                    tag.push(req.body.search)
                    userPermissionModel.find({ userId: req.body.userId }, (error, blockUserList) => {
                        if (error) {

                        } else {
                    let sendArray = [];
                    blockUserList.forEach(async (element) => {
                        console.log('elementelement', element)


                        sendArray.push(mongoose.Types.ObjectId(element.blockUserId));
                    });
                    var aggregate = Post.aggregate([{
                        $unwind: {
                            path: "$videosTag",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $match: {status: 'ACTIVE'}
                     },
                        {
                            $match: {
                                userId: {
                                    $nin: sendArray
                                }
                            },
                        },
                     {
                        $match: {postUserId: null}
                     },
                    {
                        $match: {
                            $or: [{
                                videosDescription: {
                                    $regex: req.body.search,
                                    $options: 'i'
                                }
                            }, {
                                videosTag: {
                                    $in: tag
                                }
                            }, {
                                videoTitle: {
                                    $regex: req.body.search,
                                    $options: 'i'
                                }
                            }]
                        },
                    },
                    {
                        $match: {
                            $or: [{
                                userId: mongoose.Types.ObjectId(req.body.userId)
                            }, {
                                visibility: 'PUBLIC'
                            }]
                        }
                    },
                    {
                        $unwind: {
                            path: "$likes",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$bookMarks",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$retweets",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$shares",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$views",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        "$project": {
                            _id: 1,
                            userLikeStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$likes.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },

                            userCommentStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$comments.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userBookMarkStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$bookMarks.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userRetweetStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$retweets.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userShareStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$shares.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userViewStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$views.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            reportCount: 1,
                            videosTag: 1,
                            visibility: 1,
                            videosDescription: 1,
                            createdAt: 1,
                            createdAt1: 1,
                            status: 1,
                            commentCount: 1,
                            likeCount: 1,
                            rateAvg: 1,
                            viewCount: 1,
                            bookMarksCount: 1,
                            retweetCount: 1,
                            reportCount: 1,
                            video: 1,
                            videoTitle: 1,
                            publicId: 1,
                            thumbImage: 1,
                            duration: 1,
                            userId: 1,
                            likes: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "reportCount": {
                                "$first": "$reportCount"
                            },
                            "videosTag": {
                                "$first": "$videosTag"
                            },
                            "createdAt": {
                                "$first": "$createdAt"
                            },
                            "createdAt1": {
                                "$first": "$createdAt1"
                            },
                            "status": {
                                "$first": "$status"
                            },
                            "commentCount": {
                                "$first": "$commentCount"
                            },
                            "likeCount": {
                                "$first": "$likeCount"
                            },
                            "rateAvg": {
                                "$first": "$rateAvg"
                            },
                            "viewCount": {
                                "$first": "$viewCount"
                            },
                            "bookMarksCount": {
                                "$first": "$bookMarksCount"
                            },
                            "retweetCount": {
                                "$first": "$retweetCount"
                            },
                            "video": {
                                "$first": "$video"
                            },
                            "likes": {
                                "$first": "$likes"
                            },
                            "duration": {
                                "$first": "$duration"
                            },
                            "videoTitle": {
                                "$first": "$videoTitle"
                            },
                            "publicId": {
                                "$first": "$publicId"
                            },
                            "thumbImage": {
                                "$first": "$thumbImage"
                            },
                            "visibility": {
                                "$first": "$visibility"
                            },
                            "videosDescription": {
                                "$first": "$videosDescription"
                            },
                            "userLikeStatus": {
                                "$max": "$userLikeStatus"
                            },
                            "userCommentStatus": {
                                "$max": "$userCommentStatus"
                            },
                            "userBookMarkStatus": {
                                "$max": "$userBookMarkStatus"
                            },
                            "userRetweetStatus": {
                                "$max": "$userRetweetStatus"
                            },
                            "userShareStatus": {
                                "$max": "$userShareStatus"
                            },
                            "userViewStatus": {
                                "$max": "$userViewStatus"
                            },
                            "userId": {
                                "$max": "$userId"
                            },
                        }
                    },
                    {
                        $lookup: {
                            from: "user",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData"
                        }
                    },
                    // {
                    //     $sort: {
                    //         viewCount: -1
                    //     }
                    // },
                    // {
                    //     $sort: {
                    //         likeCount: -1 
                    //     }
                    // },
                    // {
                    //     $sort: {
                    //         retweetCount: -1
                    //     }
                    // },
                    ])

                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            console.log("Error  is============>", err)
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            //let complete = success
                            let data1=success;
                            data1.forEach(x=>x.allSum=x.viewCount+x.likeCount+x.retweetCount);
                            data1.sort((a,b) => (a.allSum < b.allSum) ? 1 : ((b.allSum < a.allSum) ? -1 : 0));
                            let complete = data1;
                            for (let key of complete) {
                                if (!key.userData) {
                                    key.isFollowStatus = false;
                                    console.log("error 1st condition", key.userData.followers)
                                } else {
                                    if (!key.userData) {
                                        for (item of key.userData[0].followers) {
                                            if (item.userId == req.body.userId) {
                                                key.isFollowStatus = true;
                                                break;
                                            } else {
                                                key.isFollowStatus = false;
                                            }
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,             
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    })
    }

    },
    //=====================================Get All Tag Post=======================================//
    getTagPost: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 500,
                response_message: "All Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    Post.findOne({
                        "_id": req.body.postId
                    }, (error4, result4) => {
                        if (error4) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            var d = new Date();
                            var lessDate = d.setDate(d.getDate() - 90);
                            var todayDate = new Date(lessDate).toISOString().slice(0, 10);

                            var tag = result4.videosTag;
                            var aggregate = Post.aggregate([{
                                $unwind: {
                                    path: "$videosTag",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $match: {status: 'ACTIVE'}
                             },
                             {
                                $match: {postUserId: null}
                             },
                            {
                                $match: {
                                    $or: [{
                                        userId: mongoose.Types.ObjectId(req.body.userId)
                                    }, {
                                        visibility: 'PUBLIC'
                                    }]
                                }

                            },
                            {
                                $match: {
                                    _id: {
                                        $ne: mongoose.Types.ObjectId(req.body.postId)
                                    }
                                }
                            },
                            {
                                $match: {
                                    createdAt: {
                                        $gte: new Date(todayDate)
                                    }
                                },
                            },

                            {
                                $match: {
                                    $and: [{
                                        videosTag: {
                                            $in: tag
                                        }
                                    },
                                    ]
                                }
                            },

                            {
                                $unwind: {
                                    path: "$likes",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$comments",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$bookMarks",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$retweets",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$shares",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $unwind: {
                                    path: "$views",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                "$project": {
                                    _id: 1,
                                    userLikeStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$likes.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },

                                    userCommentStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$comments.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },
                                    userBookMarkStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$bookMarks.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },
                                    userRetweetStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$retweets.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },
                                    userShareStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$shares.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },
                                    userViewStatus: {
                                        $cond: {
                                            if: {
                                                $eq: ['$views.userId', req.body.userId]
                                            },
                                            then: "TRUE",
                                            else: "FALSE",
                                        }
                                    },
                                    reportCount: 1,
                                    videosTag: 1,
                                    visibility: 1,
                                    videosDescription: 1,
                                    createdAt: 1,
                                    createdAt1: 1,
                                    status: 1,
                                    commentCount: 1,
                                    likeCount: 1,
                                    rateAvg: 1,
                                    viewCount: 1,
                                    bookMarksCount: 1,
                                    retweetCount: 1,
                                    reportCount: 1,
                                    video: 1,
                                    videoTitle: 1,
                                    publicId: 1,
                                    thumbImage: 1,
                                    duration: 1,
                                    userId: 1,
                                    likes: 1
                                }
                            },
                            {
                                $group: {
                                    _id: "$_id",
                                    "reportCount": {
                                        "$first": "$reportCount"
                                    },
                                    "videosTag": {
                                        "$first": "$videosTag"
                                    },
                                    "createdAt": {
                                        "$first": "$createdAt"
                                    },
                                    "createdAt1": {
                                        "$first": "$createdAt1"
                                    },
                                    "status": {
                                        "$first": "$status"
                                    },
                                    "commentCount": {
                                        "$first": "$commentCount"
                                    },
                                    "likeCount": {
                                        "$first": "$likeCount"
                                    },
                                    "rateAvg": {
                                        "$first": "$rateAvg"
                                    },
                                    "viewCount": {
                                        "$first": "$viewCount"
                                    },
                                    "bookMarksCount": {
                                        "$first": "$bookMarksCount"
                                    },
                                    "retweetCount": {
                                        "$first": "$retweetCount"
                                    },
                                    "video": {
                                        "$first": "$video"
                                    },
                                    "likes": {
                                        "$first": "$likes"
                                    },
                                    "duration": {
                                        "$first": "$duration"
                                    },
                                    "videoTitle": {
                                        "$first": "$videoTitle"
                                    },
                                    "publicId": {
                                        "$first": "$publicId"
                                    },
                                    "thumbImage": {
                                        "$first": "$thumbImage"
                                    },
                                    "visibility": {
                                        "$first": "$visibility"
                                    },
                                    "videosDescription": {
                                        "$first": "$videosDescription"
                                    },
                                    "userLikeStatus": {
                                        "$max": "$userLikeStatus"
                                    },
                                    "userCommentStatus": {
                                        "$max": "$userCommentStatus"
                                    },
                                    "userBookMarkStatus": {
                                        "$max": "$userBookMarkStatus"
                                    },
                                    "userRetweetStatus": {
                                        "$max": "$userRetweetStatus"
                                    },
                                    "userShareStatus": {
                                        "$max": "$userShareStatus"
                                    },
                                    "userViewStatus": {
                                        "$max": "$userViewStatus"
                                    },
                                    "userId": {
                                        "$max": "$userId"
                                    },
                                }
                            },
                            {
                                $lookup: {
                                    from: "user",
                                    localField: "userId",
                                    foreignField: "_id",
                                    as: "userData"
                                }
                            }

                            ])

                            let options = {
                                page: req.body.pageNumber || 1,
                                limit: req.body.limit || 10,
                                sort: {
                                    createdAt: -1
                                },

                                lean: true
                            }
                            Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                                if (err) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    let complete = success
                                    for (let key of complete) {
                                        if (!key.userData[0].followers) {
                                            key.isFollowStatus = false;
                                        } else {
                                            for (item of key.userData[0].followers) {
                                                if (item.userId == req.body.userId) {
                                                    key.isFollowStatus = true;
                                                    break;
                                                } else {
                                                    key.isFollowStatus = false;
                                                }
                                            }

                                        }

                                    }
                                    let data = {
                                        result: complete,
                                        page: options.page,
                                        limit: options.limit,
                                        pages: pages,
                                        total: total
                                    }
                                    res.send({
                                        response_code: 200,
                                        response_message: "Post found",
                                        data
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    //=====================================Get All Likes user post=======================================//
    getLikesPost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var aggregate = Post.aggregate([{
                        $unwind: {
                            path: "$likes",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $match: {
                            "likes.userId": req.body.userId
                        }
                    },
                    {
                        $unwind: {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$bookMarks",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$retweets",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$shares",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$views",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        "$project": {
                            _id: 1,
                            userLikeStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$likes.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },

                            userCommentStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$comments.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userBookMarkStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$bookMarks.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userRetweetStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$retweets.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userShareStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$shares.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userViewStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$views.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            reportCount: 1,
                            videosTag: 1,
                            visibility: 1,
                            videosDescription: 1,
                            createdAt: 1,
                            createdAt1: 1,
                            status: 1,
                            commentCount: 1,
                            likeCount: 1,
                            rateAvg: 1,
                            viewCount: 1,
                            bookMarksCount: 1,
                            retweetCount: 1,
                            reportCount: 1,
                            video: 1,
                            videoTitle: 1,
                            publicId: 1,
                            thumbImage: 1,
                            duration: 1,
                            userId: 1,
                            likes: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "reportCount": {
                                "$first": "$reportCount"
                            },
                            "videosTag": {
                                "$first": "$videosTag"
                            },
                            "createdAt": {
                                "$first": "$createdAt"
                            },
                            "createdAt1": {
                                "$first": "$createdAt1"
                            },
                            "status": {
                                "$first": "$status"
                            },
                            "commentCount": {
                                "$first": "$commentCount"
                            },
                            "likeCount": {
                                "$first": "$likeCount"
                            },
                            "rateAvg": {
                                "$first": "$rateAvg"
                            },
                            "viewCount": {
                                "$first": "$viewCount"
                            },
                            "bookMarksCount": {
                                "$first": "$bookMarksCount"
                            },
                            "retweetCount": {
                                "$first": "$retweetCount"
                            },
                            "video": {
                                "$first": "$video"
                            },
                            "likes": {
                                "$first": "$likes"
                            },
                            "duration": {
                                "$first": "$duration"
                            },
                            "videoTitle": {
                                "$first": "$videoTitle"
                            },
                            "publicId": {
                                "$first": "$publicId"
                            },
                            "thumbImage": {
                                "$first": "$thumbImage"
                            },
                            "visibility": {
                                "$first": "$visibility"
                            },
                            "videosDescription": {
                                "$first": "$videosDescription"
                            },
                            "userLikeStatus": {
                                "$max": "$userLikeStatus"
                            },
                            "userCommentStatus": {
                                "$max": "$userCommentStatus"
                            },
                            "userBookMarkStatus": {
                                "$max": "$userBookMarkStatus"
                            },
                            "userRetweetStatus": {
                                "$max": "$userRetweetStatus"
                            },
                            "userShareStatus": {
                                "$max": "$userShareStatus"
                            },
                            "userViewStatus": {
                                "$max": "$userViewStatus"
                            },
                            "userId": {
                                "$max": "$userId"
                            },
                        }
                    },
                    {
                        $lookup: {
                            from: "user",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData"
                        }
                    },
                    ])
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },

                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Likes post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    },

    //=====================================Get All saved user post=======================================//
    getBookMarksPost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var aggregate = Post.aggregate([
                        {
                            $unwind: {
                                path: "$likes",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$comments",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$bookMarks",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                "bookMarks.userId": req.body.userId
                            }
                        },
                        {
                            $unwind: {
                                path: "$retweets",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$shares",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$views",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            "$project": {
                                _id: 1,
                                userLikeStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$likes.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },

                                userCommentStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$comments.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userBookMarkStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$bookMarks.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userRetweetStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$retweets.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userShareStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$shares.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userViewStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$views.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                reportCount: 1,
                                videosTag: 1,
                                visibility: 1,
                                videosDescription: 1,
                                createdAt: 1,
                                createdAt1: 1,
                                status: 1,
                                commentCount: 1,
                                likeCount: 1,
                                rateAvg: 1,
                                viewCount: 1,
                                bookMarksCount: 1,
                                retweetCount: 1,
                                reportCount: 1,
                                video: 1,
                                videoTitle: 1,
                                publicId: 1,
                                thumbImage: 1,
                                duration: 1,
                                userId: 1,
                                bookMarks: 1
                            }
                        },
                        {
                            $group: {
                                _id: "$_id",
                                "reportCount": {
                                    "$first": "$reportCount"
                                },
                                "videosTag": {
                                    "$first": "$videosTag"
                                },
                                "createdAt": {
                                    "$first": "$createdAt"
                                },
                                "createdAt1": {
                                    "$first": "$createdAt1"
                                },
                                "status": {
                                    "$first": "$status"
                                },
                                "commentCount": {
                                    "$first": "$commentCount"
                                },
                                "likeCount": {
                                    "$first": "$likeCount"
                                },
                                "rateAvg": {
                                    "$first": "$rateAvg"
                                },
                                "viewCount": {
                                    "$first": "$viewCount"
                                },
                                "bookMarksCount": {
                                    "$first": "$bookMarksCount"
                                },
                                "retweetCount": {
                                    "$first": "$retweetCount"
                                },
                                "video": {
                                    "$first": "$video"
                                },
                                "bookMarks": {
                                    "$first": "$bookMarks"
                                },
                                "duration": {
                                    "$first": "$duration"
                                },
                                "videoTitle": {
                                    "$first": "$videoTitle"
                                },
                                "publicId": {
                                    "$first": "$publicId"
                                },
                                "thumbImage": {
                                    "$first": "$thumbImage"
                                },
                                "visibility": {
                                    "$first": "$visibility"
                                },
                                "videosDescription": {
                                    "$first": "$videosDescription"
                                },
                                "userLikeStatus": {
                                    "$max": "$userLikeStatus"
                                },
                                "userCommentStatus": {
                                    "$max": "$userCommentStatus"
                                },
                                "userBookMarkStatus": {
                                    "$max": "$userBookMarkStatus"
                                },
                                "userRetweetStatus": {
                                    "$max": "$userRetweetStatus"
                                },
                                "userShareStatus": {
                                    "$max": "$userShareStatus"
                                },
                                "userViewStatus": {
                                    "$max": "$userViewStatus"
                                },
                                "userId": {
                                    "$max": "$userId"
                                },
                            }
                        },
                        {
                            $lookup: {
                                from: "user",
                                localField: "userId",
                                foreignField: "_id",
                                as: "userData"
                            }
                        },
                    ])
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },

                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Likes post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    },

    //=====================================Get All History user post=======================================//
    getHistoryPost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var aggregate = Post.aggregate([
                        {
                            $unwind: {
                                path: "$likes",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$comments",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$bookMarks",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$retweets",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$shares",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$views",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                "views.userId": req.body.userId
                            }
                        },
                        {
                            "$project": {
                                _id: 1,
                                userLikeStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$likes.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },

                                userCommentStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$comments.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userBookMarkStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$bookMarks.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userRetweetStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$retweets.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userShareStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$shares.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userViewStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$views.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                reportCount: 1,
                                videosTag: 1,
                                visibility: 1,
                                videosDescription: 1,
                                createdAt: 1,
                                createdAt1: 1,
                                status: 1,
                                commentCount: 1,
                                likeCount: 1,
                                rateAvg: 1,
                                viewCount: 1,
                                bookMarksCount: 1,
                                retweetCount: 1,
                                reportCount: 1,
                                video: 1,
                                videoTitle: 1,
                                publicId: 1,
                                thumbImage: 1,
                                duration: 1,
                                userId: 1,
                                views: 1
                            }
                        },
                        {
                            $group: {
                                _id: "$_id",
                                "reportCount": {
                                    "$first": "$reportCount"
                                },
                                "videosTag": {
                                    "$first": "$videosTag"
                                },
                                "createdAt": {
                                    "$first": "$createdAt"
                                },
                                "createdAt1": {
                                    "$first": "$createdAt1"
                                },
                                "status": {
                                    "$first": "$status"
                                },
                                "commentCount": {
                                    "$first": "$commentCount"
                                },
                                "likeCount": {
                                    "$first": "$likeCount"
                                },
                                "rateAvg": {
                                    "$first": "$rateAvg"
                                },
                                "viewCount": {
                                    "$first": "$viewCount"
                                },
                                "bookMarksCount": {
                                    "$first": "$bookMarksCount"
                                },
                                "retweetCount": {
                                    "$first": "$retweetCount"
                                },
                                "video": {
                                    "$first": "$video"
                                },
                                "views": {
                                    "$first": "$views"
                                },
                                "duration": {
                                    "$first": "$duration"
                                },
                                "videoTitle": {
                                    "$first": "$videoTitle"
                                },
                                "publicId": {
                                    "$first": "$publicId"
                                },
                                "thumbImage": {
                                    "$first": "$thumbImage"
                                },
                                "visibility": {
                                    "$first": "$visibility"
                                },
                                "videosDescription": {
                                    "$first": "$videosDescription"
                                },
                                "userLikeStatus": {
                                    "$max": "$userLikeStatus"
                                },
                                "userCommentStatus": {
                                    "$max": "$userCommentStatus"
                                },
                                "userBookMarkStatus": {
                                    "$max": "$userBookMarkStatus"
                                },
                                "userRetweetStatus": {
                                    "$max": "$userRetweetStatus"
                                },
                                "userShareStatus": {
                                    "$max": "$userShareStatus"
                                },
                                "userViewStatus": {
                                    "$max": "$userViewStatus"
                                },
                                "userId": {
                                    "$max": "$userId"
                                },
                            }
                        },
                        {
                            $lookup: {
                                from: "user",
                                localField: "userId",
                                foreignField: "_id",
                                as: "userData"
                            }
                        },
                    ])

                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },

                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "History post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    },

    //=====================================Get All Upload user post=======================================//
    getUploadPost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var aggregate = Post.aggregate([
                    {
                        $match: {
                            $and: [{
                                userId: mongoose.Types.ObjectId(req.body.userId)
                            }, {
                                postUserId: null
                            }]
                        }
                    },
                    
                    {
                        $unwind: {
                            path: "$likes",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$comments",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$bookMarks",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$retweets",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    
                    {
                        $unwind: {
                            path: "$shares",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $unwind: {
                            path: "$views",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        "$project": {
                            _id: 1,
                            userLikeStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$likes.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userCommentStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$comments.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userBookMarkStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$bookMarks.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userRetweetStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$retweets.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userShareStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$shares.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            userViewStatus: {
                                $cond: {
                                    if: {
                                        $eq: ['$views.userId', req.body.userId]
                                    },
                                    then: "TRUE",
                                    else: "FALSE",
                                }
                            },
                            reportCount: 1,
                            videosTag: 1,
                            visibility: 1,
                            videosDescription: 1,
                            createdAt: 1,
                            createdAt1: 1,
                            status: 1,
                            commentCount: 1,
                            likeCount: 1,
                            rateAvg: 1,
                            viewCount: 1,
                            bookMarksCount: 1,
                            retweetCount: 1,
                            reportCount: 1,
                            video: 1,
                            videoTitle: 1,
                            publicId: 1,
                            thumbImage: 1,
                            duration: 1,
                            userId: 1,
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "reportCount": {
                                "$first": "$reportCount"
                            },
                            "videosTag": {
                                "$first": "$videosTag"
                            },
                            "createdAt": {
                                "$first": "$createdAt"
                            },
                            "createdAt1": {
                                "$first": "$createdAt1"
                            },
                            "status": {
                                "$first": "$status"
                            },
                            "commentCount": {
                                "$first": "$commentCount"
                            },
                            "likeCount": {
                                "$first": "$likeCount"
                            },
                            "rateAvg": {
                                "$first": "$rateAvg"
                            },
                            "viewCount": {
                                "$first": "$viewCount"
                            },
                            "bookMarksCount": {
                                "$first": "$bookMarksCount"
                            },
                            "retweetCount": {
                                "$first": "$retweetCount"
                            },
                            "video": {
                                "$first": "$video"
                            },
                            "duration": {
                                "$first": "$duration"
                            },
                            "videoTitle": {
                                "$first": "$videoTitle"
                            },
                            "publicId": {
                                "$first": "$publicId"
                            },
                            "thumbImage": {
                                "$first": "$thumbImage"
                            },
                            "visibility": {
                                "$first": "$visibility"
                            },
                            "videosDescription": {
                                "$first": "$videosDescription"
                            },
                            "userLikeStatus": {
                                "$max": "$userLikeStatus"
                            },
                            "userCommentStatus": {
                                "$max": "$userCommentStatus"
                            },
                            "userBookMarkStatus": {
                                "$max": "$userBookMarkStatus"
                            },
                            "userRetweetStatus": {
                                "$max": "$userRetweetStatus"
                            },
                            "userShareStatus": {
                                "$max": "$userShareStatus"
                            },
                            "userViewStatus": {
                                "$max": "$userViewStatus"
                            },
                            "userId": {
                                "$max": "$userId"
                            },
                        }
                    },
                    {
                        $lookup: {
                            from: "user",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userData"
                        }
                    }

                    ])

                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },

                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Upload post found",
                                data
                            })
                        }
                    })
                }
            })
        }
    },

    //=====================================Get All ReShare user post=======================================//
    getReSharePost: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var aggregate = Post.aggregate([
                        {
                            $unwind: {
                                path: "$likes",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$comments",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$bookMarks",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$retweets",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                "retweets.userId": req.body.userId
                            }
                        },
                        {
                            $unwind: {
                                path: "$shares",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $unwind: {
                                path: "$views",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            "$project": {
                                _id: 1,
                                userLikeStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$likes.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },

                                userCommentStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$comments.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userBookMarkStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$bookMarks.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userRetweetStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$retweets.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userShareStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$shares.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                userViewStatus: {
                                    $cond: {
                                        if: {
                                            $eq: ['$views.userId', req.body.userId]
                                        },
                                        then: "TRUE",
                                        else: "FALSE",
                                    }
                                },
                                reportCount: 1,
                                videosTag: 1,
                                visibility: 1,
                                videosDescription: 1,
                                createdAt: 1,
                                createdAt1: 1,
                                status: 1,
                                commentCount: 1,
                                likeCount: 1,
                                rateAvg: 1,
                                viewCount: 1,
                                bookMarksCount: 1,
                                retweetCount: 1,
                                reportCount: 1,
                                video: 1,
                                videoTitle: 1,
                                publicId: 1,
                                thumbImage: 1,
                                duration: 1,
                                userId: 1,
                                shares: 1,
                                retweets: 1
                            }
                        },
                        {
                            $group: {
                                _id: "$_id",
                                "reportCount": {
                                    "$first": "$reportCount"
                                },
                                "videosTag": {
                                    "$first": "$videosTag"
                                },
                                "createdAt": {
                                    "$first": "$createdAt"
                                },
                                "createdAt1": {
                                    "$first": "$createdAt1"
                                },
                                "status": {
                                    "$first": "$status"
                                },
                                "retweets": {
                                    "$first": "$retweets"
                                },
                                "commentCount": {
                                    "$first": "$commentCount"
                                },
                                "likeCount": {
                                    "$first": "$likeCount"
                                },
                                "rateAvg": {
                                    "$first": "$rateAvg"
                                },
                                "viewCount": {
                                    "$first": "$viewCount"
                                },
                                "bookMarksCount": {
                                    "$first": "$bookMarksCount"
                                },
                                "retweetCount": {
                                    "$first": "$retweetCount"
                                },
                                "video": {
                                    "$first": "$video"
                                },
                                "shares": {
                                    "$first": "$shares"
                                },
                                "duration": {
                                    "$first": "$duration"
                                },
                                "videoTitle": {
                                    "$first": "$videoTitle"
                                },
                                "publicId": {
                                    "$first": "$publicId"
                                },
                                "thumbImage": {
                                    "$first": "$thumbImage"
                                },
                                "visibility": {
                                    "$first": "$visibility"
                                },
                                "videosDescription": {
                                    "$first": "$videosDescription"
                                },
                                "userLikeStatus": {
                                    "$max": "$userLikeStatus"
                                },
                                "userCommentStatus": {
                                    "$max": "$userCommentStatus"
                                },
                                "userBookMarkStatus": {
                                    "$max": "$userBookMarkStatus"
                                },
                                "userRetweetStatus": {
                                    "$max": "$userRetweetStatus"
                                },
                                "userShareStatus": {
                                    "$max": "$userShareStatus"
                                },
                                "userViewStatus": {
                                    "$max": "$userViewStatus"
                                },
                                "userId": {
                                    "$max": "$userId"
                                },
                            }
                        },
                        {
                            $lookup: {
                                from: "user",
                                localField: "userId",
                                foreignField: "_id",
                                as: "userData"
                            }
                        },
                    ])
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },
                        lean: true
                    }
                    Post.aggregatePaginate(aggregate, options, (err, success, pages, total) => {
                        if (err) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            let complete = success
                            for (let key of complete) {
                                if (!key.userData[0].followers) {
                                    key.isFollowStatus = false;
                                } else {
                                    for (item of key.userData[0].followers) {
                                        if (item.userId == req.body.userId) {
                                            key.isFollowStatus = true;
                                            break;
                                        } else {
                                            key.isFollowStatus = false;
                                        }
                                    }

                                }

                            }
                            let data = {
                                result: complete,
                                page: options.page,
                                limit: options.limit,
                                pages: pages,
                                total: total
                            }
                            res.send({
                                response_code: 200,
                                response_message: "Reshare post found",
                                data
                            })
                        }
                    })
                }
            });
        }
    },


    //=====================================Get Delete view post=======================================//

    DeleteViewPost: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "viewBy": req.body.userId
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Viewpost.findOneAndRemove(query, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            return res.send({
                                response_code: 400,
                                response_message: "Post not found"
                            })
                        } else {
                            Post.findOneAndUpdate({
                                _id: req.body.postId,
                                "views.userId": req.body.userId
                            }, {
                                    $pull: {
                                        views: {
                                            userId: req.body.userId
                                        }
                                    }
                                }, {
                                    safe: true,
                                    new: true
                                }, (err, obj) => {
                                    if (err) {
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {
                                        res.send({
                                            response_code: 200,
                                            response_message: "Post view removed successfully",
                                            obj
                                        })
                                    }
                                });
                        }
                    })
                }
            })

        }
    },


    //=====================================Get Delete Reshare post=======================================//

    DeleteReSharePost: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "retweeterId": req.body.userId
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Retweet.findOneAndRemove(query, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            return res.send({
                                response_code: 400,
                                response_message: "Post not found"
                            })
                        } else {
                            Post.findOneAndUpdate({
                                _id: req.body.postId,
                                "retweets.userId": req.body.userId
                            }, {
                                    $pull: {
                                        retweets: {
                                            userId: req.body.userId
                                        }
                                    }
                                }, {
                                    safe: true,
                                    new: true
                                }, (err, obj) => {
                                    if (err) {
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {
                                        Like.remove({
                                            "postId": result.newPostId
                                        }, (error3, result3) => {
                                            if (error3) {
                                                return res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error"
                                                })
                                            } else {
                                                Comment.remove({
                                                    "postId": result.newPostId
                                                }, (error4, result4) => {
                                                    if (error4) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        Bookmark.remove({
                                                            "postId": result.newPostId
                                                        }, (error5, result5) => {
                                                            if (error5) {
                                                                return res.send({
                                                                    response_code: 500,
                                                                    response_message: "Internal server error"
                                                                })
                                                            } else {
                                                                Retweet.remove({
                                                                    "postId": result.newPostId
                                                                }, (error6, result6) => {
                                                                    if (error6) {
                                                                        return res.send({
                                                                            response_code: 500,
                                                                            response_message: "Internal server error"
                                                                        })
                                                                    } else {
                                                                        Viewpost.remove({
                                                                            "postId": result.newPostId
                                                                        }, (error7, result7) => {
                                                                            if (error7) {
                                                                                return res.send({
                                                                                    response_code: 500,
                                                                                    response_message: "Internal server error"
                                                                                })
                                                                            } else {
                                                                                Report.remove({
                                                                                    "postId": result.newPostId
                                                                                }, (error9, result9) => {
                                                                                    if (error9) {
                                                                                        return res.send({
                                                                                            response_code: 500,
                                                                                            response_message: "Internal server error"
                                                                                        })
                                                                                    } else {
                                                                                        Post.findByIdAndRemove({
                                                                                            "_id": result.newPostId
                                                                                        }, (error8, result8) => {
                                                                                            if (error8) {
                                                                                                return res.send({
                                                                                                    response_code: 500,
                                                                                                    response_message: "Internal server error"
                                                                                                })
                                                                                            } else {
                                                                                                res.send({
                                                                                                    response_code: 200,
                                                                                                    response_message: "Post reshare removed successfully",
                                                                                                    obj
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
                                });
                        }
                    })
                }
            })
        }
    },


    //=====================================post Search by video title======================================//

    search: (req, res) => {

        if (!req.body.userId || !req.body.search) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var value = {
                        "userId": req.body.userId,
                        "search": req.body.search
                    }
                    var query = {
                        $and: [{
                            "userId": req.body.userId
                        }, {
                            "search": req.body.search
                        }]
                    }
                    Search.findOne(query, (err2, result2) => {
                        if (err2) {
                            res.send({
                                response_code: 500,
                                response_message: "Internal server error."
                            })
                        } else if (result2) {
                            query = {
                                "videoTitle": {
                                    $regex: req.body.search,
                                    $options: 'i'
                                },
                            };

                            Post.find(query, (error, result) => {
                                if (error) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else if (result.length < 1) {
                                    return res.send({
                                        response_code: 400,
                                        response_message: "No post data found"
                                    })
                                } else {
                                    Post.findOne({
                                        _id: result[0]._id
                                    }).populate("userId").exec((error, result1) => {
                                        if (error)

                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error.",
                                                error
                                            })
                                        else {
                                            if (result1.length == 0) {
                                                res.send({
                                                    response_code: 401,
                                                    response_message: "Post not found"
                                                })
                                            } else {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "Post found",
                                                    result1
                                                })


                                            }
                                        }
                                    })
                                }
                            })
                        } else {
                            new Search(value).save((error1, result1) => {
                                if (error1) {
                                    res.send({
                                        response_code: 500,
                                        response_message: "Internal server error."
                                    })
                                } else {
                                    query = {
                                        "videoTitle": {
                                            $regex: req.body.search,
                                            $options: 'i'
                                        },
                                    };

                                    Post.find(query, (error, result) => {
                                        if (error) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else if (result.length < 1) {
                                            return res.send({
                                                response_code: 400,
                                                response_message: "No post data found"
                                            })
                                        } else {
                                            Post.findOne({
                                                _id: result[0]._id
                                            }).populate("userId").exec((error, result1) => {
                                                if (error)

                                                    res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error.",
                                                        error
                                                    })
                                                else {
                                                    if (result1.length == 0) {
                                                        res.send({
                                                            response_code: 401,
                                                            response_message: "Post not found"
                                                        })
                                                    } else {
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: "Post found",
                                                            result1
                                                        })
                                                    }
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


    //=====================================Get All comment with post=======================================//

    getCommentPosts: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (errorr, resultt) => {
                if (errorr) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!resultt) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (resultt.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },
                        populate: {
                            path: "commentBy",
                            select: 'name username profilePic'
                        }
                    }
                    Comment.paginate({
                        "postId": req.body.postId
                    }, options, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            return res.send({
                                response_code: 400,
                                response_message: "Comment not found"
                            })
                        } else {

                            res.send({
                                response_code: 200,
                                response_message: "Post found",
                                result
                            })
                        }
                    })
                }
            })

        }
    },

    //=====================================Get Notification list with user=======================================//

    getNotificationList: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "Field are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (errorr, resultt) => {
                if (errorr) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!resultt) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (resultt.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        },
                        populate: {
                            path: "notiBy",
                            select: 'name username profilePic'
                        }
                    }
                    Notification.paginate({
                        "userId": req.body.userId
                    }, options, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            return res.send({
                                response_code: 400,
                                response_message: "Notification not found"
                            })
                        } else {
                            res.send({
                                response_code: 200,
                                response_message: "Notification found",
                                result
                            })
                        }
                    })
                }
            })

        }
    },

    //=====================================Get Notification list with user=======================================//

    deleteNotification: (req, res) => {
        if (!req.body.userId || !req.body.notificationId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (errorr, resultt) => {
                if (errorr) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!resultt) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (resultt.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    Notification.findOneAndRemove({
                        "_id": req.body.notificationId
                    }, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            return res.send({
                                response_code: 400,
                                response_message: "Notification id not found"
                            })
                        } else {
                            res.send({
                                response_code: 200,
                                response_message: "Notification removed successfully",
                                result
                            })
                        }
                    })
                }
            })

        }
    },

    //==========================================================Get search history===================================================================//

    getSearch: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (errorr, resultt) => {
                if (errorr) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!resultt) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (resultt.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    let options = {
                        page: 1,
                        limit: 10,
                        sort: {
                            createdAt: -1
                        }

                    }
                    Search.paginate({
                        "userId": req.body.userId
                    }, options, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result.length < 1) {
                            console.log("Search history not found")
                            return res.send({
                                response_code: 500,
                                response_message: "Search history not found"
                            })
                        } else {
                            res.send({
                                response_code: 200,
                                response_message: "Search history found",
                                result
                            })
                        }
                    })
                }
            })
        }

    },
    //======================================================Collection Api========================================================================//

    totalStatus: (req, res) => {
        if (!req.body.userId) {
            return res.send({
                response_code: 401,
                response_message: "Post Id is required"
            })
        } else {

            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })

                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "status": 'LIKE'
                        }, {
                            "likeBy": req.body.userId
                        }]
                    }
                    Like.find(query, (error1, result1) => {
                        if (error1) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else {
                            var query2 = {
                                $and: [{
                                    "status": 'SAVED'
                                }, {
                                    "bookMarkerId": req.body.userId
                                }]
                            }
                            Bookmark.find(query2, (error2, result2) => {
                                if (error2) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    var query1 = {
                                        $and: [{
                                            "postUserId": null
                                        }, {
                                            "userId": req.body.userId
                                        }]
                                    }
                                    Post.find(query1, (error3, result3) => {
                                        if (error3) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            Viewpost.find({
                                                "viewBy": req.body.userId
                                            }, (error4, result4) => {
                                                if (error4) {
                                                    return res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error"
                                                    })
                                                } else {
                                                    Retweet.find({
                                                        "retweeterId": req.body.userId
                                                    }, (error5, result5) => {
                                                        if (error4) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            var obj = {
                                                                "Likes": result1.length,
                                                                "Bookmarks": result2.length,
                                                                "Post": result3.length,
                                                                "ViewPost": result4.length,
                                                                "Reshare": result5.length
                                                            }
                                                            return res.send({
                                                                response_code: 200,
                                                                response_message: "Collection found",
                                                                obj
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

    //=====================================================Edit Post=======================================================================================//

    editPost1: (req, res) => {
        var multiparty = require('multiparty');
        let form = new multiparty.Form({
            maxFilesSize: 100 * 1024 * 1024
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({
                    response_code: 500,
                    response_message: "Internal server error"
                })
            } else {
                User.findOne({
                    "_id": fields.userId
                }, (error, result) => {
                    if (error) {
                        return res.send({
                            response_code: 500,
                            response_message: "Internal server error"
                        })
                    } else if (!result) {
                        return res.send({
                            response_code: 500,
                            response_message: "User Id is not correct"
                        })
                    }
                    var c = files.video[0].path;
                    cloudinary.v2.uploader.upload(files.video[0].path, {
                        resource_type: "auto"
                    }, (err, result1) => {
                        if (err) return res.status(500).send({
                            message: 'Error'
                        });
                        fields.video = result1.secure_url;

                        Post.findByIdAndUpdate({
                            "_id": fields.postId
                        }, fields, {
                                new: true
                            }, (error3, result3) => {
                                if (error3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else if (!result3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Post Id is not correct"
                                    })
                                } else {

                                    var c = files.videoThumbnailImage[0].path;
                                    cloudinary.v2.uploader.upload(files.videoThumbnailImage[0].path, {
                                        resource_type: "auto"
                                    }, (err4, result4) => {
                                        if (err4) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            fields.videoThumbnailImage = result4.secure_url;
                                            Post.findByIdAndUpdate({
                                                "_id": fields.postId
                                            }, {
                                                    $set: {
                                                        "thumbImage": result4.secure_url
                                                    }
                                                }, {
                                                    new: true
                                                }, (error3, result3) => {
                                                    if (error3) {
                                                        return res.send({
                                                            response_code: 500,
                                                            response_message: "Internal server error"
                                                        })
                                                    } else {
                                                        res.send({
                                                            response_code: 200,
                                                            response_message: "Video upload successfully",
                                                            Data: result3
                                                        });
                                                    }
                                                })
                                        }

                                    })
                                }
                            })
                    })
                })
            }

        })
    },

    //========================================================================Update post=================================================================//
    editPost: (req, res) => {
        if (!req.body.postId || !req.body.userId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (errorr, resultt) => {
                if (errorr) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error",
                    })
                } else if (!resultt) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator",
                    })
                } else if (resultt.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    Post.findOne({
                        "_id": req.body.postId
                    }, (error, result) => {
                        if (error) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (!result) {
                            return res.send({
                                response_code: 500,
                                response_message: "Post not found"
                            })
                        } else {
                            if (req.body.videosTag) {
                                var array4 = req.body.videosTag;
                                var videosTag = array4.toString().split(",");
                                Post.findOneAndUpdate({
                                    "_id": req.body.postId
                                }, {
                                        $set: {
                                            "videoTitle": req.body.videoTitle,
                                            "videosDescription": req.body.videoDescription,
                                            "visibility": req.body.visibility,
                                            "videosTag": videosTag,
                                            "updatedAt":new Date()
                                        }
                                    }, (err3, result3) => {
                                        if (err3) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            return res.send({
                                                response_code: 200,
                                                response_message: "Post update successfully",
                                                Data: result3
                                            })
                                        }
                                    })
                            } else {
                                Post.findOneAndUpdate({
                                    "_id": req.body.postId
                                }, {
                                        $set: {
                                            "videoTitle": req.body.videoTitle,
                                            "videosDescription": req.body.videoDescription,
                                            "visibility": req.body.visibility
                                        }
                                    }, (err3, result3) => {
                                        if (err3) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            return res.send({
                                                response_code: 200,
                                                response_message: "Post update successfully",
                                                Data: result3
                                            })
                                        }
                                    })
                            }

                        }
                    })
                }
            })
        }
    },

    //========================================================================Delete post=================================================================//
    deletePost: (req, res) => {
        if (!req.body.userId || !req.body.postId) {
            return res.send({
                response_code: 500,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.userId
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    Post.findOne({
                        "_id": req.body.postId
                    }, (error1, result1) => {
                        if (error1) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (!result1) {
                            return res.send({
                                response_code: 500,
                                response_message: "Post Id is not correct"
                            })
                        } else {
                            Like.remove({
                                "postId": req.body.postId
                            }, (error3, result3) => {
                                if (error3) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    Comment.remove({
                                        "postId": req.body.postId
                                    }, (error4, result4) => {
                                        if (error4) {
                                            return res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            Bookmark.remove({
                                                "postId": req.body.postId
                                            }, (error5, result5) => {
                                                if (error5) {
                                                    return res.send({
                                                        response_code: 500,
                                                        response_message: "Internal server error"
                                                    })
                                                } else {
                                                    Retweet.remove({
                                                        "postId": req.body.postId
                                                    }, (error6, result6) => {
                                                        if (error6) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            Viewpost.remove({
                                                                "postId": req.body.postId
                                                            }, (error7, result7) => {
                                                                if (error7) {
                                                                    return res.send({
                                                                        response_code: 500,
                                                                        response_message: "Internal server error"
                                                                    })
                                                                } else {
                                                                    Report.remove({
                                                                        "postId": req.body.postId
                                                                    }, (error9, result9) => {
                                                                        if (error9) {
                                                                            return res.send({
                                                                                response_code: 500,
                                                                                response_message: "Internal server error"
                                                                            })
                                                                        } else {
                                                                            Post.findByIdAndRemove({
                                                                                "_id": req.body.postId
                                                                            }, (error8, result8) => {
                                                                                if (error8) {
                                                                                    return res.send({
                                                                                        response_code: 500,
                                                                                        response_message: "Internal server error"
                                                                                    })
                                                                                } else {
                                                                                     var query8 = {
                                                                                             $and: [{
                                                                                                "postUserId": null
                                                                                                }, {
                                                                                                "userId": req.body.userId
                                                                                                }]
                                                                                        }
                                                                                    Post.find(query8, (error7, result7) => {
                                                                                        if (error7) {
                                                                                            return res.send({
                                                                                                response_code: 500,
                                                                                                response_message: "Internal server error"
                                                                                            })
                                                                                        } else {
                                                                                            User.findByIdAndUpdate({
                                                                                                "_id": req.body.userId
                                                                                            }, {
                                                                                                    $set: {
                                                                                                        "posts": result7.length
                                                                                                    }
                                                                                                }, {
                                                                                                    new: true
                                                                                                }, (error9, result9) => {
                                                                                                    if (error9) {
                                                                                                        return res.send({
                                                                                                            response_code: 500,
                                                                                                            response_message: "Internal server error"
                                                                                                        })
                                                                                                    } else {
                                                                                                        res.send({
                                                                                                            response_code: 200,
                                                                                                            response_message: "Post video deleted successfully",
                                                                                                            Data: result9
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
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }

    },

    //==============================Particular content get=========================================//

    staticContentGet: (req, res) => {
        if (!req.body.type) {
            console.log("All fields are required")
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            staticModel.findOne({
                "Type": req.body.type
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 500,
                        response_message: "Type is not correct"
                    })
                } else {
                    res.send({
                        response_code: 200,
                        response_message: "Data found successfully",
                        Data: result
                    })

                }
            })
        }
    },
    //=================================================================Like=====================================================//

    report: (req, res) => {
        if (!req.body.postId || !req.body.reportBy || !req.body.report) {
            return res.send({
                response_code: 401,
                response_message: "All fields are required"
            })
        } else {
            User.findOne({
                "_id": req.body.reportBy
            }, (error, result) => {
                if (error) {
                    return res.send({
                        response_code: 500,
                        response_message: "Internal server error"
                    })
                } else if (!result) {
                    return res.send({
                        response_code: 202,
                        response_message: "User deleted form Admin.Please contact to Administrator"
                    })
                } else if (result.status == 'INACTIVE') {
                    return res.send({
                        response_code: 203,
                        response_message: "User Blocked form Admin.Please contact to Administrator",
                    })
                } else {
                    var query = {
                        $and: [{
                            "reportBy": req.body.reportBy
                        }, {
                            "postId": req.body.postId
                        }]
                    }
                    Report.findOne(query, (err2, result2) => {
                        if (err2) {
                            return res.send({
                                response_code: 500,
                                response_message: "Internal server error"
                            })
                        } else if (result2 && result2.report == req.body.report) {
                            res.send({
                                response_code: 200,
                                response_message: "Success"
                            });
                        } else if (!result2) {
                            var value = {
                                "reportBy": req.body.reportBy,
                                "report": req.body.report,
                                "postId": req.body.postId,
                            }
                            new Report(value).save((error1, result1) => {
                                if (error1) {
                                    return res.send({
                                        response_code: 500,
                                        response_message: "Internal server error"
                                    })
                                } else {
                                    Report.find({
                                        "postId": req.body.postId
                                    }, (error, result5) => {
                                        if (error) {
                                            res.send({
                                                response_code: 500,
                                                response_message: "Internal server error"
                                            })
                                        } else {
                                            if (result5.length == 0) {
                                                res.send({
                                                    response_code: 200,
                                                    response_message: "success"
                                                })

                                            } else {
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "reportCount": result5.length
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            res.send({
                                                                response_code: 200,
                                                                response_message: "Success",
                                                                Data: result3
                                                            });
                                                        }
                                                    })


                                            }
                                        }
                                    })
                                }
                            })
                        } else {
                            Report.findOneAndUpdate({
                                "postId": req.body.postId
                            }, {
                                    $set: {
                                        "status": req.body.status
                                    }
                                }, (err3, result3) => {
                                    if (err3) {
                                        return res.send({
                                            response_code: 500,
                                            response_message: "Internal server error"
                                        })
                                    } else {
                                        var query = {
                                            $and: [{
                                                "reportBy": req.body.reportBy
                                            }, {
                                                "postId": req.body.postId
                                            }]
                                        }
                                        Report.find(query, (error, result5) => {
                                            if (error)
                                                res.send({
                                                    response_code: 500,
                                                    response_message: "Internal server error.",
                                                    error
                                                })
                                            else {
                                                Post.findByIdAndUpdate({
                                                    "_id": req.body.postId
                                                }, {
                                                        $set: {
                                                            "reportCount": result5.length
                                                        }
                                                    }, {
                                                        new: true
                                                    }, (error3, result3) => {
                                                        if (error3) {
                                                            return res.send({
                                                                response_code: 500,
                                                                response_message: "Internal server error"
                                                            })
                                                        } else {
                                                            res.send({
                                                                response_code: 200,
                                                                response_message: "Success"
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
    },


}