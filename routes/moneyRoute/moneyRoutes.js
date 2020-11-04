const express = require('express');
//const money=require("../../model/moneyModel")
const router = express.Router();
const moneyController=require("../../controller/moneyController")
var auth = require('../../middleWare/auth');


const {
   
  } = require('../../middleWare/validation');
  
 router.post("/setMoney",auth.verifyToken,moneyController.setMoney)
module.exports=router