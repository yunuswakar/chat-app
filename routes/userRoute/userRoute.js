const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController');
const validation = require('../../middleware/validation');
const auth = require('../../middleware/auth');

/**
 * @swagger
 /api/v1/user/signUp:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Customer successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/signUp',userController.signUp)
/**
 * @swagger
 /api/v1/user/forgotPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Customer successfully added
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/forgotPassword',userController.forgotPassword)
/**
 * @swagger
 * /api/v1/user/resetPassword/{_id}:
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
router.post('/resetPassword/:_id',userController.resetPassword)
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: false
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
router.post('/login',userController.login)
/**
 * @swagger
 * /api/v1/user/editUser:
 *   put:
 *     tags:
 *       - USER
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
 *         description: User detils updated successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/editUser',auth.verifyToken,userController.editUser)
/**
 * @swagger
 * /api/v1/user/getProfile:
 *   get:
 *     tags:
 *       - USER
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
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getProfile',auth.verifyToken,userController.getUserProfile)
/**
 * @swagger
 * /api/v1/user/searchFlights:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: TripType
 *         description: TripType
 *         in: formData
 *         required: true
 *       - name: NoOfAdults
 *         description: NoOfAdults
 *         in: formData
 *         required: true
 *       - name: NoOfChilds
 *         description: NoOfChilds
 *         in: formData
 *         required: true
 *       - name: NoOfInfants
 *         description: NoOfInfants
 *         in: formData
 *         required: true
 *       - name: ClassType
 *         description: ClassType
 *         in: formData
 *         required: true
 *       - name: Economy
 *         description: Economy
 *         in: formData
 *         required: true
 *       - name: profilePic
 *         description: profilePic
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/searchFlights',userController.searchFlights)
router.post('/lookParticularFlight',userController.lookSpecificFlights)
router.post('/flightPricing',userController.flightPricing)
router.post('/issueFlight',userController.issueFlight)
router.post('/searchHotels',userController.searchHotels)
router.post('/lookParticularHotel',userController.lookParticularHotel)
router.post('/hotelPricing',userController.hotelPricing)
router.post('/hotelIssue',userController.hotelIssue)
router.post('/cancelPolicy',userController.cancelHotelPolicies)
router.post('/walletBalance',userController.walletBalance)

/**
 * @swagger
 * /api/v1/admin/sightseeingList:
 *   post:
 *     tags:
 *       - USER
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
router.post('/sightseeingList',userController.sightSeeingList)
/**
 * @swagger
 * /api/v1/user/sightDetails/{sightId}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: sightId
 *         description: sightId
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
router.get('/sightDetails/:sightId',userController.sightDetails)
router.post('/sightDetails',userController.getSightSeeingDetails)
/**
 * @swagger
 * /api/v1/user/contactUs:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email
 *         in: formData
 *         required: true
 *       - name: countryId
 *         description: countryId
 *         in: formData
 *         required: true
 *       - name: message
 *         description: message
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
router.post('/contactUs', userController.contactUs)
/**
 * @swagger
 * /api/v1/user/transfersList:
 *   post:
 *     tags:
 *       - USER
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
router.post('/transfersList',auth.verifyToken,userController.transfersList)

router.get('/viewTransfer/:transferId',auth.verifyToken,userController.viewTransfer)
/**
 * @swagger
 * /api/v1/user/payment:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: productinfo
 *         description: productinfo
 *         in: formData
 *         required: true
 *       - name: amount
 *         description: amount
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
 *       - name: lastName
 *         description: lastName
 *         in: formData
 *         required: true
 *       - name: firstName
 *         description: firstName
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
router.post('/payment',auth.verifyToken,userController.payment)
router.post('/refund',auth.verifyToken,userController.refund)
/**
 * @swagger
 * /api/v1/user/visaList:
 *   post:
 *     tags:
 *       - USER
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
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/visaList',auth.verifyToken,userController.visaList)
/**
 * @swagger
 * /api/v1/user/viewVisa/{visaId}:
 *   get:
 *     tags:
 *       - USER
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
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewVisa/:visaId',auth.verifyToken,userController.viewVisa)
/**
 * @swagger
 * /api/v1/user/packageList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/packageList',userController.packageList)
/**
 * @swagger
 * /api/v1/user/viewPackage/{packageId}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: packageId
 *         description: packageId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/viewPackage/:packageId',userController.viewPackage)
/**
 * @swagger
 * /api/v1/user/viewPackage/{packageId}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: countryId
 *         description: countryId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewCountry',userController.viewCountry)/**
* @swagger
* /api/v1/user/viewDestination:
*   get:
*     tags:
*       - USER
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     parameters:
*       - name: destinationId
*         description: destinationId
*         in: path
*         required: true
*     responses:
*       200:
*         description: data found
*       404:
*         description: Requested data not found
*       500:
*         description: Internal Server Error
*/
router.post('/viewDestination',userController.viewDestination)
/**
 * @swagger
 * /api/v1/user/viewCarType:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: carTypeId
 *         description: carTypeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewCarType',userController.viewCarType)
/**
 * @swagger
 * /api/v1/user/viewTranfer:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: transferId
 *         description: transferId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewTranfer',userController.viewTransfer)
/**
 * @swagger
 * /api/v1/user/viewTransferType:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: transferTypeId
 *         description: transferTypeId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Data is saved successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/viewTransferType',userController.viewTransferType)
router.get('/convert',userController.convert)
router.post('/addTransfer',userController.addTransfer)
/**
 * @swagger
 * /api/v1/user/getAirportList:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getAirportList',userController.getAirportList)
/**
 * @swagger
 * /api/v1/user/getAirport:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: label
 *         description: label
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/getAirport',userController.getParticularCity)
/**
 * @swagger
 * /api/v1/user/bookPackage:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: label
 *         description: label
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookPackage',userController.proceedToFlightBooking)
/**
 * @swagger
 * /api/v1/user/bookflight:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: false
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookflight',userController.proceedToHotelBooking)
/**
 * @swagger
 * /api/v1/user/bookHotel:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: false
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookHotel',userController.proceedToTransfer)
/**
 * @swagger
 * /api/v1/user/bookTransfer:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: false
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookTransfer',userController.proceedTosightSeeing)
/**
 * @swagger
 * /api/v1/user/bookTransfer:
 *   post:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerId
 *         description: customerId
 *         in: formData
 *         required: false
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/bookSightSeeing',userController.proceedToPayment)
/**
 * @swagger
 * /api/v1/user/reviewBooking/{bookingId}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
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
router.get('/reviewBooking/:bookingId',userController.reviewBooking)
/**
 * @swagger
 * /api/v1/user/editBooking:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *       - name: flightDetails
 *         description: flightDetails
 *         in: formData
 *         required: false
 *       - name: hotelDetails
 *         description: hotelDetails
 *         in: formData
 *         required: false
 *       - name: transferDetails
 *         description: transferDetails
 *         in: formData
 *         required: false
 *       - name: sightDetails
 *         description: sightDetails
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/editBooking',userController.editBookingDetails)
/**
 * @swagger
 * /api/v1/user/deleteBooking:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookingId
 *         description: bookingId
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/deleteBooking',userController.deleteBooking)
 /**
 * @swagger
 * /api/v1/user/getCarType/{carTypeId}:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: carTypeId
 *         description: carTypeId
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
router.get('/getCarType/:carTypeId',userController.getCarType)
 /**
 * @swagger
 * /api/v1/user/getCarType:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getCarTypes',userController.getCartypes)
 /**
 * @swagger
 * /api/v1/user/getAllActiveBanners:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getAllActiveBanners',userController.getBanners)

router.post('/bookIndividualFlight',userController.bookIndividualFlight)

router.post('/bookIndividualHotel',userController.bookIndividualHotels)

router.post('/bookIndividualTrnasfer',userController.bookIndividualTransfer)

router.post('/bookIndividualSight',userController.bookIndividualSight)
/**
 * @swagger
 * /api/v1/user/getSupport:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getSupport',userController.viewSupport)
/**
 * @swagger
 * /api/v1/user/getStatic:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getStatic',userController.aboutUs)
/**
 * @swagger
 * /api/v1/user/getVision:
 *   get:
 *     tags:
 *       - USER
 *     description: Check for Social existence and give the access Token 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details have been fetched successfully
 *       404:
 *         description: Requested data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getVision',userController.vision)
// router.post('/redirectToVideoLink',userController.redirectToVideoLink)
module.exports = router;
