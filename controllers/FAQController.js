const FAQModel = require("../models/FAQModel");
const commonFunc = require("../helper/commonFunction")
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');

module.exports = {

    /**
     * Function Name : addFaq
     * Description   : addFaq in faq management
     *
     * @return response
    */

    addFaq: (req, res) => {
        try {
            let body = {
                topic: req.body.topic,
                question: req.body.question,
                answer: req.body.answer
            }
            let valid = commonFunc.Validator(body);
            if (valid) {
                return response(res, ErrorCode.BAD_REQUEST, valid)
            }
            else {
                FAQModel.findOne({ question: req.body.question, status: { $ne: "DELETE" } }, (findErr, findRes) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (findRes) {
                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.QUESTION_EXIST);
                    }
                    else {
                        new FAQModel(req.body).save((err, saveResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.FAQ_ADDED);
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
     * Function Name : viewFaq
     * Description   : viewFaq in faq management
     *
     * @return response
    */

    viewFaq: (req, res) => {
        try {
            FAQModel.findOne({ _id: req.params.id, status: { $ne: "DELETE" } }, (findErr, findResult) => {
                if (findErr) {
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
     * Function Name :deleteFaq
     * Description   : deleteFaq in faq management
     *
     * @return response
    */

    deleteFaq: (req, res) => {
        try {
            if (!req.body.faqId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                FAQModel.findOne({ _id: req.body.faqId, status: { $ne: "DELETE" } }, (findErr, findResult) => {
                    if (findErr) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!findResult) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        let query = { _id: findResult._id }
                        FAQModel.findByIdAndUpdate(query, { $set: { status: "DELETE" } }, { new: true }, (err, findResult) => {
                            if (err) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, findResult, SuccessMessage.DELETE_SUCCESS);
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
    * Function Name : editFaq
    * Description   : editFaq in faq management
    *
    * @return response
   */

    editFaq: (req, res) => {
        try {
            if (!req.body.faqId) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            }
            else {
                FAQModel.findOne({ _id: req.body.faqId, status: { $ne: "DELETE" } }, (err, findRes) => {
                    if (err) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!findRes) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        let obj = {}
                        if (req.body.topic) {
                            obj.topic = req.body.topic
                        }
                        if (req.body.question) {
                            obj.question = req.body.question
                        }
                        if (req.body.answer) {
                            obj.answer = req.body.answer
                        }
                        let query = { _id: findRes.id, status: { $ne: "DELETE" } }
                        console.log("I am here")
                        FAQModel.findByIdAndUpdate(query, { $set: obj }, { new: true }, (updateErr, updateRes) => {
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
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },


    /**
    * Function Name : faqList
    * Description   : faqList in faq management
    *
    * @return response
   */

    faqList: (req, res) => {
        try {
            let query = { status: { $ne: "DELETE" } };
            if (req.body.topic) {
                query.topic= { $regex: req.body.topic, $options: 'i' }
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            FAQModel.paginate(query, options, (err, result) => {
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