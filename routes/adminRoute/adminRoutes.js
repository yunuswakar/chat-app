const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController');
const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth')



/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your login is successful
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', adminController.login)

/**
 * @swagger
 * /api/v1/admin/forgotPassword:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: A password link has been sent to your registered ID
 *       404:
 *         description: Provided email is not registered
 *       500:
 *         description: Internal Server Error
 */

router.post('/forgotPassword', adminController.forgotPassword)

/**
 * @swagger
 * /api/v1/admin/resetPassword/{_id}:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: path
 *         required: true
 *       - name: newPassword
 *         description: newPassword
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your password has been updated successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/resetPassword/:_id', adminController.resetPassword)

/**
 * @swagger
 * /api/v1/admin/getProfile:
 *   get:
 *     tags:
 *       - ADMIN
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
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.get('/getProfile', auth.verifyToken, adminController.getProfile)

/**
 * @swagger
 * /api/v1/admin/editProfile:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: firstName
 *         description: firstName
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: countryCode
 *         description: countryCode
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *       - name: address
 *         description: address
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Your profile details has been updated sucessfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.put('/editProfile', auth.verifyToken, adminController.editProfile)

router.post('/addTransferCategory',adminController.addTransferType)
/**
 * @swagger
 * /api/v1/admin/addCustomer:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Customer successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addCustomer', auth.verifyToken, validation.customerValidation, adminController.addCustomer)

/**
 * @swagger
 * /api/v1/admin/viewCustomer:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Customer data found successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/viewCustomer', auth.verifyToken, validation.customerViewValidation, adminController.viewCustomer)

/**
 * @swagger
 * /api/v1/admin/editCustomer:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
 *         in: formData
 *         required: false
 *       - name: confirmPassword
 *         description: confirmPassword
 *         in: formData
 *         required: false
 *       - name: address
 *         description: address
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Customer detils edited successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editCustomer', auth.verifyToken, validation.customerViewValidation, adminController.editCustomer)

/**
 * @swagger
 * /api/v1/admin/deleteCustomer/{customerId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: customerId
 *         description: customerId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteCustomer/:customerId', auth.verifyToken, adminController.deleteCustomer)

/**
 * @swagger
 * /api/v1/admin/listCustomers:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: pageNumber
 *         description: pageNumber
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Customer details found successfully 
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/listCustomers', auth.verifyToken, adminController.listCustomers)

/**
 * @swagger
 * /api/v1/admin/addCountry:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: country
 *         description: country
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Country successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addCountry', auth.verifyToken, validation.countryValidation, adminController.addCountry)
/**
 * @swagger
 * /api/v1/admin/addVisa:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: visaForms
 *         description: visaForms
 *         in: formData
 *         required: true
 *       - name: guidelines
 *         description: guidelines
 *         in: formData
 *         required: true
 *       - name: documentRequired
 *         description: documentRequired
 *         in: formData
 *         required: true
 *       - name: photoSpecification
 *         description: photoSpecification
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/addVisa',auth.verifyToken,adminController.addVisa)
/**
 * @swagger
 * /api/v1/admin/editVisa:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: visaId
 *         description: visaId
 *         in: formData
 *         required: true
 *       - name: visaForms
 *         description: visaForms
 *         in: formData
 *         required: false
 *       - name: guidelines
 *         description: guidelines
 *         in: formData
 *         required: false
 *       - name: documentRequired
 *         description: documentRequired
 *         in: formData
 *         required: false
 *       - name: photoSpecification
 *         description: photoSpecification
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Data is updated successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/editVisa',auth.verifyToken,adminController.editVisa)
/**
 * @swagger
 * /api/v1/admin/deleteVisa/{visaId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: visaId
 *         description: visaId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteVisa/:visaId',auth.verifyToken,adminController.deleteVisa)
/**
 * @swagger
 * /api/v1/admin/viewVisa/{visaId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: visaId
 *         description: visaId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewVisa/:visaId',auth.verifyToken,adminController.viewVisa)
/**
 * @swagger
 * /api/v1/admin/visaList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: visaId
 *         description: visaId
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/visaList',auth.verifyToken,adminController.visaList)
/**
 * @swagger
 * /api/v1/admin/viewCountry/{countryId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewCountry/:countryId', auth.verifyToken, adminController.viewCountry)

/**
 * @swagger
 * /api/v1/admin/editCountry:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: country
 *         description: country
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editCountry', auth.verifyToken, validation.editCountryValidation, adminController.editCountry)

/**
 * @swagger
 * /api/v1/admin/deleteCountry/{countryId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteCountry/:countryId', auth.verifyToken, adminController.deleteCountry)

/**
 * @swagger
 * /api/v1/admin/countryList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/countryList', auth.verifyToken, adminController.countryList)

/**
 * @swagger
 * /api/v1/admin/addPackageType:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: type
 *         description: type
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Package type has been added successfully
 *       404:
 *         description: This type already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addPackageType', auth.verifyToken, adminController.addPackageType)

/**
 * @swagger
 * /api/v1/admin/viewPackageType/{typeId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewPackageType/:typeId', auth.verifyToken, adminController.viewPackageType)

/**
 * @swagger
 * /api/v1/admin/editPackageType:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: false
 *       - name: type
 *         description: type
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editPackageType', auth.verifyToken, adminController.editPackageType)

/**
 * @swagger
 * /api/v1/admin/deletePackageType/{typeId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deletePackageType/:typeId', auth.verifyToken, adminController.deletePackageType)

/**
 * @swagger
 * /api/v1/admin/packageTypeList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/packageTypeList', auth.verifyToken, adminController.packageTypeList)

/**
 * @swagger
 * /api/v1/admin/addDestination:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: destination
 *         description: destination
 *         in: formData
 *         required: true
 *       - name: insurance
 *         description: insurance
 *         in: formData
 *         required: true
 *       - name: insuranceAmount
 *         description: insuranceAmount
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Destination has been added successfully
 *       404:
 *         description: This destination already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/addDestination', auth.verifyToken, adminController.addDestination)

/**
 * @swagger
 * /api/v1/admin/editDestination:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: false
 *       - name: destination
 *         description: destination
 *         in: formData
 *         required: false
 *       - name: insurance
 *         description: insurance
 *         in: formData
 *         required: false
 *       - name: insuranceAmount
 *         description: insuranceAmount
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editDestination', auth.verifyToken, adminController.editDestination)

/**
 * @swagger
 * /api/v1/admin/viewDestination/{destinationId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewDestination/:destinationId', auth.verifyToken, adminController.viewDestination)

/**
 * @swagger
 * /api/v1/admin/deleteDestination/{destinationId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteDestination/:destinationId', auth.verifyToken, adminController.deleteDestination)

/**
 * @swagger
 * /api/v1/admin/destinationList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/destinationList', auth.verifyToken, adminController.destinationList)

/**
 * @swagger
 * /api/v1/admin/viewTransferCategory/{categoryId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewTransferCategory/:categoryId', auth.verifyToken, adminController.viewTransferCategory)

/**
 * @swagger
 * /api/v1/admin/editTransferCategory:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: formData
 *         required: true
 *       - name: category
 *         description: category
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editTransferCategory', auth.verifyToken, adminController.editTransferCategory)

/**
 * @swagger
 * /api/v1/admin/deleteTransferCategory/{categoryId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteTransferCategory/:categoryId', auth.verifyToken, adminController.deleteTransferCategory)

/**
 * @swagger
 * /api/v1/admin/transferCategoryList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/transferCategoryList', auth.verifyToken, adminController.transferCategoryList)

/**
 * @swagger
 * /api/v1/admin/viewTransferType/{typeId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewTransferType/:typeId', auth.verifyToken, adminController.viewTransferType)

/**
 * @swagger
 * /api/v1/admin/editTransferType:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: formData
 *         required: true
 *       - name: type
 *         description: type
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editTransferType', auth.verifyToken, adminController.editTransferType)

/**
 * @swagger
 * /api/v1/admin/deleteTransferType/{typeId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteTransferType/:typeId', auth.verifyToken, adminController.deleteTransferType)

/**
 * @swagger
 * /api/v1/admin/transferTypeList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/transferTypeList', auth.verifyToken, adminController.transferTypeList)

/**
 * @swagger
 * /api/v1/admin/addBanner:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *       - name: bannerPic
 *         description: bannerPic
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Banner has been added successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addBanner', auth.verifyToken, validation.addBannerValidations, adminController.addBanner)

/**
 * @swagger
 * /api/v1/admin/editBanner:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: bannerId
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: false
 *       - name: bannerPic
 *         description: bannerPic
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editBanner', auth.verifyToken, validation.editBannerValidation, adminController.editBanner)

/**
 * @swagger
 * /api/v1/admin/viewBanner/{bannerId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: bannerId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewBanner/:bannerId', auth.verifyToken, adminController.viewBanner)

/**
 * @swagger
 * /api/v1/admin/deleteBanner/{bannerId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: bannerId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteBanner/:bannerId', auth.verifyToken, adminController.deleteBanner)

/**
 * @swagger
 * /api/v1/admin/bannerList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: pageNumber
 *         description: pageNumber
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/bannerList', auth.verifyToken, adminController.bannerList)

/**
 * @swagger
 * /api/v1/admin/viewInquiry/{contactId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: contactId
 *         description: contactId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewInquiry/:contactId', auth.verifyToken, adminController.viewInquiry)

/**
 * @swagger
 * /api/v1/admin/deleteInquiry/{contactId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: contactId
 *         description: contactId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteInquiry/:contactId', auth.verifyToken, adminController.deleteInquiry)

/**
 * @swagger
 * /api/v1/admin/inquiryList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/inquiryList', auth.verifyToken, adminController.inquiryList)

/**
 * @swagger
 * /api/v1/admin/addSubAdmin:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password
 *         in: formData
 *         required: true
 *       - name: address
 *         description: address
 *         in: formData
 *         required: true
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: customerManagement
 *         description: customerManagement
 *         in: formData
 *         required: false
 *       - name: subAdminManagement
 *         description: subAdminManagement
 *         in: formData
 *         required: false
 *       - name: packageManagement
 *         description: packageManagement
 *         in: formData
 *         required: false
 *       - name: bookingManagement
 *         description: bookingManagement
 *         in: formData
 *         required: false
 *       - name: transferManagement
 *         description: transferManagement
 *         in: formData
 *         required: false
 *       - name: sightseeingManagement
 *         description: sightseeingManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: visaManagement
 *         description: visaManagement
 *         in: formData
 *         required: false
 *       - name: contentManagement
 *         description: contentManagement
 *         in: formData
 *         required: false
 *       - name: inquiryManagement
 *         description: inquiryManagement
 *         in: formData
 *         required: false
 *       - name: supportManagement
 *         description: supportManagement
 *         in: formData
 *         required: false
 *       - name: settingManagement
 *         description: settingManagement
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Sub-admin was created successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/addSubAdmin', auth.verifyToken, adminController.addSubAdmin)

/**
 * @swagger
 * /api/v1/admin/editSubAdmin:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subAdminId
 *         description: subAdminId
 *         in: formData
 *         required: true
 *       - name: name
 *         description: name
 *         in: formData
 *         required: false
 *       - name: email
 *         description: email
 *         in: formData
 *         required: false
 *       - name: mobileNumber
 *         description: mobileNumber
 *         in: formData
 *         required: false
 *       - name: password
 *         description: password
 *         in: formData
 *         required: false
 *       - name: address
 *         description: address
 *         in: formData
 *         required: false
 *       - name: permissionId
 *         description: permissionId
 *         in: formData
 *         required: false
 *       - name: dashboard
 *         description: dashboard
 *         in: formData
 *         required: false
 *       - name: customerManagement
 *         description: customerManagement
 *         in: formData
 *         required: false
 *       - name: subAdminManagement
 *         description: subAdminManagement
 *         in: formData
 *         required: false
 *       - name: packageManagement
 *         description: packageManagement
 *         in: formData
 *         required: false
 *       - name: bookingManagement
 *         description: bookingManagement
 *         in: formData
 *         required: false
 *       - name: transferManagement
 *         description: transferManagement
 *         in: formData
 *         required: false
 *       - name: sightseeingManagement
 *         description: sightseeingManagement
 *         in: formData
 *         required: false
 *       - name: transactionManagement
 *         description: transactionManagement
 *         in: formData
 *         required: false
 *       - name: visaManagement
 *         description: visaManagement
 *         in: formData
 *         required: false
 *       - name: contentManagement
 *         description: contentManagement
 *         in: formData
 *         required: false
 *       - name: inquiryManagement
 *         description: inquiryManagement
 *         in: formData
 *         required: false
 *       - name: supportManagement
 *         description: supportManagement
 *         in: formData
 *         required: false
 *       - name: settingManagement
 *         description: settingManagement
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.put('/editSubAdmin', auth.verifyToken, adminController.editSubAdmin)

/**
 * @swagger
 * /api/v1/admin/viewSubAdmin/{subAdminId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subAdminId
 *         description: subAdminId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewSubAdmin/:subAdminId', auth.verifyToken, adminController.viewSubAdmin)

/**
 * @swagger
 * /api/v1/admin/blockUnblockSubAdmin:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subAdminId
 *         description: subAdminId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Your status has been changed successfully
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.post('/blockUnblockSubAdmin', auth.verifyToken, adminController.blockUnblockSubAdmin)

/**
 * @swagger
 * /api/v1/admin/deleteSubAdmin/{subAdminId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: subAdminId
 *         description: subAdminId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: This user does not exist
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteSubAdmin/:subAdminId', auth.verifyToken, adminController.deleteSubAdmin)

/**
 * @swagger
 * /api/v1/admin/subAdminList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/subAdminList', auth.verifyToken, adminController.subAdminList)

/**
 * @swagger
 * /api/v1/admin/addCarType:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: carType
 *         description: carType
 *         in: formData
 *         required: true
 *       - name: price
 *         description: price
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addCarType', auth.verifyToken, adminController.addCarType)

/**
 * @swagger
 * /api/v1/admin/viewCarType/{typeId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewCarType/:typeId', auth.verifyToken, adminController.viewCarType)

/**
 * @swagger
 * /api/v1/admin/editCarType:
 *   put:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: typeId
 *         description: typeId
 *         in: formData
 *         required: true
 *       - name: carType
 *         description: carType
 *         in: formData
 *         required: false
 *       - name: price
 *         description: price
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editCarType', auth.verifyToken, adminController.editCarType)

/**
* @swagger
* /api/v1/admin/deleteCarType/{typeId}:
*   delete:
*     tags:
*       - ADMIN
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: typeId
*         description: typeId
*         in: path
*         required: true
*     responses:
*       200:
*         description: Successfully deleted
*       404:
*         description: Requested data not found
*       500:
*         description: Internal Server Error
*/

router.delete('/deleteCarType/:typeId', auth.verifyToken, adminController.deleteCarType)

/**
 * @swagger
 * /api/v1/admin/carTypeList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/carTypeList', auth.verifyToken, adminController.carTypeList)

/**
 * @swagger
 * /api/v1/admin/viewBooking/{bookingId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: bookingId
 *         description: bookingId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewBooking/:bookingId', auth.verifyToken, adminController.viewBooking)

/**
 * @swagger
 * /api/v1/admin/deleteBooking/{bookingId}:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: bookingId
 *         description: bookingId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteBooking/:bookingId', auth.verifyToken, adminController.deleteBooking)

/**
 * @swagger
 * /api/v1/admin/bookingList:
 *   delete:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/bookingList', auth.verifyToken, adminController.bookingList)

router.post('/addTransfer', auth.verifyToken, adminController.addTransfer)

router.put('/editTransfer', auth.verifyToken, adminController.editTransfer)

router.get('/viewTransfer', auth.verifyToken, adminController.viewTransfer)

router.delete('/deleteTransfer', auth.verifyToken, adminController.deleteTransfer)

router.post('/transferList', auth.verifyToken, adminController.transferList)

/**
 * @swagger
 * /api/v1/admin/addPackage:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: packageTypeId
 *         description: packageTypeId
 *         in: formData
 *         required: true
 *       - name: packageName
 *         description: packageName
 *         in: formData
 *         required: true
 *       - name: packageDays
 *         description: packageDays
 *         in: formData
 *         required: true
 *       - name: packageNights
 *         description: packageNights
 *         in: formData
 *         required: true
 *       - name: packageDescription
 *         description: packageDescription
 *         in: formData
 *         required: true
 *       - name: transferCategoryId
 *         description: transferCategoryId
 *         in: formData
 *         required: true
 *       - name: transferTypeId
 *         description: transferTypeId
 *         in: formData
 *         required: true
 *       - name: carTypeId
 *         description: carTypeId
 *         in: formData
 *         required: true
 *       - name: flightsIncluded
 *         description: flightsIncluded
 *         in: formData
 *         required: true
 *       - name: hotelsIncluded
 *         description: hotelsIncluded
 *         in: formData
 *         required: true
 *       - name: transferIncluded
 *         description: transferIncluded
 *         in: formData
 *         required: true
 *       - name: sightseeingIncluded
 *         description: sightseeingIncluded
 *         in: formData
 *         required: true
 *       - name: ownerName
 *         description: ownerName
 *         in: formData
 *         required: true
 *       - name: ownerContact
 *         description: ownerContact
 *         in: formData
 *         required: true
 *       - name: pricePerNight
 *         description: pricePerNight
 *         in: formData
 *         required: true
 *       - name: status
 *         description: status
 *         in: formData
 *         required: true
 *       - name: packagePicture
 *         description: packagePicture
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addPackage', auth.verifyToken,adminController.addPackage)

 /**
 * @swagger
 * /api/v1/admin/editPackage:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: packageId
 *         description: package Id
 *         in: header
 *         required: true
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: false
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: false
 *       - name: packageTypeId
 *         description: packageTypeId
 *         in: formData
 *         required: false
 *       - name: packageName
 *         description: packageName
 *         in: formData
 *         required: false
 *       - name: packageDays
 *         description: packageDays
 *         in: formData
 *         required: false
 *       - name: packageNights
 *         description: packageNights
 *         in: formData
 *         required: false
 *       - name: packageDescription
 *         description: packageDescription
 *         in: formData
 *         required: false
 *       - name: transferCategoryId
 *         description: transferCategoryId
 *         in: formData
 *         required: false
 *       - name: transferTypeId
 *         description: transferTypeId
 *         in: formData
 *         required: false
 *       - name: carTypeId
 *         description: carTypeId
 *         in: formData
 *         required: false
 *       - name: flightsIncluded
 *         description: flightsIncluded
 *         in: formData
 *         required: false
 *       - name: hotelsIncluded
 *         description: hotelsIncluded
 *         in: formData
 *         required: false
 *       - name: transferIncluded
 *         description: transferIncluded
 *         in: formData
 *         required: false
 *       - name: sightseeingIncluded
 *         description: sightseeingIncluded
 *         in: formData
 *         required: false
 *       - name: ownerName
 *         description: ownerName
 *         in: formData
 *         required: false
 *       - name: ownerContact
 *         description: ownerContact
 *         in: formData
 *         required: false
 *       - name: pricePerNight
 *         description: pricePerNight
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: packagePicture
 *         description: packagePicture
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully edit.
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/editPackage', auth.verifyToken,adminController.editPackage)

/**
* @swagger
* /api/v1/admin/deletePackage/{packageId}:
*   delete:
*     tags:
*       - ADMIN
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: package id
*         in: path
*         required: true
*     responses:
*       200:
*         description: Successfully deleted
*       404:
*         description: Requested data not found
*       500:
*         description: Internal Server Error
*/

router.delete('/deletePackage/:packageId', auth.verifyToken, adminController.deletePackage)

/**
 * @swagger
 * /api/v1/admin/viewPackage/{packageId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: packageId
 *         description: type Id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewPackage/:packageId', auth.verifyToken, adminController.viewPackage)

/**
 * @swagger
 * /api/v1/admin/packageList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *       - name: packageTypeId
 *         description: packageTypeId
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/packageList', auth.verifyToken, adminController.packageList)

/**
 * @swagger
 * /api/v1/admin/addSightseeing:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: sightName
 *         description: sightName
 *         in: formData
 *         required: true
 *       - name: adultcost
 *         description: adultcost
 *         in: formData
 *         required: true
 *       - name: childCost
 *         description: childCost
 *         in: formData
 *         required: true
 *       - name: inclusion
 *         description: inclusion
 *         in: formData
 *         required: true
 *       - name: description
 *         description: description
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         required: false
 *       - name: videoLink
 *         description: videoLink
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addSightseeing',auth.verifyToken,adminController.addSightseeing)

/**
 * @swagger
 * /api/v1/admin/editSightseeing:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: sightseeingId
 *         description: sightseeingId
 *         in: header
 *         required: true
 *       - name: destinationId
 *         description: destinationId
 *         in: formData
 *         required: false
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: false
 *       - name: sightName
 *         description: sightName
 *         in: formData
 *         required: false
 *       - name: adultcost
 *         description: adultcost
 *         in: formData
 *         required: false
 *       - name: childCost
 *         description: childCost
 *         in: formData
 *         required: false
 *       - name: inclusion
 *         description: inclusion
 *         in: formData
 *         required: false
 *       - name: description
 *         description: description
 *         in: formData
 *         required: false
 *       - name: image
 *         description: transferCategoryId
 *         in: formData
 *         required: false
 *       - name: videoLink
 *         description: videoLink
 *         in: formData
 *         required: false
 *       - name: status
 *         description: status
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully edit
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/editSightSeeing',adminController.editSightseeing)

/**
* @swagger
* /api/v1/admin/deleteSightseeing:
*   delete:
*     tags:
*       - ADMIN
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: sightseeingId
*         description: sightseeingId 
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Successfully deleted
*       404:
*         description: Requested data not found
*       500:
*         description: Internal Server Error
*/

router.delete('/deleteSightseeing', auth.verifyToken, adminController.deleteSightseeing)

/**
 * @swagger
 * /api/v1/admin/viewSightseeing/{sightseeingId}:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: sightseeingId
 *         description: sightseeingId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/viewSightseeing/:sightseeingId', auth.verifyToken, adminController.viewSightseeing)

/**
 * @swagger
 * /api/v1/admin/packageList:
 *   post:
 *     tags:
 *       - ADMIN
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: formData
 *         required: false
 *       - name: sightseeingId
 *         description: sightseeingId
 *         in: formData
 *         required: false
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: false
 *       - name: page
 *         description: page
 *         in: formData
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Requested data found
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/sightseeingList', auth.verifyToken, adminController.sightseeingList)
router.post('/transactionList',adminController.viewTransactionList)



module.exports = router;