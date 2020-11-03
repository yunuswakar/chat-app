const user = require("../../models/userModel");
const report = require("../../models/reportModel");
const globalResponse = require("../../helperFunctions/responseHandler");
const globalMessege = require("../../helperFunctions/responseMessage");
const globalStatusCode = require("../../helperFunctions/statusCodes");
const productModel=require("../../models/productModel")

module.exports = {
  reportProblem: (req, res) => {
    try {
      if (!req.body.userId || !req.body.problemStatement || !req.body.productId) {
        globalResponse.commonResponse(
          res,
          globalStatusCode.ErrorCode.PARAMETER_MISSING,
          globalMessege.ErrorMessage.FIELD_REQUIRED
        );
      } else {
        user.findOne({ _id: req.body.userId,status:"ACTIVE"}, (err, result) => {
          if (err) {
            globalResponse.commonResponse(
              res,
              globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
              globalMessege.ErrorMessage.INTERNAL_ERROR
            );
          } else if (!result) {
            globalResponse.commonResponse(
              res,
              globalStatusCode.ErrorCode.NOT_FOUND,
              globalMessege.ErrorMessage.USER_FOUND
            );
          } else {
                productModel.findOne({_id:req.body.productId,status:"ACTIVE"},(ProductError,ProductData)=>{
                  if (ProductError) {
                      globalResponse.commonResponse(
                        res,
                        globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                        globalMessege.ErrorMessage.INTERNAL_ERROR
                      );
                  }
                  else if (!ProductData) {
                    globalResponse.commonResponse(
                      res,
                      globalStatusCode.ErrorCode.NOT_FOUND,
                      globalMessege.ErrorMessage.NOT_FOUND
                    );
                  }
                  else{
                    var data = {
                      userId: req.body.userId,
                      problemStatement: req.body.problemStatement,
                      productId:req.body.productId
                    };
                    var obj = new report(data);
                    obj.save((err1, success) => {
                      if (err1) {
                        globalResponse.commonResponse(
                          res,
                          globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                          globalMessege.ErrorMessage.INTERNAL_ERROR
                        );
                      } else {
                        console.log("success in signup", success);
                        var result = { success };
                        globalResponse.sendResponseWithData(
                          res,
                          globalStatusCode.SuccessCode.SUCCESS,
                          globalMessege.SuccessMessage.PROBLEM_REPORTED,
                          result
                        );
                      }
                    });
                  }
                })
            
          }
        });
      }
    } catch (error) {
      globalResponse.commonResponse(
        res,
        globalStatusCode.ErrorCode.BAD_REQUEST,
        globalMessege.ErrorMessage.ERROR_IN_CATCH
      );
    }
  },
};


