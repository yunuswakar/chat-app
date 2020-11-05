const subCategoryModel = require("../models/subCategoryModel");
const categoryModel = require("../models/categoryModel");
const retailerCouponModel = require('../models/retailerCouponModel')
const commonFunction = require("../helper/commonFunction");
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :addSubCategory
     * Description   : addSubCategory in sub-category management
     *
     * @return response
    */

    addSubCategory: (req, res) => {
        try {
            var body = {
                image: req.body.image,
                subCategoryName: req.body.subCategoryName,
                categoryId: req.body.categoryId
            }
            var valid = commonFunction.Validator(body)
            if (valid) { return res.send({ responseCode: 400, responseMessage: valid }) }
            else {
                let query = { _id: req.body.categoryId, status: { $ne: "DELETE" } }
                categoryModel.findOne(query, (err, categoryResult) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!categoryResult) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        subCategoryModel.findOne({ subCategoryName: req.body.subCategoryName, status: "ACTIVE" }, (err, result) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (result) {
                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SUB_CATEGORY_EXIST);
                            }
                            else {
                                commonFunction.uploadImage(req.body.image, (uploadErr, uploadRes) => {
                                    if (uploadErr) {
                                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.image = uploadRes
                                        new subCategoryModel(req.body).save((saveErr, saveRes) => {
                                            if (saveErr) {
                                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                response(res, SuccessCode.SUCCESS, saveRes, SuccessMessage.SUB_CATEGORY_ADD);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewSubCategory
     * Description   : viewSubCategory in sub-category management
     *
     * @return response
    */

    viewSubCategory: (req, res) => {
        try {
            subCategoryModel.findOne({ _id: req.params.subCategoryId, status: { $ne: "DELETE" } }, (err, result) => {
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
     * Function Name :deleteSubCategory
     * Description   : deleteSubCategory in sub-category management
     *
     * @return response
    */

    deleteSubCategory: (req, res) => {
        try {
            subCategoryModel.findOne({ _id: req.params.subCategoryId, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                if (findErr) {
                    console.log(findErr)
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!findRes) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    retailerCouponModel.find({subCategoryId:req.params.subCategoryId},(catError,categoryData)=>{
                        if(catError){
                            console.log(catError)
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if(categoryData.length==0){
                            subCategoryModel.findOneAndUpdate({ _id: findRes._id }, { $set: { status: "DELETE" } }, { new: true }, (deleteErr, deleteRes) => {
                                if (deleteErr) {
                                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, deleteRes, SuccessMessage.DELETE_SUCCESS);
                                }
                            })
                        }
                        else{
                            res.send({responseCode:401,responseMessage:"Sub Category cannot be deleted due to retailer coupon dependencies."})
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
     * Function Name :editSubCategory
     * Description   : editSubCategory in sub-category management
     *
     * @return response
    */

    editSubCategory: async (req, res) => {
        try {
            var obj = {}
            if (req.body.subCategoryName) {
                obj["subCategoryName"] = req.body.subCategoryName
            }
            if (req.body.categoryId) {
                var CatData = await categoryModel.findOne({ _id: req.body.categoryId, status: "ACTIVE" })
                obj["categoryId"] = req.body.categoryId
                obj["categoryName"] = CatData.categoryName

            }
            if (req.body.image) {
                obj["image"] = await uploadImage(req.body.image)
            }

            subCategoryModel.findOneAndUpdate({ _id: req.body.subCategoryId }, { $set: obj }, { new: true }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    res.send({ responseCode: 2010, responseMessage: "Edited successfully", result })
                }
            })

        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :subCategoryList
     * Description   : subCategoryList in sub-category management
     *
     * @return response
    */

    subCategoryList: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.subCategoryName = new RegExp("^" + req.body.search, "i")
            }
            if (req.body.status) {
                query.status = req.body.status
            }

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 },
                populate: { path: "categoryId", select: "categoryName" }
            };
            subCategoryModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == false) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }

            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    updateSubCategoryPriority: (req, res) => {
        try {
            var priorityOrder = req.body.priorityOrder
            priorityOrder.forEach((ele, index, array) => {
                subCategoryModel.update({ _id: ele.subCategoryId }, { $set: { priority: ele.priority } }, { new: true }, (error, update) => {
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
}

function uploadImage(req) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(req, (uploadErr, uploadRes) => {
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