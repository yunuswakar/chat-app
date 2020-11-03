
/** 
 * @description All the Error messages that needed to be sent to Admin or App
 * @type {Object}
*/
module.exports.ErrorMessage = Object.freeze({
    INVALID_TOKEN: 'Unauthorized User',
    INTERNAL_ERROR : 'Internal Server Error',
    INVALID_CREDENTIAL:'Invalid credential',
    SOMETHING_WRONG:'Something went wrong!',
    EMAIL_NOT_REGISTERED:'Email not registered',
    RESET_PASSWORD_EXPIRED:'Token has been expire',
    WRONG_PASSWORD:'Please enter valid password',
    EMAIL_EXIST:'Email already exist',
    PHONE_EXIST:'Phone number already exist',
    NOT_FOUND:'Data not found',
    USER_FOUND:'User not found',
    MOBILE_EXIST:'Phone number already exist',
    USERNAME_EXIST:'User name already exist',
    USER_ID:'User Id required',
    BLOCKED_BY_ADMIN:'You are blocked by admin please contact to Admin',
    DELETED_BY_ADMIN:'Your account deleted, please contact to Admin',
    FIELD_REQUIRED:'Fields are required',
    AUTH_FIELD_REQUIRED:'Authentication required field missing',
    OLD_PASSWORD:'Old password didnot macth',
    INCORRECT_JWT:'Invalid JWT token.',
    FORBIDDEN:'Error in sending email',
    ALREADY_VERIFIED  :'Account already verified',
    OTP_NOT_MATCH : "Otp not matched",
    OTP_EXPIRE : 'Otp expired',
    VERIFY_ACCOUNT : 'Verify your account first',
    PASSWORD_NOT_MATCH : 'New and Confirm password not match',
    ERROR_IN_CATCH : 'Error found in catch',
    ALREADY_FRIEND : 'Both of you are already friend',
    REQUEST_ALREADY_SENT : 'Friend request already sent',
    NO_FIRIENDS : 'Have no friends',
    PARAMETER_MISSING:"Parameter missing",
    JOB_EXPIRED: 'Job has been expired',

});

/** 
 * @description All the Success messages that needed to be sent to App or Admin
 * @type {Object}
*/
module.exports.SuccessMessage = Object.freeze({
    IMAGE_URL : 'Image url generated',
    LOGIN_SUCCESS: 'You have successfully login.',
    FORGET_SUCCESS: 'Password link has been send successfully',
    RESET_SUCCESS:'Password changed successfully',
    PRODUCT_LIST_FETCH:'Product list fetch successfully',
    USER_LIST_FETCH:'User list fetch successfully',
    AUTHORIZATION:'Authorized User',
    ACCOUNT_CREATION: 'Your account has been created successfully',
    OTP_SEND_EMAIL: 'Otp send to your registered email number',
    OTP_SEND_PHONE: 'Otp send to your registered phone number',
    INVALID_OTP: 'Invalid OTP',
    VERIFY_OTP: 'OTP verified successfully',
    PIN_SET:"Pin set successfully",
    PASSWORD_UPDATE:"Password updated successfully",
    DETAIL_GET:"Detail get successfully",
    PROFILE_DETAILS:"Your profile detail updated sucessfully",
    GET_EMAIL : "Email get successfully",
    ADD_FRIEND : "Friend request sent",
    PROBLEM_REPORTED : "Problem reported successfully",
    FRIEND_DETAIL :'Friends list detail',
    FRIEND_REQUEST_DETAIL :'Friends request list detail',
    LANGUAGE_SELECTED : 'Language selected',
    SELECTED_LANGUAGE : 'Selected language',
    GROUP_CREATED : 'Group created',
    REQUEST_ACCEPT : 'Friend request accepted',
    REQUEST_BLOCK : 'Friend request blocked',
    REQUEST_DELETE : 'Friend request deleted',
    REMOVE_FRIEND : 'Reomved successfully',
    FRIEND_ADDED : 'Friend added in group',
    FRIEND_ADDED_CLASS : 'Friend added in class'
    
});