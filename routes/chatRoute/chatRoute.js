var router = require('express').Router();
const chatController = require('../../controller/chatController');
const auth = require('../../middleware/auth');

/**
 * @swagger
 * /api/v1/chat/chatAPI:
 *   post:
 *     tags:
 *       - CHAT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: receiverId
 *         description: receiverId
 *         in: formData
 *         required: true
 *       - name: message
 *         description: message
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Message has been send successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/chatAPI', auth.verifyToken, chatController.chatAPI)

/**
 * @swagger
 * /api/v1/chat/chatList:
 *   post:
 *     tags:
 *       - CHAT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/chatList', auth.verifyToken, chatController.chatList)

module.exports = router;