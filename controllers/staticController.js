const staticModel = require('../models/staticModel')
const supportModel = require('../models/supportModel')
const faqModel=require('../models/faqmodel')
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');


module.exports = {
    /**
    * Function Name :viewStaticContent
    * Description   : viewStaticContent in content management
    *
    * @return response
  */

    viewStaticContent: (req, res) => {
        try {
            staticModel.findOne({ _id: req.body.staticId, status: "ACTIVE" }, (error, pageData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!pageData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, pageData, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    /**
    * Function Name :editStaticContent
    * Description   : editStaticContent in content management
    *
    * @return response
  */

    editStaticContent: (req, res) => {
        let set = {}
        if (req.body.title) {
            set["title"] = req.body.title
        }
        if (req.body.description) {
            set["description"] = req.body.description
        }

        staticModel.findOneAndUpdate({ _id: req.body.staticId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, (error, pageData) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!pageData) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                response(res, SuccessCode.SUCCESS, pageData, SuccessMessage.UPDATE_SUCCESS);
            }
        })
    },
    editSupport: (req, res) => {
        let set = {}
        if (req.body.phone) {
            set['Assistance.$.Phone'] = req.body.phone
        }
        if (req.body.phoneStatus) {
            set['Assistance.$.phoneStatus'] = req.body.phoneStatus
        }
        if (req.body.emailStatus) {
            set['Assistance.$.EmailStatus'] = req.body.emailStatus
        }
        if (req.body.email) {
            set['Assistance.$.email'] = req.body.email
        }
        if (req.body.liveChat) {
            set['Assistance.$.livechat'] = req.body.liveChat
        }
        supportModel.findOneAndUpdate({'Assistance._id':req.body.supportId},{$set:set},{new:true},(error,result)=>{
            if(error){
                res.send({responseCode:500,responseMessage:"Internal server error"})
            }
            else{
                res.send({responseCode:200,responseMessage:"Updated successfully",result})
            }
        })
    },

    /**
   * Function Name :staticContentList
   * Description   : staticContentList in content management
   *
   * @return response
 */

    staticContentList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.title = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }
            staticModel.find(query, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
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
    faqList:(req,res)=>{
        try{
            var query = { status: { $ne: "DELETE" } };
            faqModel.find(query,(err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })

        }
        catch (error) {
            console.log("i am in catch",error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    
    }

}
