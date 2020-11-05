const activeInactive = require('../models/activeInactiveModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :activeInactiveManagement
     * Description   : activeInactiveManagement in active/inactive management
     *
     * @return response
    */

    activeInactiveManagement: (req, res) => {
        try {
            activeInactive.find((error, responses) => {
                if (error) {
                    res.send({ responseCode: 500, responseMessage: "Internal server error." })
                }
                else if (responses.length == 0) {
                    var obj = {
                        inactiveUser: req.body.inactiveUser,
                        inactiveRetailer: req.body.inactiveRetailer
                    }
                    var newObj = new activeInactive(obj)
                    newObj.save((errors, saved) => {
                        if (errors) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error." })
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Config recorded successfully." })
                        }
                    })
                }
                else {
                    activeInactive.findOneAndUpdate({ _id: response[0]._id }, req.body, { new: true, upsert: true }, (err, updateResult) => {
                        if (err) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error." })
                        }
                        else {
                            res.send({ responseCode: 500, responseMessage: "Config updated successfully." })
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    getActiveData: (req, res) => {
        try {
            activeInactive.find({ status: "ACTIVE" }, (error, result) => {
                if (error) {
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
    }
}