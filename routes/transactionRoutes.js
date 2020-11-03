const router=require('express').Router()
const transaction = require('../controller/transactionController.js');


//router.post('/transactionSend',transaction.transactionSend);
//router.post('/refundTransaction',transaction.refundTransaction);
//router.post( '/retrieveTransaction',transaction.retrieveTransaction);
router.get( '/listCard/:userId',transaction.listCard);
router.post( '/smartContractTransaction',transaction.smartContractTransaction);

//router.get( '/setContractDetail',transaction.setContractDetail);
router.post('/getContractDetails',transaction.getContractDetails);
//router.get( '/accountBalance/:userId',transaction.accountBalance);
router.post('/withdraw',transaction.withdraw);

router.post('/receiverList',transaction.receiverList);
router.get('/walletBalance/:userId',transaction.walletBalance);
router.post('/requestMoney',transaction.requestMoney);
// router.post('/sendMoney',transaction.sendMoney);
router.get('/conTransFee',transaction.conTransFee);
router.post('/tokenFcm',transaction.tokenFcm);
router.post('/withdrawTrial',transaction.withdrawTrial);
router.post('/checkStripe',transaction.checkStripe);
router.get('/listBankAccount',transaction.listBankAccount);
router.post('/userBankAccounts',transaction.userBankAccounts);

router.post('/sendRequest',transaction.sendRequest);
  
router.post('/acceptOrRejectSend',transaction.acceptOrRejectSend);





module.exports=router;

















// Today's task - 
// Resolved the issues
// 1-Dummy OTP is still used (1234) - done.

// 4-Notifications ….

// 4.1- we can only see notifications for when money is added and not money
// sent - done

// 4.2- no push notification or visual indicator for money received. User has
// to click on notifications to see it - done

// 4.3 recipient does not receive the message that sender sent with money
// transfer - done

// 4.4 if user rejects the transfer , the money is sent back to sender but
// without message or notification - done

// 4.6 requested money does not show in notification…only a brief message is
// displayed and goes away - done

// 4.7 when user receive requested money, the money is deposited without
// notification - done


