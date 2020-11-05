const router = require('express').Router();
const faqController = require('../../controllers/faqController');
const auth = require('../../middleware/auth');



/**
 * @swagger
 * /api/v1/faq/addFaq:
 *   post:
 *     tags:
 *       - FAQ
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: question   
 *         description: question
 *         in: formData
 *         required: true
 *       - name: answer
 *         description: answer
 *         in: formData
 *         required: true *       
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/addFaq', auth.verifyToken, faqController.addFaq);

/**
 * @swagger
 * /api/v1/faq/viewFaq/{faqId}:
 *   get:
 *     tags:
 *       - FAQ
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: faqId
 *         description: faqId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewFaq/:id', auth.verifyToken, faqController.viewFaq);

/**
 * @swagger
 * /api/v1/faq/deleteFaq:
 *   post:
 *     tags:
 *       - FAQ
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token  
 *         description: token
 *         in: header
 *         required: true
 *       - name: faqId
 *         description: faqId
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

router.delete('/deleteFaq', auth.verifyToken, faqController.deleteFaq);
/**
 * @swagger
 * /api/v1/faq/editFaq:
 *   post:
 *     tags:
 *       - FAQ
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: faqId
 *         description: faqId
 *         in: formData
 *         required: true
 *       - name: question   
 *         description: question
 *         in: formData
 *         required: false
 *       - name: answer
 *         description: answer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/editFaq', auth.verifyToken, faqController.editFaq);

/**
 * @swagger
 * /api/v1/faq/faqList:
 *   post:
 *     tags:
 *       - FAQ
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: pageNumber
 *         description: pageNumber
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/faqList', auth.verifyToken, faqController.faqList);


module.exports = router;
