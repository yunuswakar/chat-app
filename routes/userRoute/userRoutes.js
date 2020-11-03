const router = require('express').Router();
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/user/signUp:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: passCodeStatus
 *         description: passCodeStatus:true/false
 *         in: formData
 *         required: false
 *       - name: passCode
 *         description: passCode
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp', userController.signUp)
router.post('/addUserDetails', userController.addUserDetails)
/**
 * @swagger
 * /api/v1/user/setPassCode:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: passCode
 *         description: passCode in number
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/setPassCode',userController.setPassCode)

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *        - signUp
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
 *       - name: passCode
 *         description: passCode optional
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', userController.login)

router.post('/getQrcode',userController.getQrcode)
/**
 * @swagger
 * /api/v1/user/forgotPassword:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber/email
 *         in: formData
 *         required: true
 
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/forgotPassword',userController.forgotPassword)

/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/resetPassword', userController.resetPassword)
/**
 * @swagger
 * /api/v1/user/otpVerify:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: phoneNumber
 *         description: phoneNumber/email
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/otpVerify',userController.otpVerify)
/**
 * @swagger
 * /api/v1/user/myProfile:
 *   get:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/myProfile',userController.myProfile)

/**
 * @swagger
 * /api/v1/user/contactSupport:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token  
 *         description: token
 *         in: header
 *         required: true
 *       - name: selectPurpose
 *         description: selectPurpose
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *       - name: message
 *         description: message
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/contactSupport',userController.contactSupport)

/**
 * @swagger
 * /api/v1/user/resetPassCode:
 *   post:
 *     tags:
 *        - signUp
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: passCode
 *         description: your current passCode
 *         in: formData
 *         required: true
 *       - name: newPassCode
 *         description: newPassCode
 *         in: formData
 *         required: true
 *       - name: confirmPassCode
 *         description: confirmPassCode
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */


router.post('/resetPassCode',userController.resetPassCode)

router.post('/shareApp',userController.shareApp)
/**
 * @swagger
 * /api/v1/user/ratingByUser:
 *   post:
 *     tags:
 *        - setting management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: rating
 *         description: rating in number
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/ratingByUser',userController.ratingByUser)
/**
 * @swagger
 * /api/v1/user/editProfile:
 *   post:
 *     tags:
 *        - setting management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: rating
 *         description: rating in number
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editProfile',userController.editProfile)
/**
 * @swagger
 * /api/v1/user/helpCenter:
 *   post:
 *     tags:
 *        - help center
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: faqId
 *         description: faqId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data get sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/helpCenter',userController.helpCenter)

/**
 * @swagger
 * /api/v1/user/userHistory:
 *   post:
 *     tags:
 *        - help center
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/userHistory',userController.userHistory)

router.post('/createUser',userController.createUser)
router.post('/fhirOAuth',userController.fhirOAuth)
// router.post('/generateAuthCode',userController.generateAuthCode)

router.get('/exchangeAuthCode',userController.exchangeAuthCode)
router.post('/user_signup',userController.userSignUp)
/**
 * @swagger
 * /api/v1/user/addProvider:
 *   post:
 *     tags:
 *        - help center
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: providerName
 *         description: providerName
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: true
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addProvider',userController.addProvider)
/**
 * @swagger
 * /api/v1/user/verifyPassCode:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: passCode
 *         description: passCode
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/verifyPassCode',userController.verifyPassCode)
router.get('/healthSystem',userController.getAllConnectedHealthSystem)
router.post('/doctors',userController.searchDoctors)
router.post('/searchProviders',userController.searchProviders)
router.get('/connectProvideSearch',userController.connectProvideSearch)
router.get('/getAuthToken',userController.getAuthToken)
router.post('/deleteProvider',userController.deleteProvider)
/**
 * @swagger
 * /api/v1/user/providerList:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/providerList',userController.providerList)
router.post('/exists',userController.existApi)
/**
 * @swagger
 * /api/v1/user/t&c:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/t&c',userController.aboutUs)
/**
 * @swagger
 * /api/v1/user/privacyPolicy:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/privacyPolicy',userController.privacyPolicy)
/**
 * @swagger
 * /api/v1/user/legal:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/legal',userController.legal)
/**
 * @swagger
 * /api/v1/user/account:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/account',userController.deleteAccount)
router.post('/fhirRefreshToken',userController.fhirRefreshToken)
/**
 * @swagger
 * /api/v1/user/NotificationBell:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: notificationStatus
 *         description: notificationStatus
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/NotificationBell',userController.turnOnNotification)
router.get('/connect',userController.connect)
router.get('/getOneUpCreds',userController.getOneUpCreds)
/**
 * @swagger
 * /api/v1/user/emailVerify:
 *   post:
 *     tags:
 *        - user
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
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/emailVerify',userController.emailVerify)
/**
 * @swagger
 * /api/v1/user/phoneVerify:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/phoneVerify',userController.phoneVerify)
/**
 * @swagger
 * /api/v1/user/turnPassCodeStatus:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: passCodeStatus
 *         description: passCodeStatus
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/turnPassCodeStatus',userController.turnPassCodeStatus)
/**
 * @swagger
 * /api/v1/user/faqList:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: search
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/faqList',userController.faqList)
/**
 * @swagger
 * /api/v1/user/viewFaq:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: faqId
 *         description: faqId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data saved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewFaq',userController.viewFaq)
/**
 * @swagger
 * /api/v1/user/sendNotificationToPatient:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: patientId
 *         description: patientId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description:Notification send sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/sendNotificationToPatient',userController.sendNotificationToPatient)
/**
 * @swagger
 * /api/v1/user/acceptNotification:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: notificationId
 *         description: notificationId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Approved sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/acceptNotification',userController.acceptNotification)
/**
 * @swagger
 * /api/v1/user/rejectNotification:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: notificationId
 *         description: notificationId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Rejected sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/rejectNotification',userController.rejectNotification)
/**
 * @swagger
 * /api/v1/user/notificationList:
 *   post:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description:Found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/notificationList',userController.notificationList)

/**
 * @swagger
 * /api/v1/user/saveTestReport:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: patientid
 *         description: patientid
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description:Found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
 router.get('/saveTestReport',userController.saveTestReport)

 /**
 * @swagger
 * /api/v1/user/getTestReport:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patientid
 *         description: patientid
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description:Found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
 router.get('/getTestReport',userController.getTestReport)
 /**
 * @swagger
 * /api/v1/user/recentTestReport:
 *   get:
 *     tags:
 *        - user
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patientid
 *         description: patientid
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description:Found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
 router.get('/recentTestReport',userController.recentTestReport)

 router.get('/blockChainData',userController.blockChainData)
 router.post('/newKey',userController.newKey)

 router.post('/listOfKey',userController.listOfKey)

 router.post('/unlockKey',userController.unlockKey)

 router.post('/lockKey',userController.lockKey)

 router.post('/isKeyUnlocked',userController.isKeyUnlocked)

 router.post('/txApi',userController.txApi)

 

 

 
 
module.exports = router;
