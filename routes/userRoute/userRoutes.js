const router = require('express').Router()
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');



/**
 * @swagger
 * /api/v1/user/getMartsByUser:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: true
 *       - name: long
 *         description: long
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Location successfully found.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getMartsByUser', userController.getMartsByUser)

/**
 * @swagger
 * /api/v1/user/getShopByMart:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landing dashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: martId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getShopByMart',userController.getShopByMart)


/**
 * @swagger
 * /api/v1/user/getAllCouponOfMart:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting coupon by mart
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Coupon successfully found.
 *       404:
 *         description: Coupon not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getAllCouponOfMart',userController.getAllCouponOfMart)
/**
 * @swagger
 * /api/v1/user/getAllCategoryOfMart:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting category by mart
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getAllCategoryOfMart',userController.getAllCategoryOfMart)
router.post('/dashboardPopupAddress',userController.dashboardPopupAddress)//no swagger due to array

/**
 * @swagger
 * /api/v1/user/applyOnForCategory:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting category by mart
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: getting category by retailer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/applyOnForCategory',userController.applyOnForCategory)

/**
 * @swagger
 * /api/v1/user/applyOnForSubCategory:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting subCategory by mart
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: getting subCategory by retailer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/applyOnForSubCategory',userController.applyOnForSubCategory)
/**
 * @swagger
 * /api/v1/user/applyOnForItemType:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting coupon by mart
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: getting coupon by retailer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/applyOnForItemType',userController.applyOnForItemType)

/**
 * @swagger
 * /api/v1/user/applyOnForBrand:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting coupon by mart
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: getting coupon by retailer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/applyOnForBrand',userController.applyOnForBrand)
/**
 * @swagger
 * /api/v1/user/filterInCoupunAllRetailers:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: martId
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: getting coupon by category
 *         in: formData
 *         required: false
 *       - name: subCategoryId
 *         description: getting coupon by subCategory
 *         in: formData
 *         required: false
 *       - name: itemType
 *         description: getting coupon by item type
 *         in: formData
 *         required: false
 *       - name: brandName
 *         description: getting coupon by brand name
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/filterInCoupunAllRetailers',userController.filterInCoupunAllRetailers)
/**
 * @swagger
 * /api/v1/user/allCouponDisplayForRetailer:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: allCouponDisplayForRetailer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: retailerId
 *         description: getting coupon by retailer
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully.etailer
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/allCouponDisplayForRetailer',userController.allCouponDisplayForRetailer)
/**
 * @swagger
 * /api/v1/user/getRetailerAndCouponByMart:
 *   post:
 *     tags:
 *       - all retailers && all coupons display retailers (mart and retailers)
 *     description: getRetailerByMart
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: getting retailer by mart
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getRetailerAndCouponByMart',userController.getRetailerAndCouponByMart)

/**
 * @swagger
 * /api/v1/user/previewCouponByUser:
 *   post:
 *     tags:
 *       - previewCouponByUser
 *     description: previewCouponByUser
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
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/previewCouponByUser',auth.verifyToken,userController.previewCouponByUser)



/**
 * @swagger
 * /api/v1/user/getAllRetailerOfMartAndAllCoupon:
 *   post:
 *     tags:
 *       - category and category expened
 *     description: getting all retailer by mart and all retailer array
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: martId
 *         description: martId
 *         in: formData
 *         required: false
 *       - name: retailerId
 *         description: retailerId
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description:Data found successfully.
 *       404:
 *         description: Data not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getAllRetailerOfMartAndAllCoupon',userController.getAllRetailerOfMartAndAllCoupon)


/**
 * @swagger
 * /api/v1/user/getMartsByRetailer:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: true
 *       - name: long
 *         description: long
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Location successfully found.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/getMartsByRetailer',userController.getMartsByRetailer)

/**
 * @swagger
 * /api/v1/user/searchAllByLocation:
 *   post:
 *     tags:
 *       - landingDashboard
 *     description: landingDashboard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: true
 *       - name: long
 *         description: long
 *         in: formData
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Location successfully found.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/searchAllByLocation',userController.searchAllByLocation)
router.post('/getMultipleRetailerofMultipleMart',userController.getMultipleRetailerofMultipleMart)
router.post('/getSubCategoryAndCouponByCategory',userController.getSubCategoryAndCouponByCategory)
router.post('/getCouponByMartSubCategory',userController.getCouponByMartSubCategory)
/**
 * @swagger
 * /api/v1/user/saveMyCoupon:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/saveMyCoupon',auth.verifyToken,userController.saveMyCoupon)
router.post('/getViewCoupon',userController.getViewCoupon)
router.post('/reportManagement',userController.reportManagement)
router.post('/previewCouponAnyTime',userController.previewCouponAnyTime)
/**
 * @swagger
 * /api/v1/user/contactUs:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: subject
 *         description: subject
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
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
router.post('/contactUs',userController.contactUs)










router.post('/reportManagement',auth.verifyToken,userController.reportManagement)
/**
 * @swagger
 * /api/v1/user/signUp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: false
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: retailerReferralCode
 *         description: retailerReferralCode
 *         in: formData
 *         required: false
 *       - name: userType
 *         description: userType
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
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

router.post('/signUp', userController.signUp)

/**
 * @swagger
 * /api/v1/user/otpVerify:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/otpVerify', userController.otpVerify)

/**
 * @swagger
 * /api/v1/user/resendOTP:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Otp has been sent to your registered mobile number.
 *       404:
 *         description: Provided email/mobile number is not registered
 *       500:
 *         description: Internal Server Error.
 */


router.post('/resendOTP', userController.resendOTP)

/**
 * @swagger
 * /api/v1/user/forgotPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Otp has been sent to your registered Email successfully.
 *       404:
 *         description: Provided email/mobile number is not registered
 *       500:
 *         description: Internal Server Error.
 */

router.post('/forgotPassword', userController.forgotPassword)


/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
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
 *         description: Your password is updated successfully.
 *       404: 
 *         description: Provided email is not registered.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/resetPassword', userController.resetPassword)

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Your login is successful.
 *       404: 
 *         description: Provided email/mobile number is not registered.
 *       402: 
 *         description: Invalid credentials.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/login', userController.login)


/**
 * @swagger
 * /api/v1/user/myProfile:
 *   get:
 *     tags:
 *       - USER
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


router.get('/myProfile', auth.verifyToken, userController.myProfile)

/**
 * @swagger
 * /api/v1/user/changePassword:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Internal Server Error.
 */

router.post('/changePassword', auth.verifyToken, userController.changePassword)
router.put('/manage',auth.verifyToken,userController.manageGeneralInfo)
/**
 * @swagger
 * /api/v1/user/notificationList:
 *   get:
 *     tags:
 *       - USER
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
router.get('/notificationList',auth.verifyToken,userController.notificationList)

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
router.get('/clearNotifications',auth.verifyToken,userController.clearNotifications)

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
router.post('/clearNotification',auth.verifyToken,userController.clearNotification)
/**
 * @swagger
 * /api/v1/user/weeklyEmailSignup:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: birthDate
 *         description: birthDate
 *         in: formData
 *         required: false
 *       - name: birthMonth
 *         description: birthMonth
 *         in: formData
 *         required: false
 *       - name: anniversaryDate
 *         description: anniversaryDate
 *         in: formData
 *         required: false
 *       - name: anniversaryMonth
 *         description: anniversaryMonth
 *         in: formData
 *         required: false
 *       - name: state
 *         description: state
 *         in: formData
 *         required: false
 *       - name: city
 *         description: city
 *         in: formData
 *         required: false
 *       - name: address
 *         description: address
 *         in: formData
 *         required: false
 *       - name: pinCode
 *         description: pinCode
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated..
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/weeklyEmailSignup', auth.verifyToken, userController.weeklyEmailSignup)

router.post('/personalisedExperience', auth.verifyToken, userController.personalisedExperience)

router.post('/addToWishList', auth.verifyToken, userController.addToWishList)

router.post('/myWishList', auth.verifyToken, userController.myWishList)

router.post('/searchWishList', auth.verifyToken, userController.searchWishList)

router.post('/saveMyCoupon', auth.verifyToken, userController.saveMyCoupon)
/**
 * @swagger
 * /api/v1/user/myCoupons:
 *   post:
 *     tags:
 *       - USER
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
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: pageNumber
 *         description: pageNumber
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/myCoupons', auth.verifyToken, userController.myCoupons)
/**
 * @swagger
 * /api/v1/user/deleteCoupon:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/deleteCoupon', auth.verifyToken, userController.deleteCoupon)
/**
 * @swagger
 * /api/v1/user/hideCoupon:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/hideCoupon', auth.verifyToken, userController.hideCoupon)
/**
 * @swagger
 * /api/v1/user/viewCoupon/{couponId}:
 *   get:
 *     tags:
 *       - USER
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
 *         required: false
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/viewCoupon/:couponId',auth.verifyToken,userController.viewCoupon)
/**
 * @swagger
 * /api/v1/user/wishListRetailers:
 *   post:
 *     tags:
 *       - USER
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
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/wishListRetailers',auth.verifyToken,userController.addRetailerToWishList)
/**
 * @swagger
 * /api/v1/user/wishListMarts:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: martId
 *         description: martId
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
 *         description: Internal Server Error.
 */
router.post('/wishListMarts',auth.verifyToken,userController.addMartToWishList)
/**
 * @swagger
 * /api/v1/user/wishListCategories:
 *   post:
 *     tags:
 *       - USER
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
 *         required: tru
 *     responses:
 *       200:
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/wishListCategories',auth.verifyToken,userController.addCategoryToWishList)
/**
 * @swagger
 * /api/v1/user/wishListSubCategories:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: subCategoryId
 *         description: subCategoryId
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
 *         description: Internal Server Error.
 */
router.post('/wishListSubCategories',auth.verifyToken,userController.addSubCategoryToWishList)
/**
 * @swagger
 * /api/v1/user/wishListsUser:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Your password is updated successfully.
 *       404: 
 *         description: This user does not exist.
 *       402: 
 *         description: You have provided an incorrect old password.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/wishListsUser',auth.verifyToken,userController.getWishLists)
router.post('/wishList',auth.verifyToken,userController.getUserWishList)
router.post('/sns',userController.testEmail)
/**
 * @swagger
 * /api/v1/user/viewWebsites/{retailerId}:
 *   get:
 *     tags:
 *       - USER
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
 *         description: Details have been fetched successfully.
 *       404: 
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/viewWebsites/:retailerId',auth.verifyToken,userController.viewWebsites)
router.post('/getDataByCategory',userController.getDataByCategory)

router.post('/getSubCategoryByCategory',userController.getSubCategoryByCategory)

router.post('/getMartAndRetailerByCategory',userController.getMartAndRetailerByCategory)
router.post('/sendOtpOnMail',userController.sendOtpOnMail)
router.post('/verifyMail',userController.verifyEmail)
router.post('/updateOneTimeSignUp',auth.verifyToken,userController.updateOneTimeSignup)
router.post('/resendOtpOnMail',userController.resendOtpOnMail)
module.exports = router;

