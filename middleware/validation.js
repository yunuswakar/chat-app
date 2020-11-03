const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');


/**
 * loginValidation validation
 **/
exports.loginValidation = function (req, res, next) {
    if(!req.body.email  ||  !req.body.password){
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }else{
        next()
    }
 
}
exports.customerValidation=function(req,res,next){
    if(!req.body.name ||!req.body.email ||!req.body.mobileNumber ||!req.body.password ||!req.body.confirmPassword ||!req.body.address){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}
exports.customerViewValidation=function(req,res,next){
    if(!req.body.customerId){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}
exports.countryValidation=function(req,res,next){
    if(!req.body.country){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}

exports.editCountryValidation=function(req,res,next){
    if(!req.body.countryId){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}

exports.addBannerValidations=function(req,res,next){
    if(!req.body.bannerPic){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}

exports.editBannerValidation=(req,res,next)=>{
    if(!req.body.bannerId){
        response(res,ErrorCode.BAD_REQUEST,[],ErrorMessage.FIELD_REQUIRED)
    }
    else{
        next()
    }
}