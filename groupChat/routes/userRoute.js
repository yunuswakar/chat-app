const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

const auth = require('../middleware/auth');


/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/login',  userController.login)
/**
 * @swagger
 * /api/v1/user/createGroup:
 *  post:
 *    tags:
 *       - USER-GROUP
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: groupName
 *         description: groupName
 *         in: formData
 *         required: true
 *       - in: body
 *         name: members
 *         description: add members.
 *         schema:
 *           type: object
 *           required:
 *             - members
 *           properties:
 *             members:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                 memberId:
 *                   type: string
 *    responses:
 *       200:
 *         description: Group created successfully
 *       404:
 *         description: This user does not exist.
 *       500:
 *         description: Internal Server Error.   
 */
router.post('/createGroup', auth.verifyToken, userController.createGroup)


router.post('/chatUserList', userController.chatUserList)

module.exports = router;
