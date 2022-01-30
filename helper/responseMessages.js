/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

module.exports = {
  ERROR_ON_UPDATE: "error occurred during updating",
  USER_EDITED: "User updated successfully.",
  CONTENT_EDITED: "Content updated successfully.",
  SUBSCRIPTION_EDITED: "Subscription updated successfully.",
  STORE_EDITED: "Store updated successfully.",
  CRYSTAL_EDITED: "Crystal updated successfully.",
  DATA_EDITED: "Data updated successfully.",
  POST_LIKE: "Post liked successfully.",
  POST_DISLIKE: "Post disLiked successfully.",
  POST_HIDE: "Post hidden successfully.",
  EMAIL_VERIFIED: "Email verified successfully.",

  INCORRECRT_EMAIL: "Incorrect email",


  LOGGIN_SUCCESSFULLY: "Logged in successfully.",
  LOGOUT_SUCCESSFULLY: "Log out successfully.",

  EMAIL_SEND: "Email send successfully.",

  UNAUTHORIZED: "Unauthorized , unable to do the action.",
  REMOVEDSUCCESS: (name) => {
    return name + " removed successfully.";
  },
  RECORDFOUND: "Record found.",
  NORECORDFOUND: "No Record found.",
  STUDENTRECORD: "Student Record.",
  COUNSELORRECORD: "Cunselor Record.",
  SOMETHING_WRONG: "something went wrong.",
  NO_USER: "No Admin found.",

  NOTFOUND: "We cannot find an account with that email address",
  ADD_SUCCESS: (name) => {
    return name + " added successfully.";
  },
  SUCCESS_EDIT: (name) => {
    return name + " updated successfully.";
  },
  RECORD_FOUND: (name) => {
    return name + " found.";
  },
  USERBLOCK: (name) => {
    return name + " is blocked.";
  },
  ADD: "Data added successfully",
  RATING: "Rating added successfully",

  FAVOURITE: "Favourite successfully",
  UNFAVOURITE: "Unfavourite successfully",

  INCORRECT_PWD: "Incorrect Password.",
  BLOCKED: "You Are Blocked, Please Contact Admin",
  PAGE_INVALID: "invalid page no",
  PASSWORD_CHANGED: "password changed successfully",
  ERRORON_SENDMAIL: "error while sent email",
  APPROVAL: "please wait for admin approval.",
  INVALID_ACCESS: "Access denied",
  FAILED: "Signup failed",
  NO_USER_FOUND: "No User Found",
  VALID_EMAIL: "Please provide your valid email",

  SIGNUP: "Signup successfully.",
  EMAILEXIST: "Email already exists",
  WELCOME: "Welcome Again",
  EMAIL_SENT: "Email Sent Successfully",
  ALREADY: "Email already subscribed",
  PROFILE_EDITED: "Profile score updated successfully.",
  PROFILE_DELETED: "Profile score Deleted successfully.",
  USER_DELETE: "USER Deleted successfully",
  CONTENT_DELETE: "Content Deleted successfully",
  PAGE_DELETE: "Page Deleted successfully",

  SUBSCRIPTION_DELETE: "Subscription Deleted successfully",
  STORE_DELETE: "Store Deleted successfully",
  CRYSTAL_DELETE: "Crystal Deleted successfully",
  POST_DELETE: "Post Deleted successfully",
  REPORT_DELETE: "Report Deleted successfully",

  CRYSTAL_UPDATE: "Data updated successfully",

  DATA_DELETE: "Data Deleted successfully",
  DATA_BLOCK: "Data Blocked successfully",
  DATA_UNBLOCK: "Data Unblocked successfully",
  LINK_VERIFY: "Link send successfully",
  REQUIRED_FIELD: "Status is Required",
  PASSWORD_NOT_MATCH: "Old Password Not Match",

  INVALID: (name) => {
    return "invalid " + name;
  },
  ALREADYEXIST: (name) => {
    return name + " already exists";
  },
};
