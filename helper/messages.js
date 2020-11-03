
/** 
 * @description All the Error messages that needed to be sent to Admin or App
 * @type {Object}
*/
module.exports.ErrorMessage = Object.freeze({

    // INVALID_TOKEN: 'Unauthorized User',
    //FORBIDDEN 403, "Invalid token provided."
                  //  UNAUTHORIZED: 401,"User doesn't exist.",
                //   "User blocked by admin."
    UNAUTHORIZED:"User doesn't exist.",
    BLOCK_USER:"User blocked by admin.",
    INVALID_TOKEN: 'Unauthorized User',
    INTERNAL_ERROR : 'Internal server error',
    INVALID_CREDENTIAL:'Invalid credential',
    SOMETHING_WRONG:'Something went wrong!',
    EMAIL_NOT_REGISTERED:'Email not registered',
    RESET_PASSWORD_EXPIRED:'Token has been expire',
    WRONG_PASSWORD:'Please enter valid password',
    EMAIL_EXIST:'Email already exist',
    NOT_FOUND:'Data not found', 
    USER_FOUND:'You are not registered with us. Please signup first',
    MOBILE_EXIST:'Mobile number already exist',
    USERNAME_EXIST:'User name already exist',
    USER_ID:'User Id required',
    BLOCKED_BY_ADMIN:'You are blocked by admin please contact Admin',
    DELETED_BY_ADMIN:'Your account deleted, please contact to Admin',
    FIELD_REQUIRED:'Fields are required',
    OLD_PASSWORD:'Old password does not match',
    INCORRECT_JWT:"Invalid token provided.",
    FORBIDDEN:'Error in sending email',
   MISSING_PARAMETES:"Parameters missing",
   BLOCK_LOGIN:"Failed !!!! Too many attempts .You are blocked for 5 minutes",
   VALID_PIN:"Enter valid pin",
   PARAMETERS_MISSING:"Parameters missing",
   PAYMENT_FAILED:"Process failed , please try again",
   EXISTS:"Already exists"
});

/** 
 * @description All the Success messages that needed to be sent to App or Admin
 * @type {Object}
*/
module.exports.SuccessMessage = Object.freeze({ 
    LOGIN_SUCCESS: 'You have successfully logged in.',
    FORGET_SUCCESS: 'Password link has been sent successfully',
    RESET_SUCCESS:'Password changed successfully',
    PRODUCT_LIST_FETCH:'Product list fetch successfully',
    USER_LIST_FETCH:'User list fetch successfully',
    AUTHORIZATION:'Authorized User',
    ACCOUNT_CREATION: 'Your account has been created successfully',
    OTP_SEND: 'Otp sent to your email address',
    OTP_SEND_MOBILE:'Otp sent to your mobile number.',
    INVALID_OTP: 'Invalid OTP',   
    VERIFY_OTP: 'OTP verified successfully',
    PIN_SET:"Pin set successfully", 
    PASSWORD_UPDATE:"Password updated successfully",
    DETAIL_GET:" User detail found successfully.",
    PROFILE_DETAILS:"Your account details has been updated sucessfully.",
    NO_PIN:"You have not set your pin yet. Please set your pin.",
    MAX_LIMIT:"You have reached max limit of login attempt",
    CARD_FOUND:"Card details found successfully",
    PAYMENT_SUCCESS:"Payment done successfully",
    PIN_EXISTS:"Pin exists",
    PIN_RESET:"Pin set successfully",
    SOCIAL_PRESENT:"SocialId found successfully"
});