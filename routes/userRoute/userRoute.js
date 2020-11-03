const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController');
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation');

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
 *         required: true
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: country
 *         description: country
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true
 *       - name: postCode
 *         description: postCode
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: deviceToken
 *         description: deviceToken
 *         in: formData
 *         required: false
 *       - name: deviceType
 *         description: deviceType-android/iOS
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
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: true
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
 *         description: OTP verified successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/otpVerify', auth.verifyToken, userController.otpVerify)

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
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Otp has been sent to your registered mobile number/email
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/resendOTP', auth.verifyToken, userController.resendOTP)

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
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Otp has been sent to your registered email/mobile number successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
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
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password was updated successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/resetPassword', auth.verifyToken, userController.resetPassword)

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
 *       - name: deviceToken
 *         description: deviceToken
 *         in: formData
 *         required: false
 *       - name: deviceType
 *         description: deviceType-android/iOS
 *         in: formData
 *         required: false
 * 
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', validation.loginValidation, userController.login)

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
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.get('/myProfile', auth.verifyToken, userController.myProfile)

/**
 * @swagger
 * /api/v1/user/editProfile:
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
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *       - name: dateOfBirth
 *         description: dateOfBirth
 *         in: formData
 *         required: false
 *       - name: gender
 *         description: gender-MALE/FEMALE/OTHERS
 *         in: formData
 *         required: false
 *       - name: country
 *         description: country
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
 *       - name: postCode
 *         description: postCode
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Your profile detail was updated sucessfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/editProfile', auth.verifyToken, userController.editProfile)

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
 *       - name: oldPassword
 *         description: oldPassword
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
 *         description: Your password was successfully changed
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/changePassword', auth.verifyToken, userController.changePassword)

/**
 * @swagger
 * /api/v1/user/choosePlan:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: subscriptionId
 *         description: subscriptionId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Membership plan has been added successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/choosePlan', userController.choosePlan)


/**
 * @swagger
 * /api/v1/user/animationCategoryList:
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
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/animationCategoryList', auth.verifyToken, userController.animationCategoryList)

/**
 * @swagger
 * /api/v1/user/animationEpisodeList:
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
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/animationEpisodeList', auth.verifyToken, userController.animationEpisodeList)

/**
 * @swagger
 * /api/v1/user/animationVideoList:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/animationVideoList', auth.verifyToken, userController.animationVideoList)

/**
 * @swagger
 * /api/v1/user/podcastCategoryList:
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
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/podcastCategoryList', auth.verifyToken, userController.podcastCategoryList)

/**
 * @swagger
 * /api/v1/user/podcastEpisodeList:
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
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/podcastEpisodeList', auth.verifyToken, userController.podcastEpisodeList)

/**
 * @swagger
 * /api/v1/user/podcastAudioList:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/podcastAudioList', auth.verifyToken, userController.podcastAudioList)

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
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/contactUs', auth.verifyToken, userController.contactUs)

/**
 * @swagger
 * /api/v1/user/mentalHealthCategoryList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/mentalHealthCategoryList', auth.verifyToken, userController.mentalHealthCategoryList)

/**
 * @swagger
 * /api/v1/user/mentalHealthList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/mentalHealthList', auth.verifyToken, userController.mentalHealthList)

/**
 * @swagger
 * /api/v1/user/medicalConditionCategoryList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/medicalConditionCategoryList', auth.verifyToken, userController.medicalConditionCategoryList)

/**
 * @swagger
 * /api/v1/user/medicalConditionList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/medicalConditionList', auth.verifyToken, userController.medicalConditionList)

/**
 * @swagger
 * /api/v1/user/myArea:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/myArea', auth.verifyToken, userController.myArea)

/**
 * @swagger
 * /api/v1/user/favouriteUnfavourite:
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
 *       - name: _id
 *         description: _id
 *         in: formData
 *         required: true
 *       - name: isFavourite 
 *         description: isFavourite
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/favouriteUnfavourite', auth.verifyToken, userController.favouriteUnfavourite)

/**
 * @swagger
 * /api/v1/user/addFeedback:
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
 *       - name: rating
 *         description: rating
 *         in: formData
 *         required: true
 *       - name: comments
 *         description: comments
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Feedback has been added successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/addFeedback', auth.verifyToken, userController.addFeedback)

/**
 * @swagger
 * /api/v1/user/addScheduler:
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
 *       - name: eventType
 *         description: eventType-Mindfulness Meditation,Bedtime,Mood Track,Medication,Supplements,Class,Exercise,Others
 *         in: formData
 *         required: true
 *       - name: eventName
 *         description: eventName- only needed when eventType is Others
 *         in: formData
 *         required: false
 *       - name: date
 *         description: date-format=>2019-12-25
 *         in: formData
 *         required: true
 *       - name: time
 *         description: time 
 *         in: formData
 *         required: true
 *       - name: setTime
 *         description: setTime 
 *         in: formData
 *         required: true
 *       - name: note
 *         description: note 
 *         in: formData
 *         required: false
 *       - name: isRecurring
 *         description: isRecurring 
 *         in: formData
 *         required: false
 *       - name: isImportant
 *         description: isImportant 
 *         in: formData
 *         required: false
 *         schema:
 *          type: boolean
 *     responses:
 *       200:
 *         description: Schedular has been added successfully
 *       404:
 *         description: This time has already been appointed to someone else
 *       500:
 *         description: Internal Server Error
 */

router.post('/addScheduler', auth.verifyToken, userController.addScheduler)

/**
 * @swagger
 * /api/v1/user/editScheduler:
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
 *       - name: schedulerId
 *         description: schedulerId
 *         in: formData
 *         required: true
 *       - name: eventType
 *         description: eventType
 *         in: formData
 *         required: false
 *       - name: eventName
 *         description: eventName
 *         in: formData
 *         required: false
 *       - name: date
 *         description: date-format=>2019-12-26
 *         in: formData
 *         required: false
 *       - name: time
 *         description: time 
 *         in: formData
 *         required: false
 *       - name: setTime
 *         description: setTime 
 *         in: formData
 *         required: false
 *       - name: false
 *         description: false 
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/editScheduler', auth.verifyToken, userController.editScheduler)

/**
 * @swagger
 * /api/v1/user/deleteScheduler:
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
 *       - name: schedulerId
 *         description: schedulerId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteScheduler', auth.verifyToken, userController.deleteScheduler)

/**
 * @swagger
 * /api/v1/user/completeSchedule:
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
 *       - name: schedulerId
 *         description: schedulerId
 *         in: formData
 *         required: true
 *       - name: isCompleted
 *         description: isCompleted-true/false
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Schedule has been completed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/completeSchedule', auth.verifyToken, userController.completeSchedule)


/**
 * @swagger
 * /api/v1/user/schedulerList:
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
 *       - name: date
 *         description: date-format=>2019-12-12
 *         in: formData
 *         required: true
 *       - name: scheduleStatus
 *         description: scheduleStatus
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/schedulerList', auth.verifyToken, userController.schedulerList)

/**
 * @swagger
 * /api/v1/user/countSchedulerStatus/{date}:
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
 *       - name: date
 *         description: date-format=>2019-12-12
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/countSchedulerStatus/:date', auth.verifyToken, userController.countSchedulerStatus)

/**
 * @swagger
 * /api/v1/user/moodTracking:
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
 *       - name: moodTrack
 *         description: moodTrack-AWESOME,HAPPY,POSITIVE,RELAXED,OK,ANXIOUS,STRESSED,SAD,AWFUL
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Mood added successfully
 *       404:
 *         description: You cannot add more than 3 mood tracks
 *       500:
 *         description: Internal Server Error
 */

router.post('/moodTracking', auth.verifyToken, userController.moodTracking)

/**
 * @swagger
 * /api/v1/user/viewProgress:
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
 *       - name: date
 *         description: date-format=>Thu Dec 12 2019
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewProgress', auth.verifyToken, userController.viewProgress)

/**
 * @swagger
 * /api/v1/user/viewRecentMood:
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
 *       - name: date
 *         description: date-format=>Thu Jan 09 2020
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewRecentMood', auth.verifyToken, userController.viewRecentMood)

/**
 * @swagger
 * /api/v1/user/getDateOfMood:
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
 *       - name: mood
 *         description: mood
 *         in: formData
 *         required: true
 *       - name: month
 *         description: month-Jan 2020
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/getDateOfMood', auth.verifyToken, userController.getDateOfMood)

/**
 * @swagger
 * /api/v1/user/weeklyProgress:
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
 *       - name: mood
 *         description: mood
 *         in: formData
 *         required: true
 *       - name: startDate
 *         description: startDate-2020-06-08T00:00:00.000Z
 *         in: formData
 *         required: true
 *       - name: endDate
 *         description: endDate-2020-06-14T23:59:59.999Z
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/weeklyProgress', auth.verifyToken, userController.weeklyProgress)

/**
 * @swagger
 * /api/v1/user/chooseBuddies:
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
 *       - name: buddyId
 *         description: buddyId
 *         in: formData
 *         required: false
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: relationshipType
 *         description: relationshipType
 *         in: formData
 *         required: true
 *       - name: priorityType
 *         description: priorityType
 *         in: formData
 *         required: true
 *       - name: isBuddy
 *         description: isBuddy
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Buddies has been added successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/chooseBuddies', auth.verifyToken, userController.chooseBuddies)

/**
 * @swagger
 * /api/v1/user/buddiesList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/buddiesList', auth.verifyToken, userController.buddiesList)

/**
 * @swagger
 * /api/v1/user/payment:
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
 *       - name: tokenId
 *         description: tokenId
 *         in: formData
 *         required: true
 *       - name: amount
 *         description: amount
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Transaction has been done successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/payment', auth.verifyToken, userController.payment)

/**
 * @swagger
 * /api/v1/user/buddyButton:
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
 *       - name: key
 *         description: key-single short/double short/long press
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: The SMS has been send to the buddies successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/buddyButton', auth.verifyToken, userController.buddyButton)

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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/notificationList', auth.verifyToken, userController.notificationList)

/**
 * @swagger
 * /api/v1/user/clearNotification:
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
 *       - name: notificationId
 *         description: notificationId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/clearNotification', auth.verifyToken, userController.clearNotification)

/**
 * @swagger
 * /api/v1/user/clearAllNotifications:
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
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/clearAllNotifications', auth.verifyToken, userController.clearAllNotifications)

/**
 * @swagger
 * /api/v1/user/logout:
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
 *         description: Logged out successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/logout', auth.verifyToken, userController.logout)



module.exports = router;