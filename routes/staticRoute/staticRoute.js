var router=require('express').Router();
const staticController= require('../../controllers/staticController');
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
 *       - name: staticId
 *         description: staticId
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
 *     description: edit static content by admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: formData
 *         required: true
 *       - name: staticId
 *         description: staticId
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/editStaticContent', auth.verifyToken,staticController.editStaticContent)

/**
 * @swagger
 * /api/v1/static/staticContentList:
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
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/staticContentList', auth.verifyToken,staticController.staticContentList)
/**
 * @swagger
 * /api/v1/static/editSupport:
 *   post:
 *     tags:
 *       - STATIC-CONTENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: supportId
 *         description: supportId
 *         in: formData
 *         required: false
 *       - name: phone
 *         description: phone
 *         in: formData
 *         required: false
 *       - name: phoneStatus
 *         description: phoneStatus
 *         in: formData
 *         required: false
 *       - name: emailStatus
 *         description: emailStatus
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: liveChat
 *         description: liveChat
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Requested Data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/editSupport',staticController.editSupport)
router.get('/faqList',staticController.faqList)
module.exports =router;