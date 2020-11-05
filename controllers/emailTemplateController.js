const emailTemplate = require('../models/emailTemplateModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const userModel = require('../models/userModel')
module.exports = {

    /**
     * Function Name :addEmailTemplate
     * Description   : addEmailTemplate in weekly email template
     *
     * @return response
    */

    addEmailTemplate: (req, res) => {
        try {
            if (req.body.status == "ACTIVE") {
                emailTemplate.findOneAndUpdate({ status: "ACTIVE" }, { $set: { status: "INACTIVE" } }, { new: true }, (updationError, updation) => {
                    if (updationError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        emailTemplate.findOne({ subject: req.body.subject }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUBJECT_EXIST);
                            }
                            else {
                                commonFunction.uploadImage(req.body.image, (imageErr, imageResult) => {
                                    if (imageErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.image = imageResult;
                                        new emailTemplate(req.body).save((saveErr, saveResult) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.EMAIL_TEMPLATE_ADD);
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
                emailTemplate.findOne({ subject: req.body.subject }, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (result) {
                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUBJECT_EXIST);
                    }
                    else {
                        commonFunction.uploadImage(req.body.image, (imageErr, imageResult) => {
                            if (imageErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                req.body.image = imageResult;
                                new emailTemplate(req.body).save((saveErr, saveResult) => {
                                    if (saveErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.EMAIL_TEMPLATE_ADD);
                                    }
                                })
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
     * Function Name :viewEmailTemplate
     * Description   : viewEmailTemplate in weekly email template
     *
     * @return response
    */

    viewEmailTemplate: (req, res) => {
        try {
            emailTemplate.findOne({ _id: req.params.templateId}, (err, result) => {
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

    /**
     * Function Name :editEmailTemplate
     * Description   : editEmailTemplate in weekly email template
     *
     * @return response
    */

    editEmailTemplate: (req, res) => {
        try {
            if (req.body.status == "ACTIVE") {
                emailTemplate.findOneAndUpdate({ status: "ACTIVE" }, { $set: { status: "INACTIVE" } }, { new: true }, (updationError, updated) => {
                    if (updationError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        emailTemplate.findOne({ _id: req.body.templateId }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!result) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                if (req.body.image) {
                                    commonFunction.uploadImage(req.body.image, (err, imageResult) => {
                                        if (err) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            req.body.image = imageResult;
                                            emailTemplate.findOneAndUpdate({ _id: req.body.templateI}, { $set: req.body }, { new: true }, (err, updateResult) => {
                                                if (err) {
                                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    emailTemplate.findOneAndUpdate({ _id: req.body.templateId }, { $set: req.body }, { new: true }, (err, updateResult) => {
                                        if (err) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
            else {
                emailTemplate.findOne({ _id: req.body.templateId }, (err, result) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!result) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        if (req.body.image) {
                            commonFunction.uploadImage(req.body.image, (err, imageResult) => {
                                if (err) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    req.body.image = imageResult;
                                    emailTemplate.findOneAndUpdate({ _id: req.body.templateId }, { $set: req.body }, { new: true }, (err, updateResult) => {
                                        if (err) {
                                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                        }
                                    })
                                }
                            })
                        }
                        else {
                            emailTemplate.findOneAndUpdate({ _id: req.body.templateId}, { $set: req.body }, { new: true }, (err, updateResult) => {
                                if (err) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                }
                            })
                        }
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :deleteEmailTemplate
     * Description   : deleteEmailTemplate in weekly email template
     *
     * @return response
    */

    deleteEmailTemplate: (req, res) => {
        try {
            emailTemplate.findOne({ _id: req.body.templateId,status:{$ne:"DELETE"}}, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    emailTemplate.findOneAndUpdate({ _id:result._id }, { $set: { status: "DELETE" } }, { new: true }, (err, updateResult) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
     * Function Name :emailTemplateList
     * Description   : emailTemplateList in weekly email template
     *
     * @return response
    */

    emailTemplateList: (req, res) => {
        try {
            let query = { "status":{$in:["ACTIVE","INACTIVE"]} };
            if (req.body.search) {
                query = {subject: { $regex: req.body.search, $options: 'i' }}
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            emailTemplate.paginate(query, options, (err, userData) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (userData.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, userData, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }



        // try {
        //     var query = { status: "ACTIVE" };
        //     if (req.body.search) {
        //         query.subject = new RegExp('^' + req.body.search, "i");
        //     }

        //     var options = {
        //         page: req.body.page || 1,
        //         limit: req.body.limit || 10,
        //         sort: { createdAt: -1 }
        //     };

        //     emailTemplate.paginate(query, options, (err, result) => {
        //         if (err) {
        //             response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        //         }
        //         else if (result.docs.length == 0) {
        //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
        //         }
        //         else {
        //             response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
        //         }
        //     })

        // }
        // catch (error) {
        //     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        // }
    },
    weeklyEmailTemplate: async (req, res) => {
        var configData = await configurationModel.findOne({ configType: "End User", status: "ACTIVE" })
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

        ])

        var options = {
            page: 1,
            limit: 5
        }
        // console.log("AGGREGATE>>", aggregate)
        retailerCouponModel.aggregatePaginate(aggregate, options, (err, result, pageCount, count) => {
            // console.log("I AM HERE #@!$%%>>>", err, result)
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

    selectEmailTemplate: (req, res) => {
        try {
            emailTemplate.findOneAndUpdate({ _id: req.body.templateId, status: "ACTIVE" }, { status: "SELECTED" }, { new: true }, (error, result) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" });
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Email template activated successfully." })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    unsubscribe: (req, res) => {
        try {
            userModel.findOneAndUpdate({ _id: req.params.userId }, { $set: { weeklyEmail:false ,emailOtpVerify:false } }, { new: true }, (error, result) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error" });
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Unsubscribed from email templates.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    }
}