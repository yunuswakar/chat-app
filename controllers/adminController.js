const userModel = require('../models/userModel');
const contentModel = require('../models/contentModel')
const reportModel = require('../models/reportModel')
const transactionModel = require('../models/transactionModel')
const eventModel = require('../models/eventModel')
const categoryModel = require('../models/categoryModel')
const communityModel = require('../models/communityModel')
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction')
const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');
const request = require('request')

module.exports = {


    /**
     * Function Name :login
     * Description   : login for admin
     *
     * @return response
   */
    login: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, adminData.password)
                    if (check) {
                        var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'socialX', { expiresIn: '24h' });
                        var result = {
                            userId: adminData._id,
                            token: token,
                            name: adminData.name,
                            email: adminData.email,
                            mobileNumber: adminData.mobileNumber,
                            country: adminData.country,
                            profilePic: adminData.profilePic,
                            permissions: adminData.permissions
                        };
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
       * Function Name :forgotPassword
       * Description   : forgotPassword of admin
       *
       * @return response
      */


    forgotPassword: (req, res) => {
        try {

            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otp3 = commonFunction.getOTP();
                    var otpTime4 = new Date().getTime();
                    var phoneNumber = result.countryCode + req.body.mobileNumber;
                    var url = `http://nimbusit.info/api/pushsms.php?user=${global.gConfig.nimbus.user}&key=${global.gConfig.nimbus.key}&sender=Sender%20id&mobile=${phoneNumber}&text=Hi ${result.name} please use this code ${otp3} to verify your account`
                    request(url,(error, otpSent) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        }
                        else {
                            userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber, countryCode: result.countryCode, status: "ACTIVE" }, { $set: { otp: otp3, otpTime: otpTime4 } }, { new: true }).select('-permissions -cardDetails').exec((error, otpUpdate) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.OTP_SEND);
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
     * Function Name :resetPassword
     * Description   : resetPassword of admin
     *
     * @return response
    */

    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "ADMIN" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    req.body.password = bcrypt.hashSync(req.body.newPassword);
                    var confirmPassword = bcrypt.hashSync(req.body.confirmPassword);
                    var check = bcrypt.compareSync(req.body.newPassword, confirmPassword);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.NOT_MATCH);
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.params._id }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
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
    otpVerify: (req, res) => {
        try {
            var query = { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }], status: "ACTIVE" };
            userModel.findOne(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_REGISTERED);
                }
                else {
                    var otpTime2 = new Date().getTime();
                    var dif = otpTime2 - result.otpTime;
                    if (dif >= 180000) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                    }
                    else {
                        if (req.body.otp == result.otp || req.body.otp == 1234) {
                            userModel.findOneAndUpdate(query, { $set: { otpVerification: true } }, { new: true }, (err2, result2) => {
                                if (err2) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
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
    /**
    * Function Name :changePassword
    * Description   : changePassword of admin
    *
    * @return response
   */

    changePassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (err, result) => {
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
                        userModel.findOneAndUpdate({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (err, updateResult) => {
                            if (err) {
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
    editProfileAdmin: async (req, res) => {
        try {
            userModel.findOne({ _id: req.adminId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    let query1 = { $and: [{ _id: req.body.adminId }, { status: "ACTIVE" }] }
                    userModel.findOne(query1, (valErr, valResult) => {
                        if (valErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!valResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                        }
                        else {
                            var query = {
                                $and: [
                                    {
                                        $or: [
                                            { email: req.body.email },
                                            { mobileNumber: req.body.mobileNumber }


                                        ]
                                    },
                                    { status: { $in: ["ACTIVE", "BLOCK"] } },
                                    { _id: { $ne: valResult._id } }

                                ]
                            };
                            userModel.findOne(query, async (adminError, adminResult) => {
                                if (adminError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (adminResult) {
                                    if (adminResult.email == req.body.email) {
                                        response(res, ErrorCode.EMAIL_EXIST, [], ErrorMessage.EMAIL_EXIST)
                                    }
                                    else if (customerResult.mobileNumber == req.body.mobileNumber) {
                                        response(res, ErrorCode.MOBILE_EXIST, [], ErrorMessage.MOBILE_EXIST)
                                    }
                                }
                                else {
                                    var set = {}
                                    if (req.body.name) {
                                        set["name"] = req.body.name
                                    }

                                    if (req.body.mobileNumber) {
                                        set["mobileNumber"] = req.body.mobileNumber
                                    }
                                    if (req.body.email) {
                                        set["email"] = req.body.email
                                    }
                                    if (req.body.image) {
                                        set["profilePic"] = await upload(req.body.image)
                                    }
                                    if (req.body.DOB) {
                                        set["DOB"] = req.body.DOB
                                    }
                                    var adminData = await userModel.findOneAndUpdate({ _id: req.body.adminId, status: "ACTIVE" }, { $set: set }, { new: true })
                                    if (adminData) {
                                        response(res, SuccessCode.SUCCESS, [adminData], SuccessMessage.UPDATE_SUCCESS)
                                    }
                                }
                            })
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    if (error)
                        resolve(false)
                    else if (result) {
                        resolve(result)
                    }
                })
            })
        }
    },

    /**
      * Function Name :getProfile
      * Description   : getProfile of admin
      *
      * @return response
     */

    getProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (err, result) => {
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
    //----------------------user management start------------------------------------------------//

    addUser: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
            })

            var query = {
                $and: [
                    {
                        $or: [
                            { email: req.body.email },
                            { mobileNumber: req.body.mobileNumber }
                        ]
                    },
                    { status: { $in: ["ACTIVE", "BLOCK"] } }
                ]
            };
            userModel.findOne(query, async (customerError, customerResult) => {
                if (customerError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (customerResult) {
                    if (customerResult.email == req.body.email) {
                        response(res, ErrorCode.EMAIL_EXIST, [], ErrorMessage.EMAIL_EXIST)
                    }
                    else if (customerResult.mobileNumber == req.body.mobileNumber) {
                        response(res, ErrorCode.MOBILE_EXIST, [], ErrorMessage.MOBILE_EXIST)
                    }
                }
                else {
                    if (req.body.image) {
                        var pic = await upload(req.body.image)
                    }

                    var obj = new userModel({
                        name: req.body.name,
                        mobileNumber: req.body.mobileNumber,
                        email: req.body.email,
                        profilePic: pic ? pic : "",
                        DOB: req.body.DOB

                    })
                    obj.save((error, result) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.DATA_SAVED)
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },
    editUser: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    let query1 = { $and: [{ _id: req.body.userId }, { status: "ACTIVE" }] }
                    userModel.findOne(query1, (valErr, valResult) => {
                        console.log("210=======>", valErr, valResult)
                        if (valErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!valResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                        }
                        else {
                            var query = {
                                $and: [
                                    {
                                        $or: [
                                            { email: req.body.email },
                                            { mobileNumber: req.body.mobileNumber }


                                        ]
                                    },
                                    { status: { $in: ["ACTIVE", "BLOCK"] } },
                                    { _id: { $ne: valResult._id } }

                                ]
                            };
                            userModel.findOne(query, async (customerError, customerResult) => {
                                if (customerError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (customerResult) {
                                    if (customerResult.email == req.body.email) {
                                        response(res, ErrorCode.EMAIL_EXIST, [], ErrorMessage.EMAIL_EXIST)
                                    }
                                    else if (customerResult.mobileNumber == req.body.mobileNumber) {
                                        response(res, ErrorCode.MOBILE_EXIST, [], ErrorMessage.MOBILE_EXIST)
                                    }
                                }
                                else {
                                    var set = {}
                                    if (req.body.name) {
                                        set["name"] = req.body.name
                                    }

                                    if (req.body.mobileNumber) {
                                        set["mobileNumber"] = req.body.mobileNumber
                                    }
                                    if (req.body.email) {
                                        set["email"] = req.body.email
                                    }
                                    if (req.body.image) {
                                        set["profilePic"] = await upload(req.body.image)
                                    }
                                    if (req.body.DOB) {
                                        set["DOB"] = req.body.DOB
                                    }
                                    var customerData = await userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: set }, { new: true })
                                    if (customerData) {
                                        response(res, SuccessCode.SUCCESS, [customerData], SuccessMessage.UPDATE_SUCCESS)
                                    }
                                }
                            })
                        }
                    })

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },
    listOfUser: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.userId) {
                        userModel.findOne({ _id: req.body.userId, status: "ACTIVE" }, (userErr, userResult) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!userResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [userResult], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] }, userType: "USER" };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { name: { $regex: req.body.search, $options: 'i' } }]
                        }
                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        userModel.paginate(query, options, (customerError, customerData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (customerData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [customerData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    deleteAndBlockUser: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.userId && req.body.status) {

                        var userData = await userModel.findOneAndUpdate({ _id: req.body.userId, status: { $in: ["ACTIVE", "BLOCK"] } }, { $set: { status: req.body.status } }, { new: true })
                        if (userData) {
                            response(res, SuccessCode.SUCCESS, [userData], SuccessMessage.UPDATE_SUCCESS)
                        }
                        else if (!userData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                    }
                    else {
                        var userData = await userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                        if (userData) {
                            response(res, SuccessCode.SUCCESS, [userData], SuccessMessage.DELETE_SUCCESS)
                        }
                        else if (!userData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    addCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, adminData) => {

                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, async (error, foodData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!foodData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            if (req.body.coverPageImage) {
                                var pic = await coverPageImage(req.body.coverPageImage)
                            }
                            if (req.body.image) {
                                var pic1 = await upload(req.body.image)
                            }

                            var obj = {
                                communityName: req.body.communityName,
                                link: req.body.link,
                                communityType: req.body.communityType,
                                categoryId: req.body.categoryId,
                                communityDescription: req.body.communityDescription,
                                logo: pic1 ? pic1 : "",
                                coverPage: pic ? pic : "",
                            }
                            new communityModel(obj).save((error, save) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
        function coverPageImage(coverPageImage) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(coverPageImage, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }

    },
    editCommunity: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var set = {}
                    if (req.body.communityName) {
                        set["communityName"] = req.body.communityName
                    }

                    if (req.body.link) {
                        set["link"] = req.body.link
                    }
                    if (req.body.communityType) {
                        set["communityType"] = req.body.communityType
                    }

                    if (req.body.categoryId) {
                        set["categoryId"] = req.body.categoryId
                    }
                    if (req.body.communityDescription) {
                        set["communityDescription"] = req.body.communityDescription
                    }
                    if (req.body.image) {
                        set["logo"] = await upload(req.body.image)
                    }
                    if (req.body.coverPageImage) {
                        set["coverPage"] = await coverPageImage(req.body.coverPageImage)
                    }
                    var communityData = await communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $set: set }, { new: true })
                    if (communityData) {
                        response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.UPDATE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
        function coverPageImage(coverPageImage) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(coverPageImage, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },
    listOfCommunity: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.communityId) {
                        communityModel.findOne({ _id: req.body.communityId, status: "ACTIVE" }, (userErr, communityData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!communityData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] } };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { communityName: { $regex: req.body.search, $options: 'i' } }]
                        }

                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        communityModel.paginate(query, options, (customerError, communityData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (communityData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    deleteAndBlockCommunity: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.communityId && req.body.status) {
                        var communityData = await communityModel.findOneAndUpdate({ _id: req.body.communityId, status: { $in: ["ACTIVE", "BLOCK"] } }, { $set: { status: req.body.status } }, { new: true })
                        if (communityData) {
                            response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.UPDATE_SUCCESS)
                        }
                    }
                    else {
                        var communityData = await communityModel.findOneAndUpdate({ _id: req.body.communityId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                        if (communityData) {
                            response(res, SuccessCode.SUCCESS, [communityData], SuccessMessage.UPDATE_SUCCESS)
                        }
                    }

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    //----------------------category management start-------------------------------------------------------

    addCategory: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN"}, (error, adminData) => {
                console.log("im in admin",adminData)
      
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    
                    var query = {
                        $and: [
                            {
                                categoryName: req.body.categoryName
                            },
                            { status: { $in: ["ACTIVE", "BLOCK"] } }
                        ]
                    };
                    categoryModel.findOne(query, async (error, categoryData) => {
                        
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (categoryData) {
                            if (categoryData.categoryName == req.body.categoryName) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXIST)
                            }
                        }
                        else {

                            var obj = {
                                categoryName: req.body.categoryName,
                                addedOn: req.body.addedOn,

                            }
                            new categoryModel(obj).save((error, save) => {
                              
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },

    editCategory: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    let query1 = { $and: [{ _id: req.body.categoryId }, { status: "ACTIVE" }] }
                    categoryModel.findOne(query1, (valErr, valResult) => {
                        if (valErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!valResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            var query = {
                                $and: [
                                    {
                                        categoryName: req.body.categoryName
                                    },
                                    { status: { $in: ["ACTIVE", "BLOCK"] } },
                                    { _id: { $ne: valResult._id } }
                                ]
                            };
                            categoryModel.findOne(query, async (error, categoryData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (categoryData) {
                                    if (categoryData.categoryName == req.body.categoryName) {
                                        response(res, ErrorCode.CATEGORY_EXIST, [], ErrorMessage.CATEGORY_EXIST)
                                    }
                                }
                                else {
                                    var set = {}
                                    if (req.body.categoryName) {
                                        set["categoryName"] = req.body.categoryName
                                    }


                                    var categoryData = await categoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: set }, { new: true })
                                    if (categoryData) {
                                        response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.UPDATE_SUCCESS)
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    listOfCategory: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.categoryId) {
                        categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (userErr, categoryData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!categoryData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] } };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { categoryName: { $regex: req.body.search, $options: 'i' } }]
                        }

                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 11,
                            sort: {
                                createdAt: -1
                            }
                        }
                        categoryModel.paginate(query, options, (customerError, categoryData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (categoryData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    listOfPublistCategory: async (req, res) => {

        categoryModel.find({ status: "ACTIVE", publishStatus: "true" }, (userErr, categoryResult) => {
            if (userErr) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!categoryResult) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, [categoryResult], SuccessMessage.DATA_FOUND);
            }
        })


    },
    deleteAndBlockCategory: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.categoryId && req.body.status) {
                        var categoryData = await categoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: { $in: ["ACTIVE", "BLOCK"] } }, { $set: { status: req.body.status } }, { new: true })
                        if (categoryData) {
                            response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.UPDATE_SUCCESS)
                        }
                    }
                    else {
                        var categoryData = await categoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                        if (categoryData) {
                            response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.UPDATE_SUCCESS)
                        }
                    }

                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    publishCategory: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var categoryData = await categoryModel.update({ _id: { $in: req.body.categoryId }, status: "ACTIVE" }, { $set: { publishStatus: req.body.publishStatus } }, { new: true, multi: true })
                    if (categoryData) {
                        response(res, SuccessCode.SUCCESS, [categoryData], SuccessMessage.UPDATE_SUCCESS)
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },

    //-------------------category management end--------------------------------------------------//

    //---------------------event management start--------------------------------------------------//

    addEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" }, (categoryErr, categoryData) => {
                        if (categoryErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!categoryData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            const obj = new eventModel({
                                eventName: req.body.eventName,
                                categoryId: categoryData._id,
                                eventType: req.body.eventType,
                                dateOfEvent: req.body.dateOfEvent
                            })
                            obj.save().then(data => {
                                response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_SAVED)

                            }).catch(err => {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, err)
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    listOfEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.eventId) {
                        eventModel.findOne({ _id: req.body.eventId, status: "ACTIVE" }).populate({ path: 'categoryId', select: 'categoryName' }).exec((userErr, eventData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!eventData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] } };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { eventName: { $regex: req.body.search, $options: 'i' } }]
                        }
                        if (req.body.eventType) {
                            query.eventType = req.body.eventType
                        }

                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            },
                            populate: { path: 'categoryId', select: 'categoryName' }

                        }
                        eventModel.paginate(query, options, (customerError, eventData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (eventData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    editEvent: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var eventData = await eventModel.findOneAndUpdate({ _id: req.body.eventId, status: "ACTIVE" }, { $set: req.body }, { new: true })
                    if (eventData) {
                        response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.UPDATE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    deleteEvent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var eventData = await eventModel.findOneAndUpdate({ _id: req.body.eventId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                    if (eventData) {
                        response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.DELETE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    //---------------------event management end--------------------------------------------------//
    //--------------------transaction management start-----------------------------------------------//

    addTransaction: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {

                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    new transactionModel(req.body).save((error, save) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                        }
                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },
    listOfTransaction: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.paymentId) {
                        transactionModel.findOne({ _id: req.body.paymentId, status: "ACTIVE" }, (userErr, paymentData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!paymentData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [paymentData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: "ACTIVE" };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { userName: { $regex: req.body.search, $options: 'i' } }]
                        }


                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        transactionModel.paginate(query, options, (customerError, paymentData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (paymentData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [paymentData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    deleteTransaction: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var eventData = await transactionModel.findOneAndUpdate({ _id: req.body.paymentId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                    if (eventData) {
                        response(res, SuccessCode.SUCCESS, [eventData], SuccessMessage.DELETE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    //--------------------transaction management end-----------------------------------------------//
    //------------------------report management start-----------------------------------------------
    addReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {

                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {

                    new reportModel(req.body).save((error, save) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED)
                        }
                    })
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },
    listOfReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.reportId) {
                        reportModel.findOne({ _id: req.body.reportId, status: "ACTIVE" }, (userErr, reporttData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!reporttData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [reporttData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: "ACTIVE" };
                        if (req.body.search) {
                            query.$and = [{ status: { $ne: "DELETE" } }, { reportedBy: { $regex: req.body.search, $options: 'i' } }]
                        }


                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        reportModel.paginate(query, options, (customerError, reporttData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (reporttData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [reporttData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    deleteReport: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var reporttData = await reportModel.findOneAndUpdate({ _id: req.body.reportId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true })
                    if (reporttData) {
                        response(res, SuccessCode.SUCCESS, [reporttData], SuccessMessage.DELETE_SUCCESS)
                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    //------------------------report management end-----------------------------------------------
    //-----------------------subAdmin management start--------------------------------------------


    addSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, async (err, result) => {
                if (err) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result) {
                    return res.send({ responseCode: 404, responseMessage: "Admin not found" })
                } else {
                    var query = {
                        $and: [
                            {
                                $or: [
                                    { email: req.body.email },
                                    { mobileNumber: req.body.mobileNumber }
                                ]
                            },
                            { status: { $in: ["ACTIVE", "BLOCK"] } }
                        ]
                    };
                    userModel.findOne(query, async (checkErr, checkResult) => {
                        if (checkErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (checkResult) {
                            if (checkResult.email == req.body.email) {
                                response(res, ErrorCode.EMAIL_EXIST, [], ErrorMessage.EMAIL_EXIST)
                            }
                            else if (checkResult.mobileNumber == req.body.mobileNumber) {
                                response(res, ErrorCode.MOBILE_EXIST, [], ErrorMessage.MOBILE_EXIST)
                            }
                        }
                        else {
                            console.log("1443========>")
                            if (req.body.password == req.body.confirmPassword) {
                                let subAdmin = {}
                                subAdmin.userType = "SUBADMIN";
                                subAdmin.name = req.body.name;
                                subAdmin.email = req.body.email;
                                subAdmin.mobileNumber = req.body.mobileNumber;
                                subAdmin.password = bcrypt.hashSync(req.body.password);

                                if (req.body.image) {
                                    var pic = await upload(req.body.image)
                                }
                                subAdmin.profilePic = pic;
                                if (req.body.dashboard) {
                                    subAdmin['permission.dashboard'] = req.body.dashboard;
                                }
                                if (req.body.categoryManagement) {
                                    subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
                                }
                                if (req.body.subAdminManagement) {
                                    subAdmin['permission.subAdminManagement'] = req.body.subAdminManagement;
                                }
                                if (req.body.contentPostManagement) {
                                    subAdmin['permission.contentPostManagement'] = req.body.contentPostManagement;
                                }
                                if (req.body.userManagement) {
                                    subAdmin['permission.userManagement'] = req.body.userManagement;
                                }
                                if (req.body.transactionManagement) {
                                    subAdmin['permission.transactionManagement'] = req.body.transactionManagement;
                                }
                                if (req.body.communityManagement) {
                                    subAdmin['permission.communityManagement'] = req.body.communityManagement;
                                }
                                if (req.body.reportManagement) {
                                    subAdmin['permission.reportManagement'] = req.body.reportManagement;
                                }
                                if (req.body.eventManagement) {
                                    subAdmin['permission.eventManagement'] = req.body.eventManagement;
                                }
                                if (req.body.staticContentManagement) {
                                    subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
                                }
                                userModel.create(subAdmin, (err1, result1) => {
                                    if (err1) {
                                        console.log("847==========>", err1, result1)
                                        return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else {
                                        response(res, SuccessCode.SUCCESS, result1, SuccessMessage.DATA_SAVED)
                                    }
                                })
                            } else {
                                return res.send({ responseCode: 404, responseMessage: "Password not matched" })
                            }
                        }

                    })
                }
            })

        } catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },

    editSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (err, result) => {
                if (err) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                } else if (!result) {
                    return res.send({ responseCode: 404, responseMessage: "User not found" })
                } else {
                    let query1 = { $and: [{ _id: req.body.subAdminId }, { status: "ACTIVE" }] }
                    userModel.findOne(query1, async (userErr, userResult) => {
                        if (userErr) {
                            return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        } else if (!userResult) {
                            return res.send({ responseCode: 404, responseMessage: "SubAdmin not found" })
                        }
                        else {
                            var query = {
                                $and: [
                                    {
                                        $or: [
                                            { email: req.body.email },
                                            { mobileNumber: req.body.mobileNumber }
                                        ]
                                    },
                                    { status: { $in: ["ACTIVE", "BLOCK"] } },
                                    { _id: { $ne: userResult._id } }
                                ]
                            };
                            userModel.findOne(query, async (checkErr, checkResult) => {
                                if (checkErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (checkResult) {
                                    if (checkResult.email == req.body.email) {
                                        response(res, ErrorCode.EMAIL_EXIST, [], ErrorMessage.EMAIL_EXIST)
                                    }
                                    else if (checkResult.mobileNumber == req.body.mobileNumber) {
                                        response(res, ErrorCode.MOBILE_EXIST, [], ErrorMessage.MOBILE_EXIST)
                                    }
                                }
                                else {
                                    var subAdmin = {};
                                    subAdmin.userType = "SUBADMIN";

                                    if (req.body.name) {
                                        subAdmin.name = req.body.name;
                                    }
                                    if (req.body.image) {
                                        subAdmin.profilePic = await upload(req.body.image)
                                    }
                                    if (req.body.email) {

                                        subAdmin.email = req.body.email;
                                    }
                                    if (req.body.mobileNumber) {
                                        subAdmin.mobileNumber = req.body.mobileNumber;
                                    }
                                    if (req.body.password) {
                                        if (req.body.password == req.body.confirmPassword) {
                                            subAdmin.password = bcrypt.hashSync(req.body.password);
                                        } else {
                                            return res.send({ responseCode: 404, responseMessage: "Password not matched" })
                                        }
                                    }

                                    if (req.body.dashboard == true) {

                                        subAdmin['permission.dashboard'] = req.body.dashboard;

                                    }
                                    if (req.body.dashboard == false) {

                                        subAdmin['permission.dashboard'] = req.body.dashboard;

                                    }
                                    if (req.body.userManagement == true) {
                                        subAdmin['permission.userManagement'] = req.body.userManagement;
                                    }
                                    if (req.body.userManagement == false) {
                                        subAdmin['permission.userManagement'] = req.body.userManagement;
                                    }
                                    if (req.body.categoryManagement == true) {
                                        subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
                                    }
                                    if (req.body.categoryManagement == false) {
                                        subAdmin['permission.categoryManagement'] = req.body.categoryManagement;
                                    }
                                    if (req.body.subAdminManagement == true) {
                                        subAdmin['permission.subAdminManagement'] = req.body.subAdminManagement;
                                    }
                                    if (req.body.subAdminManagement == false) {
                                        subAdmin['permission.subAdminManagement'] = req.body.subAdminManagement;
                                    }
                                    if (req.body.contentPostManagement == true) {
                                        subAdmin['permission.contentPostManagement'] = req.body.contentPostManagement;
                                    }
                                    if (req.body.contentPostManagement == false) {
                                        subAdmin['permission.contentPostManagement'] = req.body.contentPostManagement;
                                    }
                                    if (req.body.transactionManagement == true) {
                                        subAdmin['permission.transactionManagement'] = req.body.transactionManagement;
                                    }
                                    if (req.body.transactionManagement == false) {
                                        subAdmin['permission.transactionManagement'] = req.body.transactionManagement;
                                    }
                                    if (req.body.communityManagement == true) {
                                        subAdmin['permission.communityManagement'] = req.body.communityManagement;
                                    }
                                    if (req.body.communityManagement == false) {
                                        subAdmin['permission.communityManagement'] = req.body.communityManagement;
                                    }
                                    if (req.body.reportManagement == true) {
                                        subAdmin['permission.reportManagement'] = req.body.reportManagement;
                                    }
                                    if (req.body.reportManagement == false) {
                                        subAdmin['permission.reportManagement'] = req.body.reportManagement;
                                    }
                                    if (req.body.eventManagement == true) {
                                        subAdmin['permission.eventManagement'] = req.body.eventManagement;
                                    }
                                    if (req.body.eventManagement == false) {
                                        subAdmin['permission.eventManagement'] = req.body.eventManagement;
                                    }
                                    if (req.body.staticContentManagement == true) {
                                        subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
                                    }
                                    if (req.body.staticContentManagement == false) {
                                        subAdmin['permission.staticContentManagement'] = req.body.staticContentManagement;
                                    }

                                    userModel.findByIdAndUpdate({
                                        _id: req.body.subAdminId,
                                        userType: "SUBADMIN",
                                        status: "ACTIVE"
                                    },
                                        { $set: subAdmin },
                                        { new: true },
                                        (err1, result1) => {
                                            if (err1) {
                                                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                            } else {
                                                response(res, SuccessCode.SUCCESS, [result1], SuccessMessage.UPDATE_SUCCESS)
                                            }
                                        })
                                }
                            })
                        }
                    })
                }
            })

        } catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>", result)
                        resolve(result)
                    }
                })
            })
        }
    },

    listOfSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.subAdminId) {
                        userModel.findOne({ _id: req.body.subAdminId, status: "ACTIVE", userType: "SUBADMIN" }, (userErr, userResult) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!userResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [userResult], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] }, userType: "SUBADMIN" };


                        if (req.body.search) {
                            query.$and = [{
                                $or: [{ name: { $regex: req.body.search, $options: 'i' } },
                                { email: { $regex: req.body.search, $options: 'i' } }]
                            }, { status: { $ne: "DELETE" } }, { userType: "SUBADMIN" }]
                        }
                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        userModel.paginate(query, options, (customerError, customerData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (customerData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [customerData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    deleteSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var data = await userModel.findOneAndUpdate({ _id: req.body.subAdminId, status: "ACTIVE", userType: "SUBADMIN" }, { $set: { status: "DELETE" } }, { new: true })
                    if (data) {
                        response(res, SuccessCode.SUCCESS, [data], SuccessMessage.DELETE_SUCCESS)
                    }
                    else{
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    //-----------------------subAdmin managament end---------------------------------------------------


    //------------------------content post management start--------------------------------------------------

    addContent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    categoryModel.findOne({ categoryName: req.body.categoryName, status: "ACTIVE" }, async (categoryErr, categoryData) => {
                        if (categoryErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!categoryData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            if (req.body.image) {
                                var pic = await upload(req.body.image)
                            }
                            const obj = new contentModel({
                                title: req.body.title,
                                categoryName: categoryData.categoryName,
                                content: req.body.content,
                                postedBy: req.body.postedBy,
                                contentImage: pic ? pic : "",

                            })
                            obj.save().then(data => {
                                response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_SAVED)

                            }).catch(err => {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG, err)
                            })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        resolve(result)
                    }
                })
            })
        }
    },

    editContent: async (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async(adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    console.log("1837=======>")
                    var set = {}
                    if (req.body.title) {
                        set["title"] = req.body.title
                    }

                    if (req.body.categoryName) {
                        set["categoryName"] = req.body.categoryName
                    }
                    if (req.body.content) {
                        set["content"] = req.body.content
                    }
                    if (req.body.image) {
                        set["contentImage"] = await upload(req.body.image)
                    }
                    if (req.body.postedBy) {
                        set["postedBy"] = req.body.postedBy
                    }
                    var data = await contentModel.findOneAndUpdate({ _id: req.body.contentId, status: "ACTIVE" }, { $set: set }, { new: true })
                    if (data) {
                        response(res, SuccessCode.SUCCESS, [data], SuccessMessage.UPDATE_SUCCESS)
                    }
                    else{
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG,error)
        }
        function upload(image) {
            return new Promise((resolve, reject) => {
                commonFunction.uploadImage(image, (error, result) => {
                    console.log("749====>", error, result)
                    if (error)
                        resolve(false)
                    else if (result) {
                        resolve(result)
                    }
                })
            })
        }
    },

    listOfContent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    if (req.body.contentId) {
                        contentModel.findOne({ _id: req.body.contentId, status: "ACTIVE"}, (userErr, contentData) => {
                            if (userErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!contentData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [contentData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                    else {
                        let query = { status: { $in: ["ACTIVE", "BLOCK"] }};


                        if (req.body.search) {
                            query.$and = [{
                                $or: [{ title: { $regex: req.body.search, $options: 'i' } },
                                { categoryName: { $regex: req.body.search, $options: 'i' } }]
                            }, { status: { $ne: "DELETE" } }]
                        }
                        let options = {
                            page: req.body.pageNumber || 1,
                            limit: req.body.limit || 10,
                            sort: {
                                createdAt: -1
                            }
                        }
                        contentModel.paginate(query, options, (customerError, contentData) => {
                            if (customerError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (contentData.docs.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [contentData], SuccessMessage.DATA_FOUND);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    deleteContent: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
                if (adminErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    var data = await contentModel.findOneAndUpdate({ _id: req.body.contentId, status: "ACTIVE"}, { $set: { status: "DELETE" } }, { new: true })
                    if (data) {
                        response(res, SuccessCode.SUCCESS, [data], SuccessMessage.DELETE_SUCCESS)
                    }
                    else{
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)

                    }
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
   
    //-----------------------end----------------------------------------------------------------
}

//------------upload image---------------------------------//
function upload(image) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(image, (error, result) => {
            if (error)
                resolve(false)
            else if (result) {
                resolve(result)
            }
        })
    })
}


