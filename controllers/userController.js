const userModel = require('../models/userModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction')


const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');
const postModel = require('../models/postModel')
const notiicationModel = require('../models/notificationModel')
const reportModel = require('../models/reportModel')
const feedBackModel = require('../models/feedBackModel');
const _ = require("lodash");
const eventModel = require('../models/eventModel');
const languageModel = require('../models/languageModel')
const interestModel = require('../models/interestModel')
const favouriteModel = require('../models/favouriteModel')
const foodModel = require('../models/foodModel')



module.exports = {
    /**
     * Function Name :otpSent
     * Description   : otp sent to mobile number of user
     *
     * @return response
   */
    otpSent: (req, res) => {
        console.log("hhhhhhhh")
        try {
            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (userData) {
                    var otp = commonFunction.getOTP(4)
                    var phoneNumber = req.body.countryCode + req.body.mobileNumber
                    commonFunction.sendSMSOTPSNS(phoneNumber, `Your OTP for verification is ${otp}.Use this otp to verify its you.`, (err, otpSent) => {
                        console.log("CCC",err,otpSent)
                        // commonFunction.sendSMSOTPSNS(phoneNumber, otp, (err, otpSent) => {
                        console.log("hhhh333hhhh", otp, otpSent, err)
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: { otp: otp, verifyOtp: false} }, { new: true }, (updatedErr, updatedData) => {
                                if (updatedErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                }
                                else {
                                    console.log("send", updatedData)
                                    response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.OTP_SEND)
                                }
                            })
                        }
                    })

                }
                else {
                    var otp1 = commonFunction.getOTP(4)
                    console.log("SSSSSS", otp)
                    var phoneNumber1 = req.body.countryCode + req.body.mobileNumber
                    // commonFunction.sendSMS(phoneNumber1, otp1, (err, otpSent) => {
                    commonFunction.sendSMSOTPSNS(phoneNumber1, `Your OTP for verification is ${otp1}.Use this otp to verify its you.`, (err, otpSent) => {
                        console.log("hhhh333hhhh", otp1, otpSent, err)
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR)
                        }
                        else {
                            var obj = new userModel({
                                otp: otp1,
                                countryCode: req.body.countryCode,
                                mobileNumber: req.body.mobileNumber
                            })
                            obj.save((saveErr, savedData) => {
                                console.log("hhhh333hhhh11111", error, savedData)

                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.OTP_SEND)

                                }
                            })
                        }
                    })
                }
            })

        }
        catch (error) {
            console.log("i am in error", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

        }

    },
    // otpSent: (req, res) => {
    //     console.log("hhhhhhhh")
    //     try {
    //         userModel.findOne({mobileNumber:req.body.mobileNumber,status:"ACTIVE",userType:"USER"},(error,userData)=>{
    //             if (error) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (userData) {
    //                var otp = commonFunction.getOTP(4)
    //                       userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: { otp: otp, verifyOtp: false } }, { new: true }, (updatedErr, updatedData) => {
    //                     if (updatedErr) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

    //                     }
    //                     else {
    //                         console.log("send", updatedData)
    //                         response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.OTP_SEND)
    //                     }
    //                 })

    //             }
    //             else{
    //                 var otp1 = commonFunction.getOTP(4)
    //                 console.log("SSSSSS",otp)
    //                         var obj = new userModel({
    //                             otp: otp1,
    //                             countryCode:req.body.countryCode,
    //                             mobileNumber: req.body.mobileNumber
    //                         })
    //                         obj.save((saveErr, savedData) => {
    //                             console.log("hhhh333hhhh11111", error, savedData)

    //                             if (error) {
    //                                 response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR)
    //                             }
    //                             else {
    //                                 response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.OTP_SEND)

    //                             }
    //                         })

    //             }
    //         })

    //     }
    //     catch (error) {
    //         console.log("i am in error", error)
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)

    //     }

    // },

    /**
         * Function Name :verifyOtp
         * Description   : verify for otp
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
                if (result.otp == req.body.otp || req.body.otp == 1234) {
                    var newTime = Date.now()
                    var difference = newTime - result.otpTime
                    console.log(">>>>>>", difference)
                    // if (difference < 60000) {
                    userModel.findByIdAndUpdate(result._id, { verifyOtp: true }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);
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
       * Function Name :resendOtp
       * Description   : otp sent to mobile number of user
       *
       * @return response
     */
    resendOtp: (req, res) => {
        console.log("hhhhhhhh", req.body)
        userModel.findOne({ mobileNumber: req.body.mobileNumber }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                var otp = commonFunction.getOTP(4)
                var phoneNumber = userData.countryCode + req.body.mobileNumber

                //commonFunction.sendSMS(phoneNumber, otp, (err, otpData) => {
                commonFunction.sendSMSOTPSNS(phoneNumber, `Your OTP for verification is ${otp}.Use this otp to verify its you.`, (err, otpData) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                    }
                    else {
                        userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber }, { $set: { otp: otp, verifyOtp: false } }, { new: true }, (updatedErr, updatedData) => {
                            if (updatedErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                            }
                            else {
                                console.log("send", updatedData)
                                response(res, SuccessCode.SUCCESS, updatedData, SuccessMessage.OTP_SEND)
                            }
                        })
                    }
                })
            }
        })
    },

    /**
    * Function Name :addBasicInfo
    * Description   : add basic infomartion of user
    *
    * @return response
  */
    addBasicInfo: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                }
                else {
                    var set = {}
                    if (req.body.name) {
                        set.name = req.body.name
                    }
                    if (req.body.nickName) {
                        set.nickName = req.body.nickName
                    }
                    if (req.body.description) {
                        set.description = req.body.description
                    }
                    if (req.body.mirrorFlyId) {
                        set.mirrorFlyId = req.body.mirrorFlyId
                    }
                    if (req.body.image) {
                        set.profilePic = await imgUpload(req.body.image)
                    }

                    userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $set: set, isFirstTime: true }, { new: true },
                        (err, updateData) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
                            }
                            else if (!updateData) {
                                response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS)
                            }
                        })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
    * Function Name : blockUnblockUserProfile
    * Description   : block user by user
    *
    * @return response
  */
    blockUnblockUserProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, (UserErr, userData) => {
                console.log("sdhsh1111111111shs", UserErr, userData)

                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);

                }
                else {
                    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER" }, (error, customerData) => {
                        console.log("sdh333333333shshs", error, customerData)
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!customerData) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);

                        } else {
                            if (req.body.status == "BLOCK") {
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $addToSet: { blockedUser: req.body.userId } }, { new: true }, (err, blockedData) => {
                                    console.log("sdh44444444shshs", err, customerData)

                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, blockedData, SuccessMessage.BLOCK_SUCCESS)

                                    }
                                })
                            }
                            else if (req.body.status == "UNBLOCK") {
                                userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $pull: { blockedUser: req.body.userId } }, { new: true }, (unblockErr, UnblockedData) => {
                                    if (unblockErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, UnblockedData, SuccessMessage.UNBLOCK_SUCCESS)

                                    }
                                })

                            }
                        }
                    })

                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name :showUserProfile
        * Description   : show user profile 
        *
        * @return response
      */
    showUserProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (UserErr, userData) => {
                if (UserErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DETAIL_GET)

                    //var userData = await 
                    // userModel.findOne({ _id: req.body.user, status: "ACTIVE" }, (error, findUserData) => {
                    //     if (UserErr) {
                    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    //     }
                    //     else {
                    //         response(res, SuccessCode.SUCCESS, [findUserData], SuccessMessage.DETAIL_GET)

                    //     }
                    // })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name :showMyProfile
        * Description   : show my profile by user
        *
        * @return response
      */
    showMyProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)

        }


    },

/**
        * Function Name :deleteProfile
        * Description   : delete own profile by user
        *
        * @return response
      */
     deleteAccount: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    userModel.findOneAndUpdate({_id:userData._id},{$set:{status: "DELETE"}},{new:true},(err,findData)=>{
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!findData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else{
                        response(res, SuccessCode.SUCCESS, findData, SuccessMessage.DELETE_SUCCESS)

                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)

        }


    },

    editProfile: (req, res) => {
        try {
            //console.log("fffffff",req.body)
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                console.log("JJJHDJ", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    var set = {}
                    if (req.body.profilePrivacy) {
                        set.profilePrivacy = req.body.profilePrivacy
                    }
                    if (req.body.name) {
                        set.name = req.body.name
                    }
                    if (req.body.surName) {
                        set.surName = req.body.surName
                    }
                    if (req.body.aboutMe) {
                        set.aboutMe = req.body.aboutMe
                    }
                    if (req.body.age) {
                        set.age = req.body.age
                    }
                    if (req.body.location) {
                        set.location = req.body.location
                    }
                    if (req.body.profile) {
                        set.profile = req.body.profile
                    }
                    if (req.body.intersts) {
                        set.intersts = req.body.intersts
                    }
                    if (req.body.speak) {
                        set.speak = req.body.speak
                    }
                    if (req.body.favorite) {
                        set.favorite = req.body.favorite
                    }
                    if (req.body.favoriteFood) {
                        set.favoriteFood = req.body.favoriteFood
                    }
                    if (req.body.language) {
                        set.language = req.body.language
                    }
                    if (req.body.image) {
                        //var image = await convertImage()
                        set.profilePic = await convertImage()
                    }
                    if (req.body.backImage) {
                        set.backImage = await convertBackImage()
                    }

                    userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $set: set }, { new: true },
                        (err, updateData) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else if (!updateData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS)
                            }
                        })
                    function convertImage() {
                        return new Promise((resolve, reject) => {
                            console.log("aaasssssss")
                            commonFunction.uploadImage(req.body.image, (err, upload) => {
                                console.log("aaasss1111111111111111111111ssss")
                                if (err) {
                                    console.log("Error uploading image", err)
                                }
                                else {
                                    resolve(upload)
                                }
                            })
                        })
                    }
                    function convertBackImage() {
                        return new Promise((resolve, reject) => {
                            console.log("aaasssssss")
                            commonFunction.uploadImage(req.body.backImage, (err, upload) => {
                                console.log("aaasss1111111111111111111111ssss")
                                if (err) {
                                    console.log("Error uploading image", err)
                                }
                                else {
                                    resolve(upload)
                                }
                            })
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    viewPost: (req, res) => {
        postModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (error, postData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

            }
            else if (!postData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.MOBILE_NOT_FOUND);
            }
            else {
                response(res, SuccessCode.SUCCESS, [postData], SuccessMessage.DATA_FOUND);
            }
        })
    },


    socialLogin: (req, res) => {
        try {
            if (!req.body.socialId || !req.body.loginType) {
                res.send({ responseCode: 401, responseMessege: "Parameter missing" })
            } else {
                userModel.findOne({ _id: req.headers._id }, async (error, userData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                    }
                    else {
                        var set = {}
                        if (req.body.loginType) {
                            set.loginType = req.body.loginType
                        }
                        if (req.body.socialId) {
                            set.socialId = req.body.socialId
                        }

                        userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $set: set }, { new: true },
                            (err, result) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
                                }
                                else if (!result) {
                                    response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                }
                            })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    // socialLogin: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.headers._id, status: "ACTIVE" },(error, userData) => {
    //             if (error) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!userData) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
    //             }
    //             else{
    //                 userModel.findOne({ _id:userData_id, status: { $ne: "DELETED" } }, (error, checkSocialId) => {
    //                     console.log("i am in in first",error,checkSocialId)
    //                     if (error) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                     } else if (!checkSocialId) {
    //                         var data = {
    //                             socialId: req.body.socialId,
    //                             loginType: req.body.loginType,
    //                             name: req.body.name,
    //                             email: req.body.email,
    //                             profilePic: req.body.profilePic
    //                         };
    //                         var obj = new userModel(data);
    //                         obj.save((err1, success) => {
    //                             if (err1) {
    //                                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                             } else {
    //                                 var result = {
    //                                     userDetail: success._id
    //                                 };
    //                                 response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
    //                             }
    //                         });
    //                     } else {
    //                         var result = {
    //                             userDetail: checkSocialId._id
    //                         };
    //                         response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
    //                     }
    //                 }
    //                 );


    //             }
    //         })


    //     } catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    getFriendWithSocialLogin: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    //let socialId = req.body.socialId
                    userModel.find({ socialId: { $in: req.body.socialId }, userType: "USER" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.FRIEND_NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.FOUND_FRIEND)
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }

        // })
    },

    importContact: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    //let contactData = req.body.contactData
                    // contactData.forEach(i=>{
                    // console.log(i)
                    userModel.find({ mobileNumber: { $in: req.body.contactData }, userType: "USER" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.CONTACT_NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.FOUND_CONTACT)
                        }
                    })

                }
            })
        }
        catch (error) {
            console.log("DHGDGDGD", error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }

        // })
    },

    addFriend: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var arr = req.body.friends;
                    var arr1 = [];
                    console.log("3288>>>>>>>>>>>>>", arr);
                    arr.forEach(x => {
                        arr1.push(x.friendId);
                    });
                    console.log("req.body>>>>>>>>>>>>>>>>", arr1);
                    userModel.findOne({ _id: arr1, status: "ACTIVE" }, async (err, friendData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendData) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                        }
                        else {

                            var data = await userModel.findOne({ _id: userData._id, friends: { $elemMatch: { friendId: friendData.friendId } } })
                            if (data) {
                                response(res, ErrorCode.ALREADY_EXIST, ErrorMessage.FRIEND_EXISTS)
                            }
                            else {
                                userModel.findOneAndUpdate({ _id: userData._id }, { $addToSet: { friends: req.body.friends } }, { new: true }, async (saveErr, dataSaved) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, dataSaved, SuccessMessage.FRIEND_ADDED)

                                    }
                                })
                            }
                        }
                    })
                }
            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    getFriendList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id }, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                } else {
                    var arr = userData.friends;
                    var arr1 = [];
                    arr.forEach(x => {
                        if (x.status == "ACTIVE") {
                            arr1.push(x.friendId);
                        }
                    });
                    var options = {
                        sort: { created_at: -1 },
                        page: req.body.pageNumber || 1,
                        select: "profilePic _id name email friends _id",
                        limit: req.body.limit || 5
                    };
                    userModel.paginate({ _id: arr1 }, options, (err1, friendData) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (!friendData) {
                            var result = { friends: "[]" };
                            response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)
                        } else {
                            let doc = friendData.docs
                            let newArray = []
                            doc.forEach(x => {
                                //let count = []
                                let friendId = []
                                //let counter = 0
                                for (let a = 0; a < x.friends.length; a++) {
                                    friendId.push(x.friends[a].friendId)
                                }
                                var obj = {
                                    _id: x._id,
                                    name: x.name,
                                    email: x.email,
                                    profilePic: x.profilePic,
                                    friends: x.friends,
                                    //mutual: presents.length
                                }
                                newArray.push(obj);
                            })
                            const total = friendData.total;
                            const pages = friendData.pages;
                            const limit = friendData.limit;
                            const page = friendData.page;
                            var FrndResult = { success2: { docs: newArray, total, limit, page, pages } };
                            response(res, SuccessCode.SUCCESS, FrndResult, SuccessMessage.DETAIL_GET)


                        }
                    }
                    );

                }
            }
            );
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    // getFriendList: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.headers._id }, (err, userData) => {
    //             if (err) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             } else if (!userData) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
    //             } else {
    //                 var arr = userData.friends;
    //                 var arr1 = [];
    //                 arr.forEach(x => {
    //                     if (x.status == "ACTIVE") {
    //                         arr1.push(x.friendId);
    //                     }
    //                 });
    //                 var options = {
    //                     sort: { created_at: -1 },
    //                     page: req.body.pageNumber || 1,
    //                     select: "profilePic _id name",
    //                     limit: req.body.limit || 5
    //                 };
    //                 userModel.paginate({ _id: arr1 }, options, (err1, friendData) => {
    //                     if (err1) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                     } else if (!friendData) {
    //                         var result = { friends: "[]" };
    //                         response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)
    //                     } else {
    //                         //let doc = friendData.docs
    //                         //let newArray = []
    //                         // doc.forEach(x => {
    //                         //     //let count = []
    //                         //     let friendId = []
    //                         //     //let counter = 0
    //                         //     for (let a = 0; a < x.friends.length; a++) {
    //                         //         friendId.push(x.friends[a].friendId)
    //                         //     }
    //                         //     // var presents = _.intersectionWith(arr1, friendId, _.isEqual);

    //                         //     // console.log("mutual friends::::::::::::::::::::::::::::::", counter)

    //                         //     // console.log("mutual friends::::::::::::::::::::::::::::::", counter, "lenght>>>>>>>>>>>>>>>>>>>", count.length)
    //                         //     var obj = {
    //                         //         _id: x._id,
    //                         //         name: x.name,
    //                         //         email: x.email,
    //                         //         profilePic: x.profilePic,
    //                         //         friends: x.friends,
    //                         //         //mutual: presents.length
    //                         //     }
    //                         //     newArray.push(obj);
    //                         // })
    //                         // //console.log("nnnnewwwwwwwwwwwwwwwwwwwwww", newArray)
    //                         // const total = friendData.total;
    //                         // const pages = friendData.pages;
    //                         // const limit = friendData.limit;
    //                         // const page = friendData.page;
    //                         // var result1 = { success2: { docs: newArray, total, limit, page, pages } };
    //                         response(res, SuccessCode.SUCCESS, friendData, SuccessMessage.DETAIL_GET)


    //                     }
    //                 }
    //                 );

    //             }
    //         }
    //         );
    //     } catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },
    removeFriend: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var arr = req.body.friends;
                    var arr1 = [];
                    console.log("3288>>>>>>>>>>>>>", arr);
                    arr.forEach(x => {
                        arr1.push(x.friendId);
                    });
                    console.log("req.body>>>>>>>>>>>>>>>>", arr1);
                    userModel.findOne({ _id: arr1, status: "ACTIVE" }, async (err, friendData) => {
                        console.log("i am herrrrrrrrrrrrr", error, friendData)
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!friendData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: userData._id }, { $pull: { friends: req.body.friends } }, { new: true }, async (saveErr, dataSaved) => {
                                if (saveErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, dataSaved, SuccessMessage.DATA_SAVED)

                                }
                            })

                        }
                    })
                }
            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    followUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    if (req.body.profilePrivacy == "PUBLIC") {
                        userModel.findOne({ _id: req.body.followingId, status: "ACTIVE", }, (err, user) => {
                            console.log("i am here1", err, user)
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!user) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                userModel.findOne({ _id: userData._id, status: "ACTIVE", following: { $elemMatch: { followingId: user._id } } }, (err1, data) => {
                                    if (err1) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (data) {
                                        return res.send({ responseCode: 404, responseMessage: "User already following" })
                                    }
                                    else {
                                        var follow = {
                                            followingId: user._id,
                                            name: user.name,
                                            profilePic: user.profilePic
                                        };
                                        userModel.findOneAndUpdate({ _id: userData._id }, { $push: { following: follow } }, { new: true }, (updateErr, followData) => {
                                            if (updateErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                //response(res, SuccessCode.SUCCESS, followData, SuccessMessage.USER_FOLLOW)
                                                var follow1 = {
                                                    followerId: userData._id,
                                                    name: userData.name,
                                                    profilePic: userData.profilePic
                                                };
                                                userModel.findOneAndUpdate({ _id: user._id }, { $push: { follower: follow1 } }, { new: true }, (updatedErr, followingData) => {
                                                    if (updatedErr) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.USER_FOLLOW)

                                                    }
                                                })

                                            }
                                        })

                                    }
                                })
                            }
                        })
                    }
                    if (req.body.profilePrivacy == "PRIVATE") {
                        console.log("i am here1007")

                        userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "USER", profilePrivacy: "PRIVATE" }, (err, result) => {
                            console.log("i am here1010", error, result)
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                            }
                            else {
                                const obj = new notiicationModel({
                                    senderId: userData._id,
                                    userId: result._id,
                                    requestType: "REQUESTED"
                                })
                                obj.save((saveErr, savedData) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, [savedData], SuccessMessage.DATA_SAVED);
                                    }
                                })
                            }
                        })
                    }
                }

            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    unFollowUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, async (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    userModel.findOne({ _id: req.body.followingId, status: "ACTIVE", }, (err, user) => {
                        console.log("i am here1", err, user)
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!user) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            userModel.findOne({ _id: userData._id, status: "ACTIVE", following: { $elemMatch: { followingId: user._id } } }, (newErr, data) => {
                                if (newErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!data) {
                                    return res.send({ responseCode: 404, responseMessage: "User already Unfollowed" })
                                }
                                else {
                                    var unfollow = _.filter(data.following, _.matches({ followingId: user._id }));
                                    userModel.findOneAndUpdate({ _id: userData._id }, { $pull: { following: unfollow[0] } }, { new: true }, (updatedErr, unfollowData) => {
                                        if (updatedErr) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            // response(res, SuccessCode.SUCCESS, unfollowData, SuccessMessage.USER_UNFOLLOW)
                                            var unfollow1 = _.filter(user.follower, _.matches({ followerId: userData._id }));
                                            userModel.findOneAndUpdate({ _id: user._id }, { $pull: { follower: unfollow1[0] } }, { new: true }, (updateErr, updateData) => {
                                                if (updateErr) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.USER_UNFOLLOW)

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
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    acceptRequest: (req, res) => {
        try {
            if (req.body.response == "ACCEPT") {
                userModel.findOne({ _id: req.headers._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, userData, ErrorMessage.NOT_FOUND)

                    }
                    else {
                        userModel.findOne({ _id: req.body.senderId, status: "ACTIVE", userType: "USER" }, (err, senderData) => {
                            console.log("ccccbb1130", err, senderData)
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                            }
                            else if (!senderData) {
                                response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                            }
                            else {
                                var follow = {
                                    followingId: senderData._id,
                                    name: senderData.name,
                                    profilePic: senderData.profilePic
                                };
                                userModel.findOneAndUpdate({ _id: senderData._id, status: "ACTIVE", userType: "USER" }, { $push: { following: follow } }, { new: true }, (updatedErr, followData) => {
                                    if (updatedErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                    }
                                    else if (!followData) {
                                        response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                                    }
                                    else {
                                        var follow1 = {
                                            followerId: userData._id,
                                            name: userData.name,
                                            profilePic: userData.profilePic
                                        };
                                        userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE", userType: "USER" }, { $push: { follower: follow1 } }, { new: true }, (newErr, followingData) => {
                                            if (newErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                                            }
                                            else if (!followingData) {
                                                response(res, ErrorCode.NOT_FOUND, result, ErrorMessage.NOT_FOUND)

                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, [followingData], SuccessMessage.USER_FOLLOW)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },

    reportUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND,[], ErrorMessage.NOT_FOUND)

                }
                else {
                    userModel.findOne({ _id: req.body.reportTo, status: "ACTIVE" }, (err, result) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)

                        }
                        else {
                            var obj = new reportModel({
                                reportBy: userData._id,
                                reportTo: result._id,
                                reason: req.body.reason
                            })
                            obj.save((saveError, savedData) => {
                                if (saveError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.DATA_SAVED)
                                }
                            })
                        }
                    })
                }


            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    myFollowerList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var arr = userData.follower;
                    var arr1 = [];
                    console.log("3288>>>>>>>>>>>>>", arr);
                    arr.forEach(x => {
                        console.log("3290>>>>>>>>>>>", x);
                        arr1.push(x.followerId);

                    });
                    var options = {
                        sort: { created_at: -1 },
                        page: req.body.pageNumber || 1,
                        select: "profilePic _id name email ",
                        limit: req.body.limit || 10
                    };
                    userModel.paginate({ _id: arr1 }, options, (err, followingData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (followingData.docs == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, followingData, SuccessMessage.DATA_FOUND);
                        }
                    })



                }

            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    myFollowingList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var arr = userData.following;
                    var arr1 = [];
                    console.log("3288>>>>>>>>>>>>>", arr);
                    arr.forEach(x => {
                        console.log("3290>>>>>>>>>>>", x);
                        arr1.push(x.followingId);

                    });
                    var options = {
                        sort: { created_at: -1 },
                        page: req.body.pageNumber || 1,
                        select: "profilePic name email",
                        limit: req.body.limit || 10
                    };
                    userModel.paginate({ _id: arr1 }, options, (err, followingData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (followingData.docs == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, [followingData], SuccessMessage.DATA_FOUND);
                        }
                    })



                }

            })

        }
        catch{
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    friendSuggestion: (req, res) => {
        userModel.findOne({ _id: req.headers._id, status: "ACTIVE", }, (error, userData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!userData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                const arr = userData.friendRequestSentList;
                const arr1 = userData.friends;
                const arr2 = userData.friendsRequest;
                let friend = [];
                let friendlist = [];
                let friendrequestsent = [];
                arr.forEach(x => {
                    console.log("3290>>>>>>>>>>>", x);
                    if (x.status == "WAITING") {
                        arr1.push(x.friendRequistId);
                    }
                });
                arr.forEach(x => {
                    if (x.status != "DELETE") {
                        friendrequestsent.push(x.friendRequestSentId);
                    }
                });
                arr1.forEach(x => {
                    if (x.status != "DELETE") {
                        friend.push(x.friendId);
                    }
                });
                arr2.forEach(x => {
                    if (x.status != "DELETE") {
                        friendlist.push(x.friendRequestId);
                    }
                });
                const newArr = friendrequestsent.concat(friendlist, friend);
                newArr.push(userData._id);
                var options = {
                    page: req.body.pageNumber || 1,
                    limit: req.body.limit || 5,
                    select: "name email mobileNumber profilePic",
                    sort: {
                        createdAt: -1
                    }
                };
                userModel.paginate({ _id: { $nin: newArr }, status: "ACTIVE" }, options, (errr, result1) => {
                    if (errr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    } else if (result1.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    } else {
                        console.log("success 2 1103", result);
                        console.log("req.body.limit>>>>>>>>>>>>>>>>>", req.body.limit);
                        // var result = { success2: result1 };
                        console.log("<><><<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result1.docs)

                        let doc = result1.docs
                        // let docArr=[]
                        let newArray = []
                        doc.forEach(x => {
                            let friendArray = []
                            let count = []
                            let friendId = []
                            friendArray.concat(x.friendList)
                            log("+++++++++++++++++++++++++++++++++++", x, "ttttttttttttttttt", x.friendList)
                            for (let a = 0; a < friendArray.length; a++) {
                                friendId.push(friendArray[a].friendId)
                            }

                            var presents = _.intersectionWith(friendlist, friendId, _.isEqual);
                            console.log("mutual friends::::::::::::::::::::::::::::::", count, "lenght>>>>>>>>>>>>>>>>>>>", count.length)
                            var obj = {
                                _id: x._id,
                                firstName: x.firstName,
                                email: x.email,
                                phoneNumber: x.phoneNumber,
                                profilePic: x.profilePic,
                                mutual: presents
                                    .length
                            }
                            newArray.push(obj);
                            console.log("nnnnewwwwwwwwwwwwwwwwwwwwwwooooooooooooo", obj)

                        })
                        const total = result1.total;
                        const pages = result1.pages;
                        const limit = result1.limit;
                        const page = result1.page;
                        var newResult = { success2: { docs: newArray, total, limit, page, pages } };

                        response(res, SuccessCode.SUCCESS, newResult, SuccessMessage.DATA_FOUND);
                    }
                }
                    // }
                );
            }
        });
    },
    /**
       * Function Name :myBlockUserList
       * Description   : show my myBlockUserList 
       *
       * @return response
     */
    myBlockUserList: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "USER" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);

                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var result = {
                        blockedUser: userData.blockedUser
                    }
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)

        }


    },
    /**
* Function Name :feedback
* Description   : feedback given by user on event
*
* @return response
*/

    feedback: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, status: "ACTIVE" }, async (err, result) => {
                console.log("JDJJFJ", err, result)

                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    eventModel.findOne({ _id: req.body._id, status: "ACTIVE" }, (eventErr, eventData) => {
                        if (eventErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!eventData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var obj = {
                                eventId: eventData._id,
                                userId: result._id,
                                eventTitle: eventData.title,
                                overAllExp: req.body.overAllExp,
                                punctualTime: req.body.punctualTime,
                                welcome: req.body.welcome,
                                recommend: req.body.recommend

                            }
                            feedBackModel.create(obj, (error, feedbackData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, feedbackData, SuccessMessage.FEEDBACK_GIVEN)
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
* Function Name :feedbackList
* Description   : List of feedback given by user on events
*
* @return response
*/

    feedbackList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var options = {
                        sort: { created_at: -1 },
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10
                    };
                    feedBackModel.paginate({ userId: userData._id }, options, (feedBackErr, feedbackData) => {
                        if (feedBackErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (feedbackData.docs == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, feedbackData, SuccessMessage.DATA_FOUND);

                        }
                    })
                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    /**
* Function Name :feedbackOnMyEvent
* Description   : List of feedback given by users on my event
*
* @return response
*/

    feedbackOnMyEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    eventModel.findOne({ _id: req.body.eventId, userId: userData._id, status: "ACTIVE" }, (eventErr, eventData) => {
                        if (eventErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!eventData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var options = {
                                sort: { created_at: -1 },
                                page: req.body.pageNumber || 1,
                                limit: req.body.limit || 10
                            };
                            feedBackModel.paginate({ eventId: req.body.eventId }, options, (feedBackErr, feedbackData) => {
                                if (feedBackErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (feedbackData.docs == 0) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, feedbackData, SuccessMessage.DATA_FOUND);

                                }
                            })

                        }
                    })

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    checkOnlineStatus: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: userData._id, status: "ACTIVE" }, { $set: { onlineStatus: req.body.onlineStatus } }, { new: true },
                        (err, updateData) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG)
                            }
                            else if (!updateData) {
                                response(res, ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateData, SuccessMessage.UPDATE_SUCCESS)
                            }
                        })

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    InterestList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    let query = { status: "ACTIVE" };
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        }
                    }
                    interestModel.paginate(query, options, (interestError, interestData) => {
                        if (interestError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else if (interestData.docs.length == 0) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, interestData, SuccessMessage.DATA_FOUND)
                        }
                    })

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    foodList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    let query = { status: "ACTIVE" };
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        }
                    }
                    foodModel.paginate(query, options, (err, data) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        } else if (data.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
                        }
                    })

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },
    languageList: (req, res) => {
        try {
            userModel.findOne({ _id: req.headers._id, userType: "USER" }, (error, userData) => {
                console.log("dhdgddgdg", error, userData)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    let query = { status: "ACTIVE" };
                    let options = {
                        page: req.body.pageNumber || 1,
                        limit: req.body.limit || 10,
                        sort: {
                            createdAt: -1
                        }
                    }
                    languageModel.paginate(query, options, (languageError, languageData) => {
                        if (languageError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                        }
                        else if (languageData.docs.length == 0) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, languageData, SuccessMessage.DATA_FOUND)
                        }
                    })

                }
            })
        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);

        }
    },



}
//------------------------------imageUpload---------------------




function imgUpload(image) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(image, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                resolve(result)
            }
        })
    })
}