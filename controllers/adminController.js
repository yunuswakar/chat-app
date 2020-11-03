const userModel = require('../models/userModel');
const countryModel = require('../models/countryModel');
const packageTypeModel = require('../models/packageTypeModel');
const destinationModel = require('../models/destinationModel');
const transferCategoryModel = require('../models/transferCategoryModel');
const transactionModel = require('../models/paymentModel')
const transferTypeModel = require('../models/transferTypeModel');
const bannerModel = require('../models/bannerModel');
const contactUSModel = require('../models/contactUsModel');
const carModel = require('../models/carModel');
const bookingModel = require('../models/bookingModel');
const visaModel = require('../models/visaModel');
const packageModel = require('../models/packageModel');
const sightseeingModel = require('../models/sightseeingModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const commonFunction = require('../helper/commonFunction');
const bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');


module.exports = {
    /**
     * Function Name :login
     * Description   : login for admin
     *
     * @return response
   */
    login: (req, res) => {
        try {
            console.log("client", req.body)
            userModel.findOne({ email: req.body.email, userType: { $in: ["ADMIN", "SUBADMIN"] } }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, adminData.password)
                    if (check) {
                        var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'orbistur', { expiresIn: '24h' });
                        var result = {
                            userId: adminData._id,
                            token: token,
                            firstName: adminData.firstName,
                            email: adminData.email,
                            mobileNumber: adminData.mobileNumber,
                            country: adminData.country,
                            profilePic: adminData.profilePic,
                            permissions: adminData.permissions
                        };
                        response(res, SuccessCode.SUCCESS, result, SuccessMessage.LOGIN_SUCCESS)
                    }
                    else {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.INVALID_CREDENTIAL)
                    }

                }
            })

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
            userModel.findOne({ email: req.body.email, status: "ACTIVE", userType: "ADMIN" }, (adminError, adminData) => {
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
            userModel.findOne({ _id: req.params._id, status: "ACTIVE", userType: "ADMIN" }, (err, result) => {
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
      * Function Name :getProfile
      * Description   : getProfile for admin
      *
      * @return response
    */

    getProfile: (req, res) => {
        try {
            commonFunction.jwtDecode(req.headers.token, (error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                } else {
                    userModel.findOne({ _id: result, status: "ACTIVE" }, (error, adminResult) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!adminResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        } else {
                            response(res, SuccessCode.SUCCESS, adminResult, SuccessMessage.DETAIL_GET)
                        }
                    })
                }
            })

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
      * Function Name :editProfile
      * Description   : editProfile for admin
      *
      * @return response
     */

    editProfile: (req, res) => {
        try {
            commonFunction.jwtDecode(req.headers.token, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    function updateQuery() {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        userModel.findOneAndUpdate({ _id: result }, { $set: req.body }, { new: true }, (err, updateResult) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.PROFILE_DETAILS);
                            }
                        })
                    }
                    userModel.findOne({ _id: result, userType: "ADMIN" }, (err, adminData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!adminData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                        }
                        else {
                            if (req.body.profilePic && !req.body.email && !req.body.mobileNumber) {
                                commonFunction.uploadImage(req.body.profilePic, (err, imageResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        req.body.profilePic = imageResult;
                                        updateQuery();
                                    }
                                })
                            }
                            else if (!req.body.profilePic && req.body.email && !req.body.mobileNumber) {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, emailResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (emailResult) {
                                        if (emailResult.email == req.body.email && emailResult._id == result) {
                                            updateQuery();
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                        }

                                    }
                                    else {
                                        updateQuery();
                                    }
                                })
                            }
                            else if (!req.body.profilePic && !req.body.email && req.body.mobileNumber) {
                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (mobileResult) {
                                        if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                            updateQuery();
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                        }
                                    }
                                    else {
                                        updateQuery();
                                    }
                                })
                            }
                            else if (req.body.profilePic && req.body.email && !req.body.mobileNumber) {
                                commonFunction.uploadImage(req.body.profilePic, (err, imageResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, emailResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (emailResult) {
                                                if (emailResult.email == req.body.email && emailResult._id == result) {
                                                    req.body.profilePic = imageResult;
                                                    updateQuery();
                                                }
                                                else {
                                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                                }
                                            }
                                            else {
                                                req.body.profilePic = imageResult;
                                                updateQuery();
                                            }
                                        })
                                    }
                                })

                            }
                            else if (req.body.profilePic && !req.body.email && req.body.mobileNumber) {
                                commonFunction.uploadImage(req.body.profilePic, (err, imageResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (mobileResult) {
                                                if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                                    req.body.profilePic = imageResult;
                                                    updateQuery();
                                                }
                                                else {
                                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                }
                                            }
                                            else {
                                                req.body.profilePic = imageResult;
                                                updateQuery();
                                            }
                                        })
                                    }
                                })
                            }
                            else if (!req.body.profilePic && req.body.email && req.body.mobileNumber) {
                                userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, emailResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (emailResult) {
                                        if (emailResult.email == req.body.email && emailResult._id == result) {
                                            userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                                if (err) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else if (mobileResult) {
                                                    if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                                        updateQuery();
                                                    }
                                                    else {
                                                        response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                    }
                                                }
                                                else {
                                                    updateQuery();
                                                }
                                            })
                                        }
                                        else {
                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                        }
                                    }
                                    else {
                                        userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (mobileResult) {
                                                if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                                    updateQuery();
                                                }
                                                else {
                                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                }
                                            }
                                            else {
                                                updateQuery();
                                            }
                                        })
                                    }
                                })
                            }
                            else if (req.body.profilePic && req.body.email && req.body.mobileNumber) {
                                commonFunction.uploadImage(req.body.profilePic, (err, imageResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err, emailResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else if (emailResult) {
                                                if (emailResult.email == req.body.email && emailResult._id == result) {
                                                    userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                                        if (err) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else if (mobileResult) {
                                                            if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                                                req.body.profilePic = imageResult;
                                                                updateQuery();
                                                            }
                                                            else {
                                                                response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                            }
                                                        }
                                                        else {
                                                            req.body.profilePic = imageResult;
                                                            updateQuery();
                                                        }
                                                    })
                                                }
                                                else {
                                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                                }
                                            }
                                            else {
                                                userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (err, mobileResult) => {
                                                    if (err) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else if (mobileResult) {
                                                        if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
                                                            req.body.profilePic = imageResult;
                                                            updateQuery();
                                                        }
                                                        else {
                                                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
                                                        }
                                                    }
                                                    else {
                                                        req.body.profilePic = imageResult;
                                                        updateQuery();
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                userModel.findOneAndUpdate({ _id: result }, { $set: req.body }, { new: true }, (err, updateResult) => {
                                    if (err) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
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
       * Function Name :addCustomer
       * Description   :Adding customers via admin panel
       *
       * @return response
     */

    addCustomer: (req, res) => {
        try {
            if (req.body.password != req.body.confirmPassword) {
                return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PASSMATCH)
            }
            var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }] }] }
            userModel.findOne(query, async (userError, user) => {
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
                    if (req.body.profilePic) {
                        var image = await convertImage()
                    }
                    req.body.password = bcrypt.hashSync(req.body.password);
                    var obj = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        mobileNumber: req.body.mobileNumber,
                        profilePic: image,
                        address: req.body.address
                    }
                    var customer = new userModel(obj)
                    customer.save((error, result) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.CUST_CREATE)
                        }
                    })

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
                    //*************************End of profle pic upload function *****************************/
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },

    /**
      * Function Name :addCustomer
      * Description   :View customer via admin panel
      *
      * @return response
    */

    viewCustomer: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.customerId, userType: "CUSTOMER", status: { $ne: "DELETE" } }, (userError, user) => {
                if (userError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, user, SuccessMessage.DETAIL_GET)
                }
            })

        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },


    /**
          * Function Name :editCustomer
          * Description   :Edit customer via admin panel
          *
          * @return response
        */

    editCustomer: async (req, res) => {
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
                userModel.findOneAndUpdate({ _id: req.body.customerId, userType: "CUSTOMER", status: { $ne: "DELETE" } }, { $set: set }, { new: true }, (error, updateResult) => {
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
                    if (result.email == req.body.email && req.body.customerId == result._id) {
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
      * Function Name :deleteCustomer
      * Description   :delete customer via admin panel
      *
      * @return response
    */

    deleteCustomer: (req, res) => {
        userModel.findOne({ _id: req.params.customerId, userType: "CUSTOMER", status: "ACTIVE" }, (error, customer) => {
            console.log(error, customer)
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
            }
            else if (!customer) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                userModel.findOneAndUpdate({ _id: customer._id, userType: "CUSTOMER", status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (deleteError, deleteCustomer) => {
                    if (deleteError) {
                        response(res, ErrorCode.SOMETHING_WRONG, deleteCustomer, ErrorMessage.SOMETHING_WRONG)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, deleteCustomer, SuccessMessage.DELETE_SUCCESS)
                    }
                })
            }
        })
    },

    /**
      * Function Name :listCustomers
      * Description   :List customers via admin panel With pagination and search
      *
      * @return response
    */

    listCustomers: (req, res) => {
        var query = { status: { $ne: "DELETE" }, userType: { $in: ["CUSTOMER"] } }
        if (req.body.search) {
            query.$or = [{ name: new RegExp('^' + req.body.search, "i") }, { email: new RegExp('^' + req.body.search, "i") }, { mobileNumber: new RegExp('^' + req.body.search, "i") }];
        }
        req.body.limit = parseInt(req.body.limit);
        var options = {
            page: req.body.pageNumber || 1,
            limit: req.body.limit || 10,
            sort: {
                createdAt: -1
            }
        };
        userModel.paginate(query, options, (error, customer) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
            }
            else if (customer.docs.length == 0) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
            }
            else {
                response(res, SuccessCode.SUCCESS, customer, SuccessMessage.DATA_FOUND)
            }
        })
    },

    /**
      * Function Name :addCountry
      * Description   :addCountry in setting-countries
      *
      * @return response
    */

    addCountry: (req, res) => {
        try {
            countryModel.findOne({ country: req.body.country, status: { $ne: "DELETE" } }, (error, success) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (success) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.COUNT_EXIST)
                }
                else {
                    countryModel.create(req.body, (err, save) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, save, SuccessMessage.COUNT_SUCC)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
        }

    },

    /**
      * Function Name :viewCountry
      * Description   :viewCountry in setting-countries
      *
      * @return response
    */

    viewCountry: (req, res) => {
        try {
            countryModel.findOne({ _id: req.params.countryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
      * Function Name :editCountry
      * Description   :editCountry in setting-countries
      *
      * @return response
    */

    editCountry: (req, res) => {
        try {
            console.log(req.body)
            countryModel.findOneAndUpdate({ _id: req.body.countryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (errorEdit, update) => {
                if (errorEdit) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (!update) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, update, SuccessMessage.UPDATE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    /**
      * Function Name :deleteCountry
      * Description   :deleteCountry in setting-countries
      *
      * @return response
    */

    deleteCountry: (req, res) => {
        try {
            countryModel.findOneAndUpdate({ _id: req.params.countryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (error, countryDelete) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!countryDelete) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, countryDelete, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }

    },

    /**
      * Function Name :countryList
      * Description   :countryList in setting-countries
      *
      * @return response
    */

    countryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.$or = [{ country: new RegExp('^' + req.body.search, "i") }];
            }
            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };
            countryModel.paginate(query, options, (error, countries) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (countries.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, countries, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
        }
    },

    /**
      * Function Name :addPackageType
      * Description   : addPackageType in setting-package type
      *
      * @return response
    */

    addPackageType: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    packageTypeModel.findOne({ type: req.body.type, status: { $ne: "DELETE" } }, (error, packageData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                        } else if (packageData) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TYPE_EXISTS);
                        } else {
                            var obj = {
                                type: req.body.type,
                                countryId: req.body.countryId,
                                countryName: result.country,
                                status: req.body.status
                            }
                            new packageTypeModel(obj).save((error, saveData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR)
                                } else {
                                    response(res, SuccessCode.SUCCESS, saveData, SuccessMessage.PACKAGE_TYPE_ADD);
                                }
                            })
                        }
                    })
                }
            })

        } catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
      * Function Name :viewPackageType
      * Description   : viewPackageType in setting-package type
      *
      * @return response
    */

    viewPackageType: (req, res) => {
        try {
            packageTypeModel.findOne({ _id: req.params.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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

    /**
      * Function Name :editPackageType
      * Description   : editPackageType in setting-package type
      *
      * @return response
    */

    editPackageType: (req, res) => {
        try {
            packageTypeModel.findOne({ _id: req.body.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.countryId) {
                        countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryResult) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!countryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.countryName = countryResult.country;
                                packageTypeModel.findOneAndUpdate({ _id: req.body.typeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        destinationModel.findOneAndUpdate({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
      * Function Name :deletePackageType
      * Description   : deletePackageType in setting-package type
      *
      * @return response
    */

    deletePackageType: (req, res) => {
        try {
            packageTypeModel.findOne({ _id: req.params.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    packageTypeModel.findOneAndUpdate({ _id: req.params.typeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
      * Function Name :packageTypeList
      * Description   : packageTypeList in setting-package type
      *
      * @return response
    */

    packageTypeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.$or = [{ type: new RegExp('^' + req.body.search, "i") }, { countryName: new RegExp('^' + req.body.search, "i") }]
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            packageTypeModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
      * Function Name :addDestination 
      * Description   : addDestination in content-destination
      *
      * @return response
    */

    addDestination: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOne({ destination: req.body.destination, status: { $ne: "DELETE" } }, (err, destinationData) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (destinationData) {
                            response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.DESTINATION_EXISTS);
                        }
                        else {
                            req.body.countryName = result.country;
                            new destinationModel(req.body).save((saveErr, saveResult) => {
                                if (saveErr) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DESTINATION_ADD);
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

    /**
      * Function Name :editDestination 
      * Description   : editDestination in content-destination
      *
      * @return response
    */

    editDestination: (req, res) => {
        try {
            destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.countryId) {
                        countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryResult) => {
                            if (err) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!countryResult) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                req.body.countryName = countryResult.country;
                                destinationModel.findOneAndUpdate({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })
                    }
                    else {
                        destinationModel.findOneAndUpdate({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
        * Function Name :viewDestination 
        * Description   : viewDestination in content-destination
        *
        * @return response
    */

    viewDestination: (req, res) => {
        try {
            destinationModel.findOne({ _id: req.params.destinationId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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

    /**
      * Function Name :deleteDestination 
      * Description   : deleteDestination in content-destination
      *
      * @return response
    */

    deleteDestination: (req, res) => {
        try {
            destinationModel.findOne({ _id: req.params.destinationId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOneAndUpdate({ _id: req.params.destinationId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
        * Function Name :destinationList 
        * Description   : destinationList in content-destination
        *
        * @return response
    */

    destinationList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.$or = [{ countryName: new RegExp('^' + req.body.search, "i") }, { destination: new RegExp('^' + req.body.search, "i") }]
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit)
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            destinationModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
        * Function Name :viewTransferCategory 
        * Description   : viewTransferCategory in setting-transfer category
        *
        * @return response
    */
    addTransferType: (req, res) => {
        try {
            var data = {
                category: req.body.category
            }
            var newData = new transferCategoryModel(data)
            newData.save((saveError, saved) => {
                if (saveError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "Transfer category added.", saved })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    viewTransferCategory: (req, res) => {
        try {
            transferCategoryModel.findOne({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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


    /**
        * Function Name :editTransferCategory 
        * Description   : editTransferCategory in setting-transfer category
        *
        * @return response
    */

    editTransferCategory: (req, res) => {
        try {
            transferCategoryModel.findOne({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transferCategoryModel.findOneAndUpdate({ _id: req.body.categoryId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
        * Function Name :deleteTransferCategory 
        * Description   : deleteTransferCategory in setting-transfer category
        *
        * @return response
    */

    deleteTransferCategory: (req, res) => {
        try {
            transferCategoryModel.findOne({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transferCategoryModel.findOneAndUpdate({ _id: req.params.categoryId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
        * Function Name :transferCategoryList 
        * Description   : transferCategoryList in setting-transfer category
        *
        * @return response
    */

    transferCategoryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.category = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            transferCategoryModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
        * Function Name :viewTransferType 
        * Description   : viewTransferType in setting-transfer type
        *
        * @return response
    */

    viewTransferType: (req, res) => {
        try {
            transferTypeModel.findOne({ _id: req.params.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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


    /**
        * Function Name :editTransferType 
        * Description   : editTransferType in setting-transfer type
        *
        * @return response
    */

    editTransferType: (req, res) => {
        try {
            transferTypeModel.findOne({ _id: req.body.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transferTypeModel.findOneAndUpdate({ _id: req.body.typeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
        * Function Name :deleteTransferType 
        * Description   : deleteTransferType in setting-transfer type
        *
        * @return response
    */

    deleteTransferType: (req, res) => {
        try {
            transferTypeModel.findOne({ _id: req.params.typeId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    transferTypeModel.findOneAndUpdate({ _id: req.params.typeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (updateErr, updateResult) => {
                        if (updateErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
        * Function Name :transferTypeList 
        * Description   : transferTypeList in setting-transfer type
        *
        * @return response
    */

    transferTypeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.type = new RegExp('^' + req.body.search, "i");
            }
            if (req.body.status) {
                query.status = req.body.status;
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            transferTypeModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
      * Function Name :addBanner 
      * Description   : addBanner in Banner-Management
      *
      * @return response
    */

    addBanner: (req, res) => {
        try {
            bannerModel.findOne({ title: req.body.title, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result) {
                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.BANNER_EXISTS);
                }
                else {
                    commonFunction.uploadImage(req.body.bannerPic, (err, imageResult) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        }
                        else {
                            req.body.bannerPic = imageResult;
                            new bannerModel(req.body).save((err, saveResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.BANNER_ADD);
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

    /**
    * Function Name :editBanner 
    * Description   : editBanner in Banner-Management
    *
    * @return response
    */

    editBanner: async (req, res) => {
        try {
            let set = {}
            if (req.body.status) {
                set['status'] = req.body.status
            }
            if (req.body.title) {
                set['title'] = req.body.title
            }
            if (req.body.bannerPic) {
                set["bannerPic"] = await convertImage()
                //*********************Function for profile pic upload *************************************/
                function convertImage() {
                    return new Promise((resolve, reject) => {
                        commonFunction.uploadImage(req.body.bannerPic, (error, upload) => {

                            if (error) {
                                console.log("Error uploading image")
                            }
                            else {
                                resolve(upload)
                            }
                        })
                    })
                }
                //*************************End of profle pic upload function *****************************/
            }
            bannerModel.findOneAndUpdate({ _id: req.body.bannerId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, async (error, updatedBanner) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!updatedBanner) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, updatedBanner, SuccessMessage.UPDATE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    /**
      * Function Name :viewBanner 
      * Description   : viewBanner in Banner-Management
      *
      * @return response
    */

    viewBanner: (req, res) => {
        try {
            bannerModel.findOne({ _id: req.params.bannerId, status: { $ne: "DELETE" } }, (bannerError, bannerResult) => {
                if (bannerError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!bannerResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, bannerResult, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },
    /**
      * Function Name :deleteBanner 
      * Description   : deleteBanner in Banner-Management
      *
      * @return response
    */

    deleteBanner: (req, res) => {
        try {
            const query = { _id: req.params.bannerId, status: { $ne: "DELETE" } };
            bannerModel.findOneAndUpdate(query, { $set: { status: "DELETE" } }, { new: true }, (error, bannerDelete) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!bannerDelete) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, bannerDelete, SuccessMessage.DELETE_SUCCESS)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }

    },

    /**
      * Function Name :bannerList 
      * Description   : bannerList in Banner-Management
      *
      * @return response
    */

    bannerList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.status) {
                query.status = req.body.status;
            }
            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }
            };
            bannerModel.paginate(query, options, (listError, list) => {
                if (listError) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (list.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, list, SuccessMessage.DATA_FOUND)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
      * Function Name :viewInquiry 
      * Description   : viewInquiry in Inquiry Management
      *
      * @return response
    */

    viewInquiry: (req, res) => {
        try {
            contactUSModel.findOne({ _id: req.params.contactId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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

    /**
      * Function Name :deleteInquiry 
      * Description   : deleteInquiry in Inquiry Management
      *
      * @return response
    */

    deleteInquiry: (req, res) => {
        try {
            contactUSModel.findOne({ _id: req.params.contactId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    contactUSModel.findOneAndUpdate({ _id: req.params.contactId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (err, updateResult) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS);
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
      * Function Name :inquiryList 
      * Description   : inquiryList in Inquiry Management
      *
      * @return response
    */

    inquiryList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.$or = [{ name: new RegExp('^' + req.body.search, "i") }, { countryName: new RegExp('^' + req.body.search, "i") }]
            }

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            contactUSModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :addSubAdmin
     * Description   : addSubAdmin in Sub-admin management
     *
     * @return response
    */

    addSubAdmin: (req, res) => {
        try {
            commonFunction.jwtDecode(req.headers.token, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    userModel.findOne({ _id: result, userType: "ADMIN" }, (err, adminResult) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!adminResult) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (err2, result2) => {
                                if (err2) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (result2) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
                                }
                                else {
                                    if (req.body.profilePic) {
                                        commonFunction.uploadImage(req.body.profilePic, (err, imageResult) => {
                                            if (err) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                req.body.profilePic = imageResult;
                                                req.body.firstName = req.body.name;
                                                var password = req.body.password;
                                                req.body.password = bcrypt.hashSync(req.body.password);
                                                req.body.userType = "SUBADMIN";
                                                req.body.permissions = [{
                                                    dashboard: req.body.dashboard,
                                                    customerManagement: req.body.customerManagement,
                                                    subAdminManagement: req.body.subAdminManagement,
                                                    packageManagement: req.body.packageManagement,
                                                    bookingManagement: req.body.bookingManagement,
                                                    transferManagement: req.body.transferManagement,
                                                    sightseeingManagement: req.body.sightseeingManagement,
                                                    transactionManagement: req.body.transactionManagement,
                                                    visaManagement: req.body.visaManagement,
                                                    contentManagement: req.body.contentManagement,
                                                    inquiryManagement: req.body.inquiryManagement,
                                                    supportManagement: req.body.supportManagement,
                                                    settingManagement: req.body.settingManagement
                                                }];
                                                commonFunction.emailSend(req.body.email, `Your account has been created successfully as a "Sub-Admin user". Your email and password are:- <br>Email: ${req.body.email}, <br>Password: ${password}. <br>Please click on this link for login. ${global.gConfig.adminURL}`, (emailErr, emailResult) => {
                                                    if (emailErr) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                    }
                                                    else {
                                                        new userModel(req.body).save((err, saveResult) => {
                                                            if (err) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                            }
                                                            else {
                                                                response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SUB_ADMIN_CREATED);
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        req.body.firstName = req.body.name;
                                        var password = req.body.password;
                                        req.body.password = bcrypt.hashSync(req.body.password);
                                        req.body.userType = "SUBADMIN";
                                        req.body.permissions = [{
                                            dashboard: req.body.dashboard,
                                            customerManagement: req.body.customerManagement,
                                            subAdminManagement: req.body.subAdminManagement,
                                            packageManagement: req.body.packageManagement,
                                            bookingManagement: req.body.bookingManagement,
                                            transferManagement: req.body.transferManagement,
                                            sightseeingManagement: req.body.sightseeingManagement,
                                            transactionManagement: req.body.transactionManagement,
                                            visaManagement: req.body.visaManagement,
                                            contentManagement: req.body.contentManagement,
                                            inquiryManagement: req.body.inquiryManagement,
                                            supportManagement: req.body.supportManagement,
                                            settingManagement: req.body.settingManagement
                                        }];
                                        commonFunction.emailSend(req.body.email, `Your account has been created successfully as a "Sub-Admin user". Your email and password are:- <br>Email: ${req.body.email}, <br>Password: ${password}. <br>Please click on this link for login. ${global.gConfig.adminURL}`, (emailErr, emailResult) => {
                                            if (emailErr) {
                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                            }
                                            else {
                                                new userModel(req.body).save((err, saveResult) => {
                                                    if (err) {
                                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                                    }
                                                    else {
                                                        response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.SUB_ADMIN_CREATED);
                                                    }
                                                })

                                            }
                                        })
                                    }

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

    /**
     * Function Name :viewSubAdmin
     * Description   : viewSubAdmin in Sub-admin management
     *
     * @return response
    */

    viewSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.params.subAdminId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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

    /**
     * Function Name :editSubAdmin
     * Description   : editSubAdmin in Sub-admin management
     *
     * @return response
    */

    editSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subAdminId, userType: "SUBADMIN", status: { $ne: "DELETE" } }, (err, subAdminResult) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!subAdminResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (req.body.password) {
                        commonFunction.emailSend(subAdminResult.email, `Dear ${subAdminResult.firstName}, <br>Your password has been updated as:- ${req.body.password}.Please click on this link for login. ${global.gConfig.adminURL}`, (emailErr, emailData) => {
                            if (emailErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG);
                            }
                            else {
                                req.body.firstName = req.body.name;
                                req.body.password = bcrypt.hashSync(req.body.password);
                                req.body.permissions = [{
                                    dashboard: req.body.dashboard,
                                    customerManagement: req.body.customerManagement,
                                    subAdminManagement: req.body.subAdminManagement,
                                    packageManagement: req.body.packageManagement,
                                    bookingManagement: req.body.bookingManagement,
                                    transferManagement: req.body.transferManagement,
                                    sightseeingManagement: req.body.sightseeingManagement,
                                    transactionManagement: req.body.transactionManagement,
                                    visaManagement: req.body.visaManagement,
                                    contentManagement: req.body.contentManagement,
                                    inquiryManagement: req.body.inquiryManagement,
                                    supportManagement: req.body.supportManagement,
                                    settingManagement: req.body.settingManagementt
                                }];
                                userModel.findOneAndUpdate({ _id: req.body.subAdminId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                                    if (updateErr) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else {
                                        response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
                                    }
                                })
                            }
                        })

                    }
                    else {
                        req.body.firstName = req.body.name;
                        req.body.permissions = [{
                            _id: req.body.permissionId,
                            dashboard: req.body.dashboard,
                            customerManagement: req.body.customerManagement,
                            subAdminManagement: req.body.subAdminManagement,
                            packageManagement: req.body.packageManagement,
                            bookingManagement: req.body.bookingManagement,
                            transferManagement: req.body.transferManagement,
                            sightseeingManagement: req.body.sightseeingManagement,
                            transactionManagement: req.body.transactionManagement,
                            visaManagement: req.body.visaManagement,
                            contentManagement: req.body.contentManagement,
                            inquiryManagement: req.body.inquiryManagement,
                            supportManagement: req.body.supportManagement,
                            settingManagement: req.body.settingManagement
                        }];
                        userModel.findOneAndUpdate({ _id: req.body.subAdminId }, { $set: req.body }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
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
     * Function Name :deleteSubAdmin
     * Description   : deleteSubAdmin in Sub-admin management
     *
     * @return response
    */

    deleteSubAdmin: (req, res) => {
        try {
            userModel.findOneAndUpdate({ _id: req.params.subAdminId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (error, success) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!success) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, success, SuccessMessage.UPDATE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
     * Function Name :blockUnblockSubAdmin
     * Description   : blockUnblockSubAdmin in Sub-admin management
     *
     * @return response
    */

    blockUnblockSubAdmin: (req, res) => {
        try {
            userModel.findOne({ _id: req.body.subAdminId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    if (result.status == "ACTIVE") {
                        userModel.findOneAndUpdate({ _id: req.body.subAdminId, status: "ACTIVE" }, { $set: { status: "BLOCK" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.BLOCK_SUCCESS);
                            }
                        })
                    }
                    else {
                        userModel.findOneAndUpdate({ _id: req.body.subAdminId, status: "BLOCK" }, { $set: { status: "ACTIVE" } }, { new: true }, (updateErr, updateResult) => {
                            if (updateErr) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UNBLOCK_SUCCESS);
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
     * Function Name :subAdminList
     * Description   : subAdminList in Sub-admin management
     *
     * @return response
    */

    subAdminList: (req, res) => {
        try {
            var query = { userType: "SUBADMIN", status: { $ne: "DELETE" } };
            if (req.body.search) {
                query.$or = [{ firstName: new RegExp('^' + req.body.search, "i") }, { email: new RegExp('^' + req.body.search, "i") }, { mobileNumber: new RegExp('^' + req.body.search, "i") }]
            }

            req.body.limit = parseInt(req.body.limit);

            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };

            userModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
      * Function Name :addCarType 
      * Description   : add car type
      *
      * @return response
    */

    addCarType: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!countryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, destinationData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!destinationData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            carModel.findOne({ carType: req.body.carType, status: { $ne: "DELETE" } }, (err, result) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (result) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.TYPE_EXISTS);
                                }
                                else {
                                    new carModel(req.body).save((saveErr, saveResult) => {
                                        if (saveErr) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.CAR_TYPE_ADD);
                                        }
                                    })
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

    /**
      * Function Name :viewCarType
      * Description   :viewCarType in setting car type
      *
      * @return response
    */

    viewCarType: (req, res) => {
        try {
            carModel.findOne({ _id: req.params.typeId, status: { $ne: "DELETE" } }, (error, data) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!data) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
         * Function Name :editCarType 
         * Description   : edit car type
         *
         * @return response
       */

    editCarType: (req, res) => {
        try {
            carModel.findOneAndUpdate({ _id: req.body.typeId, status: { $ne: "DELETE" } }, { $set: req.body }, { new: true }, (error, data) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!data) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.UPDATE_SUCCESS);
                }

            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
          * Function Name :deleteCarType 
          * Description   : delete car type
          *
          * @return response
        */

    deleteCarType: (req, res) => {
        try {
            carModel.findOneAndUpdate({ _id: req.params.typeId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (error, success) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!success) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, success, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
      * Function Name :carTypeList 
      * Description   :carTypeList in setting car type
      *
      * @return response
    */

    carTypeList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.search) {
                query.carType = new RegExp('^' + req.body.search, "i")
            }
            if (req.body.status) {
                query.status = req.body.status
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            }
            carModel.paginate(query, options, (error, data) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :viewBooking
       * Description   :viewBooking in booking management
       *
       * @return response
     */

    viewBooking: (req, res) => {
        try {
            bookingModel.findOne({ _id: req.params.bookingId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
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

    /**
       * Function Name :deleteBooking
       * Description   :deleteBooking in booking management
       *
       * @return response
     */

    deleteBooking: (req, res) => {
        try {
            bookingModel.findOne({ _id: req.params.bookingId, status: { $ne: "DELETE" } }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    bookingModel.findOneAndUpdate({ _id: req.params.bookingId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (err, updateResult) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.DELETE_SUCCESS)
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
       * Function Name :bookingList
       * Description   :bookingList in booking management
       *
       * @return response
     */

    bookingList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 100,
                sort: { createdAt: -1 }
            };
            bookingModel.paginate(query, options, (err, result) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, result, SuccessMessage.DATA_FOUND);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :addTransfer
       * Description   :addTransfer in transfer management
       *
       * @return response
     */

    addTransfer: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: "ACTIVE" }, (countryError, country) => {
                if (countryError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!country) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOne({ _id: req.body.destinationId, status: "ACTIVE" }, (destinationError, destination) => {
                        if (destinationError) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!destination) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            var data = new transferManagementModel(req.body)
                            data.save((error, save) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, save, SuccessMessage.DETAIL_GET);
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

    /**
       * Function Name :editTransfer
       * Description   :editTransfer in transfer management
       *
       * @return response
     */

    editTransfer: (req, res) => {
        try {
            if (req.body.countryId && !req.body.destinationId) {
                countryModel.findOne({ _id: req.body.countryId, status: "ACTIVE" }, (err, country) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        editData()
                    }
                })
            }

            else if (req.body.countryId && req.body.destinationId) {
                countryModel.findOne({ _id: req.body.countryId, status: "ACTIVE" }, (err, country) => {
                    if (err) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        destinationModel.findOne({ _id: req.body.destinationId, status: "ACTIVE" }, (destinationError, destination) => {
                            if (destinationError) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!destination) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                editData()

                            }
                        })
                    }

                })
            }
            else if (req.body.destinationId && !req.body.countryId) {
                destinationModel.findOne({ _id: req.body.destinationId, status: "ACTIVE" }, (erorDestination, destination) => {
                    if (erorDestination) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!destination) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        editData()
                    }
                })
            }
            else {
                editData()
            }
            function editData() {
                transferManagementModel.findOne({ _id: req.body.transferId, status: "ACTIVE" }, (errorManagement, management) => {
                    if (errorManagement) {
                        return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!management) {
                        return response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        transferManagementModel.findByIdAndUpdate({ _id: req.body.transferId, status: "ACTIVE" }, { $set: req.body }, { new: true }, (errorUpdate, update) => {
                            if (errorUpdate) {
                                return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else {
                                return response(res, SuccessCode.SUCCESS, update, SuccessMessage.UPDATE_SUCCESS);
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

    /**
      * Function Name :viewTransfer
      * Description   :viewTransfer in transfer management
      *
      * @return response
    */

    viewTransfer: (req, res) => {
        try {
            transferManagementModel.findOne({ _id: req.params.transferId, status: { $ne: "DELETE" } }, (transferError, transferResult) => {
                if (transferError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!transferResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, transferResult, SuccessMessage.DETAIL_GET)
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :deleteTransfer
       * Description   :deleteTransfer in transfer management
       *
       * @return response
     */

    deleteTransfer: (req, res) => {
        try {
            transferManagementModel.findOneAndUpdate({ _id: req.params.transferId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (error, deleteTransfer) => {
                if (error) {
                    return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!deleteTransfer) {
                    return response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    return response(res, SuccessCode.SUCCESS, deleteTransfer, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :transferList
       * Description   :transferList in transfer management
       *
       * @return response
     */

    transferList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } };

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
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :addVisa
       * Description   :addVisa in visa management
       *
       * @return response
    */

    addVisa: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryResult) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!countryResult) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    commonFunction.uploadImage(req.body.visaForms, (err, pdfResult) => {
                        if (err) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            commonFunction.uploadImage(req.body.guidelines, (err, guidelineResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    commonFunction.uploadImage(req.body.documentRequired, (err, documentResult) => {
                                        if (err) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            commonFunction.uploadImage(req.body.photoSpecification, (err, photoResult) => {
                                                if (err) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else {
                                                    req.body.country = countryResult.country;
                                                    req.body.visaForms = pdfResult;
                                                    req.body.guidelines = guidelineResult;
                                                    req.body.documentRequired = documentResult;
                                                    req.body.photoSpecification = photoResult;
                                                    new visaModel(req.body).save((err, saveResult) => {
                                                        if (err) {
                                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                        }
                                                        else {
                                                            response(res, SuccessCode.SUCCESS, saveResult, SuccessMessage.DATA_SAVED);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
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

    /**
      * Function Name :editVisa
      * Description   :editVisa in visa management
      *
      * @return response
   */

    editVisa: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (noUser, user) => {
                if (noUser) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    let set = {}
                    visaModel.findOne({ _id: req.body.visaId, status: "ACTIVE" }, async (noVisa, visa) => {
                        if (noVisa) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!visa) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            if (req.body.visaForms) {
                                set['visaForms'] = await uploadvisaForm()
                            }
                            if (req.body.guidelines) {
                                set['guidelines'] = await uploadGuideline()
                            }
                            if (req.body.documentRequired) {
                                set['documentRequired'] = await uploaddocument()
                            }
                            if (req.body.photoSpecification) {
                                set['photoSpecification'] = await uploadphotoSpecification()
                            }
                            visaModel.findOneAndUpdate({ _id: req.body.visaId, status: "ACTIVE" }, { $set: set }, { new: true }, (updationError, update) => {
                                if (updationError) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    response(res, SuccessCode.SUCCESS, update, SuccessMessage.UPDATE_SUCCESS);
                                }
                            })
                        }
                    })

                    function uploadvisaForm() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.visaForms, (err, photoResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    resolve(photoResult)
                                }
                            })
                        })
                    }
                    function uploadGuideline() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.guidelines, (err, photoResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    resolve(photoResult)
                                }
                            })
                        })
                    }
                    function uploaddocument() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.documentRequired, (err, photoResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    resolve(photoResult)
                                }
                            })
                        })
                    }
                    function uploadphotoSpecification() {
                        return new Promise((resolve, reject) => {
                            commonFunction.uploadImage(req.body.photoSpecification, (err, photoResult) => {
                                if (err) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else {
                                    resolve(photoResult)
                                }
                            })
                        })
                    }
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    deleteVisa: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE" }, (noUser, user) => {
                if (noUser) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!user) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    visaModel.findOneAndUpdate({ _id: req.params.visaId, status: "ACTIVE" }, { $set: { status: "DELETE" } }, { new: true }, (errorDelete, deleted) => {
                        if (errorDelete) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, deleted, SuccessMessage.DELETE_SUCCESS)
                        }
                    })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
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



    /**
       * Function Name :addPackage
       * Description   :add package by admin
       *
       * @return response
     */

    addPackage: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryData) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!countryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, destinationData) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!destinationData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            packageTypeModel.findOne({ _id: req.body.packageTypeId, status: { $ne: "DELETE" } }, async (error, packageTypeData) => {
                                if (error) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (!packageTypeData) {
                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                }
                                else {
                                    transferCategoryModel.findOne({ _id: req.body.transferCategoryId, status: "ACTIVE" }, async (transferError, transfer) => {
                                        if (transferError) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else if (!transfer) {
                                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                        }
                                        else {
                                            transferTypeModel.findOne({ _id: req.body.transferTypeId, status: "ACTIVE" }, async (transferTypeError, transferType) => {
                                                if (transferTypeError) {
                                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                }
                                                else if (!transferType) {
                                                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                                }
                                                else {
                                                    // var operation2 = false
                                                    var transferTypeArray = req.body.transferTypeId
                                                    transferTypeArray.forEach(async (Element, index, array) => {
                                                        var check2 = await transferTypeId()
                                                        //console.log(Element, index, "<<<<<<<<<<<<<<<<<<<<<<<<ALi")
                                                        //console.log(check2, "I am here to check upload ")
                                                        function transferTypeId() {
                                                            return new Promise((resolve, reject) => {
                                                                if (Element = index - 1) {
                                                                    // operation2 = true
                                                                    resolve(array)
                                                                }
                                                            })
                                                        }
                                                        carModel.findOne({ _id: req.body.carTypeId, status: "ACTIVE" }, async (carTypeError, carType) => {
                                                            if (carTypeError) {
                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                            }
                                                            else if (!carType) {
                                                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                                            }
                                                            else {
                                                                // var operation1 = false
                                                                var carTypeArray = req.body.carTypeId
                                                                carTypeArray.forEach(async (Element, index, array) => {
                                                                    var check1 = await carId()
                                                                    //console.log(check1)
                                                                    //console.log(check1, "I am here to check upload ")
                                                                    function carId() {
                                                                        return new Promise((resolve, reject) => {
                                                                            if (Element = index - 1) {
                                                                                // operation1 = true
                                                                                resolve(array)
                                                                            }
                                                                        })
                                                                    }
                                                                    // var operation = false
                                                                    //console.log(req.body.transferCategoryId)
                                                                    var result = req.body.transferCategoryId
                                                                    result.forEach(async (Element, index,
                                                                        array) => {
                                                                        //console.log(Element, index, "<<<<<<<<<<<<<<<<<<<<<<<<ALi")
                                                                        var check = await transferId()
                                                                        //console.log(check, "I am here to check upload ")
                                                                        function transferId() {
                                                                            return new Promise((resolve, reject) => {
                                                                                if (Element = index - 1) {
                                                                                    // operation = true
                                                                                    resolve(array)
                                                                                }
                                                                            })
                                                                        }
                                                                        //response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                                                        if (req.body.packagePicture) {
                                                                            req.body.packagePicture = await uploadMultipleImage()
                                                                            function uploadMultipleImage() {
                                                                                return new Promise((resolve, reject) => {
                                                                                    commonFunction.uploadImage(req.body.packagePicture, (error, upload) => {
                                                                                        if (error) {
                                                                                            //console.log("I am havung trouble uploading ")
                                                                                        }
                                                                                        else {
                                                                                            resolve(upload)
                                                                                        }
                                                                                    })
                                                                                })
                                                                                // response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                                                            }
                                                                        }
                                                                        var data = {
                                                                            countryId: countryData._id,
                                                                            country: countryData.country,
                                                                            itinery: req.body.itinery,
                                                                            exclusions: req.body.exclusions,
                                                                            packageInclusion: req.body.packageInclusion,
                                                                            packageCost: req.body.packageCost,
                                                                            termsAndConditions: req.body.termsAndConditions,
                                                                            cancellationCharge: req.body.cancellationCharge,
                                                                            destinationId: destinationData._id,
                                                                            destination: destinationData.destination,
                                                                            packageTypeId: packageTypeData._id,
                                                                            packageTypeName: packageTypeData.packageTypeData,
                                                                            packageName: req.body.packageName,
                                                                            packageDays: req.body.packageDays,
                                                                            packageNights: req.body.packageNights,
                                                                            packageDescription: req.body.packageDescription,
                                                                            transferCategoryId: check,
                                                                            transferTypeId: check2,
                                                                            carTypeId: check1,
                                                                            flightsIncluded: req.body.flightsIncluded,
                                                                            hotelsIncluded: req.body.hotelsIncluded,
                                                                            transferIncluded: req.body.transferIncluded,
                                                                            sightseeingIncluded: req.body.sightseeingIncluded,
                                                                            ownerName: req.body.ownerName,
                                                                            ownerContact: req.body.ownerContact,
                                                                            pricePerNight: req.body.pricePerNight,
                                                                            status: req.body.status ? req.body.status : "ACTIVE",
                                                                            packagePicture: req.body.packagePicture ? req.body.packagePicture : ""
                                                                        }
                                                                        new packageModel(data).save((error, saved) => {
                                                                            // console.log("saved data",error)
                                                                            if (error) {
                                                                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                                                            }
                                                                            else {
                                                                                response(res, SuccessCode.SUCCESS, saved, SuccessMessage.PACKAGE_ADD);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
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

    /**
       * Function Name :editPackage
       * Description   :edit package by admin
       *
       * @return response
     */

    editPackage: async (req, res) => {
        try {
            let set = {}
            if (req.body.countryId && !req.body.destinationId) {
                console.log("I am in country")
                set["countryId"] = req.body.countryId
                request()
                countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        editPackage()
                    }
                })
            }
            else if (!req.body.countryId && req.body.destinationId) {
                console.log("I am in the destination ")
                set["destinationId"] = req.body.destinationId
                request()
                destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        packageTypeModel.findOne({ _id: req.body.packageTypeId, status: { $ne: "DELETE" } }, async (error, packageTypeData) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!packageTypeData) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                editPackage()
                            }
                        })
                    }
                })
            }
            else if (req.body.countryId && req.body.destinationId) {
                console.log("I am in both")
                set["countryId"] = req.body.countryId
                set["destinationId"] = req.body.destinationId
                request()
                countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, country) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!country) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                packageTypeModel.findOne({ _id: req.body.packageTypeId, status: { $ne: "DELETE" } }, async (error, packageTypeData) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                    }
                                    else if (!packageTypeData) {
                                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                                    }
                                    else {
                                        editPackage()
                                    }
                                })
                            }
                        })
                    }
                })
            }
            else {
                if (!req.body.countryId && !req.body.destinationId) {
                    request()
                    editPackage()
                }
            }
            //*********************Function for profile pic upload *************************************/
            function convertImage() {
                return new Promise((resolve, reject) => {
                    commonFunction.uploadImage(req.body.packagePicture, (error, upload) => {
                        if (error) {
                            console.log("Error uploading image")
                        }
                        else {
                            resolve(upload)
                        }
                    })
                })
            }
            //*************************end of function*****************************/
            async function request() {
                if (req.body.packageName) {
                    set["packageName"] = req.body.packageName
                }
                if (req.body.packageDays) {
                    set["packageDays"] = req.body.packageDays
                }
                if (req.body.packageTypeId) {
                    set["packageTypeId"] = req.body.packageTypeId
                    set["packageTypeName"] = packageTypeData.type
                }
                if (req.body.transferCategoryId) {
                    set["transferCategoryId"] = req.body.transferCategoryId
                }
                if (req.body.transferTypeId) {
                    set["transferTypeId"] = req.body.transferTypeId
                }
                if (req.body.carTypeId) {
                    set["carTypeId"] = req.body.carTypeId
                }
                if (req.body.itinery) {
                    set["itinery"] = req.body.itinery
                }
                if (req.body.exclusions) {
                    set["exclusions"] = req.body.exclusions
                }
                if (req.body.packageInclusion) {
                    set["packageInclusion"] = req.body.packageInclusion
                }
                if (req.body.termsAndConditions) {
                    set["termsAndConditions"] = req.body.termsAndConditions
                }
                if (req.body.packageCost) {
                    set["packageCost"] = req.body.packageCost
                }
                if (req.body.cancellationCharge) {
                    set["cancellationCharge"] = req.body.cancellationCharge
                }
                if (req.body.packageNights) {
                    set["packageNights"] = req.body.packageNights
                }
                if (req.body.packageDescription) {
                    set["packageDescription"] = req.body.packageDescription
                }
                if (req.body.flightsIncluded) {
                    set["flightsIncluded"] = req.body.flightsIncluded
                }
                if (req.body.hotelsIncluded) {
                    set["hotelsIncluded"] = req.body.hotelsIncluded
                }
                if (req.body.transferIncluded) {
                    set["transferIncluded"] = req.body.transferIncluded
                }
                if (req.body.sightseeingIncluded) {
                    set["sightseeingIncluded"] = req.body.sightseeingIncluded
                }
                if (req.body.ownerContact) {
                    set["ownerContact"] = req.body.ownerContact
                }
                if (req.body.ownerName) {
                    set["sightseeingInownerNamecluded"] = req.body.ownerName
                }
                if (req.body.pricePerNight) {
                    set["pricePerNight"] = req.body.pricePerNight
                }
                if (req.body.status) {
                    set["status"] = req.body.status
                }
                if (req.body.packagePicture) {
                    set["packagePicture"] = await convertImage()
                }
            }
            function editPackage() {
                packageModel.findOneAndUpdate({ _id: req.body.packageId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, (packageErr, packageUpdate) => {
                    if (packageErr) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, packageUpdate, SuccessMessage.DETAIL_GET);
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :deletePackage
       * Description   :delete package by admin
       *
       * @return response
     */

    deletePackage: (req, res) => {
        try {
            packageModel.findOneAndUpdate({ _id: req.params.packageId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (deleteError, packageData) => {
                if (deleteError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!packageData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, packageData, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :viewPackage
       * Description   :view package by admin
       *
       * @return response
     */

    viewPackage: (req, res) => {
        try {
            packageModel.findOne({ _id: req.params.packageId, status: { $ne: "DELETE" } }, (packageErr, packageData) => {
                if (packageErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!packageData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, packageData, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :packageList
       * Description   :view package list  by admin
       *
       * @return response
     */

    packageList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.search) {
                query.packageName = new RegExp('^' + req.body.search, 'i')
            }
            if (req.body.packageTypeId) {
                query.packageTypeId = req.body.packageTypeId
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            }
            packageModel.paginate(query, options, (err, data) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :addSightseeing
       * Description   :add sight by admin
       *
       * @return response
     */

    addSightseeing: (req, res) => {
        try {
            countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (err, countryData) => {
                //console.log("Iam in country",countryData)
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!countryData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, async (destinationErr, destinationData) => {
                        //console.log("I am in destination",destinationData)
                        if (destinationErr) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else if (!destinationData) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                        }
                        else {
                            if (req.body.image) {
                                var pic = await convertImage()
                            }
                            var data = {
                                countryId: countryData._id,
                                country: countryData.country,
                                destinationId: destinationData._id,
                                destination: destinationData.destination,
                                sightName: req.body.sightName,
                                adultcost: req.body.adultcost,
                                childCost: req.body.childCost,
                                inclusion: req.body.inclusion,
                                description: req.body.description,
                                image: pic,
                                videoLink: req.body.videoLink,
                                status: req.body.status
                            }
                            sightseeingModel.findOne({ sightName: req.body.sightName, status: { $ne: "DELETE" } }, (errorSight, sightExists) => {
                                console.log(" i am here ")
                                if (errorSight) {
                                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                }
                                else if (sightExists) {
                                    response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.SIGHTEXISTS);
                                }
                                else {
                                    var obj = new sightseeingModel(data)
                                    obj.save((error, sightseeingData) => {
                                        console.log(error, sightseeingData)
                                        if (error) {
                                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                                        }
                                        else {
                                            response(res, SuccessCode.SUCCESS, sightseeingData, SuccessMessage.SIGHTSEEING_ADD)
                                        }
                                    })
                                }
                            })
                            //*********************Function for profile pic upload *************************************/
                            function convertImage() {
                                return new Promise((resolve, reject) => {
                                    commonFunction.uploadImage(req.body.image, (error, upload) => {
                                        if (error) {
                                            console.log("Error uploading image")
                                        }
                                        else {
                                            resolve(upload)
                                        }
                                    })
                                })
                            }
                            //*************************End of profle pic upload function *****************************/
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
       * Function Name :deleteSightseeing
       * Description   :delete sight by admin
       *
       * @return response
     */

    deleteSightseeing: (req, res) => {
        try {
            sightseeingModel.findOneAndUpdate({ _id: req.body.sightseeingId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (deleteError, sightData) => {
                if (deleteError) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!sightData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, sightData, SuccessMessage.DELETE_SUCCESS);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :viewSightseeing
       * Description   :view sight by admin
       *
       * @return response
     */

    viewSightseeing: (req, res) => {
        try {
            sightseeingModel.findOne({ _id: req.params.sightseeingId, status: { $ne: "DELETE" } }, (sightErr, sightData) => {
                if (sightErr) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!sightData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, sightData, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :sightseeingList
       * Description   :view sight list by admin
       *
       * @return response
     */

    sightseeingList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.search) {
                query.sightName = new RegExp('^' + req.body.search, 'i')
            }
            if (req.body.sightseeingId) {
                query.sightseeingId = req.body.sightseeingId
            }
            if (req.body.countryId) {
                query.countryId = req.body.countryId
            }
            var options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            }
            sightseeingModel.paginate(query, options, (err, data) => {
                if (err) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (data.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    response(res, SuccessCode.SUCCESS, data, SuccessMessage.DETAIL_GET);
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },

    /**
       * Function Name :editSightseeing
       * Description   :edit sight  by admin
       *
       * @return response
     */

    editSightseeing: async (req, res) => {
        try {
            let set = {}
            if (req.body.countryId && !req.body.destinationId) {
                // console.log("I am in country")
                set["countryId"] = req.body.countryId
                request()
                countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        editSightSeeing()
                    }
                })
            }
            else if (!req.body.countryId && req.body.destinationId) {
                console.log("I am in the destination ")
                set["destinationId"] = req.body.destinationId
                request()
                destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        editSightSeeing()
                    }
                })
            }
            else if (req.body.countryId && req.body.destinationId) {
                console.log("I am in both")
                set["countryId"] = req.body.countryId
                set["destinationId"] = req.body.destinationId
                request()
                countryModel.findOne({ _id: req.body.countryId, status: { $ne: "DELETE" } }, (error, country) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else if (!country) {
                        response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                    }
                    else {
                        destinationModel.findOne({ _id: req.body.destinationId, status: { $ne: "DELETE" } }, (error, country) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                            }
                            else if (!country) {
                                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                            }
                            else {
                                editSightSeeing()
                            }
                        })
                    }
                })
            }
            else {
                if (!req.body.countryId && !req.body.destinationId) {
                    console.log("I am in none")
                    request()
                    editSightSeeing()
                }
            }
            //*********************Function for profile pic upload *************************************/
            function convertImage() {
                return new Promise((resolve, reject) => {
                    commonFunction.uploadImage(req.body.image, (error, upload) => {
                        if (error) {
                            console.log("Error uploading image")
                        }
                        else {
                            resolve(upload)
                        }
                    })
                })
            }
            //*************************function for video upload*****************************/
            function convertVideo() {
                return new Promise((resolve, reject) => {
                    commonFunction.videoUpload(req.body.videoLink, (videoErr, uploadData) => {
                        console.log("i am in video")
                        if (videoErr) {
                            console.log("error while video Uploading")
                        }
                        else {
                            resolve(uploadData)
                        }
                    })
                })
            }
            async function request() {
                if (req.body.sightName) {
                    set["sightName"] = req.body.sightName
                }
                if (req.body.childCost) {
                    set["childCost"] = req.body.childCost
                }
                if (req.body.adultcost) {
                    set["adultcost"] = req.body.adultcost
                }
                if (req.body.description) {
                    set["description"] = req.body.description
                }
                if (req.body.inclusion) {
                    set["inclusion"] = req.body.inclusion
                }
                if (req.body.image) {
                    set["image"] = await convertImage()
                }
                if (req.body.videoLink) {
                    set["videoLink"] = await convertVideo()
                }
            }
            function editSightSeeing() {
                sightseeingModel.findOneAndUpdate({ _id: req.body.sightseeingId, status: { $ne: "DELETE" } }, { $set: set }, { new: true }, (errorSight, sightUpdate) => {
                    if (errorSight) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, sightUpdate, SuccessMessage.DETAIL_GET);
                    }
                })
            }
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },


    viewTransactionList: (req, res) => {
        try {
            var query = { status: { $ne: "DELETE" } }
            if (req.body.search) {
                query.$or = [{ customerName: new RegExp('^' + req.body.search, "i") }, { email: new RegExp('^' + req.body.search, "i") }];
            }
            req.body.limit = parseInt(req.body.limit);
            var options = {
                page: req.body.pageNumber || 1,
                limit: req.body.limit || 10,
                sort: {
                    createdAt: -1
                }
            };
            transactionModel.paginate(query, options, (error, customer) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (customer.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    response(res, SuccessCode.SUCCESS, customer, SuccessMessage.DATA_FOUND)
                }
            })
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    },
    deleteTransaction: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, status: "ACTIVE", userType: "ADMIN" }, (adminError, admin) => {
                if (adminError) {
                    response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                }
                else if (!admin) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    transactionModel.findOneAndUpdate({ _id: req.params.transactionId, status: { $ne: "DELETE" } }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, err, ErrorMessage.SOMETHING_WRONG)
                        }
                        else if (!result) {
                            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                        }
                        else {
                            response(res, SuccessCode.SUCCESS, result, SuccessMessage.DELETE_SUCCESS);
                        }
                    })
                }
            })
        }
        catch (error) {
            console.log(error)
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }
    }





}