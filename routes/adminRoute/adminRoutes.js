const router = require('express').Router();
const adminController = require('../../controllers/adminController');
const auth = require('../../middleware/auth');


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
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', adminController.login)
/**
 * @swagger
 * /api/v1/admin/2fa:
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
 *         description: Two factor authentication enabled/disabled successfully.
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/2fa',auth.verifyToken,adminController.enableDisbale2Fa)
/**
 * @swagger
 * /api/v1/admin/verifyOTP:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Two factor authentication enabled/disabled successfully.
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/verifyOTP',adminController.verifyOtp)


/**
 * @swagger
 * /api/v1/admin/verify2Fa:
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
 *       - name: emailOtp
 *         description: emailOtp
 *         in: formData
 *         required: true
 *       - name: mobileOtp
 *         description: mobileOtp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Two factor authentication enabled/disabled successfully.
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify2Fa',auth.verifyToken,adminController.verify2Fa)
/**
 * @swagger
 * /api/v1/admin/forgotPassword:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: A password link has been sent to your registered ID.
 *       404:
 *         description: Provided email is not registered.
 *       500:
 *         description: Internal Server Error
 */

router.post('/forgotPassword', adminController.forgotPassword)

/**
 * @swagger
 * /api/v1/admin/resetPassword/{_id}:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: path
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404:
 *         description: This user does not exist.
 *       402:
 *         description : Password not matched. 
 *       500:
 *         description: Internal Server Error
 */

router.post('/resetPassword/:_id', adminController.resetPassword)

/**
 * @swagger
 * /api/v1/admin/getProfile:
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
 *         description: Details have been fetched successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error
 */

router.get('/getProfile', auth.verifyToken, adminController.getProfile)

/**
 * @swagger
 * /api/v1/admin/changePassword:
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
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404:
 *         description: This user does not exist.
 *       402:
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error
 */

router.post('/changePassword', auth.verifyToken, adminController.changePassword)

/**
 * @swagger
 * /api/v1/admin/subAdmins:
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
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: roleId
 *         description: roleId
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: SubAdmin Added successfully 
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/subAdmins', auth.verifyToken, adminController.addSubAdmin)

/**
 * @swagger
 * /api/v1/admin/subAdmins:
 *   put:
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
 *       - name: subadminId
 *         description: subadminId
 *         in: formData
 *         required: true
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: roleId
 *         description: roleId
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: SubAdmin edited successfully 
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */

router.put('/subAdmins', auth.verifyToken, adminController.editSubAdmin)

/**
 * @swagger
 * /api/v1/admin/subAdmins/{subadminId}:
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
 *       - name: subadminId
 *         description: subadminId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: SubAdmin viewed successfully 
 *       500:
 *         description: Internal Server Error
 */

router.get('/subAdmins/:subadminId', auth.verifyToken, adminController.viewSubAdmin)

/**
 * @swagger
 * /api/v1/admin/updateStatusSubAdmin:
 *   post:
 *     tags:
 *       - ADMIN 
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *       - name: subadminId
 *         description:  subadminId
 *         in: formData
 *         required: true
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Your Status has been changed successfully. 
 *       500:
 *         description: Internal Server Error
 */

router.post('/updateStatusSubAdmin', auth.verifyToken, adminController.updateStatusSubAdmin)

/**
 * @swagger
 * /api/v1/admin/subAdminList:
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
 *       - name: page  
 *         description: page
 *         in: formData 
 *         required: false
 *       - name: limit  
 *         description: limit
 *         in: formData 
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal Server Error
 */

router.post('/subAdminList', auth.verifyToken, adminController.subAdminList)

/**
 * @swagger
 * /api/v1/admin/viewUser/{userId}:
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
 *       - name: userId
 *         description: userId
 *         in: path
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.    
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewUser/:userId', auth.verifyToken, adminController.viewUser)

/**
 * @swagger
 * /api/v1/admin/userList:
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
 *       - name: loginStatus
 *         description: loginStatus
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/userList', auth.verifyToken, adminController.userList)

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
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Your Status has been changed successfully.
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/activeBlockUser', auth.verifyToken, adminController.activeBlockUser)

/**
 * @swagger
 * /api/v1/admin/rejectCoupon:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: couponId  
 *         description: couponId
 *         in: formData 
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/rejectCoupon',auth.verifyToken,adminController.addCommentWhenRejectingCoupon)
/**
 * @swagger
 * /api/v1/admin/acceptCoupon:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: couponId  
 *         description: couponId
 *         in: formData 
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/acceptCoupon',auth.verifyToken,adminController.addCommentWhenApprovingCoupon)
/**
 * @swagger
 * /api/v1/admin/addCommentWhenApprovingRetailerApplication:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addCommentWhenApprovingRetailerApplication',auth.verifyToken,adminController.addCommentWhenApprovingRetailerApplication)
/**
 * @swagger
 * /api/v1/admin/addCommentWhenRejectingRetailerApplication:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addCommentWhenRejectingRetailerApplication',auth.verifyToken,adminController.addCommentWhenRejectingRetailerApplication)
/**
 * @swagger
 * /api/v1/admin/approveWebsites:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/approveWebsites',auth.verifyToken,adminController.addCommentWhenApprovingRetailerWebsite)
/**
 * @swagger
 * /api/v1/admin/rejectWebsites:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: comment  
 *         description: comment
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/rejectWebsites',auth.verifyToken,adminController.addCommentWhenRejectingRetailerWebsite)
/**
 * @swagger
 * /api/v1/admin/viewUserWishList/{userId}:
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
 *         in: path
 *         required: true
 *       - name: type  
 *         description: type
 *         in: formData 
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewUserWishList/:userId', auth.verifyToken, adminController.viewUserWishList)
/**
 * @swagger
 * /api/v1/admin/addOrsubtractRetailerCredit:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: description  
 *         description: description
 *         in: formData 
 *         required: true
 *       - name: description  
 *         description: description
 *         in: formData 
 *         required: true
 *       - name: credit  
 *         description: credit
 *         in: formData 
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addOrsubtractRetailerCredit', auth.verifyToken,adminController.addOrsubtractRetailerCredit)
/**
 * @swagger
 * /api/v1/admin/website/{retailerId}:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/website/:retailerId',auth.verifyToken,adminController.viewWebsite)
/**
 * @swagger
 * /api/v1/admin/creditHistory:
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/creditHistory',auth.verifyToken,adminController.creditHistory)
/**
 * @swagger
 * /api/v1/admin/rechrgeHistory:
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/rechrgeHistory',auth.verifyToken,adminController.rechargeHistory)
/**
 * @swagger
 * /api/v1/admin/websites:
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/websites',auth.verifyToken,adminController.websiteHistory)
/**
 * @swagger
 * /api/v1/admin/retailerListWithPagination:
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
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: websiteStatus
 *         description: websiteStatus
 *         in: formData
 *         required: false
 *       - name: martName
 *         description: martName
 *         in: formData
 *         required: false
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/retailerListWithPagination',auth.verifyToken,adminController.retailerListWithPagination)
/**
 * @swagger
 * /api/v1/admin/assignManagerToReatailer:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: false
 *       - name: managerId
 *         description: managerId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/assignManagerToReatailer',auth.verifyToken,adminController.assignManagerToRetailer)
/**
 * @swagger
 * /api/v1/admin/viewRetailer/{retailerId}:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewRetailer/:retailerId',auth.verifyToken,adminController.viewRetailer)
/**
 * @swagger
 * /api/v1/admin/blockUnblockRetailer:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/blockUnblockRetailer',auth.verifyToken,adminController.blockUnblockRetailer)
router.post('/resendOtp',adminController.resendOtp)
/**
 * @swagger
 * /api/v1/admin/couponHistory:
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: couponStatus
 *         description: couponStatus
 *         in: formData
 *         required: false
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: false
 *       - name: martName
 *         description: martName
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/couponHistory',auth.verifyToken,adminController.couponHistory)
/**
 * @swagger
 * /api/v1/admin/viewCoupon/{couponId}:
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
 *       - name: couponId
 *         description: couponId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewCoupon/:couponId',auth.verifyToken,adminController.viewCoupon)
/**
 * @swagger
 * /api/v1/admin/viewNotification:
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
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewNotification',auth.verifyToken,adminController.viewNotification)
/**
 * @swagger
 * /api/v1/admin/clearNotifications:
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
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/clearNotifications',auth.verifyToken,adminController.clearNotifications)
/**
 * @swagger
 * /api/v1/admin/clearNotification:
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
 *       - name: notificationId
 *         description: notificationId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/clearNotification',auth.verifyToken,adminController.clearNotification)
/**
 * @swagger
 * /api/v1/admin/couponList:
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
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/couponList',auth.verifyToken,adminController.couponList)
/**
 * @swagger
 * /api/v1/admin/viewCoupon/{couponId}:
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
 *       - name: couponId
 *         description: couponId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewCoupon/:couponId',auth.verifyToken,adminController.viewCoupon)
/**
 * @swagger
 * /api/v1/admin/history/payment:
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: transactionId
 *         description: transactionId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/history/payment',auth.verifyToken,adminController.paymentHistory)
/**
 * @swagger
 * /api/v1/admin/history/delete:
 *   delete:
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
 *       - name: transactionId
 *         description: transactionId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.delete('/history/delete',auth.verifyToken,adminController.deletePaymentHistory)
/**
 * @swagger
 * /api/v1/admin/view/payment/{transactionId}:
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
 *       - name: transactionId
 *         description: transactionId
 *         in: path
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/view/payment/:transactionId',auth.verifyToken,adminController.viewPaymentHistory)
/**
 * @swagger
 * /api/v1/admin/logs:
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
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/logs',auth.verifyToken,adminController.viewLog)
/**
 * @swagger
 * /api/v1/admin/report:
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
 *         description: userType
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/report',auth.verifyToken,adminController.reportForUsers)
/**
 * @swagger
 * /api/v1/admin/counts:
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
 *         description: userType
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/counts',auth.verifyToken,adminController.retailerAndEndUsersCount)
/**
 * @swagger
 * /api/v1/admin/wishList:
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
 *       - name: type
 *         description: type
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/wishList',auth.verifyToken,adminController.getUserWishList)
/**
 * @swagger
 * /api/v1/admin/endUsers:
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
 *         description: userType
 *         in: formData
 *         required: true
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/endUsers',auth.verifyToken,adminController.endUserSignUp)
router.post('/couponTemplate',adminController.addCouponTemplate)
router.post('/couponTemplateList',adminController.listCouponTemplate)
/**
 * @swagger
 * /api/v1/admin/userWishList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: formData
 *         required: false
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: type
 *         description: type
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/userWishList',adminController.wishList)
/**
 * @swagger
 * /api/v1/admin/viewUserWishList/{wishId}:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: wishId
 *         description: wishId
 *         in: path
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewUserWishList/:wishId',adminController.viewWishList)
/**
 * @swagger
 * /api/v1/admin/changeRetailer:
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
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/changeRetailer',auth.verifyToken,adminController.changeRetailerStatus)
router.post('/resendOtpMob2Fa',adminController.resendOtpMob2Fa)
router.post('/resendOtpEmail',adminController.resendZOtpEmail)
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
 *       - name: subAdminId
 *         description: subAdminId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteSubAdmin',auth.verifyToken,adminController.deleteSubAdmin)
router.put('/editSubAdminRole',auth.verifyToken,adminController.editSubAdminRole)
router.post('/getGraphData',adminController.getGraphData)
router.get('/getGraph',adminController.getByMonth)
router.post('/exportToCSV',adminController.exportToCSV)
router.post('/exportTransactionData',adminController.exportTransactionData)
router.post('/exportCouponToCSV',adminController.exportCouponToCSV)
router.post('/exportEmailTemplateTocsv',adminController.exportEmailTemplateTocsv)
router.post('/exportFaqTocsv',adminController.exportFaqTocsv)
router.post('/exportRoleTocsv',adminController.exportRoleTocsv)
router.post('/exportSubAdminTocsv',adminController.exportSubAdminTocsv)
router.post('/addTemplate',adminController.addTemplate)
router.get('/listTemplate',adminController.listTemplate)
router.post('/exportMartToCSV',adminController.exportMartToCSV)
router.post('/exportCategoryToCSV',adminController.exportCategoryToCSV)
router.post('/exportSubCategoryToCsv',adminController.exportSubAdminTocsv)
router.post('/exportRetailerCouponAndEndUserToCSV',adminController.exportRetailerCouponAndEndUserToCSV)
router.post('/viewGraphData',adminController.viewGraphData)
router.post('/changePaymentStatus',auth.verifyToken,adminController.changePaymentStatus)

router.post('/getAllSubCategoryByCategory',adminController.getAllSubCategoryByCategory)






module.exports = router;
