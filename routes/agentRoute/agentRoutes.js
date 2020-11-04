const express = require('express');
const router = express.Router();
const agentController = require("../../controller/agentController")
var auth = require('../../middleWare/auth');
const validation = require('../../middleWare/validation');

/**
 * @swagger
 * /api/v1/agent/logInAgent:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:  
 *       - application/json
 *     parameters:   
 *       - name: agentId      
 *         description: agentId
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true   
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Login successfully
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */


router.post('/logInAgent', agentController.logInAgent)
/**
 * @swagger
 * /api/v1/agent/forgotPassword:
 *   post:
 *     tags:
 *       - AGENT
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
router.post('/forgotPassword', agentController.forgotPassword)


router.post('/getStaticContent', agentController.getStaticContent)

/**
 * @swagger
 * /api/v1/agent/verifyOtp:
 *   post:
 *     tags:
 *       - AGENT
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
 *       
 *     responses:
 *       200:
 *         description: otp verify successfully
 *       404:
 *         description: invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/verifyOtp', agentController.verifyOtp)


/**
 * @swagger
 * /api/v1/agent/verifyOtp:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id
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
 *         description: password updated successfully
 *       404:
 *         description: password not matched 
 *       500:
 *         description: Internal Server Error
 */
router.post('/resetPassword', agentController.resetPassword)
//===========================================QR Code Payments================================================
   

/**
 * @swagger
 * /api/v1/agent/checkBalance:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true   
 *             
 *     responses:    
 *       200:
 *         description: available balance successfully
 *       404:
 *         description: password not matched   
 *       500:
 *         description: Internal Server Error
 */
router.post('/checkBalance', auth.verifyToken, agentController.checkBalance)

  


/**
 * @swagger
 * /api/v1/agent/acceptedListOfCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get('/acceptedListOfCustomer', auth.verifyToken, agentController.acceptedListOfCustomer)



/**
 * @swagger
 * /api/v1/agent/rejectedListOfCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get('/rejectedListOfCustomer', auth.verifyToken, agentController.rejectedListOfCustomer)

    


//===============================count request accepted rejected=========================================

/**
 * @swagger
 * /api/v1/agent/customerDetails:
 *   post:
 *     tags:
 *       - AGENT
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
 *         description: data found successfully
 *       404:
 *         description: data not found   
 *       500:
 *         description: Internal Server Error
 */
router.post("/customerDetails",auth.verifyToken,agentController.customerDetails)

/**
 * @swagger
 * /api/v1/agent/approveRequestOfCustomerByAgent:
 *   post:
 *     tags:
 *       - AGENT
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
 *         description: request approved
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/approveRequestOfCustomerByAgent",auth.verifyToken,agentController.approveRequestOfCustomerByAgent)
 
/**
 * @swagger
 * /api/v1/agent/rejectRequestOfCustomerByAgent:
 *   post:
 *     tags:
 *       - AGENT
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
 *         description: request rejected
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/rejectRequestOfCustomerByAgent",auth.verifyToken,agentController.rejectRequestOfCustomerByAgent)

/**
 * @swagger
 * /api/v1/agent/countRequestForAgentByCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/countRequestForAgentByCustomer",auth.verifyToken,agentController.countRequestForAgentByCustomer)

/**
 * @swagger
 * /api/v1/agent/countRequestAcceptedByAgentOfCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/countRequestAcceptedByAgentOfCustomer",auth.verifyToken,agentController.countRequestAcceptedByAgentOfCustomer)

/**
 * @swagger  
 * /api/v1/agent/countOfRequestOfCustomerRejectedByAgent:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/countOfRequestOfCustomerRejectedByAgent",auth.verifyToken,agentController.countOfRequestOfCustomerRejectedByAgent)

/**
 * @swagger
 * /api/v1/agent/requestListOfCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/requestListOfCustomer",auth.verifyToken,agentController.requestListOfCustomer)

/**
 * @swagger
 * /api/v1/agent/listOfNotificationForAgent:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/listOfNotificationForAgent",auth.verifyToken,agentController.listOfNotificationForAgent)

/**
 * @swagger
 * /api/v1/agent/addMoneyRequestToAdmin:
 *   post:
 *     tags:
 *       - AGENT
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: adminId
 *         description: adminId
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
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/addMoneyRequestToAdmin",auth.verifyToken,agentController.addMoneyRequestToAdmin)


/**
 * @swagger
 * /api/v1/agent/withdrawMoneyRequestToAdmin:
 *   post:
 *     tags:
 *       - AGENT
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: adminId
 *         description: adminId
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
 *         description: request sent to admin
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/withdrawMoneyRequestToAdmin",auth.verifyToken,agentController.withdrawMoneyRequestToAdmin)


/**
 * @swagger
 * /api/v1/agent/sendMoneyByAgent:
 *   post:  
 *     tags:
 *       - AGENT
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: mobileNumber
 *         description: adminId
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
router.post("/sendMoneyByAgent",auth.verifyToken,agentController.sendMoneyByAgent)


/**
 * @swagger
 * /api/v1/agent/receiveMoneyByAgentUsingQRcode:
 *   post:
 *     tags:
 *       - AGENT
 *     description: give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
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
 *         description: data found successfully
 *       404:
 *         description: request not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/exchangeManagementToAgent",auth.verifyToken,agentController.exchangeManagementToAgent)


  /**  
 * @swagger
 * /api/v1/agent/transactionHistoryOfAgent:
 *   get:
 *     tags:   
 *       - AGENT
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
router.get("/transactionHistoryOfAgent",auth.verifyToken,agentController.transactionHistoryOfAgent)

/**
 * @swagger
 * /api/v1/agent/blockCustomerByAgent:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: customer_Id
 *         description: customer_Id
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

router.post("/blockCustomerByAgent",auth.verifyToken,agentController.blockCustomerByAgent)

/**
 * @swagger
 * /api/v1/agent/unblockCustomerByAgent:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: customer_Id
 *         description: customer_Id
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
router.post("/unblockCustomerByAgent",auth.verifyToken,agentController.unblockCustomerByAgent)


   
/**
 * @swagger
 * /api/v1/agent/listOfBlockCustomer:
 *   get:
 *     tags:
 *       - AGENT
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
router.get("/listOfBlockCustomer",auth.verifyToken,agentController.listOfBlockCustomer)

/**
 * @swagger
 * /api/v1/agent/addCommissionUSD:
 *   post:
 *     tags:
 *       - AGENT
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
 *         description: commission added to you balance
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error   
 */
router.post("/addCommissionUSD",auth.verifyToken,agentController.addCommissionUSD)


/**
 * @swagger
 * /api/v1/agent/addCommissionCDF:
 *   post:
 *     tags:
 *       - AGENT
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
 *         description: commission added to you balance
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal Server Error   
 */
router.post("/addCommissionCDF",auth.verifyToken,agentController.addCommissionCDF)


  /**
 * @swagger
 * /api/v1/agent/adminDetails:
 *   post:
 *     tags:
 *       - AGENT
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: agentId
 *         description: agentId
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
router.post("/agentDetails",agentController.agentDetails)

module.exports = router




