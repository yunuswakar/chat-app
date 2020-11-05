/** 
 * @description All the Error messages that needed to be sent to Admin or App
 * @type {Object}
*/
module.exports.ErrorMessage = Object.freeze({
    INVALID_TOKEN: 'Unauthorized user.',
    COUNTRY_EXIST:'Country name already exist',
    INTERNAL_ERROR : 'Internal Server Error.',
    INVALID_CREDENTIAL:'Invalid credentials.',
    SOMETHING_WRONG:'Unexpected error!',
    ALREADY_EXITS:'Already exits',
    NO_TOKEN:'Please provide token.',
    EMAIL_NOT_REGISTERED:'Provided email is not registered.',
    NOT_REGISTERED:"Provided email/mobile number is not registered.",
    RESET_PASSWORD_EXPIRED:'Your Token has expired.',
    WRONG_PASSWORD:'Please enter valid password.',
    INVALID_MOBILE:'This mobile number is not valid.',
    EMAIL_EXIST:'This email already exists.',
    NOT_FOUND:'Requested data not found.',
    USER_NOT_FOUND:'This user does not exist.',
    UPDATE_NOT:"Unexpected error during update, please try again.",
    MOBILE_EXIST:'This mobile number already exists.',
    USERNAME_EXIST:'This user name already exists.',
    USER_ID:'A valid User Id is required.',
    BLOCKED_BY_ADMIN:'You are not authorized, please contact Admin.',
    DELETED_BY_ADMIN:'Your account is deleted, please contact Admin.',
    FIELD_REQUIRED:'Fields are required.',
    OLD_PASSWORD:'You have provided an incorrect old password.',
    INCORRECT_JWT:'Invalid JWT token.',
    FORBIDDEN:'There was an error in sending email.',
    INVALID_OTP: 'Invalid OTP',
    OTP_EXPIRED: "OTP has expired, please try resend OTP.",
    PASSMATCH: "Password do not match.",
    EVENT_EXISTS: "Event already added",
    POST_NOT_FOUND:"This post is not found",
    CONTACT_NOT_FOUND:"None of your contacts using Jigrr",
    FRIEND_NOT_FOUND:"None of your facebook friend using Jigrr",
    EVENT_LIMIT:"Maximum limit",
    QUESTION_EXIST:"Question already exist",
    VIDEO_CALL:"VIdeo call start."
    


   

});

/** 
 * @description All the Success messages that needed to be sent to App or Admin
 * @type {Object}
*/
module.exports.SuccessMessage = Object.freeze({
    SIGNUP_SUCCESSFULLY: "Thanks, You have successfully signed up.",
    LOGIN_SUCCESS: 'Your login is successful.',
    CUSTOMER_VERIFY: 'Customer verified successfully',
    FORGET_SUCCESS: 'A password link has been sent to your registered ID.',
    RESET_SUCCESS: 'Your password was successfully changed.',
    PRODUCT_LIST_FETCH: 'Successfully fetched product list.',
    USER_LIST_FETCH: 'Successfully fetched user list.',
    AUTHORIZATION: 'This User is Authorized.',
    ACCOUNT_CREATION: 'Your account has been created successfully.',
    EMAIL_SEND: "Otp has been sent to your registered Email successfully.",
    OTP_SEND: 'Otp has been sent to your registered mobile number.',
    VERIFY_OTP: 'OTP verified successfully.',
    PIN_SET: "Your Pin has been set successfully.",
    PASSWORD_UPDATE: "Your password has been updated successfully.",
    DATA_SAVED: "Data is saved successfully.",
    DETAIL_GET: "Details have been fetched successfully.",
    DATA_FOUND: "Requested data found",
    PROFILE_DETAILS: "Your profile details has been updated sucessfully.",
    STATUS_UPDATED: "Your Status has been changed successfully.",
    UPDATE_SUCCESS: "Successfully updated.",
    BLOCK_SUCCESS: "Successfully blocked.",
    UNBLOCK_SUCCESS: "Successfully activated.",
    DELETE_SUCCESS: "Successfully deleted.",
    SUB_ADMIN_CREATED: "Sub-admin was created successfully.",
    SMS_SEND: "The SMS has been send to the buddies successfully.",
    DESTINATION_ADD: "Destination has been added successfully",
    EDIT_SUCC: "Successfully edit",
    RESET_LINK_SENT:"A reset link has been sent to your mail",
    LINK_SEND:"The link has been sent to the registered email .",
    CHANGE_PASSWORD:"Your password has been changed successfully.",
    SUB_ADMIN_UPDATED:"The sub-admin updated successfully .",
    SUB_ADMIN_DELETED:"The Sub-Admin deleted successfully",
    POST_CREATED:"Posted successfully",
    USER_FOLLOW:"User following successfully",
    USER_UNFOLLOW:"User unfollow successfully",
    POST_LIKE:"Post liked successfully",
    POST_DISLIKE:"Post Disliked successfully",
    COMMENT_UPDATE:"Comment update successfully",
    EVENT_CREATED:"Event created successfully",
    EVENT_UPDATE:"Event updated successfully",
    EVENT_DELETE:"Event deleted successfully",
    EVENT_CANCEL:"Event cancel successfully",
    EVENT_JOIN_REQUEST:"Request for join event successfully",
    EVENT_JOIN_ACCEPT:"Request for join event accepted successfully",
    EVENT_JOIN_REJECT:"Request for join event rejected successfully",
    FOUND_CONTACT:"Contact data found successfully",
    FOUND_FRIEND:"These friends already using Jigrr",
    FRIEND_ADDED:"Friends added successfully",
    FRIEND_EXISTS:"Friend already added",
    ROOM_CREATED:"Room created successfully",
    FEEDBACK_GIVEN:"Feedback given successfully",
    HIDE_SUCCESS:"Successfully deleted",
    POST_COMMENT:"Reply on comment successfully ",
    DELETE_REPLY:"Reply comment deleted successfully",
    UPDATE_REPLY:"Reply comment updated successfully",
    LIKE_COMMENT:"Comment like"

});
 