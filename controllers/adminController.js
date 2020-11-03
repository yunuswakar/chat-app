const userModel = require('../models/userModel');
const commonFunction = require('../helper/commonFunction');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const supportModel = require('../models/supportModel')
const stateModel = require('../models/stateJsonModel')

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
            userModel.findOne({ email: req.body.email, userType: "ADMIN" }, (error, adminData) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!adminData) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND)
                }
                else {
                    const check = bcrypt.compareSync(req.body.password, adminData.password)
                    if (check) {
                        var token = jwt.sign({ id: adminData._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'knowIt', { expiresIn: '24h' });
                        var result = {
                            userId: adminData._id,
                            token: token
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
 * Function Name :forgotPassword
 * Description   : forgotPassword of admin
 *
 * @return response
*/

    forgotPassword: (req, res) => {
        userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" }, userType: "ADMIN" }, (err, result) => {
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.EMAIL_NOT_REGISTERED);
            }
            else {
                commonFunction.sendLink(result.email, result.firstName, result._id, (emailError, emailResult) => {
                    if (emailError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], INTERNAL_ERROR)
                    }
                    else {
                        response(res, SuccessCode.SUCCESS, [], SuccessMessage.FORGET_SUCCESS)
                    }

                })
            }
        })
    },


    /**
     * Function Name :resetPassword
     * Description   : resetPassword of admin
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
     * Description   : getProfile of admin
     *
     * @return response
    */

    getProfile: (req, res) => {
        try {
            console.log("I am here", req.userId)
            userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
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
     * Function Name :changePassword
     * Description   : changePassword of admin
     *
     * @return response
    */

    changePassword: (req, res) => {
        try {
            userModel.findOne({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, (err, result) => {
                if (err) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
                }
                else {
                    var check = bcrypt.compareSync(req.body.password, result.password);
                    if (!check) {
                        response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                    }
                    else {
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword);
                        userModel.findOneAndUpdate({ _id: req.userId, userType: "ADMIN", status: "ACTIVE" }, { $set: { password: req.body.newPassword } }, { new: true }, (adminError, updateResult) => {
                            if (adminError) {
                                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
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

    // editProfile: (req, res) => {
    //     try {
    //         commonFunction.jwtDecode(req.headers.token, (err, result) => {
    //             if (err) {
    //                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //             }
    //             else if (!result) {
    //                 response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //             }
    //             else {
    //                 function updateQuery() {
    //                     req.body.password = bcrypt.hashSync(req.body.password);
    //                     userModel.findOneAndUpdate({ _id: result }, { $set: req.body }, { new: true }, (adminError, updateResult) => {
    //                         if (adminError) {
    //                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                         }
    //                         else {
    //                             response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.PROFILE_DETAILS);
    //                         }
    //                     })
    //                 }
    //                 userModel.findOne({ _id: result, userType: "ADMIN" }, (adminError, adminData) => {
    //                     if (adminError) {
    //                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                     }
    //                     else if (!adminData) {
    //                         response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.USER_NOT_FOUND);
    //                     }
    //                     else {
    //                         if (req.body.profilePic && !req.body.email && !req.body.mobileNumber) {
    //                             commonFunction.uploadImage(req.body.profilePic, (imageError, imageResult) => {
    //                                 if (imageError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else {
    //                                     req.body.profilePic = imageResult;
    //                                     updateQuery();
    //                                 }
    //                             })
    //                         }
    //                         else if (!req.body.profilePic && req.body.email && !req.body.mobileNumber) {
    //                             userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (emailError, emailResult) => {
    //                                 if (emailError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else if (emailResult) {
    //                                     if (emailResult.email == req.body.email && emailResult._id == result) {
    //                                         updateQuery();
    //                                     }
    //                                     else {
    //                                         response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
    //                                     }

    //                                 }
    //                                 else {
    //                                     updateQuery();
    //                                 }
    //                             })
    //                         }
    //                         else if (!req.body.profilePic && !req.body.email && req.body.mobileNumber) {
    //                             userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
    //                                 if (mobileError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else if (mobileResult) {
    //                                     if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                         updateQuery();
    //                                     }
    //                                     else {
    //                                         response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                     }
    //                                 }
    //                                 else {
    //                                     updateQuery();
    //                                 }
    //                             })
    //                         }
    //                         else if (req.body.profilePic && req.body.email && !req.body.mobileNumber) {
    //                             commonFunction.uploadImage(req.body.profilePic, (imageError, imageResult) => {
    //                                 if (imageError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else {
    //                                     userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (emailErr, emailResult) => {
    //                                         if (emailErr) {
    //                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                         }
    //                                         else if (emailResult) {
    //                                             if (emailResult.email == req.body.email && emailResult._id == result) {
    //                                                 req.body.profilePic = imageResult;
    //                                                 updateQuery();
    //                                             }
    //                                             else {
    //                                                 response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
    //                                             }
    //                                         }
    //                                         else {
    //                                             req.body.profilePic = imageResult;
    //                                             updateQuery();
    //                                         }
    //                                     })
    //                                 }
    //                             })

    //                         }
    //                         else if (req.body.profilePic && !req.body.email && req.body.mobileNumber) {
    //                             commonFunction.uploadImage(req.body.profilePic, (imageError, imageResult) => {
    //                                 if (imageError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else {
    //                                     userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
    //                                         if (mobileError) {
    //                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                         }
    //                                         else if (mobileResult) {
    //                                             if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                                 req.body.profilePic = imageResult;
    //                                                 updateQuery();
    //                                             }
    //                                             else {
    //                                                 response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                             }
    //                                         }
    //                                         else {
    //                                             req.body.profilePic = imageResult;
    //                                             updateQuery();
    //                                         }
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                         else if (!req.body.profilePic && req.body.email && req.body.mobileNumber) {
    //                             userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (mailError, emailResult) => {
    //                                 if (mailError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else if (emailResult) {
    //                                     if (emailResult.email == req.body.email && emailResult._id == result) {
    //                                         userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (emailError, mobileResult) => {
    //                                             if (emailError) {
    //                                                 response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                             }
    //                                             else if (mobileResult) {
    //                                                 if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                                     updateQuery();
    //                                                 }
    //                                                 else {
    //                                                     response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                                 }
    //                                             }
    //                                             else {
    //                                                 updateQuery();
    //                                             }
    //                                         })
    //                                     }
    //                                     else {
    //                                         response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
    //                                     }
    //                                 }
    //                                 else {
    //                                     userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
    //                                         if (mobileError) {
    //                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                         }
    //                                         else if (mobileResult) {
    //                                             if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                                 updateQuery();
    //                                             }
    //                                             else {
    //                                                 response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                             }
    //                                         }
    //                                         else {
    //                                             updateQuery();
    //                                         }
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                         else if (req.body.profilePic && req.body.email && req.body.mobileNumber) {
    //                             commonFunction.uploadImage(req.body.profilePic, (imageError, imageResult) => {
    //                                 if (imageError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else {
    //                                     userModel.findOne({ email: req.body.email, status: { $ne: "DELETE" } }, (mailError, emailResult) => {
    //                                         if (mailError) {
    //                                             response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                         }
    //                                         else if (emailResult) {
    //                                             if (emailResult.email == req.body.email && emailResult._id == result) {
    //                                                 userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
    //                                                     if (mobileError) {
    //                                                         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                                     }
    //                                                     else if (mobileResult) {
    //                                                         if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                                             req.body.profilePic = imageResult;
    //                                                             updateQuery();
    //                                                         }
    //                                                         else {
    //                                                             response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                                         }
    //                                                     }
    //                                                     else {
    //                                                         req.body.profilePic = imageResult;
    //                                                         updateQuery();
    //                                                     }
    //                                                 })
    //                                             }
    //                                             else {
    //                                                 response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.EMAIL_EXIST);
    //                                             }
    //                                         }
    //                                         else {
    //                                             userModel.findOne({ mobileNumber: req.body.mobileNumber, status: { $ne: "DELETE" } }, (mobileError, mobileResult) => {
    //                                                 if (mobileError) {
    //                                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                                 }
    //                                                 else if (mobileResult) {
    //                                                     if (mobileResult.mobileNumber == req.body.mobileNumber && mobileResult._id == result) {
    //                                                         req.body.profilePic = imageResult;
    //                                                         updateQuery();
    //                                                     }
    //                                                     else {
    //                                                         response(res, ErrorCode.ALREADY_EXIST, [], ErrorMessage.MOBILE_EXIST);
    //                                                     }
    //                                                 }
    //                                                 else {
    //                                                     req.body.profilePic = imageResult;
    //                                                     updateQuery();
    //                                                 }
    //                                             })
    //                                         }
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                         else {
    //                             userModel.findOneAndUpdate({ _id: result }, { $set: req.body }, { new: true }, (updateError, updateResult) => {
    //                                 if (updateError) {
    //                                     response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.INTERNAL_ERROR);
    //                                 }
    //                                 else {
    //                                     response(res, SuccessCode.SUCCESS, updateResult, SuccessMessage.UPDATE_SUCCESS);
    //                                 }
    //                             })
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     catch (error) {
    //         response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    //     }
    // },

    editProfile: (req, res) => {
        let set = {}
        userModel.findOne({ email: req.body.email, status: "ACTIVE" }, (queryError, result) => {
            if (queryError) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result) {
                if (result.userType == "ADMIN") {
                    if (req.body.name) {
                        set["name"] = req.body.name
                    }
                    if (req.body.email) {
                        set["email"] = req.body.email
                    }
                    userModel.findOneAndUpdate({ _id: req.userId, userType: "ADMIN" }, { $set: set }, { new: true }, (updateError, updated) => {
                        if (updateError) {
                            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                        }
                        else {
                            res.send({ responseCode: 200, responseMessage: "Profile updated successfully." })
                        }
                    })
                }
                else {
                    res.send({ responseCode: 400, responseMessage: "Email taken. Use a diiferent one." })
                }
            }
            else {
                if (req.body.name) {
                    set["name"] = req.body.name
                }
                if (req.body.email) {
                    set["email"] = req.body.email
                }
                userModel.findOneAndUpdate({ _id: req.userId, userType: "ADMIN" }, { $set: set }, { new: true }, (updateError, updated) => {
                    if (updateError) {
                        response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                    }
                    else {
                        res.send({ responseCode: 200, responseMessage: "Profile updated successfully." })
                    }
                })
            }
        })
    },
    /**
     * Function Name :addCustomer
     * Description   :Adding customers via admin panel
     *
     * @return response
   */
    addCustomer: (req, res) => {
        try {
            console.log(req.body)
            if (req.body.password != req.body.confirmPassword) {
                return response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.PASSMATCH)
            }
            var query = { $and: [{ status: { $ne: "DELETE" } }, { $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }] }] }
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
                        var pic = await imgUpload(req.body.profilePic)
                    }
                    req.body.password = bcrypt.hashSync(req.body.password);
                    var obj = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        phoneNumber: req.body.phoneNumber,
                        birthday: req.body.birthday,
                        gender: req.body.gender,
                        addressLine1: req.body.address1,
                        addressLine2: req.body.address2,
                        state: req.body.state,
                        city: req.body.city,
                        profilePic: pic ? pic : ""
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
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }

    },

    viewCustomer: (req, res) => {
        userModel.findOne({ _id: req.params.userId }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else {
                res.send({ responseCode: 200, responseMessage: "customer details fetched successfully.", result })
            }
        })
    },

    editCustomer: async (req, res) => {
        let set = {}
        if (req.body.password) {
            set["password"] = bcrypt.hashSync(req.body.password);
        }
        if (req.body.firstName) {
            set["firstName"] = req.body.firstName
        }
        if (req.body.lastName) {
            set["lastName"] = req.body.lastName
        }
        if (req.body.address1) {
            set["addressLine1"] = req.body.address1
        }
        if (req.body.address1) {
            set["addressLine2"] = req.body.address2
        }
        if (req.body.gender) {
            set["gender"] = req.body.gender
        }
        if (req.body.birthday) {
            set["birthday"] = req.body.birthday
        }
        if (req.body.state) {
            set["state"] = req.body.state
        }
        if (req.body.city) {
            set["city"] = req.body.city
        }
        if (req.body.phoneNumber) {
            set["phoneNumber"] = req.body.phoneNumber
        }
        if (req.body.profilePic) {
            set["profilePic"] = await imgUpload(req.body.profilePic)
        }
        userModel.findOneAndUpdate({ _id: req.body.userId }, { $set: set }, { new: true }, async (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else {
                await res.send({ responseCode: 200, responseMessage: "Customer details updated successfully.", result })
            }
        })
    },


    deleteCustomer: (req, res) => {
        userModel.findOneAndUpdate({ _id: req.params.userId }, { $set: { status: "DELETE" } }, { new: true }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Customer deleted successfully." })
            }
        })
    },

    customerList: (req, res) => {
        let query = { "userType": "USER", status: "ACTIVE" }
        if (req.body.search) {
            query = {
                $and: [{ "userType": "USER", status: "ACTIVE" }, {
                    $or: [{ firstName: { $regex: req.body.search, $options: 'i' } },
                    { lastName: { $regex: req.body.search, $options: 'i' } },
                    { email: { $regex: req.body.search, $options: 'i' } },
                    { phoneNumber: { $regex: req.body.search, $options: 'i' } }]
                }]
            }
        }
        let options = {
            page: req.body.page || 1,
            limit: req.body.limit || 5,
            sort: { createdAt: -1 }
        };
        userModel.paginate(query, options, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (result.docs.length == 0) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "End users found successfully.", result })
            }
        })
    },
    dashboard: (req, res) => {
        var query = { userType: "USER", status: { $ne: "DELETE" } }
        if (req.body.fromDate && !req.body.toDate) {
            query.createdAt = { $gte: req.body.fromDate };
        }
        if (!req.body.fromDate && req.body.toDate) {
            query.createdAt = { $lte: req.body.toDate }
        }
        if (req.body.fromDate && req.body.toDate) {
            query.$and = [{ createdAt: { $gte: req.body.fromDate } }, { createdAt: { $lte: req.body.toDate } }];
        }
        userModel.count(query, (error, result) => {
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Users found successfully.", result })
            }
        })

    },

    supportList: (req, res) => {
        try {
            let query = { status: "ACTIVE" }
            if (req.body.search) {
                query = {
                    $or: [{ name: { $regex: req.body.search, $options: 'i' } }, { phoneNumber: { $regex: req.body.search, $options: 'i' } }, { email: { $regex: req.body.search, $options: 'i' } }]
                }
            }
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 5,
                sort: { createdAt: -1 }
            };
            supportModel.paginate(query, options, (error, result) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                }
                else if (result.docs.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "support data found successfully.", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },
    viewSupport: (req, res) => {
        supportModel.findOne({ _id: req.params.supportId }, (error, result) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else {
                res.send({ responseCode: 200, responseMessage: "Support details fetched successfully.", result })
            }
        })
    },

    getStatesList: (req, res) => {
        try {
            stateModel.find((error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (result.length == 0) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    var stateList = []
                    result.forEach((elem) => {
                        stateList.push(elem.state)
                    })
                    res.send({ responseCode: 200, responseMessage: "State list found successfully.", result: stateList })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    getCityList: (req, res) => {
        stateModel.findOne({ state: req.body.state }, (error, result) => {
            if (error) {
                console.log(error)
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            }
            else {
                res.send({ responseCode: 200, responseMessage: "city list found successfully.", result: result.city })
            }
        })
    },

    getCities: (req, res) => {
        try {
            stateModel.findOne({ _id: req.query.state }, (error, result) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
                }
                else if (!result) {
                    response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
                }
                else {
                    res.send({ responseCode: 200, responseMessage: "City list found successfully", result })
                }
            })
        }
        catch (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG)
        }
    },

    getGraphData: (req, res) => {
        const group = {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                count: { $sum: 1 },
            },
        };

        const groups = {
            $group: {
                _id: null,
                usersCountperMonth: { $push: { month: '$_id.month', count: '$count' } },
            },
        };
        return userModel.aggregate([{ $match: { userType: "USER" } }, group, groups], (error, result) => {
            if (error) {
                res.send({ responseCCode: 500, responseMessage: "Internal server error." })
            }
            else {
                res.send({ responseCCode: 200, responseMessage: "User graph data found successfully.", result })
            }
        });
    },

    getSomeGraphData:(req,res)=>{
        userModel.aggregate([
            {"$match": {"userType": "USER"}},
            {
                "$project":
                  {
                    "month": { "$month": "$createdAt" },
                  }
            },
            {"$group" : {
                "January" : {"$sum" : { "$cond": [ {"$eq": ["$month", 1]}, 1, 0] }},
                "February" : {"$sum" : { "$cond": [ {"$eq": ["$month", 2]}, 1, 0] }},
                "March" : {"$sum" : { "$cond": [ {"$eq": ["$month", 3]}, 1, 0] }},
                "April" : {"$sum" : { "$cond": [ {"$eq": ["$month", 4]}, 1, 0] }},
                "May" : {"$sum" : { "$cond": [ {"$eq": ["$month", 5]}, 1, 0] }},
                "June" : {"$sum" : { "$cond": [ {"$eq": ["$month", 6]}, 1, 0] }},
                "July" : {"$sum" : { "$cond": [ {"$eq": ["$month", 7]}, 1, 0] }},
                "August" : {"$sum" : { "$cond": [ {"$eq": ["$month", 8]}, 1, 0] }},
                "September" : {"$sum" : { "$cond": [ {"$eq": ["$month", 9]}, 1, 0] }},
                "October" : {"$sum" : { "$cond": [ {"$eq": ["$month", 10]}, 1, 0] }},
                "November" : {"$sum" : { "$cond": [ {"$eq": ["$month", 11]}, 1, 0] }},
                "December" : {"$sum" : { "$cond": [ {"$eq": ["$month", 12]}, 1, 0] }}
              }}
        ],(error,result)=>{
            if(error){
                res.send({responseCode:500,responseMessage:"Internal"})
            }
            else{
                res.send({ responseCCode: 200, responseMessage: "User graph data found successfully.", result })
            }
        })
    }

}
function imgUpload(image) {
    return new Promise((resolve, reject) => {
        commonFunction.uploadImage(image, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

