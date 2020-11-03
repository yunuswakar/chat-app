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
 * /api/v1/admin/supportList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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
 *         description: Your login is successful
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/supportList',adminController.supportList)
/**
 * @swagger
 * /api/v1/admin/viewSupport/{supportId}:
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
 *       - name: supportId
 *         description: supportId
 *         in: path
 *         required: true
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
router.get('/viewSupport/:supportId',adminController.viewSupport)
router.put('/editProfile',auth.verifyToken,adminController.editProfile)
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

router.get('/getProfile',auth.verifyToken,adminController.getProfile)
/**
 * @swagger
 * /api/v1/admin/addCustomer:
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
 *       - name: email
 *         description: email
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
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: true
 *       - name: birthday
 *         description: birthday
 *         in: formData
 *         required: true
 *       - name: gender
 *         description: gender
 *         in: formData
 *         required: true
 *       - name: address1
 *         description: address1
 *         in: formData
 *         required: true
 *       - name: address2
 *         description: address2
 *         in: formData
 *         required: true
 *       - name: state
 *         description: state
 *         in: formData
 *         required: true
 *       - name: city
 *         description: city
 *         in: formData
 *         required: true
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
router.post('/addCustomer',auth.verifyToken,adminController.addCustomer)
/**
 * @swagger
 * /api/v1/admin/editCustomer:
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
 *       - name: userId
 *         description: userId
 *         in: formData
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
 *       - name: password
 *         description: password
 *         in: formData
 *         required: false
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: false
 *       - name: phoneNumber
 *         description: phoneNumber
 *         in: formData
 *         required: false
 *       - name: birthday
 *         description: birthday
 *         in: formData
 *         required: false
 *       - name: gender
 *         description: gender
 *         in: formData
 *         required: false
 *       - name: address1
 *         description: address1
 *         in: formData
 *         required: false
 *       - name: address2
 *         description: address2
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
router.put('/editCustomer',auth.verifyToken,adminController.editCustomer)
/**
 * @swagger
 * /api/v1/admin/viewCustomer/{userId}:
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
router.get('/viewCustomer/:userId',auth.verifyToken,adminController.viewCustomer)
/**
 * @swagger
 * /api/v1/admin/customerList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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
 *         description: Your password is updated successfully.
 *       404:
 *         description: This user does not exist.
 *       402:
 *         description : Password not matched. 
 *       500:
 *         description: Internal Server Error
 */
router.post('/customerList',adminController.customerList)
/**
 * @swagger
 * /api/v1/admin/deleteCustomer/{userId}:
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
 *       - name: userId
 *         description: userId
 *         in: path
 *         required: false
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
router.delete('/deleteCustomer/:userId',auth.verifyToken,adminController.deleteCustomer)
/**
 * @swagger
 * /api/v1/admin/chnagePassword:
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
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
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
router.post('/chnagePassword',auth.verifyToken,adminController.changePassword)
/**
 * @swagger
 * /api/v1/admin/dashboard:
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
router.post('/dashboard',auth.verifyToken,adminController.dashboard)
router.get('/stateList',adminController.getStatesList)
router.post('/cityList',adminController.getCityList)
/**
 * @swagger
 * /api/v1/admin/graphData:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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
router.get('/graphData',adminController.getGraphData)
router.get('/getCities',adminController.getCities)
router.get('/getSomeGraphData',adminController.getSomeGraphData)
module.exports = router;
