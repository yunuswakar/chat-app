const router = require('express').Router();
const martController = require('../../controllers/martController');
const auth = require('../../middleware/auth');




/**
 * @swagger
 * /api/v1/mart/marts:
 *   post:
 *     tags:
 *       - MART
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: martName
 *         description: martName
 *         in: formData
 *         required: true
 *       - name: parkingAvailability
 *         description: parkingAvailability-Yes/No
 *         in: formData
 *         required: true
 *       - name: pinCode
 *         description: pinCode
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
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true
 *       - name: radius
 *         description: radius
 *         in: formData
 *         required: true
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: true
 *       - name: long
 *         description: long
 *         in: formData
 *         required: true
 *       - name: images
 *         description: images
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Mart has been added successfully
 *       404:
 *         description: This mart name already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/marts', auth.verifyToken, martController.addMart)

/**
 * @swagger
 * /api/v1/mart/marts:
 *   put:
 *     tags:
 *       - MART
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
 *       - name: martName
 *         description: martName
 *         in: formData
 *         required: false
 *       - name: parkingAvailability
 *         description: parkingAvailability-Yes/No
 *         in: formData
 *         required: false
 *       - name: pinCode
 *         description: pinCode
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
 *       - name: radius
 *         description: radius
 *         in: formData
 *         required: false
 *       - name: lat
 *         description: lat
 *         in: formData
 *         required: false
 *       - name: long
 *         description: long
 *         in: formData
 *         required: false
 *       - name: images
 *         description: images
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

router.put('/marts', auth.verifyToken, martController.editMart)

/**
 * @swagger
 * /api/v1/mart/marts/{martId}:
 *   get:
 *     tags:
 *       - MART
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

router.get('/marts/:martId', auth.verifyToken, martController.viewMart)

/**
 * @swagger
 * /api/v1/mart/activeInactiveMart:
 *   post:
 *     tags:
 *       - MART
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
 *         description: Your Status has been changed successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/activeInactiveMart', auth.verifyToken, martController.activeInactiveMart)

/**
 * @swagger
 * /api/v1/mart/martList:
 *   post:
 *     tags:
 *       - MART
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
 *         description: Successfully blocked
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */


router.post('/martList', auth.verifyToken, martController.martList)


module.exports = router;