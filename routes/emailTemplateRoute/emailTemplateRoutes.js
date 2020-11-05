const router = require('express').Router();
const emailTemplateController = require('../../controllers/emailTemplateController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/emailTemplate/emailTemplates:
 *   post:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subject
 *         description: subject
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: time
 *         description: time
 *         in: formData
 *         required: false
 *       - name: day
 *         description: day
 *         in: formData
 *         required: false
 *       - name: radius
 *         description: radius
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: header
 *         description: header
 *         in: formData
 *         required: false
 *       - name: footer
 *         description: footer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */


router.post('/emailTemplates', emailTemplateController.addEmailTemplate)

/**
 * @swagger
 * /api/v1/emailTemplate/emailTemplates/{templateId}:
 *   get:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subject
 *         description: subject
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: time
 *         description: time
 *         in: formData
 *         required: false
 *       - name: day
 *         description: day
 *         in: formData
 *         required: false
 *       - name: radius
 *         description: radius
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */

router.get('/emailTemplates/:templateId', emailTemplateController.viewEmailTemplate)
/**
 * @swagger
 * /api/v1/emailTemplate/emailTemplates:
 *   put:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: templateId
 *         description: templateId
 *         in: formData
 *         required: true
 *       - name: subject
 *         description: subject
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: time
 *         description: time
 *         in: formData
 *         required: false
 *       - name: day
 *         description: day
 *         in: formData
 *         required: false
 *       - name: radius
 *         description: radius
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: header
 *         description: header
 *         in: formData
 *         required: false
 *       - name: footer
 *         description: footer
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */
router.put('/emailTemplates', emailTemplateController.editEmailTemplate)
/**
 * @swagger
 * /api/v1/emailTemplate/deleteEmailTemplates:
 *   post:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: templateId
 *         description: templateId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteEmailTemplates', auth.verifyToken, emailTemplateController.deleteEmailTemplate)
/**
 * @swagger
 * /api/v1/emailTemplate/emailTemplatesList:
 *   post:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/emailTemplatesList', emailTemplateController.emailTemplateList)
router.post('/selectEmailTemplate',emailTemplateController.selectEmailTemplate)
/**
 * @swagger
 * /api/v1/emailTemplate/unsubscribe/{userId}:
 *   get:
 *     tags:
 *       - EMAIL_TEMPLATE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Weekly email template has been added successfully.
 *       404:
 *         description: This subject already exists.
 *       500:
 *         description: Internal Server Error
 */
router.get("/unsubscribe/:userId",emailTemplateController.unsubscribe)

module.exports = router;