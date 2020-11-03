const express = require('express');
const router = express.Router();
const admin = require("./adminRoute/adminRoute");
const user = require("./userRoute/userRoute");
const staticContent = require('./staticRoute/staticRoute');
const chat = require('./chatRoute/chatRoute');
const web = require('./webRoute/webRoute');

router.use('/admin', admin)

router.use('/user', user)

router.use('/static', staticContent)

router.use('/chat', chat)

router.use('/web', web)


module.exports = router;

