const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController');
const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth')


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
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: A Otp has been sent to your registered ID.
 *       404:
 *         description: Provided mobileNumber is not registered.
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
 * /api/v1/admin/addUser:
 *   post:
 *     tags:
 *        - user management
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
 *       - name: userName
 *         description: userName
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *       - name: DOB
 *         description: date of birth
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

router.post('/addUser', auth.verifyToken,adminController.addUser)


/**
 * @swagger
 * /api/v1/admin/editUser:
 *   post:
 *     tags:
 *        - user management
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
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: userName
 *         description: userName
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: DOB
 *         description: date of birth
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editUser', auth.verifyToken,adminController.editUser)

/**
 * @swagger
 * /api/v1/admin/listOfUser:
 *   post:
 *     tags:
 *        - user management
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
 *       - name: search
 *         description: search by name
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfUser',auth.verifyToken,adminController.listOfUser)

/**
 * @swagger
 * /api/v1/admin/deleteAndBlockUser:
 *   post:
 *     tags:
 *        - user management
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
 *       - name: status
 *         description: user status
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteAndBlockUser',auth.verifyToken,adminController.deleteAndBlockUser)


/**
 * @swagger
 * /api/v1/admin/addCommunity:
 *   post:
 *     tags:
 *        - community management
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
 *       - name: communityName
 *         description: communityName
 *         in: formData
 *         required: true
 *       - name: link
 *         description: link
 *         in: formData
 *         required: true
 *       - name: communityType
 *         description: communityType
 *         in: formData
 *         required: true
 *       - name: communityDescription
 *         description: communityDescription
 *         in: formData
 *         required: true
 *       - name: coverPageImage
 *         description: coverPageImage
 *         in: formData
 *         required: true
 *       - name: image
 *         description: logoImage
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
router.post('/addCommunity',auth.verifyToken,adminController.addCommunity)



/**
 * @swagger
 * /api/v1/admin/listOfCommunity:
 *   post:
 *     tags:
 *        - community management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: communityId
 *         description: userId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search by name
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/listOfCommunity',auth.verifyToken,adminController.listOfCommunity)


/**
 * @swagger
 * /api/v1/admin/editCommunity:
 *   post:
 *     tags:
 *        - community management
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
 *         required: false
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: false
 *       - name: communityName
 *         description: communityName
 *         in: formData
 *         required: false
 *       - name: link
 *         description: link
 *         in: formData
 *         required: false
 *       - name: communityType
 *         description: communityType
 *         in: formData
 *         required: false
 *       - name: communityDescription
 *         description: communityDescription
 *         in: formData
 *         required: false
 *       - name: coverPageImage
 *         description: coverPageImage
 *         in: formData
 *         required: false
 *       - name: image
 *         description: logoImage
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editCommunity',auth.verifyToken,adminController.editCommunity)
/**
 * @swagger
 * /api/v1/admin/deleteAndBlockCommunity:
 *   post:
 *     tags:
 *        - community management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: communityId
 *         description: communityId
 *         in: formData
 *         required: false
 *       - name: status
 *         description: user status
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteAndBlockCommunity',auth.verifyToken,adminController.deleteAndBlockCommunity)


/**
 * @swagger
 * /api/v1/admin/addCategory:
 *   post:
 *     tags:
 *        - category management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: true
 *       - name: addedOn
 *         description: addedOn
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Data is saved successfully.
 *       404:
 *         description: Requested data not found.
 *       409:
 *         description: This category name already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addCategory',adminController.addCategory)

/**
 * @swagger
 * /api/v1/admin/editCategory:
 *   post:
 *     tags:
 *        - category management
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
 *         required: false
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 
 
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editCategory',auth.verifyToken,adminController.editCategory)

/**
 * @swagger
 * /api/v1/admin/listOfCategory:
 *   post:
 *     tags:
 *        - category management
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
 *         required: false
 *       - name: search
 *         description: search by name
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/listOfCategory',auth.verifyToken,adminController.listOfCategory)
/**
 * @swagger
 * /api/v1/admin/deleteAndBlockCategory:
 *   post:
 *     tags:
 *        - category management
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
 *         required: false
 *       - name: status
 *         description: user status
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */



router.post('/deleteAndBlockCategory',auth.verifyToken,adminController.deleteAndBlockCategory)

/**
 * @swagger
 * /api/v1/admin/listOfPublistCategory:
 *   get:
 *     tags:
 *        - category management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:


 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.get('/listOfPublistCategory',adminController.listOfPublistCategory)

/**
 * @swagger
 * /api/v1/admin/publishCategory:
 *   post:
 *     tags:
 *        - category management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId[]
 *         description: categoryId[]
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/publishCategory',auth.verifyToken,adminController.publishCategory)


/**
 * @swagger
 * /api/v1/admin/addEvent:
 *   post:
 *     tags:
 *        - event management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: eventName
 *         description: eventName
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: eventType
 *         description: eventType
 *         in: formData
 *         required: true
 *       - name: dateOfEvent
 *         description: dateOfEvent
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
router.post('/addEvent',auth.verifyToken,adminController.addEvent)

/**
 * @swagger
 * /api/v1/admin/listOfEvent:
 *   post:
 *     tags:
 *        - event management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: eventId
 *         description: eventId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search by name
 *         in: formData
 *         required: false
 *       - name: eventType
 *         description: eventType
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfEvent',auth.verifyToken,adminController.listOfEvent)


/**
 * @swagger
 * /api/v1/admin/editEvent:
 *   post:
 *     tags:
 *        - event management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: eventName
 *         description: eventName
 *         in: formData
 *         required: false
 *       - name: eventId
 *         description: eventId
 *         in: formData
 *         required: false
 *       - name: eventType
 *         description: eventType
 *         in: formData
 *         required: false
 *       - name: dateOfEvent
 *         description: dateOfEvent
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editEvent',auth.verifyToken,adminController.editEvent)

/**
 * @swagger
 * /api/v1/admin/deleteEvent:
 *   post:
 *     tags:
 *        - event management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: eventId
 *         description: eventId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteEvent',auth.verifyToken,adminController.deleteEvent)

router.post('/addTransaction',auth.verifyToken,adminController.addTransaction)


/**
 * @swagger
 * /api/v1/admin/listOfTransaction:
 *   post:
 *     tags:
 *        - transaction management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: paymentId
 *         description: paymentId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search by name
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfTransaction',auth.verifyToken,adminController.listOfTransaction)

/**
 * @swagger
 * /api/v1/admin/deleteTransaction:
 *   post:
 *     tags:
 *       - transaction management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: paymentId
 *         description: paymentId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteTransaction',auth.verifyToken,adminController.deleteTransaction)


router.post('/addReport',auth.verifyToken,adminController.addReport)

/**
 * @swagger
 * /api/v1/admin/listOfReport:
 *   post:
 *     tags:
 *        - report management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: reportId
 *         description: reportId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search by reportedBy
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfReport',auth.verifyToken,adminController.listOfReport)
/**
 * @swagger
 * /api/v1/admin/deleteReport:
 *   post:
 *     tags:
 *        - report management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: reportId
 *         description: reportId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteReport',auth.verifyToken,adminController.deleteReport)




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
 * /api/v1/admin/otpVerify:
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
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: otp verify succefully
 *       404:
 *         description: Provided number  is not registered.
 *       500:
 *         description: Internal Server Error
 */
router.post('/otpVerify',adminController.otpVerify)


/**
 * @swagger
 * /api/v1/admin/editProfileAdmin:
 *   post:
 *     tags:
 *        - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: adminId
 *         description: adminId
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: userName
 *         description: userName
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: DOB
 *         description: date of birth
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data updated sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/editProfileAdmin', auth.verifyToken,adminController.editProfileAdmin)

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
 * /api/v1/admin/addSubAdmin:
 *   post:
 *     tags:
 *        - subadmin management
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
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: categoryManagement
 *         description: categoryManagement
 *         in: formData
 *         required: false
 *       - name: subAdminManagement
 *         description: subAdminManagement
 *         in: formData
 *         required: false
 *       - name: contentPostManagement
 *         description: contentPostManagement
 *         in: formData
 *         required: false
 *       - name: userManagement
 *         description: userManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: communityManagement
 *         description: communityManagement
 *         in: formData
 *         required: false
 *       - name: reportManagement
 *         description: reportManagement
 *         in: formData
 *         required: false
 *       - name: eventManagement
 *         description: eventManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
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
router.post('/addSubAdmin', auth.verifyToken, adminController.addSubAdmin)

/**
 * @swagger
 * /api/v1/admin/editSubAdmin:
 *   post:
 *     tags:
 *        - subadmin management
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
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: name
 *         description: name
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
 *         in: formData
 *         required: false
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: false
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: categoryManagement
 *         description: categoryManagement
 *         in: formData
 *         required: false
 *       - name: subAdminManagement
 *         description: subAdminManagement
 *         in: formData
 *         required: false
 *       - name: contentPostManagement
 *         description: contentPostManagement
 *         in: formData
 *         required: false
 *       - name: userManagement
 *         description: userManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: communityManagement
 *         description: communityManagement
 *         in: formData
 *         required: false
 *       - name: reportManagement
 *         description: reportManagement
 *         in: formData
 *         required: false
 *       - name: eventManagement
 *         description: eventManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
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

router.post('/editSubAdmin', auth.verifyToken, adminController.editSubAdmin)
/**
 * @swagger
 * /api/v1/admin/listOfSubAdmin:
 *   post:
 *     tags:
 *        - subadmin management
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
 *         required: false
 *       - name: search
 *         description: search by name/email
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfSubAdmin', auth.verifyToken, adminController.listOfSubAdmin)
/**
 * @swagger
 * /api/v1/admin/deleteSubAdmin:
 *   post:
 *     tags:
 *        - subadmin management
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
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteSubAdmin', auth.verifyToken, adminController.deleteSubAdmin)

/**
 * @swagger
 * /api/v1/admin/addContent:
 *   post:
 *     tags:
 *        - content post management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: true
 *       - name: content
 *         description: content
 *         in: formData
 *         required: true
 *       - name: postedBy
 *         description: postedBy
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
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
router.post('/addContent', auth.verifyToken, adminController.addContent)
/**
 * @swagger
 * /api/v1/admin/editContent:
 *   post:
 *     tags:
 *        - content post management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: contentId
 *         description: contentId
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: false
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
 *       - name: content
 *         description: content
 *         in: formData
 *         required: false
 *       - name: postedBy
 *         description: postedBy
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
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

router.post('/editContent', auth.verifyToken, adminController.editContent)
/**
 * @swagger
 * /api/v1/admin/listOfContent:
 *   post:
 *     tags:
 *        - content post management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: contentId
 *         description: contentId
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search by categoryName/title
 *         in: formData
 *         required: false

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data found sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/listOfContent', auth.verifyToken, adminController.listOfContent)
/**
 * @swagger
 * /api/v1/admin/deleteContent:
 *   post:
 *     tags:
 *        - content post management
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: contentId
 *         description: contentId
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Data deleted sucessfully.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteContent', auth.verifyToken, adminController.deleteContent)






module.exports = router;   
