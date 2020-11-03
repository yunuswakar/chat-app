const express = require('express');
const router = express.Router()
const webController = require('../../controller/webController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/web/companySignup:
 *   post:
 *     tags:
 *       - WEBSITE
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
 *       - name: universityName
 *         description: universityName
 *         in: formData
 *         required: true
 *       - name: universityEmail
 *         description: universityEmail
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
 *     responses:
 *       200:
 *         description: Thanks, You have successfully signed up
 *       404:
 *         description: This Email/Mobile number already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/companySignup', webController.companySignup)

/**
 * @swagger
 * /api/v1/web/otpVerify:
 *   post:
 *     tags:
 *       - WEBSITE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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

router.post('/otpVerify',webController.otpVerify)

/**
 * @swagger
 * /api/v1/web/resendOTP:
 *   post:
 *     tags:
 *       - WEBSITE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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

router.post('/resendOTP',webController.resendOTP)

/**
 * @swagger
 * /api/v1/web/resetPassword:
 *   post:
 *     tags:
 *       - WEBSITE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password has been updated successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/resetPassword', webController.resetPassword)

/**
 * @swagger
 * /api/v1/web/login:
 *   post:
 *     tags:
 *       - WEBSITE
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

router.post('/login', webController.login)

/**
 * @swagger
 * /api/v1/web/chooseCompanyPlan:
 *   post:
 *     tags:
 *       - WEBSITE
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
 *         description: Membership plan has been added successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/chooseCompanyPlan', auth.verifyToken, webController.chooseCompanyPlan)

/**
* @swagger
* /api/v1/web/companyPayment:
*   post:
*     tags:
*       - WEBSITE
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: cardNumber
*         description: cardNumber
*         in: formData
*         required: true
*       - name: exp_month
*         description: exp_month
*         in: formData
*         required: true
*       - name: exp_year
*         description: exp_year
*         in: formData
*         required: true
*       - name: cvc
*         description: cvc
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

router.post('/companyPayment', auth.verifyToken, webController.companyPayment)

/**
* @swagger
* /api/v1/web/companyUserCheck:
*   post:
*     tags:
*       - WEBSITE
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
*         description: OK. You can proceed further
*       404:
*         description: Already exists
*       500:
*         description: Internal Server Error
*/

router.post('/companyUserCheck', auth.verifyToken, webController.companyUserCheck)

/**
 * @swagger
 * /api/v1/web/addCompanyUser:
 *  post:
 *    tags:
 *       - WEBSITE
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - in: body
 *         name: companyUser
 *         description: Add company user.
 *         schema:
 *           type: object
 *           required:
 *             - companyUsers
 *           properties:
 *             companyUsers:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 countryCode:
 *                   type: string
 *                 mobileNumber:
 *                   type: string
 *    responses:
 *       200:
 *         description: Successfully updated.
 *       404:
 *         description: Already exists.
 *       500:
 *         description: Internal Server Error.   
 */

router.post('/addCompanyUser', auth.verifyToken, webController.addCompanyUser)

/**
 * @swagger
 * /api/v1/web/viewCompanyUser/{companyId}:
 *   get:
 *     tags:
 *       - WEBSITE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: companyId
 *         description: companyId
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

router.get('/viewCompanyUser/:companyId', auth.verifyToken, webController.viewCompanyUser)

/**
* @swagger
* /api/v1/web/editCompanyUser:
*   put:
*     tags:
*       - WEBSITE
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: companyId
*         description: companyId
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
*     responses:
*       200:
*         description: Successfully updated
*       404:
*         description: This user does not exist
*       500:
*         description: Internal Server Error
*/

router.put('/editCompanyUser', auth.verifyToken, webController.editCompanyUser)

/**
 * @swagger
 * /api/v1/web/deleteCompanyUser/{companyId}:
 *   delete:
 *     tags:
 *       - WEBSITE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: companyId
 *         description: companyId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteCompanyUser/:companyId', auth.verifyToken, webController.deleteCompanyUser)

/**
 * @swagger
 * /api/v1/web/companyUserList:
 *   post:
 *     tags:
 *       - WEBSITE
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

router.post('/companyUserList', auth.verifyToken, webController.companyUserList)

/**
 * @swagger
 * /api/v1/web/contactUs:
 *   post:
 *     tags:
 *       - WEBSITE
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
 *       - name: subject
 *         description: subject
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

router.post('/contactUs',webController.contactUs)


module.exports = router;