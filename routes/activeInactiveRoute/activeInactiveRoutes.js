const router = require('express').Router();
const activeInactiveController= require('../../controllers/activeInactiveController');
const auth= require('../../middleware/auth');


/**
 * @swagger
 * /api/v1/activeInactive/activeInactiveManagement:
 *   post:
 *     tags:
 *       - ACTIVE_INACTIVE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true   
 *       - name: inactiveUser
 *         description: Duration time of inactive the end user (In Days)
 *         in: formData
 *         required: false 
 *       - name: inactiveRetailer
 *         description: Duration time of inactive the Retailer  (In Days)
 *         in: formDate
 *         required: false  
 *     responses:
 *       200:
 *         description: Data is saved successfully.
 *       500:
 *         description: Internal Server Error.
 */


router.post('/activeInactiveManagement', auth.verifyToken, activeInactiveController.activeInactiveManagement)
/**
 * @swagger
 * /api/v1/activeInactive/activeInactiveManagement:
 *   get:
 *     tags:
 *       - ACTIVE_INACTIVE
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
 *         description: Data is saved successfully.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/activeInactiveManagement',auth.verifyToken,activeInactiveController.getActiveData)



module.exports = router;