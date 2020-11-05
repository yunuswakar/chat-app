const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');


module.exports = {

    /**
     * Function Name :addRole
     * Description   : addRole in role management
     *
     * @return response
    */

    addRole: (req, res) => {
        try {
            if (!req.body.roleName) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                roleModel.findOne({ roleName: req.body.roleName, status: { $in: ["ACTIVE", "BLOCK"] } }, (findErr, findRes) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (findRes) {
                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.ROLE_EXIST);
                    }
                    else {
                        req.body.permissions = [{
                            dashboard: req.body.dashboard,
                            retailerManagement: req.body.retailerManagement,
                            staticContentManagement: req.body.staticContentManagement,
                            faqManagement: req.body.faqManagement,
                            transactionManagement: req.body.transactionManagement,
                            contactUsManagement: req.body.contactUsManagement,
                            userManagement: req.body.userManagement,
                            categoryManagement: req.body.categoryManagement,
                            couponManagement: req.body.couponManagement,
                            subCategoryManagement: req.body.subCategoryManagement,
                            martManagement: req.body.martManagement
                        }]
                        new roleModel(req.body).save((err, saveResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.ROLE_ADDED);
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
     * Function Name :viewRole
     * Description   : viewRole in role management
     *
     * @return response
    */

    viewRole: (req, res) => {
        try {
            roleModel.findOne({ _id: req.params.id, status: { $ne: "DELETE" } }, (err, findResult) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!findResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, findResult, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :editRole
     * Description   : editRole in role management
     *
     * @return response
    */

    editRole: (req, res) => {
        if (!req.body.roleId) {
            response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
        }
        else {
            roleModel.findOne({ _id: req.body.roleId, status: { $ne: "DELETE" } }, (err, findRes) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!findRes) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    let set = {}
                    if (req.body.dashboard) {
                        set["permissions.$.dashboard"] = req.body.dashboard
                    }
                    if(req.body.roleName){
                        set["roleName"]=req.body.roleName
                    }
                    if (req.body.retailerManagement) {
                        set["permissions.$.retailerManagement"] = req.body.retailerManagement
                    }
                    if (req.body.staticContentManagement) {
                        set["permissions.$.staticContentManagement"] = req.body.staticContentManagement
                    }
                    if (req.body.faqManagement) {
                        set["permissions.$.faqManagement"] = req.body.faqManagement
                    }
                    if (req.body.transactionManagement) {
                        set["permissions.$.transactionManagement"] = req.body.transactionManagement
                    }
                    if (req.body.contactUsManagement) {
                        set["permissions.$.contactUsManagement"] = req.body.contactUsManagement
                    }
                    if (req.body.userManagement) {
                        set["permissions.$.userManagement"] = req.body.userManagement
                    }
                    if (req.body.categoryManagement) {
                        set["permissions.$.categoryManagement"] = req.body.categoryManagement
                    }
                    if (req.body.couponManagement) {
                        set["permissions.$.couponManagement"] = req.body.couponManagement
                    }
                    if (req.body.subCategoryManagement) {
                        set["permissions.$.subCategoryManagement"] = req.body.subCategoryManagement
                    }
                    if (req.body.martManagement) {
                        set["permissions.$.martManagement"] = req.body.martManagement
                    }
                    console.log(set)
                    roleModel.findOneAndUpdate({ "permissions._id": req.body.permissionId}, { $set: set }, { new: true, multi: true }, (updateErr, updateRes) => {
                        if (updateErr) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateRes, SuccessMessage.UPDATE_SUCCESS);
                        }
                    })
                }
            })
        }
    },

    /**
     * Function Name :deleteRole
     * Description   : deleteRole in role management
     *
     * @return response
    */

    deleteRole: (req, res) => {
        try {
            roleModel.findOneAndUpdate({ _id: req.body.roleId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },




    /**
     * Function Name :roleList
     * Description   : roleList in role management
     *
     * @return response
    */

    roleList: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };
            if (req.body.roleName) {
                query.roleName = { $regex: req.body.roleName, $options: 'i' }
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            roleModel.paginate(query, options, (err, result) => {
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





}