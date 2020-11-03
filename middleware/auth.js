const user = require('../models/userModel')
var jwt = require("jsonwebtoken");
const globalResponse = require("../helperFunctions/responseHandler");
const globalMessege = require("../helperFunctions/responseMessage");
const globalStatusCode = require("../helperFunctions/statusCodes");

exports.basicAuthUser = function(req, res, next) {
  try {
    if (!req.headers._id || !req.headers.token) {
        globalResponse.commonResponse(
            res,
            globalStatusCode.ErrorCode.PARAMETER_MISSING,
            globalMessege.ErrorMessage.AUTH_FIELD_REQUIRED
          );
    } else {
      jwt.verify(req.headers.token, "SOCIAL", (err, result) => {
        if (err) {
            globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                globalMessege.ErrorMessage.INTERNAL_ERROR
              );
        } else if (!result) {
            globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.TOKEN_EXPIRE,
                globalMessege.ErrorMessage.RESET_PASSWORD_EXPIRED
              );
        } else {
          if (result._id == req.headers._id) {
        
            user.findOne({ _id: result._id }, (error, userDetails) => {
                if (error) {
                  globalResponse.commonResponse(
                    res,
                    globalStatusCode.ErrorCode.INTERNAL_SERVER_ERROR,
                    globalMessege.ErrorMessage.INTERNAL_ERROR
                  );
                } else if (!userDetails){
                    globalResponse.commonResponse(
                        res,
                        globalStatusCode.ErrorCode.NOT_FOUND,
                        globalMessege.ErrorMessage.USER_FOUND
                      );
                } else {
                  if (userDetails.status == "BLOCKED") {
                    globalResponse.commonResponse(
                        res,
                        globalStatusCode.ErrorCode.NOT_FOUND,
                        globalMessege.ErrorMessage.BLOCKED_BY_ADMIN
                      );
                  } else if (userDetails.status == "DELETED") {
                    globalResponse.commonResponse(
                        res,
                        globalStatusCode.ErrorCode.NOT_FOUND,
                        globalMessege.ErrorMessage.DELETED_BY_ADMIN
                      );
                  } else {
                    next();
                  }
                }
              });
          } else {
            globalResponse.commonResponse(
                res,
                globalStatusCode.ErrorCode.NOT_FOUND,
                globalMessege.ErrorMessage.RESET_PASSWORD_EXPIRED
              );
          }
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
};

