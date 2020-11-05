const configModel = require('../models/configurationModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :addConfiguration
     * Description   : addConfiguration in configuration management
     *
     * @return response
    */

    // addConfiguration: (req, res) => {
    //     try {
    //         configModel.findOneAndUpdate({ configType: req.body.configType, status: "ACTIVE" }, req.body, { new: true, upsert: true }, (err, updateResult) => {
    //             if (err) {
    //                 response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else {
    //                 response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },


    addConfiguration: (req, res) => {
        try {
            if (req.body.configType == "USER") {
                configModel.findOne({ configType: req.body.configType }, (error, result) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (result) {
                        configModel.findOneAndUpdate({ configType: req.body.configType, status: "ACTIVE" }, req.body, { new: true, upsert: true }, (err, updateResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                    else {
                        var data = {
                            radiusEndUser: req.body.radiusEndUser,
                            isNotification: req.body.isNotification,
                            configType: req.body.configType
                        }
                        var configData = new configModel(data)
                        configData.save((saveError, savedData) => {
                            if (saveError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                })
            }
            else if (req.body.configType == "RETAILER") {
                configModel.findOne({ configType: req.body.configType }, (error, result) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (result) {
                        configModel.findOneAndUpdate({ configType: req.body.configType, status: "ACTIVE" }, req.body, { new: true, upsert: true }, (err, updateResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                    else {
                        var data = {
                            retailerSignupAmount: req.body.retailerSignupAmount,
                            gstOnSignup: req.body.gstOnSignup,
                            signupCredits: req.body.signupCredits,
                            radiusRetailer: req.body.radiusRetailer,
                            earnedCredits: req.body.earnedCredits,
                            unitCreditCost: req.body.unitCreditCost,
                            minRechargeAmount: req.body.minRechargeAmount,
                            gstOnRecharge: req.body.gstOnRecharge,
                            lowCreditAlert: req.body.lowCreditAlert,
                            configType: req.body.configType
                        }
                        var configData = new configModel(data)
                        configData.save((saveError, savedData) => {
                            console.log("I am here", savedData, saveError)
                            if (saveError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                })
            }
            else if (req.body.configType == "GENERAL") {
                configModel.findOne({ configType: req.body.configType }, (error, result) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (result) {
                        configModel.findOneAndUpdate({ configType: req.body.configType, status: "ACTIVE" }, req.body, { new: true, upsert: true }, (err, updateResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                    else {
                        var data = {
                            email: req.body.email,
                            brandName: req.body.brandName,
                            configType: req.body.configType
                        }
                        var configData = new configModel(data)
                        configData.save((saveError, savedData) => {
                            if (saveError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, savedData, SuccessMessage.DATA_SAVED);
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
     * Function Name :viewConfiguration
     * Description   : viewConfiguration in configuration management
     *
     * @return response
    */

    viewConfiguration: (req, res) => {
        try {
            configModel.findOne({ configType: req.params.configType}, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
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


    viewConfigurations: (req, res) => {
        try {
            configModel.findOne({ configType: req.params.configType, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
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










}