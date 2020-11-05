const staticModel = require('../models/staticModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name :editStaticPage
     * Description   : editStaticPage in static page management
     *
     * @return response
    */

    editStaticPage: (req, res) => {
        try {
            if (!req.body.staticId || !req.body.title || !req.body.description) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                staticModel.findOne({ _id: req.body.staticId, status: "ACTIVE" }, (findErr, findResult) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!findResult) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        staticModel.findByIdAndUpdate({ _id: findResult._id }, { title: req.body.title, description: req.body.description }, { new: true }, (err, success) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, success, SuccessMessage.UPDATE_SUCCESS);
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
     * Function Name :viewStaticPage
     * Description   : viewStaticPage in static page management
     *
     * @return response
    */

    viewStaticPage: (req, res) => {
        try {
            staticModel.findOne({ _id: req.body.staticId, status: "ACTIVE" }, (err, static) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!static) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, static, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
     * Function Name :staticPageList
     * Description   : staticPageList in static page management
     *
     * @return response
    */
    staticPageList: (req, res) => {
        try {
            staticModel.find({ status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.length == 0) {
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
