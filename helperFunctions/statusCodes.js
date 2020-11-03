/** 
 * @description All the Error messages that needed to be sent to Admin
 * @type {Object}
*/
module.exports.ErrorCode = Object.freeze({
    'PARAMETER_MISSING' : 204,
    'BAD_REQUEST': 400,
    'TOKEN_EXPIRE': 401,
    'INVALID_CREDENTIAL':402,
    'FORBIDDEN':403,
    'NOT_FOUND':404,
    'TOKEN_EXPIRE':405,
    'ALREADY_EXIST':205,
    'VALIDATION_FAILED':422,
    'INTERNAL_SERVER_ERROR': 500,
    'SOMETHING_WRONG': 501,
    'VALIDATION_FAILED':422,
    'BLOCKED_ADMIN':204

});

/** 
 * @description All the Success messages that needed to be sent to Admin
 * @type {Object}
*/
module.exports.SuccessCode = Object.freeze({
    'SUCCESS': 200,
    'OTP_SEND': 201,
    'ALREADY_EXIST' : 205
});