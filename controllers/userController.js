const userModel = require('../models/userModel');
const countryModel = require('../models/countryModel');
const contactUsModel = require('../models/contactUsModel');
const sightSeeingModel = require('../models/sightseeingModel')
const packageModel = require('../models/packageModel')
const paymentModel = require('../models/paymentModel')
const transferManagementModel = require('../models/transferManagementModel')
const bookingModel = require('../models/bookingModel')
const staticModel=require('../models/staticModel')
const bannerModel = require('../models/bannerModel')
const supportModel=require('../models/supportModel')
const airportModel = require('../models/airportJson')
const transferModel = require('../models/transferModel')
const packageTypeModel = require('../models/packageTypeModel')
const visaModel = require('../models/visaModel')
const destinationModel = require('../models/destinationModel')
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const carTypeModel = require('../models/carModel')
const transferCategoryModel = require('../models/transferCategoryModel')
const transferTypeModel = require('../models/transferTypeModel')
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction');
const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');
var request = require('request')
var payumoney = require('payumoney-node');
payumoney.isProdMode(true);
const cryptoJs = require('crypto-js')
payumoney.setKeys("XkmrQeSA", "hMdr4F1bDl", "OyjAUoJdCQakDpsaLCunZzvg2stjUS+5DtsTbMJy0Rg=");
var apiKey="2d6ffe9b-d5fd-4"
module.exports = {
    signUp: (req, res) => {
        try {
            if (req.body.bookingId) {
                if (req.body.password != req.body.confirmPassword) {
                    return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PASSMATCH)
                }
                var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }] }] }
                userModel.findOne(query, (userError, user) => {
                    if (userError) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else if (user) {
                        if (req.body.email == user.email) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST)
                        }
                        else {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST)
                        }
                    }
                    else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        var obj = {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }
                        new userModel(obj).save((error, result) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else {
                                bookingModel.findOneAndUpdate({ _id: req.body.bookingId }, { $set: { customerId: result._id } }, { new: true }, (updateError, update) => {
                                    if (updateError) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, update, SuccessMessage.CUST_CREATE)
                                    }
                                })
                            }
                        })
                    }
                })
            }
            else {
                if (req.body.password != req.body.confirmPassword) {
                    return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PASSMATCH)
                }
                var query2 = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }] }] }
                userModel.findOne(query2, (userError, user) => {
                    if (userError) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else if (user) {
                        if (req.body.email == user.email) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST)
                        }
                        else {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST)
                        }
                    }
                    else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        var obj = {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }
                        new userModel(obj).save((error, result) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, result, SuccessMessage.CUST_CREATE)
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    login: (req, res) => {
        try {
            if (req.body.bookingId) {
                userModel.findOne({ email: req.body.email, userType: "CUSTOMER", status: "ACTIVE"}, (error, userData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        const check = bcrypt.compareSync(req.body.password, userData.password)
                        if (check) {
                            var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'orbistur', { expiresIn: '24h' });
                            var result = {
                                userId: userData._id,
                                token: token,
                                profilePic: userData.profilePic,
                                name: userData.name,
                                email: userData.email,
                                mobileNumber: userData.mobileNumber,
                                address: userData.address,
                                permissions: userData.permissions
                            };
                            bookingModel.findOneAndUpdate({ _id:req.body.bookingId }, { $set: { customerId: userData._id } }, { new: true }, (updateError, updateResult) => {
                                if (updateError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                                }
                            })
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                        }
                    }
                })
            }
            else {
                userModel.findOne({ email: req.body.email, userType: "CUSTOMER", status: "ACTIVE" }, (error, userData) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else if (!userData) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                    }
                    else {
                        const check = bcrypt.compareSync(req.body.password, userData.password)
                        if (check) {
                            var token = jwt.sign({ id: userData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'orbistur', { expiresIn: '24h' });
                            var result = {
                                userId: userData._id,
                                token: token,
                                profilePic: userData.profilePic,
                                name: userData.name,
                                email: userData.email,
                                mobileNumber: userData.mobileNumber,
                                address: userData.address,
                                permissions: userData.permissions
                            };
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                        }
                        else {
                            response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                        }
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    /**
     * Function Name :forgot password
     * Description   : admin forgot password
     *
     * @return response
   */
    forgotPassword: (req, res) => {
        try {
            userModel.findOne({ email: req.body.email, status: "ACTIVE", userType: "CUSTOMER" }, (adminError, adminData) => {
                if (adminError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EMAIL_NOT_REGISTERED);
                }
                else {
                    commonFunction.sendLink(adminData.email, adminData.firstName, adminData._id, (emailError, emailResult) => {
                        if (emailError) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], INTERNAL_ERROR)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, [], SuccessMessage.FORGET_SUCCESS)
                        }

                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    /**
      * Function Name :resetPassword
      * Description   : resetPassword for admin
      *
      * @return response
    */

    resetPassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "CUSTOMER" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    req.body.password = bcrypt.hashSync(req.body.newPassword);
                    var confirmPassword = bcrypt.hashSync(req.body.confirmPassword);
                    var check = bcrypt.compareSync(req.body.newPassword, confirmPassword);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.NOT_MATCH);
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.params._id }, { $set: { password: confirmPassword } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, [], SuccessMessage.PASSWORD_UPDATE);
                            }
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
    * Function Name :editProfile
    * Description   : reditProfile for User
    *
    * @return response
  */
    editUser: async (req, res) => {
        try {
            let set = {}
            if (req.body.name) {
                set["name"] = req.body.name
            }
            if (req.body.email) {
                set["email"] = req.body.email
            }
            if (req.body.mobileNumber) {
                set["mobileNumber"] = req.body.mobileNumber
            }
            if (req.body.password) {
                if (req.body.password != req.body.confirmPassword) {
                    return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PASSMATCH)
                }
                else {
                    req.body.password = bcrypt.hashSync(req.body.password);
                    set["password"] = req.body.password
                }
            }
            if (req.body.address) {
                set["address"] = req.body.address
            }
            if (req.body.profilePic) {
                set["profilePic"] = await convertImage()
                //*********************Function for profile pic upload *************************************/
                function convertImage() {
                    return new Promise((resolve, reject) => {
                        commonFunction.uploadImage(req.body.profilePic, (error, upload) => {

                            if (error) {
                                console.log("Error uploading image")
                            }
                            else {
                                resolve(upload)
                            }
                        })
                    })
                }
                //*************************End of profle pic upload function *****************************

            }
            //**********************************************Update Customer ******************************************/
            function updation() {
                userModel.findOneAndUpdate({ _id: req.userId, userType: "CUSTOMER", status: { $ne: "DELETE" } }, { $set: set }, { new: true }, (error, updateResult) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                    }
                })
            }
            //**********************************************Update Customer ******************************************/

            var query = { $or: [{ email: req.body.email, mobileNumber: req.body.mobileNumber, status: "ACTIVE" }] }
            userModel.findOne(query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    if (result.email == req.body.email && req.userId == result._id) {
                        updation()
                    }
                    else {
                        return response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                    }
                }
                else {
                    updation()
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
        * Function Name : getUserProfile
        * Description   : getUserProfile for User
        *
        * @return response
    */
    getUserProfile: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (profileError, profile) => {
                if (profileError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!profile) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, profile, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
        * Function Name : searchFlights 
        * Description   : search Flights for User
        *
        * @return response
    */
    searchFlights: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",response)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("somedata", someData)
                    if (someData.ProductErrors.ErrorCode == null) {
                        res.send({ responseCode: 200, responseMessage: "Flights found successfully", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: someData.ProductErrors.ErrorCode, responseMessage: someData.ProductErrors.Message, result: JSON.parse(body) })
                    }
                }
            });

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : lookSpecificFlight
        * Description   : lookspecificFlight for User
        *
        * @return response
    */
    lookSpecificFlights: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/look'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",error)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("somedata", someData)
                    if (someData.Message == "success") {
                        res.send({ responseCode: 200, responseMessage: "Flight details fetched successfully", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    flightPricing: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/price'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",error)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("somedata", someData)
                    if (someData.IsTicketSuccess == true) {
                        res.send({ responseCode: 200, responseMessage: "Pricing fetched successfully", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: someData.ProductErrors.ErrorCode, responseMessage: someData.Message, result: JSON.parse(body) })
                    }
                }
            });

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },



    issueFlight: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var options = {
                        method: 'POST',
                        headers: {
                            "apikey":apiKey,
                            "mode": 'sandbox',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body),
                        url: 'https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/issue'
                    };
                    request(options, async function (error, response1, body) {
                        if (error) {
                            res.send({ status: false, error })
                        }
                        else {
                            // console.log("i am all",error)
                            let data = JSON.stringify(response1)
                            let newData = await JSON.parse(data)
                            // console.log("I am here 12 .>>>>>",newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log("somedata", someData)
                            if (someData.Message == "success") {
                                res.send({ responseCode: 200, responseMessage: "Flight details fetched successfully", result: JSON.parse(body) })
                            }
                            else {
                                res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                            }
                        }
                    });
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : searchHotels
        * Description   : searchHotels for User
        *
        * @return response
    */
    searchHotels: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/search'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",error)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    // console.log("somedata", someData)
                    if (someData.ProductErrors.ErrorCode == null) {
                        res.send({ responseCode: 200, responseMessage: "Hotels fetched successfully", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                    }
                }
            });

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : lookParticularHotel
        * Description   : lookParticularHotel for User
        *
        * @return response
    */
    lookParticularHotel: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/properties'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",error)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("somedata", someData)
                    if (someData.ProductErrors.ErrorCode == null && someData.search_id != null) {
                        res.send({ responseCode: 200, responseMessage: "Hotel details fetched successfully", result: JSON.parse(body) })
                    }
                    else if (someData.search_id == null && someData.ProductErrors.ErrorCode == null) {
                        res.send({ responseCode: 404, responseMessage: "Hotel data not found", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                    }
                }
            });

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    hotelPricing: (req, res) => {
        try {
            var options = {
                method: 'POST',
                headers: {
                    "apikey":apiKey,
                    "mode": 'sandbox',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body),
                url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/price'
            };
            request(options, async function (error, response1, body) {
                if (error) {
                    res.send({ status: false, error })
                }
                else {
                    // console.log("i am all",error)
                    let data = JSON.stringify(response1)
                    let newData = await JSON.parse(data)
                    // console.log("I am here 12 .>>>>>",newData.body)
                    let someData = await JSON.parse(newData.body)
                    console.log("somedata", typeof someData)
                    if (someData.IsTicketSuccess == true) {
                        res.send({ responseCode: 200, responseMessage: "Hotel pricing fetched successfully", result: JSON.parse(body) })
                    }
                    else {
                        res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                    }
                }
            });
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    hotelIssue: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var options = {
                        method: 'POST',
                        headers: {
                            "apikey":apiKey,
                            "mode": 'sandbox',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body),
                        url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/issue'
                    };
                    request(options, async function (error, response1, body) {
                        if (error) {
                            res.send({ status: false, error })
                        }
                        else {
                            // console.log("i am all",error)
                            let data = JSON.stringify(response1)
                            let newData = await JSON.parse(data)
                            // console.log("I am here 12 .>>>>>",newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log("somedata", someData)
                            if (someData.ProductErrors.ErrorCode == null) {
                                res.send({ responseCode: 200, responseMessage: "Hotel price fetched successfully", result: JSON.parse(body) })
                            }
                            else {
                                res.send({ responseCode: someData.ProductErrors.ErrorCode, responseMessage: someData.Message, result: JSON.parse(body) })
                            }
                        }
                    });
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },



    cancelHotelPolicies: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var options = {
                        method: 'POST',
                        headers: {
                            "apikey":apiKey,
                            "mode": 'sandbox',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body),
                        url: 'https://dev-sandbox-api.airhob.com/sandboxapi/stays/v1/cancellationpolicy'
                    };
                    request(options, async function (error, response1, body) {
                        console.log(response)
                        if (error) {
                            res.send({ status: false, error })
                        }
                        else {
                            // console.log("i am all",error)
                            let data = JSON.stringify(response1)
                            let newData = await JSON.parse(data)
                            // console.log("I am here 12 .>>>>>",newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log("somedata", someData)
                            // if (someData.ProductErrors.ErrorCode == null) {
                            //     res.send({ responseCode: 200, responseMessage: "Hotel price fetched successfully", result: JSON.parse(body) })
                            // }
                            // else {
                            res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                            // }
                        }
                    });
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    walletBalance: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var options = {
                        method: 'POST',
                        headers: {
                            "apikey":apiKey,
                            "mode": 'sandbox',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req.body),
                        url: 'https://dev-sandbox-api.airhob.com/sandboxapi/v1/walletbalances'
                    };
                    request(options, async function (error, response1, body) {
                        console.log(response)
                        if (error) {
                            res.send({ status: false, error })
                        }
                        else {
                            // console.log("i am all",error)
                            let data = JSON.stringify(response1)
                            let newData = await JSON.parse(data)
                            // console.log("I am here 12 .>>>>>",newData.body)
                            let someData = await JSON.parse(newData.body)
                            console.log("somedata", someData)
                            // if (someData.ProductErrors.ErrorCode == null) {
                            //     res.send({ responseCode: 200, responseMessage: "Hotel price fetched successfully", result: JSON.parse(body) })
                            // }
                            // else {
                            res.send({ responseCode: 400, responseMessage: "bad request", result: JSON.parse(body) })
                            // }
                        }
                    });
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : payment
        * Description   : paymentApi for User
        *
        * @return response
    */
    payment: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    function genTxnid() {
                        const d = new Date()
                        let gentxnid = cryptoJs.SHA256(Math.floor((Math.random() * 10) + 1).toString() + d.getTime().toString())
                        return 'v' + gentxnid.toString().substr(0, 20)
                    }
                    var paymentData = {
                        productinfo: req.body.productinfo,
                        txnid: genTxnid(),
                        amount: req.body.amount,
                        email: req.body.email,
                        phone: req.body.mobileNumber,
                        lastname: req.body.lastName,
                        firstname: req.body.firstName,
                        surl: "http://localhost:1800/payu/success", //"http://localhost:3000/payu/success"
                        furl: "http://localhost:1800/payu/fail", //"http://localhost:3000/payu/fail"
                    };
                    payumoney.makePayment(paymentData, function (error, response1) {
                        if (error) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        } else {
                            var newPayData = {
                                productinfo: req.body.productinfo,
                                txnid: paymentData.txnid,
                                amount: req.body.amount,
                                email: req.body.email,
                                phone: req.body.mobileNumber,
                                lastname: req.body.lastName,
                                firstname: req.body.firstName,
                                customerName: paymentData.firstname + ' ' + paymentData.lastname,
                                customerId: req.userId
                            }
                            var payment = new paymentModel(newPayData)
                            payment.save((saveError, save) => {
                                if (saveError) {
                                    res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                }
                                else {
                                    console.log("I am here >>>>>", (response1))
                                    res.send({ responseCode: 200, responseMessage: "Redirecting you to payment page", response })
                                }
                            })
                        }
                    });
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },



    /**
        * Function Name : sightSeeingList
        * Description   : sightSeeingList for User
        *
        * @return response
    */
    // sightSeeingList: (req, res) => {
    //     try {
    //                 var query = { status: "ACTIVE" }
    //                 if (req.body.search) {
    //                     query.sightName = new RegExp('^' + req.body.search, 'i')
    //                 }
    //                 // if (req.body.sightseeingId) {
    //                 //     query.sightseeingId = req.body.sightseeingId
    //                 // }
    //                 // if (req.body.countryId) {
    //                 //     query.countryId = req.body.countryId
    //                 // }
    //                 var options = {
    //                     page: req.body.page || 1,
    //                     limit: req.body.limit || 5,
    //                     sort: { createdAt: -1 }
    //                 }
    //                 sightseeingModel.paginate(query, options, (err, data) => {
    //                     if (err) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (data.docs.length == 0) {
    //                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //                     }
    //                     else {
    //                         response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
    //                     }
    //                 })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },
    sightSeeingList: (req, res) => {
        try {
            var query = { status: "ACTIVE" }
            if (req.body.search) {
                query.destination = new RegExp('^' + req.body.search, 'i')
            }
            sightSeeingModel.find(query, (error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
sightDetails:(req,res)=>{
    try {
        sightSeeingModel.findOne({ _id: req.params.sightId, status: "ACTIVE" },(sightError, sight) => {
            if (sightError) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!sight) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, sight, SuccessMessage.DETAIL_GET)
            }
        })
    }
    catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
    }
},

    getSightSeeingDetails: (req, res) => {
        try {
            sightSeeingModel.findOneAndUpdate({ _id: req.body.sightId, status: "ACTIVE" },{$set:{isSelected:req.body.status}},{new:true},(sightError, sight) => {
                if (sightError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!sight) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, sight, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    /**
        * Function Name : refund
        * Description   : refund for User
        *
        * @return response
    */
    refund: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    paymentModel.findOne({ customerId: req.userId, txnid: req.body.txnid }, (paymentError, paymentDetails) => {
                        if (paymentError) {
                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                        }
                        else if (!paymentDetails) {
                            res.send({ responseCode: 404, responseMessage: "No payment data found" })
                        }
                        else {
                            payumoney.paymentResponse(paymentDetails.txnid, function (error, response1) {
                                if (error) {
                                    console.log("Error")
                                } else {
                                    // console.log(response1[0].postBackParam.paymentId)
                                    var paymentId = JSON.stringify(response1[0].postBackParam.paymentId)
                                    payumoney.refundPayment(paymentId, paymentDetails.amount, function (error1, response2) {
                                        if (error1) {
                                            res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                        } else {
                                            console.log("I am here >>>>>", (response2))
                                            res.send({ responseCode: 200, responseMessage: "Initiated", response2 })
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },




    // status: (req, res) => {
    //     try {
    //         userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
    //             if (userError) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!user) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
    //             }
    //             else {
    //                 payumoney.paymentResponse("_3jbg5pxc7", function (error, response) {
    //                     if (error) {
    //                         console.log("Error")
    //                     } else {
    //                         res.send({ responseCode: 200, responseMessage: "Details fetched successfully", response })
    //                     }
    //                 });
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
    //     }
    // },

    transfersList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (noUser, user) => {
                if (noUser) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var query = { status: { $ne: "DELETE" } };
                    if (req.body.destinationId) {
                        query.destinationId = req.body.destinationId
                    }
                    req.body.limit = parseInt(req.body.limit);
                    var options = {
                        page: req.body.page || 1,
                        limit: req.body.limit || 100,
                        sort: { createdAt: -1 }
                    };
                    transferManagementModel.paginate(query, options, (error, success) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (success.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, success, SuccessMessage.DATA_FOUND);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewTransfer: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "CUSTOMER" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    transferManagementModel.findOne({ _id: req.params.transferId, status: "ACTIVE" }, (sightError, sight) => {
                        if (sightError) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!sight) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, sight, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    viewVisa: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    visaModel.findOne({ _id: req.params.visaId, status: { $ne: "DELETE" } }, (visaError, visa) => {
                        if (visaError) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!visa) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, visa, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    visaList: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (noUser, user) => {
                if (noUser) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var query = { status: "ACTIVE" }
                    if (req.body.search) {
                        query.country = new RegExp('^' + req.body.search, 'i')
                    }
                    req.body.limit = parseInt(req.body.limit);
                    var options = {
                        page: req.body.page || 1,
                        limit: req.body.limit || 100,
                        sort: { createdAt: -1 }
                    };
                    visaModel.paginate(query, options, (error, success) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (success.docs.length == 0) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, success, SuccessMessage.DATA_FOUND);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    packageList: (req, res) => {
        try {
            var query = { status: "ACTIVE" }
            packageModel.find(query, (error, success) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (success.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, success, SuccessMessage.DATA_FOUND);
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewCountry: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (visaError, visa) => {
                if (visaError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!visa) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, visa, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewDestination: (req, res) => {
        try {
            destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (visaError, visa) => {
                if (visaError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!visa) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, visa, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewPackageType: (req, res) => {
        try {
            packageTypeModel.findOne({ _id: req.body.packageTypeId, status: { $ne: "DELETE" } }, (packageError, packageResult) => {
                if (packageError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!packageResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, packageResult, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewTransferType: (req, res) => {
        try {
            transferTypeModel.findOne({ _id: req.params.visaId, status: { $ne: "DELETE" } }, (transferError, transfer) => {
                if (transferError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!visa) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, visa, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewTransferCategoryId: (req, res) => {
        try {
            transferCategoryModel.findOne({ _id: req.body.transferCategoryId, status: { $ne: "DELETE" } }, (transferError, transferData) => {
                if (transferError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!transferData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, vtransferData, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    viewCarType: (req, res) => {
        try {
            carTypeModel.findOne({ _id: req.body.carTypeId, status: { $ne: "DELETE" } }, (visaError, visa) => {
                if (visaError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!visa) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, visa, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    viewPackage: (req, res) => {
        try {
            packageModel.findOne({ _id: req.params.packageId, status: "ACTIVE" }).sort({ createdAt: -1 }).exec((packError, packageList) => {
                if (packError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!packageList) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, packageList, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    convert: (req, res) => {
        var Jimp = require('jimp');
        function convert() {
            // open a file called "lenna.png"
            Jimp.read('https://itsyourrestaurant.co.uk/wp-content/uploads/2019/06/C6BDC7A5-ED44-4F58-9F6F-FB6C00EF2B9A.jpeg', (err, lenna) => {
                if (err) {
                    console.log(err)
                }
                else {
                    lenna
                        .resize(1024, 1024) // resize
                        .quality(60) // set JPEG quality
                        .write('./image/image1.jpeg'); // save
                    console.log(lenna)
                }
            });
        }
        convert()
    },
    addTransfer: (req, res) => {
        try {
            destinationModel.findOne({ _id: req.body.destinationId, status: "ACTIVE" }, (error, destinationResult) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!destinationResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    var obj = new transferModel(req.body)
                    obj.save((saveError, save) => {
                        console.log("I am here", saveError, save)
                        if (saveError) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            transferModel.findOneAndUpdate({ _id: save._id }, { $set: { destination: destinationResult.destination } }, { new: true }, (savingError, saved) => {
                                if (savingError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    res.send({ responseCode: 200, responseMessage: "Transfer added successfully", saved })
                                }
                            })

                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    searchTrasfersByDestination: (req, res) => {

    },
    contactUs: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var obj = {
                        name: req.body.name,
                        email: req.body.email,
                        countryId: req.body.countryId,
                        countryName: result.country,
                        message: req.body.message
                    };

                    new contactUsModel(obj).save((err1, saveResult) => {
                        if (err1) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    getAirportList: (req, res) => {
        airportModel.find((error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
            }
        })
    },
    getParticularCity: (req, res) => {
        airportModel.findOne({ label: req.body.label }, (eror, result) => {
            if (eror) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
            }
        })
    },


    proceedToFlightBooking: (req, res) => {
        if (req.body.customerId) {
            userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                if (noCust) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!customer) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    packageBook()
                }
            })
        }
        else {
            packageBook()
        }
        function packageBook() {
            packageModel.findOne({ _id: req.body.packageId, status: "ACTIVE" }, (packageError, packages) => {
                if (packageError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!packages) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    req.body.packageDetails = packages
                    var data1 = {
                        bookingModule: req.body.bookingModule,
                        packageDetails: packages
                    }
                    var newData = new bookingModel(data1)
                    newData.save((errorSaving, save) => {
                        console.log(errorSaving, save)
                        if (errorSaving) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED);
                        }
                    })
                }
            })
        }
    },

    proceedToHotelBooking: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookFlights()
                    }
                })
            }
            else {
                bookFlights()
            }
            function bookFlights() {
                bookingModel.findOneAndUpdate({ _id: req.body.bookingId, status: "ACTIVE" }, { $set: { flightDetails: req.body.flightDetails } }, { new: true }, (errorResult, packages) => {
                    if (errorResult) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, packages, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    

    proceedToTransfer: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        hotelBook()
                    }
                })
            }
            else {
                hotelBook()
            }
            function hotelBook() {
                bookingModel.findOneAndUpdate({ _id: req.body.bookingId, status: "ACTIVE" }, { $set: { hotelDetails: req.body.hotelDetails } }, { new: true }, (errorResult, packages) => {
                    if (errorResult) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, packages, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    proceedTosightSeeing: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        transfer()
                    }
                })
            }
            else {
                transfer()
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
        function transfer() {
            bookingModel.findOneAndUpdate({ _id: req.body.bookingId, status: "ACTIVE" }, { $set: { transferDetails: req.body.transferDetails } }, { new: true }, (errorResult, packages) => {
                if (errorResult) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    response(res, SuccessCode.SUCCESS, packages, SuccessMessage.DATA_SAVED);
                }
            })
        }
    },

    proceedToPayment: (req, res) => {
        try {
            console.log(req.body)
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookSight()
                    }
                })
            }
            else {
                bookSight()
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
        function bookSight() {
            sightSeeingModel.findOne({_id:req.body.sightId,status:"ACTIVE"},(sightError,sight)=>{
                if (sightError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!sight) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    bookingModel.findOneAndUpdate({ _id: req.body.bookingId, status: "ACTIVE" }, { $set: { sightDetails: sight } }, { new: true }, (errorResult, packages) => {
                        if (errorResult) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, packages, SuccessMessage.DATA_SAVED);
                        }
                    })   
                }   
            })
        }
    },

    reviewBooking: (req, res) => {
        bookingModel.findOne({ _id: req.params.bookingId }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
            }
        })
    },


    bookIndividualFlight: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookIndividualFlights()
                    }
                })
            }
            else {
                bookIndividualFlights()
            }
            function bookIndividualFlights() {
                var data1 = {
                    bookingModule: req.body.bookingModule,
                    flightDetails: req.body.flightDetails,
                    customerId:req.body.customerId
                }
                var newData = new bookingModel(data1)
                newData.save((errorSaving, save) => {
                    console.log(errorSaving, save)
                    if (errorSaving) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    bookIndividualHotels: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookIndividualHotels()
                    }
                })
            }
            else {
                bookIndividualHotels()
            }
            function bookIndividualHotels() {
                var data1 = {
                    bookingModule: req.body.bookingModule,
                    hotelDetails: req.body.hotelDetails
                }
                var newData = new bookingModel(data1)
                newData.save((errorSaving, save) => {
                    console.log(errorSaving, save)
                    if (errorSaving) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },



    bookIndividualTransfer: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookIndividualTransfer()
                    }
                })
            }
            else {
                bookIndividualTransfer()
            }
            function bookIndividualTransfer() {
                var data1 = {
                    bookingModule: req.body.bookingModule,
                    transferDetails: req.body.transferDetails
                }
                var newData = new bookingModel(data1)
                newData.save((errorSaving, save) => {
                    console.log(errorSaving, save)
                    if (errorSaving) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED);
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    bookIndividualSight: (req, res) => {
        try {
            if (req.body.customerId) {
                userModel.findOne({ _id: req.body.customerId, status: "ACTIVE", userType: "CUSTOMER" }, (noCust, customer) => {
                    if (noCust) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!customer) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        bookIndividualSight()
                    }
                })
            }
            else {
                bookIndividualSight()
            }
            function bookIndividualSight() {
                sightSeeingModel.findOne({_id:req.body.sightId},(error,result)=>{
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if(!result){
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else{
                        var data1 = {
                            bookingModule: req.body.bookingModule,
                            sightDetails:result
                        }
                        var newData = new bookingModel(data1)
                        newData.save((errorSaving, save) => {
                            console.log(errorSaving, save)
                            if (errorSaving) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, save, SuccessMessage.DATA_SAVED);
                            }
                        })
                    }
                })
            }
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },




    editBookingDetails: (req, res) => {
        let edit = {}
        if (req.body.flightDetails) {
            edit['flightDetails'] = req.body.flightDetails
        }
        if (req.body.hotelDetails) {
            edit['hotelDetails'] = req.body.hotelDetails
        }
        if (req.body.transferDetails) {
            edit['transferDetails'] = req.body.transferDetails
        }
        if (req.body.sightDetails) {
            edit['sightDetails'] = req.body.sightDetails
        }
        bookingModel.findByIdAndUpdate({ _id: req.body.bookingId }, { $set: edit }, { new: true }, (error, success) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else {
                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
            }
        })

    },




    deleteBooking: (req, res) => {
        let edit = {}
        if (req.body.flightDetails) {
            edit['flightDetails'] = req.body.flightDetails
        }
        if (req.body.hotelDetails) {
            edit['hotelDetails'] = req.body.hotelDetails
        }
        if (req.body.transferDetails) {
            edit['transferDetails'] = req.body.transferDetails
        }
        if (req.body.sightDetails) {
            edit['sightDetails'] = req.body.sightDetails
        }
        bookingModel.findByIdAndUpdate({ _id: req.body.bookingId }, { $pull: edit }, { new: true }, (error, success) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!success) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, success, SuccessMessage.UPDATE_SUCCESS);
            }
        })
    },




    getCarType: (req, res) => {
        carTypeModel.findOne({ _id: req.params.carTypeId, status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.UPDATE_SUCCESS);
            }
        })
    },



    getCartypes: (req, res) => {
        carTypeModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
            }
        })
    },



    getBanners: (req, res) => {
        bannerModel.find({ status: "ACTIVE" }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
            }
        })
    },



    viewSupport: (req, res) => {
        try {
            supportModel.find({ Type: "SUPPORT" }, (error, result)=> {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    
    aboutUs:(req,res)=>{
        try{
            staticModel.findOne({Type:"ABOUT_US"},(error,result)=>{
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }  
            })
        }
        catch(error){
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    vision:(req,res)=>{
        try{
            staticModel.findOne({Type:"VISION"},(error,result)=>{
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }  
            })
        }
        catch(error){
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }   
    },

    

    // redirectToVideoLink:(req,res)=>{
    //     sightSeeingModel.findOne({id:req.body.sightId},(error,result)=>{
    //         if (error) {
    //             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
    //         }
    //         else if (!result) {
    //             response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
    //         }
    //         else {
    //             res.send({responseCode:200,responseMessage:"DONE DONA DONE",result})
    //             // res.redirect(result.videoLink)
    //         }      
    //     })
    // }
}