const router = require('express').Router();
const admin = require('./adminRoute/adminRoutes');
const user = require('./userRoute/userRoutes')
const statics=require('../routes/staticRoute/staticRoute')
const faq=require('../routes/FAQRoute/FAQRoute');

router.use('/admin', admin)
router.use('/user', user)
router.use('/static',statics)
router.use('/faq',faq)





module.exports = router;
