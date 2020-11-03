const express = require('express');
const router = express.Router();

const user = require('./userRoute/userRoute');
const staticContent = require('./staticContentRoute/staticContentRoute');
//const admin = require('../routes/adminRoutes.js');
// const transaction = require('../routes/transactionRoutes');

router.use('/user',user);
router.use('/staticContent',staticContent);
//router.use('/admin',admin);
// router.use('/transaction',transaction);

module.exports = router;  