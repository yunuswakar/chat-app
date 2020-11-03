const express = require('express');
const router = express.Router();
const { staticContent } = require('../../controller/staticController');
const {updateStaticContent}=require('../../controller/staticController')
const { basicAuthUser} = require('../../middelware/auth');
const { staticContentValidation } = require('../../middelware/validation');

  router.get( '/getStaticContent/:contentType', basicAuthUser, staticContentValidation, staticContent);

  router.post('/updateStaticContent',updateStaticContent)

module.exports = router;