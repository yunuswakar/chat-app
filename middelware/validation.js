const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/messages')
const { ErrorCode } = require('../helper/statusCodes')

/**
 * signUpValidation validation
 **/
exports.signUpValidation = function (req, res, next) {
    if(!req.body.email || !req.body.userName || !req.body.country || !req.body.mobileNumber || !req.body.firstName){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * socialSignUpValidation validation
 **/
exports.socialSignUpValidation = function (req, res, next) {
    if(!req.body.socialId || !req.body.socialType){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * loginValidation validation
 **/
exports.loginValidation = function (req, res, next) {
    if(!req.body.userName  ||  !req.body.password  ){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * setPinValidation validation
 **/
exports.setPinValidation = function (req, res, next) {
    if(!req.body.userName || !req.body.pin){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}
/**
 * verifyOtpValidation validation
 **/
exports.verifyOtpValidation = function (req, res, next) {
    if(!req.body.userId || !req.body.otp){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * userIdValidation validation
 **/
exports.userIdValidation = function (req, res, next) {
    if(!req.body.userId){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}
/**
 * emailValidation validation 
 **/
exports.emailValidation = function (req, res, next) {
    if(!req.body.email){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}


/**
 * resetPasswordValidation validation  
 **/
exports.resetPasswordValidation = function (req, res, next) {
    if(!req.body.userId  || !req.body.password){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * userNameValidation validation  
 **/
exports.userNameValidation = function (req, res, next) {
    if(!req.body.userName){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}

/**
 * staticContentValidation validation  
 **/
exports.staticContentValidation = function (req, res, next) {
    if(!req.params.contentType){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}


