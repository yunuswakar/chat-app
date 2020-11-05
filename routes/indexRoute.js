const router = require('express').Router();
const admin = require('./adminRoute/adminRoutes');
const role = require('./roleRoute/roleRoutes');
const mart = require('./martRoute/martRoutes');
const configuration = require('./configurationRoute/configurationRoutes');
const category = require('./categoryRoute/categoryRoutes');
const statics = require('./staticRoute/staticRoute');
const subCategory = require('./subCategoryRoute/subCategoryRoutes');
const user = require('./userRoute/userRoutes')
const retailer = require('./retailerRoute/retailerRoutes');
const activeInactive = require('./activeInactiveRoute/activeInactiveRoutes');
const transaction = require('./transactionRoute/transactionRoutes');
const emailTemplate = require('./emailTemplateRoute/emailTemplateRoutes');
const faq = require('./FAQRoute/FAQRoute');
const helpCenter = require('./helpCenterRoute/helpCenterRoutes')

router.use('/admin', admin)

router.use('/user', user)

router.use('/role', role)

router.use('/mart', mart)

router.use('/configuration', configuration)

router.use('/retailer', retailer)

router.use('/category', category)

router.use('/static', statics)

router.use('/subCategory', subCategory)

router.use('/activeInactive', activeInactive)

router.use('/transaction', transaction)

router.use('/emailTemplate', emailTemplate)

router.use('/faq', faq)

router.use('/helpCenter', helpCenter)

module.exports = router;
