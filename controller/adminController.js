const userModel = require('../model/userModel');
const faqModel = require('../model/faqModel')
const commonFunction = require('../helper/commonFunction')
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorCode } = require('../helper/statusCodes.js');
const { ErrorMessage } = require('../helper/messages.js');
const { SuccessMessage } = require('../helper/messages');
const { SuccessCode } = require('../helper/statusCodes');
const addTransactionModel = require('../model/transactionModel.js');
const transaction = require('../model/transaction.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var qs = require("querystring");
var http = require("http");
var staticModel = require('../model/staticModel')
const _ = require('lodash')
const OTPAuth = require('otpauth');

const adminLogin = (req, res) => {
    console.log("req.body",req.body)
    if (!req.body.email || !req.body.password) {
        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
    }
    else {
        userModel.findOneAndUpdate({ email: req.body.email, userType: "ADMIN" }, { $set: { loginTimeMail: Date.now() } }, { new: true }, (error, result) => {
            console.log("result is =====>>>", result)
            if (error) {
                response(res, ErrorCode.INTERNAL_ERROR, error, ErrorMessage.INTERNAL_ERROR);
            }
            else if (!result) {
                response(res, ErrorCode.NOT_FOUND, [], "Invalid credentials.");
            }
            else {
                var data = req.body.password
                var password1 = bcrypt.compareSync(data, result.password)
                // console.log("password is ====>>>", password1)
                if (!password1) {
                    response(res, ErrorCode.NOT_FOUND, [], "Invalid credentials.");
                }
                else {
                    // console.log("37=======", result.loginTime)

                    var token = jwt.sign({ email: req.body.email, userId: result._id, iat: Math.floor(Date.now() / 1000) - 30 }, 'walletApp');
                    req.headers.token = token
                    let totp = new OTPAuth.TOTP({
                        issuer: 'ACME',
                        label: 'AzureDiamond',
                        algorithm: 'SHA1',
                        digits: 4,
                        period: 120,
                        secret: OTPAuth.Secret.fromB32('NB2W45DFOIZA')
                    });

                    // Generate TOTP token.                                                                                                                                                                                                                                             
                    var token1 = Math.floor(1000 + Math.random() * 9000);
                    console.log("otp generate =====>>", token1)
                    commonFunction.sendMail(req.body.email, "Verification otp", result.userType, token1, (errr, result11) => {
                        if (errr) {
                            console.log("Something went wrong",errr)
                        } else {
                            console.log("email sent successfully")
                        }
                    })
                    userModel.findOneAndUpdate({ email: req.body.email, userType: "ADMIN" }, {
                        $set: {
                            token: req.headers.token,
                            otp: token1
                        }
                    }, { new: true }, (error1, result1) => {
                        console.log("result is ===========))))))>>>>>>", result1)
                        if (error1) {
                            res.send({ response_code: 501, response_message: "Internal server error" })
                        }
                        else {
                            var data = {
                                adminId: result._id,
                                userName: result.userName,
                                email: result.email,
                                token: req.headers.token
                            }
                            res.send({ response_code: 200, response_message: 'Verification code has been sent to the mail', result: data })
                        }
                    })

                }
            }
        })
    }
}


const adminVerifyOtp = (req, res) => {
    if (!req.body.adminId || !req.body.otp) {
        return res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (error, success) => {
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else {

                if (req.body.otp == success.otp) {

                    userModel.findOneAndUpdate({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, { $set: { isVerify: true } }, { new: true }, (error1, success2) => {
                        console.log("verify otp ====>>>", success2)
                        if (error1) {
                            res.send({ response_code: 501, response_message: "Internal server error" })
                        }
                        else {
                            res.send({ response_code: 200, response_message: "Verified", result: success })
                        }

                    })

                }

                else {
                    res.send({ response_code: 402, response_message: "Otp mismatched" })
                }
            }

        })


    }
}




const totalUser = (req, res) => {
    userModel.count({ userType: "USER", verifyOtp: true,status:{$ne:"DELETED"} }, (error, result) => {
        console.log("errrrrrrrrrr", error)
        if (error) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else {
            response(res, SuccessCode.SUCCESS, { result: result }, "Total users found");
        }
    })
}

const listUserSearch = (req, res) => {
    var query, option;
    option = {
        page: req.body.page || 1,
        limit: req.body.limit || 4,
        sort: { createdAt: -1 }
    }


    query = { $and: [{ status: { $ne: ["DELETED"] } }, { userType: "USER" }, { verifyOtp: true }] }
    if (req.body.status) {
        query.status = req.body.status
    }
    if (req.body.search) {
        query.$or = [
            {
                "firstName": { $regex: req.body.search, $options: 'i' }
            },
            {
                "lastName": { $regex: req.body.search, $options: 'i' }
            },
            {
                "userName": { $regex: req.body.search, $options: 'i' }
            },
            {
                "email": { $regex: req.body.search, $options: 'i' }
            }
        ]
    }

    userModel.paginate(query, option, (err, success) => {
        console.log("err is ===>>", err)
        if (err)
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        else if (success.docs == false)
            //response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            res.send({ response_code: 200, response_message: "Data not found", result: [] })
        else {
            response(res, SuccessCode.SUCCESS, success, "Users searched successfully.");
        }
    })
}

const viewUser = (req, res) => {

    userModel.findOne({ _id: req.params._id, status: { $ne: ['DELETED'] }, verifyOtp: true }, (error, result) => {
        if (error) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result) {
            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
        }
        else {
            response(res, SuccessCode.SUCCESS, { result: result }, "User details found successfully.");
        }

    })

}
const actionToUser = (req, res) => {
    userModel.findByIdAndUpdate({ _id: req.body.userId }, { $set: { status: req.body.status } }, { new: true }, (err, success) => {
        console.log("sucess is ===>>", err, success)
        if (err) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!success) {
            res.send({ response_code: 404, response_message: "User not found" })
        }
        else {
            var value;
            if (req.body.status == "ACTIVE") {
                value = "actived"
            }
            else if (req.body.status == "BLOCKED") {
                value = "blocked"
            }
            else {
                value = "deleted"
            }
            response(res, SuccessCode.SUCCESS, { success: success }, `User ${value} successfully.`);
        }

    })
}





const changePasswordAdmin = (req, res) => {
    userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: 'ADMIN' }, (error, userDetails) => {
        console.log("result is ====>>", userDetails)
        if (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        } else if (userDetails) {
            bcrypt.compare(req.body.password, userDetails.password, (error, success) => {
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
                } else if (!success) {
                    response(res, ErrorCode.INVALID_CREDENTIAL, [], ErrorMessage.OLD_PASSWORD);
                }
                else {
                    let salt = bcrypt.genSaltSync(10);
                    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, salt)
                    let set = {
                        password: req.body.newPassword
                    }

                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: 'ADMIN' }, set, { new: true }, (error, userUpdate) => {
                        if (error) {
                            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                        } else {
                            res.send({ response_code: 200, response_message: "Password changed successfully" })
                        }
                    })
                }
            })
        } else {
            response(res, ErrorCode.USER_FOUND, [], ErrorMessage.USER_FOUND);
        }
    })


}

const forgotPasswordAdmin = (req, res) => {
    try {
        if (!req.body.email) {
            res.send({ response_code: 501, response_message: "Parameter missing" })
        }
        else {
            userModel.findOne({ email: req.body.email, status: "ACTIVE", userType: 'ADMIN' }, (error, userDetails) => {
                console.log("i am here 323", error, userDetails)
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                }
                else if (!userDetails) {
                    console.log("i am here 328")

                    response(res, ErrorCode.NOT_FOUND, [], "The email address entered doesn't belong to the Admin")
                }


                else {
                    console.log("i am here 335")

                    var otp = commonFunction.getOTP();
                    if (userDetails) {
                        userModel.findOneAndUpdate({ _id: userDetails._id, status: "ACTIVE", userType: 'ADMIN' }, { $set: { otp: otp } }, { new: true }, (error, otpUpdate) => {
                            console.log("otp is ====>>>", otpUpdate.userType)
                            if (error) {

                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                commonFunction.sendMail(req.body.email, 'Forgot Password', otpUpdate.userType, otp, (error, sendMail) => {
                                    if (error) {
                                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                                    } else {
                                        response(res, SuccessCode.OTP_SEND, [userDetails._id, { otp: otpUpdate.otp }], SuccessMessage.OTP_SEND);
                                    }
                                })
                            }
                        })
                    } else {
                        response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.USER_FOUND);
                    }

                }
            })
        }
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}


const verifyOtp = (req, res) => {
    if (!req.body.userId || !req.body.otp) {
        return res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {
        userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, (error, success) => {
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else {

                if (req.body.otp == success.otp) {

                    userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, { $set: { isVerify: true } }, { new: true }, (error1, success2) => {
                        console.log("verify otp ====>>>", success2)
                        if (error1) {
                            res.send({ response_code: 501, response_message: "Internal server error" })
                        }
                        else {
                            res.send({ response_code: 200, response_message: "Verified" })
                        }

                    })

                }

                else {
                    res.send({ response_code: 402, response_message: "Otp mismatched" })
                }
            }

        })


    }
}


const resetPasswordAdmin = (req, res) => {
    try {
        if (!req.body.userId || !req.body.password) {
            res.send({ response_code: 501, response_message: "Parameter missing" })
        }
        else {
            userModel.findOne({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, (error, userDetails) => {
                if (error) {
                    response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                } else if (userDetails) {
                    if (userDetails.isVerify == true) {
                        let salt = bcrypt.genSaltSync(10);
                        req.body.password = bcrypt.hashSync(req.body.password, salt)
                        userModel.findOneAndUpdate({ _id: req.body.userId, status: "ACTIVE", userType: "ADMIN" }, { $set: { password: req.body.password } }, { new: true }, (error, otpUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                console.log("385====>>>>", otpUpdate, "hiiii", res);
                                res.send({ response_code: 200, response_message: "Password updated successfully" })
                            }
                        })
                    }
                    else {
                        res.send({ response_code: 401, response_message: "Otp not verified!" })
                    }
                } else {
                    response(res, SuccessCode.SUCCESS, [], SuccessMessage.INVALID_OTP);
                }
            })
        }
    } catch (error) {
        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}


const changeEmailAdmin = (req, res) => {
    if (!req.body.userId || !req.body.email) {
        res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {

        userModel.findByIdAndUpdate({ _id: req.body.userId, userType: "ADMIN", status: "ACTIVE" }, { $set: { email: req.body.email } }, { new: true }, (error, result) => {
            console.log("result is ====>>", result)
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else if (!result) {
                res.send({ response_code: 404, response_message: "Admin not found" })
            }
            else {

                response(res, SuccessCode.OTP_SEND, [result.otp], "Otp sent");
            }
        })
    }

}



// ===============================================FAQ========================================


const addQuestion = (req, res) => {
    if (!req.body.question || !req.body.userId) {
        res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {
        faqModel.findOne({ question: req.body.question, status: "ACTIVE" }).populate({ path: "userId", select: "userName" }).exec((error, result) => {

            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error", error })
            }
            else if (result) {
                res.send({ response_code: 400, response_message: "Question already exists" })
            }
            else {
                faqModel.create(req.body, (error1, result1) => {
                    if (error1) {
                        res.send({ response_code: 501, response_message: "Internal server errorrr", error1 })
                    }
                    else if (result1) {
                        res.send({ response_code: 200, response_message: "Ouestion added", result1 })
                    }
                    else {
                        res.send({ response_code: 500, response_message: "Ouestion not added" })
                    }

                })
            }
        })
    }

}


const addAnswer = (req, res) => {
    if (!req.body.questionId || !req.body.answer) {
        res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {

        faqModel.findOneAndUpdate({ _id: req.body.questionId, status: "ACTIVE" }, { answer: req.body.answer }, { new: true }, (error, result) => {
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else if (!result) {
                res.send({ response_code: 404, response_message: "Question not found" })
            }
            else {
                res.send({ response_code: 200, Answer: result.answer })
            }
        })
    }

}


const setTransactionInterest = (req, res) => {
    console.log("449====", req.body)

    userModel.findOneAndUpdate({ _id: req.body.userId, userType: "ADMIN", status: "ACTIVE" }, { $set: { transactionFee: req.body.transactionFee, conversionFee: req.body.conversionFee } }, { new: true }, (error, result) => {
        console.log("449====", error, result)
        if (error) {
            res.send({ response_code: 501, response_message: "Internal server error" })
        }
        else if (!result) {
            res.send({ response_code: 404, response_message: "Admin not found" })
        }
        else {
            // console.log("456======", result.transactionFee)
            res.send({ response_code: 200, response_message: "Transaction and conversion fee set successfully", transactionFee: result.transactionFee, conversionFee: result.conversionFee })
        }
    })

}

const logout = (req, res) => {
    if (!req.body.email)
        res.send({ response_code: 400, response_message: "Parameter missing" })
    else {
        userModel.findOneAndUpdate({ email: req.body.email, status: "ACTIVE" }, { $set: { token: "Null" } }, (error, success) => {
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else {
                res.send({ response_code: 200, response_message: "Logged out successfully" })
            }
        })
    }
}


const addFaq = (req, res) => {
    let obj = {};
    userModel.find({ userType: "ADMIN" }, (error1, succ1) => {
        if (error1) {
            console.log("<<<<<<<<error>>>>>>>>>>>", error)
        } else if (!succ1) {
            console.log("<<<<<<<<<<<<<<not found>>>>>>>>>>>>>>>")
        } else {
            staticModel.findOne({
                type: req.body.type
            }).exec((err, succ) => {
                if (err)
                    return res.send({ response_code: 500, response_message: "Internal server error.", err })
                else if (!succ) {
                    return res.send({ response_code: 200, response_message: "Data not found", result: [] })
                } else {

                    staticModel.findOneAndUpdate({
                        type: req.body.type
                    }, {
                            $push: {
                                "FAQ": {
                                    "question": req.body.question,
                                    "answer": req.body.answer,
                                    "category": req.body.category
                                }
                            }
                        }, {
                            new: true
                        },
                        (error, result) => {
                            if (error)
                                return res.send({ response_code: 500, response_message: "Internal server error.", error })

                            else
                                return res.send({ response_code: 200, response_message: "Faq content added Successfully", result });
                        })
                }
            })
        }
    })
}



const viewFaq = (req, res) => {
    userModel.findOne({ $and: [{ _id: req.body._id }, { userType: "ADMIN" }] }, (error1, succ1) => {
        if (error1) {
            console.log("<<<<<<<<error>>>>>>>>>>>", error)
        } else if (!succ1) {
            console.log("<<<<<<<<<<<<<<not found>>>>>>>>>>>>>>>")
        } else {
            staticModel.findOne({

                'status': "ACTIVE",
                "type": "FAQ"
            },
                (err1, success) => {
                    if (err1)
                        return res.send({ response_code: 500, response_message: "Internal server error.", err1 })
                    else if (!success)
                        return res.send({ response_code: 200, response_message: "Data not found", result: [] })
                    else
                        return res.send({ response_code: 200, response_message: "Data found successfully", success })
                })
        }
    })
}

const updateFaq = (req, res) => {
    userModel.find({ userType: "ADMIN" }, (error1, succ1) => {
        if (error1) {
            console.log("<<<<<<<<error>>>>>>>>>>>", error)
        } else if (!succ1) {
            console.log("<<<<<<<<<<<<<<not found>>>>>>>>>>>>>>>")
        } else {
            staticModel.findOne({
                'type': 'FAQ'
            }).exec((err, succ) => {
                if (err)
                    return global_fn.responseHandler(res, 400, err);
                else if (succ.length == 0) {
                    return res.send({ response_code: 200, response_message: "Data not found", result: [] })
                }
                else {
                    console.log("<<<<<<<<<<<<<<<<662>>>>>>>>>>");


                    staticModel.findOneAndUpdate({
                        "FAQ._id": req.body._id
                    }, {
                            $set: {
                                "FAQ.$.question": req.body.question,
                                "FAQ.$.answer": req.body.answer,
                                "FAQ.$.category": req.body.category
                            }

                        }, {
                            new: true
                        },
                        (error, result) => {
                            console.log("@@@@@@@@@", error, result)
                            if (error) {
                                console.log("error")
                                return res.send({ response_code: 500, response_message: "Internal server error.", error })
                            }
                            else {
                                console.log("FAQ updated", result)
                                return res.send({ response_code: 200, response_message: "FAQ updated successfully", result })
                            }

                        })
                }
            })
        }
    })
}


const viewFaqId = (req, res) => {
    staticModel.findOne({ type: "FAQ" }, (error, result) => {
        if (error) {
            console.log("<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>", error)
            return res.send({ response_code: 500, response_message: "Internal server error.", error })
        } else if (!result) {
            console.log("<<<<<<<<<<<<<not found>>>>>>>>>>>>>")
            return res.send({ response_code: 404, response_message: "Data not found" })
        } else {
            console.log("i m in 766")
            for (let i = 0; i <= 10; i++) {
                console.log("><><><<><<<<<<<<<<<<<>>>>>>>>>>>>>")
                if (result.FAQ[i]._id == req.body.faq) {
                    var obj = result.FAQ[i]
                    return res.send({ response_code: 200, response_message: "Data found successfully", obj })
                }
            }
        }
    })
}


const viewEmail = (req, res) => {
    userModel.findOne({ _id: req.body._id, userType: "ADMIN" }, (error, result) => {
        if (error) {
            console.log("<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>", error)
            return res.send({ response_code: 500, response_message: "Internal server error.", error })
        } else if (!result) {
            console.log("<<<<<<<<<<<<<not found>>>>>>>>>>>>>")
            return res.send({ response_code: 404, response_message: "Data not found" })
        } else {
            var email = result.email;
            return res.send({ response_code: 200, response_message: "Data found successfully", email })
        }
    })
}

const currentTransactionFee = (req, res) => {
    userModel.findOne({ _id: req.body._id, userType: "ADMIN" }, (error, result) => {
        if (error) {
            console.log("<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>", error)
            return res.send({ response_code: 500, responseMessage: "Internal server error.", error })
        } else if (!result) {
            console.log("<<<<<<<<<<<<<not found>>>>>>>>>>>>>")
            return res.send({ response_code: 404, responseMessage: "Data not found" })
        } else {
            var details = {};
            details.transactionFee = result.transactionFee;
            details.conversionFee = result.conversionFee
            return res.send({ response_code: 200, responseMessage: "Data found successfully", details })
        }
    })
}


const updateAdmin = (req, res) => {
    userModel.findOne({ "userType": "ADMIN" }, (error, checkUserName) => {
        if (error) {
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        } else if (!checkUserName) {

            response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.EMAIL_EXIST);
        } else {

            // console.log("cfdsasdgdgfsdg", checkUserName)
            // commonFunction.sendSms("Dear " + checkUserName.firstName + "," + " " + " Your OTP is : " + otp, req.body.mobileNumber, (error, sendMessage) => {
            // console.log("send message ===>>", sendMessage)
            if (req.body.profilePic) {
                var otp = commonFunction.getOTP();
                commonFunction.uploadImage(req.body.profilePic, (error, imageUrl) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        console.log("imager>>>>>>>>>>>>", imageUrl)
                        var updateValue = {
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "middleName": req.body.middleName,
                            "profilePic": imageUrl,
                            "otp": otp
                        }
                        userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                            if (error) {
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else {
                                res.send({ response_code: 200, response_message: "Admin updated successfully", result: userUpdate })
                            }
                        })
                    }
                })

            } else if (req.body.email) {
                var otp = commonFunction.getOTP();

                commonFunction.sendMail(req.body.email, "Your otp is", checkUserName.userName, otp, (err23, result23) => {
                    if (err23) {
                        res.send({ response_code: 500, response_message: "Internal server error" })
                    } else if (!result23) {
                        res.send({ response_code: 200, response_message: "Not found" })
                    }
                    else {
                        var updateValue = {

                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "middleName": req.body.middleName,
                            "otp": otp
                        }
                        userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: updateValue }, { new: true }, (error33, userUpdate33) => {
                            if (error33) {
                                console.log("failed to save deatils of admin", error33)
                            } else {
                                console.log("Admin details saved successfully", userUpdate33)
                            }
                        })

                        res.send({ response_code: 201, response_message: "Otp sent successfully", otp })
                    }
                })
            } else {
                var updateValue = {
                    //  "mobileNumber": req.body.mobileNumber,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "middleName": req.body.middleName,
                    "otp": otp
                }
                userModel.findOneAndUpdate({ userType: "ADMIN" }, { $set: updateValue }, { new: true }, (error, userUpdate) => {
                    if (error) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        res.send({ response_code: 200, response_message: "Admin updated successfully", result: userUpdate })
                    }
                })
            }
        }

    })

}

const verifyOtpAdmin = (req, res) => {
    if (!req.body.adminId || !req.body.otp || !req.body.email) {
        return res.send({ response_code: 400, response_message: "Parameter missing" })
    }
    else {
        userModel.findOne({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, (error, success) => {
            if (error) {
                res.send({ response_code: 501, response_message: "Internal server error" })
            }
            else {

                if (req.body.otp == success.otp) {

                    userModel.findOneAndUpdate({ _id: req.body.adminId, status: "ACTIVE", userType: "ADMIN" }, { $set: { isVerify: true, email: req.body.email } }, { new: true }, (error1, success2) => {
                        console.log("verify otp ====>>>", success2)
                        if (error1) {
                            res.send({ response_code: 501, response_message: "Internal server error" })
                        }
                        else {
                            res.send({ response_code: 200, response_message: "Admin otp  verified" })
                        }
                    })
                }

                else {
                    res.send({ response_code: 402, response_message: "Otp mismatched" })
                }
            }

        })


    }
}


const viewAdmin = (req, res) => {
    userModel.findOne({ _id: req.body.adminId, userType: "ADMIN" }, (error, result) => {
        if (error) {
            res.send({ response_code: 500, response_message: "Internal server error" })
        }
        else if (!result) {
            res.send({ response_code: 404, response_message: "Not found" })
        }
        else {
            res.send({ response_code: 200, response_message: "Admin found successfully", result: result })
        }
    })
}


///////////////////////////////////////////////////////////////Transaction_Management//////////////////////////////////////////////////////////////////////////



const totalTransaction = (req, res) => {
    console.log(">>>>>>>>>>>>>>828")
    transaction.count((err, success) => {
        if (err) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!success) {
            console.log(">>>>>>>>>>>>>>834")
            res.send({ response_code: 400, response_message: "Not found" })
        }
        else {

            response(res, SuccessCode.SUCCESS, { result: success }, "Total transactions found");
        }
    })

}

const viewParticularTransaction = (req, res) => {

    transaction.findOne({ _id: req.params._id }, (error, result) => {
        if (error) {
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else if (!result) {
            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
        }
        else {
            response(res, SuccessCode.SUCCESS, { result: result }, "User transaction details found successfully.");
        }

    })

}

const transactionHistory = (req, res) => {
    var query, option;
    option = {
        page: req.body.page || 1,
        limit: req.body.limit || 4,
        sort: { createdAt: -1 }
    }
    // query = { $and: [{ status: { $ne: ["DELETED"] } }, { userType: "USER" }, { verifyOtp: true }] }
    query = {}

    if (req.body.search) {
        query.$or = [
            {
                "transactionType": { $regex: req.body.search, $options: 'i' }
            },
        ]
    }
    transaction.paginate(query, option, (err, success) => {
        if (err)
            response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        else if (success.docs == false)
            //response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
            res.send({ response_code: 200, response_message: "Data not found", result: [] })
        else {
            response(res, SuccessCode.SUCCESS, success, "Users searched successfully.");
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////Vendor_Panel////////////////////////////////////////////////////////////////////////


const addVendor = (req, res) => {
    try {
        var query = {
            $and: [{ status: { $in: ["ACTIVE", "BLOCKED"] } }, { $or: [{ 'email': req.body.email }, { 'mobileNumber': req.body.mobileNumber }, { userName: req.body.userName }] }]
        }
        userModel.findOne(query, (error, checkUserName) => {
            if (error) {
                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
            }
            else if (checkUserName) {
                if (checkUserName.email == req.body.email) {
                    res.send({ response_code: 404, response_message: "Email already exists", })
                }
                else if (checkUserName.mobileNumber == req.body.mobileNumber) {
                    res.send({ response_code: 404, response_message: "Mobile number already exists" })
                }
                else {
                    res.send({ response_code: 404, response_message: "User name already exists" })
                }
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                // var password = req.body.password
                //req.body.password = bcrypt.hashSync(req.body.password, salt)
                var number = req.body.mobileNumber;
                console.log("number >>>>>100>>>", number);
                var splitNumber = number.slice(1);
                console.log("splitNumber >>>>>102>>>", splitNumber);
                var data = {
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    splitMobileNumber: splitNumber,
                    //password: req.body.password,
                    storeNo: req.body.storeNo,
                    street: req.body.street,
                    landMark: req.body.landMark,
                    area: req.body.area,
                    city: req.body.city,
                    state: req.body.state,
                    pin: req.body.pin,
                    country: req.body.country,
                    countryCode: req.body.countryCode,
                    userType: "VENDOR",
                };
                var obj = new userModel(data)
                obj.save((error3, userSave) => {
                    console.log("saved one ====>>>", userSave)
                    if (error3) {
                        response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                    } else {
                        console.log("In else=================>")
                        var hostname = req.headers.host;

                        let linkUrl = `http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1523/login`
                        // let linkUrl = "http://" + hostname + "/venderLogin?_id=" + userSave._id


                        commonFunction.sendVendorMail(req.body.email, `Your account is successfully created as ${req.body.firstName}.`, `${req.body.firstName}`, `${linkUrl}`, (error, sendMail) => {
                            console.log("In common=================>")
                            if (error) {
                                console.log("In error=================>", error)
                                response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
                            } else if (sendMail) {
                                console.log("In success=================>")
                                response(res, 201, { userDetail: userSave }, "SignUp successfully");
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
}
const viewVendor = (req, res) => {
    if (req.body.vendorId) {
        userModel.findOne({ _id: req.body.vendorId, status: "ACTIVE" }, (error, result) => {
            console.log(">>>>>>>>>>>>>>>>>>>>>975", error, result)
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })

            }
            else if (!result) {
                res.send({ response_code: 404, response_message: "Data not found" })
            } else {
                res.send({ response_code: 200, response_message: "Vendor successfully found", result })
            }
        })
    } else {

        var query = { status: "ACTIVE", userType: "VENDOR" }

        let options = {
            page: req.body.page || 1,
            limit: req.body.limit || 1
        }
        userModel.paginate(query, options, (error, vendorDetails) => {
            if (error) {
                res.send({ response_code: 500, response_message: "Internal server error" })
            }
            else if (vendorDetails.docs.length == 0) {
                res.send({ response_code: 404, response_message: "Data not found" })
            }
            else {
                res.send({
                    response_code: 200,
                    response_message: "Data found successfully",
                    vendorDetails
                })
            }
        })
    }
}
const searchVendors = (req, res) => {
    var query, options;
    query = {

        $and: [{ status: { $ne: "DELETED" }, userType: "VENDOR" },]
    };
    options = {
        select: '-password',
        sort: {
            createdAt: -1
        },
        lean: true,
        limit: req.body.limit || 5,
        page: req.body.page || 1
    };
    if (req.body.search) {
        let searchRegex = new RegExp(req.body.search.toLowerCase().trim(), 'i');
        query['$or'] = [
            { firstName: searchRegex },
            { userName: searchRegex },
            { lastName: searchRegex }
        ];
    }
    userModel.paginate(query, options, (err, result) => {
        if (err)
            res.send({ response_code: 404, response_message: "Internal server error" })
        else
            res.send({ response_code: 200, response_message: "Data found", result })
    });

}

const blockUnblockVendor = (req, res) => {

    userModel.findByIdAndUpdate({ _id: req.body.vendorId, userType: 'VENDOR' }, { $set: { status: req.body.status } }, (err, result) => {
        if (err)
            res.send({ response_code: 404, response_message: "Internal server error" })
        else if (!result)
            res.send({ response_code: 200, response_message: "Data not found", result: [] })
        else
            res.send({ response_code: 200, response_message: `Vendor ${req.body.status} successfully` });
    });
}

const deleteVendor = (req, res) => {
    userModel.findByIdAndUpdate({ _id: req.body.vendorId, userType: "VENDOR" }, { $set: { status: "DELETED" } }, { new: true }, (error, result) => {
        if (error) {
            res.send({ response_code: 404, response_message: "Internal server error" })
        }
        else if (!result) {
            res.send({ response_code: 200, response_message: "Data not found", result: [] })
        }
        else {
            res.send({ response_code: 200, response_message: "Data found", result })
        }
    })
}

const userGraph = (req, res) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0)
    var offset = (new Date().getTimezoneOffset()) * 60000;
    today = new Date(today - offset).getTime()
    var day = new Date(today)
    var month = day.getTime()
    month = month - 2592000000;
    let monthDate = new Date(month)
    var year = day.getTime()
    year = year - 2592000000 * 12;
    let yearDate = new Date(year)

    let day1 = day.getDay()
    let today1 = new Date()
    let endDay = new Date()

    //var week = new Date( Date.now()-7*86400000) 
    // console.log   (">>>>>>>>>>>>",week) 
    endDay.setHours(23, 59, 59, 999)
    let Tommorow1 = day.setDate(day.getDate() + 1)
    let Tommorow = new Date(Tommorow1)

    let lastTommorow = Tommorow.setHours(23, 59, 59, 999)
    const futureDay = 7 - day1;
    const futureTime = futureDay * 86400000;
    const time = day1 * 86400000;
    let startTime = today - time;
    let startDate = new Date(startTime)
    let endTime = today + futureTime;
    let endDate = new Date(endTime)
    var query = { status: { $ne: 'DELETE' }, userType: { $ne: "ADMIN" } }
    if (req.body.dayCount == "Daily") {

        // query.$and = [{ createdAt: { $lte: endDay } }, { createdAt: { $gte: today } }]
        query.$and = [{ createdAt: { $lte: endDate } }, { createdAt: { $gte: startDate } }]
    }

    if (req.body.dayCount == "Weekly") {
        // query.$and = [{ createdAt: { $lte: endDate } }, { createdAt: { $gte: startDate } }]
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: monthDate } }]
    }

    if (req.body.dayCount == "Monthly") {
        //  query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: monthDate } }]
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }
    if (req.body.dayCount == "  ") {
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }

    transaction.find(query).exec((error1, data) => {

        var temp = []

        // console.log("@@@@@",error1,a)
        if (error1) {
            res.send({
                responseCode: 500,
                responseMessage: "Internal server error", error1
            })
        } else if (!data) {
            res.send({
                responseCode: 404,
                responseMessage: "No data found"
            })
        } else {
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var count = 0;
            var sunCount = 0
            var monCount = 0
            var tueCount = 0
            var wedCount = 0
            var thusCount = 0
            var friCount = 0
            var satCount = 0


            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";


            var janCount = 0
            var febCount = 0
            var marCount = 0
            var aprCount = 0
            var mayCount = 0
            var junCount = 0
            var julyCount = 0
            var augCount = 0
            var sepCount = 0
            var octCount = 0
            var novCount = 0
            var decCount = 0


            data.forEach(function (entry) {
                count = count + 1;
                if (req.body.dayCount == "Weekly" || req.body.dayCount == "Daily") {

                    var dayFind = weekday[entry.createdAt.getDay()];
                    if (dayFind == "Sunday") {
                        sunCount = sunCount + 1;
                    } else if (dayFind == "Monday") {
                        monCount = monCount + 1;
                    } else if (dayFind == "Tueday") {
                        tueCount = tueCount + 1
                    } else if (dayFind == "Wednesday") {
                        wedCount = wedCount + 1
                    } else if (dayFind == "Thursday") {
                        thusCount = thusCount + 1
                    } else if (dayFind == "Friday") {
                        friCount = friCount + 1
                    } else if (dayFind == "Saturday") {
                        satCount = satCount + 1
                    }
                }
                else if (req.body.dayCount == "Monthly") {
                    var dayFind = month[entry.createdAt.getMonth()];
                    if (dayFind == "January") {
                        janCount = janCount + 1;
                    } else if (dayFind == "February") {
                        febCount = febCount + 1;
                    } else if (dayFind == "March") {
                        marCount = marCount + 1
                    } else if (dayFind == "April") {
                        aprCount = aprCount + 1
                    } else if (dayFind == "May") {
                        mayCount = mayCount + 1
                    } else if (dayFind == "June") {
                        junCount = junCount + 1
                    } else if (dayFind == "July") {
                        julyCount = julyCount + 1
                    } else if (dayFind == "August") {
                        augCount = augCount + 1
                    } else if (dayFind == "September") {
                        sepCount = sepCount + 1
                    } else if (dayFind == "October") {
                        octCount = octCount + 1
                    } else if (dayFind == "November") {
                        novCount = novCount + 1
                    } else if (dayFind == "December") {
                        decCount = decCount + 1
                    }
                }

            })
            console.log('countcountcount', count)
            console.log('lengthhhh', data.length)
            console.log('sunCountsunCountsunCount', data.length)
            if (count == data.length) {
                if (req.body.dayCount == "Weekly" || req.body.dayCount == "Daily") {
                    var finalData = [{ day: 'Sunday', count: sunCount }, { day: 'Monday', count: monCount }, { day: 'Tueday', count: tueCount }, { day: 'Wednesday', count: wedCount }, { day: 'Thursday', count: thusCount }, { day: 'Friday', count: friCount }, { day: 'Saturday', count: satCount }]
                } else if (req.body.dayCount == "Monthly") {
                    var finalData = [{ day: 'January', count: janCount }, { day: 'February', count: marCount }, { day: 'March', count: wedCount }, { day: 'April', count: aprCount }, { day: 'May', count: mayCount }, { day: 'June', count: junCount }, { day: 'July', count: julyCount }, { day: 'August', count: augCount }, { day: 'September', count: sepCount }, { day: 'October', count: octCount }, { day: 'November', count: novCount }, { day: 'December', count: decCount }]
                } else if (req.body.dayCount == "Yearly") {

                    var finalData = [{ day: 2019, count: data.length }]
                }
                res.send({
                    responseCode: 200,
                    responseMessage: "User graph list",
                    totalTransaction: finalData
                })
            }

        }
    })
}


const userGraphVolume = (req, res) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0)
    var offset = (new Date().getTimezoneOffset()) * 60000;
    today = new Date(today - offset).getTime()
    var day = new Date(today)
    var month = day.getTime()
    month = month - 2592000000;
    let monthDate = new Date(month)
    var year = day.getTime()
    year = year - 2592000000 * 12;
    let yearDate = new Date(year)

    let day1 = day.getDay()
    let today1 = new Date()
    let endDay = new Date()

    //var week = new Date( Date.now()-7*86400000) 
    // console.log   (">>>>>>>>>>>>",week) 
    endDay.setHours(23, 59, 59, 999)
    let Tommorow1 = day.setDate(day.getDate() + 1)
    let Tommorow = new Date(Tommorow1)

    let lastTommorow = Tommorow.setHours(23, 59, 59, 999)
    const futureDay = 7 - day1;
    const futureTime = futureDay * 86400000;
    const time = day1 * 86400000;
    let startTime = today - time;
    let startDate = new Date(startTime)
    let endTime = today + futureTime;
    let endDate = new Date(endTime)
    var query = { status: { $ne: 'DELETE' }, userType: { $ne: "ADMIN" } }
    if (req.body.dayCount == "Daily") {

        // query.$and = [{ createdAt: { $lte: endDay } }, { createdAt: { $gte: today } }]
        query.$and = [{ createdAt: { $lte: endDate } }, { createdAt: { $gte: startDate } }]
    }

    if (req.body.dayCount == "Weekly") {
        // query.$and = [{ createdAt: { $lte: endDate } }, { createdAt: { $gte: startDate } }]
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: monthDate } }]
    }

    if (req.body.dayCount == "Monthly") {
        //  query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: monthDate } }]
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }
    if (req.body.dayCount == "  ") {
        query.$and = [{ createdAt: { $lte: day } }, { createdAt: { $gte: yearDate } }]
    }

    transaction.find(query).exec((error1, data) => {

        var temp = []

        // console.log("@@@@@",error1,a)
        if (error1) {
            res.send({
                responseCode: 500,
                responseMessage: "Internal server error", error1
            })
        } else if (!data) {
            res.send({
                responseCode: 404,
                responseMessage: "No data found"
            })
        } else {
        
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var count = 0;
            var sunCount = parseFloat(0)
            var monCount = parseFloat(0)
            var tueCount = parseFloat(0)
            var wedCount = parseFloat(0)
            var thusCount = parseFloat(0)
            var friCount = parseFloat(0)
            var satCount = parseFloat(0)


            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";


            var janCount = 0
            var febCount = 0
            var marCount = 0
            var aprCount = 0
            var mayCount = 0
            var junCount = 0
            var julyCount = 0
            var augCount = 0
            var sepCount = 0
            var octCount = 0
            var novCount = 0
            var decCount = 0



            var yCount = 0;
            data.forEach(function (entry) {
                count = count + 1;
                console.log('usdAmountusdAmount', entry.usdAmount)
                if (entry.usdAmount == undefined) {
                    entry.usdAmount = parseFloat(0)
                } else {
                    entry.usdAmount = parseFloat(entry.usdAmount)
                }
                if (req.body.dayCount == "Weekly" || req.body.dayCount == "Daily") {
                   
                    var dayFind = weekday[entry.createdAt.getDay()];
                    if (dayFind == "Sunday") {
                        sunCount = parseFloat(sunCount) + parseFloat(entry.usdAmount);
                    } else if (dayFind == "Monday") {
                        monCount = parseFloat(monCount) + parseFloat(entry.usdAmount);
                    } else if (dayFind == "Tueday") {
                        tueCount = parseFloat(tueCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "Wednesday") {
                        wedCount = parseFloat(wedCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "Thursday") {
                        thusCount = parseFloat(thusCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "Friday") {
                        friCount = parseFloat(friCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "Saturday") {
                        satCount = parseFloat(satCount) + parseFloat(entry.usdAmount)
                    }
                }
                else if (req.body.dayCount == "Monthly") {
                    var dayFind = month[entry.createdAt.getMonth()];
                    if (dayFind == "January") {
                        janCount = parseFloat(janCount) + parseFloat(entry.usdAmount);
                    } else if (dayFind == "February") {
                        febCount = parseFloat(febCount) + parseFloat(entry.usdAmount);
                    } else if (dayFind == "March") {
                        marCount = parseFloat(marCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "April") {
                        aprCount = parseFloat(aprCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "May") {
                        mayCount = parseFloat(mayCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "June") {
                        junCount = parseFloat(junCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "July") {
                        julyCount = parseFloat(julyCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "August") {
                        augCount = parseFloat(augCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "September") {
                        sepCount = parseFloat(sepCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "October") {
                        octCount = parseFloat(octCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "November") {
                        novCount = parseFloat(novCount) + parseFloat(entry.usdAmount)
                    } else if (dayFind == "December") {
                        decCount = parseFloat(decCount) + parseFloat(entry.usdAmount)
                    }
                }  else if (req.body.dayCount == "Yearly") {
                     yCount = parseFloat(yCount) + parseFloat(entry.usdAmount)
                }

            })
            console.log('countcountcount', count)
            console.log('lengthhhh', data.length)
            console.log('sunCountsunCountsunCount', data.length)
            if (count == data.length) {
                if (req.body.dayCount == "Weekly" || req.body.dayCount == "Daily") {
                    var finalData = [{ day: 'Sunday', count: sunCount }, { day: 'Monday', count: monCount }, { day: 'Tueday', count: tueCount }, { day: 'Wednesday', count: wedCount }, { day: 'Thursday', count: thusCount }, { day: 'Friday', count: friCount }, { day: 'Saturday', count: satCount }]
                } else if (req.body.dayCount == "Monthly") {
                    var finalData = [{ day: 'January', count: janCount }, { day: 'February', count: marCount }, { day: 'March', count: wedCount }, { day: 'April', count: aprCount }, { day: 'May', count: mayCount }, { day: 'June', count: junCount }, { day: 'July', count: julyCount }, { day: 'August', count: augCount }, { day: 'September', count: sepCount }, { day: 'October', count: octCount }, { day: 'November', count: novCount }, { day: 'December', count: decCount }]
                } else if (req.body.dayCount == "Yearly") {

                    var finalData = [{ day: 2019, count: yCount }]
                }
                res.send({
                    responseCode: 200,
                    responseMessage: "User graph list",
                    totalTransaction: finalData
                })
            }

        }
    })
}

module.exports = {

    testEmail: (req, res) => {
        console.log(req.body.email)
        commonFunction.sendEmailSNS(req.body.email, "Test","I am here", (error, result) => {
            console.log(error,result)
            if (error) {
                res.send({ responseCode: 500, responseMessage: "Error", error })
            }
            else {
                res.send({ responseCode: 200, responseMessage: "DONE", })
            }
        })
},
    adminLogin,
    totalUser,
    listUserSearch,
    viewUser,
    totalTransaction,
    viewParticularTransaction,
    actionToUser,
    changePasswordAdmin,
    changeEmailAdmin,
    addQuestion,
    forgotPasswordAdmin,
    resetPasswordAdmin,
    addAnswer,
    setTransactionInterest,
    verifyOtp,
    logout,
    addFaq,
    viewFaq,
    updateFaq,
    viewEmail,
    currentTransactionFee,
    viewFaqId,
    updateAdmin,
    viewAdmin,
    verifyOtpAdmin,
    adminVerifyOtp,
    transactionHistory,
    userGraphVolume,
    addVendor,
    viewVendor,
    searchVendors,
    deleteVendor,
    blockUnblockVendor,
    userGraph
}