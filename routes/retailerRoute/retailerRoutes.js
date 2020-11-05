const router = require('express').Router()
const retailerController = require('../../controllers/retailerController')
const auth = require('../../middleware/auth');
/**
 * @swagger
 * /api/v1/retailer/signUpRetailer:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUpRetailer', retailerController.signUpRetailer)
/**
 * @swagger
 * /api/v1/retailer/signUp:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: martId
 *         description: martId
 *         in: formData
 *         required: true
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: true
 *       - name: shopNumber
 *         description: shopNumber
 *         in: formData
 *         required: true
 *       - name: floorNumber
 *         description: floorNumber
 *         in: formData
 *         required: true
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
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp',retailerController.signUp)
/**
 * @swagger
 * /api/v1/retailer/verifyOTP:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber/email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/verifyOTP',retailerController.otpVerify)
/**
 * @swagger
 * /api/v1/retailer/resendOTP:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/resendOTP',retailerController.resendOTP)
/**
 * @swagger
 * /api/v1/retailer/forgotPassword:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/forgotPassword',retailerController.forgotPassword)
/**
 * @swagger
 * /api/v1/retailer/login:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/login',retailerController.login)
/**
 * @swagger
 * /api/v1/retailer/resetPassword:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/resetPassword',retailerController.resetPassword)
/**
 * @swagger
 * /api/v1/retailer/changePassword:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: false
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
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/changePassword',auth.verifyToken,retailerController.changePassword)
/**
 * @swagger
 * /api/v1/retailer/profile:
 *   get:
 *     tags:
 *       - RETAILER
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
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */

router.get('/profile',auth.verifyToken,retailerController.myProfile)
/**
 * @swagger
 * /api/v1/retailer/business:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: GSTIN
 *         description: GSTIN
 *         in: formData
 *         required: true   
 *       - name: registeredBusinessName
 *         description: registeredBusinessName
 *         in: formData
 *         required: true  
 *       - name: pinCode
 *         description: pinCode
 *         in: formData
 *         required: true  
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true  
 *       - name: state
 *         description: state
 *         in: formData
 *         required: true  
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true  
 *       - name: addressProof
 *         description: addressProof
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/business',auth.verifyToken,retailerController.addBusinessForRetailer)

/**
 * @swagger
 * /api/v1/retailer/manage:
 *   put:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true 
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true 
 *       - name: floorNumber
 *         description: floorNumber
 *         in: formData
 *         required: true 
 *       - name: shopNumber
 *         description: shopNumber
 *         in: formData
 *         required: true 
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: true
 *       - name: GSTIN
 *         description: GSTIN
 *         in: formData
 *         required: true   
 *       - name: registeredBusinessName
 *         description: registeredBusinessName
 *         in: formData
 *         required: true  
 *       - name: pinCode
 *         description: pinCode
 *         in: formData
 *         required: true  
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true  
 *       - name: state
 *         description: state
 *         in: formData
 *         required: true  
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true  
 *       - name: addressProof
 *         description: addressProof
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/manage',auth.verifyToken,retailerController.manageGeneralInfo)
router.post('/verifyMobile',auth.verifyToken,retailerController.verifyMobile)
router.post('/qrCode',retailerController.viewQrCode)
router.post('/assignManagerToRetailer', retailerController.assignManagerToRetailer)

router.post('/allRetailerLists', retailerController.allRetailerLists)

router.post('/statusChange', retailerController.statusChange)

router.post('/couponsLists', retailerController.couponsLists)

router.get('/couponTemplateList', retailerController.couponTemplateList)
/**
 * @swagger
 * /api/v1/retailer/coupons:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true 
 *       - name: tiltle
 *         description: tiltle
 *         in: formData
 *         required: true 
 *       - name: couponCode
 *         description: couponCode
 *         in: formData
 *         required: true 
 *       - name: discount
 *         description: discount
 *         in: formData
 *         required: true 
 *       - name: couponAppliedOn
 *         description: couponAppliedOn
 *         in: formData
 *         required: true
 *       - name: ExpiryDate
 *         description: ExpiryDate
 *         in: formData
 *         required: true
 *       - name: shopPhoneNumber
 *         description: shopPhoneNumber
 *         in: formData
 *         required: true 
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: true 
 *       - name: floorNumber
 *         description: floorNumber
 *         in: formData
 *         required: true 
 *       - name: restrictions
 *         description: restrictions
 *         in: formData
 *         required: true 
 *       - name: itemType
 *         description: itemType
 *         in: formData
 *         required: true 
 *       - name: itemName
 *         description: itemName
 *         in: formData
 *         required: true 
 *       - name: brandName
 *         description: brandName
 *         in: formData
 *         required: true 
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true 
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/coupons', auth.verifyToken, retailerController.submitCoupon)

/**
 * @swagger
 * /api/v1/retailer/couponsSave:
 *   post:
 *     tags:
 *       - RETAILER
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
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/couponsSave',auth.verifyToken,retailerController.saveCoupon)
/**
 * @swagger
 * /api/v1/retailer/coupons:
 *   put:
 *     tags:
 *       - RETAILER
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
 *         in: formData
 *         required: true  
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false 
 *       - name: tiltle
 *         description: tiltle
 *         in: formData
 *         required: false 
 *       - name: couponCode
 *         description: couponCode
 *         in: formData
 *         required: false 
 *       - name: discount
 *         description: discount
 *         in: formData
 *         required: false 
 *       - name: couponAppliedOn
 *         description: couponAppliedOn
 *         in: formData
 *         required: false
 *       - name: ExpiryDate
 *         description: ExpiryDate
 *         in: formData
 *         required: false
 *       - name: shopPhoneNumber
 *         description: shopPhoneNumber
 *         in: formData
 *         required: false 
 *       - name: shopName
 *         description: shopName
 *         in: formData
 *         required: false 
 *       - name: floorNumber
 *         description: floorNumber
 *         in: formData
 *         required: false 
 *       - name: restrictions
 *         description: restrictions
 *         in: formData
 *         required: false 
 *       - name: itemType
 *         description: itemType
 *         in: formData
 *         required: false 
 *       - name: itemName
 *         description: itemName
 *         in: formData
 *         required: false 
 *       - name: brandName
 *         description: brandName
 *         in: formData
 *         required: false 
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false 
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/coupons',auth.verifyToken,retailerController.editCoupon)
/**
 * @swagger
 * /api/v1/retailer/couponStatus:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: couponId
 *         description: couponId
 *         in: formdata
 *         required: true   
 *       - name: couponStatus
 *         description: couponStatus
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/couponStatus', retailerController.couponStatus)
/**
 * @swagger
 * /api/v1/retailer/singleUseCoupon:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: couponCode
 *         description: couponCode
 *         in: formData
 *         required: true  
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/singleUseCoupon',retailerController.singleUseCoupon)
/**
 * @swagger
 * /api/v1/retailer/verifySingleUseCoupon:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: couponCode
 *         description: couponCode
 *         in: formData
 *         required: true  
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/verifySingleUseCoupon',retailerController.verifySingleUseCoupon)
/**
 * @swagger
 * /api/v1/retailer/couponHistory:
 *   post:
 *     tags:
 *       - RETAILER
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
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/couponHistory',auth.verifyToken,retailerController.couponHistory)
/**
 * @swagger
 * /api/v1/retailer/rechargeHsitory:
 *   post:
 *     tags:
 *       - RETAILER
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
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/rechargeHsitory', retailerController.rechargeHistory)
/**
 * @swagger
 * /api/v1/retailer/creditHistory:
 *   post:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters: 
 *       - name: retailerId
 *         description: retailerId
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
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/creditHistory',auth.verifyToken,retailerController.creditHistory)
/**
 * @swagger
 * /api/v1/retailer/coupons:
 *   delete:
 *     tags:
 *       - RETAILER
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
 *         in: formData
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/coupons', retailerController.deleteCoupon)
/**
 * @swagger
 * /api/v1/retailer/coupons/{couponId}:
 *   get:
 *     tags:
 *       - RETAILER
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
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/coupons/:couponId',retailerController.viewCoupon)
router.post('/retailerList',auth.verifyToken,retailerController.retailerListWithPagination)

router.post('/websites',auth.verifyToken,retailerController.addWebsite)
/**
 * @swagger
 * /api/v1/retailer/websites/{websiteId}:
 *   get:
 *     tags:
 *       - RETAILER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: websiteId
 *         description: websiteId
 *         in: path
 *         required: true  
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/websites/:websiteId',auth.verifyToken,retailerController.viewWebsite)
/**
 * @swagger
 * /api/v1/reatiler/websites:
 *   post:
 *     tags:
 *       - RETAILER
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
router.post('/websites',auth.verifyToken,retailerController.websiteHistory)


router.post('/payment',auth.verifyToken,retailerController.payment)
router.post('/status',retailerController.status)
router.post('/recharge',auth.verifyToken,retailerController.rechargePayment)
/**
 * @swagger
 * /api/v1/retailer/notificationList:
 *   get:
 *     tags:
 *       - RETAILER
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
router.get('/notificationList',auth.verifyToken,retailerController.notificationList)


/**
 * @swagger
 * /api/v1/retailer/clearAll:
 *   get:
 *     tags:
 *       - RETAILER
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
router.get('/clearAll',auth.verifyToken,retailerController.clearAll)
/**
 * @swagger
 * /api/v1/retailer/clearNotification:
 *   post:
 *     tags:
 *       - RETAILER
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

 
router.post('/clearNotification',auth.verifyToken,retailerController.clearNotification)
router.post('/items',retailerController.getItembrandBysubcategory)

router.post('/websiteRetailers',retailerController.getWebsiteForRetailer)

router.get('/getCategoriesByRetailer',auth.verifyToken,retailerController.getCategoriesByRetailer)
router.post('/getSubCategoriesByRetailer',auth.verifyToken,retailerController.getSubCategoriesByRetailer)
router.get('/viewWebsites',auth.verifyToken,retailerController.viewWebsites)

router.post('/getItemTypeByRetailer',auth.verifyToken,retailerController.getItemTypeByRetailer)

router.post('/getBrandByRetailer',auth.verifyToken,retailerController.getBrandByRetailer)

router.post('/getItemNameByRetailer',auth.verifyToken,retailerController.getItemNameByRetailer)

router.post('/getAllSubCategoryByCategory',retailerController.getAllSubCategoryByCategory)
router.get('/rechargeStatus',retailerController.rechargeStatus)
router.post('/paymentStatus',retailerController.paymentStatus)

router.get('/viewPaymentHistory',retailerController.viewPaymentHistory)






module.exports = router    
