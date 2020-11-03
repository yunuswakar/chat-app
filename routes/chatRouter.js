const router = require('express').Router();
const chatController = require('../webServices/controllers/chatController');
const basicAuth = require('../middleware/auth');

router.post('/chattingAPI', chatController.chattingAPI)
// router.post('/chattingHistory', chatController.chattingHistory)
router.post('/chatHistory',chatController.chatHistory)
router.post('/markettingChatAPI', chatController.markettingChatAPI)
router.post('/uploadImage', chatController.uploadImage)
router.post('/updateStatus', chatController.updateStatus)
router.post('/clearChat', chatController.clearChat)
router.post('/updateBiddingChatStatus', chatController.updateBiddingChatStatus)
router.post('/bidderClearChat',chatController.bidderClearChat)
router.post('/friendChatting', chatController.friendChatting)
router.post('/friendChattingHistory', chatController.friendChattingHistory)
router.post('/clearChatForFriend',chatController.clearChatForFriend)

module.exports=router;