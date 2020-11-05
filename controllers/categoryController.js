const categoryModel = require("../models/categoryModel");
const commonFunction = require("../helper/commonFunction");
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const retailerCouponModel = require('../models/retailerCouponModel')
module.exports = {

    /**
     * Function Name :addCategory
     * Description   : addCategory in category management
     *
     * @return response
    */

    addCategory: (req, res) => {
        try {
            // var body = {
            //     image: req.body.image,
            //     productServiceType: req.body.productServiceType,
            //     categoryName: req.body.categoryName,
            // }
            // var valid = commonFunction.Validator(body)
            // if (valid) { 
            //     return res.send({ responseCode: 400, responseMessage: valid }) 
            // }
            // else {
            categoryModel.findOne({ categoryName: req.body.categoryName, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                if (findErr) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (findRes) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.CATEGORY_EXIST);
                }
                else {
                    commonFunction.uploadImage(req.body.image, (uploadErr, uploadRes) => {
                        console.log("I am here ", uploadErr)
                        if (uploadErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            req.body.image = uploadRes
                            new categoryModel(req.body).save((saveErr, saveResult) => {
                                console.log("hjghjg", saveErr)
                                if (saveErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CATEGORY_ADD);
                                }
                            })
                        }
                    })
                }
            })
            // }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewCategory
     * Description   : viewCategory in category management
     *
     * @return response
    */

    viewCategory: (req, res) => {
        try {
            categoryModel.findOne({ _id: req.params._id, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                if (findErr) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!findRes) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, findRes, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :categoryList
     * Description   : categoryList in category management
     *
     * @return response
    */

    categoryList: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };
            if (req.body.categoryName) {
                query.categoryName = new RegExp('^' + req.body.categoryName, 'i');
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            categoryModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == false) {
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

    /**
     * Function Name :deleteCategory
     * Description   : deleteCategory in category management
     *
     * @return response
    */

    deleteCategory: (req, res) => {
        try {
            if (!req.body.categoryId) {
                return res.send({ responseCode: 404, responseMessage: "Category id required." })
            }
            else {
                categoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!findRes) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        retailerCouponModel.find({ categoryId: req.body.categoryId }, (catError, categoryData) => {
                            if (catError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (categoryData.length == 0) {
                                categoryModel.findOneAndUpdate({ _id: findRes._id }, { $set: { status: "DELETE" } }, { new: true }, (deleteErr, deleteRes) => {
                                    if (deleteErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, deleteRes, SuccessMessage.DELETE_SUCCESS);
                                    }
                                })
                            }
                            else {
                                res.send({ responseCode: 401, responseMessage: "Category cannot be deleted due to retailer coupon dependencies." })
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
     * Function Name :editCategory
     * Description   : editCategory in category management
     *
     * @return response
    */

    editCategory: (req, res) => {
        try {
            if (!req.body.categoryId) {
                return res.send({ responseCode: 404, responseMessage: "Category id required." })
            }
            else {
                categoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, async (findErr, findRes) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!findRes) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        function uploadImage() {
                            return new Promise((resolve, reject) => {
                                commonFunction.uploadImage(req.body.image, (uploadErr, uploadRes) => {
                                    if (uploadErr) {
                                        console.log(uploadErr)
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        resolve(uploadRes)
                                    }
                                })
                            })
                        }
                        let obj = {}
                        if (req.body.image) {
                            obj.image = await uploadImage()
                        }
                        if (req.body.productServiceType) {
                            obj.productServiceType = req.body.productServiceType
                        }
                        if (req.body.categoryName) {
                            obj.categoryName = req.body.categoryName
                        }
                        let query = { _id: findRes._id, status: { $ne: "DELETE" } }
                        categoryModel.findByIdAndUpdate(query, { $set: obj }, { new: true }, (updateErr, updateRes) => {
                            if (updateErr) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateRes, SuccessMessage.UPDATE_SUCCESS);
                            }
                        })
                        // })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    updatePriority: (req, res) => {
        try {
            var priorityOrder = req.body.priorityOrder
            priorityOrder.forEach((ele, index, array) => {
                categoryModel.update({ _id: ele.categoryId }, { $set: { priority: ele.priority } }, { new: true }, (error, update) => {
                    if (error) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        console.log("Updated successfully.")
                    }
                })
            })
            res.send({ responseCode: 200, responseMessage: "Priority updated successfully." })
        }
        catch (error) {
            res.send({ responseCode: 500, responseMessege: "Something went wrong" })
        }
    }


    //**********************end of exports*****************************//
}