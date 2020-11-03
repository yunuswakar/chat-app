var router=require('express').Router();
const staticController= require('../../controller/staticController');
const auth= require('../../middleware/auth');


/**
 * @swagger
 * /api/v1/static/viewStaticContent:
 *   post:
 *     tags:
 *       - STATIC-CONTENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: type
 *         description: type
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewStaticContent', staticController.viewStaticContent)

/**
 * @swagger
 * /api/v1/static/editStaticContent:
 *   post:
 *     tags:
 *       - STATIC-CONTENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: staticId
 *         description: staticId
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: false
 *       - name: description
 *         description: description
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully Updated
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/editStaticContent',auth.verifyToken, staticController.editStaticContent)

/**
 * @swagger
 * /api/v1/static/staticContentList:
 *   get:
 *     tags:
 *       - STATIC-CONTENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Requested Data found
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/staticContentList', staticController.staticContentList)

module.exports=router;