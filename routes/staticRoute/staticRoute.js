const router= require('express').Router();
const auth= require('../../middleware/auth');
const staticController= require('../../controllers/staticController');

/**
 * @swagger
 * /api/v1/static/editStaticPage:
 *   put:
 *     tags:
 *       - STATIC
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: staticId 
 *         description: staticId
 *         in: formData
 *         required: false
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
 *         description: Role has been added successfully.
 *       404:
 *         description: This role already exists.
 *       500:
 *         description: Internal Server Error
 */
router.put('/editStaticPage' , staticController.editStaticPage)
/**
 * @swagger
 * /api/v1/static/viewStaticPage/{staticId}:
 *   get:
 *     tags:
 *       - STATIC
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: staticId
 *         description: staticId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: view  successfully.
 *       404:
 *         description: already exists.
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewStaticPage/:staticId' , staticController.viewStaticPage)
/**
 * @swagger
 * /api/v1/static/staticPageList:
 *   get:
 *     tags:
 *       - STATIC
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Role has been added successfully.
 *       404:
 *         description: This role already exists.
 *       500:
 *         description: Internal Server Error
 */
router.get('/staticPageList' , staticController.staticPageList)
/**
 * @swagger
 * /api/v1/static/viewStatic:
 *   post:
 *     tags:
 *       - STATIC
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: title
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: view  successfully.
 *       404:
 *         description: already exists.
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewStatic',staticController.viewStaticData)

module.exports= router;
