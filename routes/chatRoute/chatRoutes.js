const express = require('express');
const router = express.Router();
const chatController=require('../../controller/chatController')
var auth = require('../../middleWare/auth');
const validation = require('../../middleWare/validation');
  
  

  router.post("/chattingAPI", chatController.chattingAPI)


  router.post("/chattingHistory", chatController.chattingHistory)

  router.post("/uploadDocument", chatController.uploadDocument)



  


  

  module.exports=router  