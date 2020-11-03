const router=require('express').Router()
const admin = require('../controller/adminController.js');
const auth=require('../middelware/auth');
router.post('/adminLogin',admin.adminLogin);
/**
 * @swagger
 * /api/v1/admin/adminLogin:
 *   post:
 *     tags:
 *       - ADMIN
 *     description:  To login the admin .
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: admin email id
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: You have successfully login.
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.get('/totalUser', admin.totalUser);
router.post('/listUserSearch',admin.listUserSearch);
router.get('/viewUser/:_id',admin.viewUser);
router.post('/actionToUser',admin.actionToUser);
router.get('/totalTransaction', admin.totalTransaction);
router.get('/viewParticularTransaction/:_id',admin.viewParticularTransaction);
router.post('/changePasswordAdmin',auth.verifyToken,admin.changePasswordAdmin);
router.post('/forgotPasswordAdmin',admin.forgotPasswordAdmin)
router.post('/verifyOtp',admin.verifyOtp)
router.post('/resetPasswordAdmin',admin.resetPasswordAdmin)
router.post('/changeEmailAdmin',auth.verifyToken,admin.changeEmailAdmin);
router.post('/addQuestion',auth.verifyToken,admin.addQuestion)
router.post('/addAnswer',auth.verifyToken,admin.addAnswer)
router.post('/setTransactionInterest',auth.verifyToken,admin.setTransactionInterest)
router.post('/logout',admin.logout)
router.post('/addFaq',admin.addFaq)
router.post('/viewFaq',admin.viewFaq)
router.post('/updateFaq',admin.updateFaq)
router.post('/viewEmail',admin.viewEmail)
router.post('/currentTransactionFee',admin.currentTransactionFee)
router.post('/viewFaqId',admin.viewFaqId)
router.post('/updateAdmin',admin.updateAdmin)
// router.get('/test',admin.test);
router.post('/viewAdmin',admin.viewAdmin)
router.post('/verifyOtpAdmin',admin.verifyOtpAdmin)
router.post('/adminVerifyOtp',admin.adminVerifyOtp)
router.post('/transactionHistory',admin.transactionHistory)
router.post('/userGraph',admin.userGraph)
////////////////////////////////////////////////////////////////////////////

router.post('/addVendor',admin.addVendor)
router.post('/viewVendor',admin.viewVendor)
router.post('/searchVendors',admin.searchVendors)
router.post('/deleteVendor',admin.deleteVendor)
router.post('/blockUnblockVendor',admin.blockUnblockVendor)
router.post('/userGraphVolume',admin.userGraphVolume)
router.post('/test',admin.testEmail)
module.exports=router;