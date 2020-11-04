const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")


/**
 * @swagger
 * /api/v1/user/createSession:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: session created successfully
 *       404:
 *         description: not found.
 *       500:
 *         description: Internal Server Error
 */
router.get('/createSession',userController.createSession)



module.exports = router