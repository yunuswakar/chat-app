const express = require('express');
const router = express.Router();
const staticContentController=require("../../controller/staticContentController")
var auth = require('../../middleWare/auth');


const validation= {
   
  } = require('../../middleWare/validation');
  
  /**
   * @swagger
   * /api/v1/static/viewStaticContent:
   *   post:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: staticId
   *         description: staticId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Details have been fetched successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/viewStaticContent",auth.verifyToken,staticContentController.viewStaticContent)
/**
   * @swagger
   * /api/v1/static/editStaticContent:
   *   post:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: staticId
   *         description: staticId
   *         in: formData
   *         required: true
   *       - name: description
   *         description: description
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Updated successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/editStaticContent",auth.verifyToken,staticContentController.editStaticContent)
/**
   * @swagger
   * /api/v1/static/staticContentList:
   *   post:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true   
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */

router.post("/staticContentList",staticContentController.staticContentList)
/**
   * @swagger
   * /api/v1/static/addFaqs:
   *   post:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true  
   *       - name: faqId
   *         description: faqId
   *         in: formData
   *         required: true 
   *       - name: question
   *         description: question
   *         in: formData
   *         required: true
   *       - name: answer
   *         description: answer
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Data saved successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */
router.post("/addFaqs",auth.verifyToken,validation.faqValidation,staticContentController.addFaqs)

/**
   * @swagger
   * /api/v1/static/faqList:
   *   get:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true  
   *     responses:
   *       200:
   *         description: Data found successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */
  router.get("/faqList",auth.verifyToken,staticContentController.faqList)
  /**
   * @swagger
   * /api/v1/static/editFaqs:
   *   post:
   *     tags:
   *       - STATIC
   *     description: Check for Social existence and give the access Token 
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true  
   *       - name: faqId
   *         description: faqId
   *         in: formData
   *         required: true  
   *     responses:
   *       200:
   *         description: Data updated successfully
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal Server Error
   */
  router.post("/editFaqs",auth.verifyToken,staticContentController.editFaqs)

  router.post("/viewFaq",auth.verifyToken,staticContentController.viewFaq)

module.exports=router