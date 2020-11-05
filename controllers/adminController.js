const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');
const creditModel = require('../models/creditModel');
const retailerCouponModel = require('../models/retailerCouponModel');
const notificationModel = require('../models/notificationModel')
const previewModel = require('../models/previewModel');
const wishListModel = require('../models/myWishList');
const activityModel = require('../models/activityModel');
const rechargeModel = require('../models/rechargeModel');
const websiteModel = require('../models/websiteModel');
const transactionModel = require('../models/transactionModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const bcrypt = require('bcrypt-nodejs');
const couponTemplateModel = require('../models/RetailerCouponTeemplate');
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');
const emailTemplateModel = require('../models/emailTemplateModel');
const faqModel = require('../models/FAQModel');
const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');
const martModel = require('../models/martModel');
const couponTemplate = require('../models/couponTemplatesModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//  var upload = multer().single('csvFile');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency
const s3 = new AWS.S3({
    accessKeyId: "AKIASBFZOPOICLI62CED",
    secretAccessKey: "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"
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null,'./uploads/')

        //cb(null, path.join(__dirname, '/uploads/'));
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('svgImage');

var uploadMedia = async (file, type, folder) => {
    const newName = new Date().getTime()
    const params = {
        Bucket: "Template",
        Key: `build/reviews/${folder}/${newName}.${type}`,
        Body: file,
        ACL: 'public-read'
    }
    const result = await s3.upload(params).promise()

    return result
}
module.exports = {

    /**
     * Function Name :login
     * Description   : login of admin
     *
     * @return response
    */

    login: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                    if (adminData.twoFAEnable == false) {
                        const check = bcrypt.compareSync(req.body.password, adminData.password)
                        if (check) {
                            res.send({ responseCode: 200, responseMessage: "Your login is successfull.. ", token, auth: adminData.twoFAEnable })
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }
                    }
                    else {
                        const check = bcrypt.compareSync(req.body.password, adminData.password)
                        if (check) {
                            req.body.otp = commonFunction.getOTP();
                            req.body.otpTime = new Date().getTime();
                            commonFunction.sendotp2faSNS(adminData.email, "LightHouse Enterprises Otp verification", req.body.otp, (otpError, otp) => {
                                if (otpError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    commonFunction.sendSMSOTPSNS(adminData.mobileNumber, `Your otp is ${req.body.otp}. Please verify your otp.`, (snsError, snsSent) => {
                                        if (snsError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: adminData._id }, { $set: { otpVerification: false, otp: req.body.otp, otpTime: req.body.otpTime } }, { new: true, multi: true }, (verfiyError, verified) => {
                                                if (verfiyError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "OTP sent to the registered email address and mobile number. Please verify your account. ", token, auth: adminData.twoFAEnable })
                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);
                        }

                    }
                }
            })
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    resend2Fa: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    resendOtp: (req, res) => {
        try {
            userModel.findOne({ userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    console.log(result)
                    req.body.otp = commonFunction.getOTP();
                    req.body.otpTime = new Date().getTime();
                    commonFunction.sendotp2faSNS(result.email, "LightHouse Enterprises Otp verification", req.body.otp, (otpError, otp) => {
                        if (otpError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            commonFunction.sendSMSOTPSNS(result.mobileNumber, `Your otp is ${req.body.otp}. Please verify your otp.`, (snsError, snsSent) => {
                                if (snsError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: result._id }, { $set: { otpVerification: false, otp: req.body.otp, otpTime: req.body.otpTime } }, { new: true, multi: true }, (verfiyError, verified) => {
                                        if (verfiyError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "OTP sent to the registered email address and mobile number. Please verify your account. " })
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    getUserWishList: (req, res) => {
        try {
            console.log(req.body)
            userModel.findOne({ _id: req.body.userId })
            wishListModel.find({ userId: req.body.userId, type: req.body.type }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "WishList found successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }
    },


    enableDisbale2Fa: (req, res) => {
        try {
            let set = {}
            if (req.body.name) {
                set["name"] = req.body.name
            }
            if (req.body.mobileNumber) {
                set["mobileNumber"] = req.body.mobileNumber
            }
            req.body.otp1 = commonFunction.getOTP();
            req.body.otpTime1 = new Date().getTime();
            req.body.otp = commonFunction.getOTP();
            req.body.otpTime = new Date().getTime();
            set["emailOtp"] = req.body.otp1
            set["emailOtpTime"] = req.body.otpTime1
            set["mobileOtp"] = req.body.otp
            set["mobileOtpTime"] = req.body.otpTime
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminDataError, adminData) => {
                if (adminDataError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    commonFunction.sendSMSOTPSNS(adminData.mobileNumber, `Your OTP for 2Factor authentication is ${req.body.otp}.Use this otp to verify its you.`, (snsError, sns) => {
                        console.log(snsError, sns)
                        if (snsError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            commonFunction.sendMail(adminData.email, `OTP for two factor auth is ${req.body.otp1}.Use this otp to verify its you.`, (errorOtp, otpSent) => {
                                if (errorOtp) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findOneAndUpdate({ _id: adminData._id }, { $set: set }, { new: true, multi: true }, (twoFaError, twoFa) => {
                                        if (twoFaError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "OTP sent to your registered mobile number and email successfully.", twoFa })
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    verify2Fa: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    if (result.emailOtp == req.body.emailOtp && result.mobileOtp == req.body.mobileOtp) {
                        var otpTime2 = new Date().getTime();
                        var diff = otpTime2 - result.emailOtpTime;
                        var diff2 = otpTime2 - result.mobileOtp
                        if (diff >= 180000 && diff2 >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { twoFAEnable: req.body.twoFAEnable }, { new: true }, (verifyError, verified) => {
                                if (verifyError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Two factor authentication enabled successfully." })
                                }
                            })
                        }
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    verifyOtp: (req, res) => {
        try {
            userModel.findOne({ otp: req.body.otp, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (resultError, result) => {
                if (resultError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    res.send({ responseCode: 404, responseMessage: "No data found." })
                }
                else {
                    if (result.otp == req.body.otp) {
                        var otpTime2 = new Date().getTime();
                        var diff = otpTime2 - result.otpTime;
                        var token = jwt.sign({ id: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'lighthouse', { expiresIn: '24h' });
                        if (diff >= 180000) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.OTP_EXPIRED);
                        }
                        else {
                            userModel.findOneAndUpdate({ _id: result._id }, { otpVerification: true }, { new: true }, (verifyError, verified) => {
                                if (verifyError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Login successful.", token })
                                }
                            })
                        }
                    }
                    else {
                        res.send({ responseCode: 404, responseMessage: "Please enter correct otp." })
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
     * Description   : forgotPassword of admin
     *
     * @return response
    */

    forgotPassword: (req, res) => {
        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" }, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EMAIL_NOT_REGISTERED);
            }
            else {
                commonFunction.sendLink(result.email, result.firstName, result._id, (emailError, emailResult) => {
                    if (emailError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], INTERNAL_ERROR)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.FORGET_SUCCESS)
                    }

                })
            }
        })
    },

    /**
     * Function Name :resetPassword
     * Description   : resetPassword of admin
     *
     * @return response
    */

    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (err, result) => {
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

    /**
     * Function Name :getProfile
     * Description   : getProfile of admin
     *
     * @return response
    */

    getProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "SUBADMIN"] }, status: "ACTIVE" }, (err, result) => {
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
     * Description   : changePassword of admin
     *
     * @return response
    */

    changePassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: { $in: ["ADMIN", "SUBADMIN"] }, status: "ACTIVE" }, (err, result) => {
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
                        userModel.findOneAndUpdate({ _id: req.userId, userType: { $in: ["ADMIN", "SUBADMIN"] }, status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (err3, updateResult) => {
                            if (err3) {
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

    /**
     * Function Name :addSubAdmin
     * Description   : addSubAdmin in sub-admin management
     *
     * @return response
    */

    addSubAdmin: (req, res) => {

        if (!req.body.firstName || !req.body.lastName || !req.body.mobileNumber || !req.body.email || !req.body.roleId || !req.body.password) {
            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL);

        } else {
            try {
                var obj = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    countryCode: req.body.countryCode || "+91",
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                    roleId: req.body.roleId,
                    password: bcrypt.hashSync(req.body.password),
                    userType: "SUBADMIN"
                };
                roleModel.findOne({ _id: req.body.roleId, status: "ACTIVE" }, (err, role) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!role) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        let query = { $and: [{ $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }, { status: { $in: ["ACTIVE", "BLOCK"] } }] }
                        userModel.findOne(query, (err1, result) => {
                            if (err1) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result) {
                                if (result.email == obj.email) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                }
                                else {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                }
                            }
                            else {
                                let mailBody = `Your account has been created as a subadmin. Your email is ${req.body.email} and password is ${req.body.password}`
                                commonFunction.sendMail(req.body.email, mailBody, (err0, info) => {
                                    if (err0) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        new userModel(obj).save((err2, subadmin) => {
                                            if (err2) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, subadmin, SuccessMessage.SUB_ADMIN_CREATED);
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
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            }

        }

    },

    /**
     * Function Name :editSubAdmin
     * Description   : editSubAdmin in sub-admin management
     *
     * @return response
    */

    editSubAdmin: (req, res) => {
        try {
            let query = { $and: [{ _id: req.body.subadminId }, { status: "ACTIVE" }] }
            userModel.findOne(query, (err, subadmin) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subadmin) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    let query1 = { $and: [{ $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }, { status: { $in: ["ACTIVE", "BLOCK"] } }, { _id: { $ne: subadmin._id } }] }
                    userModel.findOne(query1, (err0, result) => {
                        if (err0) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (result) {
                            if (result.email == req.body.email) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                            }
                            else {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                            }
                        }
                        else {
                            let emailBody = 'Your profile is updated successfully.'
                            if (req.body.email) {
                                emailBody = emailBody + `Your updated email is ${req.body.email}.`
                                req.body["email"] = req.body.email
                            }
                            else {
                                emailBody = emailBody + `Your  email is ${subadmin.email}.`
                                req.body['email'] = subadmin.email
                            }
                            if (req.body.password) {
                                emailBody = emailBody + `Your new password is ${req.body.password}.`
                                req.body["password"] = bcrypt.hashSync(req.body.password)
                            }
                            commonFunction.sendMail(req.body.email, emailBody, (err1, info) => {
                                if (err1) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    userModel.findByIdAndUpdate({ _id: subadmin._id }, { $set: req.body }, { new: true }, (err01, success) => {
                                        if (err01) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, success, SuccessMessage.UPDATE_SUCCESS);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    editSubAdminRole: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subadminId }, (subError, subData) => {
                if (subError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    roleModel.findOne({ _id: req.body.roleId }, (roleError, roleData) => {
                        if (roleError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!roleData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var data = {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                mobileNumber: req.body.mobileNumber,
                                roleId: req.body.roleId,
                                roleName: roleData.roleName
                            }
                            userModel.findOneAndUpdate({ _id: req.body.subadminId }, { $set: data }, { new: true }, (updateError, updated) => {
                                if (updateError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Profile updated successfully." })
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
     * Function Name :viewSubAdmin
     * Description   : viewSubAdmin in sub-admin management
     *
     * @return response
    */

    viewSubAdmin: (req, res) => {
        try {
            if (!req.params.subadminId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                userModel.findOne({ _id: req.params.subadminId, status: "ACTIVE" }, (err, subadmin) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!subadmin) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, subadmin, SuccessMessage.DETAIL_GET);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :updateStatusSubAdmin
     * Description   : updateStatusSubAdmin in sub-admin management
     *
     * @return response
    */

    updateStatusSubAdmin: (req, res) => {
        try {
            if (!req.body.subadminId || !req.body.status) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                let query = { $and: [{ _id: req.body.subadminId }, { status: { $in: ["ACTIVE", "BLOCK"] } }] }
                userModel.findOne(query, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        userModel.findByIdAndUpdate({ _id: result._id }, { $set: { status: req.body.status } }, { new: true }, (err1, success) => {
                            if (err1) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, success, SuccessMessage.STATUS_UPDATED);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :subAdminList
     * Description   : subAdminList in sub-admin management
     *
     * @return response
    */

    subAdminList: (req, res) => {
        try {
            let query = { "userType": "SUBADMIN", status: "ACTIVE" };
            if (req.body.search) {
                query = {
                    $or: [{ firstName: { $regex: req.body.search, $options: 'i' } },
                    { lastName: { $regex: req.body.search, $options: 'i' } }]
                }
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 },
                populate: "roleId"
            };
            userModel.paginate(query, options, (err, subadmin) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (subadmin.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, subadmin, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    deleteSubAdmin: (req, res) => {
        userModel.findOneAndUpdate({ _id: req.body.subAdminId, userType: "SUBADMIN" }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
            }
        })
    },


    /**
     * Function Name :viewUser
     * Description   : viewUser in user management
     *
     * @return response
    */

    viewUser: (req, res) => {
        try {
            if (!req.params.userId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                userModel.findOne({ _id: req.params.userId, status: "ACTIVE" }, (err, userData) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DETAIL_GET);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
        * Function Name :userList
        * Description   : userList in user management
        *
        * @return response
       */

    userList: (req, res) => {
        try {
            let query = { "userType": "USER", status: { $ne: "DELETE" } }
            if (req.body.search) {
                query = {
                    $and: [{
                        userType: "USER", status: { $ne: "DELETE" },
                        $or: [{ firstName: { $regex: req.body.search, $options: 'i' } },
                        { lastName: { $regex: req.body.search, $options: 'i' } },
                        { email: { $regex: req.body.search, $options: 'i' } },
                        { phoneNumber: { $regex: req.body.search, $options: 'i' } }]
                    }]
                }
            }
            if (req.body.loginStatus) {
                query.loginStatus = req.body.loginStatus
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            userModel.paginate(query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
                }
            })
            //     let query = {"userType": "USER"};
            //     if (req.body.search) {
            //         query = {
            //             $or: [{ firstName: { $regex: req.body.search, $options: 'i' } },
            //             { lastName: { $regex: req.body.search, $options: 'i' } }]
            //         }
            //     }
            //     if (req.body.status) {
            //         query.status = req.body.status
            //     }
            //     let options = {
            //         page: req.body.page || 1,
            //         limit: req.body.limit || 5,
            //         sort: { createdAt: -1 }
            //     };
            //     userModel.paginate(query, options, (err, userData) => {
            //         if (err) {
            //             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            //         }
            //         else if (userData.docs.length == 0) {
            //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            //         }
            //         else {
            //             response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
            //         }
            //     })
            // }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
        * Function Name :active/block user
        * Description   : activeBlock in user management
        *
        * @return response
       */

    activeBlockUser: (req, res) => {
        try {
            if (!req.body.userId || !req.body.status) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                let query = { $and: [{ _id: req.body.userId }] }
                userModel.findOne(query, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        userModel.findByIdAndUpdate({ _id: result._id }, { $set: { loginStatus: req.body.status } }, { new: true }, (err1, success) => {
                            if (err1) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, success, SuccessMessage.STATUS_UPDATED);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
         * Function Name :addCommentWhenRejectingCoupon
         * Description   : admin addCommentWhenRejectingCoupon
         *
         * @return response
        */
    addCommentWhenRejectingCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (error, userData) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!userData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            retailerCouponModel.findOne({ _id: req.body.couponId }, (couponError, coupon) => {
                                if (couponError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!coupon) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    commonFunction.sendRejectionMail(retailerData.email, "Coupon rejected", req.body.comment, (mailError, mailed) => {
                                        if (mailError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            var data = {
                                                retailerId: req.userId,
                                                couponId: coupon._id,
                                                comment: req.body.comment
                                            }
                                            var notification = new notificationModel(data)
                                            notification.save((updateError, updated) => {
                                                if (updateError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    retailerCouponModel.findOneAndUpdate({ _id: coupon._id }, { $set: { couponStatus: "REJECTED", appovalStatus: "REJECTED" } }, { new: true, multi: true }, (retailError, retailer) => {
                                                        if (retailError) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            res.send({ responseCode: 200, responseMessage: "coupon rejected successfuly", updated })
                                                            // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
     * Function Name :addCommentWhenApprovingCoupon
     * Description   : admin addCommentWhenApprovingCoupon
     *
     * @return response
    */
    addCommentWhenApprovingCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            retailerCouponModel.findOne({ _id: req.body.couponId }, (couponError, coupon) => {
                                console.log(coupon)
                                if (couponError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!coupon) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    commonFunction.sendRejectionMail(retailerData.email, "Coupon accepted", req.body.comment, (mailError, mailed) => {
                                        if (mailError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            var data = {
                                                retailerId: req.userId,
                                                couponId: coupon._id,
                                                comment: req.body.comment
                                            }
                                            var notification = new notificationModel(data)
                                            notification.save((updateError, updated) => {
                                                if (updateError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    retailerCouponModel.findOneAndUpdate({ _id: coupon._id }, { $set: { couponStatus: "PUBLISHED", appovalStatus: "APPROVED" } }, { new: true, multi: true }, (retailError, retailer) => {
                                                        if (retailError) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            res.send({ responseCode: 200, responseMessage: "Coupon accepted successfully", updated })
                                                            // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewUserWishList: (req, res) => {
        try {
            if (!req.params.userId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                userModel.findOne({ _id: req.params.userId, status: "ACTIVE" }, (err, userData) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        var query = { status: "ACTIVE" }
                        if (req.body.type == "MART") {
                            query.type = req.body.type
                        }
                        wishListModel.find(query, (error, wishListData) => {
                            console.log(">>>>>>644", error, wishListData)
                            if (error) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (wishListData.length == 0) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, wishListData, SuccessMessage.DETAIL_GET);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
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

            wishListModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :addCommentWhenApprovingRetailer
     * Description   : admin addCommentWhenApprovingRetailer
     *
     * @return response
    */
    addCommentWhenApprovingRetailerApplication: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var newCredit = config.signupCredits + refferal.credit
                    userModel.findOneAndUpdate({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, { $set: { credit: newCredit } }, { new: true }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            commonFunction.sendRejectionMail(retailerData.email, "Retailer application approved", req.body.comment, (mailError, mailed) => {
                                if (mailError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var data = {
                                        retailerId: req.userId,
                                        comment: req.body.comment
                                    }
                                    var notification = new notificationModel(data)
                                    notification.save((updateError, updated) => {
                                        if (updateError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            retailerCouponModel.findOneAndUpdate({ _id: retailerData._id }, { reatilerStatus: "ACTIVE" }, { new: true }, (retailError, retailer) => {
                                                if (retailError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    var creditData = {
                                                        retailerId: refferal._id,
                                                        creditType: "SIGNUP CREDIT",
                                                        credit: config.earnedCredits
                                                    }
                                                    var creditHistory = new creditModel(creditData)
                                                    creditHistory.save((creditError, creditDataHis) => {
                                                        if (creditError) {
                                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            res.send({ responseCode: 200, responseMessage: "Retailer application accepted successfuly", updated })
                                                        }
                                                    })
                                                    // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
 * Function Name :addCommentWhenApprovingRetailer
 * Description   : admin addCommentWhenApprovingRetailer
 *
 * @return response
*/
    addCommentWhenRejectingRetailerApplication: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            commonFunction.sendRejectionMail(retailerData.email, "Retailer application rejected", req.body.comment, (mailError, mailed) => {
                                if (mailError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var data = {
                                        retailerId: req.userId,
                                        comment: req.body.comment
                                    }
                                    var notification = new notificationModel(data)
                                    notification.save((updateError, updated) => {
                                        if (updateError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: retailerData._id }, { retailerStatus: "INACTIVE" }, { new: true }, (retailError, retailer) => {
                                                if (retailError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Credit History found successfuly", updated })

                                                    // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    addCommentWhenApprovingRetailerWebsite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            commonFunction.sendRejectionMail(retailerData.email, "Retailer application approved", req.body.comment, (mailError, mailed) => {
                                if (mailError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var data = {
                                        retailerId: req.userId,
                                        comment: req.body.comment
                                    }
                                    var notification = new notificationModel(data)
                                    notification.save((updateError, updated) => {
                                        if (updateError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: retailerData._id }, { websiteStatus: "ACTIVE" }, { new: true }, (retailError, retailer) => {
                                                if (retailError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Retailer website approved successfuly", updated })
                                                    // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    changePaymentStatus: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.retailerId, loginStatus: "UNBLOCK" }, { paymentStatus: req.body.paymentStatus }, { new: true }, (updationError, updationDone) => {
                        if (updationError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Status updated successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    addCommentWhenRejectingRetailerWebsite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, userType: "RETAILER", status: "ACTIVE" }, (retailerError, retailerData) => {
                        if (retailerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!retailerData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            commonFunction.sendRejectionMail(retailerData.email, "Retailer website rejected", req.body.comment, (mailError, mailed) => {
                                if (mailError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var data = {
                                        retailerId: req.userId,
                                        comment: req.body.comment
                                    }
                                    var notification = new notificationModel(data)
                                    notification.save((updateError, updated) => {
                                        if (updateError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            userModel.findOneAndUpdate({ _id: retailerData._id }, { websiteStatus: "INACTIVE" }, { new: true }, (retailError, retailer) => {
                                                if (retailError) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    res.send({ responseCode: 200, responseMessage: "Retailer website rejected successfuly", updated })
                                                    // response(res, SuccessCode.SUCCESS, updated, SuccessMessage.STATUS_UPDATED);
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addOrsubtractRetailerCredit
     * Description   : addOrsubtractRetailerCredit of retailer in retailer management
     *
     * @return response
    */
    addOrsubtractRetailerCredit: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminError, adminData) => {
                if (adminError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.body.retailerId, status: "ACTIVE", userType: "RETAILER" }, (error, result) => {
                        console.log(error, result)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var newCredit = result.credit + Number(req.body.credit)
                            userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $set: { credit: newCredit } }, { new: true }, (creditError, credited) => {
                                if (creditError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    var obj = {
                                        retailerId: result._id,
                                        description: req.body.description,
                                        credit: req.body.credit,
                                        creditType: "ADJUSTMENT",
                                        creditNature: "DB"
                                    }
                                    var newObj = new creditModel(obj)
                                    newObj.save((saveError, savedData) => {
                                        console.log(saveError, savedData)
                                        if (saveError) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            res.send({ responseCode: 200, responseMessage: "Credit updated successfully", result })
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
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewWebsite: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (error, retailerDetails) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!retailerDetails) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    websiteModel.findOne({ retailerId: req.params.retailerId }, (martError, martFound) => {
                        console.log(martFound, martError)
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



    /**
         * Function Name :creditHistory
         * Description   : creditHistory of retailer in retailer management
         *
         * @return response
        */



    creditHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        creditModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "credit not found not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "credit history found successfully", cuponData })
            }
        })
    },


    websiteHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        websiteModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No website found for this retailer." })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Website found successfully.", cuponData })
            }
        })
    },


    websiteList: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        websiteModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "No website found for this retailer." })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Website found successfully.", cuponData })
            }
        })
    },
    retailerListWithPagination: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
                if (error) {
                    console.log(error)
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.userType == "ADMIN") {
                        let query = { "userType": "RETAILER", status: { $ne: "DELETE" }, "hasSignedUp": true };
                        if (req.body.websiteStatus) {
                            query.websiteStatus = req.body.websiteStatus;
                        }
                        if (req.body.status) {
                            query.retailerStatus = req.body.status
                        }
                        if (req.body.martName) {
                            query = { $and: [{ martName: { $regex: req.body.martName, $options: 'i' } }] }
                        }
                        if (req.body.shopName) {
                            query = { $and: [{ shopName: { $regex: req.body.shopName, $options: 'i' } }] }
                        }
                        let options = {
                            page: req.body.page || 1,
                            limit: req.body.limit || 5,
                            sort: { createdAt: -1 }
                        };
                        userModel.paginate(query, options, (cuponError, cuponData) => {
                            console.log("1054=====>", cuponError, cuponData)
                            if (cuponError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            } else if (cuponData.length == 0) {
                                return res.send({ responseCode: 404, responseMessage: "Retailers not found not found" })
                            }
                            else {
                                return res.send({ responseCode: 200, responseMessage: "Retailers  found successfully", cuponData })
                            }
                        })
                    }
                    else {
                        let query = { assignedManagerId: req.userId, status: "ACTIVE" };
                        if (req.body.websiteStatus) {
                            query.websiteStatus = req.body.websiteStatus;
                        }
                        if (req.body.status) {
                            query.status = req.body.status
                        }
                        if (req.body.search) {
                            query = {
                                $and: [{ status: "ACTIVE" }, {
                                    $or: [{ martName: { $regex: req.body.search, $options: 'i' } },
                                    { shopName: { $regex: req.body.search, $options: 'i' } }]
                                }]
                            }
                        }
                        let options = {
                            page: req.body.page || 1,
                            limit: req.body.limit || 5,
                            sort: { createdAt: -1 }
                        };
                        if (result.userType == "SUBADMIN") {
                            console.log("i am not working")
                        }
                        userModel.paginate(query, options, (paginError, paginated) => {
                            if (paginError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (paginated.docs.length == 0) {
                                return res.send({ responseCode: 404, responseMessage: "Retailers not found not found" })
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "Retailer list fetched successfully", paginated })
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




    viewRetailer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminError, adminData) => {
                if (adminError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: req.params.retailerId, status: "ACTIVE", userType: "RETAILER" }, (reatilerError, reatiler) => {
                        if (reatilerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!reatiler) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, reatiler, SuccessMessage.DATA_FOUND);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    blockUnblockRetailer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (adminError, adminData) => {
                if (adminError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    userModel.findOneAndUpdate({ _id: req.body.retailerId, userType: "RETAILER" }, { $set: { loginStatus: req.body.status } }, { new: true }, (reatilerError, reatiler) => {
                        if (reatilerError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!reatiler) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, reatiler, SuccessMessage.DATA_FOUND);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    couponList: (req, res) => {
        try {
            let query = { "status": "ACTIVE" };
            if (req.body.websiteStatus) {
                query.websiteStatus = req.body.websiteStatus;
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            retailerCouponModel.paginate(query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Coupon list found successfully", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    // viewCoupon: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminError, admin) => {
    //             if (adminError) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!admin) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //             }
    //             else {
    //                 retailerCouponModel.findOne({ _id: req.params.couponId, status: "ACTIVE" }, (error, result) => {
    //                     if (error) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (!result) {
    //                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //                     }
    //                     else {
    //                         response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    rechargeHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        rechargeModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            } else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "credit not found not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Recharge history found successfully", cuponData })
            }
        })
    },


    couponHistory: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" }, retailerId: req.body.retailerId };

            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.martName) {
                query = { martName: { $regex: req.body.martName, $options: 'i' } }
            }
            if (req.body.shopName) {
                query = { shopName: { $regex: req.body.shopName, $options: 'i' } }
            }
            if (req.body.couponStatus) {
                query.couponStatus = req.body.couponStatus
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    retailerCouponModel.paginate(query, options, (error, result) => {
                        console.log(error, result)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Coupon History found successfuly", result })
                            // response(res, SuccessCode.SUCCESS, result, SuccessMessage.RECHARGELIST)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    viewCoupon: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    retailerCouponModel.findOne({ _id: req.params.couponId }, (error, result) => {
                        console.log(error, result)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Coupon found successfuly", result })
                            // response(res, SuccessCode.SUCCESS, result, SuccessMessage.RECHARGELIST)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewNotification: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    notificationModel.find({ userId: req.userId, status: "ACTIVE" }, (error, result) => {
                        console.log(error, result)
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (result.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Notification found successfuly", result })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    clearNotifications: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
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

    // viewNotification: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
    //             if (userError) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!adminData) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //             }
    //             else {
    //                 notificationModel.find((error, result) => {
    //                     console.log(error, result)
    //                     if (error) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (!result) {
    //                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //                     }
    //                     else {
    //                         res.send({ responseCode: 200, responseMessage: "Notification found successfuly", result })
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    // clearNotifications: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
    //             if (userError) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!adminData) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //             }
    //             else {
    //                 notificationModel.update((error, result) => {
    //                     console.log(error, result)
    //                     if (error) {
    //                         response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (!result) {
    //                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //                     }
    //                     else {
    //                         res.send({ responseCode: 200, responseMessage: "Notification found successfuly", result })
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    // viewLog: (req, res) => {
    //     userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, async (adminErr, adminData) => {
    //         if (adminErr) {
    //             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //         }
    //         else if (!adminData) {
    //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //         }
    //         else {
    //             var logData = await activityModel.find({ status: "ACTIVE" })
    //             res.send({ responseCode: 200, responseMessage: "Activity log successfully found", logData })
    //         }
    //     })
    // },

    viewLog: (req, res) => {
        userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                let query = {}
                if (req.body.fromDate && !req.body.toDate) {
                    query.createdAt = { $gte: req.body.fromDate };
                }
                if (!req.body.fromDate && req.body.toDate) {
                    query.createdAt = { $lte: req.body.toDate }
                }
                if (req.body.fromDate && req.body.toDate) {
                    query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
                }
                if (req.body.userId) {
                    query.userId = req.body.userId
                }
                let options = {
                    page: req.body.page || 1,
                    limit: req.body.limit || 5,
                    sort: { createdAt: -1 }
                };
                activityModel.paginate(query, options, (queryError, queried) => {
                    if (queryError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (queried.docs.length == 0) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "Activity log successfully found", queried })
                    }
                })
            }
        })
    },
    resendOtpMob2Fa: (req, res) => {
        userModel.findOne({ userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminError, adminData) => {
            if (adminError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!adminData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                console.log(adminData)
                req.body.otp = commonFunction.getOTP();
                req.body.otpTime = new Date().getTime();
                console.log(req.body.otp)
                commonFunction.sendSMSOTPSNS(adminData.mobileNumber, `Your otp for lighthouse enterprises is ${req.body.otp}.`, (otpError, otp) => {
                    if (otpError) {
                        console.log("error sending otp.")
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: adminData._id }, { $set: { otpVerification: false, mobileOtp: req.body.otp, mobileOtpTime: req.body.otpTime } }, { new: true, multi: true }, (updateError, updation) => {
                            if (updateError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "Otp sent" })
                            }
                        })
                    }
                })
            }
        })
    },

    resendZOtpEmail: (req, res) => {
        userModel.findOne({ userType: { $in: ["ADMIN", "SUBADMIN"] } }, (adminError, adminData) => {
            if (adminError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!adminData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                console.log(adminData)
                req.body.otp = commonFunction.getOTP();
                req.body.otpTime = new Date().getTime();
                console.log(req.body.otp)
                commonFunction.sendotp2faSNS(adminData.email, "OTP verification.", req.body.otp, (otpError, otp) => {
                    if (otpError) {
                        console.log("error sending otp.")
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: adminData._id }, { $set: { otpVerification: false, emailOtp: req.body.otp, emailOtpTime: req.body.otpTime } }, { new: true, multi: true }, (updateError, updation) => {
                            if (updateError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                res.send({ responseCode: 200, responseMessage: "Otp sent" })
                            }
                        })
                    }
                })
            }
        })
    },
    paymentHistory: (req, res) => {
        let query = { status: "ACTIVE" };
        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.transactionId) {
            query = { $and: [{ transactionId: { $regex: req.body.transactionId, $options: 'i' } }] }
        }
        if (req.body.retailerId) {
            query.retailerId = req.body.retailerId
        }
        transactionModel.paginate(query, options, (cuponError, cuponData) => {
            console.log("1054=====>", cuponError, cuponData)
            if (cuponError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (cuponData.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "credit not found not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Payment history found successfully", cuponData })
            }
        })
    },
    getAllSubCategoryByCategory: (req, res) => {
        subCategoryModel.find({ categoryId: req.body.categoryId, status: "ACTIVE" }).sort({ "subCategoryPriority": +1 }).exec((error, result) => {
            if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error" })
            }
            else if (result.length == 0) {
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
            }
            else {
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", result })
            }
        })
    },

    deletePaymentHistory: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transactionModel.findOneAndUpdate({ _id: req.body.transactionId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Payment data deleted successfuly", result })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewGraphData: (req, res) => {
        // try {
        var query = {};
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{
                createdAt: { $gte: new Date(req.body.fromDate) }
            },
            {
                createdAt: { $lte: new Date(req.body.toDate) }
            }]
        }
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: new Date(req.body.fromDate) }
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: new Date(req.body.toDate) }
        }
        if (req.body.gender) {
            query.gender = req.body.gender
        }
        if (req.body.occupation) {
            query.occupation = req.body.occupation
        }
        if (req.body.homeOwnership) {
            query.homeOwnership = req.body.homeOwnership
        }
        if (req.body.ageRange) {
            query.ageRange = req.body.ageRange
        }
        if (req.body.incomeRange) {
            query.incomeRange = req.body.incomeRange
        }

        var aggregate = previewModel.aggregate([

            { $match: { status: { $eq: "ACTIVE" } } },

            { $match: query }
        ])

        var options = {
            page: req.body.page || 1,
            limit: req.body.limit || 10
        };
        previewModel.aggregatePaginate(aggregate, options, function (err, results, totalpage, total) {
            console.log("1522====>", options.populate)
            if (err) {
                res.send({ responseCode: 500, responseMessage: "Internal Server Error...", err })
            }
            else if (results.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found" })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "The job details are...", results, totalpage, total })
            }
        })


        // } catch (error) {
        //     res.send({ responseCode: 500, responseMessege: "Something went wrong",error })
        // }
    },



    viewPaymentHistory: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: { $in: ["ADMIN", "SUBADMIN"] } }, (userError, adminData) => {
                if (userError) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transactionModel.findOne({ _id: req.params.transactionId, status: "ACTIVE" }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Payment data found successfuly", result })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    reportForUsers: (req, res) => {
        if (req.body.userType == "USER") {
            var query = { userType: "USER", status: { $ne: "DELETE" } }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 11,
                sort: { createdAt: -1 }
            };
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            userModel.paginate(query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "RETAILER") {
            var reatiler_query = { userType: "RETAILER", status: { $ne: "DELETE" } }
            var options1 = {
                page: req.body.page || 1,
                limit: req.body.limit || 11,
                sort: { createdAt: -1 }
            };
            if (req.body.fromDate && !req.body.toDate) {
                reatiler_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                reatiler_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                reatiler_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            userModel.paginate(reatiler_query, options1, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Retailers found successfully.", result })
                }
            })
        }
    },

    retailerAndEndUsersCount: (req, res) => {
        if (req.body.userType == "USER") {
            var query = { userType: "USER", status: { $ne: "DELETE" } }
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            userModel.count(query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "RETAILER") {
            var retailer_query = { "userType": "RETAILER", status: { $ne: "DELETE" }, "hasSignedUp": true }
            if (req.body.fromDate && !req.body.toDate) {
                retailer_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                retailer_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                retailer_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                retailer_query.status = req.body.status
            }
            userModel.count(retailer_query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Retailers found successfully.", result })
                }
            })
        }
    },

    endUserSignUp: (req, res) => {
        if (req.body.userType == "USER") {
            var query = { userType: "USER", status: { $ne: "DELETE" } }
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            userModel.paginate(query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "RETAILER") {
            var retailer_query = { userType: "RETAILER", status: { $ne: "DELETE" } }
            if (req.body.fromDate && !req.body.toDate) {
                retailer_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                retailer_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                retailer_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                retailer_query.status = req.body.status
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            userModel.paginate(retailer_query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Retailers found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "COUPON") {
            var coupon_query = {}
            if (req.body.fromDate && !req.body.toDate) {
                coupon_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                coupon_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                coupon_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                coupon_query.status = req.body.status
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            previewModel.paginate(coupon_query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Previews found successfully.", result })
                }
            })
        }
    },

    /**
 * Function Name :assignManagerToRetailer
 * Description   : assignManagerToRetailer in retailer management
 *
 * @return response
*/

    'assignManagerToRetailer': async (req, res) => {
        try {
            var subadminData = await userModel.findOne({ _id: req.body.managerId, userType: "SUBADMIN" })
            var data = {
                managerName: subadminData.firstName + " " + subadminData.lastName,
                assignedManagerId: req.body.managerId
            }
            console.log(subadminData)
            userModel.findOneAndUpdate({
                '_id': req.body.retailerId,
                userType: "RETAILER"
            }, {
                $set: data
            }, {
                new: true
            }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                } else {
                    userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $set: { retailerStatus: "ACTIVE" } }, { new: true }, (assignError, assignded) => {
                        if (assignError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            commonFunction.sendRejectionMail(result.email, "Retailer Application Approved", `Dear ${result.shopName} your application has been accepted for  lighthouse.Welcome to the lighthouse family.`, (mailError, mailed) => {
                                if (mailError) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.MANAGER_ASSIGN);
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


    changeRetailerStatus: (req, res) => {
        try {
            userModel.findOneAndUpdate({ _id: req.body.retailerId }, { $set: { retailerStatus: req.body.status } }, { new: true }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "retailer status upsated successfully.", result })
                }
            })
        }
        catch (error) {
            response(Res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    addCouponTemplate: (req, res) => {
        console.log(req.body, ">>>>>>>1")
        commonFunction.uploadImage(req.body.couponTemplate, (error, success) => {
            console.log(error)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                var obj = {
                    couponTemplate: success
                }
                var newObj = new couponTemplateModel(obj)
                newObj.save((resultErr, result) => {
                    if (resultErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "Coupon template saved successfully.", result })
                    }
                })
            }
        })
    },
    listCouponTemplate: (req, res) => {
        couponTemplateModel.find((error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Coupon templates found successfully.", result })
            }
        })
    },

    wishList: (req, res) => {
        var query = { status: "ACTIVE" }
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        if (req.body.userId) {
            query.userId = req.body.userId
        }
        if (req.body.type) {
            query.type = req.body.type
        }
        let options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        wishListModel.paginate(query, options, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.docs.length == 0) {
                res.send({ responseCode: 404, responseMessage: "Data not found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Wishlist found successsfully.", result })
            }
        })
    },

    exportToCSV: (req, res) => {
        userModel.find({ userType: req.body.userType, status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                console.log(result.length)
                res.send({ responseCode: 200, responseMessage: "User data found successfully.", result })
            }
        })
    },


    exportTransactionData: (req, res) => {
        transactionModel.find({ retailerId: req.body.retailerId, status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                console.log(result.length)
                res.send({ responseCode: 200, responseMessage: "Transaction data found successfully.", result })
            }
        })
    },

    viewWishList: (req, res) => {
        wishListModel.findOne({ _id: req.params.wishId }, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                res.send({ responseCode: 404, responseMessage: "Data not found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Wishlist found successsfully.", result })
            }
        })
    },

    notificationList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "RETAILER" }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var query = { type: "ADMIN", status: "ACTIVE", notificationType: "RETAILER" }
                    notificationModel.find(query, (notifiError, notification) => {
                        console.log(notification)
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

    getGraphData: (req, res) => {
        const group = {
            $group: {
                _id: { gender: "$gender" },
                count: { $sum: 1 },
            },
        };

        const groups = {
            $group: {
                _id: null,
                maleFemaleCount: { $push: { gender: '$_id.gender', count: '$count' } },
            },
        };

        return previewModel.aggregate([{ $match: { "retailerId": mongoose.Types.ObjectId(req.body.retailerId) } }, group, groups], (error, result) => {
            if (error) {
                res.send({ responseCCode: 500, responseMessage: "Internal server error.", error })
            }
            else {
                res.send({ responseCCode: 200, responseMessage: "User graph data found successfully.", result })
            }
        });
    },

    getByMonth: (req, res) => {
        previewModel.aggregate([

            {
                $group: {
                    '_id': {
                        'day': { '$dayOfMonth': "$createdAt" }
                    }
                }
            }
        ], (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (!result) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Graph data found successfully.", result })
            }
        })

    },


    exportCouponToCSV: (req, res) => {
        retailerCouponModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "coupon  data found successfully.", result })
            }
        })
    },
    exportEmailTemplateTocsv: (req, res) => {
        emailTemplateModel.find((error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "email template  data found successfully.", result })
            }
        })
    },

    exportFaqTocsv: (req, res) => {
        faqModel.find({ status: { $ne: "DELETE" } }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "faq data found successfully.", result })
            }
        })
    },

    exportRoleTocsv: (req, res) => {
        roleModel.find({ status: { $ne: "DELETE" } }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "role  data found successfully.", result })
            }
        })
    },

    exportSubAdminTocsv: (req, res) => {
        userModel.find({ userType: "SUBADMIN", status: { $ne: "DELETE" } }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "role  data found successfully.", result })
            }
        })
    },
    addTemplate: (req, res) => {
        var data1 = {
            template: req.body.template
        }
        var data = new couponTemplate(data1)
        data.save((error, result) => {
            if (error) {
                res.send(error)
            }
            else {
                console.log(res)
                res.send({ responseCode: 200, responseMessage: "SAved successfully." })
            }
        })
    },
    addTemplates: (req, res) => {
        upload(req, res, function (err, result) {

            if (err) {
                console.log("2855=======>", err, result)
            }
            else {
                fs.createReadStream(req.file.path)
                console.log("48======>", req.file)
                new couponTemplate(req.file).save((saveErr, saveResult) => {
                    console.log("50==========>", saveErr, saveResult)
                })
            }
        })
        res.send({ responseCode: 200, responseMessage: "Data saved successfully" })
    },

    listTemplate: (req, res) => {
        couponTemplate.find((error, result) => {
            if (error) {
                res.send(error)
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Data found successfully", result })
            }
        })
    },

    exportCategoryToCSV: (req, res) => {
        categoryModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "category  data found successfully.", result })
            }
        })
    },

    exportSubCategoryToCSV: (req, res) => {
        subCategoryModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (result.length == 0) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Sub category  data found successfully.", result })
            }
        })
    },

    exportMartToCSV: (req, res) => {
        martModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
            }
            else if (!result) {
                res.send({ responseCode: 404, responseMessage: "No data found." })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Category  data found successfully.", result })
            }
        })
    },

    exportRetailerCouponAndEndUserToCSV: (req, res) => {
        if (req.body.userType == "USER") {
            var query = { userType: "USER", status: { $ne: "DELETE" } }
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            userModel.find(query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "RETAILER") {
            var retailer_query = { userType: "RETAILER", status: { $ne: "DELETE" } }
            if (req.body.fromDate && !req.body.toDate) {
                retailer_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                retailer_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                retailer_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                retailer_query.status = req.body.status
            }
            userModel.find(retailer_query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Retailers found successfully.", result })
                }
            })
        }
        else if (req.body.userType == "COUPON") {
            var coupon_query = {}
            if (req.body.fromDate && !req.body.toDate) {
                coupon_query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                coupon_query.createdAt = { $lte: req.body.toDate }
            }
            if (req.body.fromDate && req.body.toDate) {
                coupon_query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
            }
            if (req.body.status) {
                coupon_query.status = req.body.status
            }
            previewModel.find(coupon_query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Previews found successfully.", result })
                }
            })
        }
    }

}

