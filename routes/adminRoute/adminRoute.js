const express = require('express')
const router = express.Router()
const adminController = require('../../controller/adminController');
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validation');

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
 *         description: Your login is successful.
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', validation.loginValidation, adminController.login)

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
 *     responses:
 *       200:
 *         description: A Password link has been send to your registered Email
 *       404:
 *         description: Provided email is not registered
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
 *     responses:
 *       200:
 *         description: Your password was Successfully Updated
 *       404:
 *         description: Requested data not found
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
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
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

router.post('/changePassword', auth.verifyToken, adminController.changePassword)

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
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/editProfile', auth.verifyToken, adminController.editProfile)

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
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: dashboard
 *         description: dashboard
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
 *       - name: animationManagement
 *         description: animationManagement
 *         in: formData
 *         required: false
 *       - name: podcastManagement
 *         description: podcastManagement
 *         in: formData
 *         required: false
 *       - name: mentalHealthCampaign
 *         description: mentalHealthCampaign
 *         in: formData
 *         required: false
 *       - name: medicalConditionKnowledge
 *         description: medicalConditionKnowledge
 *         in: formData
 *         required: false
 *       - name: contactUsManagement
 *         description: contactUsManagement
 *         in: formData
 *         required: false
 *       - name: subscriptionManagement
 *         description: subscriptionManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Sub-admin was created successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/addSubAdmin', auth.verifyToken, adminController.addSubAdmin)

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
 *       - name: subAdminId
 *         description: subAdminId
 *         in: formData
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
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
 *       - name: userManagement
 *         description: userManagement
 *         in: formData
 *         required: false
 *       - name: subAdminManagement
 *         description: subAdminManagement
 *         in: formData
 *         required: false
 *       - name: animationManagement
 *         description: animationManagement
 *         in: formData
 *         required: false
 *       - name: podcastManagement
 *         description: podcastManagement
 *         in: formData
 *         required: false
 *       - name: mentalHealthCampaign
 *         description: mentalHealthCampaign
 *         in: formData
 *         required: false
 *       - name: medicalConditionKnowledge
 *         description: medicalConditionKnowledge
 *         in: formData
 *         required: false
 *       - name: contactUsManagement
 *         description: contactUsManagement
 *         in: formData
 *         required: false
 *       - name: subscriptionManagement
 *         description: subscriptionManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/editSubAdmin', auth.verifyToken, adminController.editSubAdmin)

/**
 * @swagger
 * /api/v1/admin/viewSubAdmin/{subAdminId}:
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
 *       - name: subAdminId
 *         description: subAdminId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewSubAdmin/:subAdminId', auth.verifyToken, adminController.viewSubAdmin)

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
 *       - name: subAdminId
 *         description: subAdminId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockSubAdmin', auth.verifyToken, adminController.blockUnblockSubAdmin)

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
 *         description: Successfully deleted
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteSubAdmin', auth.verifyToken, adminController.deleteSubAdmin)

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
 *       - name: status
 *         description: status
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

router.post('/subAdminList', auth.verifyToken, adminController.subAdminList)

/**
 * @swagger
 * /api/v1/admin/addAnimationCategory:
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
 *       - name: categoryName
 *         description: Category name
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Category has been added successfully
 *       404:
 *         description: This category already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addAnimationCategory', auth.verifyToken, adminController.addAnimationCategory)

/**
 * @swagger
 * /api/v1/admin/viewAnimationCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewAnimationCategory', auth.verifyToken, adminController.viewAnimationCategory)

/**
 * @swagger
 * /api/v1/admin/editAnimationCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editAnimationCategory', auth.verifyToken, adminController.editAnimationCategory)

/**
 * @swagger
 * /api/v1/admin/blockUnblockAnimationCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockAnimationCategory', auth.verifyToken, adminController.blockUnblockAnimationCategory)

/**
 * @swagger
 * /api/v1/admin/deleteAnimationCategory:
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
 *       - name: categoryId
 *         description: categoryId
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

router.post('/deleteAnimationCategory', auth.verifyToken, adminController.deleteAnimationCategory)

/**
 * @swagger
 * /api/v1/admin/animationCategoryList:
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

router.post('/animationCategoryList', auth.verifyToken, adminController.animationCategoryList)

/**
 * @swagger
 * /api/v1/admin/getAllAnimationCategories:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllAnimationCategories', auth.verifyToken, adminController.getAllAnimationCategories)

/**
 * @swagger
 * /api/v1/admin/addAnimationEpisode:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: episodeName
 *         description: episodeName
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Episode has been added successfully
 *       404:
 *         description: This episode already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addAnimationEpisode', auth.verifyToken, adminController.addAnimationEpisode)

/**
 * @swagger
 * /api/v1/admin/viewAnimationEpisode/{episodeId}:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewAnimationEpisode/:episodeId', auth.verifyToken, adminController.viewAnimationEpisode)

/**
 * @swagger
 * /api/v1/admin/editAnimationEpisode:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
 *         required: true
 *       - name: episodeName
 *         description: episodeName
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editAnimationEpisode', auth.verifyToken, adminController.editAnimationEpisode)

/**
 * @swagger
 * /api/v1/admin/blockUnblockAnimationEpisode:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */


router.post('/blockUnblockAnimationEpisode', auth.verifyToken, adminController.blockUnblockAnimationEpisode)


/**
 * @swagger
 * /api/v1/admin/deleteAnimationEpisode:
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
 *       - name: episodeId
 *         description: episodeId
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

router.post('/deleteAnimationEpisode', auth.verifyToken, adminController.deleteAnimationEpisode)

/**
 * @swagger
 * /api/v1/admin/animationEpisodeList:
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

router.post('/animationEpisodeList', auth.verifyToken, adminController.animationEpisodeList)

/**
 * @swagger
 * /api/v1/admin/getAllAnimationEpisodes:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllAnimationEpisodes', auth.verifyToken, adminController.getAllAnimationEpisodes)

/**
 * @swagger
 * /api/v1/admin/addAnimationVideo:
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
 *       - name: categoryId
 *         description: Category IdcategoryId
 *         in: formData
 *         required: true
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
 *         required: true
 *       - name: videoName
 *         description: videoName
 *         in: formData
 *         required: true
 *       - name: video
 *         description: video
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Video has been added successfully
 *       404:
 *         description: This video already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addAnimationVideo', auth.verifyToken, adminController.addAnimationVideo)

/**
 * @swagger
 * /api/v1/admin/viewAnimationVideo/{videoId}:
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
 *       - name: videoId
 *         description: videoId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewAnimationVideo/:videoId', auth.verifyToken, adminController.viewAnimationVideo)

/**
 * @swagger
 * /api/v1/admin/editAnimationVideo:
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
 *       - name: videoId
 *         description: videoId
 *         in: formData
 *         required: true
 *       - name: videoName
 *         description: videoName
 *         in: formData
 *         required: false
 *       - name: video
 *         description: video
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: episodeId
 *         description: episodeId
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

router.post('/editAnimationVideo', auth.verifyToken, adminController.editAnimationVideo)

/**
 * @swagger
 * /api/v1/admin/blockUnblockAnimationVideo:
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
 *       - name: videoId
 *         description: videoId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockAnimationVideo', auth.verifyToken, adminController.blockUnblockAnimationVideo)

/**
 * @swagger
 * /api/v1/admin/deleteAnimationVideo:
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
 *       - name: videoId
 *         description: videoId
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

router.post('/deleteAnimationVideo', auth.verifyToken, adminController.deleteAnimationVideo)

/**
 * @swagger
 * /api/v1/admin/animationVideoList:
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

router.post('/animationVideoList', auth.verifyToken, adminController.animationVideoList)

/**
 * @swagger
 * /api/v1/admin/addPodcastCategory:
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
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Category has been added successfully
 *       404:
 *         description: This category already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addPodcastCategory', auth.verifyToken, adminController.addPodcastCategory)

/**
 * @swagger
 * /api/v1/admin/editPodcastCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editPodcastCategory', auth.verifyToken, adminController.editPodcastCategory)

/**
 * @swagger
 * /api/v1/admin/viewPodcastCategory/{categoryId}:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewPodcastCategory/:categoryId', auth.verifyToken, adminController.viewPodcastCategory)

/**
 * @swagger
 * /api/v1/admin/blockUnblockPodcastCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockPodcastCategory', auth.verifyToken, adminController.blockUnblockPodcastCategory)

/**
 * @swagger
 * /api/v1/admin/deletePodcastCategory:
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
 *       - name: categoryId
 *         description: categoryId
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

router.post('/deletePodcastCategory', auth.verifyToken, adminController.deletePodcastCategory)

/**
 * @swagger
 * /api/v1/admin/podcastCategoryList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/podcastCategoryList', auth.verifyToken, adminController.podcastCategoryList)

/**
 * @swagger
 * /api/v1/admin/getAllPodcastCategories:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllPodcastCategories', auth.verifyToken, adminController.getAllPodcastCategories)

/**
 * @swagger
 * /api/v1/admin/addPodcastEpisode:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: episodeName
 *         description: episodeName
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Episode has been added successfully
 *       404:
 *         description: This episode already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addPodcastEpisode', auth.verifyToken, adminController.addPodcastEpisode)

/**
 * @swagger
 * /api/v1/admin/viewPodcastEpisode/{episodeId}:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewPodcastEpisode/:episodeId', auth.verifyToken, adminController.viewPodcastEpisode)

/**
 * @swagger
 * /api/v1/admin/deletePodcastEpisode:
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
 *       - name: episodeId
 *         description: episodeId
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

router.post('/deletePodcastEpisode', auth.verifyToken, adminController.deletePodcastEpisode)

/**
 * @swagger
 * /api/v1/admin/editPodcastEpisode:
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
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
 *         required: true
 *       - name: episodeName
 *         description: episodeName
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editPodcastEpisode', auth.verifyToken, adminController.editPodcastEpisode)

/**
 * @swagger
 * /api/v1/admin/podcastEpisodeList:
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

router.post('/podcastEpisodeList', auth.verifyToken, adminController.podcastEpisodeList)

/**
 * @swagger
 * /api/v1/admin/getAllPodcastEpisodes:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllPodcastEpisodes', auth.verifyToken, adminController.getAllPodcastEpisodes)

/**
 * @swagger
 * /api/v1/admin/addPodcastAudio:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: episodeId
 *         description: episodeId
 *         in: formData
 *         required: true
 *       - name: audioName
 *         description: audioName
 *         in: formData
 *         required: true
 *       - name: audio
 *         description: audio
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Audio has been added successfully
 *       404:
 *         description: This video already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addPodcastAudio', auth.verifyToken, adminController.addPodcastAudio)

/**
 * @swagger
 * /api/v1/admin/editPodcastAudio:
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
 *       - name: audioId
 *         description: audioId
 *         in: formData
 *         required: true
 *       - name: audioName
 *         description: audioName
 *         in: formData
 *         required: false
 *       - name: audio
 *         description: audio
 *         in: formData
 *         required: false
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: episodeId
 *         description: episodeId
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

router.post('/editPodcastAudio', auth.verifyToken, adminController.editPodcastAudio)

/**
 * @swagger
 * /api/v1/admin/viewPodcastAudio/{audioId}:
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
 *       - name: audioId
 *         description: audioId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewPodcastAudio/:audioId', auth.verifyToken, adminController.viewPodcastAudio)

/**
 * @swagger
 * /api/v1/admin/blockUnblockPodcastAudio:
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
 *       - name: audioId
 *         description: audioId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockPodcastAudio', auth.verifyToken, adminController.blockUnblockPodcastAudio)

/**
 * @swagger
 * /api/v1/admin/deletePodcastAudio:
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
 *       - name: audioId
 *         description: audioId
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

router.post('/deletePodcastAudio', auth.verifyToken, adminController.deletePodcastAudio)

/**
 * @swagger
 * /api/v1/admin/podcastAudioList:
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

router.post('/podcastAudioList', auth.verifyToken, adminController.podcastAudioList)

/**
 * @swagger
 * /api/v1/admin/viewContactUs/{contactUsId}:
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
 *       - name: contactUsId
 *         description: contactUsId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewContactUs/:contactUsId', auth.verifyToken, adminController.viewContactUs)

/**
 * @swagger
 * /api/v1/admin/deleteContactUs:
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
 *       - name: contactUsId
 *         description: contactUsId
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

router.post('/deleteContactUs', auth.verifyToken, adminController.deleteContactUs)

/**
 * @swagger
 * /api/v1/admin/contactUsList:
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


router.post('/contactUsList', auth.verifyToken, adminController.contactUsList)

/**
 * @swagger
 * /api/v1/admin/addSubscription:
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
 *       - name: subscriptionName
 *         description: subscriptionName
 *         in: formData
 *         required: true 
 *       - name: currency
 *         description: currency
 *         in: formData
 *         required: true
 *       - name: cost
 *         description: cost
 *         in: formData
 *         required: true
 *       - name: validityPeriod
 *         description: validityPeriod
 *         in: formData
 *         required: true
 *       - name: type
 *         description: type- INDIVIDUAL/COMPANY
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Subscription has been added successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addSubscription', auth.verifyToken, adminController.addSubscription)

/**
 * @swagger
 * /api/v1/admin/editSubscription:
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
 *       - name: subscriptionId
 *         description: subscriptionId
 *         in: formData
 *         required: true
 *       - name: subscriptionName
 *         description: subscriptionName
 *         in: formData
 *         required: true
 *       - name: validityPeriod
 *         description: validityPeriod
 *         in: formData
 *         required: true
 *       - name: cost
 *         description: cost
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/editSubscription', auth.verifyToken, adminController.editSubscription)

/**
 * @swagger
 * /api/v1/admin/viewSubscription/{subscriptionId}:
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
 *       - name: subscriptionId
 *         description: subscriptionId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewSubscription/:subscriptionId', auth.verifyToken, adminController.viewSubscription)

/**
 * @swagger
 * /api/v1/admin/deleteSubscription:
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
 *       - name: subscriptionId
 *         description: subscriptionId
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

router.post('/deleteSubscription', auth.verifyToken, adminController.deleteSubscription)

/**
 * @swagger
 * /api/v1/admin/subscriptionList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/subscriptionList', auth.verifyToken, adminController.subscriptionList)

/**
 * @swagger
 * /api/v1/admin/addMentalHealthCategory:
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
 *       - name: categoryName
 *         description: Category name
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Category has been added successfully
 *       404:
 *         description: This category already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addMentalHealthCategory', auth.verifyToken, adminController.addMentalHealthCategory)

/**
 * @swagger
 * /api/v1/admin/viewMentalHealthCategory/{categoryId}:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewMentalHealthCategory/:categoryId', auth.verifyToken, adminController.viewMentalHealthCategory)

/**
 * @swagger
 * /api/v1/admin/editMentalHealthCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editMentalHealthCategory', auth.verifyToken, adminController.editMentalHealthCategory)

/**
 * @swagger
 * /api/v1/admin/blockUnblockMentalHealthCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockMentalHealthCategory', auth.verifyToken, adminController.blockUnblockMentalHealthCategory)

/**
 * @swagger
 * /api/v1/admin/deleteMentalHealthCategory:
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
 *       - name: categoryId
 *         description: categoryId
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

router.post('/deleteMentalHealthCategory', auth.verifyToken, adminController.deleteMentalHealthCategory)

/**
 * @swagger
 * /api/v1/admin/mentalHealthCategoryList:
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

router.post('/mentalHealthCategoryList', auth.verifyToken, adminController.mentalHealthCategoryList)

/**
 * @swagger
 * /api/v1/admin/getAllMentalHealthCategories:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllMentalHealthCategories', auth.verifyToken, adminController.getAllMentalHealthCategories)

/**
 * @swagger
 * /api/v1/admin/addMentalHealth:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: subjectName
 *         description: subjectName
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Mental health campaign has been added successfully
 *       404:
 *         description: This subject name already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addMentalHealth', auth.verifyToken, adminController.addMentalHealth)

/**
 * @swagger
 * /api/v1/admin/viewMentalHealth/{healthId}:
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
 *       - name: healthId
 *         description: healthId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewMentalHealth/:healthId', auth.verifyToken, adminController.viewMentalHealth)

/**
 * @swagger
 * /api/v1/admin/editMentalHealth:
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
 *       - name: healthId
 *         description: healthId
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: subjectName
 *         description: subjectName
 *         in: formData
 *         required: false
 *       - name: description
 *         description: description
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

router.post('/editMentalHealth', auth.verifyToken, adminController.editMentalHealth)

/**
 * @swagger
 * /api/v1/admin/blockUnblockMentalHealth:
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
 *       - name: healthId
 *         description: healthId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockMentalHealth', auth.verifyToken, adminController.blockUnblockMentalHealth)

/**
 * @swagger
 * /api/v1/admin/deleteMentalHealth:
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
 *       - name: healthId
 *         description: healthId
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

router.post('/deleteMentalHealth', auth.verifyToken, adminController.deleteMentalHealth)

/**
 * @swagger
 * /api/v1/admin/mentalHealthList:
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

router.post('/mentalHealthList', auth.verifyToken, adminController.mentalHealthList)

/**
 * @swagger
 * /api/v1/admin/addMedicalCategory:
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
 *       - name: categoryName
 *         description: Category name
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Category has been added successfully
 *       404:
 *         description: This category already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addMedicalCategory', auth.verifyToken, adminController.addMedicalCategory)

/**
 * @swagger
 * /api/v1/admin/viewMedicalCategory/{categoryId}:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewMedicalCategory/:categoryId', auth.verifyToken, adminController.viewMedicalCategory)

/**
 * @swagger
 * /api/v1/admin/editMedicalCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editMedicalCategory', auth.verifyToken, adminController.editMedicalCategory)

/**
 * @swagger
 * /api/v1/admin/blockUnblockMedicalCategory:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockMedicalCategory', auth.verifyToken, adminController.blockUnblockMedicalCategory)

/**
 * @swagger
 * /api/v1/admin/deleteMedicalCategory:
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
 *       - name: categoryId
 *         description: categoryId
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

router.post('/deleteMedicalCategory', auth.verifyToken, adminController.deleteMedicalCategory)

/**
 * @swagger
 * /api/v1/admin/medicalCategoryList:
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

router.post('/medicalCategoryList', auth.verifyToken, adminController.medicalCategoryList)

/**
 * @swagger
 * /api/v1/admin/getAllMedicalCategories:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/getAllMedicalCategories', auth.verifyToken, adminController.getAllMedicalCategories)

/**
 * @swagger
 * /api/v1/admin/addMedicalCondition:
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
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: subjectName
 *         description: subjectName
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Medical condition knowledge has been added successfully
 *       404:
 *         description: This subject name already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addMedicalCondition', auth.verifyToken, adminController.addMedicalCondition)

/**
 * @swagger
 * /api/v1/admin/viewMedicalCondition/{medicalId}:
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
 *       - name: medicalId
 *         description: medicalId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewMedicalCondition/:medicalId', auth.verifyToken, adminController.viewMedicalCondition)

/**
 * @swagger
 * /api/v1/admin/editMedicalCondition:
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
 *       - name: medicalId
 *         description: medicalId
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: subjectName
 *         description: subjectName
 *         in: formData
 *         required: false
 *       - name: description
 *         description: description
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

router.post('/editMedicalCondition', auth.verifyToken, adminController.editMedicalCondition)

/**
 * @swagger
 * /api/v1/admin/blockUnblockMedicalCondition:
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
 *       - name: medicalId
 *         description: medicalId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockMedicalCondition', auth.verifyToken, adminController.blockUnblockMedicalCondition)

/**
 * @swagger
 * /api/v1/admin/deleteMedicalCondition:
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
 *       - name: medicalId
 *         description: medicalId
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

router.post('/deleteMedicalCondition', auth.verifyToken, adminController.deleteMedicalCondition)

/**
 * @swagger
 * /api/v1/admin/medicalConditionList:
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

router.post('/medicalConditionList', auth.verifyToken, adminController.medicalConditionList)

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
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewUser', auth.verifyToken, adminController.viewUser)

/**
 * @swagger
 * /api/v1/admin/viewCompany:
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
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewCompany', auth.verifyToken, adminController.viewCompany)

/**
 * @swagger
 * /api/v1/admin/blockUnblockUser:
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
 *         description: Your status has been changed successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockUser', auth.verifyToken, adminController.blockUnblockUser)

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
 *         description: Successfully deleted
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteUser', auth.verifyToken, adminController.deleteUser)

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
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: userType
 *         description: userType-INDIVIDUAL/COMPANY
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
 *         description: Successfully fetched user list
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/userList', auth.verifyToken, adminController.userList)

/**
 * @swagger
 * /api/v1/admin/viewTransaction/{transactionId}:
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
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewTransaction/:transactionId', auth.verifyToken, adminController.viewTransaction)

/**
 * @swagger
 * /api/v1/admin/deleteTransaction:
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
 *       - name: transactionId
 *         description: transactionId
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

router.post('/deleteTransaction', auth.verifyToken, adminController.deleteTransaction)

/**
 * @swagger
 * /api/v1/admin/transactionList:
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
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/transactionList', auth.verifyToken, adminController.transactionList)




module.exports = router;