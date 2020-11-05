const router = require('express').Router();
const configController = require('../../controllers/configurationController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/configuration/configurations:
 *   post:
 *     tags:
 *       - CONFIGURATION
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: configType
 *         description: configType
 *         in: formData
 *         required: true
 *       - name: radiusEndUser
 *         description: radiusEndUser
 *         in: formData
 *         required: false
 *       - name: isNotification
 *         description: isNotification
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: brandName
 *         description: brandName
 *         in: formData
 *         required: false
 *       - name: retailerSignupAmount
 *         description: retailerSignupAmount
 *         in: formData
 *         required: false
 *       - name: gstOnSignup
 *         description: gstOnSignup
 *         in: formData
 *         required: false
 *       - name: signupCredits
 *         description: signupCredits
 *         in: formData
 *         required: false
 *       - name: radiusRetailer
 *         description: radiusRetailer
 *         in: formData
 *         required: false
 *       - name: earnedCredits
 *         description: earnedCredits
 *         in: formData
 *         required: false
 *       - name: unitCreditCost
 *         description: unitCreditCost
 *         in: formData
 *         required: false
 *     
 *     responses:
 *       200:
 *         description: Data is saved successfully.
 *       500:
 *         description: Internal Server Error
 */

router.post('/configurations', configController.addConfiguration)

/**
 * @swagger
 * /api/v1/configuration/configurations/{configType}:
 *   get:
 *     tags:
 *       - CONFIGURATION
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: configType
 *         description: configType
 *         in: path
 *         required: true
 *     
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.     
 *       500:
 *         description: Internal Server Error
 */

router.get('/configurations/:configType', auth.verifyToken, configController.viewConfiguration)

module.exports = router;