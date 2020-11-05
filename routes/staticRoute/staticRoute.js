const router= require('express').Router();
const auth= require('../../middleware/auth');
const staticController= require('../../controllers/staticController');

/**
 * @swagger
 * /api/v1/static/editStaticPage:
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
router.post('/editStaticPage' , staticController.editStaticPage)
/**
 * @swagger
 * /api/v1/static/viewStaticPage:
 *   get:
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
router.post('/viewStaticPage', staticController.viewStaticPage)

/**
 * @swagger
 * /api/v1/static/staticPageList:
 *   get:
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

router.get('/staticPageList' , staticController.staticPageList)


module.exports= router;
