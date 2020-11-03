const router = require('express').Router();
const basicAuth = require('../middleware/auth')
const userReportProblem = require('../webServices/controllers/userReportProblemController')



router.post('/reportProblem',  userReportProblem.reportProblem)


module.exports = router;





