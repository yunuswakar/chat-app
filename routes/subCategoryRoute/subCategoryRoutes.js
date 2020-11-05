const router = require("express").Router();
const subCategoryController = require("../../controllers/subCategoryController");
const auth = require('../../middleware/auth');


/**
 * @swagger
 * /api/v1/subCategory/addSubCategory:
 *   post:
 *     tags:
 *       - SUB-CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: true
 *       - name: subCategoryName
 *         description: subCategoryName
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *     
 *     
 *     responses:
 *       200:
 *         description: Category has been added successfully.
 *       404:
 *         description: This category name already exists.
 *       500:
 *         description: Internal Server Error
 */


router.post('/addSubCategory', auth.verifyToken, subCategoryController.addSubCategory)


/**
 * @swagger
 * /api/v1/subCategory/viewSubCategory/{subCategoryId}:
 *   get:
 *     tags:
 *       - SUB-CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subCategoryId
 *         description: subCategoryId
 *         in: path
 *         required: true
 *     
 *     responses:
 *       200:
 *         description:  Details have been fetched successfully.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */


router.get('/viewSubCategory/:subCategoryId', auth.verifyToken, subCategoryController.viewSubCategory)


/**
 * @swagger
 * /api/v1/subCategory/deleteSubCategory/{subCategoryId}:
 *   delete:
 *     tags:
 *       - SUB-CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subCategoryId
 *         description: subCategoryId
 *         in: path
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



router.delete('/deleteSubCategory/:subCategoryId', auth.verifyToken, subCategoryController.deleteSubCategory)

/**
 * @swagger
 * /api/v1/subCategory/editSubCategory:
 *   put:
 *     tags:
 *       - SUB-CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subCategoryId
 *         description: subCategoryId
 *         in: formData
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: false
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false  
 *       - name: subCategoryName
 *         description: subCategoryName
 *         in: formData
 *         required: false 
 *     responses:
 *       200:
 *         description: Successfully updated.
 *       404:
 *         description: Requested data not found.
 *       500:
 *         description: Internal Server Error
 */


router.put('/editSubCategory', auth.verifyToken, subCategoryController.editSubCategory)


/**
 * @swagger
 * /api/v1/subCategory/subCategoryList:
 *   post:
 *     tags:
 *       - SUB-CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subCategoryName
 *         description: subCategoryName
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


router.post('/subCategoryList', auth.verifyToken, subCategoryController.subCategoryList)

router.post('/updateSubCategoryPriority', auth.verifyToken, subCategoryController.updateSubCategoryPriority)


module.exports = router; 
