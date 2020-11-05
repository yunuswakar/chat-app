const express= require('express');
const router= express.Router();

const admin= require('./adminRoute/adminRoute');
router.use('/admin', admin)
const user= require('./userRoute/userRoute');
router.use('/user', user)
const static= require('./staticRoute/staticRoute');
router.use('/static', static)
const faq= require('./faqRoute/faqRoute');
router.use('/faq', faq)

const community = require('./communityRoutes/communityRoutes');
router.use('/community',community)

module.exports= router;

