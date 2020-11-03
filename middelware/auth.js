const auth = require('basic-auth');
const { config } = require('../config/config')
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/messages')
const { ErrorCode } = require('../helper/statusCodes')
const userModel = require('../model/userModel');
var jwt = require('jsonwebtoken');
/**
    * Function Name : basicAuthUser
    * Description   : Check the base authentication
    *
    * @param  name         name
    * @param  password    email
    *
    * @return response
    */
exports.basicAuthUser = function (req, res, next) {
    try {
        var credentials = auth(req);
        if (!credentials || credentials.name !== global.gConfig.basicAuthUser || credentials.pass !== global.gConfig.basicAuthKey) {
            res.statusCode = ErrorCode['UNAUTHORIZED']
            res.setHeader('WWW-Authenticate', 'Basic realm="example"')
            response(res, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
        } else {
            next();
        }

    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}

/**
    * Function Name : blockUnblock
    * Description   :Check user blocked or not 
    *
    * @param  userId     userId is required
    *
    * @return response
    */
exports.blockUnblock = function (req, res, next) {
    try {
        if (!req.headers[userId]) {
            response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_ID);
        } else {
            userModel.findOne({ _id: req.headers[userId] }, (error, userDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else {
                    if (userDetails.status == 'BLOCKED') {
                        response(res, ErrorCode.UNAUTHORIZED, [], ErrorMessage.BLOCKED_BY_ADMIN);
                    } else if (userDetails.status == 'DELETED') {
                        response(res, ErrorCode.UNAUTHORIZED, [], ErrorMessage.DELETED_BY_ADMIN);
                    } else {
                        next();
                    }
                }
            })
        }

    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}
// Function Name : verify token 
// Description - verify  whether token and userid is passed in the header or not 
// token is required and userid is required 
//pramod

exports.verifyToken = (req, res, next) => {
    console.log("header>>>>>>>" + req.body + "  token is >>>>>>" + req.headers.token)
    if (req.headers.token) {
        jwt.verify(req.headers.token, 'walletApp', (err, result) => {
            if (err )
            {
                res.send({response_code:500,response_message:"Internal server error"})
            }
        else if( !result) {
                response(res, ErrorCode.INVALID_TOKEN, [], ErrorMessage.INCORRECT_JWT)
            }
            else {
                console.log("token verified")
                if (req.headers.userid) {
                    userModel.findById(req.headers.userid, (error, result) => {
                        if (error)
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR)
                        else if (!result) {
                            response(res, ErrorCode.UNAUTHORIZED, [], ErrorMessage.USER_FOUND)
                        }
                        else {
                            if (result.status == 'BLOCKED') {
                                response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.BLOCKED_BY_ADMIN);
                            } else if (result.status == 'DELETED') {
                                response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.DELETED_BY_ADMIN);
                            } else {
                                next();
                            }
                        }
                    })
                }
                else
                    response(res, ErrorCode.USER_ID, [], ErrorMessage.USER_ID)
            }
        })
    } else {
        response(res, ErrorCode.FORBIDDEN, [], ErrorMessage.INTERNAL_ERROR)
    }

}


// 409,403


