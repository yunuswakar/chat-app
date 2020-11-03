const express= require('express');
const router= express.Router();

const admin= require('./adminRoute/adminRoutes');
const static = require('./staticRoute/staticRoute');
const user= require('./userRoute/userRoute');

router.use('/admin', admin)

router.use('/static', static)

router.use('/user', user)



module.exports= router;

