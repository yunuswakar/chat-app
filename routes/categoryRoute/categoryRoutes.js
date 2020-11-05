const router = require('express').Router();
const categoryController = require('../../controllers/categoryController');
const auth = require('../../middleware/auth');


// /**
//  * @swagger
//  * /api/v1/category/addCategory:
//  *   post:
//  *     tags:
//  *       - CATEGORY
//  *     description: Check for Social existence and give the access Token 
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: token
//  *         description: token
//  *         in: header
//  *         required: true
//  *       - name: image
//  *         description: image
//  *         in: formData
//  *         required: true
//  *       - name: productServiceType
//  *         description: productServiceType-PRODUCT/SERVICE
//  *         in: formData
//  *         required: true
//  *       - name: categoryName
//  *         description: categoryName
//  *         in: formData
//  *         required: true
//  *     responses:
//  *       200:
//  *         description: Category has been added successfully.
//  *       404:
//  *         description: This category name already exists.
//  *       500:
//  *         description: Internal Server Error
//  */

/**
 * @swagger
 * /api/v1/category/addCategory:
 *   post:
 *     tags:
 *       - CATEGORY
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
 *       - name: productServiceType
 *         description: productServiceType-PRODUCT/SERVICE
 *         in: formData
 *         required: true
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Success. 
 *       404:
 *         description: Requested data not found.
 *       400:
 *         description: Fields are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/addCategory', auth.verifyToken, categoryController.addCategory)

/**
 * @swagger
 * /api/v1/category/viewCategory/{_id}:
 *   get:
 *     tags:
 *       - CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: _id
 *         description: _id
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

router.get('/viewCategory/:_id', auth.verifyToken, categoryController.viewCategory)

/**
 * @swagger
 * /api/v1/category/categoryList:
 *   post:
 *     tags:
 *       - CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryName
 *         description: categoryName
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


router.post('/categoryList', auth.verifyToken, categoryController.categoryList)

/**
 * @swagger
 * /api/v1/category/deleteCategory:
 *   delete:
 *     tags:
 *       - CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: categoryId
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


router.post('/deleteCategory', auth.verifyToken, categoryController.deleteCategory)

/**
 * @swagger
 * /api/v1/category/editCategory:
 *   put:
 *     tags:
 *       - CATEGORY
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: productServiceType
 *         description: productServiceType-PRODUCT/SERVICE
 *         in: formData
 *         required: false
 *       - name: categoryName
 *         description: categoryName
 *         in: formData
 *         required: false
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

router.put('/editCategory', auth.verifyToken, categoryController.editCategory)
router.post('/priority',categoryController.updatePriority)
module.exports = router;
