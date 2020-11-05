const helpCenterModel = require('../models/helpCenterModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :helpCenter
     * Description   : helpCenter in website
     *
     * @return response
    */

    helpCenter: (req, res) => {
        try {
            new helpCenterModel(req.body).save((err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_SAVED);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :viewHelpCenter
     * Description   : viewHelpCenter in help center management
     *
     * @return response
    */

    viewHelpCenter: (req, res) => {
        try {
            helpCenterModel.findOne({ _id: req.params._id, status: "ACTIVE" }, (err, result) => {
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
     * Function Name :deleteHelpCenter
     * Description   : deleteHelpCenter in help center management
     *
     * @return response
    */

    deleteHelpCenter: (req, res) => {
        try {
            helpCenterModel.findOneAndUpdate({ _id: req.body.helpId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
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
     * Function Name :helpCenterList
     * Description   : helpCenterList in help center management
     *
     * @return response
    */

    helpCenterList: (req, res) => {
        try {
            var query = { status: "ACTIVE" };
            if (req.body.search) {
                query.name = { $regex: req.body.search, $options: 'i' }
            }
            if (req.body.fromDate && !req.body.toDate) {
                query.createdAt = { $gte: req.body.fromDate };
            }
            if (!req.body.fromDate && req.body.toDate) {
                query.createdAt = { $lte: req.body.toDate };
            }
            if (req.body.fromDate && req.body.toDate) {
                query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }]
            }
            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 }
            };
            helpCenterModel.paginate(query, options, (err, result) => {
                console.log("name",err)
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
    }
}