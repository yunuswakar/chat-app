const express = require('express');
const router = express.Router();
const adminController = require("../../controller/adminController")
var auth = require('../../middleWare/auth');


const validation= {
  socialSignUpValidation,
  loginValidation,
  setPinValidation,
  emailValidation,
  verifyOtpValidation,
  resetPasswordValidation,
  userIdValidation,
  mobileValidation,
  changePasswordValidation,
  subAdminIdValidation
} = require('../../middleWare/validation');

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Login successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */


router.post("/login", loginValidation, adminController.login)
/**
   * @swagger
   * /api/v1/admin/viewProfile:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *     responses:
   *       200:
   *         description: Details have been fetched successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.get("/viewProfile", auth.verifyToken, adminController.viewProfile)
/**
   * @swagger
   * /api/v1/admin/editProfile:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: false
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: false
   *       - name: profilePic
   *         description: profilePic
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Your profile details updated sucessfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/editProfile",auth.verifyToken,userIdValidation,adminController.editProfile)

router.post("/changePassword", auth.verifyToken, adminController.changePassword)
/**
   * @swagger
   * /api/v1/admin/otpSent:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: OTP send to admin mobile number
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: true
   
   *     responses:
   *       200:
   *         description: OTP sent on your registered mobile Number
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
router.post("/otpSent", adminController.otpSent)
/**
   * @swagger
   * /api/v1/admin/verifyOtp:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: OTP send to admin mobile number
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: mobileNumber
   *         description: verifying otp 
   *         in: formData
   *         required: true
   *       - name: otp
   *         description: verifying otp
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: OTP verified successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
router.post("/verifyOtp", verifyOtpValidation, adminController.verifyOtp)
 /**
   * @swagger
   * /api/v1/admin/addSecurityQuestion:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: add questions as a security
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: question
   *         description: question
   *         in: formData
   *         required: true
   *       - name: answer
   *         description: answer
   *         in: formData
   *         required: true
   
   *     responses:
   *       200:
   *         description: Data saved succcessfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */

router.post("/addSecurityQuestion", adminController.addSecurityQuestion)
 /**
   * @swagger
   * /api/v1/admin/verifyAnswer:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: add questions as a security
   *     produces:
   *       - application/json 
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: questionId
   *         description: questionId
   *         in: formData
   *         required: true
   *       - name: answer
   *         description: answer
   *         in: formData
   *         required: true
   
   *     responses:
   *       200:
   *         description: Answer match
   *       404:
   *         description: Answer not match
   *       500:
   *         description: Internal Server Error
   */
router.post("/verifyAnswer", auth.verifyToken, adminController.verifyAnswer)

/**
   * @swagger
   * /api/v1/admin/forgotPassword:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: otp sent to admin's mobile number
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: mobileNumber
   *         description: 
   *         in: formData
   *         required: true
   
   *     responses:
   *       200:
   *         description: OTP sent on your registered mobile Number
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
router.post("/forgotPassword", mobileValidation,adminController.forgotPassword)
 /**
   * @swagger
   * /api/v1/admin/resetPassword:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: reset password of admin
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: adminId
   *         description: 
   *         in: formData
   *         required: true
   *       - name: newPassword
   *         description: 
   *         in: formData
   *         required: true
   *       - name: confirmPassword
   *         description: 
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Password updated successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
router.post("/resetPassword",adminController.resetPassword)

/**
   * @swagger
   * /api/v1/admin/addSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *       - name: kycImage
   *         description: kycImage
   *         in: formData
   *         required: true
   *       - name: subAdmin_Id
   *         description: subAdmin_Id
   *         in: formData
   *         required: true
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: true
   *       - name: dashboard
   *         description: dashboard
   *         in: formData
   *         required: false
   *       - name: agentManagement
   *         description: agentManagement
   *         in: formData
   *         required: false
   *       - name: userManagement
   *         description: userManagement
   *         in: formData
   *         required: false
   *       - name: subAdminManagement
   *         description: subAdminManagement
   *         in: formData
   *         required: false
   *       - name: moneyManagement
   *         description: moneyManagement
   *         in: formData
   *         required: false
   *       - name: commissionManagement
   *         description: commissionManagement
   *         in: formData
   *         required: false
   *       - name: transactionManagement
   *         description: transactionManagement
   *         in: formData
   *         required: false
   *       - name: chatManagement
   *         description: chatManagement
   *         in: formData
   *         required: false
   *       - name: staticContentManagement
   *         description: staticContentManagement
   *         in: formData
   *         required: false
   *       - name: journalManagement
   *         description: journalManagement
   *         in: formData
   *         required: false
   *       - name: historyManagement
   *         description: historyManagement
   *         in: formData
   *         required: false
   *       - name: agentTransactionManagement
   *         description: agentTransactionManagement
   *         in: formData
   *         required: false
   *       - name: kycManagement
   *         description: kycManagement
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: sub-admin added successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/addSubAdmin",auth.verifyToken, adminController.addSubAdmin)
/**
   * @swagger
   * /api/v1/admin/editSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: formData
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: false
   *       - name: password
   *         description: password
   *         in: formData
   *         required: false
   *       - name: kycImage
   *         description: kycImage
   *         in: formData
   *         required: false
   *       - name: subAdmin_Id
   *         description: subAdmin_Id
   *         in: formData
   *         required: false
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: false
   *       - name: permissionId
   *         description: permissionId
   *         in: formData
   *         required: false
   *       - name: dashboard
   *         description: dashboard
   *         in: formData
   *         required: false
   *       - name: agentManagement
   *         description: agentManagement
   *         in: formData
   *         required: false
   *       - name: userManagement
   *         description: userManagement
   *         in: formData
   *         required: false
   *       - name: subAdminManagement
   *         description: subAdminManagement
   *         in: formData
   *         required: false
   *       - name: moneyManagement
   *         description: moneyManagement
   *         in: formData
   *         required: false
   *       - name: commissionManagement
   *         description: commissionManagement
   *         in: formData
   *         required: false
   *       - name: transactionManagement
   *         description: transactionManagement
   *         in: formData
   *         required: false
   *       - name: chatManagement
   *         description: chatManagement
   *         in: formData
   *         required: false
   *       - name: staticContentManagement
   *         description: staticContentManagement
   *         in: formData
   *         required: false
   *       - name: journalManagement
   *         description: journalManagement
   *         in: formData
   *         required: false
   *       - name: historyManagement
   *         description: historyManagement
   *         in: formData
   *         required: false
   *       - name: agentTransactionManagement
   *         description: agentTransactionManagement
   *         in: formData
   *         required: false
   *       - name: kycManagement
   *         description: kycManagement
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: updated successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
 router.post("/editSubAdmin",auth.verifyToken,adminController.editSubAdmin)
/**
   * @swagger
   * /api/v1/admin/viewSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: Id
   *         description: Id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/viewSubAdmin", auth.verifyToken, adminController.viewSubAdmin)
/**
   * @swagger
   * /api/v1/admin/blockUnblockSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: id
   *         description: id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */

  router.post("/blockUnblockSubAdmin", auth.verifyToken, adminController.blockUnblockSubAdmin)

/**
   * @swagger
   * /api/v1/admin/getAllSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: search
   *         description: search
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  router.post("/getAllSubAdmin", auth.verifyToken, adminController.getAllSubAdmin)
/**
   * @swagger
   * /api/v1/admin/deleteSubAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: id
   *         description: id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  router.post("/deleteSubAdmin", auth.verifyToken, adminController.deleteSubAdmin)

/**
   * @swagger
   * /api/v1/admin/viewUser:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/viewUser", auth.verifyToken, userIdValidation, adminController.viewUser)
/**
   * @swagger
   * /api/v1/admin/showallCustomers:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: search
   *         description: search
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/showallCustomers", auth.verifyToken, adminController.showallCustomers)
/**
   * @swagger
   * /api/v1/admin/deleteUser:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/deleteUser", auth.verifyToken, userIdValidation, adminController.deleteUser)
/**
   * @swagger
   * /api/v1/admin/activeBlockUser:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/activeBlockUser", auth.verifyToken, userIdValidation, adminController.activeBlockUser)

/**
   * @swagger
   * /api/v1/admin/viewAgent:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/viewAgent", auth.verifyToken,adminController.viewAgent)
/**
   * @swagger
   * /api/v1/admin/deleteAgent:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/deleteAgent", auth.verifyToken, userIdValidation, adminController.deleteAgent)
/**
   * @swagger
   * /api/v1/admin/activeBlockAgent:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Activated successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/activeBlockAgent", auth.verifyToken, userIdValidation, adminController.activeBlockAgent)
/**
   * @swagger
   * /api/v1/admin/showallAgent:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: search
   *         description: search
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/showallAgent", auth.verifyToken, adminController.showallAgent)
/**
   * @swagger
   * /api/v1/admin/viewParticularKycDetails:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: kycId
   *         description: kycId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */  




  router.post("/viewParticularKycDetails",adminController.viewParticularKycDetails)
 /**
   * @swagger
   * /api/v1/admin/approveKycByAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: kycId
   *         description: kycId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */  
  router.post("/approveKycByAdmin",auth.verifyToken,adminController.approveKycByAdmin)

   /**
 * @swagger
 * /api/v1/admin/getAllKycDetails:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true 
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */

  router.post("/getAllKycDetails",auth.verifyToken,adminController.getAllKycDetails)

   /**
   * @swagger
   * /api/v1/admin/deletekyc:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: headre
   *         required: true
   *       - name: kycId
   *         description: kycId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Delete successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */  

  router.post("/deletekyc",auth.verifyToken,adminController.deletekyc)

   /**
   * @swagger
   * /api/v1/admin/qrCodeList:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: headre
   *         required: true
   *       - name: search
   *         description: search by name
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */  

  router.post("/qrCodeList",auth.verifyToken,adminController.qrCodeList)

 /**
   * @swagger
   * /api/v1/admin/blockQRuser:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: qrId
   *         description: qrId for block an unblock
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data updated successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */  

  router.post("/blockQRuser",auth.verifyToken,adminController.blockQRuser)

  router.post("/setMoney",auth.verifyToken,adminController.setMoney)

  router.get("/getMoney",adminController.getMoney)

  /**
   * @swagger
   * /api/v1/admin/setCommission:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userType
   *         description:
   *         in: formData
   *         required: true
   *       - name: transactionFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: monthlyFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: annuallyFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: userType
   *         description: 
   *         in: formData
   *         required: true 
   *       - name: depositFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: withdrawalFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: monthlyFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: annuallyFee
   *         description: 
   *         in: formData
   *         required: true
   *       - name: userType
   *         description: 
   *         in: formData
   *         required: true
   *       - name: commisionFee
   *         description: 
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data updated successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */  

  router.get("/getMoney",adminController.getMoney)

  router.post("/setCommission",auth.verifyToken,adminController.setCommission)

  
  router.post("/advertisment",auth.verifyToken,adminController.advertisment)

  router.post("/editAdvertisment",auth.verifyToken,adminController.editAdvertisment)

  router.post("/deleteImg",auth.verifyToken,adminController.deleteImg)

  router.get("/getAdvertisment",adminController.getAdvertisment)

  router.get("/getPost",adminController.getPost)


  

  router.post("/particularViewPost",adminController.particularViewPost)

  router.post("/addAgentTransaction",adminController.addAgentTransaction)

  router.get("/getAllAgentTransaction",adminController.getAllAgentTransaction)

  router.get("/getCommission",adminController.getCommission)
 
  
  router.post("/exchangeMoney",adminController.exchangeMoney)

  router.post("/editExchangeAmount",adminController.editExchangeAmount)

  router.get("/getExchangeMoney",adminController.getExchangeMoney)
   
  router.post("/viewTransaction",auth.verifyToken,adminController.viewTransaction)

  router.post("/getAllTransaction",auth.verifyToken,adminController.getAllTransaction)
 //=============================super-agent=============================================//

 /**
   * @swagger
   * /api/v1/admin/addAgentByAdmin:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: firstName
   *         description: firstName
   *         in: formData
   *         required: true
   *       - name: lastName   
   *         description: lastName
   *         in: formData
   *         required: true
   *       - name: mobileNumber
   *         description: mobileNumber
   *         in: formData
   *         required: true
   *       - name: city
   *         description: city
   *         in: formData
   *         required: true
   *       - name: emailId
   *         description: emailId
   *         in: formData
   *         required: true
   *       - name: state
   *         description: state
   *         in: formData
   *         required: true
   *       - name: profilePic
   *         description: profilePic
   *         in: formData
   *         required: true
   *       - name: kycImage
   *         description: kycImage
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *       - name: agentId
   *         description: agentId
   *         in: formData
   *         required: true
   * 
   *     responses:
   *       200:
   *         description: Your account has been created successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
 router.post("/addAgentByAdmin",auth.verifyToken,adminController.addAgentByAdmin)   



  router.get("/getAllQuestion",adminController.getAllQuestion)
  

  router.post("/rateChange",adminController.rateChange)

  
/**
 * @swagger
 * /api/v1/admin/getRate:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error   
 */   
  router.get("/getRate",adminController.getRate) 

  /**
 * @swagger
 * /api/v1/admin/addCommissionUSD:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: commission added to you balance
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error   
 */   
  router.post("/addCommissionUSD",auth.verifyToken,adminController.addCommissionUSD)
      
  /**
 * @swagger
 * /api/v1/admin/addCommissionCDF:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: commission added to you balance
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error   
 */
  router.post("/addCommissionCDF",auth.verifyToken,adminController.addCommissionCDF)


  /**
 * @swagger
 * /api/v1/admin/adminDetails:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: adminId
 *         description: adminId
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error   
 */
  router.post("/adminDetails",adminController.adminDetails)



  module.exports = router       