const express = require('express');
const router = express.Router();
const admin = require("./adminRoute/adminRoutes")
const user = require("./userRoute/userRoutes")
const agent = require("./agentRoute/agentRoutes")

const staticContent = require("./staticContentRoute/staticContentRoutes")
const chat=require("./chatRoute/chatRoutes")

router.use("/admin",admin)
router.use("/agent",agent)
router.use("/user",user)
router.use("/static",staticContent)
router.use("/chat",chat)

module.exports = router;    