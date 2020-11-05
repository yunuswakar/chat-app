/** 
 * @description All the Error messages that needed to be sent to Admin or App
 * @type {Object}
*/
module.exports.ErrorMessage = Object.freeze({
    INVALID_TOKEN: 'Unauthorized user.',
    INTERNAL_ERROR: 'Internal Server Error.',
    INVALID_CREDENTIAL: 'Invalid credentials.',
    SOMETHING_WRONG: 'Something went wrong.',
    NO_TOKEN: 'Please provide token.',
    EMAIL_NOT_REGISTERED: 'Provided email is not registered.',
    NOT_REGISTERED: "Provided email/mobile number is not registered.",
    RESET_PASSWORD_EXPIRED: 'Your Token has expired.',
    WRONG_PASSWORD: 'Please enter valid password.',
    INVALID_MOBILE: 'This mobile number is not valid.',
    EMAIL_EXIST: 'This email already exists.',
    NOT_FOUND: 'Requested data not found.',
    USER_NOT_FOUND: 'This user does not exist.',
    UPDATE_NOT: "Unexpected error during update, please try again.",
    MOBILE_EXIST: 'This mobile number already exists.',
    USERNAME_EXIST: 'This user name already exists.',
    USER_ID: 'A valid User Id is required.',
    BLOCKED_BY_ADMIN: 'Your login has been blocked by the Administrator. Please contact using Contact Us page at the bottom of this screen.',
    DELETED_BY_ADMIN: 'Your account is deleted, please contact Admin.',
    FIELD_REQUIRED: 'Fields are required.',
    OLD_PASSWORD: 'You have provided an incorrect old password.',
    NOT_MATCH:"Password not matched",
    INCORRECT_JWT: 'Invalid JWT token.',
    FORBIDDEN: 'There was an error in sending email.',
    INVALID_OTP: 'Invalid OTP',
    OTP_EXPIRED: "OTP has expired, please try resend OTP.",
    ROLE_EXIST: "This role already exists.",
    MART_EXIST: "This mart name already exists.",
    CATEGORY_EXIST: "This category name already exists.",
    SUBJECT_EXIST: "This subject already exists.",
    SUB_CATEGORY_EXIST: "This sub-category name already exists",
    QUESTION_EXIST: "This question already exists.",
    TITLE_EXIST: "This coupon title already exists.",
    COUPON_CODE_EXIST: "This coupon code already exists.",
    NOT_MATCH: "Password not matched.",
    REDEEMED:"This coupon is already redeemed by"
});

/** 
 * @description All the Success messages that needed to be sent to App or Admin
 * @type {Object}
*/
module.exports.SuccessMessage = Object.freeze({
    SIGNUP_SUCCESS: "Thanks, You have successfully signed up.",
    LOGIN_SUCCESS: 'Your login is successful.',
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
    PASSWORD_UPDATE: "Your password is updated successfully.",
    DATA_SAVED: "Data is saved successfully.",
    DETAIL_GET: "Details have been fetched successfully.",
    DATA_FOUND: "Requested data found.",
    PROFILE_DETAILS: "Your profile detail was updated sucessfully.",
    STATUS_UPDATED: "Your Status has been changed successfully.",
    UPDATE_SUCCESS: "Successfully updated.",
    BLOCK_SUCCESS: "Successfully blocked.",
    UNBLOCK_SUCCESS: "Successfully activated.",
    DELETE_SUCCESS: "Successfully deleted.",
    SUB_ADMIN_CREATED: "Sub-admin created successfully.",
    ROLE_ADDED: "Role has been added successfully.",
    MART_ADDED: "Mart has been added successfully.",
    CATEGORY_ADD: "Category has been added successfully.",
    SUB_CATEGORY_ADD: "Sub-category has been added successfully",
    MANAGER_ASSIGN: "Manager assigned successfully.",
    EMAIL_TEMPLATE_ADD: "Weekly email template has been added successfully.",
    FAQ_ADDED: "FAQ has been added successfully.",
    COUPON_ADD: "Coupon has been added successfully.",
    RECHARGELIST:"Recharge list fecthed successfully.",
    COUPON_HIDE:"Coupon hidden successfully.",
    DETAILS_GET:"Details fetched successfully."
});