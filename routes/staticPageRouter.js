const router = require('express').Router();
const staticController = require('../webServices/controllers/staticPageController')
const staticPage = require('../models/staticModel')

router.post('/staticApi',staticController.staticApi)
router.post('/staticPageUpdate',staticController.staticPageUpdate)


module.exports = router;