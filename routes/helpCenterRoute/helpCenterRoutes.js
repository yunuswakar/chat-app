const router = require('express').Router();
const helpCenterController = require('../../controllers/helpCenterController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/helpCenter/helpCenter:
 *   post:
 *     tags:
 *       - HELP-CENTER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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

router.post('/helpCenter', helpCenterController.helpCenter)

/**
 * @swagger
 * /api/v1/helpCenter/viewHelpCenter/{_id}:
 *   get:
 *     tags:
 *       - HELP-CENTER
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

router.get('/viewHelpCenter/:_id', auth.verifyToken, helpCenterController.viewHelpCenter)

/**
 * @swagger
 * /api/v1/helpCenter/helpCenter:
 *   delete:
 *     tags:
 *       - HELP-CENTER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: helpId
 *         description: helpId
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

router.delete('/helpCenter', auth.verifyToken, helpCenterController.deleteHelpCenter)

/**
 * @swagger
 * /api/v1/helpCenter/helpCenterList:
 *   post:
 *     tags:
 *       - HELP-CENTER
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
 *       - name: fromDate
 *         description: fromDate
 *         in: formData
 *         required: false
 *       - name: toDate
 *         description: toDate
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

router.post('/helpCenterList', auth.verifyToken, helpCenterController.helpCenterList)



module.exports = router;