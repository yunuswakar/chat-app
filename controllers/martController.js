const martModel = require('../models/martModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :addMart
     * Description   : addMart in mart management
     *
     * @return response
     */

    addMart: (req, res) => {
        try {
            martModel.findOne({ martName: req.body.martName, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    console.log(err)
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MART_EXIST);
                }
                else {
                    commonFunction.uploadMultipleImage(req.body.images, (error, imageResult) => {
                        console.log(imageResult)
                        if (error) {
                            console.log(error)
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            var imageArray = [];
                            imageResult.forEach(a => imageArray.push(a));
                            req.body.location = {
                                type: "Point",
                                coordinates: [req.body.lat, req.body.long]
                            }
                            req.body.images = imageArray;
                            new martModel(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    console.log(saveErr)
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                } else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.MART_ADDED);
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
     * Function Name :editMart
     * Description   : editMart in mart management
     *
     * @return response
     */

    editMart: (req, res) => {
        try {
            martModel.findOne({ _id: req.body.martId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.images) {
                        commonFunction.uploadMultipleImage(req.body.images, (err, imageResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                var imageArray = [];
                                imageResult.forEach(a => imageArray.push(a));
                                req.body.images = imageArray;
                                req.body.location = {
                                    type: "Point",
                                    coordinates: [req.body.lat, req.body.long]
                                }
                                martModel.findOneAndUpdate({ _id: req.body.martId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (err, updateResult) => {
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
                        req.body.location = {
                            type: "Point",
                            coordinates: [req.body.lat, req.body.long]
                        }
                        martModel.findOneAndUpdate({ _id: req.body.martId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (err, updateResult) => {
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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewMart
     * Description   : viewMart in mart management
     *
     * @return response
     */

    viewMart: (req, res) => {
        try {
            martModel.findOne({ _id: req.params.martId, status: { $ne: "DELETE" } }, (err, result) => {
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
     * Function Name :activeInactiveMart
     * Description   : activeInactiveMart in mart management
     *
     * @return response
     */

    activeInactiveMart: (req, res) => {
        try {
            martModel.findOne({ _id: req.body.martId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    req.body.status = (result.status == "ACTIVE") ? "BLOCK" : "ACTIVE"
                    martModel.findOneAndUpdate({ _id: req.body.martId }, req.body, { new: true }, (err, updateResult) => {
                        if (err) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.STATUS_UPDATED);
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
     * Function Name :martList
     * Description   : martList in mart management
     *
     * @return response
     */

    martList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            if (req.body.search) {
                query.martName = new RegExp('^' + req.body.search, "i");
            }

            req.body.limit= parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 }
            };

            martModel.paginate(query, options, (err, result) => {
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
}