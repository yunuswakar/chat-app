const express = require('express');
const router = express.Router();
const userController=require("../../controller/userController")
var auth = require('../../middleWare/auth');


const validation = require('../../middleWare/validation');
  
  

  /**
 * @swagger
 * /api/v1/user/otpSent:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *      
 *     responses:
 *       200:
 *         description: Login successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
  router.post("/otpSent",userController.otpSent)

/**
 * @swagger
 * /api/v1/user/getQuestion:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         description: questionId
 *         in: formData
 *         required: true
 *      
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error
 */
  router.post('/getQuestion',userController.getQuestion)


  /**
 * @swagger
 * /api/v1/user/verifyAnswer:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: answer
 *         description: answer
 *         in: formData
 *         required: true
 *      
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error
 */
  router.post('/verifyAnswer',userController.verifyAnswer)

// /**
//  * @swagger
//  * /api/v1/user/loginCustomer:
//  *  post:
//  *    tags:
//  *       - USER
//  *    produces:
//  *      - application/json
//  *    parameters:
//  *       - in: body
//  *         name: Login
//  *         description: Login cusstomer.
//  *         schema:
//  *           type: object
//  *           required:
//  *             - mobileNumber
//  *             - password
//  *             - location
//  *           properties:
//  *             mobileNumber:
//  *               type: string
//  *             password:
//  *               type: string
//  *             location:
//  *               type: object
//  *               items:
//  *                type: object
//  *                properties:
//  *                type:
//  *                   type: string
//  *                 coordinates:
//  *                   type: array
//  *                   items:
//  *                    type: integer
//  *    responses:
//  *       200:
//  *         description: Login successfully.
//  *       404:
//  *         description: Requested data not found
//  *       500:
//  *         description: Internal Server Error.   
//  */
   router.post('/loginCustomer',userController.loginCustomer)


  
 /**
 * @swagger
 * /api/v1/user/signUp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: first name
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: last Name
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: state
 *         description: state
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobile Number
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: country Code
 *         in: formData
 *         required: true
 *       - name: gender
 *         description: gender
 *         in: formData
 *         required: true 
 *       - name: questionId
 *         description: questionId
 *         in: formData
 *         required: true       
 *       - name: answer
 *         description: answer
 *         in: formData
 *         required: true 
 *       - name: userName
 *         description: userName
 *         in: formData
 *         required: true  
 *       - name: emailId
 *         description: emailId
 *         in: formData
 *         required: true     
 *     responses:
 *       200:
 *         description: SignUp successfully
 *       404:
 *         description: already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp',userController.signUp)

  
/**
 * @swagger
 * /api/v1/user/verifyOtp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: otp verify successfully
 *       404:
 *         description: otp not matched
 *       500:
 *         description: Internal Server Error
 */
  router.post("/verifyOtp",userController.verifyOtp)

  
/**
 * @swagger
 * /api/v1/user/forgotPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/forgotPassword",userController.forgotPassword)


  
/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: update successfully
 *       404:
 *         description: password not matched
 *       500:
 *         description: Internal Server Error
 */
  router.post("/resetPassword",userController.resetPassword)
 
    
  router.post("/changePassword",auth.verifyToken,userController.changePassword)


  /**  
 * @swagger
 * /api/v1/user/getProfile:
 *   get:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *             
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error   
 */   
  router.get("/getProfile",auth.verifyToken,userController.getProfile)

 
/**
 * @swagger
 * /api/v1/user/sendAddMoneyRequestToAgentByCustomer:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: agentId
 *         description: agentId
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: amount                    
 *         description: amount
 *         in: formData
 *         required: true
 *       - name: amountType                    
 *         description: amountType
 *         in: formData
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: request sent to agent
 *       404:
 *         description: password not matched
 *       500:
 *         description: Internal Server Error
 */
  router.post("/sendAddMoneyRequestToAgentByCustomer",auth.verifyToken,userController.sendAddMoneyRequestToAgentByCustomer)

  /**
 * @swagger
 * /api/v1/user/sendWithdrawMoneyRequestToAgentByCustomer:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token  
 *         in: header
 *         required: true
 *       - name: agentId
 *         description: agentId
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: amount                    
 *         description: amount
 *         in: formData
 *         required: true
 *       - name: amountType                    
 *         description: amountType
 *         in: formData
 *         required: true
 *       
 *     responses:
 *       200:
 *         description: request sent to agent
 *       404:
 *         description: password not matched
 *       500:
 *         description: Internal Server Error
 */
  router.post("/sendWithdrawMoneyRequestToAgentByCustomer",auth.verifyToken,userController.sendWithdrawMoneyRequestToAgentByCustomer)
  
  
/**
 * @swagger
 * /api/v1/user/notificationToggle:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *                  
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/notificationToggle",auth.verifyToken,userController.notificationToggle)

  
  router.post("/showAgentList", auth.verifyToken,userController.showAgentList)

  router.post("/agentDetalis", auth.verifyToken,userController.agentDetalis)  

  
/**
 * @swagger
 * /api/v1/user/blockAgentByCustomer:
 *   get:
 *     tags:
 *       - USER
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
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: blocked successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/blockAgentByCustomer", auth.verifyToken,userController.blockAgentByCustomer)

  
/**   
 * @swagger
 * /api/v1/user/unblockAgentByCustomer:
 *   get:
 *     tags:
 *       - USER
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
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: active successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/unblockAgentByCustomer", auth.verifyToken,userController.unblockAgentByCustomer)
   
/**
 * @swagger
 * /api/v1/user/editsettingInformation:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: optional
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: optional
 *       - name: userStatus
 *         description: userStatus
 *         in: formData
 *         required: optional
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: optional
 *       - name: state
 *         description: state
 *         in: formData
 *         required: optional
 *       - name: city
 *         description: city
 *         in: formData
 *         required: optional
 *       - name: country
 *         description: country
 *         in: formData
 *         required: optional
 *            
 *     responses:
 *       200:
 *         description: update successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/editsettingInformation", auth.verifyToken,userController.editsettingInformation)

  router.post("/postAdd",auth.verifyToken,userController.postAdd)

  /**
 * @swagger
 * /api/v1/user/contactList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *                  
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/contactList",auth.verifyToken,userController.contactList)


        
/**
 * @swagger
 * /api/v1/user/particularTransaction:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: transactionId
 *         description: transactionId
 *         in: formData
 *         required: optional
 *                        
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/particularTransaction",userController.particularTransaction)

     
    
/**
 * @swagger
 * /api/v1/user/listOfBlockAgent:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *                  
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/listOfBlockAgent",auth.verifyToken,userController.listOfBlockAgent)

  /**
 * @swagger
 * /api/v1/user/supportMessageToAdmin:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true 
 *       - name: message
 *         description:  message 
 *         in: formData
 *         required: true
 *      
 *     responses:
 *       200:
 *         description: Submit successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
  router.post('/supportMessageToAdmin', auth.verifyToken, userController.supportMessageToAdmin)

  
  /**
 * @swagger
 * /api/v1/user/sendAdminToKycDetails:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true 
 *       - name: VoterID_Name
 *         description:  VoterID_Name 
 *         in: formData
 *         required: optional
 *       - name: VoterID_Number
 *         description:  VoterID_Number 
 *         in: formData    
 *         required: optional
 *       - name: passport_Name
 *         description:  passport_Name 
 *         in: formData
 *         required: optional
 *       - name: passport_Number
 *         description:  passport_Number 
 *         in: formData
 *         required: optional
 *       - name: passport_Number
 *         description:  passport_Number 
 *         in: formData
 *         required: optional
 *       - name: panCard_Name
 *         description:  panCard_Name 
 *         in: formData
 *         required: optional
 *       - name: panCard_Number
 *         description:  panCard_Number 
 *         in: formData
 *         required: optional
 *       - name: DrivingLicence_Name
 *         description:  DrivingLicence_Name 
 *         in: formData
 *         required: optional
 *       - name: DrivingLicence_Number
 *         description:  DrivingLicence_Number 
 *         in: formData
 *         required: optional
 *     responses:
 *       200:
 *         description: details saved successfully
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/sendAdminToKycDetails",auth.verifyToken,userController.sendAdminToKycDetails)

  /**
 * @swagger
 * /api/v1/user/searchAgentByCustomerOnBasisOfLocation:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true 
 *      
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/searchAgentByCustomerOnBasisOfLocation",auth.verifyToken,userController.searchAgentByCustomerOnBasisOfLocation)   

    /**
 * @swagger
 * /api/v1/user/getHelp:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true 
 *      
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/getHelp",auth.verifyToken,userController.getHelp)
  

  /**  
 * @swagger
 * /api/v1/user/transactionHistoryOfCustomer:
 *   get:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *                  
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error
 */
  router.get("/transactionHistoryOfCustomer",auth.verifyToken,userController.transactionHistoryOfCustomer)

  
  /**  
 * @swagger
 * /api/v1/user/profileOfFriend:
 *   post:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header  
 *         required: true   
 *       - name: _id
 *         description: _id
 *         in: formData
 *         required: true         
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/profileOfFriend",auth.verifyToken,userController.profileOfFriend)
  
   
  /**  
 * @swagger
 * /api/v1/user/history:
 *   get:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *             
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error   
 */   
  router.get("/history",auth.verifyToken,userController.history)


  
/**
 * @swagger
 * /api/v1/user/sendMoneyByCustomerUsingQRcode:
 *   post:  
 *     tags:
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: amount
 *         description: amount
 *         in: formData
 *         required: true
 *       - name: amountType
 *         description: amountType
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: transfer successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
  router.post("/sendMoneyByCustomerUsingQRcode",auth.verifyToken,userController.sendMoneyByCustomerUsingQRcode)   

   /**  
 * @swagger
 * /api/v1/user/generateORcodeGenerate:
 *   get:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *             
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error   
 */   
  router.get("/generateORcodeGenerate",auth.verifyToken,userController.generateORcodeGenerate)
   
 
   /**  
 * @swagger
 * /api/v1/user/receiverDetails:
 *   post:
 *     tags:   
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *             
 *     responses:
 *       200:
 *         description: Data found successfully
 *       404:
 *         description: not found
 *       500:
 *         description: Internal Server Error   
 */ 
  router.post("/receiverDetails",auth.verifyToken,userController.receiverDetails)


  
  
/**
 * @swagger
 * /api/v1/user/sendMoneyByCustomer:
 *   post:  
 *     tags:
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: amount
 *         description: amount
 *         in: formData
 *         required: true
 *       - name: amountType
 *         description: amountType
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: transfer successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/sendMoneyByCustomer",auth.verifyToken,userController.sendMoneyByCustomer)   


/**
 * @swagger
 * /api/v1/user/receiveMoneyByCustomer:
 *   post:  
 *     tags:
 *       - USER
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: amount
 *         description: amount
 *         in: formData
 *         required: true
 *       - name: amountType
 *         description: amountType
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: transfer successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/receiveMoneyByCustomer",auth.verifyToken,userController.receiveMoneyByCustomer)   



/**
 * @swagger
 * /api/v1/user/listOfNotificationForAgent:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/listOfNotificationForCustomer",auth.verifyToken,userController.listOfNotificationForCustomer)   


/**
 * @swagger
 * /api/v1/user/getKycDetails:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/getKycDetails",auth.verifyToken,userController.getKycDetails)   

/**
 * @swagger
 * /api/v1/user/addStatus:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: addPost
 *         description: addPost
 *         in: formData
 *         required: true  
 *            
 *     responses:
 *       200:   
 *         description: status updated
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/addStatus",auth.verifyToken,userController.addStatus)        

/**
 * @swagger
 * /api/v1/user/likePost:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: formData
 *         required: true  
 *            
 *     responses:
 *       200:   
 *         description: like the post
 *       404:
 *         description: post not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/likePost",auth.verifyToken,userController.likePost)  


/**
 * @swagger
 * /api/v1/user/currentBalance:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *                   
 *     responses:
 *       200:   
 *         description: like the post
 *       404:
 *         description: post not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/currentBalance",auth.verifyToken,userController.currentBalance)  



/**
 * @swagger
 * /api/v1/user/postList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.get("/postList",auth.verifyToken,userController.postList)   


/**
 * @swagger
 * /api/v1/user/statusList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *            
 *     responses:
 *       200:    
 *         description: data found successfully    
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.get("/statusList",auth.verifyToken,userController.statusList)   

/**
 * @swagger
 * /api/v1/user/likeCount:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token                             
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId                             
 *         description: postId
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:    
 *         description: data found successfully    
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.post("/likeCount",auth.verifyToken,userController.likeCount)   



/**
 * @swagger
 * /api/v1/user/comment:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token                             
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId                             
 *         description: postId
 *         in: formData
 *         required: true
 *       - name: comment                             
 *         description: comment
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:    
 *         description: comment successfully    
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.post("/comment",auth.verifyToken,userController.comment)   

router.post("/reportPost",auth.verifyToken,userController.reportPost)   

router.post("/tagFriend",auth.verifyToken,userController.tagFriend)   


/**
 * @swagger
 * /api/v1/user/particularPost:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token                             
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId                             
 *         description: postId
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:    
 *         description: data found successfully    
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.post("/particularPost",auth.verifyToken,userController.particularPost)   


router.post("/commentReply",auth.verifyToken,userController.commentReply)   


/**
 * @swagger
 * /api/v1/user/searchPost:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token                             
 *         description: token
 *         in: header
 *         required: true
 *       - name: search                             
 *         description: search
 *         in: formData
 *         required: true
 *            
 *     responses:
 *       200:    
 *         description: data found successfully    
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error  
 */
router.post("/searchPost",auth.verifyToken,userController.searchPost)   

module.exports=router
     