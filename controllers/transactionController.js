const transactionModel = require('../models/transactionModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :viewTransaction
     * Description   : viewTransaction in transaction management
     *
     * @return response
    */

    viewTransaction: (req, res) => {
        try {
            transactionModel.findById({ _id: req.params._id, status: "ACTIVE" }, (err, result) => {
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
     * Function Name :deleteTransaction
     * Description   : deleteTransaction in transaction management
     *
     * @return response
    */

    deleteTransaction: (req, res) => {
        try {
            transactionModel.findOneAndUpdate({ _id: req.body._id, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
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
     * Function Name :transactionList
     * Description   : transactionList in transaction management
     *
     * @return response
    */

    transactionList: (req, res) => {
        try {
            var query = { status: "ACTIVE" };
            if (req.body.search) {
                query.transactionId = new RegExp('^' + req.body.search, "i");
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
                limit: req.body.limit || 10,
                sort: { createdAt: -1 }
            };

            transactionModel.paginate(query, options, (err, result) => {
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