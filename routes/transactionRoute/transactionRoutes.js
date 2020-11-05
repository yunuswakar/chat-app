const router = require('express').Router();
const transactionController = require('../../controllers/transactionController');
const auth= require('../../middleware/auth');

router.get('/viewTransaction/:_id', transactionController.viewTransaction)

router.delete('/deleteTransaction', transactionController.deleteTransaction)

router.post('/transactionList', transactionController.transactionList)


module.exports = router;
