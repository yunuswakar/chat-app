const router = require('express').Router();

const roleController = require('../../controllers/roleController');
const auth = require('../../middleware/auth');



/**
 * @swagger
 * /api/v1/role/addRole:
 *   post:
 *     tags:
 *       - ROLE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *     
 *       - name: roleName 
 *         description: roleName
 *         in: formData
 *         required: true
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: retailerManagement
 *         description: retailerManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
 *         in: formData
 *         required: false
 *       - name: faqManagement
 *         description: faqManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: contactUsManagement
 *         description: contactUsManagement
 *         in: formData
 *         required: false
 *       - name: userManagement
 *         description: userManagement
 *         in: formData
 *         required: false
 *       - name: categoryManagement
 *         description: categoryManagement
 *         in: formData
 *         required: false
 *       - name: couponManagement
 *         description: couponManagement
 *         in: formData
 *         required: false
 *       - name: subCategoryManagement
 *         description: subCategoryManagement
 *         in: formData
 *         required: false
 *       - name: martManagement
 *         description: martManagement
 *         in: formData
 *         required: false

 
 *     
 *     responses:
 *       200:
 *         description: Role has been added successfully.
 *       404:
 *         description: This role already exists.
 *       500:
 *         description: Internal Server Error
 */


router.post('/addRole', roleController.addRole)


/**
 * @swagger
 * /api/v1/role/viewRole/{id}:
 *   get:
 *     tags:
 *       - ROLE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id
 *         in: path
 *         required: true
 *       
 *     
 *     responses:
 *       200:
 *         description: Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewRole/:id', roleController.viewRole)


/**
 * @swagger
 * /api/v1/role/editRole:
 *   put:
 *     tags:
 *       - ROLE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleId
 *         description: roleId
 *         in: formData
 *         required: true
 *       - name: permissionId
 *         description: permissionId
 *         in: formData
 *         required: true
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: retailerManagement
 *         description: retailerManagement
 *         in: formData
 *         required: false
 *       - name: staticContentManagement
 *         description: staticContentManagement
 *         in: formData
 *         required: false
 *       - name: faqManagement
 *         description: faqManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: contactUsManagement
 *         description: contactUsManagement
 *         in: formData
 *         required: false
 *       - name: userManagement
 *         description: userManagement
 *         in: formData
 *         required: false
 *       - name: categoryManagement
 *         description: categoryManagement
 *         in: formData
 *         required: false
 *       - name: couponManagement
 *         description: couponManagement
 *         in: formData
 *         required: false
 *       - name: subCategoryManagement
 *         description: subCategoryManagement
 *         in: formData
 *         required: false
 *       - name: martManagement
 *         description: martManagement
 *         in: formData
 *         required: false
 *   
 *       
 *     
 *     responses:
 *       200:
 *         description: Successfully updated.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.put('/editRole', roleController.editRole)

/**
 * @swagger
 * /api/v1/role/deleteRole:
 *   post:
 *     tags:
 *       - ROLE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleId
 *         description: roleId
 *         in: formData
 *         required: true
 *       
 *     
 *     responses:
 *       200:
 *         description: Successfully deleted.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */

router.post('/deleteRole', roleController.deleteRole)

/**
 * @swagger
 * /api/v1/role/roleList:
 *   post:
 *     tags:
 *       - ROLE
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roleName
 *         description: roleName
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       
 *     
 *     responses:
 *       200:
 *         description: Requested data found.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */


router.post('/roleList', roleController.roleList)

module.exports= router;